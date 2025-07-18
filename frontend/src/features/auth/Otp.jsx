import { useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

function Otp() {
  const [otpDigits, setOtpDigits] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFiv: "",
    digitSix: "",
  });

  const { digitOne, digitTwo, digitThree, digitFour, digitFiv, digitSix } = otpDigits;

  const handlOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpDigits({
      ...otpDigits,
      [name]: value,
    });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault;
    try {
      await axiosInstance.post("endpoint", otpDigits, { withCredentials: true });
      toast.success("User Verified");
    } catch (error) {
      console.log("Verification Error", error);
      const errMessage = error.response?.data?.error || error.response?.data?.message || "Something went wrong while Verifying ❌";
      toast.error(errMessage);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex justify-center items-center h-screen bg-gray-100"></div>
        <div class="flex flex-col items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <p class="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
          <p class="mt-2 text-sm text-gray-900/90 text-center">Enter the 6-digit code sent to your email ID.</p>
          <form onSubmit={handleOtpSubmit}>
            <div class="grid grid-cols-6 gap-2 sm:gap-3 w-11/12 mt-8">
              <input type="text" maxLength="1" onChange={handlOtpChange} value={digitOne} class="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
              <input type="text" maxLength="1" onChange={handlOtpChange} value={digitTwo} class="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
              <input type="text" maxLength="1" onChange={handlOtpChange} value={digitThree} class="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
              <input type="text" maxLength="1" onChange={handlOtpChange} value={digitFour} class="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
              <input type="text" maxLength="1" onChange={handlOtpChange} value={digitFiv} class="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
              <input type="text" maxLength="1" onChange={handlOtpChange} value={digitSix} class="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
            </div>

            <button type="submit" class="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity">
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Otp;
