"use client";

import sortByImg from "@/assets/sortByImg.png";
import Image from "next/image";
import dropDown from "@/assets/sortDropDown.png";
import filterImg from "@/assets/filterImg.png";
import arrow from "@/assets/cattle-dashboard-arrow.png";
import { useEffect, useState, useRef } from "react";
import rowDataArrow from "@/assets/row-data-arrow.png";
import { format, parseISO } from "date-fns";
import lowerExceptFirst from "../common/lowerExceptFirst";
import { useRouter } from "next/navigation";
import rightClick from "@/assets/pagination-right.png";
import leftClick from "@/assets/pagination-left.png";
import search from "@/assets/search.png";
import whiteDropDown from "@/assets/white-drop-down.png";
import whitePlus from "@/assets/white-plus.png";
import axios from "axios";
import AddMilkRecord from "./components/AddMilkRecord";

const breeds = ["COW", "BUFFALO", "GOAT"];

const AllMilkRecords = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;

  const [milkOverview, setMilkOverview] = useState({}) as any;

  const [allRecords, setAllRecords] = useState([]);
  const [showAddMilk, setShowAddMilk] = useState(false);
  const [sortByValue, setSortByValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // sortBy and filter options
  const selectRef = useRef<HTMLSelectElement>(null);
  const filterSelectRef = useRef<HTMLSelectElement>(null);

  const handleLabelClick = () => {
    // Try to trigger click/focus
    if (selectRef.current) {
      selectRef.current.focus(); // triggers focus
      selectRef.current.click(); // helps on some browsers like Safari
    }
  };

  const handleFilterClick = () => {
    if (filterSelectRef.current) {
      filterSelectRef.current.focus();
      filterSelectRef.current.click();
    }
  };

  const router = useRouter();

  const [page, setPage] = useState(1);

  const getPaginationRange = () => {
    const delta = 1;
    const total = milkOverview?.totalPages || 1;

    // Full range from 1 to total
    const allPages = Array.from({ length: total }, (_, i) => i + 1);

    // Filter to include: first, last, current ± delta
    const visiblePages = allPages.filter(
      (i) => i === 1 || i === total || (i >= page - delta && i <= page + delta)
    );

    // Remove duplicates and sort
    return Array.from(new Set(visiblePages)).sort((a, b) => a - b);
  };

  useEffect(() => {
    axios
      .get(`${API_URI}/api/dashboard/milk/all-milk-records/${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMilkOverview(res?.data?.milkOverview);
        setAllRecords(res?.data?.milkOverview?.allRecords);
      })
      .catch((err) => console.log(err));
  }, [page]);

  // Handling the sortby , filter and search along with pagination

  useEffect(() => {
    setPage(1);
  }, [sortByValue, filterValue, searchValue]);

  const fetchSortData = () => {
    axios
      .get(
        `${API_URI}/api/dashboard/milk/all-milk-records/${page}?sortBy=${sortByValue}`,
        { withCredentials: true }
      )
      .then((res) => {
        setMilkOverview(res?.data?.milkOverview);
        setAllRecords(res?.data?.milkOverview?.allRecords);
      })
      .catch((err) => console.log(err));
  };

  const fetchFilterData = () => {
    axios
      .get(
        `${API_URI}/api/dashboard/milk/all-milk-records/${page}?filter=${filterValue}`,
        { withCredentials: true }
      )
      .then((res) => {
        setMilkOverview(res?.data?.milkOverview);
        setAllRecords(res?.data?.milkOverview?.allRecords);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchedData = () => {
    axios
      .get(
        `${API_URI}/api/dashboard/milk/all-milk-records/${page}?search=${searchValue}`,
        { withCredentials: true }
      )
      .then((res) => {
        setMilkOverview(res?.data?.milkOverview);
        setAllRecords(res?.data?.milkOverview?.allRecords);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSortData();
  }, [page, sortByValue]);

  useEffect(() => {
    fetchFilterData();
  }, [page, filterValue]);

  useEffect(() => {
    fetchSearchedData();
  }, [page, searchValue]);

  return (
    <div className="relative rounded-[20px] bg-white py-6 mx-4 my-4 overflow-hidden">
      <div className="flex justify-between xxl:items-end flex-col xxl:flex-row items-start gap-4 xxl:gap-0 xxl:mx-8 mx-4">
        <div>
          <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
            Milk Production Record
          </h1>
          <div className="overflow-x-auto">
            <div className="flex gap-2 items-center">
              <p className="text-[#A4A4A4] text-[16px] font-[500]">Dashboard</p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px] font-[500] text-nowrap">
                Milk Production Record
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-end milk-production-options">
          {/* search option */}
          <div className="border border-para flex gap-2 items-center rounded-lg py-0.5 px-2 justify-between">
            <input
              type="text"
              placeholder="Search ID"
              className="border-none text-para text-sm w-full"
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
            />
            <Image
              src={search}
              alt="sort-image"
              width={18}
              className="h-auto"
            />
          </div>

          {/* sortBy option */}
          <div className="relative inline-block">
            <label
              htmlFor="sortBy"
              onClick={handleLabelClick}
              className="border border-para flex gap-2 justify-between items-center rounded-lg py-[9.5px] px-2.5 cursor-pointer"
            >
              <Image
                src={sortByImg}
                alt="sort-image"
                width={20}
                className="h-auto"
              />
              <p className="font-[500] text-sm text-para">Sort By</p>
              <Image
                src={dropDown}
                alt="drop-down"
                width={20}
                className="h-auto"
              />
            </label>

            <select
              ref={selectRef}
              id="sortBy"
              className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              onChange={(e) => setSortByValue(e.target.value)}
            >
              <option value="name-asc">Ascending Order</option>
              <option value="name-desc">Descending Order</option>
              <option value="newest">Recently Added</option>
              <option value="oldest">Oldest Added</option>
            </select>
          </div>

          {/* filter option */}
          <div className="relative">
            <label
              onClick={handleFilterClick}
              className="flex gap-2 items-center rounded-lg py-[9px] px-2.5 bg-[#4A4A4A] justify-between cursor-pointer"
            >
              <Image
                src={filterImg}
                alt="filter-image"
                width={20}
                className="h-auto"
              />
              <p className="font-[500] text-white">Filter</p>
              <Image
                src={whiteDropDown}
                alt="drop-down"
                width={20}
                className="h-auto"
              />
            </label>

            <select
              ref={filterSelectRef}
              className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              onChange={(e) => setFilterValue(e.target.value)}
            >
              {breeds.map((eachBreed) => (
                <option
                  key={eachBreed}
                  value={eachBreed}
                  className="bg-[#4A4A4A] text-white"
                >
                  {eachBreed}
                </option>
              ))}
            </select>
          </div>

          {/* add milk record */}
          <div
            className=" bg-primary cursor-pointer flex gap-2 items-center rounded-lg py-[11px] px-3.5 justify-center"
            onClick={() => setShowAddMilk(true)}
          >
            <Image src={whitePlus} alt="add" width={20} className="h-auto" />
            <p className="text-sm text-white font-[500]">Add Milk Record</p>
          </div>
        </div>
      </div>

      {/* Cattle Table */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[900px] w-full">
          {/* Heading row */}
          <div className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] bg-[#F1F6F2] py-3 text-heading text-[16px] whitespace-nowrap rounded-2xl mx-4 gap-3 font-[500]">
            <p></p>
            <p>Cattle Type</p>
            <p>Cattle ID</p>
            <p className="pl-4">Date</p>
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
                    className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] py-3 text-[#4A4A4A] text-[14px] whitespace-nowrap items-center mx-6 gap-3"
                    key={eachRecord.id}
                  >
                    <div className="w-10 h-10 rounded-[50%]overflow-hidden flex object-cover">
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
                    <p className="text-[#4A4A4A] text-center">
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
                          `milk-production/${eachRecord?.cattle?.cattleName}`
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
                    <hr className="border border-para opacity-20 rounded-lg" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/*  Pagination */}
      <div className="flex justify-between flex-col gap-2 sm:flex-row items-center mt-3 mx-4">
        <p className="text-sm">
          Showing 1 to 25 of {milkOverview?.totalRecordsCount} entries
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setPage(page - 1)}
            className="cursor-pointer border-para rounded-[8px] border px-2 py-1 disabled:cursor-auto"
            disabled={page === 1}
          >
            <Image src={leftClick} alt="left" className="w-[8px] h-auto" />
          </button>

          {getPaginationRange().map((eachPage, idx) => (
            <button
              key={idx}
              onClick={() => setPage(eachPage)}
              className={`w-6 h-6 flex items-center justify-center rounded text-sm font-dmSans ${
                page === eachPage
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }`}
            >
              {eachPage}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            className="cursor-pointer border-para rounded-[8px] border px-2 py-1 disabled:cursor-auto"
            disabled={page === milkOverview?.totalPages}
          >
            <Image src={rightClick} alt="left" className="w-[8px] h-auto" />
          </button>
        </div>
      </div>

      {/* pop over */}

      {showAddMilk && (
        <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-xl max-w-4xl xxl:w-[50%] xl:w-[55%] md:w-[55%] sm:w-[75%] w-[90%]  overflow-hidden sm:p-10 p-6">
            <AddMilkRecord onAddMilk={() => setShowAddMilk(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMilkRecords;
