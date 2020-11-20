import React, { FC } from 'react';

type Props = {
  onClick: () => void;
  src: string;
  className: string;
};

const IconBtn: FC<Props> = ({ onClick, src, className }) => {
  return (
    <>
      <button className={className} type="button" onClick={onClick}>
        <img
          className='icon'
          src={src}
          alt=""
        />
      </button>
    </>
  );
};

export default IconBtn;
