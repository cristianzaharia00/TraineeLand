import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
//import poster from "../../assets/home/posters/Papucei.png";
import poster2 from "../../assets/home/posters/PosterSpringSummer.png";
import poster from "../../assets/home/posters/PosterSpring4.png";
class Carousels extends Component {
  state = {};
  render() {
    return (
      <Carousel className="carousel">
        <Carousel.Item className="image-carousel-scale">
          <img
            className="d-block img-resposnsive w-100"
            src={poster}
            alt="First slide"
          />
        </Carousel.Item>
        {/*<Carousel.Item className="image-carousel-scale">
          <img
            className="d-block img-resposnsive w-100"
            src={poster2}
            alt="Second slide"
          />

          <Carousel.Caption className="custom-caption">
            <Button className="buton-personalizare" href="/customize">
              Spre Pagina de Personalizare
            </Button>
          </Carousel.Caption>
  </Carousel.Item>*/}
        <Carousel.Item className="image-carousel-scale">
          <img
            className="d-block img-resposnsive w-100"
            src={poster2}
            alt="Third slide"
          />
        </Carousel.Item>
        {/*<Carousel.Item className="image-carousel-scale">
          <img
            className="d-block img-resposnsive w-100"
            src={poster3}
            alt="Third slide"
          />
</Carousel.Item>*/}
      </Carousel>
    );
  }
}

export default Carousels;
