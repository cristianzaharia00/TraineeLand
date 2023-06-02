import React, { Component } from "react";

import Carousels from "../../Shared/carousels";
import ItemPresentation from "./itempresentation";
import Footer from "../../Shared/footer";
import { Container } from "react-bootstrap";
import BestSelling from "./home_bestSelling";
import FacebookComments from "./home_facebookComments";
class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Carousels />
        <Container>
          <BestSelling />
          <ItemPresentation />
          <FacebookComments />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
