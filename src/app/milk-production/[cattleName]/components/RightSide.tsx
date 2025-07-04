"use client";

import blackCalander from "@/assets/black-calender.png";
import editImage from "@/assets/edit-milk.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { format, parseISO } from "date-fns";
import threeDots from "@/assets/three-dots.png";
import editBtn from "@/assets/edit.png";
import deleteBtn from "@/assets/delete.png";

export default function RightSide({
  onEditRecord,
  setEditRecordData,
  allRecords,
}: {
  onEditRecord: () => void;
  setEditRecordData: React.Dispatch<React.SetStateAction<{}>>;
  allRecords:any[];
}) {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  };


  const editButtonHandler = (data: any) => {
    onEditRecord();
    setEditRecordData(data);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between mb-6 xl:items-center xl:flex-row flex-col gap-2">
        <div>
          <h1 className="font-dmSans text-[20px] text-primary font-[600]">
            Milk Production Record
          </h1>
          <p className="text-para font-[500] text-[16px]">
            Milk Production Info of This Cattle
          </p>
        </div>
        <div className="relative inline-flex items-center gap-2 justify-end">
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
            <span className="text-para font-[500] text-sm">
              Select Date Range
            </span>
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
            {allRecords?.length > 0 &&
              allRecords?.map((eachRecord: any) => {
                return (
                  <div
                    key={eachRecord?.id}
                    className="text-[16px] font-[500] text-heading grid grid-cols-[3fr_3fr_3fr_3fr_3fr_2fr] items-center whitespace-nowrap mb-8"
                  >
                    <p>{format(parseISO(eachRecord?.date), "MMM dd, yyyy")}</p>
                    <p>{eachRecord?.morningMilk} L</p>
                    <p>{eachRecord?.afternoonMilk} L</p>
                    <p>{eachRecord?.eveningMilk} L</p>
                    <p>{eachRecord?.milkGrade}</p>
                    <div className="relative group flex justify-center items-center cursor-pointer">
                      <Image
                        src={threeDots}
                        alt="options"
                        className="w-[20px] h-auto"
                      />

                      {/* Dropdown shown only on hover */}
                      <div className="absolute top-[-12px] right-12 mt-2 z-10 hidden group-hover:flex flex-col w-[120px] bg-background rounded-[19px]">
                        <button
                          onClick={() => editButtonHandler(eachRecord)}
                          className="flex items-center gap-2 px-4 py-3"
                        >
                          <Image
                            src={editBtn}
                            alt="edit-milk"
                            className="w-[16px] h-auto"
                          />
                          <span className="text-[16px] font-medium text-heading">
                            Edit
                          </span>
                        </button>

                        <hr className="border-t border-gray-200 my-1" />

                        <button
                          className="flex items-center gap-2 px-4 py-3"
                        >
                          <Image
                            src={deleteBtn}
                            alt="delete-milk"
                            className="w-[16px] h-auto"
                          />
                          <span className="text-[16px] font-medium text-heading">
                            Delete
                          </span>
                        </button>
                      </div>
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

{
  // <div
  //                     className="relative flex justify-center cursor-pointer"
  //                     onClick={() => editButtonHandler(eachRecord)}
  //                   >
  //                     <Image
  //                       src={threeDots}
  //                       alt="options"
  //                       className="w-[20px] h-auto"
  //                     />
  //                     <div className="bg-background rounded-[19px] absolute top-0">
  //                       <p className="flex gap-2 p-[17px]">
  //                         <Image
  //                           src={editBtn}
  //                           alt="edit-milk"
  //                           className="w-[20px] h-auto"
  //                         />
  //                         <p className="text-[16px] font-[500] text-heading">Edit</p>
  //                       </p>
  //                       <hr className="border border-para opacity-20 rounded-lg" />
  //                       <p className="flex gap-2 p-[17px]">
  //                         <Image
  //                           src={deleteBtn}
  //                           alt="delete-milk"
  //                           className="w-[20px] h-auto"
  //                         />
  //                         <p className="text-[16px] font-[500] text-heading">Delete</p>
  //                       </p>
  //                     </div>
  //                   </div>
}
