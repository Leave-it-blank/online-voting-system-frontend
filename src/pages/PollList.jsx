import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
export default function PollList() {
  const [polls, setPolls] = useState([]);
  const data = useLoaderData();
  useEffect(() => {
    setPolls(data);
  }, [data]);
  return (
    <>
      <div className="container mx-auto   shadow p-5 min-h-[700px] my-10  py-5 rounded-md bg-slate-50">
        <div className="self-start px-2 my-3  text-2xl font-bold ">
          List of polls
        </div>
        <div className="border-b border-gray-400 w-full mb-3 "></div>
        <div className="rounded-md border flex flex-col">
          {polls.map((poll, index) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "flex shadow my-2 bg-slate-50 h-full "
                  : "flex shadow my-2 bg-sky-50 "
              }
            >
              <div className="w-full px-4 py-4  grid grid-cols-9 justify-between capitalize items-center gap-3  h-auto">
                <div className=" col-span-6 xl:col-span-7 w-full max-w-2xl px-2">
                  <div className=" text-justify w-full  overflow-scroll">
                    {poll.pollTitle}
                  </div>

                  <div className="text-gray-400 mx-2 text-end w-full truncate">
                    <small>
                      {"by: "}
                      {poll.pollCreator}
                    </small>
                  </div>
                </div>
                <div className=" md:col-start-8 col-span-3 xl:col-span-2 flex-nowrap flex  border-l pl-3 h-full items-center justify-center">
                  <Link
                    className="cursor-pointer text-blue-500 border rounded-md px-3 py-2 hover:bg-sky-500 hover:text-white  whitespace-nowrap  "
                    to={`/polls/${poll.pollId}`}
                  >
                    View poll
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function loader() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/polls`);
    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong while fetching the data");
    }
    const { polls } = await response.json();
    return polls;
  } catch (err) {
    console.log(err);
    return [];
  }
}
