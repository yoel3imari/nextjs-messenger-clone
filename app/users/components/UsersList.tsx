"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSession from "@/app/actions/getSession";

interface UsersListProps {
  data: User[];
}

const UsersList: React.FC<UsersListProps> = ({ data }) => {

  return <aside 
    className="
      fixed 
      inset-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-64
      lg:block
      overflow-y-auto
      border-r
      border-gray-200
      block
      w-full
      left-0
      bg-white
    "
  >
    <div className="px-5">
      <div className="flex-col">
        <div className="
          text-2xl
          font-bold
          text-neutral-800
          py-4
        ">
          Poeple
        </div>
      </div>
      {
        data && data.map(u => (
          <UserBox key={u.id} user={u} />
        ))
      }
    </div>
  </aside>;
};

export default UsersList;
