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
        <div className="text-9xl">{data.content}</div>
        <img
          src={data.image ? `${data.image}` : '/default.png'}
          className="opacity-0"
          alt="main-image"
        />
      </main>
    </>
  );
}

import { Data } from '@/types';

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query;
  const raw = await fetch(`${process.env.AWS_S3_URL}/data/${id}.json`);
  const data: Data = await raw.json();

  return {
    props: { data: data }, // will be passed to the page component as props
  };
}
