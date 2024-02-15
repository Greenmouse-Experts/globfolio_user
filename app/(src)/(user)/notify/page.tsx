import NotifyList from '@/lib/components/modules/notify/NotifyList'
import Tabs from '@/lib/components/ui/Tabs'
import React from 'react'

const NotifyPage = () => {
  const tab = [
    {
      title: <>All</>,
      content: <NotifyList status='all'/>
    },
    {
      title: <>Unread</>,
      content: <NotifyList status='unread'/>
    },
  ]
  return (
    <>
        <div>
          <div className='lg:w-8/12 mx-auto bg-white p-6 rounded-[17px]'>
            <Tabs tabs={tab} type='charts'/>
          </div>
        </div>
    </>
  )
}

export default NotifyPage