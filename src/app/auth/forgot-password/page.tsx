"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import userIcon from "@/assets/userIcon.png";
import lefrArrow from "@/assets/leftArrow.png";
import { useRouter } from "next/navigation";
import BlockNavigation from "../../common/NavigationBlocking";

const ForgotPage = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .post(`${API_URI}/api/user/send-otp`, { email })
      .then((res) => {
        toast.success(res.data.message);
        router.push(`/auth/forgot-password/${email}`);
      })
      .catch((err) => toast.error(err.response.data?.message))
      .finally(() => setLoading(false));
  };


  return (
    <>
      <ToastContainer />
      <BlockNavigation/>
      <div>
        <h1 className="text-[24px] font-[600] text-primary text-center my-3">
          Forgot Password?
        </h1>
        <p className="text-neutral-600 text-center text-[16px] font-[400]">
          Enter your registered email, and we’ll send you a reset link to create
          a new password.
        </p>
        <form className="my-4 flex flex-col gap-3" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="text-neutral-600 
                            text-[16px] font-[400]"
            >
              Email ID
            </label>

            <div className="relative mt-2">
              <input
                type="email"
                id="email"
                className="bg-stone-100 rounded-md w-full py-4 px-4 outline-none text-[16px] border-none text-gray-500"
                placeholder="Enter your Email ID"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Image
                src={userIcon}
                alt="userIcon"
                className="w-6 absolute top-4 end-4"
              />
            </div>
          </div>

          <button
            className="bg-grey-btn text-white w-full py-3 text-sm rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center cursor-pointer">
            <Image
              src={lefrArrow}
              alt="leftArrow"
              className="h-[24px] w-[24px]"
            />
            <p
              className="text-sm text-neutral-600"
              onClick={() => router.push("/auth/login-page")}
            >
              Go back
            </p>
          </div>
          <div>
            <p
              className="text-sm underline text-green-400 cursor-pointer"
              onClick={() => router.push("/auth/login-page")}
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPage;

{
  /* <div className='flex h-[100vh] items-center md:gap-4'>
        <div className='flex-1 hidden md:block'>
            <Image src={loginLogo} alt="loginLogo" className='h-[100vh] object-cover w-auto'/>
        </div>
        <div className='flex-1'>
            <div className='w-[406px] m-auto sm:p-0 xm:p-4 md:pr-4'>
                <div className='flex justify-center'>
                    <Image src={logo} alt="logo" className='w-[232px] h-[58px]'/>
                </div>
               
            </div>
        </div>
    </div> */
}
