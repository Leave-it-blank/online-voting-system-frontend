import React, { useEffect, useState, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/Button";
import CurrentUserContext from "../context/user";
export default function ViewPoll() {
  const polldata = useLoaderData();
  const [poll, setPoll] = useState(polldata);
  const [voted, setVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [token, setToken] = useState(null);
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const fetchClientIpAddress = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  };

  const vote = async (choice) => {
    try {
      if (!user) return toast.error("Please login to vote");
      const ip = await fetchClientIpAddress();

      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/poll/${poll.pollId}/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            user_ip: ip,
            vote: choice[0],
            id: poll.pollId,
            user_id: user.userId,
          }),
        }
      );
      const response = await data.json();
      console.log(response);
      if (response.status === "success") {
        toast.success("Voted successfully");
      } else {
        toast.error(response.message);
      }

      setVoted(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/poll/${poll.pollId}/results`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        const { votes } = await response.json();
        console.log(votes);
        return votes;
      } catch (err) {
        console.log(err);
      }
    };
    if (voted) {
      fetchPoll().then((votes) => {
        setTotalVotes(votes);
      });
    }
  }, [poll.pollId, voted]);

  return (
    <div className="container mx-auto   shadow p-5 min-h-[700px] my-10  py-5 rounded-md bg-slate-50">
      {poll ? (
        <div>
          <div className="flex justify-between">
            <small className="text-red-500 capitalize px-5 py-2">
              {poll.active ? "Active" : "This poll is closed "}{" "}
            </small>
            {user && (
              <>
                {polldata.createdBy === user.id && (
                  <div className="flex gap-2">
                    {poll.active && (
                      <Button
                        onClick={() => {
                          fetch(
                            `${process.env.REACT_APP_API_URL}/poll/${poll.pollId}/mark-inactive`,
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

                    <Link
                      className="text-red-500 border px-3 py-2 rounded-md hover:bg-red-500 hover:text-white"
                      to={`/polls/${poll.pollId}/results`}
                    >
                      View results
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          <header className="px-5 py-4 flex justify-between items-center border-b flex-wrap">
            <div className="font-bold capitalize flex items-center gap-3 w-full">
              <span className="text-3xl font-extralight "> Q:</span>{" "}
              <div className="text-justify font-normal  overflow-scroll w-full">
                {poll.pollTitle}
              </div>
            </div>
            <div className="text-gray-500 text-xs w-full text-end truncate">
              by: {polldata.pollCreator}
            </div>
            {voted && <span>Total Votes: {totalVotes} </span>}
          </header>
          <div className="bg-sky-50   shadow rounded-md flex gap-2 flex-col mb-2">
            {poll.pollOptions.map((choice, index) => {
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
                    className="px-5 py-4  w-full   flex justify-between items-center "
                    key={index}
                  >
                    <div className="w-full px-4 py-4  flex justify-between capitalize items-center gap-3 flex-wrap flex-row">
                      <div className="text-justify w-10/12  ">
                        <span className="text-lime-900 mr-2">
                          {choice[0]} {":"}
                        </span>
                        {choice[1]}
                      </div>
                      <div className=" flex  border-l pl-3 h-full items-center justify-center">
                        <Button onClick={() => vote(choice)}>Vote</Button>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export async function loader(params) {
  console.log("poll id: ");
  console.log(params);
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/poll/` + params.id
  );
  const { poll } = await response.json();

  return poll;
}
