import React from "react";
import "./slider.css"; // or use CSS module if preferred
function Slider() {
  return (
    <section>
      <div className="sliderWindow">
        <div className="top">
          <div className="text">
            <h1>Navigate Your Image</h1>
            <p>description Text</p>
          </div>
          <div className="btns">
            <button type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </button>
            <button type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </button>
          </div>
        </div>

        <div id="carouselExample" className="slider carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="d-flex">
                {[1, 2, 3, 4].map((num) => (
                  <div className="place ms-3" key={num}>
                    <div className="image">
                      <img src="https://i.pravatar.cc/200" className="d-block w-100" alt="profile" />
                    </div>
                    <div className="slideText">
                      <h3>Place {num}</h3>
                      <p>Information About Place</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-item">
              <div className="d-flex">
                {[5, 6, 7, 8].map((num) => (
                  <div className="place ms-3" key={num}>
                    <div className="image">
                      <img src="https://picsum.photos/200" className="d-block w-100" alt="profile" />
                    </div>
                    <div className="slideText">
                      <h3>Place {num}</h3>
                      <p>Information About Place</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider;
