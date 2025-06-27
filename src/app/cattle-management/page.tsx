"use client";

import AllAnimals from "./AllAnimals";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CattleManagement = () => {
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;
  const [allAnimals, setAllAnimals] = useState([]) as any;

  useEffect(() => {
    axios
      .get(`${API_URI}/api/dashboard/animal/all-animals`, {
        withCredentials: true,
      })
      .then((res) => setAllAnimals(res.data.allCattles))
      .catch((err) => toast.error(err?.response?.data?.message));
  }, []);


  return (
    <div className="flex-1 overflow-hidden">
        { allAnimals?.length > 0 && <AllAnimals allAnimalDetails={allAnimals} />}
    </div>
  );
};

export default CattleManagement;
