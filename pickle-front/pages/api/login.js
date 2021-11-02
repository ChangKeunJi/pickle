export default function handler(req, res) {
  const sid = req.query.sid;
  // const sid = req.headers.cookie.slice(12);
  res.setHeader("Set-Cookie", ["passportId=" + sid + ";" + "path=/;"]);
  // res.setHeader("Set-Cookie", ["connect.sid=" + sid + ";" + "path=/;"]);
  // res.setHeader("Set-Cookie", [
  //   "connect.sid=" + "s%3A" + encodeURIComponent(sid) + ";" + "path=/;",
  // ]);
  res.redirect("/");
}
