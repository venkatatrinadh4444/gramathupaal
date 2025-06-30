"use client";

import Image from "next/image";
import plus from "@/assets/plus.png";
import cross from "@/assets/cross-dark.png";
import { useState, useEffect } from "react";
import axios from "axios";

const VaccinationHistory = ({
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
      .get(`${API_URI}/api/dashboard/animal/checkup-history/${cattleName}`, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="my-8">
        <div className="flex justify-between items-start gap-16 mx-8">
          <div className="flex items-end gap-6 vaccination-history-options">
            <div>
              <h1 className="font-dmSans text-[20px] font-[600] text-heading">
                Medical Report History
              </h1>
              <p className="text-[16px] text-para font-[500]">
                All recorded health data for this cattle
              </p>
            </div>
            <div className="bg-primary text-white px-3 py-2.5 text-[14px] flex gap-2 rounded-lg items-center font-[500]">
              <Image src={plus} alt="plus" className="w-[18px] h-auto" />
              <p>Add Medical Report</p>
            </div>
          </div>
          <div className="cursor-pointer" onClick={onCloseFeed}>
            <Image src={cross} alt="cross" className="w-[18px] h-auto" />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[700px] w-full">
            <div className="grid grid-cols-[1.5fr_3fr_4fr] gap-4 my-3 mx-8">
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Date
              </p>
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Prescription
              </p>
              <p className="font-dmSans text-[16px] text-primary font-[600]">
                Description
              </p>
            </div>
            <hr className="border border-para opacity-20 rounded-lg" />
            <div className="grid grid-cols-[1.5fr_3fr_4fr] gap-4 my-3 mx-8">
              <p className="text-para text-[16px]">2025-05-19</p>
              <p className="text-para text-[16px]">Calcium Supplement</p>
              <p className="text-para text-[16px]">
                Mild calcium deficiency observed
              </p>
            </div>
            <hr className="border border-para opacity-20 rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default VaccinationHistory;
