import Image from "next/image";
import Router from "next/router";

import UrlModal from "../utility/UrlModal";
import AccDropdown from "../utility/AccDropdown";
import Logo from "../../public/img/Logo.png";

const Nav = () => {
  return (
    <div className="border-b border-light-nav shadow-sm">
      <div className="container mx-xl flex justify-between h-16 items-center">
        <div
          className="flex-center p-3 py-0 rounded-2xl pr-5 h-12 cursor-pointer hover:bg-light-nav"
          onClick={() => Router.replace("/")}
        >
          <Image src={Logo} width={50} height={50} />
          <p className="text-xl">Pickle</p>
        </div>
        <div className="flex-center">
          <UrlModal />
          <AccDropdown />
        </div>
      </div>
    </div>
  );
};

export default Nav;
