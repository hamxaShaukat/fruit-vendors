'use client'
import useName from "@/lib/Store/NameStore";
import React from "react";
import {Separator} from '@/components/ui/separator'

interface SingleCardListingProps {
  date: string;
  shell: string;
  price: string;
  wage: string;
  labours: string;
  expenses: string;
}

const SingleCardListing = ({ date, shell, price,wage,labours,expenses }: SingleCardListingProps) => {

    const totalShells = parseInt(shell);
    const totalPrice = parseInt(price);
    const totalWage = parseInt(wage);
    const totalLabours = parseInt(labours);
    const totalExpenses = parseInt(expenses);
    const totalProfit = (totalShells * totalPrice) - (totalLabours * totalWage) - totalExpenses;
    const {name } = useName();


  return (
    <>
    
    <div className="flex w-full items-center justify-center">
      <div className="w-11/12 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flow-root">
            <div className="text-sm text-slate-600">
                {name} sent on <span className="font-semibold">{date}</span>
            </div>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Date of shipment
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {date}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                   Number of shells
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {totalShells}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Price per shell
                  </p>
                  
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  Rs {totalPrice}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    All Shells
                  </p>
                 
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    RS {totalPrice*totalShells}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    No. of labours
                  </p>
                 
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                   {totalLabours}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Wage/labour
                  </p>
                 
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    RS {totalWage}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    total Wages
                  </p>
                 
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    RS {totalLabours*totalWage}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Other Expenses
                  </p>
                 
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    RS {totalExpenses}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Profit
                  </p>
                 
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    RS {totalProfit}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Separator className="my-4" />
    </>

  );
};

export default SingleCardListing;
