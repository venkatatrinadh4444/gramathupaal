"use client";

import React, { useState ,useRef , useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useParams } from "next/navigation";
import leftArrow from "@/assets/leftArrow.png";
import eyeOpen from "@/assets/eye-open.png";
import eyeClose from "@/assets/eye-close.png";
import { useRouter } from "next/navigation";
import BlockNavigation from "@/app/common/NavigationBlocking";
import { Modal } from "flowbite";

const NewPasswordPage = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const params = useParams();
  const router = useRouter();

    //For modal
    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalInstance = useRef<Modal | null>(null);
  

  const encodedParam = params?.email as string;

  const email = decodeURIComponent(encodedParam);

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const { password, confirmPassword } = data;
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("New password and confirm password are not matching!");
    }
    axios
      .put(`${API_URI}/api/user/reset-password`, { email, password })
      .then((res) => {
        toast.success(res.data.message);
        router.push('/auth/login-page')
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  // Tailwind modal
  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current);
    }
    return () => {
      modalInstance.current?.hide(); // Clean up modal on unmount
    };
  }, []);

  const openModal = () => {
    modalInstance.current?.show();
  };

  const closeModal = () => {
    modalInstance.current?.hide();
  };

  return (
    <>
      <ToastContainer />
      <BlockNavigation/>
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
                className="bg-stone-100 rounded-md w-full py-4 px-4 outline-none text-[16px] border-none text-gray-500"
                placeholder="Enter New Password"
                required
                name="password"
                value={data.password}
                onChange={changeHandler}
              />

              <Image
                src={newPasswordShow ? eyeOpen : eyeClose}
                alt="eye"
                className="w-[22px] absolute top-4 end-4 cursor-pointer opacity-30"
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
                className="bg-stone-100 rounded-md w-full py-4 px-4 outline-none text-[16px] border-none text-gray-500"
                placeholder="Enter New Password"
                required
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={changeHandler}
              />

              <Image
                src={confirmPasswordShow ? eyeOpen : eyeClose}
                alt="eye"
                className="w-[22px] absolute top-4 end-4 cursor-pointer h-auto opacity-30"
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
            onClick={openModal}
          >
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
              onClick={() => router.push("/")}
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
                onClick={() => router.push('/auth/forgot-password')}
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

export default NewPasswordPage;

{
  /* <div className="flex h-[100vh] items-center md:gap-4">
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
          
        </div>
      </div>
    </div> */
}
