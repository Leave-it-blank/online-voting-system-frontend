import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await fetch("http://localhost:8000/polls");
      const { polls } = await response.json();
      setPolls(polls);
      console.log(polls);
      console.log(polls);
    };
    fetchPolls(); // call the function
  }, [setPolls]);
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
                  ? "flex shadow my-2 bg-slate-50 "
                  : "flex shadow my-2 bg-sky-50 "
              }
            >
              <div className="w-full px-4 py-4  flex justify-between capitalize items-center gap-3 flex-wrap">
                <div className="w-10/12   px-2">
                  <div className=" text-justify w-full">{poll.pollTitle}</div>

                  <div className="text-gray-400 mx-2 text-end w-full">
                    <small>
                      {"by: "}
                      {poll.pollCreator}
                    </small>
                  </div>
                </div>
                <div className=" flex  border-l pl-3 h-full items-center justify-center">
                  <Link
                    className="cursor-pointer text-blue-500 border rounded-md px-3 py-2 hover:bg-sky-500 hover:text-white  "
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
  const response = await fetch("http://localhost:8000/polls");
  const { polls } = await response.json();
  return polls;
}
