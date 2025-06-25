import { Metadata } from "next";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";



export const metadata:Metadata={
    title:'cattle-management home page',
    description:'Shows all the list of cattles'
}

export default function CattleRootLayout({children}:{children:React.ReactNode}) {
    return (
        <div className="bg-[#F6F6F6] min-h-[100vh]">
            <Navbar/>
            <div className="flex mt-6">
            <Sidebar/>
            {children}
            </div>
        </div>
    )
}