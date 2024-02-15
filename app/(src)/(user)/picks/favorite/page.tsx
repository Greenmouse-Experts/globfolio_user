import React from 'react'
import FavoriteList from '@/lib/components/modules/picks/favoriteList'

const FavoritePicks = () => {
  return (
    <>
      <div className='bg-white shadow p-6 rounded min-h-[75vh]'>
        <FavoriteList/>
      </div>
    </>
  )
}

export default FavoritePicks