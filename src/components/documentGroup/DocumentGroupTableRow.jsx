import React, { useState } from 'react';
import JustTableRow from './JustTableRow';

function DocumentGroupTableRow({ data,index, handleDataChange, level = 0, childIndex=[] }) {
  const [showChildren, setShowChildren] = useState(false);

  const toggleChildren = () => {
    setShowChildren(!showChildren);
  };

  return (
    <>
      <JustTableRow
        data={data}
        index={index}
        childIndex={childIndex}
        handleDataChange={handleDataChange}
        toggleChildren={toggleChildren}
        level={level}
      />

      {/* Render children recursively */}
      {showChildren && data.children?.length > 0 && 
        data.children.map((child, childIdx) => (
          <DocumentGroupTableRow
            key={child.GroupId}
            data={child}
            index={index} // Same parent index
            childIndex={[...childIndex, childIdx]} // Append current child index to the parent's list
            handleDataChange={handleDataChange}
            level={level + 1} // Increase the level for nested children
          />
        ))
      }
    </>
  );
}

export default DocumentGroupTableRow;
