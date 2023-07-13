import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import CurrentUserContext from "../context/user";
export default function CreatePoll() {
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState([""]);
  const { user } = useContext(CurrentUserContext);
  const [success, setSuccess] = useState({});

  const addAnswer = () => {
    setChoices([...choices, ""]);
  };

  const removeChoice = (index) => {
    const newChoices = choices.filter((choice, choiceIndex) => {
      return choiceIndex !== index;
    });
    setChoices(newChoices);
  };

  const onChoiceChange = (index, value) => {
    const newChoices = choices.map((choice, choiceIndex) => {
      if (choiceIndex === index) {
        return value;
      }

      return choice;
    });
    setChoices(newChoices);
  };
  function validateForm(form) {
    if (!user) {
      toast.error("Please login to create a poll");
      return false;
    }
    if (form.title === undefined || title === "") {
      toast.error("Please enter a title for the poll");
      return false;
    }
    if (form.choices.length < 2) {
      toast.error("Please enter at least two choices for the poll");
      return false;
    }
    // if (form.choices.length > 2) {
    //   form.choices.forEach((choice, index) => {
    //     console.log(choice);
    //     if (choice.length < 2) {
    //       toast.error(`Please enter choice #${index + 1}`);
    //       return false;
    //     }
    //   });
    // }
    return true;
  }
  const createPoll = async () => {
    console.log("createPoll");

    const validate = validateForm({
      title: title,
      choices: choices,
    });
    if (validate) {
      const optionsData = choices.map((choice, index) => {
        const tag = "option: " + (index + 1);
        return [tag, choice];
      });
      try {
        const response = await fetch(`http://localhost:8000/create-poll`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            options: optionsData,
            user: user,
          }),
        });

        const data = await response.json();
        if (data.status === "success") {
          toast.success("Poll created successfully");
          setSuccess(data);
          window.location.href = `/polls/${data.pollId}`;
        } else {
          toast.error("Poll not created");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto   shadow p-5 min-h-[700px] my-10  rounded-md bg-slate-50">
      <div className="w-full  mx-auto  border bg-sky-50 rounded-md">
        <header className="border-b border-gray-400 px-4 py-5 text-sky-900 text-left font-bold text-3xl">
          Create poll
        </header>

        {success.pollId ? (
          <div className="py-5 px-8">
            <div className="w-full mb-2 bg-lime-50 text-green-800 border border-green-500 rounded py-3 px-2">
              Voting Poll created successfully.{" "}
              <Link to={`/polls/${success.pollId}`}>
                {process.env.REACT_APP_APP_URL}/polls/{success.pollId}
              </Link>
            </div>
          </div>
        ) : null}

        {!success.pollId ? (
          <div className="py-5 px-8 flex flex-col justify-left text-blue-900">
            <div className="mb-6 flex flex-col">
              <label
                htmlFor="title"
                className="text-xl mb-2 inline-block text-left"
              >
                What would you like to name the poll?
              </label>
              <textarea
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                name="title"
                id="title"
                type="text"
                wrap="soft"
                className="w-full py-2 border border-gray-400 rounded px-4"
              />
            </div>

            <div className="mb-3  flex flex-col">
              <div className="flex flex-row justify-between w-full items-center my-3">
                <label className="  mb-2 inline-block text-left text-xl">
                  Options:
                </label>
                <button
                  onClick={addAnswer}
                  className="bg-lime-500 rounded-md  flex flex-row items-center gap-2 font-bold px-2 text-white   py-1 border  text-sm hover:bg-lime-700 transition duration-150 ease-in-out"
                >
                  {" "}
                  Add
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {choices.map((choice, index) => (
                <div key={index} className="w-full flex items-center mb-2">
                  <input
                    onChange={(event) =>
                      onChoiceChange(index, event.target.value)
                    }
                    key={index}
                    type="text"
                    value={choice}
                    className="w-full py-2 border border-gray-400 rounded px-4"
                  />
                  <button
                    onClick={() => removeChoice(index)}
                    className="py-2 ml-2 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-between">
              <div className="mt-2 mb-4 text-center">
                <button
                  onClick={createPoll}
                  className="bg-blue-500 rounded-md font-bold text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Create Poll
                </button>
              </div>
              <div className="mt-2 mb-4 text-center">
                {" "}
                <small className="text-gray-500 text-xs capitalize px-4">
                  please note that once published, you cannot edit the poll
                </small>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
