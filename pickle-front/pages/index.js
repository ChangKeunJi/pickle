import axios from "axios";
import { END } from "redux-saga";
import Router from "next/router";

import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!me || !me.id) {
      Router.replace("/login");
    }
  }, [me]);

  return (
    <div>
      hello 안녕하세요.
      <p>Wow</p>
      <button onClick={onLogout} className="border">
        Log Out
      </button>
      <h2>{me.name}</h2>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (req, res, next) => {
    const cookie = req.req ? req.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (req.req && cookie) {
      axios.defaults.headers.Cookie = cookie;

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default Home;
