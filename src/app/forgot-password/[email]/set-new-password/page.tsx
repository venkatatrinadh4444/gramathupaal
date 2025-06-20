"use client"


import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useParams } from "next/navigation";
import logo from '@/assets/gramatupaal-logo.png'
import loginSideImg from '@/assets/login-page-slide.jpg'
import leftArrow from '@/assets/leftArrow.png'
import eyeOpen from "@/assets/eye-open.png";
import eyeClose from "@/assets/eye-close.png";
import { useRouter } from "next/navigation";

const NewPasswordPage = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const params=useParams()
  const router = useRouter()

  const encodedParam=params?.email as string


  const email = decodeURIComponent(encodedParam)

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    const { password, confirmPassword } = data;
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("New password and confirm password are not matching!");
    }
    axios
      .put(`${API_URI}/api/user/reset-password`, { email, password })
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
          src={loginSideImg}
          alt="loginLogo"
          className="h-[100vh] object-cover w-auto"
        />
      </div>
      <div className="flex-1 sm:p-0 xm:p-4 md:pr-4">
        <div className="w-[406px] m-auto">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" className="w-[232px] h-[58px]" />
          </div>
          <div>
            <h1 className="text-[24px] font-[600] text-primary text-center my-3">
              Set a New Password
            </h1>
            <p className="text-neutral-600 text-center text-[16px]">
              Create a strong password for your account.
            </p>
            <form className="my-4 flex flex-col gap-3" onSubmit={submitHandler}>
              <div>
                <label htmlFor="password" className="text-neutral-600 text-[16px]">
                  New Password
                </label>

                <div className="relative mt-1">
                  <input
                    type={newPasswordShow ? "text" : "password"}
                    id="password"
                    className="bg-stone-100 rounded-md w-full py-4 px-4 outline-none text-[16px]"
                    placeholder="Enter New Password"
                    required
                    name="password"
                    value={data.password}
                    onChange={changeHandler}
                  />

                  <Image
                    src={newPasswordShow ? eyeOpen : eyeClose }
                    alt="eye"
                    className="w-[22px] absolute top-4 end-4 cursor-pointer"
                    onClick={() => setNewPasswordShow(!newPasswordShow)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-neutral-600 text-[16px]"
                >
                  Confirm Password
                </label>

                <div className="relative mt-1">
                  <input
                    type={confirmPasswordShow ? "text" : "password"}
                    id="confirmPassword"
                    className="bg-stone-100 rounded-md w-full py-4 px-4 outline-none text-[16px]"
                    placeholder="Enter New Password"
                    required
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={changeHandler}
                  />

                  <Image
                    src={confirmPasswordShow ? eyeOpen : eyeClose}
                    alt="eye"
                    className="w-[22px] absolute top-4 end-4 cursor-pointer h-auto"
                    onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                  />
                </div>
              </div>
              <button className="bg-grey-btn text-white w-full py-3 text-sm rounded-lg mt-2">
                Reset Password
              </button>
            </form>
            <div className="flex justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer"
              onClick={()=>router.back()}>
                <Image
                  src={leftArrow}
                  alt="leftArrow"
                  width={24}
                  className="h-[24px] w-auto"
                />
                <p className="text-sm text-neutral-600">Go back</p>
              </div>
              <div>
                <p
                  className="text-sm underline text-green-400 cursor-pointer"
                onClick={()=>router.push('/')}>
                  Login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewPasswordPage;
