import Image from "next/image";
import React from "react";
import loginBg from "@/app/assets/Picture1.png";
import "@/app/globals.css";
import Link from "next/link";

async function logIn(formData: FormData) {
  "use server";
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email || !password) {
    console.log("Please enter required fields!");
    return;
  }
  console.log(`Details provided = email: ${email}, password: ${password}`);
}

export default async function LoginPage() {
  return (
    <div className="grid xl:grid-cols-[1fr,600px] min-h-screen">
      <div className="flex items-center justify-center">
        <div className="relative left-3 border-2 border-black h-full w-full max-h-[520px] lg:max-h-[580px] max-w-[320px] lg:max-w-[424px] bg-yellow-500 ">
          <form
            action={logIn}
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
                  className="border-2 text-black border-gray-950 p-2 w-full"
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
                  className=" text-black border-gray-950 border-2 p-2 w-full"
                  placeholder="Password"
                ></input>
                <Link
                  href={"/login"}
                  className="tracking-tight text-black hover:underline decoration-2"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className="font-space_grotesque text-black">
              <button className="flex w-full border-2 border-black p-2 items-center gap-3 font-bold justify-center bg-[#FDC62D] hover:bg-[#ffcd42]">
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
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
      <div className="hidden xl:flex ">
        <Image
          alt="loginBg"
          height={1024}
          width={600}
          className="min-w-full max-h-screen flex object-fill object-right"
          src={loginBg}
        ></Image>
      </div>
    </div>
  );
}
