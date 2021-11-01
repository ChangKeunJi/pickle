import Cookies from "js-cookie";

export default function handler(req, res) {
  const sid = req.query.sid;
  res.setHeader("Set-Cookie", ["connect.sid=" + sid], {
    path: "/",
  });
  res.redirect("/");
}
