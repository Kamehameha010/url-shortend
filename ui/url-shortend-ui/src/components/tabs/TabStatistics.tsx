import dayjs from "dayjs";
import { BarChart } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { getShortendUrlStatsByCode } from "../../api/shortend-api";
import { Response, ShortendUrlStatsResponse } from "../../api/types";

export default function TabStatistics() {
  const [data, setData] = useState<ShortendUrlStatsResponse | undefined>();
  const shortCodeRef = useRef<HTMLInputElement | null>(null);
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const shortCode = shortCodeRef!.current!.value;

    const response = await getShortendUrlStatsByCode(shortCode);

    if ("short_code" in response) {
      const updateResponse = response as unknown as ShortendUrlStatsResponse;
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
            <div className="space-y-2 px-4 border border-gray-200 ">
              <div className="flex flex-col space-y-1.5 px-3 py-2 pb-2">
                <h3 className="inline-flex gap-2 items-center font-semibold text-xl">
                  <BarChart className="size-5" />
                  Overview
                </h3>
              </div>

              <dl className="grid grid-cols-2 gap-4  px-3 py-2">
                <div className="space-y-2 text-xs leading-none">
                  <dt className="font-semibold">Original URL</dt>
                  <dd className="wrap-break-word">{data.url}</dd>
                </div>
                <div className="space-y-2 text-xs leading-none">
                  <dt className="font-semibold">Total Clicks</dt>

                  <dd className="text-xl">{data.click_count}</dd>
                </div>
                <div className="space-y-2 text-xs leading-none">
                  <dt className="font-semibold">Created At</dt>
                  <dd>
                    {dayjs(data.created_at).format("DD-MM-YYYY HH:mm:ss")}
                  </dd>
                </div>
                <div className="space-y-2 text-xs leading-none">
                  <dt className="font-semibold">Updated At</dt>
                  <dd>
                    {data.updated_at > 0
                      ? dayjs(data.updated_at).format("DD-MM-YYYY HH:mm:ss")
                      : ""}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </div>
    </>
  );
}
