"use client";

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  register,
  required,
  placeholder,
  errors
}) => {
  return <div className="
    relative w-full
  ">

    <input 
      type={type}
      id={id}
      autoComplete={id}
      {...register(id, {required})}
      placeholder={placeholder}
      className="
        text-black
        font-light
        py-2
        px-4
        bg-neutral-100
        w-full
        rounded-full
        focus:outline-none
      " />

  </div>;
};

export default MessageInput;
