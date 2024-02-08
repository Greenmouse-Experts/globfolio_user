import RecentPicks from '@/lib/components/modules/dashboard/recentPicks'
import TopGroups from '@/lib/components/modules/dashboard/topGroups'
import WelcomeBox from '@/lib/components/modules/dashboard/welcomeBox'
import React from 'react'

const UserDashboard = () => {
  return (
    <>
        <div>
          <div className='grid lg:grid-cols-2 gap-6'>
            <div className='bg-white rounded-lg shadow'>
              <WelcomeBox/>
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