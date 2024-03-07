"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
  user: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ user }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  // const session = await getSession();
  // console.log({user});

  return (
    <>
      <SettingsModal
        user={user}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
          hidden
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-40
          lg:w-20
          lg:px-6
          lg:overflow-y-auto
          lg:bg-white
          lg:pb-4
          lg:flex
          lg:flex-col
          justify-between
          border-r-[1px]
        "
      >
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
          "
        >
          <ul
            role="list"
            className="
              flex
              flex-col
              items-center
              space-y-1
            "
          >
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
            items-center
          "
        >
          <div
            onClick={() => setIsOpen(true)}
            className="
              cursor-pointer
              hover:opacity-75
              transition
            "
          >
            <Avatar user={user} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
