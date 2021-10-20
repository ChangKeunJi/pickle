import { useState } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import DirModal from "./DirModal";

const DirDropdown = () => {
  return (
    <div>
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="hover:ring-2 hover:ring-light-nav-hover hover:bg-light-nav w-8 h-8 text-light-main flex-center text-sm rounded-full ">
            <DotsHorizontalIcon className="w-5 h-5 text-light-font" />
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
          <Menu.Items className="origin-top-right= absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <DirModal title={"수정"} />
            </Menu.Item>
            <Menu.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-nav"
              >
                삭제
              </a>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DirDropdown;
