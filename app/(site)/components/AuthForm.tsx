"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status]);

  const toggleVariant = useCallback(() => {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "LOGIN") {
      // nextauth login
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) toast.error(callback.error);
          if (callback?.ok) {
            toast.success("Logged in!");
            router.push("/users");
          }
        })
        .catch((error) => {
          toast.error("Something went wrong!");
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      // axios register
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Logged in!");
          router.push("/users");
        })
        .catch((error) => {
          toast.error("Something went wrong!");
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    try {
      setIsLoading(true);
      // nextauth social signin
      signIn(action, {
        redirect: false,
        callbackUrl: "/",
      })
        .then((callback) => {
          if (callback?.error) toast.error(callback.error);
          if (callback?.ok) {
            toast.success("Signed in!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="
      mt-8
      sm:mx-auto
      sm:w-full
      sm:max-w-md
    "
    >
      <div
        className="
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
      "
      >
        <form
          className="
            space-y-6
          "
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              required={true}
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email Address"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button fullWidth={true} disabled={isLoading}>
              {variant === "LOGIN" ? (
                <span>Sign in</span>
              ) : (
                <span>Sign up</span>
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
              "
            >
              <div
                className="
                  w-full
                  border-t
                  border-gray-300
                "
              />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
          />
        </div>

        <div
          className="
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500
        "
        >
          <div>
            {variant === "LOGIN"
              ? "New to messenger ?"
              : "Already have an account ?"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Log in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
