import type { Metadata } from "next";
import Image from "next/image";
import loginLogo from "@/assets/login-page-slide.jpg";
import logo from '@/assets/gramathupaal-logo.png'

export const metadata: Metadata = {
  title: "Gramathupaal",
  description:
    "Designed to handle all the records for Buffalo,Goat,Cow Records",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100vh] items-center">
    <div className="flex-1 hidden md:block">
      <Image
        src={loginLogo}
        alt="loginLogo"
        priority
        className="min-h-[100vh] object-cover w-[100%]"
      />
    </div>
    <div className="flex-1">
    <div className="w-[406px] m-auto sm:p-0 xm:p-4 md:pr-4">
    <div className="flex justify-center">
      <Image src={logo} alt="logo" className="w-[232px] h-[58px]" priority/>
    </div>
      {children}
    </div>
    </div>
  </div>
  );
}
