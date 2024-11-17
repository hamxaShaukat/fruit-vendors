'use client'
import TotalCard from '@/components/Total/TotalCard';
import useAllLaborData from '@/hooks/useAllLabors';
import useAllInventoryTransactions from '@/hooks/useAllTransactions';
import React from 'react'

const TotalsPage = () => {
    const allTransactions = useAllInventoryTransactions();
    const allLabors = useAllLaborData();
    if(!allTransactions && !allLabors) return <div>loading.....</div>;
    // console.log('allLabors',allLabors);
  return (
    <div className='flex flex-col items-center gap-y-6'>
        {allTransactions?.map((singleTransaction)=>(
            <TotalCard key={singleTransaction.Name} name={singleTransaction.Name} transactions={singleTransaction.transactions} labors={allLabors} />
        ))}
    </div>
  )
}

export default TotalsPage