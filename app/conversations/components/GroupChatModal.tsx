"use client";

import Modal, { ModalProps } from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GroupSelect from "./GroupSelect";
import { AiOutlineLoading } from "react-icons/ai";

interface Props extends ModalProps {
  users: User[];
}

const GroupChatModal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base
                font-semibold
                leading-7
                text-gray-900
              "
            >
              Create a group chat
            </h2>
            <p>Create a chat with more than multiple people.</p>
            <div
              className="
              mt-10
              flex
              flex-col
              gap-y-8
            "
            >
              <Input
                register={register}
                label="name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <GroupSelect
                id="members"
                disabled={isLoading}
                label="Members"
                value={members}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                options={users.map((u) => ({
                  value: u.id,
                  label: u.name,
                }))}
              />
            </div>
          </div>
          <div
            className="flex items-center justify-end gap-2"
          >
            <button
              type="reset"
              className="
              bg-white hover:bg-gray-300
                py-2 px-4 
                flex items-center justify-center
                rounded-lg
              text-gray-700
              "
            >
              Reset
            </button>
            <button
              type="submit"
              className="
                text-white
                py-2 px-4 
                flex items-center justify-center
                rounded-lg
                hover:bg-sky-300 bg-sky-400
              "
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading className="animate-spin" size={24} />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
