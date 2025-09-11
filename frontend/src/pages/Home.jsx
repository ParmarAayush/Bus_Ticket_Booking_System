import BookingForm from "../features/Booking/BookingForm";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    // ✅ Add Bootstrap CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css";
    link.integrity = "sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    // ✅ Add Bootstrap JS
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup when leaving page
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <BookingForm />
      <Slider />
      <Footer />
    </>
  );
}

export default Home;
