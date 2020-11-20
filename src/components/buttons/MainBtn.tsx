import React, { FC } from 'react';

type Props = {
  onClick?: () => void;
  text?: string;
  className?: string;
};

const MainBtn: FC<Props> = ({ onClick, text, className }) => {
  return (
    <>
      <button className={`button ${className}`} type="button" onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default MainBtn;