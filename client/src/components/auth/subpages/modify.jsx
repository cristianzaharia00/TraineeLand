import React, { useContext } from "react";
import { CardDeck, Row } from "react-bootstrap";
import ShopContext from "../../context/shopcontext";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import ModifyItem from "../small_components/modify_item";
import ModifyID from "./modifyID";

function Modify() {
  const { shop } = useContext(ShopContext);

  const chunk = (array, size) => {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
  };

  const printShop = () => {
    let rows = [];
    if (shop) {
      rows = chunk(shop, 3);
      return rows.map((row) => (
        <Row className="item-row">
          {row.map((col) => (
            <ModifyItem key={col._id} value={col} />
          ))}
        </Row>
      ));
    }
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/login-register/modify/:id">
          <ModifyID />
        </Route>
        <Route exact path="/login-register/modify/">
          <div className="container">
            <Row className="shop">
              <CardDeck align="center">{printShop()}</CardDeck>
            </Row>
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default Modify;
