"use client";

import sortByImg from "@/assets/sortByImg.png";
import Image from "next/image";
import dropDown from "@/assets/sortDropDown.png";
import filterImg from "@/assets/filterImg.png";
import arrow from "@/assets/cattle-dashboard-arrow.png";
import { useEffect, useState } from "react";
import rowDataArrow from "@/assets/row-data-arrow.png";
import { format, parseISO } from "date-fns";
import lowerExceptFirst from "../common/lowerExceptFirst";
import { useRouter } from "next/navigation";
import rightClick from "@/assets/pagination-right.png";
import leftClick from "@/assets/pagination-left.png";
import search from "@/assets/search.png";
import whiteDropDown from "@/assets/white-drop-down.png";
import whitePlus from "@/assets/white-plus.png"

const AllMilkRecords = ({ allMilkRecords }: { allMilkRecords: any }) => {
  const [allRecords, setAllRecords] = useState(allMilkRecords);

  const router = useRouter();

  /* Handling Pagination */
  const pageSize = 25;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allMilkRecords?.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handleNext = () => {
    if (endIndex < allMilkRecords?.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (page: number) => {
    setPage(page);
  };

  const getPaginationRange = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i as number;
    }

    return rangeWithDots;
  };

  useEffect(() => {
    const slicedData = allMilkRecords?.slice(startIndex, endIndex);
    setAllRecords(slicedData);
  }, [page]);

  return (
    <div className=" rounded-2xl bg-white py-6 mx-4 my-4">
      <div className="flex justify-between xxl:items-end flex-col xxl:flex-row items-start gap-4 xxl:gap-0 xxl:mx-8 mx-4">
        <div>
          <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
            Milk Production Record
          </h1>
          <div className="flex gap-2 items-center">
            <p className="text-[#A4A4A4] text-[16px] font-[500]">Dashboard</p>
            <Image src={arrow} alt="arrow" className="w-4 h-auto" />
            <p className="text-primary text-[16px] font-[500]">Milk Production Record</p>
          </div>
        </div>
        <div className="flex gap-3 items-end milk-production-options">
          <div className="border border-para flex gap-2 items-center rounded-lg py-0.5 px-2 justify-between">
            <input
              type="text"
              placeholder="Search ID"
              className="border-none text-para text-sm w-full"
            />
            <Image
              src={search}
              alt="sort-image"
              width={18}
              className="h-auto"
            />
          </div>

          <div className="border border-para flex gap-2 items-center rounded-lg py-[9.5px] px-3.5 justify-between">
            <Image
              src={sortByImg}
              alt="sort-image"
              width={20}
              className="h-auto"
            />
            <p className="text-sm text-para font-[500]">Sort By </p>
            <Image
              src={dropDown}
              alt="drop-down"
              width={20}
              className="h-auto"
            />
          </div>
          <div className="flex gap-2 items-center rounded-lg py-2.5 px-3.5 bg-[#4A4A4A] text-white justify-between">
            <Image
              src={filterImg}
              alt="sort-image"
              width={20}
              className="h-auto"
            />
            <p className="text-sm text-white font-[500]">Filter</p>
            <Image
              src={whiteDropDown}
              alt="drop-down"
              width={20}
              className="h-auto"
            />
          </div>
          <div
            className=" bg-primary cursor-pointer flex gap-2 items-center rounded-lg py-2.5 px-3.5 justify-center"
            onClick={() => router.push("/cattle-management/add-new-cattle")}
          >
            <Image src={whitePlus} alt="add" width={20} className="h-auto" />
            <p className="text-sm text-white font-[500]">Add Cattle</p>
          </div>
        </div>
      </div>

      {/* Cattle Table */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[900px] w-full">
          {/* Heading row */}
          <div className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] bg-[#F1F6F2] py-3 text-[#4A4A4A] text-[16px] whitespace-nowrap font-[500] gap-3 rounded-xl mx-4">
            <p></p>
            <p>Cattle Type</p>
            <p>Cattle ID</p>
            <p>Date</p>
            <p>Morning Milk</p>
            <p>Afternoon Milk</p>
            <p>Evening Milk</p>
            <p>Milk Grade</p>
            <p></p>
          </div>

          {/* Data row */}

          {allRecords?.length > 0 &&
            allRecords?.map((eachRecord: any) => {
              return (
                <div key={eachRecord.id}>
                  <div
                    className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] py-3 text-[#4A4A4A] text-[14px] gap-2 whitespace-nowrap items-center"
                    key={eachRecord.id}
                  >
                    <div className="w-10 h-10 rounded-[50%]overflow-hidden flex object-cover mx-6">
                      <Image
                        src={eachRecord?.cattle?.image1}
                        width={100}
                        height={100}
                        alt="image1"
                        className="object-cover rounded-[50%]"
                      />
                    </div>

                    <p className="text-[#4A4A4A]">
                      {lowerExceptFirst(eachRecord?.cattle?.type)}
                    </p>
                    <p className="text-[#4A4A4A]">
                      {"#" + eachRecord?.cattle?.cattleName}
                    </p>
                    <p className="text-[#4A4A4A] ">
                      {format(parseISO(eachRecord.date), "MMM dd, yyyy")}
                    </p>
                    <p className="text-[#4A4A4A] text-center ">
                      {lowerExceptFirst(eachRecord.morningMilk)}
                    </p>
                    <p className="text-[#4A4A4A] text-center">
                      {lowerExceptFirst(eachRecord.afternoonMilk)}
                    </p>

                    <p className="text-[#4A4A4A] text-center">
                      {eachRecord.eveningMilk}
                    </p>

                    <p className="text-[#4A4A4A] text-center">
                      {eachRecord.milkGrade}
                    </p>

                    <div
                      className="flex justify-center"
                      onClick={() =>
                        router.push(
                          `cattle-management/${eachRecord?.cattle?.cattleName}`
                        )
                      }
                    >
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
                  <div className="w-full">
                    <hr className="border border-para opacity-40 rounded-lg" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/*  Pagination */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm">
          Showing 1 to 25 of {allRecords.length} entries
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={handlePrev}
            className="cursor-pointer border-para rounded-[8px] border px-2 py-1 disabled:border-none"
            disabled={page === 1}
          >
            <Image src={leftClick} alt="left" className="w-[8px] h-auto" />
          </button>

          {getPaginationRange().map((eachPage, idx) =>
            typeof eachPage === "number" ? (
              <button
                key={idx}
                onClick={() => goToPage(eachPage)}
                className={`w-6 h-6 flex items-center justify-center rounded text-sm font-dmSans ${
                  page === eachPage
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
              >
                {eachPage}
              </button>
            ) : (
              <span
                key={idx}
                className="w-6 h-6 flex items-center justify-center text-sm"
              >
                ...
              </span>
            )
          )}

          <button
            onClick={handleNext}
            className="cursor-pointer border-para rounded-[8px] border px-2 py-1 disabled:border-none"
            disabled={endIndex >= allMilkRecords?.length}
          >
            <Image src={rightClick} alt="left" className="w-[8px] h-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMilkRecords;
