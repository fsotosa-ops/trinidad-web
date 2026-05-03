const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

interface FetchOpts {
  preview?: boolean;
  silent?: boolean;
}

export async function contentfulFetch(query: string, opts: FetchOpts = {}) {
  const { preview = false, silent = false } = opts;

  const res = await fetch(CONTENTFUL_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    if (!silent) {
      console.error("❌ Contentful Status:", res.status);
      console.error("❌ Contentful Error:", errorText);
    }
    throw new Error(`Error de Contentful: ${res.status} - ${errorText}`);
  }

  return res.json();
}
