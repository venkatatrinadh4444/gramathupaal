import Image from "next/image";
import arrow from "@/assets/cattle-dashboard-arrow.png";
import cross from "@/assets/animal-detail-cross.png";
import tick from "@/assets/animal-detail-tick.png";
import imageUpload from "@/assets/image-upload.png";

const AddNewCattle = () => {
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

  return (
    <div className="flex-1 rounded-2xl bg-white px-4 py-6 mr-4 mb-6">
      <div className="flex justify-between lg:items-end flex-col lg:flex-row items-start gap-4 lg:gap-0">
        <div>
          <h1 className="font-dmSans text-[28px] text-[#4A4A4A] font-[600]">
            Add New Cattle
          </h1>
          <div className="flex gap-2 items-center">
            <p className="text-[#A4A4A4] text-[16px]">Dashboard</p>
            <Image src={arrow} alt="arrow" className="w-4 h-auto" />
            <p className="text-[#A4A4A4] text-[16px]">Cattle Management</p>
            <Image src={arrow} alt="arrow" className="w-4 h-auto" />
            <p className="text-primary text-[16px]">Add New Cattle</p>
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <div className="bg-[#4A4A4A] rounded flex items-center px-2 cursor-pointer">
            <Image src={cross} alt="cross" className="w-[18px] h-auto" />
          </div>
          <div className="bg-primary px-2 py-2 rounded flex gap-1 items-center text-white cursor-pointer">
            <Image src={tick} alt="cross" className="w-[18px] h-auto" />
            <p>Save Information</p>
          </div>
        </div>
      </div>

      {/*  Cattle Identification */}
      <div className="my-8">
        <h1 className="text-heading font-dmSans text-[20px] font-[600]">
          Cattle Identification
        </h1>
        <p className="text-para text-[16px]">
          Helps identify the animal uniquely
        </p>
        <div className="flex justify-between mt-4">
          <div>
            <h3 className="text-heading font-dmSans text-[16px] font-[500]">
              Cattle ID *
            </h3>
            <input
              type="text"
              placeholder="Enter Cattle ID"
              className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
            />
          </div>

          <div>
            <h3 className="text-heading font-dmSans text-[16px] font-[500]">
              Health Status *
            </h3>
            <select
              className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
              defaultValue="HEALTHY"
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
              defaultValue="COW"
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
            />
          </div>
        </div>
      </div>
      <hr/>
      {/*  Breeding Info */}
      <div className="my-8">
        <h1 className="text-heading font-dmSans text-[20px] font-[600]">
          Breeding Info
        </h1>
        <p className="text-para text-[16px]">
          Related to cattle’s family or insemination
        </p>

        <div className="flex justify-between mt-4">
          <div>
            <h3 className="text-heading font-dmSans text-[16px] font-[500]">
              Upload Cattle Image *
            </h3>
            <div className=" bg-background mt-1.5 w-full cursor-pointer rounded-md flex gap-2 py-2.5 justify-center">
              <label htmlFor="imageUpload" className="text-para text-sm">
                Cattle Image
              </label>
              <Image
                src={imageUpload}
                alt="upload image"
                className="w-[18px] h-auto"
              />
              <input
                type="file"
                id="imageUpload"
                placeholder="Cattle Image"
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none hidden"
              />
            </div>
          </div>

          <div>
            <h3 className="text-heading font-dmSans text-[16px] font-[500]">
              Father Insemination *
            </h3>
            <select
              className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
              defaultValue={inseminationTypes[0]}
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
              defaultValue={parentOrigin[0]}
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
              defaultValue={breeds[0]}
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
      <hr/>
      <div className="flex justify-between my-8">
        {/* Dates */}

        <div>
          <h1 className="text-heading font-dmSans text-[20px] font-[600]">
            Dates
          </h1>
          <p className="text-para text-[16px]">
            Helps with tracking age and farm history
          </p>

          {/* Birth Details */}
          <div className="flex justify-between mt-4">
            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Birth Date *
              </h3>
              <input
                type="date"
                placeholder="Select Date"
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
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
              />
            </div>
          </div>

        </div>

        {/* Purchase Details */}
        <div>
          <h1 className="text-heading font-dmSans text-[20px] font-[600]">
            Purchase Info
          </h1>
          <p className="text-para text-[16px]">
            Financial tracking for this cattle
          </p>
          <div className="flex justify-between gap-4 mt-4">
            <div>
              <h3 className="text-heading font-dmSans text-[16px] font-[500]">
                Purchase Amount *
              </h3>
              <input
                type="text"
                placeholder="Purchase Amount"
                className=" bg-background mt-1.5 w-full cursor-pointer text-[14px] text-para rounded-md p-2 border-none"
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCattle;
