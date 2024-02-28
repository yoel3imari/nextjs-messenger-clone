"use client";

import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  user?: User;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size }) => {
  return (
    <div className="relative  flex items-center">
      <div
        className={clsx(
          `
          relative
          inline-block
          rounded-full
          overflow-hidden
          p-[2px]
          border-2
          shadow-sm`,
          !size && "h-8 w-8 md:h-11 md:w-11"
        )}
        style={{
          backgroundImage: `url(${user?.image || "/images/placeholder.png"})`,
          backgroundSize: "cover",
          width: size ? size : "",
          height: size ? size : "",
        }}
      >
        {/* <Image
          src={user?.image || "/images/placeholder.png"}
          fill
          className="
            rounded-circle
            w-8
            h-8
          "
          alt={user?.name as string}
        /> */}
      </div>
    </div>
  );
};

export default Avatar;
