"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cross from "@/assets/animal-detail-cross.png";
import tick from "@/assets/animal-detail-tick.png";
import darkCross from '@/assets/cross-dark.png'
import { useEffect, useState } from "react";
import axios from "axios";

export default function DefaultAddMilkRecord({onAddMilk , cattleId }:{onAddMilk:()=>void , cattleId:string}) {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const router = useRouter();

  const [cattleNames,setCattleNames]=useState([])
  const [data,setData]=useState({
    date:'',
    cattleId:cattleId,
    milkGrade:'A1',
    morningMilk:'',
    afternoonMilk:'',
    eveningMilk:''
  })



  const inputChangeHandler=(e:React.ChangeEvent<HTMLInputElement>)=> {
    setData({...data,[e.target.name]:e.target.value})
  }

  const selectChangeHandler=(e:React.ChangeEvent<HTMLSelectElement>) => {
    setData({...data,[e.target.name]:e.target.value})
  }

  const submitHandler=(e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    axios.post(`${API_URI}/api/dashboard/milk/add-new`,data,{withCredentials:true}).then(res=>console.log(res)).catch(err=>console.log(err))
  }


  return (
    <>
    <div className="flex justify-between items-start">
      <div className="w-[90%]">
        <h1 className="font-dmSans text-[20px] text-heading font-[600]">
          Add Milk Production
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
      <div className="cursor-pointer w-[10%] flex justify-end" onClick={onAddMilk}>
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
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5"
            placeholder="Select Date" 
            required name="date" value={data?.date} onChange={inputChangeHandler}
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
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5"
            required disabled
          >
            <option value={cattleId}>{cattleId}</option>
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
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5"
            required name="milkGrade" value={data?.milkGrade} onChange={selectChangeHandler}
          >
            <option value="">A1</option>
            <option value="">A2</option>
            <option value="">A3</option>
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
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5"
            required name="morningMilk" value={data?.morningMilk} onChange={inputChangeHandler}
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
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5"
            required name="afternoonMilk" value={data?.afternoonMilk} onChange={inputChangeHandler}
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
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5"
            required name="eveningMilk" value={data?.eveningMilk} onChange={inputChangeHandler}
          />
        </div>






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
