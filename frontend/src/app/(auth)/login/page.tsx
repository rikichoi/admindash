"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import loginBg from "@/assets/Picture1.png";
import "@/app/globals.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string>();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      setErrorMsg(
        "Incorrect email or password. Type the correct email and password, and try again"
      );
    }

    if (email && password) {
      try {
        const response = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
          redirectTo: "/",
        });
        if (response && response.ok) {
          console.log(response.ok);
          router.push("/");
        } else {
          setErrorMsg(
            "Incorrect email or password. Type the correct email and password, and try again"
          );
        }
      } catch (error) {
        console.log(error);
        setErrorMsg(
          "Incorrect email or password. Type the correct email and password, and try again"
        );
      }
    }
  }

  return (
    <div className="grid xl:grid-cols-3 min-h-screen">
      <div className="col-span-2 flex items-center justify-center bg-black">
        <div className="relative left-3 border-2 border-black h-full w-full max-h-[520px] lg:max-h-[580px] max-w-[320px] lg:max-w-[424px] bg-yellow-500 ">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-8 px-8 justify-center absolute border-2 border-black right-3 bottom-3 h-full w-full max-h-[520px] lg:max-h-[580px] max-w-[320px] lg:max-w-[424px] bg-white "
          >
            <div>
              <h1 className="text-[36px] pointer-events-none select-none lg:text-[48px] font-semibold text-black flex flex-col ">
                <span className="loginHeader tracking-tighter stroke-black outline-2 outline-black text-red-500 font-space_mono h-[40px]">
                  WELCOME
                </span>{" "}
                <span className="font-space_mono">BACK</span>
              </h1>
            </div>
            <div className="font-space_mono flex flex-col gap-3 text-[16px]">
              <div className="">
                <label hidden htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="border-2 focus:ring-2 focus:ring-[#FDC62D] text-black focus:outline-2  outline-none border-gray-950 p-2 w-full"
                  placeholder="Email"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label hidden htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="border-2 focus:ring-2 focus:ring-[#FDC62D] text-black focus:outline-2  outline-none border-gray-950 p-2 w-full"
                  placeholder="Password"
                ></input>
                <div className="flex flex-col items-center">
                  <p className="tracking-tight font-semibold text-black">
                    Demo Account:
                  </p>
                  <p className="tracking-tight text-black">
                    admin@gmail.com
                  </p>
                  <p className="tracking-tight text-black">
                    admin
                  </p>
                </div>
              </div>
            </div>
            <span className="text-xs text-red-500 font-space_grotesque">
              {errorMsg && errorMsg}
            </span>
            <button className="relative group flex w-full border-2 border-black items-center font-bold justify-center bg-[#FDC62D] hover:bg-[#ffcd42] font-space_grotesque text-black">
              <div className="z-50 flex h-full border-2 p-3 w-full gap-3 border-black items-center font-bold justify-center bg-[#FDC62D] hover:bg-[#ffcd42]">
                Log In{" "}
                <svg
                  width="17"
                  height="12"
                  viewBox="0 0 17 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.83333 6H15.1667M15.1667 6L10.1667 1M15.1667 6L10.1667 11"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="hidden group-hover:flex group-hover:absolute left-1 top-1 items-center gap-3 bg-black w-full h-full"></div>
            </button>
            <p className="text-center font-light text-black font-space_grotesque">
              Don&apos;t have an account?{" "}
              <Link
                className="font-medium hover:underline decoration-2"
                href={"/login"}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="col-span-1 hidden xl:flex ">
        <Image
          alt="loginBg"
          height={1024}
          width={600}
          className="min-w-full pointer-events-none select-none max-h-screen flex object-fill object-right"
          src={loginBg}
        ></Image>
      </div>
    </div>
  );
}
