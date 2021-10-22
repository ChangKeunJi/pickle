import { PlusSmIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useCallback, useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import useInput from "../../hooks/useInput";
import { ADD_DIR_REQUEST, UPDATE_DIR_REQUEST } from "../../reducers/directory";

const DirModal = ({ update, id, name }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const defaultInput = name || "";
  const [inputValue, setInputValue] = useState(defaultInput);

  const cancelButtonRef = useRef(null);

  const onClickOpenModal = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const onChangeInput = useCallback(
    (e) => {
      setInputValue(e.target.value);
    },
    [inputValue],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (update) {
        dispatch({
          type: UPDATE_DIR_REQUEST,
          data: { name: inputValue, id: id },
        });
      } else {
        dispatch({
          type: ADD_DIR_REQUEST,
          data: { name: inputValue },
        });
      }

      setInputValue("");
      setOpen(false);
    },
    [inputValue],
  );

  return (
    <div className="hover:bg-light-nav rounded-full cursor-pointer hover:bg-light-nav-hover">
      {update ? (
        <PencilAltIcon className="w-5 h-5" onClick={onClickOpenModal} />
      ) : (
        <PlusSmIcon className="w-7 h-7" onClick={onClickOpenModal} />
      )}

      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <form
                  onSubmit={onSubmit}
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          카테고리 명을 입력해주세요.
                        </Dialog.Title>
                        <div className="mt-4">
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              className="py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="카테고리 이름"
                              onChange={onChangeInput}
                              value={inputValue}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex-center sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-light-font shadow-sm px-4 py-2 text-base font-medium hover:bg-light-nav focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      추가하기
                    </button>
                  </div>
                </form>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default DirModal;
