"use client";

import Image from "next/image";
import plus from "@/assets/plus.png";
import cross from "@/assets/cross-dark.png";
import { useState, useEffect } from "react";
import axios from "axios";

const MilkHistory = ({
  onCloseFeed,
  cattleName,
}: {
  onCloseFeed: () => void;
  cattleName: any;
}) => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URI}/api/dashboard/animal/milk-history/${cattleName}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="my-8">
        <div className="flex justify-between items-start gap-16 mx-8">
          <div className="flex items-end gap-6 milk-history-options">
            <div>
              <h1 className="font-dmSans text-[20px] font-[600] text-heading">
                Milk Production History
              </h1>
              <p className="text-[16px] text-para">
                Daily milk yield data with session
              </p>
            </div>
            <div className="bg-primary text-white px-3 py-2 text-[14px] flex gap-2 rounded-md items-center">
              <Image src={plus} alt="plus" className="w-[18px] h-auto" />
              <p>Add Milk Record</p>
            </div>
          </div>
          <div className="cursor-pointer" onClick={onCloseFeed}>
            <Image src={cross} alt="cross" className="w-[18px] h-auto" />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[600px] w-full">
            <div className="grid grid-cols-[1fr_1fr_2fr_2fr] gap-8 my-3 mx-8">
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Session
              </p>
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Time
              </p>
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Date
              </p>
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Quantity
              </p>
            </div>
            <hr className="border border-para opacity-20 rounded-lg" />
            <div className="grid grid-cols-[1fr_1fr_2fr_2fr] gap-8 my-3 mx-8">
              <p className="text-para text-[16px]">Morning</p>
              <p className="text-para text-[16px]">7:30 AM</p>
              <p className="text-para text-[16px]">03 June 2025</p>
              <p className="text-para text-[16px]">8 litres</p>
            </div>
            <hr className="border border-para opacity-20 rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MilkHistory;
