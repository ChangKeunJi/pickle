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
const frontUrl = "http://3.36.254.124";

dotenv.config();
const app = express();
passportConfig();

db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

// if (process.env.NODE_ENV === "production") {
//   app.use(morgan("combined"));
//   app.use(hpp());
//   app.use(helmet());
//   app.use(
//     cors({
//       origin: frontUrl,
//       credentials: true,
//     })
//   );
// }
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//! ----------
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//! ----------
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    // proxy: process.env.NODE_ENV === "production",
    cookie: {
      maxAge: 315360000000, // 10년 : 1000 * 60 * 60 * 24 * 365 * 10
      // domain: process.env.NODE_ENV === "production" && frontUrl,
      // httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      httpOnly: false,
      secure: false,
    },
    store: new SequelizeStore({
      db: db.sequelize,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/login", loginRouter);
app.use("/directory", directoryRouter);

const mode = process.env.NODE_ENV === "development";

if (mode) {
  app.listen(3065, () => {
    console.log("실행 중");
  });
} else {
  app.listen(3065, () => {
    console.log("실행 중");
  });
}
//
// app.get("/", (req, res) => {
//   res.send("Hello API");
// });
