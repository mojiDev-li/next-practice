import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate('/'); // /api/revalidate 로 api 요청을 하게될 경우 / 이 경로의 페이지를 재생성하게됨
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidateion Failed");
    console.error(err)
  }
}