import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Image from "next/image";

import Logo from "../public/img/Logo.png";
import Google from "../public/img/google2.png";
import Kakao from "../public/img/kakao2.png";
import login_background from "../public/img/login_background.svg";
import wrapper from "../store/configureStore";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";

const Login = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me]);

  const onClickKakao = useCallback(() => {
    Router.replace(`http://localhost:3065/login/kakao`);
  }, []);

  const onClickGoogle = useCallback(() => {
    Router.replace(`http://localhost:3065/login/google`);
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
        <div className="h-48 flex items-center justify-around flex-col  h-64">
          <button
            onClick={onClickGoogle}
            className="button-width button-height border border-light-nav-hover border-radius w-80 py-2 flex-center shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-200"
          >
            <div className="inline mr-3 flex-center">
              <Image src={Google} width={20} height={20} />
            </div>
            <p>Google 로그인</p>
          </button>
          <button
            onClick={onClickKakao}
            className="z-10 button-height shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-200 hover:border-none"
          >
            <Image src={Kakao} />
          </button>
        </div>
        <div className="hidden md:block md:mr-20 md:absolute md:bottom-24 md:right-6 ">
          <Image src={login_background} width={600} height={200} />
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (req, res, next) => {
    const cookie = req.req ? req.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (req.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();

    const { user } = store.getState();

    if (user.me) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  },
);

export default Login;
