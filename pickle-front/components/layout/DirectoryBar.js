import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";

import Directory from "../component/Directory";
import DirModal from "../utility/DirModal";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ORDER_REQUEST } from "../../reducers/directory";

const DirectoryBar = () => {
  const dispatch = useDispatch();
  const { allDirs } = useSelector((state) => state.directory);
  const [state, setState] = useState(allDirs);

  useEffect(() => {
    setState(allDirs);
  }, [allDirs]);

  // 카테고리 이동이 완료될 때 호출되는 함수
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

      // 기존 순서 객체를 복사한 뒤 새로운 순서 객체를 만들어준 뒤 로컬 상태를 업데이트 해준다
      const newAllDirs = Array.from(state);
      const exOrder = Array.from(state);
      const [before] = newAllDirs.splice(source.index, 1);
      newAllDirs.splice(destination.index, 0, before);

      // 바뀐 순서를 API 요청을 통해 DB 에 저장한다
      //! : 과연 이것이 최선인가? 너무 많은 api 호출을 하게되는 것은 아닌가?
      console.log(exOrder, "BEFORE");
      console.log(newAllDirs, "AFTER");
      for (let i = 0; i < exOrder.length; i++) {
        if (exOrder[i].order !== newAllDirs[i].order) {
          dispatch({
            type: UPDATE_ORDER_REQUEST,
            data: { id: newAllDirs[i].id, order: exOrder[i].order },
          });
        }
      }

      setState(newAllDirs);
    },
    [state],
  );

  resetServerContext();

  return (
    <div>
      <div className="h-screen py-8 directory-flex">
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
                  {state
                    ? state.map((dir, index) => {
                        return (
                          <Directory key={dir.id} dir={dir} index={index} />
                        );
                      })
                    : "null"}
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
