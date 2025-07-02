"use client";

import Image from "next/image";
import arrow from "@/assets/cattle-dashboard-arrow.png";
import cross from "@/assets/animal-detail-cross.png";
import tick from "@/assets/animal-detail-tick.png";
import imageUpload from "@/assets/image-upload.png";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const EditCattle = () => {
  const router = useRouter();
  const {cattleName}=useParams()

  const [cattleDetails,setCattleDetails]=useState({}) as any

  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;

  const fetchAnimalDetails=()=> {
    axios.get(`${API_URI}/api/dashboard/animal/specific-animal/${cattleName}`,{withCredentials:true}).then(res=>setCattleDetails(res?.data?.animalDetails?.cattleDetails)).catch(err=>console.log(err))
  }

  useEffect(()=>{
    fetchAnimalDetails()
  },[])

  const inseminationTypes = [
    "NATURAL_SERVICE",
    "ARTIFICIAL_INSEMINATION",
    "EMBRYO_TRANSFER",
    "IN_VITRO_FERTILIZATION",
    "UNKNOWN",
  ];

  const parentOrigin = [
    "FARM_OWNED",
    "FARM_BORN",
    "PURCHASED",
    "GOVT_BREEDING_CENTER",
    "PRIVATE_CENTER",
    "UNKNOWN",
  ];

  const breeds = [
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

  const [data, setData] = useState({
    cattleName: '',
    healthStatus: '',
    type: '',
    weight: '',
    snf: '',
    fatherInsemination: '',
    parent: '',
    breed: '',
    birthDate: '',
    farmEntry: '',
    purchaseAmount: '',
    vendorName: '',
  });


  useEffect(() => {
    if (Object.keys(cattleDetails).length > 0) {
      setData({
        cattleName: cattleDetails?.cattleName || '',
        healthStatus: cattleDetails?.healthStatus || '',
        type: cattleDetails?.type || '',
        weight: cattleDetails?.weight || '',
        snf: cattleDetails?.snf || '',
        fatherInsemination: cattleDetails?.fatherInsemination || '',
        parent: cattleDetails?.parent || '',
        breed: cattleDetails?.breed || '',
        birthDate: cattleDetails?.birthDate
        ? new Date(cattleDetails.birthDate).toISOString().slice(0, 10)
        : '',
        farmEntry: cattleDetails?.farmEntryDate
        ? new Date(cattleDetails.farmEntryDate).toISOString().slice(0, 10)
        : '',
        purchaseAmount: cattleDetails?.purchaseAmount || '',
        vendorName: cattleDetails?.vendorName || '',
      });
    }
  }, [cattleDetails]);


  // const [images, setImages] = useState([]) as any;

  const stringInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const selectInputChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImages([...images, e.target.files?.[0]]);
  // };

  // submit handler
  const sumbitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    axios
    .put(`${API_URI}/api/dashboard/animal/update-animal/${cattleDetails?.id}`, data, {
      withCredentials: true,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  }

  return (
    <>
      <ToastContainer />
      <form
        className="flex-1 rounded-2xl bg-white px-8 py-8 my-4 mx-4 overflow-hidden"
        onSubmit={sumbitHandler}
      >
        <div className="flex justify-between lg:items-end flex-col lg:flex-row items-start gap-4 lg:gap-0">
          <div>
            <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
              Edit Cattle
            </h1>
            <div className="overflow-x-auto whitespace-nowrap add-new-cattle-navigation-slide-bar sm:w-full">
            <div className=" items-center gap-2 flex">
              <p className="text-[#A4A4A4] text-[16px] font-[500]">Dashboard</p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p
                className="text-[#A4A4A4] text-[16px] font-[500] hover:text-primary cursor-pointer"
                onClick={() => router.push("/cattle-management")}
              >
                Cattle Management
              </p>
              <Image src={arrow} alt="arrow" className="w-4 h-auto" />
              <p className="text-primary text-[16px] font-[500]">
                Edit Cattle
              </p>
            </div>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            <div
              className="bg-[#4A4A4A] rounded flex items-center px-2 cursor-pointer"
              onClick={() => router.push("/cattle-management")}
            >
              <Image src={cross} alt="cross" className="w-[18px] h-auto" />
            </div>
            <label
              htmlFor="submitBtn"
              className="bg-primary px-2 py-2 rounded flex gap-1 items-center text-white cursor-pointer"
            >
              <Image src={tick} alt="cross" className="w-[18px] h-auto" />
              <p>Save Information</p>
              <input type="submit" id="submitBtn" className="hidden" />
            </label>
          </div>
        </div>

        {/*  Cattle Identification */}
        <div className="my-8">
          <h1 className="text-heading font-dmSans text-[20px] font-[600]">
            Cattle Identification
          </h1>
          <p className="text-para text-[16px] font-[500]">
            Helps identify the animal uniquely
          </p>
          <div className="md:grid md:grid-cols-5 sm:grid sm:grid-cols-3 gap-3 mt-4">
            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Cattle ID *
              </h3>
              <input
                type="text"
                placeholder="Enter Cattle ID"
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="cattleName"
                value={data.cattleName}
                onChange={stringInputChangeHandler}
                disabled
              />
            </div>

            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Health Status *
              </h3>
              <select
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="healthStatus"
                value={data.healthStatus}
                onChange={selectInputChangeHandler}
              >
                <option value="HEALTHY">Healthy</option>
                <option value="INJURED">Injured</option>
              </select>
            </div>

            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Cattle Type *
              </h3>
              <select
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="type"
                value={data.type}
                onChange={selectInputChangeHandler}
              >
                <option value="COW">Cow</option>
                <option value="BUFFALO">Buffalo</option>
                <option value="GOAT">Goat</option>
              </select>
            </div>

            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Cattle Weight *
              </h3>
              <input
                type="number"
                placeholder="Enter Cattle Weight"
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="weight"
                value={data.weight}
                onChange={stringInputChangeHandler}
              />
            </div>

            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                SNF% *
              </h3>
              <input
                type="text"
                placeholder="Enter SNF%"
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="snf"
                value={data.snf}
                onChange={stringInputChangeHandler}
              />
            </div>
          </div>
        </div>
        <hr className="border border-para opacity-20 rounded-lg" />

        {/*  Breeding Info */}
        <div className="my-8">
          <h1 className="text-heading font-dmSans text-[20px] font-[600]">
            Breeding Info
          </h1>
          <p className="text-para text-[16px] font-[500]">
            Related to cattle’s family or insemination
          </p>

          <div className="md:flex md:gap-8 sm:grid sm:grid-cols-2  sm:gap-8 mt-4 ">
            {/* <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500] text-nowrap">
                {images.length === 0 ? "Upload" : "Uploaded"} Cattle Image{" "}
                {images.length === 0 ? (
                  "*"
                ) : (
                  <span
                    className="text-primary cursor-pointer"
                    title="upload count"
                  >
                    {images.length}
                  </span>
                )}
              </h3>
              <label
                className=" bg-background mt-1.5 w-full rounded-md flex gap-2 py-2.5 justify-center cursor-pointer"
                htmlFor="imageUpload"
              >
                <p className="text-para text-sm">Cattle Image</p>
                <Image
                  src={imageUpload}
                  alt="upload image"
                  className="w-[18px] h-auto"
                />
                <input
                  type="file"
                  multiple
                  id="imageUpload"
                  placeholder="Cattle Image"
                  className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none hidden"
                  required
                  onChange={fileChangeHandler}
                />
              </label>
            </div> */}

            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500] text-nowrap">
                Father Insemination *
              </h3>
              <select
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="fatherInsemination"
                value={data.fatherInsemination}
                onChange={selectInputChangeHandler}
              >
                {inseminationTypes?.map((eachOption, index) => {
                  return (
                    <option key={index} value={eachOption}>
                      {eachOption}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Parent *
              </h3>
              <select
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="parent"
                value={data.parent}
                onChange={selectInputChangeHandler}
              >
                {parentOrigin?.map((eachOption, index) => {
                  return (
                    <option key={index} value={eachOption}>
                      {eachOption}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Breed *
              </h3>
              <select
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                required
                name="breed"
                value={data.breed}
                onChange={selectInputChangeHandler}
              >
                {breeds?.map((eachOption, index) => {
                  return (
                    <option key={index} value={eachOption}>
                      {eachOption}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <hr className="border border-para opacity-20 rounded-lg" />

        <div className="flex xl:flex-row xl:gap-[54px] lg:flex-col md:flex-row flex-col gap-6 my-8">
          {/* Dates */}

          <div>
            <h1 className="text-heading font-dmSans text-[20px] font-[600]">
              Dates
            </h1>
            <p className="text-para text-[16px] font-[500]">
              Helps with tracking age and farm history
            </p>

            {/* Birth Details */}
            <div className="flex sm:flex-row flex-col lg:gap-[54px] gap-6  mt-4">
              <div>
                <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                  Birth Date *
                </h3>
                <input
                  type="date"
                  placeholder="Select Date"
                  className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                  required
                  name="birthDate"
                  value={data.birthDate}
                  onChange={stringInputChangeHandler}
                />
              </div>
              <div>
                <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                  Farm Entry Date *
                </h3>
                <input
                  type="date"
                  placeholder="Select Date"
                  className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                  required
                  name="farmEntry"
                  value={data.farmEntry}
                  onChange={stringInputChangeHandler}
                />
              </div>
            </div>
          </div>

          {/* Purchase Details */}
          <div>
            <h1 className="text-heading font-dmSans text-[20px] font-[600]">
              Purchase Info
            </h1>
            <p className="text-para text-[16px] font-[500]">
              Financial tracking for this cattle
            </p>
            <div className="flex sm:flex-row flex-col lg:gap-[72px] gap-6 mt-4">
              <div>
                <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                  Purchase Amount *
                </h3>
                <input
                  type="text"
                  placeholder="Purchase Amount"
                  className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                  required
                  name="purchaseAmount"
                  value={data.purchaseAmount}
                  onChange={stringInputChangeHandler}
                />
              </div>
              <div>
                <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                  Vendor Name *
                </h3>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
                  required
                  name="vendorName"
                  value={data.vendorName}
                  onChange={stringInputChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditCattle;


//Submit Handler for form data
/* const sumbitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  axios
  .put(`${API_URI}/api/dashboard/animal/update-animal/${cattleDetails?.id}`, data, {
    withCredentials: true,
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

  
  // const formData = new FormData();

  // formData.append("cattleName", data.cattleName);
  // formData.append("healthStatus", data.healthStatus);
  // formData.append("type", data.type);
  // formData.append("weight", data.weight);
  // formData.append("snf", data.snf);
  // formData.append("fatherInsemination", data.fatherInsemination);
  // formData.append("parent", data.parent);
  // formData.append("breed", data.breed);
  // formData.append("birthDate", data.birthDate);
  // formData.append("farmEntry", data.farmEntry);
  // formData.append("purchaseAmount", data.purchaseAmount);
  // formData.append("vendorName", data.vendorName);


    if (images.length < 2 || images.length > 2) {
    return toast.error("Maximum two images are allowed");
  }

  images.map((eachImage: File) => formData.append("images", eachImage));

 
}; */
