"use client";

import { User } from "@prisma/client";
import clsx from "clsx";
import useActiveList from "../hooks/useActiveList";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface AvatarProps {
  user?: User;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  const session = useSession();
  // const currentUser = await getCurrentUser();
  const isCurrent = user?.email === session.data?.user?.email;

  return (
    <div className="relative flex items-center">
      <div
        className={clsx(
          `
          relative
          inline-block
          overflow-hidden
          p-[2px]
          rounded-full
          shadow-sm`,
          !size && "h-8 w-8 md:h-11 md:w-11"
        )}
        style={{
          width: size ? size : "",
          height: size ? size : "",
        }}
      >
        <Image
          alt="avatar"
          src={user?.image || "/images/placeholder.png"}
          className="rounded-full w-full h-full"
          fill
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div>
        {isActive && !isCurrent && (
          <span
            className="
              absolute
              block
              rounded-full
              bg-green-500
              ring-2
              ring-white
              top-0
              right-0
              h-2
              w-2
            "
          />
        )}
      </div>
    </div>
  );
};

export default Avatar;
