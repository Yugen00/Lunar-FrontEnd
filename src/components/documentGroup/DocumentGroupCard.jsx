import React, { useState } from "react";
import JustCard from "./JustCard";

function DocumentGroupCard({ data,index, setOriginalData, level = 0, childIndex=[] }) {
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
        setOriginalData={setOriginalData}
        toggleChildren={toggleChildren}
        level={level}
      />

      {/* Render children recursively */}
      {showChildren && data.children?.length > 0 && 
        data.children.map((child, childIdx) => (
          <DocumentGroupCard
            key={child.GroupId}
            data={child}
            index={index} // Same parent index
            childIndex={[...childIndex, childIdx]} // Append current child index to the parent's list
            setOriginalData={setOriginalData}
            level={level + 1} // Increase the level for nested children
          />
        ))
      }
    </>
  );
}

export default DocumentGroupCard;
