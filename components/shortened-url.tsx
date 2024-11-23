import { URLProps } from "@/types";

export default function ShortenedURL({ url }: { url: URLProps }) {
  const shortenedURL = `${window.location.origin}/${url.alias}`;

  return (
    <div className="p-4 m-2 bg-sky-100 flex flex-col items-center">
      <p className="text-lg font-semibold">Shortened URL:</p>
      <a href={shortenedURL} className="text-blue-500 underline">
        {shortenedURL}
      </a>
    </div>
  );
}
