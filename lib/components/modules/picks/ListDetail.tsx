import dayjs from 'dayjs'
import React, { FC } from 'react'
import { FaTimes } from 'react-icons/fa';

interface Props{
    data: any;
    close: () => void
}
const ListDetail:FC<Props> = ({data, close}) => {
  return (
    <div>
        <FaTimes className='text-xl absolute -top-8 right-3 lg:right-7' onClick={close}/>
        <div className="py-2 text-black max-h-[550px] overflow-y-auto">
            
            <div className="item-body px-2 text-wrap">
              <p className="fs-300 mb-2 fw-500">
                {dayjs(data?.createdAt).format("dddd DD, MMMM YYYY")}
              </p>
              <p className="fw-600 syne">{data?.industry}</p>
              <p className="fw-600 lg:text-lg">{data?.intro}</p>
              <div
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            </div>
          </div>
    </div>
  )
}

export default ListDetail