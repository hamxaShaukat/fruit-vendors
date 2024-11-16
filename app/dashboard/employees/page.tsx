"use client";
import EmployeCard from "@/components/Employees/EmployeCard";
import EmployeeHome from "@/components/Employees/EmployeHome";
import useLabors from "@/hooks/useLabors";
import useLaborStore from "@/lib/Store/LaborStore";
import React from "react";

const Employee = () => {
  const { labors, loading, error } = useLabors();
  const {laborId}=useLaborStore();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(labors);
  return (
    <>
      <div className="flex items-center justify-center">
        <EmployeeHome />
      </div>
      <div className="flex flex-col items-center gap-y-4 m-4">
        {labors.map((labor) => (
          <EmployeCard key={labor.description} id={labor.id} date={labor.date} />
        ))}
      </div>
    </>
  );
};

export default Employee;
