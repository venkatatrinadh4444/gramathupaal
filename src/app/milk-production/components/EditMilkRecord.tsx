"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cross from "@/assets/animal-detail-cross.png";
import tick from "@/assets/animal-detail-tick.png";
import darkCross from "@/assets/cross-dark.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditMilkRecord({
  onEditMilk,
  editRecordData,
  fetchingAfterAddingNewMilkRecord
}: {
  onEditMilk: () => void;
  editRecordData:any;
  fetchingAfterAddingNewMilkRecord:()=>void
}) {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const router = useRouter();


  const [data, setData] = useState({
    date: new Date(editRecordData?.date).toISOString().split("T")[0],
    cattleId: editRecordData?.cattleId,
    milkGrade: editRecordData?.milkGrade,
    morningMilk: editRecordData?.morningMilk,
    afternoonMilk: editRecordData?.afternoonMilk,
    eveningMilk: editRecordData?.eveningMilk,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`${API_URI}/api/dashboard/milk/update-specific-record/${editRecordData?.id}`, data, {
        withCredentials: true,
      })
      .then((res) =>{
        fetchingAfterAddingNewMilkRecord()
        onEditMilk()
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="w-[90%]">
          <h1 className="font-dmSans text-[20px] text-heading font-[600]">
            Edit Milk Production
          </h1>
          {/* Naviagation menu */}

          <div className="overflow-x-auto whitespace-nowrap w-full">
            <div className=" items-center gap-2 flex">
              <p className="text-[#A4A4A4] text-[16px] font-[500]">Dashboard</p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p
                className="text-[#A4A4A4] text-[16px] font-[500] hover:text-primary cursor-pointer"
                onClick={() => router.push("/milk-production")}
              >
                Milk Production Record
              </p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px] font-[500]">
                Add Milk Production
              </p>
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer w-[10%] flex justify-end"
          onClick={onEditMilk}
        >
          <Image src={darkCross} alt="cross" className="w-[24px] h-auto" />
        </div>
      </div>

      {/* Input boxes */}

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-x-[26px] sm:gap-y-[26px] gap-4 sm:my-8 my-4">
        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            placeholder="Select Date"
            required
            name="date"
            value={data?.date}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="cattleId"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Cattle ID
          </label>
          <select
            id="cattleId"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            disabled
          >
            <option value={data?.cattleId}>{data?.cattleId}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="grade"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Milk Grade
          </label>
          <select
            id="grade"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            name="milkGrade"
            value={data?.milkGrade}
            onChange={selectChangeHandler}
          >
            <option value="">A1</option>
            <option value="">A2</option>
            <option value="OneCowA1">OneCowA1</option>
            <option value="OneCowA2">OneCowA2</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="morning-milk"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Morning Milk
          </label>
          <input
            id="morning-milk"
            type="text"
            placeholder="Milk Litres"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            name="morningMilk"
            value={data?.morningMilk}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="afternoon-milk"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Afternoon Milk
          </label>
          <input
            id="afternoon-milk"
            type="text"
            placeholder="Milk Litres"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            name="afternoonMilk"
            value={data?.afternoonMilk}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="evening-milk"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Evening Milk
          </label>
          <input
            id="evening-milk"
            type="text"
            placeholder="Milk Litres"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            name="eveningMilk"
            value={data?.eveningMilk}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <form className="flex gap-2 justify-end" onSubmit={submitHandler}>
        <div
          className="bg-[#4A4A4A] rounded-lg flex items-center px-2.5 cursor-pointer"
          onClick={onEditMilk}
        >
          <Image src={cross} alt="cross" className="w-[18px] h-auto" />
        </div>
        <label
          htmlFor="submitBtn"
          className="bg-primary px-[12px] py-[10px] rounded-lg flex gap-1 items-center text-white cursor-pointer"
        >
          <Image src={tick} alt="cross" className="w-[18px] h-auto" />
          <p className="text-nowrap">Save Information</p>
          <input type="submit" id="submitBtn" className="hidden" />
        </label>
      </form>
    </>
  );
}
