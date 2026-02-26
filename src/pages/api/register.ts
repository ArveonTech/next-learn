// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: number;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const response: any = await signUp(req.body);
    console.info(response);
    if (response.status !== 200) {
      return res.status(response.status).json(response);
    }
    res.status(200).json(response);
  } else {
    res.status(405).json({ status: 405, message: "Method not allowed" });
  }
}
