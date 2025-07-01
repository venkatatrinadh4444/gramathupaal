"use client";

import { Modal } from "flowbite";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import leftArrow from "@/assets/leftArrow.png";
import BlockNavigation from "@/app/common/NavigationBlocking";
import { useContextData } from "@/app/Context";
import { useRouter } from "next/navigation";

const VerifyIdentity = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const router = useRouter();
  const { email } = useContextData() as any;

  const [loading, setLoading] = useState(false);
  const [showRefreshBlockedModal, setShowRefreshBlockedModal] = useState(false);

  //For modal
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalInstance = useRef<Modal | null>(null);

  // for OTP validation

  const length = 6;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  //For interval
  const [seconds, setSeconds] = useState(0);
  const intervalReference = useRef<NodeJS.Timeout | null>(null);
  // track whether we’re in “backspace‑chain” mode
  const [chainEnabled, setChainEnabled] = useState(false);

  //For handling OTP inputs

  // Move focus manually if backspacing in chain
  useEffect(() => {
    if (focusedIndex !== null) {
      inputsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    setChainEnabled(false);

    // Only move forward if value was typed AND current box is not last
    if (val.length === 1 && index < length - 1) {
      const nextIndex = index + 1;

      // Delay the focus so React updates state first
      setTimeout(() => {
        inputsRef.current[nextIndex]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key !== "Backspace") return;
    e.preventDefault();

    if (index === length - 1) {
      setChainEnabled(true);
    }

    if (chainEnabled) {
      // recursive delete
      const deleteBackward = (i: number) => {
        if (i < 0) return;

        setOtp((prevOtp) => {
          const updatedOtp = [...prevOtp];

          if (updatedOtp[i]) {
            updatedOtp[i] = "";
            setFocusedIndex(i);

            // schedule next step
            setTimeout(() => deleteBackward(i - 1), 100);
          } else {
            // even if current is empty, keep going
            setTimeout(() => deleteBackward(i - 1), 0);
          }

          return updatedOtp;
        });
      };

      deleteBackward(index);
    } else {
      // normal mode: just clear current
      setOtp((prevOtp) => {
        const updatedOtp = [...prevOtp];
        if (updatedOtp[index]) {
          updatedOtp[index] = "";
        }
        return updatedOtp;
      });
    }
  };

  /*  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key !== "Backspace") return;
    e.preventDefault();
  
    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
  
      if (updatedOtp[index]) {
        // Just clear current input
        updatedOtp[index] = "";
        setFocusedIndex(index);
      } else if (index > 0) {
        // Move focus left and clear previous value
        updatedOtp[index - 1] = "";
        setFocusedIndex(index - 1);
      }
  
      return updatedOtp;
    });
  }; */

  const handleFocus = (index: number) => {
    // is OTP fully filled right now?
    const full = otp.every((d) => d !== "");
    // enable chain only if click landed on the last input *and* it's full
    setChainEnabled(full && index === length - 1);

    // ← record which box is focused so our effect can move focus on chain
    setFocusedIndex(index);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").slice(0, length);
    if (!/^\d+$/.test(pasted)) return;

    const newOtp = Array(length).fill("");
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    setChainEnabled(false);
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
        router.push(`/forgot-password/${email}/set-new-password`);
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

  // prevent refresh
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        seconds > 0 &&
        (e.key === "F5" || (e.ctrlKey && e.key.toLowerCase() === "r"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        setShowRefreshBlockedModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [seconds]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (seconds > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [seconds]);

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
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  onFocus={() => handleFocus(index)} // ← Add this line
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  inputMode="numeric"
                  disabled={index !== 0 && otp[index - 1] === ""}
                  className={`w-12 sm:w-14 md:w-13.5 h-12 text-center rounded focus:outline-none border-none focus:ring-2 focus:ring-blue-500 bg-gray-200`}
                />
              ))}
            </div>
            {seconds === 0 ? (
              <p
                className="text-[16px] text-primary text-end cursor-pointer mr-1"
                onClick={resendOTP}
              >
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
            {seconds===0 && <p
              className="text-sm underline text-primary cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </p>}
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
                onClick={() => router.push("/forgot-password")}
              >
                {"Yes, I'm sure"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*    Refresh Toast message */}
      {showRefreshBlockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Refresh Blocked
            </h2>
            <p className="text-gray-700">
              You cannot refresh the page while the OTP timer is running. Please
              wait until the timer ends.
            </p>
            <button
              onClick={() => setShowRefreshBlockedModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default VerifyIdentity;
