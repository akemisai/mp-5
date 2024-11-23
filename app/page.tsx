"use client";

import { useState } from "react";
import createNewShortenedUrl from "@/lib/createNewShortner";
import ShortenedURL from "@/components/shortened-url";
import { URLProps } from "@/types";

export default function Home() {
  const [alias, setAlias] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<URLProps | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the URL format
      if (!/^(https?:\/\/)/.test(url)) {
        setError("Invalid URL format. Must start with http:// or https://");
        return;
      }

      const newUrl = await createNewShortenedUrl(alias, url);
      setShortenedUrl(newUrl);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="p-2 border border-gray-300"
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border border-gray-300"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">
          Shorten URL
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {shortenedUrl && <ShortenedURL url={shortenedUrl} />}
    </div>
  );
}
