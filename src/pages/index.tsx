import DragAndDropImage from '@/components/DragAndDropImage';
import { Data } from '@/types';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [link, setLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
    setIsLoading(false);
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
            disabled={isLoading}
            className="block w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
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
