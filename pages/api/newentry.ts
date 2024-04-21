import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { customPost } from "../../utils/customPost";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { text } = req.body;

  if (text === undefined) {
    return res.status(400).json({ error: "Missing entry" });
  }

  const task = await customPost(
    "http://34.0.241.227:5001/entries",
    {
      "entry": text
    },
    session
  );

  res.status(200).json(task);
}
