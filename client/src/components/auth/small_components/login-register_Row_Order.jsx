import React, { useContext } from "react";
import ShopContext from "../../context/shopcontext";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import Axios from "axios";
const RowOrder = (props) => {
  const item = props.item;
  const { shop } = useContext(ShopContext);
  var newDate = new Date().toDateString();
  const findItemByID = (_id) => {
    return shop.filter((e) => {
      return e._id == _id;
    })[0];
  };

  const printCommand = () => {
    if (shop.length > 0) {
      return item.command.map((item_) => {
        let shopItem = findItemByID(item_._id);
        if (shopItem !== undefined)
          return (
            <React.Fragment>
              <a href={"/shop/item/" + item_._id}>
                {item_.modelImage
                  ? shopItem.title +
                    " " +
                    item_.shoeType +
                    " " +
                    item_.primaryColor +
                    " " +
                    item_.secondaryColor +
                    " " +
                    item_.modelImage +
                    " (" +
                    item_.size +
                    " x " +
                    item_.width +
                    " x " +
                    item_.girth +
                    ") x " +
                    item_.quantity
                  : shopItem.title +
                    " (" +
                    item_.size +
                    " x " +
                    item_.width +
                    " x " +
                    item_.girth +
                    ") x " +
                    item_.quantity}
              </a>
              <br></br>
            </React.Fragment>
          );
        return "Nici un papucel la comanda";
      });
    }
  };

  const sendEmail = async (event) => {
    let id = event.currentTarget.dataset.id;
    let email = event.currentTarget.dataset.email;
    let token = localStorage.getItem("auth-token");
    let response = await Axios.post(
      "/order/sendemail",
      { id, email },
      { headers: { "x-auth-token": token } }
    ).then(() => {
      window.location.reload(false);
    });
  };
  return (
    <tr>
      <td>{item.firstName + " " + item.surname}</td>
      <td>
        {item.address + " " + item.state + " " + item.city + " " + item.zip}
      </td>
      <td>{item.phone}</td>
      <td>{item.date}</td>
      <td>{item.email}</td>
      <td>{item.address}</td>
      <td>{item.deliveryType}</td>
      <td>{item.comments}</td>
      <td style={{ "white-space": "pre-wrap" }}>{printCommand()}</td>
      <td>{item.subtotal}</td>
      {item.sentemail == true ? (
        <td align="center">
          <Button data-id={item._id} data-email={item.email} disabled>
            Email Trimis
          </Button>
        </td>
      ) : (
        <td align="center">
          <Button
            data-id={item._id}
            data-email={item.email}
            onClick={sendEmail}
            align="center"
          >
            Trimite email
          </Button>
        </td>
      )}
    </tr>
  );
};

export default RowOrder;
