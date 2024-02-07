import React, { FC } from 'react';
import './CubeLoader.css';

interface Props {
  size: number;
}
const CubeLoader: FC<Props> = ({ size }) => {
  return (
    <>
      <div className="cube-loader" style={{ scale: `${size}` }}>
        <div className="cube-top"></div>
        <div className="cube-wrapper">
          <span
            style={{ '--i': 1 } as React.CSSProperties}
            className="cube-span"
          ></span>
          <span
            style={{ '--i': 2 } as React.CSSProperties}
            className="cube-span"
          ></span>
          <span
            style={{ '--i': 3 } as React.CSSProperties}
            className="cube-span"
          ></span>
          <span
            style={{ '--i': 4 } as React.CSSProperties}
            className="cube-span"
          ></span>
        </div>
      </div>
    </>
  );
};

export default CubeLoader;
