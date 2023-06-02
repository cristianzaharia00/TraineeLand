import React, { Component, useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ShopContext from "../../context/shopcontext";
import Axios from "axios";
import Select from "react-select";
import { Carousel } from "react-bootstrap";
import filterscontext from "../../context/filterscontext";
import { toast } from "react-toastify";
import Toastify from "../../Shared/toastify";
const ModifyID = (props) => {
  const { shop } = useContext(ShopContext);
  const { filters } = useContext(filterscontext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([]);
  const [price, setPrice] = useState(0);
  const [defaultTags, setDefaultTags] = useState([]);
  const [priceReduced, setPriceReduced] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [showInShop, setShowInShop] = useState(true);

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

  const getTags = (tags) => {
    if (tags.length > 0) {
      let newTags = [];
      tags.map((e) => {
        newTags.push({ value: e, label: e });
      });
      setTags(newTags);
    }
  };

  const updateItem = async (e) => {
    setDisableButton(true);
    e.preventDefault();
    try {
      let image = [];
      if (image1 != "") image.push(image1);
      if (image2 != "") image.push(image2);
      if (image3 != "") image.push(image3);
      Axios.put(
        "/items/",
        {
          id,
          title,
          text,
          image,
          tags,
          price,
          price_reduced: priceReduced,
          showInShop,
        },
        { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
      )
        .then(() => toast.success(Toastify.ToastShopItemModified()))
        .catch(() => {
          toast.error(Toastify.ToastShopItemModifiedError());
          setDisableButton(false);
        });
    } catch (err) {}
  };

  const printItem = () => {
    if (shop.length > 0) {
      const item = shop.filter((e) => {
        return e._id === id;
      })[0];
      if (title === "") {
        setTitle(item.title);
        setText(item.text);
        setPrice(item.price);
        setPriceReduced(item.priceReduced);
        getTags(item.tags);
      }

      return (
        <React.Fragment>
          <Row>
            <Col md="6">
              <Carousel>
                {item.image.map((image_) => {
                  if (image_)
                    return (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={"https://res.cloudinary.com/dmpzc3ix9/" + image_}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    );
                })}
              </Carousel>
            </Col>
            <Col>
              <Form onSubmit={updateItem}>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Title
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      defaultValue={item.title}
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
                      defaultValue={item.text}
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
                      defaultValue={item.price}
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
                      defaultValue={item.price_reduced}
                      onChange={(e) => {
                        setPriceReduced(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Pozele nu vor fi modificate daca nu este nici o poza
                    selectata in cele 3 de dedesubt
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.File onChange={(e) => handleImage1Change(e)} />
                </Form.Group>
                <Form.Group>
                  <Form.File onChange={(e) => handleImage2Change(e)} />
                </Form.Group>
                <Form.Group>
                  <Form.File onChange={(e) => handleImage3Change(e)} />
                </Form.Group>
                <Select
                  className="mb-2"
                  defaultValue={tags}
                  options={options}
                  isMulti
                  onChange={(e) => setTags(e)}
                />
                <Form.Group>
                  <Form.Check
                    defaultChecked={item.showInShop}
                    type="switch"
                    id="custom-switch"
                    label="Produs Activ"
                    onChange={(e) => setShowInShop(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group>
                  <Button disabled={disableButton} type="submit">
                    Modifica Produsul
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  };

  return <Container fluid>{printItem()}</Container>;
};

export default ModifyID;
