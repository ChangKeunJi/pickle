const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");

const postRouter = require("./routes/post");
const loginRouter = require("./routes/login");
const directoryRouter = require("./routes/directory");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
passportConfig();

db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["http://localhost:3000", "http://3.38.99.75", "pickle-pickle.kr"],
    credentials: true,
  })
);

//! ----------
// Session 을 DB 에 저장하여 자동로그인 기능 구현
const Sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//! ----------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: new Date(Number(new Date()) + 315360000000),
      secure: false,
      httpOnly: false,
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.use("/post", postRouter);
app.use("/login", loginRouter);
app.use("/directory", directoryRouter);

app.listen(3065, () => {
  console.log("실행 중");
});
