import { FC } from 'react';
import { Bars } from 'react-loader-spinner';

interface BarsProps {
  size: string;
  color: string;
}
export const BarsSpinner: FC<BarsProps> = ({ size, color }) => {
  return (
    <Bars
      height={size}
      width={size}
      color={color}
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
