import axios from "axios";

export default function handler(req, res) {
  // const sid = req.query.sid;
  // const pid = req.query.pid;
  // res.setHeader("Set-Cookie", [
  //   "connect.sid=" + sid + ";" + "path=/;",
  //   "passportId=" + pid + ";" + "path=/;",
  // ]);
  const cookie = req.req ? req.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  res.redirect("/");
}
// res.setHeader("Set-Cookie", [
//   "connect.sid2=" + "s%3A" + encodeURIComponent(sid) + ";" + "path=/;",
// ]);
