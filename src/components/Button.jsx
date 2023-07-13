import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className=" text-blue-500 rounded-md px-3 py-2 border border-sky-600 active:border-sky-700 hover:text-white text-sm hover:bg-sky-500 transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
}
