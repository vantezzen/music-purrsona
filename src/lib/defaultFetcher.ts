export default function defaultFetcher(url: string, options?: RequestInit) {
  return fetch(url, options).then((res) => res.json());
}
