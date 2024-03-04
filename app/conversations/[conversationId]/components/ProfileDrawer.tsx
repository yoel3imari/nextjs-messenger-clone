"use client";

import Avatar from "@/app/components/Avatar";
import ConfirmModal from "@/app/components/ConfirmModal";
import GroupAvatar from "@/app/components/GroupAvatar";
import useConversation from "@/app/hooks/useConversation";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoClose, IoTrash } from "react-icons/io5";
import { TiWarningOutline } from "react-icons/ti";

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const joined = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusTxt = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "active";
  }, [data.users]);

  const onDelete = useCallback(async () => {
    await axios.delete(`/api/conversations/${conversationId}`);
    setIsModalOpen(false);
    router.push("/conversations");
    router.refresh();
  }, []);

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onDelete}
        type="warning"
        icon={<TiWarningOutline size={24} />}
      >
        <div className="bg-white px-4 pb-4">
          <h2 className="font-bold text-lg">Confirm Action</h2>
          <p className="">
            Do you want to delete this contact
            ?erffffffffffffdrddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </p>
        </div>
      </ConfirmModal>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 overflow-hidden" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div
              className="
                absolute
                inset-0
                bg-black
                bg-opacity-40
              "
            >
              <div
                className="
                  pointer
                  fixed
                  inset-y-0
                  right-0
                  flex
                  max-w-full
                  pl-10
                "
              >
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="
                        pointer-events-auto
                        w-screen
                        max-w-md
                      "
                  >
                    <div
                      className="
                          flex
                          h-full
                          flex-col
                          overflow-y-scroll
                          bg-white
                          py-6
                          shadow-xl
                        "
                    >
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            {/* onClick={() => null} */}
                            <button
                              className="
                                rounded-md
                                bg-white
                                text-gray-400
                                hover:text-gray-500
                                focus:outine-none
                                focus:ring-2
                                focus:ring-sky-500
                                focus:ring-offset-2
                              "
                              type="button"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close Panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <GroupAvatar users={data.users} />
                            ) : (
                              <Avatar user={otherUser} size={100} />
                            )}
                          </div>
                          <div className="">{title}</div>
                          <div
                            className="
                              text-sm text-gray-500
                            "
                          >
                            {statusTxt}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => {}}
                              className="flex flex-col gap-3 items-center cursor-pointer hover::opacity-75"
                            >
                              <div
                                onClick={() => setIsModalOpen(true)}
                                className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center"
                              >
                                <IoTrash size={20} />
                              </div>
                              <div
                                className="
                                  text-sm
                                  font-semibold
                                  text-neutral-600
                                "
                              >
                                Delete
                              </div>
                            </div>
                          </div>
                          <div
                            className="
                              w-full
                              pb-5
                              pt-5
                              sm:px-0
                              sm:pt-0
                            "
                          >
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {!data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                      text-sm
                                      font-medium
                                      text-gray-500
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                  >
                                    Email
                                  </dt>
                                  <dd
                                    className="
                                      mt-1
                                      text-sm
                                      text-gray-900
                                      sm:col-span-2
                                    "
                                  >
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt
                                      className="
                                        text-sm
                                        font-medium
                                        text-gray-500
                                        sm:w-40
                                        sm:flex-shrink-0
                                      "
                                    >
                                      Joined
                                    </dt>
                                    <dd
                                      className="
                                        mt-1
                                        text-sm
                                        text-gray-900
                                        sm:col-span-2
                                      "
                                    >
                                      <time dateTime={joined}>{joined}</time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
