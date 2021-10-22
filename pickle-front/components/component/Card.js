import { useCallback, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { summarizeStr } from "../../hooks/helper";
import { useDispatch } from "react-redux";
import { DELETE_POST_REQUEST } from "../../reducers/post";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const onClick = useCallback((e) => {
    e.preventDefault();
    window.open(post.url, "_blank");
  }, []);

  const onClickRemove = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: DELETE_POST_REQUEST,
        data: post.id,
      });
    },
    [post],
  );

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      className="card cursor-pointer border border-light-nav hover:border-light-nav-dark hover:shadow-md rounded-2xl"
      onClick={onClick}
    >
      <div className="flex items-start justify-between flex-col p-4 h-full">
        <div className="flex flex-col gap-2 w-full">
          <img
            src={post.thumbnail || "/img/noimage.svg"}
            className="card-image w-full rounded-2xl border border-light-nav shadow-sm object-cover"
          />
          <div className="font-semibold w-full">
            {summarizeStr(post.title, 30)}
          </div>
          <div className="text-sm text-dark-nav-hover w-full">
            {summarizeStr(post.desc, 100)}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4 w-10/12 h-8">
            <div className="w-5 h-5">
              <img src={post.favicon} />
            </div>
            <div className="text-xs">{summarizeStr(post.author, 20)}</div>
          </div>
          <div
            className={hover ? "w-2/12 block flex-center z-20" : "hidden"}
            onClick={onClickRemove}
          >
            <TrashIcon className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

// <div
//     onMouseOver={() => setHover(true)}
//     onMouseOut={() => setHover(false)}
//     className="card cursor-pointer border border-light-main hover:border-light-nav-dark hover:shadow-md rounded-2xl hover:border-light-nav-hover box-border"
//     onClick={onClick}
// >
//   <div className="flex items-start justify-between flex-col gap-4 p-8 h-full">
//     <img
//         src={post.thumbnail || "/img/noimage.svg"}
//         className="w-full rounded-2xl"
//     />
//     <div className="font-semibold">{summarizeStr(post.title, 30)}</div>
//     <div className="text-sm text-dark-nav-hover">
//       {summarizeStr(post.desc, 100)}
//     </div>
//     <div className="flex justify-between w-full h-6">
//       <div className="flex items-center gap-4 w-10/12">
//         <div className="w-5 h-5">
//           <img src={post.favicon} />
//         </div>
//         <div className="text-xs">{summarizeStr(post.author, 20)}</div>
//       </div>
//       <div className={hover ? "w-2/12 block flex-center" : "hidden"}>
//         <TrashIcon className="w-7 h-7" />
//       </div>
//     </div>
//   </div>
// </div>
