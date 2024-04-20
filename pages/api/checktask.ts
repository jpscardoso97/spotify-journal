import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { customGet } from "../../utils/customGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { task_id } = req.query;

  if (task_id === undefined) {
    return res.status(400).json({ error: "Missing task id" });
  }

  const taskStatus = await customGet(
    `http://localhost:5001/status/${task_id}`,
    session
  );

  res.status(200).json(taskStatus);
}
