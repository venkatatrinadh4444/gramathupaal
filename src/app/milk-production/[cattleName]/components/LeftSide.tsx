"use client";

import Image from "next/image";
import ImageSlider from "@/app/cattle-management/[cattleName]/components/ImageSlider";
import averageMilk from "@/assets/averageg-milk.png";
import upsideArrow from "@/assets/upside-arrow.png";
import greaterthan from "@/assets/greaterthen.png";
import lastVaccination from "@/assets/last-vaccination.png";
import feedDetails from "@/assets/feed-details.png";
import pregencies from "@/assets/pregencies.png";
import { format, parseISO } from "date-fns";

const LeftSide = ({ cattleDetails , onOpenFeed , onOpenClafHistory , onOpenMilkHistory , onOpenVaccinationHistory }: { cattleDetails: any , onOpenFeed:()=>void , onOpenClafHistory: ()=>void , onOpenMilkHistory:()=>void , onOpenVaccinationHistory:()=>void }) => {
  const images: string[] = [];
  images.push(cattleDetails?.image1);
  images.push(cattleDetails?.image2);

  console.log(cattleDetails)
  console.log(images)
  return (
    <>
    <div>
      {images.length > 0 && <ImageSlider images={images} />}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="bg-[#F6F6F6] p-4 rounded-lg flex flex-col gap-2">
          <Image
            src={averageMilk}
            alt="animal-name"
            className="w-[24px] h-auto"
          />
          <p className="font-dmSans font-[600] text-[16px] text-heading">#Komatha-00045</p>
          <p className="text-sm text-para">
          Cattle ID
          </p>
        </div>

        <div className="bg-[#F6F6F6] p-4 rounded-lg flex flex-col gap-2">
          <Image
            src={pregencies}
            alt="animal-type"
            className="w-[24px] h-auto"
          />
          <p className="font-dmSans font-[600] text-[20px] text-heading flex items-center gap-2">
            Cow <span className="py-[4px] px-[10px] bg-primary text-white rounded-[5px] text-xs">Active</span>
          </p>
          <p className="text-sm text-para">
          Cattle Type
          </p>
        </div>


        <div className="bg-[#F6F6F6] p-4 rounded-lg flex flex-col gap-2">
          <Image
            src={feedDetails}
            alt="average-milk"
            className="w-[24px] h-auto"
          />
          <p className="font-dmSans font-[600] text-[20px] text-heading">A1</p>
          <p className="text-sm text-para">
          Avg Milk Grade
          </p>
        </div>


        <div className="bg-[#F6F6F6] p-4 rounded-lg flex flex-col gap-2">
          <Image
            src={lastVaccination}
            alt="snf-value"
            className="w-[24px] h-auto"
          />
          <p className="font-dmSans font-[600] text-[20px] text-heading">8.5%</p>
          <p className="text-sm text-para">
          SNF%
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default LeftSide;
