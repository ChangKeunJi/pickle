import { getSession } from "next-auth/client";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.send(session);
  }
};

export default handler;
