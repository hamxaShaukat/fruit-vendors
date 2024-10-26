'use client'
import useName from '@/lib/Store/NameStore'
import React from 'react'

const ListingPage = () => {
  const {name} = useName();
  return (
    <div>{name}</div>
  )
}

export default ListingPage