"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Calendar } from "lucide-react"; // Optional: use lucide or your own icon

type RangeType = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
};

export default function DateRangePickerBox({
  selectedRange,
  setSelectedRange,
}: {
  selectedRange: RangeType[];
  setSelectedRange: Dispatch<SetStateAction<RangeType[]>>;
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      {/* Button / Box */}
      <div
        className="border border-[#D9D9D9] rounded-lg h-[47px] px-4 py-2 flex items-center gap-2 text-[#A4A4A4] cursor-pointer"
        onClick={() => setShowPicker(!showPicker)}
      >
        <Calendar size={16} />
        <span className="text-sm font-medium font-inter">
          {selectedRange[0].startDate && selectedRange[0].endDate
            ? `${format(selectedRange[0].startDate, "dd MMM yyyy")} - ${format(
                selectedRange[0].endDate,
                "dd MMM yyyy"
              )}`
            : "Select Date Range"}
        </span>
      </div>

      {/* Date Picker Dropdown */}
      {showPicker && (
        <div className="absolute right-0 z-50 mt-2">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setSelectedRange([item.selection as RangeType])}
            moveRangeOnFirstSelection={false}
            ranges={selectedRange}
            className="shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
