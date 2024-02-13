import ActiveSub from '@/lib/components/modules/subscription/activeSub'
import SubPlanList from '@/lib/components/modules/subscription/subList'
import React from 'react'

const UserSubscripton = () => {
  return (
    <>
        <div className='flex'>
            <div className='lg:w-4/12 lg:mt-12'>
                <ActiveSub/>
            </div>
            <div className='lg:w-8/12 mt-12 flex justify-center'>
                <SubPlanList/>
            </div>
        </div>
    </>
  )
}

export default UserSubscripton