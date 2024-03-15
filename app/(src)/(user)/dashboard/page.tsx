"use client"
import RecentPicks from '@/lib/components/modules/dashboard/recentPicks'
import TopGroups from '@/lib/components/modules/dashboard/topGroups'
import WelcomeBox from '@/lib/components/modules/dashboard/welcomeBox'
import useRoutine from '@/lib/hooks/useRoutine'
import { getMe } from '@/lib/service/api/authApi'
import useSubStore from '@/lib/store/userSubscription'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const UserDashboard = () => {
  const {saveSub} = useRoutine()
  const {data, isLoading} = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe
  })
  useEffect(() => {
   if(data){
    saveSub(data.subscription)
   }
  }, [data])
  return (
    <>
        <div>
          <div className='grid lg:grid-cols-2 gap-6'>
            <div className='bg-white rounded-lg shadow'>
              <WelcomeBox id={data?.subscription?.planId} loading={isLoading}/>
            </div>
            <div className='bg-white rounded-lg shadow'>
              <RecentPicks/>
            </div>
          </div>
          <div className='mt-4 lg:mt-8 bg-white rounded-lg shadow'>
            <TopGroups/>
          </div>
        </div>
    </>
  )
}

export default UserDashboard