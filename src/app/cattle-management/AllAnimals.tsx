"use client";

import sortByImg from "@/assets/sortByImg.png";
import Image from "next/image";
import dropDown from "@/assets/sortDropDown.png";
import filterImg from "@/assets/filterImg.png";
import arrow from "@/assets/cattle-dashboard-arrow.png";
import { useState } from "react";
import rowDataArrow from "@/assets/row-data-arrow.png";
import { format ,parseISO } from 'date-fns'
import lowerExceptFirst from "../common/lowerExceptFirst";
import { useRouter } from "next/navigation";

type Animal = {
  id: number;
  cattleName: string;
  healthStatus: string;
  type: string;
  weight: number;
  active: true;
  snf: string;
  image1: string;
  image2: string;
  fatherInsemination: string;
  parent: string;
  breed: string;
  birthDate: string;
  farmEntryDate: string;
  purchaseAmount: string;
  vendorName: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  averageMilk: number;
};



const AllAnimals = ({ allAnimalDetails }: { allAnimalDetails: Animal[] }) => {
  const [animalsData, setAnimalData] = useState(allAnimalDetails);
  const router = useRouter()

  return (
    <div className=" rounded-2xl bg-white px-4 py-6 ml-4 lg:ml-0">
      <div className="flex justify-between lg:items-end flex-col lg:flex-row items-start gap-4 lg:gap-0">
        <div>
          <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
            Cattle Management
          </h1>
          <div className="flex gap-2 items-center">
            <p className="text-[#A4A4A4] text-[16px]">Dashboard</p>
            <Image src={arrow} alt="arrow" className="w-4 h-auto" />
            <p className="text-primary text-[16px]">Cattle Management</p>
          </div>
        </div>
        <div className="flex gap-2 items-end cattle-management-options">
          <div className="border border-gray-300 flex gap-2 items-center rounded py-2 px-1 justify-between">
            <Image
              src={sortByImg}
              alt="sort-image"
              width={18}
              className="h-auto"
            />
            <p className="text-sm text-[#A4A4A4]">Sort By </p>
            <Image
              src={dropDown}
              alt="drop-down"
              width={18}
              className="h-auto"
            />
          </div>
          <div className="flex gap-2 items-center rounded py-2 px-1 bg-[#4A4A4A] text-white justify-between">
            <Image
              src={filterImg}
              alt="sort-image"
              width={18}
              className="h-auto"
            />
            <p className="text-sm text-white">Filter</p>
            <Image
              src={dropDown}
              alt="drop-down"
              width={18}
              className="h-auto"
            />
          </div>
          <div className=" bg-primary cursor-pointer text-white flex gap-2 items-center rounded py-1 px-2 justify-center" onClick={()=>router.push('/cattle-management/add-new-cattle')}>
            <p className="text-lg text-white">+</p>
            <p className="text-sm text-white">Add Cattle</p>
          </div>
        </div>
      </div>

      {/* Cattle Table */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[900px] w-full">
          {/* Heading row */}
          <div className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] bg-[#F1F6F2] py-3 text-[#4A4A4A] text-[14px] whitespace-nowrap font-[500]  rounded-xl">
            <p></p>
            <p>Cattle Type</p>
            <p>Cattle ID</p>
            <p>Farm Entry Date</p>
            <p>Breed</p>
            <p>Health Status</p>
            <p>Weight</p>
            <p>Average Milk</p>
            <p></p>
          </div>

          {/* Data row */}

          {animalsData?.length > 0 &&
            animalsData?.map((eachAnimal) => {
              return (
                <div
                  className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] py-3 text-[#4A4A4A] text-[14px] whitespace-nowrap pl-2 items-center"
                  key={eachAnimal.id}
                >
                  <div className="w-10 h-10 rounded-[50%]overflow-hidden flex object-cover">
                    <Image
                      src={eachAnimal.image1}
                      width={100}
                      height={100}
                      alt="image1"
                      className="object-cover rounded-[50%]"
                    />
                  </div>

                  <p className="text-[#4A4A4A] ">{lowerExceptFirst(eachAnimal.type)}</p>
                  <p className="text-[#4A4A4A]">{"#"+eachAnimal.cattleName}
                  </p>
                  <p className="text-[#4A4A4A] ">{format(parseISO(eachAnimal.birthDate),"MMM dd, yyyy")}</p>
                  <p className="text-[#4A4A4A] ">{lowerExceptFirst(eachAnimal.breed)}</p>
                  <p className="pl-2">
                    <span className={`text-[12px] rounded-full w-fit px-4 py-2 ${eachAnimal.healthStatus==="HEALTHY"?"bg-[#1D9A6C] text-white":"bg-[#FBC02D] text-black"}`}>
                      {lowerExceptFirst(eachAnimal.healthStatus)}
                    </span>
                  </p>

                  <p className="text-[#4A4A4A] ">{eachAnimal.weight}</p>
                  <div className="flex items-center ">
                    <p className="text-[#4A4A4A]">{eachAnimal?.averageMilk?.toString().slice(0,4)}</p>
                    <p className="text-green-600 text-xs">+18.3%</p>
                  </div>
                  <div className="flex justify-center" onClick={()=>router.push(`cattle-management/${eachAnimal.cattleName}`)}>
                    <button className="bg-[#0E9347] rounded px-1 py-1">
                      <Image
                        src={rowDataArrow}
                        alt="arrow"
                        width={18}
                        height={18}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllAnimals;
