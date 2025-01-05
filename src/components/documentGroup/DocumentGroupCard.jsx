import React, { useState } from "react";
import JustCard from "./JustCard";

function DocumentGroupCard({ data,index, handleDataChange, level = 0, childIndex=[],isSeeAll }) {
  const [showChildren, setShowChildren] = useState(false);
  const toggleChildren = () => {
    setShowChildren(!showChildren);
  };

  return (
    <>
      <JustCard
        data={data}
        index={index}
        childIndex={childIndex}
        handleDataChange={handleDataChange}
        toggleChildren={toggleChildren}
        level={level}
        isSeeAll={isSeeAll}
      />

      {/* Render children recursively */}
      {showChildren && data.children?.length > 0 && 
        data.children.map((child, childIdx) => (
          <DocumentGroupCard
            key={child.GroupId}
            data={child}
            index={index} // Same parent index
            childIndex={[...childIndex, childIdx]} // Append current child index to the parent's list
            handleDataChange={handleDataChange}
            level={level + 1} // Increase the level for nested children
            isSeeAll={isSeeAll}
          />
        ))
      }
    </>
  );
}

export default DocumentGroupCard;
