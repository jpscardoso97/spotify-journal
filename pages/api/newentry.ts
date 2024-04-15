import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { customGet } from "../../utils/customGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const taskStatus = await customGet(
    "https://localhost:5001/entries",
    session
  );

  res.status(200).json(taskStatus);
}
