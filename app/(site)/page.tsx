import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="
        flex
        min-h-full
        flex-col
        justify-center
        py-12
        sm:px-6
        lg:px-8
        bg-gray-100
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Messenger"
          height="50"
          width="50"
          className="mx-auto w-auto"
          src="/images/logo.svg"
        />
        <h2
          className="
            mt-6 
            text-center 
            text-3xl
            font-bold
            tracking-tighter
          text-gray-900
          "
        >
          Welcome to Messenger
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
