"use server";

import { Client } from "@notionhq/client";
import { NotionDatabaseResponse } from "../_types/notion";
import { NotionToMarkdown } from "notion-to-md";
import { useSearchParams } from "next/navigation";

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const redirectUri = process.env.OAUTH_REDIRECT_URI;

const testeapi = "secret_avGzT1bIYdCYIbnVKb2dYrVHNqNp9jctUAQ6wu6vBz6";

export default async function token() {
  // Obtém a URL atual
  const currentUrl = window.location.href;

  // Cria um objeto URLSearchParams para analisar os parâmetros da consulta da URL
  const searchParams = new URLSearchParams(currentUrl);

  // Obtém o valor do parâmetro "code"
  const code = searchParams.get("code");

  // Agora você tem o valor de "code" disponível para uso
  console.log("Código de Autorização Temporário:", code);

  // Certifique-se de realizar as ações necessárias com o valor de "code"

  // Encode in base64
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(
    "https://api.notion.com/v1/oauth/authorize?client_id=2f76da2e-2bcc-4e31-afcf-2967b3dfe5c7&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fnotion-slides.vercel.app%2Fslidefeed",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    const accessToken = data.access_token;

    // Agora, você tem o token de acesso, que pode ser usado para fazer solicitações à API do Notion.
    // Certifique-se de armazenar o token de acesso de forma segura e utilizá-lo em solicitações posteriores.

    console.log("Token de Acesso:", accessToken);

    return accessToken;
  }

  return console.log(response.json());
}

const notion = new Client({ auth: testeapi });
const DATABASE_ID = "c774dab31c35461ca0bc77c21162162e";

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
  });

  const typedResponse = response as unknown as NotionDatabaseResponse;

  return typedResponse.results.map((post) => {
    return {
      id: post.id,
      title: post.properties.title.title[0].plain_text,
      slug: post.properties.slug.rich_text[0].plain_text,
      tags: post.properties.tags.multi_select.map((tag) => tag.name),
      createdAt: post.created_time,
      url: post.url,
    };
  });
}

export async function getPost(slug: string) {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      or: [
        {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
  });

  const pageId = response.results[0].id;

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);

  const typedResponse = response as unknown as NotionDatabaseResponse;

  return {
    title: typedResponse.results[0].properties.title.title[0].plain_text,
    content: mdString.parent,
  };
}
