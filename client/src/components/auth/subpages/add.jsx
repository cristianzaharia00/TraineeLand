import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
import Axios from "axios";
import filterscontext from "../../context/filterscontext";
import { toast } from "react-toastify";
import Toastify from "../../Shared/toastify";

const Add = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState(0);
  const [priceReduced, setPriceReduced] = useState(0);
  const { filters } = useContext(filterscontext);
  const [options, setOptions] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    var tempOptions = [];
    for (const [key, value] of Object.entries(filters)) {
      value.forEach((val) => {
        tempOptions.push(val);
      });
    }
    setOptions(tempOptions);
  }, []);

  function handleImage1Change(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage1(reader.result);
    };
  }

  function handleImage2Change(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage2(reader.result);
    };
  }

  function handleImage3Change(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage3(reader.result);
    };
  }

  const sendItem = async (e) => {
    setDisableButton(true);
    e.preventDefault();
    try {
      let image = [];
      if (image1 != "") image.push(image1);
      if (image2 != "") image.push(image2);
      if (image3 != "") image.push(image3);
      Axios.post(
        "/items/",
        {
          title,
          text,
          image,
          tags,
          price,
          price_reduced: priceReduced,
        },
        { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
      )
        .then(() => toast.success(Toastify.ToastShopItemAdded()))
        .catch(() => {
          toast.error(Toastify.ToastShopItemAddedError());
          setDisableButton(false);
        });
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Form onSubmit={sendItem}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Text
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Pret
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Pret redus
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={(e) => {
                setPriceReduced(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Row>
          <Form.Group>
            <Form.File onChange={(e) => handleImage1Change(e)} />
          </Form.Group>
          <Form.Group>
            <Form.File onChange={(e) => handleImage2Change(e)} />
          </Form.Group>
          <Form.Group>
            <Form.File onChange={(e) => handleImage3Change(e)} />
          </Form.Group>
        </Row>
        <Select
          className="mb-3"
          options={options}
          isMulti
          onChange={(e) => setTags(e)}
        />
        <Form.Group>
          <Button type="submit">Adauga Produsul</Button>
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};

export default Add;
