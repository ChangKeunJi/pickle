import { Cookies } from "react-cookie";

export default function handler(req, res) {
  const sid = req.query.sid;
  // res.setHeader("Set-Cookie", ["connect.sid=" + sid], {
  //   path: "/",
  // });
  Cookies.set("connect.sid", sid, { path: "/" });
  res.redirect("/");
}
