import React, { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

function TogglePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  }

  return (
    <div className="mb-3 border rounded-[50px]">
      <div className="flex p-3 items-center justify-between">
        <div className="flex flex-row justify-between items-center">
          {header}
        </div>
        <div onClick={handleClick} className='cursor-pointer'>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      <div className="p-2">
        {expanded && 
          <div className="p-2 border-t">
            {children}
          </div>
        }
      </div>
    </div>
  );
}

export default TogglePanel;
