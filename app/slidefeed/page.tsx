import { getPosts } from "../_services/notion";
import Link from "next/link";

export default async function SlideFeed() {
  const posts = await getPosts();

  return (
    <>
      <div className=" m-auto w-full grid p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
        <h1 className="text-white text-4xl mb-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
          Notion Slides Feed
        </h1>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full justify-self-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]"
          href="/"
        >
          Home
        </Link>
        <div className=" m-auto w-full max-w-xl">
          <ul className="">
            {posts.map((post) => (
              <Link href={`/slidefeed/${post.slug}`}>
                <li
                  key={post.id}
                  className=" mt-6 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 rounded-xl grid gap-2 p-10 dark:hover:bg-slate-900"
                >
                  <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title.toUpperCase()}</h1>

                  <div className=" justify-self-start bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 text-transparent rounded-lg">
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 justify-self-start text-transparent bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] bg-clip-text">
                      {"#" + post.tags}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">
                      {new Intl.DateTimeFormat("pt-BR").format(new Date(post.createdAt))}
                    </span>
                    <span
                      // href={`/`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 "
                    >
                      {"/" + post.slug}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
