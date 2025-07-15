import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../../api/axiosInstance.js";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = userDetails;

  // get form value and set updated data to userDetails
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("auth/signin", userDetails);
      toast.success("User Signin successfully");
    } catch (error) {
      console.error("Signin Customer ", error);
      const errMessage = error.response?.data?.error || error.response?.data?.message || "Something went wrong while adding customer ❌";
      toast.error(errMessage);
    }
  };
  return (
    <>
      <ToastContainer />
      <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white" onSubmit={handleLogIn}>
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span> Login
        </p>
        <div className="w-full">
          <p>Name</p>
          <input onChange={handleFormChange} value={username} name="username" placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
        </div>
        <div className="w-full ">
          <p>Email</p>
          <input onChange={handleFormChange} value={email} name="email" placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input onChange={handleFormChange} name="password" value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
        </div>
        <p>
          Create an account? <span className="text-indigo-500 cursor-pointer">click here</span>
        </p>
        <input type="submit" value="Login" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer" />
      </form>
    </>
  );
};

export default Login;
