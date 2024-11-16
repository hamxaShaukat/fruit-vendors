"use client";
import LaborCards from "@/components/Labor/LaborCards";
import FirebaseConfig from "@/firebase/firbaseConfig";
import useLaborStore from "@/lib/Store/LaborStore";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

const LaborPage = () => {
  interface EmployeeField {
    id: number;
    name: string;
    wage: string;
  }

  interface LaborRecord {
    id: string;
    date: string;
    description: string;
    employees: EmployeeField[];
  }
  const { laborId } = useLaborStore();

  const { db } = FirebaseConfig();
  const [labor, setLabor] = useState<LaborRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
console.log('first',laborId)
useEffect(() => {
  const laborRef = ref(db, `labors/${laborId}`);

  const unsubscribe = onValue(
    laborRef,
    (snapshot) => {
      const data = snapshot.val();
      console.log("data from Firebase:", data); // Debug fetched data

      if (data) {
        setLabor({
          id: laborId,
          date: data.date || "", // Use default values if missing
          description: data.description || "",
          employees: data.employees || [], // Use `employees` from Firebase
        });
      } else {
        setLabor(null); // Handle missing data gracefully
      }
      setLoading(false);
    },
    (error) => {
      console.error("Error fetching labor data:", error);
      setError("Failed to fetch labor data.");
      setLoading(false);
    }
  );

  // Cleanup on unmount
  return () => unsubscribe();
}, [db, laborId]);


  // Debugging state changes
  useEffect(() => {
    console.log("Updated labor state:", labor);
  }, [labor]);

  // const { labor, loading, error } = useLaborById(laborId);

  // Debugging logs

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!labor) {
    return <div>No labor data found.</div>;
  }

  console.log("hhhhhi", labor?.employees);
  return (
    <div className="my-5">
      <LaborCards
      // setIsEditing={setIsEditing}
        key={labor.id}
        desc={labor.description}
        employees={labor.employees}
      />
    </div>
  );
};

export default LaborPage;
