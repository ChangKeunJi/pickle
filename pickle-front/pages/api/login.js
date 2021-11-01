import Cookies from "js-cookie";

export default function handler(req, res) {
  const data = req.cookies["passportId"];
  Cookies.set("passportId", data, { path: "/" });
  // res.setHeader("Set-Cookie", { sessionId: data }, { path: "/" });
  res.redirect("/");
  // res.json({
  //   "req.cookies": req.cookies,
  // });
}
