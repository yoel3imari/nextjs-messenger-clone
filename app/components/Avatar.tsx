"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative  flex items-center">
      <div
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-8
          w-8
          md:h-11
          md:w-11
          p-[2px]
          border-2
          shadow-sm
        "
      >
        <Image
          src={user?.image || "/images/placeholder.png"}
          fill
          className="
            rounded-circle
            h-8
            w-8
          "
          alt={user?.name as string}
        />
      </div>
    </div>
  );
};

export default Avatar;
