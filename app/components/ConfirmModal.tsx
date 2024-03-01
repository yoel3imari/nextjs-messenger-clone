"use client";

import clsx from "clsx";
import Modal, { ModalProps } from "./Modal";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IconType } from "react-icons";

interface ConfirmModalProps extends ModalProps {
  onConfirm: () => Promise<void>;
  type?: "success" | "danger" | "warning";
  icon?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  type,
  icon,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const modalTypeStyle = {
    success: "bg-green-300 hover:bg-green-400 text-lime-700",
    danger: "bg-rose-300 hover:bg-rose-400 text-rose-700",
    warning: "bg-amber-300 hover:bg-amber-400 text-amber-700",
  };
  const modalIconStyle = {
    success: "bg-green-200 text-lime-700",
    danger: "bg-rose-200 text-rose-700",
    warning: "bg-amber-200 text-amber-700",
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
    } catch (error: any) {
      console.log(error);
      toast.error("Oops! " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="border-b border-gray-300">
        <div className="flex">
          <div>
            <div
              className={clsx(
                "rounded-full p-3 flex items-center justify-center",
                modalIconStyle[type || "success"]
              )}
            >
              {icon || <IoMdInformationCircleOutline size={24} />}
            </div>
          </div>
          <div className="flex-1 break-all">{children}</div>
        </div>
      </div>
      <div className="pt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="
          bg-white hover:bg-gray-300
            py-3 px-4 
            flex items-center justify-center
            rounded-lg
            text-gray-700
          "
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className={clsx(`
            hover:text-white
            py-3 px-4 
            flex items-center justify-center
            rounded-lg
            ${modalTypeStyle[type || "success"]}
          `)}
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin" size={24} />
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
