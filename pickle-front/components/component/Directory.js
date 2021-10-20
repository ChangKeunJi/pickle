import { useState } from "react";
import DirDropdown from "../utility/DirDropdown";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Empty = styled.div`
  background-color: ${(props) => (props.isDraggingOver ? "#DAD9D4" : "")};
`;

const Directory = ({ dir, index }) => {
  // 설정 아이콘은 Directory 컴포넌트가 호버 될 때만 보여준다.
  const [hover, setHover] = useState(false);

  // 이름이 일정 길이 이상 넘어가면 "..." 처리
  let title = dir.title;
  if (title.length > 16) {
    title = title.slice(0, 16);
    title += "...";
  }

  // Drag 될 때 카테고리 색 변경
  const getStyle = (isDragging) => {
    return isDragging ? "bg-light-nav-hover" : "";
  };

  return (
    <Draggable key={dir.id} index={index} draggableId={dir.id}>
      {(provided, snapshot) => (
        <Empty
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          className={`dir-item ${getStyle(snapshot.isDragging)}`}
        >
          {dir.title}
          <div className={hover ? "block" : "hidden"}>
            <DirDropdown />
          </div>
        </Empty>
      )}
    </Draggable>
  );
};

export default Directory;
