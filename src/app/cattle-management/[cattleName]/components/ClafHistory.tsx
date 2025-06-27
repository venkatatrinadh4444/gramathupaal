"use client";

import Image from "next/image";
import plus from "@/assets/plus.png";
import cross from "@/assets/cross-dark.png";

const ClafHistory = ({ onCloseFeed }: { onCloseFeed: () => void }) => {
  return (
    <>
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex gap-6 items-end">
            <div>
              <h1 className="font-dmSans text-[20px] font-[600] text-heading">
              Calf Information
              </h1>
              <p className="text-[16px] text-para">
              Details of calves born to this cattle
              </p>
            </div>
            <div className="bg-primary text-white px-3 py-2 text-[14px] flex gap-2 rounded-md items-center">
              <Image src={plus} alt="plus" className="w-[18px] h-auto" />
              <p>Add New Calf</p>
            </div>
          </div>
          <div className="cursor-pointer" onClick={onCloseFeed}>
            <Image src={cross} alt="cross" className="w-[18px] h-auto" />
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-[1.5fr_1.5fr_2fr_2fr_1.5fr] gap-0 my-3">
            <p className="font-dmSans text-[16px] text-primary font-[600]">
            Calf ID
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
            Gender
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
            Birth Date
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
            Current Status
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
            Weight at Birth
            </p>
          </div>
          <hr />
          <div className="grid grid-cols-[1.5fr_1.5fr_2fr_2fr_1.5fr] gap-0 my-3">
            <p className="text-para text-[16px]">C-0456	</p>
            <p className="text-para text-[16px]">Male</p>
            <p className="text-para text-[16px]">01 May 2024	</p>
            <p className="text-para text-[16px]">Healthy</p>
            <p className="text-para text-[16px]">28 kg</p>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default ClafHistory;
