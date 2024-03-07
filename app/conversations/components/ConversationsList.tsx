"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import { User } from "@prisma/client";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationsListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
  
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConv) => {
        if(currentConv.id === conversation.id) {
          return {
            ...currentConv,
            messages: conversation.messages
          }
        }

        return currentConv
      }))
    }

    const removeHandler = (conv: FullConversationType) => {
      setItems((current) => {
        return [...current.filter(c => c.id !== conv.id)]
      })

      if( conversationId === conv.id ) {
        router.push('/conversations')
      }
    }

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:remove', removeHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-64 
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        bg-white
      `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between items-center mb-4 pt-4">
            <div
              className="
            text-2xl
            font-bold
            text-neutral-800
          "
            >
              Messages
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="
            rounded-full
            p-2
            bg-gray-100
            text-gray-900
            cursor-pointer
            hover:opacity-75
            transition
          "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              isSelected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationsList;
