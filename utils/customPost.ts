import { MySession } from "../types/types";

export const customPost = async (url: string, body: any, session: MySession | null) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.accessToken}`,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return res;
};
