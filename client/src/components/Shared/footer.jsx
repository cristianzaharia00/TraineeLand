import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Container } from "react-bootstrap";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        <div className="footer-dark">
          <Container className="container-footer">
            <div className="row">
              <div className="col-md-4 item">
                <h3>Contact</h3>
                <ul>
                  <li>
                    <div>Email: ennababyshoes@yahoo.com</div>
                  </li>
                  <li>
                    <div>Telefon: 0721914363</div>
                  </li>
                  <li>
                    <div>Adresa: Strada Apateu nr. 2</div>
                  </li>
                </ul>
              </div>

              <div className="col-md-4 item">
                <h3>Pagini importante</h3>
                <ul>
                  <li>
                    <a href="/about/terms">Termeni si conditii</a>
                  </li>
                  <li>
                    <a href="/about/returnPolicy">Politica de Returnare</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 item text">
                <h3>EnnaBabyShoes</h3>
                <p>
                  Firma de papucei din 2019, iubim tot ce facem si facem cu
                  iubire fiecare pereche!
                </p>
              </div>
              <div className="col item social">
                <a href="https://www.facebook.com/ennabshoes">
                  <FontAwesomeIcon
                    className="fa fa-facebook"
                    icon={faFacebook}
                  />
                </a>
                <a href="https://www.instagram.com/ennabshoes/">
                  <FontAwesomeIcon
                    className="fa fa-instagram"
                    icon={faInstagram}
                  />
                </a>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;
