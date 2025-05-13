import { FormEvent, useState } from "react";
import { ShortendUrlRequest } from "../../api/types";
import { createShortend } from "../../api/shortend-api";
import { Copy, ExternalLink } from "lucide-react";

export default function TabShortendUrl() {
  const [shortendUrl, setShortendUrl] = useState<string | undefined>();

  const handleCopyToClipboard = (): void => {
    if (window.navigator.clipboard) {
      navigator.clipboard.writeText(shortendUrl!);
      alert("Link copied!");
      return;
    }
  };
  const handleOnSubmit = async (e: FormEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as ShortendUrlRequest;

    const { status, url, message } = await createShortend(data);

    if (status != 201) {
      alert(message);
      return;
    }
    setShortendUrl(url);
  };

  return (
    <>
      <div className="space-y-6">
        <form className="space-y-2.5" onSubmit={handleOnSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold leading-none" htmlFor="url">
              Long URL
            </label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              required
              className="flex mt-1.5 w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold leading-none"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Website name"
              className="flex mt-1.5 w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
            />
            <p className="text-xs text-gray-500">
              A friendly name to identify this link
            </p>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold leading-none"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="flex mt-1.5 w-full h-15 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
              name="description"
              id="description"
              rows={5}
              placeholder="What this link is about .."
            ></textarea>
            <p className="text-xs text-gray-500">
              Optional details about this link
            </p>
          </div>
          <input
            className="text-center text-white font-normal bg-black/85 w-full h-8 rounded-sm"
            type="submit"
            value="Generate Shortend Url"
          />
        </form>

        {shortendUrl && (
          <div className="space-y-3 p-4 border border-gray-200 ">
            <label>Your shortend URL</label>
            <div className="flex gap-2">
              <input
                id="shortendURL"
                name="shortendURL"
                type="text"
                className="flex-1  w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
                value={shortendUrl}
                readOnly
              />
              <button
                className="flex justify-center items-center size-8 outline outline-gray-300 hover:bg-gray-100"
                title="Copy to clipboard"
                onClick={handleCopyToClipboard}
              >
                <Copy className="size-4" />
              </button>
              <a
                className="flex justify-center items-center size-8 outline outline-gray-300 hover:bg-gray-100"
                href={shortendUrl}
                target="_blank"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
