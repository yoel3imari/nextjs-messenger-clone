"use client";
import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handelClick = () => {
    if (onClick) return onClick();
  };

  return (
    <Link
      href={href}
      onClick={handelClick}
      className={clsx(
        `
        group
        flex
        justify-center
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        p-4
        text-gray-500
        hover:text-gray-900
        hover:bg-gray-100`,
        active && "bg-gray-100 text-gray-900"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
