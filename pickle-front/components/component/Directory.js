import { useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import DirDropdown from "../utility/DirDropdown";
import DirUpdateDelete from "../utility/DirUpdateDelete";

const Directory = ({ dir, index }) => {
  // 설정 아이콘은 Directory 컴포넌트가 호버 될 때만 보여준다.
  const [hover, setHover] = useState(false);
  const [activeEffect, setActiveEffect] = useState(false);

  // 이름이 일정 길이 이상 넘어가면 "..." 처리
  let name = dir.name;
  if (name.length > 16) {
    name = name.slice(0, 16);
    name += "...";
  }

  const onClickDir = useCallback(() => {
    setActiveEffect(true);
  }, [activeEffect, hover]);

  return (
    <Draggable key={dir.id} index={index} draggableId={String(dir.id)}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onClick={onClickDir}
          className="dir-item-before dir-item"
        >
          {name}
          <div className={hover ? "block" : "hidden"}>
            <DirUpdateDelete id={dir.id} name={dir.name} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Directory;

// https://okky.kr/article/703668
