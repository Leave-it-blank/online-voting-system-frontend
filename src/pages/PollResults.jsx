import { useLoaderData } from "react-router-dom";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Button from "../components/Button";
import CurrentUserContext from "../context/user";
import { Chart as ChartJS, registerables } from "chart.js/auto";
export default function PollResult() {
  const pollData = useLoaderData();
  const { user } = useContext(CurrentUserContext);
  const options = pollData.poll.pollOptions.map((item) => {
    return item[0];
  });
  console.log(options);
  const counts = pollData.votes.map(([option, count]) => count);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [user]);

  ChartJS.register(...registerables);

  // Create the chart data object
  const chartData = {
    labels: options,
    datasets: [
      {
        label: "Vote Count",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  console.log(pollData);
  return (
    <>
      {" "}
      <div className="container mx-auto   shadow p-5 min-h-[700px] my-10  py-5 rounded-md bg-slate-50 flex flex-col gap-2">
        <div className="flex justify-between">
          <small className="text-red-500 capitalize px-5 py-2">
            {pollData.poll.active ? "Active" : "This poll is closed "}{" "}
          </small>
          {user && (
            <>
              {pollData.poll.createdBy === user.id && (
                <div className="flex gap-2">
                  {pollData.poll.active && (
                    <Button
                      onClick={() => {
                        fetch(
                          `http://localhost:8000/poll/${pollData.poll.pollId}/mark-inactive`,
                          {
                            method: "GET",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        window.setTimeout(() => {
                          window.location.reload();
                        }, 1000);
                      }}
                    >
                      close poll
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <header className="px-5 py-4 flex justify-between items-center border-b flex-wrap">
          <div className="font-bold capitalize flex items-center gap-3">
            <span className="text-3xl font-extralight "> Q:</span>{" "}
            <div className="text-justify font-normal">
              {pollData.poll.pollTitle}
            </div>
          </div>
          <div className="text-gray-500 text-xs w-full text-end">
            by: {pollData.poll.pollCreator}
          </div>
        </header>
        <div className=" ">
          <h2 className="my-3 mx-4 text-2xl">Results :</h2>

          <div className="bg-sky-50   shadow rounded-md flex gap-2 flex-col mb-2">
            {pollData.votes.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    index % 2 === 0
                      ? "flex  bg-slate-50 border-b "
                      : "flex    bg-sky-50 border-b "
                  }
                >
                  <div
                    className="px-5 py-4    flex justify-between items-center   w-full"
                    key={index}
                  >
                    <div className="w-full px-4 py-4  flex justify-between capitalize items-center gap-3 flex-wrap">
                      <div className="text-justify w-10/12  ">
                        <span className="text-lime-900 mr-2">{item[0]}</span>
                        {pollData.poll.pollOptions[index][1]}
                      </div>

                      <div className=" flex  border-l pl-3 h-full items-center justify-center text-green-800">
                        <span>{item[1]} Votes</span>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-2  shadow-sm bg-sky-50 w-full py-5 rounded-xl mt-5">
          <h2>Chart :</h2>
          <div>
            {pollData && (
              <>
                <Bar data={chartData} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader(params) {
  const token = localStorage.getItem("token");
  //console.log(token);
  try {
    const response = await fetch(
      "http://localhost:8000/poll/" + params.id + "/final_results",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === "error") {
      return { poll: null };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
