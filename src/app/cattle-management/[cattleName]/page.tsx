"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import deleteIcon from '@/assets/deleteIcon.png'
import editIcon from '@/assets/editIcon.png';
import { useRouter } from "next/navigation";

const AnimalDetailPage = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [cattleDetails, setCattleDetails] = useState({}) as any
  const router = useRouter()

  const hasShown=useRef(false)

  const params = useParams();
  const { cattleName } = params;

  useEffect(() => {
    axios
      .get(`${API_URI}/api/dashboard/animal/specific-animal/${cattleName}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCattleDetails(res.data.animalDetails);
        if(!hasShown.current) {
          toast.success(res.data.message);
          hasShown.current=true
        }
      })
      .catch((err) => toast.error(err.response?.data?.message));
  }, [cattleName, API_URI]);

  return (
    <>
      <ToastContainer />
      <div className="flex-1 rounded-2xl bg-white px-4 py-6 mx-4 mb-6">
        <div className="flex justify-between md:items-end flex-col md:flex-row">
          <div>
            <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
              {`Cattle Information - #${cattleName}`} 
            </h1>
            <div className="flex gap-2 items-center text-nowrap">
              <p className="text-[#A4A4A4] text-[16px] cursor-pointer hover:text-primary" onClick={()=>router.push('/cattle-management')}>Dashboard</p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-[#A4A4A4] text-[16px] cursor-pointer hover:text-primary" onClick={()=>router.push('/cattle-management')}>Cattle Management</p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px]">Add New Cattle</p>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <div className="bg-[#4A4A4A] rounded flex items-center px-2 cursor-pointer">
              <Image src={deleteIcon} alt="cross" className="w-[18px] h-auto" />
            </div>
            <div className="bg-primary px-2 py-2 rounded flex gap-1 items-center text-white cursor-pointer">
              <Image src={editIcon} alt="cross" className="w-[18px] h-auto" />
              <p>Edit Information</p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 mt-8">
            {cattleDetails?.cattleDetails?.cattleName && <LeftSide cattleDetails={cattleDetails} />}
            {cattleDetails?.cattleDetails?.cattleName && <RightSide cattleDetails={cattleDetails?.cattleDetails}/>}
        </div>
      </div> 
    </>
  );
};

export default AnimalDetailPage;
