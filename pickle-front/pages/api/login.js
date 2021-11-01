export default function handler(req, res) {
  // const cookie = new Cookies();
  const sid = req.query.sid;
  res.setHeader("Set-Cookie", [
    "connect.sid=" + encodeURIComponent(sid) + ";" + "path=/;",
  ]);
  res.redirect("/");
}
