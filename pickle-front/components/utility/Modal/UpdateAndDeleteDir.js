import { TrashIcon } from "@heroicons/react/outline";
import AddDirModal from "./AddDirModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { DELETE_DIR_REQUEST } from "../../../reducers/directory";
import { DELETE_POST_REQUEST } from "../../../reducers/post";
import DeleteModal from "./DeleteModal";

const UpdateAndDeleteDir = ({ id, name }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { dirPosts } = useSelector((state) => state.post);

  useEffect(() => {
    if (confirm) {
      // 카테고리 속해있는 북마크 삭제
      dirPosts.map((el) => {
        dispatch({
          type: DELETE_POST_REQUEST,
          data: el.id,
        });
      });
      // 카테고리 삭제
      dispatch({
        type: DELETE_DIR_REQUEST,
        data: id,
      });
      setConfirm(false);
      router.push("/");
    }
  }, [confirm]);

  return (
    <div className="flex">
      <AddDirModal update={true} id={id} name={name} />
      <div
        onClick={() => setModal(true)}
        className="cursor-pointer w-8 h-8 hover:bg-gray-dark flex-center rounded-full dark:hover:bg-dark-black"
      >
        <TrashIcon className="w-5 h-5" />
        {modal && (
          <DeleteModal
            type={"dir"}
            setModal={setModal}
            setConfirm={setConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateAndDeleteDir;
