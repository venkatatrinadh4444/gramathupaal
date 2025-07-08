"use client";

import darkCross from "@/assets/cross-dark.png";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShowHistory({
  id,
  onFeedClose,
}: {
  id: number;
  onFeedClose: () => void;
}) {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [feedRecords, setFeedRecords] = useState([]) as any;

  const fetchFeedHistory = () => {
    axios
      .get(
        `${API_URI}/api/dashboard/feed-stock/specific-record-history/${id}`,
        { withCredentials: true }
      )
      .then((res) => {
        setFeedRecords(res?.data?.allStockRecords);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchFeedHistory();
  }, []);

  console.log(feedRecords);

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-start sm:px-10 px-6 sm:pt-10 pt-6">
        <div className="w-[90%]">
          <h1 className="text-primary font-dmSans font-semibold text-[20px]">
            Feed Details
          </h1>
          <p className="text-para font-medium text-[16px]">
            Feed Management Info of This Cattle
          </p>
        </div>

        <div
          className="cursor-pointer w-[10%] flex justify-end"
          onClick={onFeedClose}
        >
          <Image src={darkCross} alt="cross" className="w-[24px] h-auto" />
        </div>
      </div>
      <div className="overflow-x-auto w-full sm:px-10 px-6">
        <div className="flex xl:gap-[100px] gap-10 mt-4 whitespace-nowrap">
          <div>
            <h3 className="font-dmSans text-[16px] font-medium text-heading">
              Feed Name
            </h3>
            <p className="text-heading font-medium text-[20px]">
              {feedRecords?.[0]?.feedStock?.name}
            </p>
          </div>
          <div>
            <h3 className="font-dmSans text-[16px] font-medium text-heading">
              Total Stock
            </h3>
            <p className="text-heading font-medium text-[20px]">
              {feedRecords?.[0]?.feedStock?.quantity}{" "}
              {feedRecords?.[0]?.feedStock?.unit}
            </p>
          </div>
          <div>
            <h3 className="font-dmSans text-[16px] font-medium text-heading">
              Inventory Unit
            </h3>
            <p className="text-heading font-medium text-[20px]">
              {feedRecords?.[0]?.feedStock?.unit === "KG"
                ? "Kilograms (kg)"
                : feedRecords?.[0]?.feedStock?.unit}
            </p>
          </div>
        </div>
      </div>

      {/* Table container */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[800px] w-full">
          <div className="grid grid-cols-[2fr_2fr_2fr_4fr] my-3 mx-8 whitespace-nowrap">
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Quantity
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Date
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Type
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Note
            </p>
          </div>
          <hr className="border border-para opacity-20 rounded-lg" />

          <div className="h-[264px] overflow-y-auto">
            {/* Table data */}
            {feedRecords?.length > 0 &&
              feedRecords?.map((eachRecord: any) => {
                return (
                  <div key={eachRecord.id}>
                    <div className="grid grid-cols-[2fr_2fr_2fr_4fr] my-4 mx-8">
                      <p className="text-para text-[16px] font-medium">
                        {eachRecord?.type === "Added"
                          ? "+" + eachRecord?.newQuantity
                          : "-" + eachRecord?.newQuantity}{" "}
                        {eachRecord?.feedStock?.unit}
                      </p>
                      <p className="text-para text-[16px] font-medium">
                        {format(
                          parseISO(eachRecord?.updatedAt),
                          "dd MMMM, yyyy"
                        )}
                      </p>
                      <p className="text-para text-[16px] font-medium">
                        {eachRecord?.type}
                      </p>
                      <p className="text-para text-[16px] font-medium">
                        {eachRecord?.feedStock?.notes}
                      </p>
                    </div>
                    <hr className="border border-para opacity-20 rounded-lg" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
