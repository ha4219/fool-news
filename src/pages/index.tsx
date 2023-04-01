import DragAndDropImage from '@/components/DragAndDropImage';
import { Data } from '@/types';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [link, setLink] = useState<string | null>(null);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
      image: { files: FileList };
    };

    const data = new FormData();
    data.append('title', target.title.value);
    data.append('content', target.content.value);
    data.append('image', target.image.files[0]);

    const raw = await fetch('/api/write', {
      method: 'POST',
      body: data,
    });
    const json: Data = await raw.json();
    json.id && setLink(json.id);
    return;
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto text-gray-900 dark:text-white py-10">
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium ">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="제목을 적어주세요"
              required
            />
          </div>
          {/* <DragAndDropImage /> */}
          <div className="mb-6 ">
            <label htmlFor="image" className="block mb-2 text-sm font-medium ">
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              multiple={false}
              name="image"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium "
            >
              Content
            </label>
            <textarea
              id="content"
              rows={4}
              name="content"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="내용을 적어주세요"
            />
          </div>
          <button
            type="submit"
            className="block w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {link && (
          <div className="mb-6 w-full">
            <a
              href={link}
              className="block w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              go link
            </a>
          </div>
        )}
      </main>
    </>
  );
}
