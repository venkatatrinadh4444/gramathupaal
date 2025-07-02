"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const UserContext = createContext({});
const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const excludePaths = [
    "/login",
    "/forgot-password",
    "/forgot-password/verify-otp",
    "/reset-password",
  ];


  const handleTokenMissing = () => {
    if (!excludePaths.includes(pathName)) {
      console.log('method',pathName)
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // hide alert after 2 seconds
        router.replace("/login");
      }, 2000);
    }
  };

  const fetchUser = () => {
    axios
      .get(`${API_URI}/api/user/profile`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setShowAlert(false); // ensure no alert shows on success
      })
      .catch(handleTokenMissing);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(`${API_URI}/api/user/profile`, { withCredentials: true })
        .catch(handleTokenMissing);
    }, 5 * 60 * 1000); // every 5 mins

    return () => clearInterval(intervalId);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, email, setEmail }}>
      {children}

      {showAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
          <div
            className="flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9V5a1 1 0 112 0v4a1 1 0 01-2 0zm2 5a1 1 0 10-2 0 1 1 0 002 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Error</span>
            <div className="text-sm">
              <strong>Token missing or expired.</strong> Redirecting to login...
            </div>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
};

export const useContextData = () => {
  return useContext(UserContext);
};

/* "use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const UserContext = createContext({});
const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
import { Modal } from "flowbite";

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalInstance = useRef<Modal | null>(null);
  const router = useRouter();
  const [user, setUser] = useState({});

  const fetchUser = () => {
    axios
      .get(`${API_URI}/api/user/profile`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => router.push("/login"));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const openModal = () => {
    modalInstance.current?.show();
  };

  const closeModal = () => {
    modalInstance.current?.hide();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(`${API_URI}/api/user/profile`, { withCredentials: true })
        .then()
        .catch(() => {
            router.replace("/login")
            openModal()
        })
    }, 5 * 60 * 1000)
    return () => clearInterval(intervalId);
  }, []);

  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
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
                Token not found redirecting...
              </h3>
            </div>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export const useContextData = () => {
  return useContext(UserContext);
};
 */
