import lowerExceptFirst from "@/app/common/lowerExceptFirst";
import { format, parseISO } from "date-fns";

const RightSide = ({ cattleDetails }: any) => {
  return (
    <>
      {/*  Cattle Information */}
      <div className="mb-6 mt-2">
        <h1 className="text-primary text-[20px] font-dmSans font-[600]">
          Cattle Information
        </h1>
        <p className="text-[16px] text-para">
          Basic and Breeding Info of This Cattle
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 xl:grid xl:grid-cols-3 xxl:flex xxl:gap-10 mt-3">
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">Cattle ID</h3>
            <p className="text-[20px] text-heading">
              {"#" + cattleDetails?.cattleName}
            </p>
          </div>
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">Status</h3>
            <p className="text-[14px] rounded-md bg-primary px-3 py-1 text-white w-fit">
              {lowerExceptFirst(cattleDetails?.healthStatus)}
            </p>
          </div>
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">
              Cattle Type
            </h3>
            <p className="text-[20px] text-heading">
              {lowerExceptFirst(cattleDetails?.type)}
            </p>
          </div>
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">
              Cattle Weight
            </h3>
            <p className="text-[20px] text-heading">
              {cattleDetails?.weight + " Kg"}
            </p>
          </div>
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">SNF%</h3>
            <p className="text-[20px] text-heading">
              {cattleDetails?.snf + "%"}
            </p>
          </div>
        </div>
      </div>

      <hr className="border border-para opacity-20 rounded-lg" />

      {/* Breed Info */}
      <div className="my-6">
        <h1 className="text-primary font-dmSans text-[20px] font-[600]">
          Breeding Info
        </h1>
        <p className="text-para text-[16px]">
          Related to cattle’s family or insemination
        </p>
        <div className="flex gap-3 flex-col sm:flex-row sm:gap-10 xl:flex xl:gap-10 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-3 mt-3">
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">
              Father Insemination
            </h3>
            <p className="text-[20px] text-heading">
              {lowerExceptFirst(
                cattleDetails?.fatherInsemination?.split("_")[0]
              )}{" "}
              {lowerExceptFirst(
                cattleDetails?.fatherInsemination?.split("_")[1]
              )}
            </p>
          </div>
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">Parent</h3>
            <p className="text-[20px] text-heading">
              {lowerExceptFirst(cattleDetails?.parent?.split("_")[0])}{" "}
              {lowerExceptFirst(cattleDetails?.parent?.split("_")[1])}
            </p>
          </div>
          <div>
            <h3 className="text-[16px] font-dmSans text-heading">Breed</h3>
            <p className="text-[20px] text-heading">Jersey</p>
          </div>
        </div>
      </div>

      <hr className="border border-para opacity-20 rounded-lg" />

      {/* Dates and purchase info */}
      <div className="flex mt-4 flex-col xxl:flex-row gap-4 xxl:gap-16">
        {/* Dates */}
        <div>
          <h1 className="text-primary font-dmSans text-[20px] font-[600]">
            Dates
          </h1>
          <p className="text-para text-[16px]">
            Helps with tracking age and farm history
          </p>
          <div className="flex gap-6 sm:gap-20 mt-3">
            <div>
              <h3 className="text-[16px] font-dmSans text-heading">
                Birth Date
              </h3>
              <p className="text-[20px] text-heading text-nowrap">
                {format(parseISO(cattleDetails?.birthDate), "MMM dd, yyyy")}
              </p>
            </div>
            <div>
              <h3 className="text-[16px] font-dmSans text-heading">
                Farm Entry Date
              </h3>
              <p className="text-[20px] text-heading text-nowrap">
                {format(parseISO(cattleDetails?.farmEntryDate), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        </div>

        {/*  Purchase Info */}
        <div>
          <h1 className="text-primary font-dmSans text-[20px] font-[600]">
            Purchase Info
          </h1>
          <p className="text-para text-[16px]">
            Financial tracking for this cattle
          </p>
          <div className="flex gap-6 sm:gap-20 mt-3">
            <div>
              <h3 className="text-[16px] font-dmSans text-heading">
                Purchase Amount
              </h3>
              <p className="text-[20px] text-heading">
                {cattleDetails?.purchaseAmount}
              </p>
            </div>
            <div>
              <h3 className="text-[16px] font-dmSans text-heading">
                Vendor Name
              </h3>
              <p className="text-[20px] text-heading">
                {cattleDetails?.vendorName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
