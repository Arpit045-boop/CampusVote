import React from 'react'
import "./carousal.css";

function Carousal() {
  return (
    <div className='carousal'>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="img1.jpg" className="d-block w-100"  alt="vote1"/>
        <div className="carousel-caption d-none d-md-block">
          <h3 className='carousalh3' >Welcome to Campus Vote</h3>
        </div>
      </div>
      <div className="carousel-item">
        <img src="img2.jpg" className="d-block w-100"   alt="vote2"/>
        <div className="carousel-caption d-none d-md-block">
          <h3 className='carousalh3'>Welcome to Campus Vote</h3>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div></div>
  )
}

export default Carousal