import RecentPicks from '@/lib/components/modules/dashboard/recentPicks'
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
        </div>
    </>
  )
}

export default UserDashboard