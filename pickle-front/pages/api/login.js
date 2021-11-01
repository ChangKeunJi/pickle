import Cookies from "js-cookie";

export default function handler(req, res) {
  const sid = req.query.sessionId;
  Cookies.set("connect.sid", sid, { httpOnly: true });
  res.redirect("/");
}
