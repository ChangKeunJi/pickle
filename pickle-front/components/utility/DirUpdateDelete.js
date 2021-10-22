import { TrashIcon } from "@heroicons/react/outline";
import DirModal from "./DirModal";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DELETE_DIR_REQUEST } from "../../reducers/directory";

const DirUpdateDelete = ({ id, name }) => {
  const dispatch = useDispatch();

  const onClickDelete = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: DELETE_DIR_REQUEST,
      data: id,
    });
  }, []);

  return (
    <div className="flex gap-2">
      <DirModal update={true} id={id} name={name} />
      <div onClick={onClickDelete} className="cursor-pointer">
        <TrashIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default DirUpdateDelete;
