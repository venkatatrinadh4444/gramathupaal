"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cross from "@/assets/animal-detail-cross.png";
import tick from "@/assets/animal-detail-tick.png";
import darkCross from "@/assets/cross-dark.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


export default function AddVaccinationStockRecord({
  onAddMilk,
  fetchAllMilkRecords,
}: {
  onAddMilk: () => void;
  fetchAllMilkRecords: () => void;
}) {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const router = useRouter();
  const [allCattleNames,setAllCattleNames]=useState([])

  const fetchingAllCattleNames = ()=> {
    axios.get(`${API_URI}/api/dashboard/animal/all-cattle-names`,{withCredentials:true}).then(res=>{
        const allCattleNames=res?.data?.allCattlesIds
        setAllCattleNames(allCattleNames.map((item:any)=>item.cattleName))
    }).catch(err=>console.log(err))
  }

  useEffect(()=>{
    fetchingAllCattleNames()
  },[])

  const [data, setData] = useState({
    type:"COW",
    cattleName:'',
    doctorName:'',
    doctorPhone:'',
    name:"",
    date:'',
    notes: "",
  });

  useEffect(()=> {
    setData({...data,cattleName:allCattleNames?.[0]})
  },[allCattleNames])

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${API_URI}/api/dashboard/doctor/vaccination/add-new`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        // toast.success(res?.data?.message);
        // fetchAllMilkRecords();
        // onAddMilk();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-start">
        <div className="w-[90%]">
          <h1 className="font-dmSans text-[20px] text-heading font-[600]">
            Add Vaccination Record
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
                Vaccination Records
              </p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px] font-[500]">
                Add Vaccination Record
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
            htmlFor="type"
            className="font-dmSans font-[500] text-[16px] text-heading cursor-pointer"
          >
            Cattle Type
          </label>
          <select
            id="type"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px] cursor-pointer"
            required
            name="type"
            value={data?.type}
            onChange={selectChangeHandler}
          >
            <option value="COW">COW</option>
            <option value="BUFFALO">BUFFALO</option>
            <option value="GOAT">GOAT</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="type"
            className="font-dmSans font-[500] text-[16px] text-heading cursor-pointer"
          >
            Cattle ID
          </label>
          <select
            id="type"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px] cursor-pointer"
            required
            name="cattleName"
            value={data?.cattleName}
            onChange={selectChangeHandler}
          >
            {allCattleNames?.length>0 && allCattleNames?.map((eachName:any)=> {
                return (
                    <option key={eachName}>{eachName}</option>
                )
            })}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="doctorName"
            className="font-dmSans font-[500] text-[16px] text-heading cursor-pointer"
          >
            Doctor Name
          </label>
          <input
            id="doctorName"
            type="text"
            placeholder="Doctor Name"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px] cursor-pointer"
            required
            name="doctorName"
            value={data?.doctorName}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="doctorNumber"
            className="font-dmSans font-[500] text-[16px] text-heading cursor-pointer"
          >
            Doctor Number
          </label>
          <input
            id="doctorNumber"
            type="text"
            placeholder="Doctor Number"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px] cursor-pointer"
            required
            name="doctorPhone"
            value={data?.doctorPhone}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="font-dmSans font-[500] text-[16px] text-heading cursor-pointer"
          >
            Vaccination Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Vaccination name"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px] cursor-pointer"
            required
            name="name"
            value={data?.name}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="font-dmSans font-[500] text-[16px] text-heading cursor-pointer"
          >
            Vaccination Date
          </label>
          <input
            id="date"
            type="date"
            className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 py-[14px] pr-[8px] pl-[16px] cursor-pointer"
            placeholder="Select Date"
            required
            name="date"
            onChange={inputChangeHandler}
          />
        </div>
      </div>

      <div className="flex flex-col my-[26px]">
        <label
          htmlFor="notes"
          className="font-dmSans font-[500] text-[16px] text-heading cursor-pointer"
        >
          Notes
        </label>
        <textarea
          id="notes"
          className="bg-background text-sm font-[400] text-para rounded-md border-none mt-1.5 cursor-pointer"
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
