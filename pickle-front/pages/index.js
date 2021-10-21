import axios from "axios";
import { END } from "redux-saga";
import Router from "next/router";

import Nav from "../components/layout/Nav";
import DirectoryBar from "../components/layout/DirectoryBar";
import CardSection from "../components/layout/CardSection";
import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_DIR_REQUEST } from "../reducers/directory";

const Home = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.replace("/login");
    }
  }, [me]);

  return (
    <div className="text-light-font">
      <Nav />
      <div className="w-screen flex">
        <div className="hidden overflow-y-hidden md:block md:w-72 ">
          <DirectoryBar />
        </div>
        <div className="w-full">
          <CardSection />
        </div>
      </div>
    </div>
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

    store.dispatch({
      type: LOAD_MY_DIR_REQUEST,
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();

    const { user } = store.getState();
    if (!user.me) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  },
);

export default Home;
