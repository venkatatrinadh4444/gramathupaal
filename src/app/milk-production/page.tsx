"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AllMilkRecords from "./AllMilkRecords";

const MilkProduction = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [allMilkRecords, setAllMilkRecords] = useState([]) as any;

  useEffect(() => {
    axios
      .get(`${API_URI}/api/dashboard/milk/all-milk-records`, {
        withCredentials: true,
      })
      .then((res) => setAllMilkRecords(res?.data?.allRecords))
      .catch((err) => toast.error(err?.response?.data?.message));
  }, []);


  return (
    <div className="flex-1 overflow-hidden">
        {allMilkRecords.length>0 &&  <AllMilkRecords allMilkRecords={allMilkRecords} />}
    </div>
  );
};

export default MilkProduction;
