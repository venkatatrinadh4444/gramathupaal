import { Metadata } from "next";
import Navbar from "../cattle-management/Navbar";
import Sidebar from "../cattle-management/SideBar";

export const metadata: Metadata = {
  title: "cattle-management home page",
  description: "Shows all the list of cattles",
};

export default function CattleRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F6F6F6] h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navbar />
      </div>

      <div className="flex pt-[60px]">
        {/* Fixed Sidebar on lg+ */}
        <div className="hidden lg:block fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[280px] bg-[#F6F6F6] z-30">
          <Sidebar />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 w-full h-[calc(100vh-60px)] overflow-y-auto lg:ml-[280px]">
          {children}
        </main>
      </div>
    </div>
  );
}