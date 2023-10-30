"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className=" min-h-screen grid justify-center content-center gap-1 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
        <div className="grid max-w-3xl">
          <Image className=" justify-self-center mb-6 self-center" src="/logons.svg" alt="" width={120} height={120} />
          <h1 className=" text-4xl text-center font-bold mb-2 text-white ">Notion Slides</h1>
          <p className=" text-xl text-center mb-12 text-white ">
            Com o Notion Slides você só escreve uma vez. Ele automaticamente gera um Markdown e cria um Slide com o seu
            documento{" "}
          </p>
          <Link
            className=" mb-6 px-3 py-2 text-sm font-medium text-center justify-self-center text-gray-900 rounded-lg bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 hover:border-black"
            href="/slidefeed"
          >
            Slide Feed
          </Link>
          <Link
            className=" mb-12 px-3 py-2 text-sm font-medium text-center justify-self-center text-gray-900 rounded-lg bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 hover:border-black"
            href={
              "https://api.notion.com/v1/oauth/authorize?client_id=2f76da2e-2bcc-4e31-afcf-2967b3dfe5c7&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fnotion-slides.vercel.app%2Fslidefeed"
            }
          >
            Autorizar
          </Link>

          <div className="grid grid-flow-row grid-cols-2 gap-10 place-content-around content-center max-w-md m-auto">
            <div className="">
              <Image
                className=" object-bottom object-cover rounded-full w-32 h-32 mb-3"
                src="/eu.jpg"
                alt=""
                width={120}
                height={120}
              />
              <span className=" text-center ">Felipe Kucharski</span>
            </div>
            <div className="grid">
              <Image
                className=" object-cover rounded-full w-32 h-32 mb-3"
                src="/alipio.jpg"
                alt=""
                width={120}
                height={120}
              />
              <span className=" text-center ">Alipio Neto</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
