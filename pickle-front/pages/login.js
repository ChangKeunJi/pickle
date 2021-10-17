import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";

import Logo from "../public/img/Logo.png";
import Google from "../public/img/google2.png";
import Naver from "../public/img/naver.png";
import login_background from "../public/img/login_background.svg";
import { LOG_IN_REQUEST } from "../reducers/user";

const Login = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me]);

  const onClickNaver = useCallback(() => {
    // dispatch({
    //   type: LOG_IN_REQUEST,
    //   data: "kakao",
    // });
    Router.replace(`http://localhost:3065/login/kakao`);
  }, []);

  const onClickGoogle = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: "google",
    });
  }, []);

  return (
    <section className="container mt-12 text-light-font">
      <div className="grid gap-24 grid-col-1 text-center">
        <div className="flex-center">
          <Image src={Logo} width={70} height={70} />
          <h1 className="text-3xl">Pickle</h1>
        </div>
        <div>
          <p className="sm:text-4xl text-xl">
            세상에서 가장 심플한 북마크 관리 서비스
          </p>
        </div>
        <div className="flex items-center justify-around flex-col gap-7 h-64">
          <button
            onClick={onClickGoogle}
            className="border border-light-nav-hover rounded-full w-80 py-3 font-bold flex-center shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-200 hover:border-none hover:translate-x-0.5"
          >
            <div className="inline mr-3">
              <Image src={Google} width={27} height={27} />
            </div>
            <p>Google로 2초만에 로그인하기</p>
          </button>
          <button
            onClick={onClickNaver}
            className="border border-light-nav-hover rounded-full w-80 py-3 mt-3 font-bold flex-center shadow-md hover:-translate-y-2 hover:shadow-lg transition duration-200 hover:border-none hover:translate-x-0.5"
          >
            <div className="inline mr-3">
              <Image src={Naver} width={30} height={30} />
            </div>
            <p>Naver로 2초만에 로그인하기</p>
          </button>
        </div>
        <div className="hidden md:block md:mr-20 md:absolute md:bottom-24 md:right-6 ">
          <Image src={login_background} width={600} height={200} />
        </div>
      </div>
    </section>
  );
};

export default Login;
