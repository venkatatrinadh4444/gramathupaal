"use client";

import arrow from "@/assets/cattle-dashboard-arrow.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import { useRouter } from "next/navigation";
import addIcon from "@/assets/white-plus.png";
import EditMilkRecord from "../components/EditMilkRecord";
import DefaultAddMilkRecord from "../components/DefaultAddMilkRecord";

const MilkDetailPage = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [cattleDetails, setCattleDetails] = useState({}) as any;
  const [allRecords,setAllRecords] = useState([])
  const router = useRouter();
  const [showAddRecrod,setShowAddRecord] = useState(false)
  const [showEditMilk, setShowEditMilk] = useState(false);
  const [averageMilkGrade,setAverageMilkGrade]=useState('')
  const [editRecordData,setEditRecordData] = useState({})

  const params = useParams();
  const { cattleName } = params;

  const fetchingAfterAddingNewMilkRecord = () => {
    axios
      .get(
        `${API_URI}/api/dashboard/milk/specific-animal-records/${cattleName}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setAllRecords(res?.data?.specificAnimalRecords?.allRecords);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get(
        `${API_URI}/api/dashboard/milk/specific-animal-records/${cattleName}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setCattleDetails(res?.data?.specificAnimalRecords?.animal);
        setAllRecords(res?.data?.specificAnimalRecords?.allRecords);
        setAverageMilkGrade(res?.data?.specificAnimalRecords?.averageMilkGrade)
      })
      .catch((err) => console.log(err));
  }, [cattleName, API_URI]);


  return (
    <>
      <div className="relative flex-1 rounded-2xl bg-white py-6 my-4 mx-4 overflow-hidden">
        {/* Cattle Information */}
        <div className="flex justify-between xl:items-end flex-col xl:flex-row gap-2 sm:mx-8 mx-4">
          <div>
            <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
              {`Milk Production Record - #${cattleName}`}
            </h1>
            {/* Navigation texts */}
            <div className="overflow-x-auto">
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
          </div>
          {/* Add new milk record and delete */}
          <div className="ml-auto">
            <div
              className="bg-primary px-3 py-2.5 rounded-lg flex gap-1 items-center text-white cursor-pointer"
              onClick={()=>setShowAddRecord(true)}
            >
              <Image src={addIcon} alt="cross" className="w-[18px] h-auto" />
              <p>Add Milk Record</p>
            </div>
          </div>
        </div>

        {/*Two parts */}
        <div className="flex gap-8 mt-8 sm:mx-8 mx-3 md:flex-row flex-col">
          {cattleDetails?.cattleName && (
            <LeftSide cattleDetails={cattleDetails} milkGrade={averageMilkGrade}/>
          )}
          <div className="flex-1 overflow-hidden">
            <RightSide onEditRecord={()=>setShowEditMilk(true)} setEditRecordData={setEditRecordData} allRecords={allRecords}/>
          </div>
        </div>

        {/* pop over */}

        {showEditMilk && (
          <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-xl max-w-4xl xxl:w-[50%] xl:w-[55%] md:w-[55%] sm:w-[75%] w-[90%]  overflow-hidden sm:p-10 p-6">
             <EditMilkRecord onEditMilk={()=>setShowEditMilk(false)} editRecordData={editRecordData} fetchingAfterAddingNewMilkRecord={()=>fetchingAfterAddingNewMilkRecord()}/>
            </div>
          </div>
        )}

       {showAddRecrod && (
          <div className="absolute inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-xl max-w-4xl xxl:w-[50%] xl:w-[55%] md:w-[55%] sm:w-[75%] w-[90%]  overflow-hidden sm:p-10 p-6">
              <DefaultAddMilkRecord onAddMilk={()=>setShowAddRecord(false)} cattleId={typeof cattleName==="string"?cattleName:''} fetchingAfterAddingNewMilkRecord={()=>fetchingAfterAddingNewMilkRecord()}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MilkDetailPage;
