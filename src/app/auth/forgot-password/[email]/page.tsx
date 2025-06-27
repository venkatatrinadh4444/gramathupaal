"use client";
import { Modal } from "flowbite";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import leftArrow from "@/assets/leftArrow.png";
import BlockNavigation from "@/app/common/NavigationBlocking";

const VerifyIdentity = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const params = useParams();
  const router = useRouter();

  const encodedURI = params?.email as string;

  const email = decodeURIComponent(encodedURI);
  const [loading, setLoading] = useState(false);

  // for OTP validation

  const length = 6;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [lastEditableIndex, setLastEditableIndex] = useState(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  //For interval
  const [seconds, setSeconds] = useState(0);
  const intervalReference = useRef<NodeJS.Timeout | null>(null);

  //For modal
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalInstance = useRef<Modal | null>(null);

  //For handling OTP inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (val && index < length - 1) {
      const nextIndex = index + 1;
      setLastEditableIndex(nextIndex);
      setTimeout(() => {
        inputsRef.current[nextIndex]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        setLastEditableIndex(index);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setLastEditableIndex(index - 1);
        setTimeout(() => {
          inputsRef.current[index - 1]?.focus();
        }, 0);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = Array(length).fill("");
    pasteData.split("").forEach((digit, i) => {
      if (i < length) newOtp[i] = digit;
    });

    setOtp(newOtp);
    setLastEditableIndex(pasteData.length - 1);
    setTimeout(() => {
      inputsRef.current[pasteData.length - 1]?.focus();
    }, 0);
  };

  // form submit
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const enteredOTP = otp.join("");
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .post(`${API_URI}/api/user/verify-otp`, { email, otp: enteredOTP })
      .then((res) => {
        toast.success(res.data.message);
        router.push(`/auth/forgot-password/${email}/set-new-password`);
      })
      .catch((err) => toast.error(err.response.data?.message))
      .finally(() => {
        setLoading(false);
      });
  };

  // Interval section
  const startInterval = () => {
    setSeconds(60);
    intervalReference.current = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalReference.current) {
      clearInterval(intervalReference.current);
      intervalReference.current = null;
    }
  };

  const resendOTP = () => {
    if (seconds !== 0) {
      return null;
    }
    startInterval();
    axios
      .post(`${API_URI}/api/user/send-otp`, { email })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  useEffect(() => {
    if (seconds === 0) {
      stopInterval();
    }
  }, [seconds]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
    startInterval();
  }, []);

  // Modal section
  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current);
    }
    return () => {
      modalInstance.current?.hide(); // Clean up modal on unmount
    };
  }, []);

  const openModal = () => {
    if (seconds === 0) {
      modalInstance.current?.show();
    }
  };

  const closeModal = () => {
    modalInstance.current?.hide();
  };

  return (
    <>
      <ToastContainer />
      <BlockNavigation />
      <div>
        <h1 className="text-[24px] font-[600] text-primary text-center my-3">
          Verify Your Identity
        </h1>
        <p className="text-neutral-600 font-[400] text-center text-[16px]">
          {`We've sent a 6-digit OTP to your registered email. Enter it below
              to proceed`}
        </p>
        <form className="my-6 flex flex-col gap-3" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="text-neutral-600 text-[16px] ml-1"
            >
              Enter OTP
            </label>
            <div className="flex justify-center gap-3 mt-2">
              {otp.map((digit, index) => {
                const isDisabled = index !== lastEditableIndex;

                return (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => {(inputsRef.current[index] = el)}}
                    inputMode="numeric"
                    disabled={isDisabled}
                    className={`w-12 h-12 text-center rounded focus:outline-none border-none focus:ring-2 focus:ring-blue-500 ${
                      isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                    }`}
                  />
                );
              })}
            </div>
            {seconds === 0 ? (
              <p
                className="text-[16px] text-primary text-end cursor-pointer mr-1"
                onClick={resendOTP}
              >
                {" "}
                Resend OTP
              </p>
            ) : (
              <p className="text-[16px] text-primary text-end cursor-pointer mr-1">
                wait <span className="text-[14px]"> {seconds} </span> seconds
              </p>
            )}
          </div>
          <button
            className={`bg-grey-btn text-white w-full py-3 text-sm rounded-lg mt-8 disabled:bg-gray-500`}
            type="submit"
            disabled={otp.join("")?.length !== 6 ? true : false}
          >
            Verify
          </button>
        </form>
        <div className="flex justify-between">
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={openModal}
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
              onClick={() => router.push("/auth/login-page")}
            >
              Login
            </p>
          </div>
        </div>
      </div>

      {/*   Tailwind modal */}
      <div
        ref={modalRef}
        id="popup-modal"
        tabIndex={-1}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to go back?
              </h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={() => router.push("/auth/forgot-password")}
              >
                {"Yes, I'm sure"}
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={closeModal}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyIdentity;

/* 
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
            
          </div>
        </div>
      </div> */
