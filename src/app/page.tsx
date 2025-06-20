"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import loginLogo from "@/assets/login-page-slide.jpg";
import logo from "@/assets/gramatupaal-logo.png";
import userIcon from "@/assets/userIcon.png";
import eyeOpen from "@/assets/eye-open.png";
import eyeClose from "@/assets/eye-close.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [isShow, setIsShow] = useState(false);

  const router=useRouter()

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = data;
    e.preventDefault();
    axios
      .post(
        `${API_URI}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  return (
    <>
    <ToastContainer/>
    <div className="flex h-[100vh] items-center md:gap-4">
      <div className="flex-1 hidden md:block">
        <Image
          src={loginLogo}
          alt="loginLogo"
          priority
          className="min-h-[100vh] object-cover w-auto"
        />
      </div>
      <div className="flex-1">
        <div className="w-[406px] m-auto sm:p-0 xm:p-4 md:pr-4">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" className="w-[232px] h-[58px]" />
          </div>
          <div>
            <h1 className="text-[24px] font-[600] text-primary text-center my-3 font-inter">
              Login
            </h1>
            <p className="text-neutral-600 text-center text-[16px]">
              Please log in to your existing account or register for a new one.
            </p>
            <form className="my-4 flex flex-col gap-3" onSubmit={submitHandler}>
              <div>
                <label htmlFor="email" className="text-neutral-600 text-[16px]">
                  Email ID
                </label>

                <div className="relative mt-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your Email ID"
                    required
                    name="email"
                    value={data.email}
                    onChange={changeHandler}
                    className="bg-stone-100 rounded-md w-full py-4 px-4 outline-none text-[16px]"
                  />

                  <Image
                    src={userIcon}
                    alt="userIcon"
                    className="w-6 absolute top-3 end-4 h-auto"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-neutral-600 text-[16px]"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={isShow ? "text" : "password"}
                    id="password"
                    className="bg-stone-100 rounded-md w-full py-4 px-4 outline-none text-[16px]"
                    placeholder="Enter your Password"
                    required
                    name="password"
                    value={data.password}
                    onChange={changeHandler}
                  />

                  <Image
                    src={isShow ? eyeOpen : eyeClose}
                    alt="eye"
                    className="w-[22px] absolute top-4 end-4 cursor-pointer h-auto"
                    onClick={() => setIsShow(!isShow)}
                  />
                </div>
                <p className="text-sm text-neutral-600 text-end  cursor-pointer" onClick={()=>router.push('/forgot-password')}>
                  Forgot Password
                </p>
              </div>
              <button
                className="bg-grey-btn text-white w-full py-3 text-sm rounded-lg"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
