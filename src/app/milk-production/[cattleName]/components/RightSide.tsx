"use client";

import blackCalander from "@/assets/black-calender.png";
import editImage from "@/assets/edit-milk.png";
import Image from "next/image";
import { useRef } from "react";

export default function RightSide() {
  const sampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between mb-6 items-center">
        <div>
          <h1 className="font-dmSans text-[20px] text-primary font-[600]">
            Milk Production Record
          </h1>
          <p className="text-para font-[500] text-[16px]">
            Milk Production Info of This Cattle
          </p>
        </div>
        <div className="relative inline-flex items-center gap-2">
          <button
            type="button"
            onClick={handleClick}
            className="flex items-center gap-2 border border-para rounded-lg px-[14px] py-[12px]"
          >
            <Image
              src={blackCalander}
              alt="calendar"
              className="w-[21px] h-auto"
            />
            <span className="text-para font-[500] text-sm">Select Date Range</span>
          </button>

          <input
            type="date"
            ref={inputRef}
            className="absolute left-0 top-0 opacity-0 w-full h-full z-[-1]"
          />
        </div>
      </div>

      <hr className="border border-para opacity-20 rounded-lg" />

      <div className="overflow-x-auto mt-6">
        <div className="min-w-[700px] w-full">
          {/* head row */}
          <div className="font-dmSans text-[16px] font-[600] text-primary grid grid-cols-[3fr_3fr_3fr_3fr_3fr_2fr] whitespace-nowrap">
            <p>Date</p>
            <p>Morning Milk</p>
            <p>Afternoon Milk</p>
            <p>Evening Milk</p>
            <p>Milk Grade</p>
            <p></p>
          </div>

          <div className="mt-8 h-[360px] overflow-y-auto">
            {/* data row */}
            {sampleArray.map((each) => {
              return (
                <div
                  key={each}
                  className="text-[16px] font-[500] text-heading grid grid-cols-[3fr_3fr_3fr_3fr_3fr_2fr] items-center whitespace-nowrap mb-8"
                >
                  <p>Mar 15, 2025</p>
                  <p>10 L</p>
                  <p>2 L</p>
                  <p>8 L</p>
                  <p>A1</p>
                  <div className="flex justify-center">
                    <Image
                      src={editImage}
                      alt="edit-milk"
                      className="w-[20px] h-auto"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
          <input type="date" id="calendarDate" className=""/>
          <label
            htmlFor="calendarDate"
            className="flex items-center gap-2 border border-para rounded-lg px-[14px] py-[12px] cursor-pointer bg-white"
          >
            <Image
              src={blackCalander}
              alt="calendar"
              className="w-[21px] h-auto"
            />
            <span className="text-para font-[500] text-sm">Select Date</span>
          </label>
        </div> */
}
