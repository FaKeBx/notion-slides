import { getPost } from "@/app/_services/notion";
import SlideElement from "@/app/slidecreate/page";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default async function Slide({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  function slideShow() {
    return <SlideElement params={params} />;
  }

  return (
    <div className="flex place-content-evenly w-full min-h-screen p-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <div className="  m-auto max-w-2xl p-6 rounded-3xl grid content-start bg-gradient-to-b from-gray-100 to-gray-300">
        <h1 className="text-black text-4xl mb-2 font-bold text-center text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
          Slide and Markdown
        </h1>

        <h1 className="text-xl mb-2 font-bold text-black flex justify-center">{post.title}</h1>

        <Link
          className=" text-white mb-10 font-bold py-2 px-4 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black justify-self-center"
          href="/slidefeed"
        >
          Voltar
        </Link>

        <div>
          <h2 className=" text-black font-semibold">Markdown:</h2>
          <ReactMarkdown
            className=" grid justify-self-start "
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl text-black mt-6 font-bold" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl text-black mt-8 font-medium" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl text-slate-300" {...props} />,
              p: ({ node, ...props }) => <p className="text-black grid" {...props} />,
              a: ({ node, ...props }) => <a className="text-blue-500 font-bold" {...props} />,
              img: ({ node, ...props }) => (
                <img className=" w-90 h-60 object-cover rounded-md grid justify-self-center" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
          <h2 className=" text-black font-semibold mt-6">Slide:</h2>
          {/* {<SlideElement params={params} />} */}
        </div>
      </div>
    </div>
  );
}
