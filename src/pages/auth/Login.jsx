import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../context/user";
import toast from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(CurrentUserContext);
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);
  const handleLogin = async () => {
    console.log("Login");
    try {
      const data = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const response = await data.json();
      if (response.status === "success") {
        toast.success("Login Successful");
        localStorage.setItem("token", response.token);
        localStorage.setItem("refresh_token", response.refresh);
        window.location.href = "/";
      } else {
        toast.error(response.message);
      }
      console.log(response);
    } catch (err) {
      toast.error("Login request Failed");
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    console.log("Login");
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div className="container mx-auto grid shadow p-5 h-[700px] my-10 py-40 rounded-md bg-slate-50">
        <div className=" p-2 md:p-10 w-full md:w-1/2 mx-auto border rounded-md bg-sky-50">
          <h1 className="text-3xl font-bold text-center  border-b py-2">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="w-content h-full">
            <div className="grid grid-cols-2 gap-4 place-content-center justify-center h-full ">
              <div className="col-span-2 flex flex-wrap justify-between md:gap-10 items-center">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-48 border rounded-md p-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-span-2 flex flex-wrap justify-between md:gap-10 items-center">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-48 border rounded-md p-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md py-2"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
