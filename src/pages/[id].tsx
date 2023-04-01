import Head from 'next/head';
import Image from 'next/image';

export default function FakeNewsPage({ data }: { data: Data }) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container mx-auto text-gray-900 dark:text-white py-10">
        <Image
          width={0}
          height={0}
          src={data.image ? `/${data.image}` : '/default.png'}
          className="hidden"
          alt="main-image"
        />
        <div className="text-9xl">{data.content}</div>
      </main>
    </>
  );
}

import fs from 'fs';
import { Data } from '@/types';

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;
  const raw = fs.readFileSync(`data/${id}.json`);
  const data: Data = JSON.parse(raw.toString());

  return {
    props: { data: data }, // will be passed to the page component as props
  };
}
