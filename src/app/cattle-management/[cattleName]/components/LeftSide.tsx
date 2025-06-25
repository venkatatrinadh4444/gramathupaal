"use client";

import Image from "next/image";
import ImageSlider from "./ImageSlider";
import averageMilk from "@/assets/averageg-milk.png";
import upsideArrow from "@/assets/upside-arrow.png";
import greaterthan from "@/assets/greaterthen.png";
import lastVaccination from "@/assets/last-vaccination.png";
import feedDetails from "@/assets/feed-details.png";
import pregencies from "@/assets/pregencies.png";
import { format, parseISO } from "date-fns";

const LeftSide = ({ cattleDetails }: { cattleDetails: any }) => {
  const images: string[] = [];
  images.push(cattleDetails?.cattleDetails?.image1);
  images.push(cattleDetails?.cattleDetails?.image2);

  return (
    <div>
      {images.length > 0 && <ImageSlider images={images} />}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="bg-[#F6F6F6] p-4 rounded-lg">
          <Image
            src={averageMilk}
            alt="average-milk"
            className="w-[24px] h-auto"
          />
          <div className="flex gap-1 items-center mt-2">
            <h1 className="font-[600] font-dmSans text-[#4A4A4A] text-[20px]">
              {cattleDetails?.overallAverageMilk?.toString()?.slice(0,4) || 0 } litres
            </h1>
            <Image src={upsideArrow} alt="upside" className="w-[16px] h-auto" />
            <p className="text-xs text-primary">18.4%</p>
          </div>
          <p className="text-sm text-primary flex gap-1 items-center cursor-pointer">
            Average Milk
            <Image src={greaterthan} alt="right" className="w-[18px] h-auto" />
          </p>
        </div>
        <div className="bg-[#F6F6F6] p-4 rounded-lg">
          <Image
            src={lastVaccination}
            alt="last-vaccination"
            className="w-[24px] h-auto"
          />
          <h1 className="font-[600] font-dmSans text-[#4A4A4A] text-[20px] mt-2">
          {cattleDetails?.lastVaccination ? format(parseISO(cattleDetails?.lastVaccination),"MMM dd, yyyy") :"MMM dd, yyyy"}
          </h1>
          <p className="text-sm text-primary flex gap-1 items-center cursor-pointer">
            Last Vaccination
            <Image src={greaterthan} alt="right" className="w-[18px] h-auto" />
          </p>
        </div>
        <div className="bg-[#F6F6F6] p-4 rounded-lg">
          <Image
            src={feedDetails}
            alt="last-vaccination"
            className="w-[24px] h-auto"
          />
          <h1 className="font-[600] font-dmSans text-[#4A4A4A] text-[20px] mt-2">
            {cattleDetails?.averageFeed || 0 } kg/Day
          </h1>
          <p className="text-sm text-primary flex gap-1 items-center cursor-pointer">
            Feed Details
            <Image src={greaterthan} alt="right" className="w-[18px] h-auto" />
          </p>
        </div>
        <div className="bg-[#F6F6F6] p-4 rounded-lg">
          <Image
            src={pregencies}
            alt="last-vaccination"
            className="w-[24px] h-auto"
          />
          <h1 className="font-[600] font-dmSans text-[#4A4A4A] text-[20px] mt-2">
            {cattleDetails?.calfCount || 0}
          </h1>
          <p className="text-sm text-primary flex gap-1 items-center cursor-pointer">
            Total Pregnancies
            <Image src={greaterthan} alt="right" className="w-[18px] h-auto" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
