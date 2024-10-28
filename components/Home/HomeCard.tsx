/* eslint-disable @next/next/no-img-element */
'use client'
import React from "react";
import { ArrowRight } from "lucide-react";
import useName from "@/lib/Store/NameStore";
import { useRouter } from "next/navigation";

interface ImageCardProps {
  imageUrl: string;
  title: string;
}

const HomeCard = ({ imageUrl, title }: ImageCardProps) => {
  const router = useRouter();
  const { name, setName } = useName();

  
  const goToSpecificFruit = (specificTitle: string) => {
    setName(specificTitle);
    router.push(`/dashboard/fruits/${specificTitle}`);
  };
  return (
    <div
      className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={() => goToSpecificFruit(title)}
    >
      <img className="rounded-t-lg" src={imageUrl} alt={title} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-900 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
        >
          View Listings
          <ArrowRight />
        </a>
      </div>
    </div>
  );
};

export default HomeCard;
