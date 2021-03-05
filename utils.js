export default async function fetcher(endpoint, token) {
  const r = await fetch(endpoint, {
    headers: {
      Authorization: token,
    },
  });
  return r.ok ? r.json() : null;
}
