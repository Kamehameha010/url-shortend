import { FormEvent, useRef, useState } from "react";
import { ShortendUrlResponse, Response } from "../../api/types";
import { getShortendUrlByCode } from "../../api/shortend-api";
import { ExternalLink } from "lucide-react";
import dayjs from "dayjs";

export default function TabLookup() {
  const [data, setData] = useState<ShortendUrlResponse | undefined>({
    created_at: 0,
    description: "",
    name: "",
    updated_at: 0,
    url: "",
  });
  const shortCodeRef = useRef<HTMLInputElement | null>(null);
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const shortCode = shortCodeRef!.current!.value;

    const response = await getShortendUrlByCode(shortCode);

    if ("short_code" in response) {
      const updateResponse = response as ShortendUrlResponse;
      setData({
        ...updateResponse,
        ["created_at"]: dayjs(updateResponse.created_at).format(
          "DD-MM-YYYY HH:mm:ss"
        ),
      });
      return;
    }
    const { message } = response as unknown as Response;
    alert(message);
  };
  return (
    <>
      <div className="space-y-4">
        <form className="space-y-2.5" onSubmit={handleOnSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold leading-none"
              htmlFor="code"
            >
              Enter Shortcode
            </label>
            <div className="flex gap-2 mt-1.5">
              <input
                id="shortCode"
                name="shortCode"
                ref={shortCodeRef}
                type="text"
                className=" inline-flex w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
                placeholder="abc123"
                required
              />
              <input
                className="inline-flex bg-black text-white h-8 rounded-sm px-2"
                type="submit"
                value="Lookup"
              />
            </div>
            <p className="text-xs">
              Enter the shortcode part of the URL (e.g., "abc123" from
              "https://short.url/abc123")
            </p>
          </div>
        </form>

        {data && (
          <>
            <div className="space-y-3 p-4 border border-gray-200 ">
              <div className="space-y-2">
                <label className="text-xs font-semibold leading-none">
                  Name
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    id="shortendURL"
                    name="shortendURL"
                    type="text"
                    className="flex-1  w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
                    value={data.name}
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold leading-none">
                  Description
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    id="shortendURL"
                    name="shortendURL"
                    type="text"
                    className="flex-1  w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
                    value={data.description}
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold leading-none">
                  Long URL
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    id="shortendURL"
                    name="shortendURL"
                    type="text"
                    className="flex-1  w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
                    value={data.url}
                    readOnly
                  />

                  <a
                    className="flex justify-center items-center size-8 outline outline-gray-300 hover:bg-gray-100"
                    href={data.url}
                    target="_blank"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold leading-none">
                  Created At
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    id="shortendURL"
                    name="shortendURL"
                    type="text"
                    className="flex-1  w-full h-8 rounded-md py-2 px-2 placeholder:text-gray-400 focus:outline-1 border-1 border-black sm:text-sm/6"
                    value={data.created_at}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
