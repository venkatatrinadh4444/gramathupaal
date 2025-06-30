"use client";

import React, { useState } from "react";
import dashboardHomeIcon from "@/assets/dashboardHomeIcon.png";
import animalManagementIcon from "@/assets/animalManagementIcon.png";
import milkProduction from "@/assets/milkProduction.png";
import doctorCheckUps from "@/assets/doctorCheckUps.png";
import settings from "@/assets/settings.png";
import logout from "@/assets/logout.png";
import feedManagement from "@/assets/feedMangement.png";
import Image from "next/image";
import Link from "next/link";
import dropDown from "@/assets/drop-down.png";
import updown from "@/assets/sidebar-updown.png";
import { useContextData } from "../Context";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { user }: any = useContextData();
  const [healthDrop, setHealthDrop] = useState(false);
  const [feedDrop, setFeedDrop] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathName.startsWith(path);
  const API_URI = process.env.NEXT_PUBLIC_BACKEND_API_URI;

  const logoutFuntion = () => {
    axios
      .delete(`${API_URI}/api/auth/logout`, { withCredentials: true })
      .then((res) => {
        router.replace("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="flex flex-col px-4 gap-44 lg:pt-4 pt-20 justify-between h-[90vh]">
      <div className="flex flex-col gap-6">
        <Link href="/cattle-management" className="flex items-center gap-2">
          <Image src={dashboardHomeIcon} alt="homeIcon" width={24} className="h-auto" />
          <p className={`text-sm font-dmSans ${isActive("/dashboard") ? "text-primary" : "text-heading"}`}>
            Dashboard
          </p>
        </Link>

        <Link href="/cattle-management" className="flex items-center gap-1">
          <Image src={animalManagementIcon} alt="animalManagementIcon" width={24} className="h-auto" />
          <p className={`text-sm font-dmSans ${isActive("/cattle-management") ? "text-primary" : "text-heading"}`}>
            Animal Management
          </p>
        </Link>

        <Link href="/cattle-management" className="flex items-center gap-2">
          <Image src={milkProduction} alt="milkProduction" width={18} className="h-auto" />
          <p className={`text-sm font-dmSans ${isActive("/milk-production") ? "text-primary" : "text-heading"}`}>
            Milk Production
          </p>
        </Link>

        {/* Health Management */}
        <div className="flex items-center gap-8 justify-between cursor-pointer" onClick={()=>setHealthDrop(!healthDrop)}>
          <div className="flex gap-1 items-center">
            <Image src={doctorCheckUps} alt="doctorCheckUpsIcon" width={22} className="h-auto" />
            <p className="text-sm font-dmSans text-heading">Health Management</p>
          </div>
          <div className="cursor-pointer">
            <Image
              src={healthDrop ? updown : dropDown}
              alt="drop-down"
              width={18}
              className="h-auto"
              onClick={() => setHealthDrop(!healthDrop)}
            />
          </div>
        </div>

        {healthDrop && (
          <>
            <Link href="/cattle-management" className="flex items-center gap-10 justify-between">
              <p className={`text-sm font-dmSans pl-5 ${isActive("/cattle-feed-management") ? "text-primary" : "text-heading"}`}>
                Cattle Feed Management
              </p>
            </Link>
            <Link href="/cattle-management" className="flex items-center gap-10 justify-between">
              <p className={`text-sm font-dmSans pl-5 ${isActive("/feed-stock-management") ? "text-primary" : "text-heading"}`}>
                Feed Stock Management
              </p>
            </Link>
          </>
        )}

        {/* Feed Management */}
        <div className="flex items-center gap-10 justify-between cursor-pointer" onClick={()=>setFeedDrop(!feedDrop)}>
          <div className="flex gap-1 items-center">
            <Image src={feedManagement} alt="doctorCheckUpsIcon" width={24} className="h-auto" />
            <p className="text-sm font-dmSans text-heading">Feed Management</p>
          </div>
          <div>
            <Image
              src={feedDrop ? updown : dropDown}
              alt="drop-down"
              width={18}
              className="h-auto cursor-pointer"
              onClick={() => setFeedDrop(!feedDrop)}
            />
          </div>
        </div>

        {feedDrop && (
          <>
            <Link href="/cattle-management" className="flex items-center gap-10 justify-between">
              <p className={`text-sm font-dmSans pl-5 ${isActive("/cattle-checkups") ? "text-primary" : "text-heading"}`}>
                Cattle Chekups
              </p>
            </Link>
            <Link href="/cattle-management" className="flex items-center gap-10 justify-between">
              <p className={`text-sm font-dmSans pl-5 ${isActive("/feed-vaccine-management") ? "text-primary" : "text-heading"}`}>
                Feed Vaccine Management
              </p>
            </Link>
          </>
        )}
      </div>

      <div className="mb-6">
        <Link href="/cattle-management" className="flex gap-1">
          <Image src={settings} alt="settings" width={24} className="h-auto" />
          <p className="text-sm font-dmSans text-heading">Settings</p>
        </Link>
        <div className="flex gap-1 cursor-pointer mt-2" onClick={logoutFuntion}>
          <Image src={logout} alt="settings" width={24} className="h-auto" />
          <p className="text-sm font-dmSans text-heading">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
