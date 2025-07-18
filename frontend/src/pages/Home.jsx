import { axiosInstance } from "../api/axiosInstance";

function Home() {
  const getData = async () => {
    try {
      let response = await axiosInstance.get("endpoint", { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1>Hello From Home</h1>
        <button type="button" onClick={getData} className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity rounded-md">
          Request For Data
        </button>
      </div>
    </>
  );
}

export default Home;
