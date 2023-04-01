// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { Data } from '@/types';

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveImageFile = async (file: any) => {
  const data = fs.readFileSync(file.filepath);
  const f = `./public/${file.originalFilename}`;
  fs.writeFileSync(f, data);
  fs.unlinkSync(file.filepath);
  return file.originalFilename;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }
  const id = Math.random().toString(36).substr(2, 16);
  const f = `data/${id}.json`;
  const form = new formidable.IncomingForm();
  const data = (await new Promise((resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      if (files) {
        const imgPath = await saveImageFile(files.image);
        resolve({ ...fields, image: imgPath } as Data);
      }
      resolve({ ...fields, image: null } as Data);
    });
  })) as Data;
  data.id = id;
  fs.writeFileSync(f, JSON.stringify(data));

  return res.status(200).json(data);
}
