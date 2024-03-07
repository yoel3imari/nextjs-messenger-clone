"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationBodyProps {
  initMessages: FullMessageType[];
  isGroup: boolean;
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initMessages,
  isGroup
}) => {
  const [messages, setMessages] = useState(initMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
  }, [conversationId]);

  return (
    <div
      className="
        flex-1
        overflow-y-auto
      "
    >
      {messages.map((m, i) => (
        <MessageBox isLast={i === messages.length - 1} isGroup={isGroup} key={m.id} data={m} />
      ))}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default ConversationBody;
