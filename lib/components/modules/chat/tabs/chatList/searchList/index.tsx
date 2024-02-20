import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchList = () => {
  return (
    <div>
        <div className='flex gap-x-1 items-center px-2 border rounded-lg'>
            <BiSearch className='shrink-0'/>
            <input type='search' className='w-full outline-none p-1'/>
        </div>
    </div>
  )
}

export default SearchList