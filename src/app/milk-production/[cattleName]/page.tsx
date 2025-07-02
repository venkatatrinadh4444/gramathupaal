"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import deleteIcon from "@/assets/deleteIcon.png";
import editIcon from "@/assets/editIcon.png";
import { useRouter } from "next/navigation";
import addIcon from '@/assets/white-plus.png'

const MilkDetailPage = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [cattleDetails, setCattleDetails] = useState({}) as any;
  const router = useRouter();

  const [showFeedHistory, setShowFeedHistory] = useState(false);
  const [showClafHistory, setShowClafHistory] = useState(false);
  const [showMilkHistory, setShowMilkHistory] = useState(false);
  const [showVaccinationHistory, setShowVaccinationHistory] = useState(false);

  const params = useParams();
  const { cattleName } = params;

  useEffect(() => {
    axios
      .get(`${API_URI}/api/dashboard/milk/specific-animal-records/${cattleName}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCattleDetails(res?.data?.specificAnimalRecords?.animal)
        console.log(res)
      })
      .catch(err=>console.log(err));
  }, [cattleName, API_URI]);


  return (
    <>
      <div className="relative flex-1 rounded-2xl bg-white py-6 my-4 mx-4">
        {/* Cattle Information */}
        <div className="flex justify-between md:items-end flex-col md:flex-row gap-2 ml-8 mr-12">
          <div>
            <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
              {`Milk Production Record - #${cattleName}`}
            </h1>
            <div className="flex gap-2 items-center text-nowrap">
              <p
                className="text-[#A4A4A4] text-[16px] cursor-pointer hover:text-primary font-[500]"
                onClick={() => router.push("/cattle-management")}
              >
                Dashboard
              </p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p
                className="text-[#A4A4A4] text-[16px] cursor-pointer hover:text-primary font-[500]"
                onClick={() => router.push("/milk-production")}
              >
                Milk Production Record
              </p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px] font-[500]">
                {cattleName && cattleName}
              </p>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <div className="bg-[#4A4A4A] rounded-lg flex items-center px-3 cursor-pointer">
              <Image src={deleteIcon} alt="cross" className="w-[18px] h-auto" />
            </div>
            <div className="bg-primary px-3 py-2.5 rounded-lg flex gap-1 items-center text-white cursor-pointer" onClick={()=>router.push(`edit-cattle/${cattleName}`)}>
              <Image src={addIcon} alt="cross" className="w-[18px] h-auto" />
              <p>Add New Record</p>
            </div>
          </div>
        </div>

        {/*Two parts */}
        <div className="flex gap-8 mt-8 mx-8">
          {cattleDetails?.cattleName && (
            <LeftSide
              cattleDetails={cattleDetails}
              onOpenFeed={() => setShowFeedHistory(true)}
              onOpenClafHistory={() => setShowClafHistory(true)}
              onOpenMilkHistory={() => setShowMilkHistory(true)}
              onOpenVaccinationHistory={() => setShowVaccinationHistory(true)}
            />
          )}
          <div className="flex-1 overflow-hidden">
         <RightSide/>
          </div>
        </div>
    </div>

    </>
  );
}

export default MilkDetailPage
