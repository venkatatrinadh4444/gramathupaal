"use client";

import Image from "next/image";
import plus from "@/assets/plus.png";
import cross from "@/assets/cross-dark.png";
import { useEffect, useState } from "react";
import axios from "axios";

const FeedHistory = ({
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
      .get(`${API_URI}/api/dashboard/animal/feed-history/${cattleName}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="my-8">
        <div className="flex justify-between items-start mx-8">
          <div className="flex items-end gap-6 feed-and-calf-options">
            <div>
              <h1 className="font-dmSans text-[20px] font-[600] text-heading">
                Feed History
              </h1>
              <p className="text-[16px] text-para font-[500]">
                Daily feed records for this cattle
              </p>
            </div>
            <div className="bg-primary text-white px-3 py-2.5 text-[14px] flex gap-2 rounded-lg items-center">
              <Image src={plus} alt="plus" className="w-[18px] h-auto" />
              <p>Feed Record</p>
            </div>
          </div>
          <div className="cursor-pointer" onClick={onCloseFeed}>
            <Image src={cross} alt="cross" className="w-[18px] h-auto" />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[800px] w-full">
            <div className="grid grid-cols-[2fr_2fr_2fr_3fr_1fr] my-3 mx-8 whitespace-nowrap">
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
                Feed Type
              </p>
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Quantity
              </p>
            </div>
            <hr className="border border-para opacity-20 rounded-lg" />
            <div className="grid grid-cols-[2fr_2fr_2fr_3fr_1fr] my-3 mx-8">
              <p className="text-para text-[16px]">Morning</p>
              <p className="text-para text-[16px]">7:30 AM</p>
              <p className="text-para text-[16px]">03 June 2025</p>
              <p className="text-para text-[16px]">Green Fodder</p>
              <p className="text-para text-[16px]">8 kg</p>
            </div>
            <hr className="border border-para opacity-20 rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedHistory;
