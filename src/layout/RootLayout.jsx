import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import CurrentUserContext from "../context/user";
function RootLayout() {
  const [user, setUser] = useState();
  console.log(user);
  useEffect(() => {
    try {
      const getuser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const response = await data.json();
          console.log(response);
          if (response.status === "success") {
            setUser(response.user);
          } else {
            setUser(null);
            //toast.error(response.message);
          }
        }
      };
      getuser();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <CurrentUserContext.Provider value={{ user: user, setUser: setUser }}>
      <>
        <main className=" bg-sky-50  pb-10">
          <div className="App pt-10 container max-w-6xl   min-h-screen mx-auto px-2 sm:px-20  ">
            <div>
              <nav className="border px-4 py-2 flex flex-row justify-between items-center rounded-md bg-slate-50">
                <div>
                  {" "}
                  <ul className="flex justify-center">
                    <li className="mr-6">
                      <a className="text-blue-500 hover:text-blue-800" href="/">
                        Home
                      </a>
                    </li>
                    <li className="mr-6">
                      <a
                        className="text-blue-500 hover:text-blue-800"
                        href="/polls"
                      >
                        Polls
                      </a>
                    </li>
                    <li className="mr-6">
                      <a
                        className="text-blue-500 hover:text-blue-800"
                        href="/create-poll"
                      >
                        Create
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className=" flex justify-center flex-row gap-2">
                    {!user ? (
                      <>
                        {" "}
                        <li className="mr-6">
                          <a
                            className="text-blue-500 hover:text-blue-800"
                            href="/login"
                          >
                            Login
                          </a>
                        </li>
                        <li className="mr-6">
                          <a
                            className="text-blue-500 hover:text-blue-800"
                            href="/register"
                          >
                            Register
                          </a>
                        </li>
                      </>
                    ) : (
                      <>
                        {" "}
                        <li className="mr-6">
                          <button
                            className="text-blue-500 hover:text-blue-800"
                            onClick={() => {
                              localStorage.removeItem("token");
                              setUser(null);
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
            <Toaster />
            <Outlet />

            <footer className="text-center text-gray-500 text-xs">
              <p>&copy; 2023</p>
              <p>Made by: {"Leaveitblank"}</p>
            </footer>
          </div>
        </main>
      </>
    </CurrentUserContext.Provider>
  );
}

export default RootLayout;
