import { getGroups } from '@/lib/service/api/chatApi'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const GroupList = () => {
  const {data} = useQuery({
    queryFn: getGroups,
    queryKey: ["groups"]
  })
  return (
    <div>
      {
        data?.data?.map((item:any, i:number) => (
          <div key={i}>{item}</div>
        ))
      }
    </div>
  )
}

export default GroupList