import Image from "next/image";
import Router from "next/router";

import AddPostModal from "../utility/addPostModal";
import AccDropdown from "../utility/AccDropdown";
import Logo from "../../public/img/Logo.png";

const Nav = () => {
  return (
    <div className="border-b border-light-nav shadow-md">
      <div className="flex justify-between h-16 items-center w-full px-4">
        <div
          className="flex-center p-3 py-0 rounded-2xl pr-5 h-12 cursor-pointer hover:bg-light-nav"
          onClick={() => Router.replace("/")}
        >
          <Image src={Logo} width={50} height={50} />
          <p className="text-xl tracking-widest">Pickle</p>
        </div>
        <div className="flex-center">
          <AddPostModal />
          <AccDropdown />
        </div>
      </div>
    </div>
  );
};

export default Nav;
