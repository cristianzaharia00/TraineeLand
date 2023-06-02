import React, { Component, useContext, useEffect, useState } from "react";
import {
  CardDeck,
  Col,
  Container,
  Form,
  Pagination,
  Row,
} from "react-bootstrap";
import Footer from "../../Shared/footer";
import StoreCarousel from "./store_carousel";
import StoreItem from "./store_item";
import ShopContext from "../../context/shopcontext";
import FiltersContext from "../../context/filterscontext";
import Axios from "axios";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Route } from "react-router-dom";
import StoreID from "./shop_id";
import ReactPaginate from "react-paginate";
import {
  faAngleLeft,
  faAngleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Shop() {
  const { shop, setShop } = useContext(ShopContext);
  const { filters } = useContext(FiltersContext);
  const [pageFilters, setPageFilters] = useState({
    shop: [],
    tags: [],
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  useEffect(() => {
    setPageFilters({
      shop: [...shop.filter((elem) => elem.showInShop == true)],
      tags: [],
    });

    setCurrentProducts(
      shop.filter((elem) => elem.showInShop == true).slice(0, 12)
    );
  }, [shop]);

  const showPageProducts = (event) => {
    var elements = document.getElementsByClassName("active");
    for (let elem of elements) {
      elem.classList.remove("active");
    }
    event.target.parentElement.classList.add("active");
    setPageNumber(parseInt(event.target.text));
    setCurrentProducts(
      pageFilters.shop.slice(
        (parseInt(event.target.text) - 1) * 12,
        parseInt(event.target.text) * 12
      )
    );
  };

  const refreshPages = (newShop) => {
    setCurrentProducts(newShop.slice(0, 12));
    var elements = document.getElementsByClassName("active");
    for (let elem of elements) {
      elem.classList.remove("active");
    }
    var elements = document.getElementsByClassName("page-item");
    if (elements.length > 0) elements[0].classList.add("active");
  };

  const handleChecked = (e) => {
    const tag = String(e.target.attributes.filtervalue.value);
    let newShop = [...shop.filter((elem) => elem.showInShop == true)];
    if (e.target.checked === true) {
      pageFilters.tags.push(tag);
    } else {
      const index = pageFilters.tags.indexOf(tag);
      if (index > -1) pageFilters.tags.splice(index, 1);
    }

    for (let i in pageFilters.tags) {
      newShop = newShop.filter((item) =>
        item.tags.includes(pageFilters.tags[i])
      );
    }
    setPageFilters({ shop: newShop, tags: pageFilters.tags });
    refreshPages(newShop);
  };

  const printShop = () => {
    let rows = [];
    if (shop) {
      return currentProducts.map((col) => {
        return (
          <Col
            key={"col-" + col._id}
            xs="6"
            sm="6"
            md="4"
            lg="4"
            xl="4"
            className="offset"
          >
            <StoreItem key={col._id} value={col} />
          </Col>
        );
      });
    }
  };
  const returnPaginationItems = () => {
    var items = [];
    for (let i = 1; i < pageFilters.shop.length / 12 + 1; i++) {
      items.push(
        <Pagination.Item
          className={i == pageNumber ? "active" : ""}
          onClick={showPageProducts}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/shop/item/:id">
          <StoreID value={shop} />
        </Route>

        <Route exact path="/shop">
          <Container fluid="xl">
            <h1 className="offset">Magazin</h1>
            <Row className="shop">
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="2"
                xl="2"
                className="filters mt-4"
              >
                <Row>
                  <Col>
                    <h6 className=" pl-3">
                      <b>ANOTIMP</b>
                    </h6>

                    <div className=" pl-3">
                      {filters &&
                        filters["season"].map((obj, i) => {
                          return (
                            <Form.Check
                              key={obj.label + "-filter"}
                              filtervalue={obj.value}
                              defaultChecked={pageFilters.tags.includes(
                                obj.value
                              )}
                              onChange={(e) => handleChecked(e)}
                              type="checkbox"
                              label={obj.label}
                            />
                          );
                        })}
                    </div>
                  </Col>

                  <Col>
                    <h6 className="pl-3 mt-1">
                      <b>TIP</b>
                    </h6>
                    <div className="pl-3">
                      {filters &&
                        filters["type"].map((obj, i) => {
                          return (
                            <Form.Check
                              key={obj.label + "-filter"}
                              filtervalue={obj.value}
                              defaultChecked={pageFilters.tags.includes(
                                obj.value
                              )}
                              onChange={(e) => handleChecked(e)}
                              type="checkbox"
                              label={obj.label}
                            />
                          );
                        })}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" sm="12" md="12" lg="10" xl="10">
                <Row>{printShop()}</Row>
                <Pagination className="shop-pagination">
                  {returnPaginationItems()}
                </Pagination>
              </Col>
            </Row>
          </Container>
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default Shop;
