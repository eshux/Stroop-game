import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight, faCog } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft, faArrowRight, faCog);

type Props = {
  onClick: () => void;
  className: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};

const IconBtn: FC<Props> = ({ onClick, className, icon }) => {
  return (
    <>
      <button className={className} type="button" onClick={onClick}>
        <FontAwesomeIcon icon={icon} className='icon' />
      </button>
    </>
  );
};

export default IconBtn;
