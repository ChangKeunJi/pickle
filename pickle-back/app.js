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

const frontUrl = "http://3.38.99.75";

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
    origin: ["http://localhost:3000", frontUrl, "pickle-pickle.kr"],
    credentials: true,
  })
);

//! ----------
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//! ----------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === "production",
    cookie: {
      maxAge: new Date(Number(new Date()) + 315360000000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" && frontUrl,
    },
    store: new SequelizeStore({
      db: db.sequelize,
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

app.listen(80, () => {
  console.log("실행 중");
});
