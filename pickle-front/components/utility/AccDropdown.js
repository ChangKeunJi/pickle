import { Fragment, useCallback } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../../reducers/user";

const AccDropdown = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <div className="mr-4">
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="hover:text-light-font w-8 h-8 text-light-main bg-user-profile rounded-full bg-gray-800 flex-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            {/* ========= User Name ========= */}
            <div className="w-full text-xl">C</div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-nav"
              >
                다크모드
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-nav"
              >
                사용법
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-nav"
                onClick={onLogout}
              >
                로그아웃
              </a>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default AccDropdown;
