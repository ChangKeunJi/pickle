import { useState } from "react";
import DirDropdown from "../utility/DirDropdown";
import { Draggable } from "react-beautiful-dnd";

const Directory = ({ dir, index }) => {
  // 설정 아이콘은 Directory 컴포넌트가 호버 될 때만 보여준다.
  const [hover, setHover] = useState(false);

  // 이름이 일정 길이 이상 넘어가면 "..." 처리
  let name = dir.name;
  if (name.length > 16) {
    name = name.slice(0, 16);
    name += "...";
  }

  return (
    <Draggable key={dir.id} index={index} draggableId={String(dir.id)}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          className="dir-item"
        >
          {dir.name}
          <div className={hover ? "block" : "hidden"}>
            <DirDropdown />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Directory;
