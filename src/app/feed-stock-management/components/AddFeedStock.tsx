"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cross from "@/assets/animal-detail-cross.png";
import tick from "@/assets/animal-detail-tick.png";
import darkCross from "@/assets/cross-dark.png";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const units = ["KG", "PIECES", "PACKETS"];

export default function AddFeedStockRecord({
  onAddMilk,
  fetchAllMilkRecords,
}: {
  onAddMilk: () => void;
  fetchAllMilkRecords: () => void;
}) {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    date: "",
    unit: units[0],
    quantity: "",
    notes: "",
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
      .post(`${API_URI}/api/dashboard/feed-stock/add-new`, data, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        fetchAllMilkRecords();
        onAddMilk();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-start">
        <div className="w-[90%]">
          <h1 className="font-dmSans text-[20px] text-heading font-[600]">
            Add New Feed Item
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
                Feed Stock Management
              </p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px] font-[500]">
                Add Feed Item
              </p>
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer w-[10%] flex justify-end"
          onClick={onAddMilk}
        >
          <Image src={darkCross} alt="cross" className="w-[24px] h-auto" />
        </div>
      </div>

      {/* Input boxes */}

      <div className="grid xl:grid-cols-2 sm:grid-cols-2 gap-x-[26px] sm:gap-y-[26px] gap-4 sm:mt-6 mt-4">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Feed Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Feed name"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            name="name"
            value={data?.name}
            onChange={inputChangeHandler}
          />
        </div>

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
            htmlFor="unit"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Inventory Unit
          </label>
          <select
            id="unit"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            name="unit"
            value={data?.unit}
            onChange={selectChangeHandler}
          >
            <option value="KG">KG</option>
            <option value="PIECES">PIECES</option>
            <option value="PACKETS">PACKETS</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="quantity"
            className="font-dmSans font-[500] text-[16px] text-heading"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="text"
            placeholder="Quantity"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px]"
            required
            name="quantity"
            value={data?.quantity}
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className="flex flex-col my-[26px]">
        <label
          htmlFor="notes"
          className="font-dmSans font-[500] text-[16px] text-heading"
        >
          Notes
        </label>
        <textarea
          id="notes"
          className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5"
          rows={4}
          placeholder="Notes"
          required
          value={data?.notes}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
        />
      </div>

      <form className="flex gap-2 justify-end" onSubmit={submitHandler}>
        <div
          className="bg-[#4A4A4A] rounded-lg flex items-center px-2.5 cursor-pointer"
          onClick={onAddMilk}
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
