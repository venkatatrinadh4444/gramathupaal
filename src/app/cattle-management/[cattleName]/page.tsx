"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import deleteIcon from "@/assets/deleteIcon.png";
import editIcon from "@/assets/editIcon.png";
import { useRouter } from "next/navigation";
import FeedHistory from "./components/FeedHistory";
import ClafHistory from "./components/ClafHistory";
import MilkHistory from "./components/MilkHistory";
import VaccinationHistory from "./components/VaccinationHistory";

const AnimalDetailPage = () => {
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
      .get(`${API_URI}/api/dashboard/animal/specific-animal/${cattleName}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCattleDetails(res?.data?.animalDetails);
      })
      .catch(err=>console.log(err));
  }, [cattleName, API_URI]);

  return (
    <>
      <ToastContainer />
      <div className="relative flex-1 rounded-2xl bg-white py-6 my-4 mx-4">
        {/* Cattle Information */}
        <div className="flex justify-between md:items-end flex-col md:flex-row gap-2 ml-8 mr-12">
          <div>
            <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
              {`Cattle Information - #${cattleName}`}
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
                onClick={() => router.push("/cattle-management")}
              >
                Cattle Management
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
              <Image src={editIcon} alt="cross" className="w-[18px] h-auto" />
              <p>Edit Information</p>
            </div>
          </div>
        </div>

        {/*Two parts */}
        <div className="flex flex-col md:flex-row gap-8 mt-8 mx-8 flex-1">
          {cattleDetails?.cattleDetails?.cattleName && (
            <LeftSide
              cattleDetails={cattleDetails}
              onOpenFeed={() => setShowFeedHistory(true)}
              onOpenClafHistory={() => setShowClafHistory(true)}
              onOpenMilkHistory={() => setShowMilkHistory(true)}
              onOpenVaccinationHistory={() => setShowVaccinationHistory(true)}
            />
          )}
          {cattleDetails?.cattleDetails?.cattleName && (
            <RightSide cattleDetails={cattleDetails?.cattleDetails} />
          )}
        </div>

        {/* Pop overs */}
        <div>
            {showFeedHistory && (
              <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-[90%] sm:w-[80%] md:w-[60%]overflow-hidden">
                  <FeedHistory
                    onCloseFeed={() => setShowFeedHistory(false)}
                    cattleName={cattleName}
                  />
                </div>
              </div>
            )}

            {showClafHistory && (
              <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-[90%] sm:w-[80%] md:w-[60%] overflow-hidden">
                  <ClafHistory
                    onCloseFeed={() => setShowClafHistory(false)}
                    cattleName={cattleName}
                  />
                </div>
              </div>
            )}

            {showMilkHistory && (
              <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-[90%] sm:w-[80%] md:w-[60%] overflow-hidden">
                  <MilkHistory
                    onCloseFeed={() => setShowMilkHistory(false)}
                    cattleName={cattleName}
                  />
                </div>
              </div>
            )}

            {showVaccinationHistory && (
              <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-[90%] sm:w-[80%] md:w-[60%] overflow-hidden">
                  <VaccinationHistory
                    onCloseFeed={() => setShowVaccinationHistory(false)}
                    cattleName={cattleName}
                  />
                </div>
              </div>
            )}
          </div>
      </div>
    </>
  );
};

export default AnimalDetailPage;
