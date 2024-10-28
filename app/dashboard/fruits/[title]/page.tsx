'use client'
import MainListingPage from '@/components/Fruits/MainListingPage';
import useName from '@/lib/Store/NameStore'
import React from 'react'

const ListingPage = () => {
  const {name} = useName();
  return (
    <div>
      <MainListingPage />
    </div>
  )
}

export default ListingPage