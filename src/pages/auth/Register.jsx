import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../context/user";
import toast from "react-hot-toast";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(CurrentUserContext);
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);
  const validateForm = () => {
    if (name.length === 0) {
      toast.error("Name is required");
      return false;
    }
    if (email.length === 0) {
      toast.error("Email is required");
      return false;
    }
    if (password.length === 0) {
      toast.error("Password is required");
      return false;
    }
    if (password_confirmation.length === 0) {
      toast.error("Password confirmation is required");
      return false;
    }
    if (password !== password_confirmation) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    console.log("Register");
    e.preventDefault();
    validateForm();
    handleRegister();
  };
  const handleRegister = async () => {
    console.log("Register");
    try {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const response = await data.json();
      console.log(response);

      if (response.status === "success") {
        toast.success(response.message);
        window.location.href = "/login";
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mx-auto grid shadow p-5 h-[700px] my-10  py-40 rounded-md bg-slate-50">
        <div className="p-2 md:p-10 w-full md:w-1/2 mx-auto border rounded-md bg-sky-50 ">
          <h1 className="text-3xl font-bold text-center mb-2 border-b py-2">
            Register
          </h1>
          <form onSubmit={handleSubmit} className=" h-full">
            <div className="grid grid-cols-2 gap-4 place-content-center justify-center h-full">
              <div className="col-span-2 flex justify-between gap-10 items-center">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-48 border rounded-md p-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-span-2 flex justify-between gap-10 items-center">
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
              <div className="col-span-2 flex justify-between gap-10 items-center">
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
              <div className="col-span-2 flex justify-between gap-10 items-center">
                <label htmlFor="password_confirmation">Confirm Password:</label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  className=" border w-48 rounded-md p-1"
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md py-2"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
