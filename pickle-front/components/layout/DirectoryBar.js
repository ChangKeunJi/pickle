import { useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

import Directory from "../component/Directory";
import DirModal from "../utility/DirModal";
import { useSelector } from "react-redux";

const DirectoryBar = () => {
  const { allDirs } = useSelector((state) => state.directory);
  // const onDragEnd = (result) => {};
  // const ref = useRef();
  //
  // const renderDir = allDirs.map((dir) => {
  //   return <Directory dir={dir} id={dir.id} />;
  // });
  //
  // const renderDir2 = () => {
  //   return (
  //     <Droppable droppableId="dirs">
  //       {(provided, snapshot) => (
  //         <div
  //           ref={provided.innerRef}
  //           {...provided.droppableProps}
  //           isDraggingOver={snapshot.isDraggingOver}
  //         >
  //           {allDirs.map((dir, index) => (
  //             <Directory key={dir.id} dir={dir} index={index} />
  //           ))}
  //           {provided.placeholder}
  //         </div>
  //       )}
  //     </Droppable>
  //   );
  // };

  return (
    <DragDropContext>
      <div className="h-screen bg-light-nav py-8 directory-flex">
        <div className="dir-item">
          <p>모두보기</p>
        </div>
        <div className="border-b border-light-nav-hover dir-item">
          <p>즐겨찾기</p>
        </div>

        {renderDir2()}

        {/*<Directory title={"React"} />*/}
        <div className="w-full flex-center py-3">
          <DirModal />
        </div>
      </div>
    </DragDropContext>
  );
};

export default DirectoryBar;
