import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

const handler = async (req, res) => {
  const router = useRouter();
  const session = await getSession({ req });
  if (session) {
    res.send(session);
  }
};

export default handler;
