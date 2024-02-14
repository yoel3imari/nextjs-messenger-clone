import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        justify-center
        rounded-md
        px-4
        py-2
        text-sm
        bg-white
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        w-full
        font-semibold
        focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
