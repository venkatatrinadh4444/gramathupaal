import type { Metadata } from "next";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans , DM_Sans} from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./Context";

// Load Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Load Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const dmSans=DM_Sans({
  subsets:["latin"],
  variable:"--font-dmSans",
  display:"swap"
})

export const metadata: Metadata = {
  title: "Gramathupaal",
  description:
    "Designed to handle all the records for Buffalo,Goat,Cow Records",
  icons:{
    icon:'/public/favicon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body className={`${inter.variable} ${plusJakartaSans.variable} ${dmSans.variable}`}>
          {children}
        </body>
      </UserContextProvider>
    </html>
  );
}
