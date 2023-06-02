import React, { Component } from "react";
import { useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Steps } from "rsuite";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [comments, setComments] = useState("");

  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const checkError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors_ = [];
    const expression = /\S+@\S+/;
    var validEmail = expression.test(String(email).toLowerCase());
    if (!validEmail) errors_.push("email");
    if (!firstName) errors_.push("firstName");
    if (!surname) errors_.push("surname");
    if (!phone) errors_.push("phone");
    if (!address) errors_.push("address");
    if (!city) errors_.push("city");
    if (!states) errors_.push("states");
    if (!zip) errors_.push("zip");
    console.log(errors_);
    if (errors_.length > 0) setErrors(errors_);
    else {
      history.push("/cart/send", {
        email,
        firstName,
        surname,
        phone,
        address,
        states,
        city,
        zip,
        comments,
      });
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Steps current={1}>
          <Steps.Item title="Comanda" />
          <Steps.Item title="Detalii Livrare" />
          <Steps.Item title="Plasare Comanda" />
        </Steps>

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Prenume*</Form.Label>
              <Form.Control
                className={checkError("firstName") ? "is-invalid" : ""}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Prenume"
              />
              <div
                style={{ color: "#dc3545" }}
                className={
                  checkError("firstName") ? "inline-errormsg" : "hidden"
                }
              >
                Lipseste prenumele
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Nume*</Form.Label>
              <Form.Control
                className={checkError("surname") ? "is-invalid" : ""}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                placeholder="Nume de familie"
              />
              <div
                style={{ color: "#dc3545" }}
                className={checkError("surname") ? "inline-errormsg" : "hidden"}
              >
                Lipseste numele de familie
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Adresa*</Form.Label>
            <Form.Control
              className={checkError("address") ? "is-invalid" : ""}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Nume strada, numar etc"
            />
            <div
              style={{ color: "#dc3545" }}
              className={checkError("address") ? "inline-errormsg" : "hidden"}
            >
              Lipseste adresa de livrare
            </div>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Telefon*</Form.Label>
              <Form.Control
                className={checkError("phone") ? "is-invalid" : ""}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="07********"
              />
              <div
                style={{ color: "#dc3545" }}
                className={checkError("phone") ? "inline-errormsg" : "hidden"}
              >
                Lipseste numarul de telefon
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Label>E-mail*</Form.Label>
              <Form.Control
                className={checkError("email") ? "is-invalid" : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="andrei@yahoo.com"
              />
              <div
                style={{ color: "#dc3545" }}
                className={checkError("email") ? "inline-errormsg" : "hidden"}
              >
                Emailul este invalid sau lipseste
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Oras*</Form.Label>
              <Form.Control
                className={checkError("city") ? "is-invalid" : ""}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <div
                style={{ color: "#dc3545" }}
                className={checkError("city") ? "inline-errormsg" : "hidden"}
              >
                Lipseste orasul de livrare
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Judet*</Form.Label>
              <Form.Control
                className={checkError("states") ? "is-invalid" : ""}
                onChange={(e) => {
                  setStates(e.target.value);
                }}
                as="select"
                defaultValue="Alege Judet"
              >
                <option value="0">Alege Judet</option>
                <option value="Alba">Alba</option>
                <option value="Arad">Arad</option>
                <option value="Arges">Arges</option>
                <option value="Bacau">Bacau</option>
                <option value="Bihor">Bihor</option>
                <option value="Bistrita Nasaud">Bistrita Nasaud</option>
                <option value="Botosani">Botosani</option>
                <option value="Brasov">Brasov</option>
                <option value="Braila">Braila</option>
                <option value="Bucuresti">Bucuresti</option>
                <option value="Buzau">Buzau</option>
                <option value="Caras Severin">Caras Severin</option>
                <option value="Calarasi">Calarasi</option>
                <option value="Cluj">Cluj</option>
                <option value="Constanta">Constanta</option>
                <option value="Covasna">Covasna</option>
                <option value="Dambovita">Dambovita</option>
                <option value="Dolj">Dolj</option>
                <option value="Galati">Galati</option>
                <option value="Giurgiu">Giurgiu</option>
                <option value="Gorj">Gorj</option>
                <option value="Harghita">Harghita</option>
                <option value="Hunedoara">Hunedoara</option>
                <option value="Ialomita">Ialomita</option>
                <option value="Iasi">Iasi</option>
                <option value="Ilfov">Ilfov</option>
                <option value="Maramures">Maramures</option>
                <option value="Mehedinti">Mehedinti</option>
                <option value="Mures">Mures</option>
                <option value="Neamt">Neamt</option>
                <option value="Olt">Olt</option>
                <option value="Prahova">Prahova</option>
                <option value="Satu Mare">Satu Mare</option>
                <option value="Salaj">Salaj</option>
                <option value="Sibiu">Sibiu</option>
                <option value="Suceava">Suceava</option>
                <option value="Teleorman">Teleorman</option>
                <option value="Timis">Timis</option>
                <option value="Tulcea">Tulcea</option>
                <option value="Vaslui">Vaslui</option>
                <option value="Valcea">Valcea</option>
                <option value="Vrancea">Vrancea</option>
              </Form.Control>
              <div
                style={{ color: "#dc3545" }}
                className={checkError("states") ? "inline-errormsg" : "hidden"}
              >
                Alegeti judetul
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Cod Postal*</Form.Label>
              <Form.Control
                className={checkError("zip") ? "is-invalid" : ""}
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
              <div
                style={{ color: "#dc3545" }}
                className={checkError("zip") ? "inline-errormsg" : "hidden"}
              >
                Lipseste codul postal
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>Note Comanda</Form.Label>
            <Form.Control
              onChange={(e) => {
                setComments(e.target.value);
              }}
              as="textarea"
              rows={2}
            />
          </Form.Group>

          <Button onClick={handleSubmit} variant="primary" type="submit">
            Urmatorul pas
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default Checkout;
