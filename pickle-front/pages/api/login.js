import Cookies from "js-cookie";

export default function handler(req, res) {
  const data = req.cookies["passportId"];
  Cookies.set("passportId", data, { path: "/" });
  res.redirect("/");
}
