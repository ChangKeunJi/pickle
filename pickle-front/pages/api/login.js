export default function handler(req, res) {
  const sid = req.query.sid;
  const pid = req.query.pid;
  res.setHeader("Set-Cookie", [
    "connect.sid=" + sid + ";" + "path=/;",
    "passportId=" + pid + ";" + "path=/;",
  ]);
  res.redirect("/");
}
// res.setHeader("Set-Cookie", [
//   "connect.sid2=" + "s%3A" + encodeURIComponent(sid) + ";" + "path=/;",
// ]);
