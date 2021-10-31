export default function handler(req, res) {
  console.log(req.signedCookies);
  console.log(req.cookies);
  res.redirect("/");
}
