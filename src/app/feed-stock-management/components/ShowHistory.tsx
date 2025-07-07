import darkCross from "@/assets/cross-dark.png";
import Image from "next/image";

export default function ShowHistory() {
  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="w-[90%]">
          <h1 className="text-primary font-dmSans font-semibold text-[20px]">
            Feed Details
          </h1>
          <p className="text-para font-medium text-[16px]">
            Feed Management Info of This Cattle
          </p>
        </div>

        <div className="cursor-pointer w-[10%] flex justify-end">
          <Image src={darkCross} alt="cross" className="w-[24px] h-auto" />
        </div>
      </div>
      <div className="overflow-x-auto w-full">
      <div className="flex xl:gap-[100px] gap-10 mt-4 whitespace-nowrap">
        <div>
          <h3 className="font-dmSans text-[16px] font-medium text-heading">
            Feed Name
          </h3>
          <p className="text-heading font-medium text-[20px]">Green Fodder</p>
        </div>
        <div>
          <h3 className="font-dmSans text-[16px] font-medium text-heading">
            Total Stock
          </h3>
          <p className="text-heading font-medium text-[20px]">1,200 kg</p>
        </div>
        <div>
          <h3 className="font-dmSans text-[16px] font-medium text-heading">
            Inventory Unit
          </h3>
          <p className="text-heading font-medium text-[20px]">Kilograms(kg)</p>
        </div>
      </div>
      </div>

      {/* Table container */}
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[800px] w-full">
          <div className="grid grid-cols-[2fr_2fr_2fr_4fr] my-3 mx-8 whitespace-nowrap">
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Quantity
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Date
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Type
            </p>
            <p className="font-dmSans text-[16px] text-primary font-[600]">
              Note
            </p>
          </div>
          <hr className="border border-para opacity-20 rounded-lg" />

          {/* Table data */}
          <div className="grid grid-cols-[2fr_2fr_2fr_4fr] my-3 mx-8">
            <p className="text-para text-[16px] font-medium">+200 kg</p>
            <p className="text-para text-[16px] font-medium">03 June 2025</p>
            <p className="text-para text-[16px] font-medium">Added</p>
            <p className="text-para text-[16px] font-medium">Weekly top-up from vendor</p>
          </div>
          <hr className="border border-para opacity-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
