import React from "react";

function Carousel(){

    return (
        <>
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="..." class="d-block w-100 carousel-img-item" alt="..." />
                    </div>
                    <div class="carousel-item">
                    <img src="..." class="d-block w-100 carousel-img-item" alt="..." />
                    </div>
                    <div class="carousel-item">
                    <img src="..." class="d-block w-100 carousel-img-item" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}

export default Carousel;