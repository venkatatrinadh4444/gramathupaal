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
import whitePlus from "@/assets/white-plus.png";
import axios from "axios";
import whiteDropDown from "@/assets/white-drop-down.png";

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
  totalPages: number;
};

const breeds = [
  "COW",
  "BUFFALO",
  "GOAT",
  "KARAMPASU",
  "KANNI_ADU",
  "SALEM_BLACK",
  "TELLICHERRY",
  "KANGAYAM",
  "UMBLACHERY",
  "BARGUR",
  "HALLIKAR",
  "ONGOLE",
  "MURRAH",
  "SURTI",
  "MEHSANA",
  "LOCAL_NON_DESCRIPT",
];

const AllAnimals = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [animalsData, setAnimalData] = useState([]) as any;
  const [page, setPage] = useState(1);
  const [sortByValue, setSortByValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

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

  const getPaginationRange = () => {
    const delta = 1;
    const total = animalsData?.[0]?.totalPages || 1;

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
      .get(`${API_URI}/api/dashboard/animal/all-animals/${page || 1}`, {
        withCredentials: true,
      })
      .then((res) => setAnimalData(res?.data?.allCattles))
      .catch(() => router.replace("/login"));
  }, [page]);

  // Handling the sortby and filter along with pagination

  useEffect(() => {
    setPage(1);
  }, [sortByValue, filterValue]);

  const fetchSortData = () => {
    axios
      .get(
        `${API_URI}/api/dashboard/animal/all-animals/${page}?sortBy=${sortByValue}`,
        { withCredentials: true }
      )
      .then((res) => setAnimalData(res?.data?.allCattles))
      .catch((err) => console.log(err));
  };

  const fetchFilterData = () => {
    axios
      .get(
        `${API_URI}/api/dashboard/animal/all-animals/${page}?filter=${filterValue}`,
        { withCredentials: true }
      )
      .then((res) => setAnimalData(res?.data?.allCattles))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSortData();
  }, [page, sortByValue]);

  useEffect(() => {
    fetchFilterData();
  }, [page, filterValue]);

  return (
    <div className="rounded-[20px] bg-white py-6 mx-4 my-4 overflow-hidden">
      <div className="flex justify-between sm:items-end flex-col xl:flex-row gap-4 xl:gap-0 md:mx-8 mx-4">
        <div className="mr-auto">
          <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
            Cattle Management
          </h1>
          <div className="overflow-x-auto">
            <div className="flex gap-2 items-center">
              <p className="text-para text-[16px] font-[500]">Dashboard</p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px] font-[500] text-nowrap">
                Cattle Management
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-end cattle-management-options">
          {/* sort data */}
          <div className="relative inline-block">
            <label
              htmlFor="sortBy"
              onClick={handleLabelClick}
              className="border border-para flex gap-2 items-center rounded-lg py-[9.5px] px-2.5 justify-between cursor-pointer"
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

          {/* Filter data */}
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

          {/* add new cattle */}
          <div
            className=" bg-primary cursor-pointer flex gap-2 items-center rounded-lg py-[11px] px-3.5 justify-center"
            onClick={() => router.push("/cattle-management/add-new-cattle")}
          >
            <Image src={whitePlus} alt="add" className="w-[20px] h-auto" />
            <p className="text-sm text-white font-[500] text-nowrap">
              Add Cattle
            </p>
          </div>
        </div>
      </div>

      {/* Cattle Table */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[900px] w-full">
          {/* Heading row */}
          <div className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] bg-[#F1F6F2] py-3 text-heading text-[14px] whitespace-nowrap font-[500]  rounded-xl mx-4">
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
          <div className="h-[58vh] overflow-y-auto">
            {animalsData?.length > 0 &&
              animalsData?.map((eachAnimal: Animal) => {
                return (
                  <div key={eachAnimal.id}>
                    <div
                      className="grid grid-cols-[2fr_3fr_4fr_4fr_3fr_4fr_3fr_3fr_2fr] py-3 text-[#4A4A4A] text-[14px] whitespace-nowrap items-center mx-6"
                      key={eachAnimal.id}
                    >
                      <div className="w-10 h-10 rounded-[50%] overflow-hidden flex object-cover">
                        <Image
                          src={eachAnimal.image1}
                          width={100}
                          height={100}
                          alt="image1"
                          className="object-cover rounded-[50%]"
                        />
                      </div>

                      <p className="text-[#4A4A4A]">
                        {lowerExceptFirst(eachAnimal.type)}
                      </p>
                      <p className="text-[#4A4A4A]">
                        {"#" + eachAnimal.cattleName}
                      </p>
                      <p className="text-[#4A4A4A]">
                        {format(parseISO(eachAnimal.birthDate), "MMM dd, yyyy")}
                      </p>
                      <p className="text-[#4A4A4A] ">
                        {lowerExceptFirst(eachAnimal.breed)}
                      </p>
                      <p className="pl-2">
                        <span
                          className={`text-[12px] rounded-full w-fit px-4 py-2 ${
                            eachAnimal.healthStatus === "HEALTHY"
                              ? "bg-[#00897B] text-white"
                              : "bg-[#FBC02D] text-black"
                          }`}
                        >
                          {lowerExceptFirst(eachAnimal.healthStatus)}
                        </span>
                      </p>

                      <p className="text-[#4A4A4A] ">{eachAnimal.weight}</p>
                      <div className="flex items-center ">
                        <p className="text-[#4A4A4A]">
                          {eachAnimal?.averageMilk?.toString().slice(0, 4)}
                        </p>
                        <p className="text-green-600 text-xs">+18.3%</p>
                      </div>
                      <div
                        className="flex justify-center"
                        onClick={() =>
                          router.push(
                            `cattle-management/${eachAnimal.cattleName}`
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
      </div>

      {/*  Pagination */}
      <div className="flex justify-between gap-2 flex-col sm:flex-row mt-3 mx-4 items-center">
        <p className="text-sm">
          Showing 1 to 25 of {animalsData?.[0]?.totalAnimalCount} entries
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
            disabled={page === animalsData?.[0]?.totalPages}
          >
            <Image src={rightClick} alt="left" className="w-[8px] h-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllAnimals;

/* 
<label htmlFor="sortBy" className="border border-para flex gap-2 items-center rounded-lg py-[9.5px] px-2.5 justify-center">
            <Image
              src={sortByImg}
              alt="sort-image"
              width={20}
              className="h-auto"
            />
            <p className="font-[500] text-sm text-para">Sort By</p>
            <select id="sortBy"
              className="border-none text-sm text-para font-[500] p-0 cursor-pointer text-center w-full outline-none hidden"
              onChange={(e) => setSortByValue(e.target.value)}
            >
              <option value="name-asc">Ascending Order</option>
              <option value="name-desc">Descending Order</option>
              <option value="newest">Recently Added</option>
              <option value="oldest">Oldest Added</option>
            </select>
             <Image
              src={dropDown}
              alt="drop-down"
              width={20}
              className="h-auto"
            />
          </label> 
          
          <label className="flex gap-2 items-center rounded-lg py-2.5 px-2.5 bg-[#4A4A4A] justify-between cursor-pointer">
            <Image
              src={filterImg}
              alt="sort-image"
              width={20}
              className="h-auto"
            />
            <p className="font-[500] text-white">Filter</p>
            <select
              className="text-sm font-[500] border-none p-0 bg-transparent text-white w-full text-center cursor-pointer hidden"
              onChange={(e) => setFilterValue(e.target.value)}
            >
              {breeds.map((eachBreed) => {
                return (
                  <option
                    key={eachBreed}
                    value={eachBreed}
                    className="bg-[#4A4A4A] text-white"
                  >
                    {eachBreed}
                  </option>
                );
              })}
            </select>
            <Image
              src={whiteDropDown}
              alt="drop-down"
              width={20}
              className="h-auto"
            />
          </label>
          */
