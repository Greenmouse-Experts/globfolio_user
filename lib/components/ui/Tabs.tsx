'use client';
import React, { FC, useState } from 'react';
import { classNames } from '@/lib/utils';

interface Props {
  tabs: {
    title: JSX.Element;
    content: JSX.Element;
  }[];
  broadcastCurrentIndex?: (index: number) => void;
  type: string;
}

const Tabs: FC<Props> = ({ tabs, broadcastCurrentIndex, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navStyle = {
    charts:
      'bg-[#FFFBF1] p-4 rounded-[10px] flex lg:space-x-2 space-x-2 overflow-x-auto',
    norm: 'flex lg:space-x-4 space-x-2 overflow-x-auto',
    '': '-mb-px tab-bar flex lg:space-x-8 space-x-2 overflow-x-auto',
    price: 'flex justify-center lg:space-x-8',
  };
  const navClass = {
    charts:
      'whitespace-nowrap grow text-center cursor-pointer py-[10px] fs-500',
    norm: 'whitespace-nowrap text-center cursor-pointer py-[5px] px-6 fs-500',
    price:
      'whitespace-nowrap text-center cursor-pointer py-[10px] px-6 lg:px-12 fs-500',
  };
  const navActiveClass = {
    charts: 'bg-[#B3561B] text-white rounded-[10px] duration-100',
    norm: 'border-b-[4px] text-[#B3561B] border-[#B3561B]',
    '': 'border-b-[4px] text-[#B3561B] border-[#B3561B]',
    price: 'bg-[#B3561B] text-white rounded-[10px] duration-100',
  };
  const navInactiveClass = {
    charts: 'text-[#A6A6A6] bg-[#FAFAFA] hover:text-gray-700',
    norm: 'text-[#A6A6A6] border-b-[4px] border-[#FAFAFA] hover:text-gray-700',
    price:
      'text-[#A6A6A6] bg-[#FAFAFA] hover:text-gray-700 rounded-[10px] duration-100',
  };

  return (
    <div>
      <div className="">
        <div className="">
          <nav
            className={navStyle[type as keyof typeof navStyle]}
            aria-label="Tabs"
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  broadcastCurrentIndex && broadcastCurrentIndex(index);
                }}
                className={classNames(
                  index === currentIndex
                    ? navActiveClass[type as keyof typeof navActiveClass]
                    : navInactiveClass[type as keyof typeof navInactiveClass],
                  navClass[type as keyof typeof navClass]
                )}
              >
                {tab.title}
              </div>
            ))}
          </nav>
          <div className="pt-2">{tabs[currentIndex].content}</div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
