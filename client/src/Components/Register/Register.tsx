import { useEffect, useState } from "react";
import bcrypt from "bcryptjs-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );
      if (response.data.length > 0) {
        setMessage("Email đã tồn tại");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await axios.post("http://localhost:3000/users", {
          email,
          password: hashedPassword,
        });
        setMessage("Đăng kí tài khoản thành công");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section
        style={{ marginTop: "100px", backgroundColor: "gray" }}
        className="flex items-center justify-center"
      >
        <div className="container mx-auto p-10 aspect-w-16 aspect-h-9">
          <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full max-w-4xl">
              <div className="flex flex-wrap rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                {/* Left column container */}
                <div className="w-full lg:w-1/2 p-6 md:p-12">
                  <div className="text-center">
                    <img
                      className="mx-auto w-48"
                      src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      alt="logo"
                    />
                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                      We are The Lotus Team
                    </h4>
                  </div>
                  <form>
                    <p className="mb-4">Please register your account</p>
                    {/* Email input */}
                    <div className="relative mb-4">
                      <input
                        type="text"
                        className="peer block w-full rounded border-0 bg-transparent px-3 py-2.5 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                        id="emailInput"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {/* Password input */}
                    <div className="relative mb-4">
                      <input
                        type="password"
                        className="peer block w-full rounded border-0 bg-transparent px-3 py-2.5 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                        id="passwordInput"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* Confirm Password input */}
                    <div className="relative mb-4">
                      <input
                        type="password"
                        className="peer block w-full rounded border-0 bg-transparent px-3 py-2.5 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary"
                        id="confirmPasswordInput"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {/* Message display */}
                    {message && <p className="mb-4 text-red-500">{message}</p>}
                    {/* Submit button */}
                    <div className="mb-12 pb-1 pt-1 text-center">
                      <button
                        className="mb-3 w-full rounded bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        type="button"
                        onClick={handleRegister}
                      >
                        Register
                      </button>
                    </div>
                    {/* Login button */}
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0">Already have an account?</p>
                      <button
                        type="button"
                        className="inline-block rounded border-2 border-danger px-6 py-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                {/* Right column container with background and description */}
                <div
                  className="flex items-center w-full lg:w-1/2 rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
