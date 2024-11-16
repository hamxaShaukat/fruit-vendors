"use client";

import React from "react";
import { Pencil, Trash2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import useDate from "@/lib/Store/DateStore";
import useLaborStore from "@/lib/Store/LaborStore";
import FirebaseConfig from "@/firebase/firbaseConfig";
import { ref, remove } from "firebase/database";

interface EmployeCardProps {
  id: string;
  date: string;
}

const EmployeCard = ({ date, id }: EmployeCardProps) => {
  const { setDate } = useDate();
  const { laborId, setLaborId } = useLaborStore();
  const router = useRouter();
  console.log(laborId);
  const handleNavigation = () => {
    setDate(date);
    setLaborId(id);
    router.push(`/dashboard/labor/${id}`);
  };
  const deleteLaborRecord = async () => {
    const { db } = FirebaseConfig();
    const laborRef = ref(db, `labors/${id}`);

    try {
      await remove(laborRef);
      alert(`Labor record has been deleted successfully.`);
    } catch (error) {
      console.error("Error deleting labor record:", error);
    }
  };
  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-6 flex items-center justify-between space-x-4">
        {/* Card Content */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-light">Labor on</p>
          <p className="text-lg font-semibold text-gray-800">{date}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {/* Delete Button */}
          <button
            className="group relative p-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-all duration-200"
            aria-label="Delete" onClick={deleteLaborRecord}
          >
            <Trash2 className="w-5 h-5 text-gray-600 group-hover:scale-110 group-hover:text-gray-800 transition-transform duration-300" />
          </button>
          {/* Navigate Button */}
          <button
            className="group relative p-3 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-all duration-200"
            aria-label="Navigate"
            onClick={handleNavigation}
          >
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:scale-110 group-hover:text-gray-800 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeCard;
