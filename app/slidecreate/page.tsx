import puppeteer from "puppeteer";
import { getPosts } from "@/app/_services/notion";
import Link from "next/link";

export default async function SlideElement({ params }: { params: { slug: string } }) {
  const posts = await getPosts();

  const slide = posts.filter((post) => {
    if (post.slug == params.slug) {
      return post.url;
    }
  });

  const slideGenerator = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Navegar para o site desejado
      await page.goto("https://snackthis.co/presentations/", { timeout: 12000 });

      // Localize o elemento de entrada de URL e cole a URL desejada
      await page.type('input[name="url"]', `${slide[0].url}`, { delay: 20 });

      // Pode ser necessário clicar em um botão "Enviar" ou realizar alguma ação adicional, dependendo do site
      await page.click("button");

      await page.waitForNavigation();

      await page.click("li");

      // Aguarde alguns segundos para que a página carregue completamente
      const iframeUrl = await page.$eval('input[type="text"]', (inputElement) => {
        return inputElement.value;
      });

      // Retornando o iframe com a URL desejada
      return (
        <>
          <div className=" grid justify-center ">
            <iframe
              className=" m-auto mt-10 rounded-lg shadow-md mb-4 hover:underline"
              src={iframeUrl}
              width={540}
              height={320}
            ></iframe>
            <div className=" grid m-auto justify-items-center">
              <Link href={iframeUrl} className=" mb-4 text-center text-black hover:underline ">
                {iframeUrl}
              </Link>
              <span className=" inline-block break-all text-center text-black ">{`<iframe src=${iframeUrl} width="640" height="360"/>`}</span>
            </div>
          </div>
        </>
      );
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    } finally {
      await browser.close();
    }
  };

  await slideGenerator();

  return <>{slideGenerator()}</>;
}
