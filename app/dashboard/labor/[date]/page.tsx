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
    Employes: EmployeeField[];
  }
  const { laborId } = useLaborStore();

  const { db } = FirebaseConfig();
  const [labor, setLabor] = useState<LaborRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
useEffect(() => {
  const laborRef = ref(db, `labors/${laborId}`);

  const unsubscribe = onValue(
    laborRef,
    (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setLabor({
          id: laborId,
          date: data.date || "", // Use default values if missing
          description: data.description || "",
          Employes: data.Employes || [], // Use `employees` from Firebase
        });
      } else {
        setLabor(null); // Handle missing data gracefully
      }
      setLoading(false);
    },
    (error) => {
      setError("Failed to fetch labor data.");
      setLoading(false);
    }
  );

  // Cleanup on unmount
  return () => unsubscribe();
}, [db, laborId]);





  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!labor) {
    return <div>No labor data found.</div>;
  }

  console.log("hhhhhi", labor?.Employes);
  return (
    <div className="my-5">
      <LaborCards
      // setIsEditing={setIsEditing}
        key={labor.id}
        desc={labor.description}
        employees={labor.Employes}
      />
    </div>
  );
};

export default LaborPage;
