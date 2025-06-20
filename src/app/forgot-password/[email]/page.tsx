"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import logo from '@/assets/gramatupaal-logo.png'
import loginLogo from '@/assets/login-page-slide.jpg'
import leftArrow from '@/assets/leftArrow.png'

const VerifyIdentity = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const params = useParams();
  const router = useRouter();

  const encodedURI = params?.email as string

  const email = decodeURIComponent(encodedURI);

  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const el = document.getElementById(`otp-${index + 1}`);

    if (value && index < 5) {
      el?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const el = document.getElementById(`otp-${index - 1}`);
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      el?.focus();
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const enteredOTP = otp.join("");
    e.preventDefault();
    axios
      .post(`${API_URI}/api/user/verify-otp`, { email, otp: enteredOTP })
      .then((res) => {
        toast.success(res.data.message);
        router.push(`/forgot-password/${email}/set-new-password`)
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  const resendOTP = () => {
    axios
      .post(`${API_URI}/api/user/send-otp`, { email })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  return (
    <>
      <ToastContainer />
      <div className="flex h-[100vh] items-center md:gap-4">
        <div className="flex-1 hidden md:block">
          <Image
            src={loginLogo}
            alt="loginLogo"
            className="h-[100vh] object-cover w-auto"
          />
        </div>
        <div className="flex-1">
          <div className="w-[406px]  m-auto">
            <div className="flex justify-center">
              <Image src={logo} alt="logo" className="w-[232px] h-[58px]" />
            </div>
            <div>
              <h1 className="text-[24px] font-[600] text-primary text-center my-3">
                Verify Your Identity
              </h1>
              <p className="text-neutral-600 font-[400] text-center text-[16px]">
                {`We've sent a 6-digit OTP to your registered email. Enter it below
              to proceed`}
              </p>
              <form
                className="my-6 flex flex-col gap-3"
                onSubmit={submitHandler}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="text-neutral-600 text-[16px] ml-1"
                  >
                    Enter OTP
                  </label>
                  <div className="flex justify-center gap-3 mt-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className="w-14 h-12 text-center rounded-md text-sm bg-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-600"
                      />
                    ))}
                  </div>
                  <p
                    className="text-[16px] text-primary text-end cursor-pointer mr-1"
                    onClick={resendOTP}
                  >
                    Resend OTP
                  </p>
                </div>
                <button
                  className="bg-grey-btn text-white w-full py-3 text-sm rounded-lg mt-8"
                  type="submit"
                >
                  Verify
                </button>
              </form>
              <div className="flex justify-between">
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={() => router.back()}
                >
                  <Image
                    src={leftArrow}
                    alt="leftArrow"
                    className="w-[24px] h-[24px]"
                  />
                  <p className="text-sm text-neutral-600">Go back</p>
                </div>
                <div>
                  <p
                    className="text-sm underline text-green-400 cursor-pointer"
                    onClick={() => router.push("/")}
                  >
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

export default VerifyIdentity;
