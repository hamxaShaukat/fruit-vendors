import DisplayTable from '@/components/Fruits/DisplayTable'
import useName from '@/lib/Store/NameStore'
import React from 'react'


const titlePageItems = [
    {
        name: 'Amrood',
        dataOfShipment:'1-1-2001',
        totalQuantity:'20',
        unitPrice:'100',
        totalCost:'2000',
    }
]

const TitlePage = () => {
  const {name} = useName();
  return (
    <>
    {titlePageItems.map((item)=>(
        <div key={1}>
            {name}
        </div>
    ))}
    </>
  )
}

export default TitlePage