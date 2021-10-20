import { useCallback, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

import Directory from "../component/Directory";
import DirModal from "../utility/DirModal";
import { useSelector } from "react-redux";

const DirectoryBar = () => {
  const { allDirs } = useSelector((state) => state.directory);
  const [state, setState] = useState(allDirs);

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;

      // 컴포넌트가 영역 밖으로 Drag 되었을 때
      if (!result.destination) {
        return;
      }

      // 움직임이 있었지만 이전과 순서가 변하지 않았을 때
      if (
        destination.draggableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // 기존 순서 객체를 복사한 뒤 새로운 순서 객체를 만들어준다.
      const newAllDirs = Array.from(state);
      const [removed] = newAllDirs.splice(source.index, 1);
      newAllDirs.splice(destination.index, 0, removed);
      setState(newAllDirs);
    },
    [state],
  );

  resetServerContext();

  return (
    <div>
      <div className="h-screen bg-light-nav py-8 directory-flex">
        <div className="dir-item">
          <p>모두보기</p>
        </div>
        <div className="border-b border-light-nav-hover dir-item">
          <p>즐겨찾기</p>
        </div>
        <div className="w-full">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dirs">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {state.map((dir, index) => {
                    return <Directory key={dir.id} dir={dir} index={index} />;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="w-full flex-center py-3">
          <DirModal />
        </div>
      </div>
    </div>
  );
};

export default DirectoryBar;

// https://stackoverflow.com/questions/64242578/how-to-fix-data-rbd-draggable-context-id-did-not-match-server-1-client-0

// import { resetServerContext } from "react-beautiful-dnd"
// https://github.com/atlassian/react-beautiful-dnd/issues/1756
// resetServerContext()

// https://github.com/atlassian/react-beautiful-dnd/issues/1756

// =============================================
// SSR 에서 react-beautiful-dnd 사용할 때 나타나는 에러 해결하기 위해 필요함
//https://github.com/atlassian/react-beautiful-dnd/issues/1756#issuecomment-735369084
// const [winReady, setwinReady] = useState(false);
// useEffect(() => {
//   setwinReady(true);
// }, []);
// ==============================================
