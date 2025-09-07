import { useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

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
        e.preventDefault();

        const otp = digitOne + digitTwo + digitThree + digitFour + digitFiv + digitSix;

        try {
            await axiosInstance.post("auth/verify-email", { otp }, { withCredentials: true });
            toast.success("User verified successfully ✅");
        } catch (error) {
            console.log("Verification Error", error);
            const errMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Something went wrong while verifying ❌";
            toast.error(errMessage);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="flex flex-col items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                    <p className="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
                    <p className="mt-2 text-sm text-gray-900/90 text-center">
                        Enter the 6-digit code sent to your email ID.
                    </p>
                    <form onSubmit={handleOtpSubmit}>
                        <div className="grid grid-cols-6 gap-2 sm:gap-3 w-11/12 mt-8">
                            <input name="digitOne" type="text" maxLength="1" onChange={handlOtpChange} value={digitOne} className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                            <input name="digitTwo" type="text" maxLength="1" onChange={handlOtpChange} value={digitTwo} className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                            <input name="digitThree" type="text" maxLength="1" onChange={handlOtpChange} value={digitThree} className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                            <input name="digitFour" type="text" maxLength="1" onChange={handlOtpChange} value={digitFour} className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                            <input name="digitFiv" type="text" maxLength="1" onChange={handlOtpChange} value={digitFiv} className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                            <input name="digitSix" type="text" maxLength="1" onChange={handlOtpChange} value={digitSix} className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                        </div>

                        <button type="submit" className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity">
                            Verify Email
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Otp;
