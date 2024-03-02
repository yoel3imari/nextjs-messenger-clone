"user client";

import { User } from "@prisma/client";
import Modal, { ModalProps } from "../Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import Input from "../inputs/Input";
import { AiOutlineLoading } from "react-icons/ai";

const SettingsModal: React.FC<ModalProps & { user: User }> = ({
  isOpen,
  onClose,
  user,
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
      name: user.name,
      image: user.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result: any) => {
    console.log(result);
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((error: any) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semiborder text-lg leading-7 text-gray-900">
              Profile Settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your profile information.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-bold
                    leading-6
                  text-gray-700
                    capitalize
                  "
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={64}
                    height={64}
                    className="rounded-full"
                    src={image || user.image || "/images/placeholder.png"}
                    alt="avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="ml_default"
                  >
                    <Button disabled={isLoading} type="button">
                      <span>Changer</span>
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
              mt-6
              flex
              items-center
              justify-end
              gap-x-6 
            "
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

export default SettingsModal;
