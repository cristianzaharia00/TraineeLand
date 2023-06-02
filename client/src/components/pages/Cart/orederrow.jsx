import {
  faAngleLeft,
  faAngleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import React, { Component, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartContext from "../../context/cartcontext";
import UserContext from "../../context/usercontext";
import Axios from "axios";

const OrderRow = (props) => {
  const {
    _id,
    image,
    text,
    price,
    quantity,
    size,
    title,
    girth,
    width,
    price_reduced,
    primaryColor,
    secondaryColor,
    modelImage,
    shoeType,
  } = props.value;
  const { cart, setCart } = useContext(CartContext);
  const { userData, setUserData } = useContext(UserContext);

  const incrementItem = async () => {
    let new_cart = [];
    if (userData.user) {
      for (let i in cart) {
        console.log(cart[i].modelImage);
        console.log(cart[i].modelImage === undefined);
        if (cart[i].modelImage === undefined) {
          if (
            _id == cart[i]._id &&
            size == cart[i].size &&
            width == cart[i].width &&
            girth == cart[i].girth
          ) {
            new_cart.push({
              _id: cart[i]._id,
              quantity: String(++cart[i].quantity),
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
            });
          } else {
            new_cart.push({
              _id: cart[i]._id,
              quantity: cart[i].quantity,
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
            });
          }
        } else {
          if (
            _id == cart[i]._id &&
            size == cart[i].size &&
            width == cart[i].width &&
            girth == cart[i].girth &&
            modelImage == cart[i].modelImage &&
            primaryColor == cart[i].primaryColor &&
            secondaryColor == cart[i].secondaryColor &&
            shoeType == cart[i].shoeType
          ) {
            new_cart.push({
              _id: cart[i]._id,
              quantity: String(++cart[i].quantity),
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
              modelImage: cart[i].modelImage,
              primaryColor: cart[i].primaryColor,
              secondaryColor: cart[i].secondaryColor,
              shoeType: cart[i].shoeType,
            });
          } else {
            new_cart.push({
              _id: cart[i]._id,
              quantity: cart[i].quantity,
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
              modelImage: cart[i].modelImage,
              primaryColor: cart[i].primaryColor,
              secondaryColor: cart[i].secondaryColor,
              shoeType: cart[i].shoeType,
            });
          }
        }
      }
      setCart(new_cart);
      await Axios.put(
        "/users/cart",
        { cart: new_cart },
        {
          headers: { "x-auth-token": userData.token },
        }
      );
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cart"));

      for (let i in cartItems) {
        if (cart[i].modelImage === undefined) {
          if (
            _id == cartItems[i]._id &&
            size == cartItems[i].size &&
            width == cartItems[i].width &&
            girth == cartItems[i].girth
          ) {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: String(++cartItems[i].quantity),
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
            });
          } else {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: cartItems[i].quantity,
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
            });
          }
        } else {
          if (
            _id == cartItems[i]._id &&
            size == cartItems[i].size &&
            width == cartItems[i].width &&
            girth == cartItems[i].girth &&
            modelImage == cartItems[i].modelImage &&
            primaryColor == cartItems[i].primaryColor &&
            secondaryColor == cartItems[i].secondaryColor &&
            shoeType == cartItems[i].shoeType
          ) {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: String(++cartItems[i].quantity),
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
              modelImage: cartItems[i].modelImage,
              primaryColor: cartItems[i].primaryColor,
              secondaryColor: cartItems[i].secondaryColor,
              shoeType: cartItems[i].shoeType,
            });
          } else {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: cartItems[i].quantity,
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
              modelImage: cartItems[i].modelImage,
              primaryColor: cartItems[i].primaryColor,
              secondaryColor: cartItems[i].secondaryColor,
              shoeType: cartItems[i].shoeType,
            });
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(new_cart));
      setCart(new_cart);
    }
  };

  const decrementItem = async () => {
    let new_cart = [];
    if (userData.user) {
      for (let i in cart) {
        if (cart[i].modelImage === undefined) {
          if (
            _id == cart[i]._id &&
            size == cart[i].size &&
            width == cart[i].width &&
            girth == cart[i].girth
          ) {
            new_cart.push({
              _id: cart[i]._id,
              quantity: String(--cart[i].quantity),
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
            });
          } else {
            new_cart.push({
              _id: cart[i]._id,
              quantity: cart[i].quantity,
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
            });
          }
        } else {
          if (
            _id == cart[i]._id &&
            size == cart[i].size &&
            width == cart[i].width &&
            girth == cart[i].girth &&
            modelImage == cart[i].modelImage &&
            primaryColor == cart[i].primaryColor &&
            secondaryColor == cart[i].secondaryColor &&
            shoeType == cart[i].shoeType
          ) {
            new_cart.push({
              _id: cart[i]._id,
              quantity: String(--cart[i].quantity),
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
              modelImage: cart[i].modelImage,
              primaryColor: cart[i].primaryColor,
              secondaryColor: cart[i].secondaryColor,
              shoeType: cart[i].shoeType,
            });
          } else {
            new_cart.push({
              _id: cart[i]._id,
              quantity: cart[i].quantity,
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
              modelImage: cart[i].modelImage,
              primaryColor: cart[i].primaryColor,
              secondaryColor: cart[i].secondaryColor,
              shoeType: cart[i].shoeType,
            });
          }
        }
      }
      setCart(new_cart);
      await Axios.put(
        "/users/cart",
        { cart: new_cart },
        {
          headers: { "x-auth-token": userData.token },
        }
      );
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cart"));

      for (let i in cartItems) {
        if (cart[i].modelImage === undefined) {
          if (
            _id == cartItems[i]._id &&
            size == cartItems[i].size &&
            width == cartItems[i].width &&
            girth == cartItems[i].girth
          ) {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: String(--cartItems[i].quantity),
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
            });
          } else {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: cartItems[i].quantity,
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
            });
          }
        } else {
          if (
            _id == cartItems[i]._id &&
            size == cartItems[i].size &&
            width == cartItems[i].width &&
            girth == cartItems[i].girth &&
            modelImage == cartItems[i].modelImage &&
            primaryColor == cartItems[i].primaryColor &&
            secondaryColor == cartItems[i].secondaryColor &&
            shoeType == cartItems[i].shoeType
          ) {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: String(--cartItems[i].quantity),
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
              modelImage: cartItems[i].modelImage,
              primaryColor: cartItems[i].primaryColor,
              secondaryColor: cartItems[i].secondaryColor,
              shoeType: cartItems[i].shoeType,
            });
          } else {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: cartItems[i].quantity,
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
              modelImage: cartItems[i].modelImage,
              primaryColor: cartItems[i].primaryColor,
              secondaryColor: cartItems[i].secondaryColor,
              shoeType: cartItems[i].shoeType,
            });
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(new_cart));
      setCart(new_cart);
    }
  };

  const deleteItem = async () => {
    let new_cart = [];
    if (userData.user) {
      for (let i in cart) {
        if (cart[i].modelImage === undefined) {
          if (
            _id == cart[i]._id &&
            size == cart[i].size &&
            width == cart[i].width &&
            girth == cart[i].girth
          ) {
            continue;
          } else {
            new_cart.push({
              _id: cart[i]._id,
              quantity: cart[i].quantity,
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
            });
          }
        } else {
          if (
            _id == cart[i]._id &&
            size == cart[i].size &&
            width == cart[i].width &&
            girth == cart[i].girth &&
            modelImage == cart[i].modelImage &&
            primaryColor == cart[i].primaryColor &&
            secondaryColor == cart[i].secondaryColor &&
            shoeType == cart[i].shoeType
          ) {
            continue;
          } else {
            new_cart.push({
              _id: cart[i]._id,
              quantity: cart[i].quantity,
              size: cart[i].size,
              width: cart[i].width,
              girth: cart[i].girth,
              modelImage: cart[i].modelImage,
              primaryColor: cart[i].primaryColor,
              secondaryColor: cart[i].secondaryColor,
              shoeType: cart[i].shoeType,
            });
          }
        }
      }
      setCart(new_cart);
      await Axios.put(
        "/users/cart",
        { cart: new_cart },
        {
          headers: { "x-auth-token": userData.token },
        }
      );
    } else {
      let cartItems = JSON.parse(localStorage.getItem("cart"));

      for (let i in cartItems) {
        if (cart[i].modelImage === undefined) {
          if (
            _id == cartItems[i]._id &&
            size == cartItems[i].size &&
            width == cartItems[i].width &&
            girth == cartItems[i].girth
          ) {
            continue;
          } else {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: cartItems[i].quantity,
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
            });
          }
        } else {
          if (
            _id == cartItems[i]._id &&
            size == cartItems[i].size &&
            width == cartItems[i].width &&
            girth == cartItems[i].girth &&
            modelImage == cartItems[i].modelImage &&
            primaryColor == cartItems[i].primaryColor &&
            secondaryColor == cartItems[i].secondaryColor &&
            shoeType == cartItems[i].shoeType
          ) {
            continue;
          } else {
            new_cart.push({
              _id: cartItems[i]._id,
              quantity: cartItems[i].quantity,
              size: cartItems[i].size,
              width: cartItems[i].width,
              girth: cartItems[i].girth,
              modelImage: cartItems[i].modelImage,
              primaryColor: cartItems[i].primaryColor,
              secondaryColor: cartItems[i].secondaryColor,
              shoeType: cartItems[i].shoeType,
            });
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(new_cart));
      setCart(new_cart);
    }
  };

  return (
    <tr>
      <td className="product-img">
        <img
          src={
            "https://res.cloudinary.com/dmpzc3ix9/w_300,h_375,c_scale/" +
            image[0]
          }
          style={{ objectFit: "cover" }}
        ></img>{" "}
      </td>
      <td className="product-name text-center">
        {title + " (" + size + " x " + width + " x " + girth + ")"}
      </td>
      <td className="product-quantity text-center">
        <FontAwesomeIcon
          className={quantity <= 1 ? "disabled" : ""}
          onClick={decrementItem}
          icon={faAngleLeft}
        />
        {quantity}
        <FontAwesomeIcon
          className={quantity >= 10 ? "disabled" : ""}
          onClick={incrementItem}
          icon={faAngleRight}
        />
      </td>

      <td className="product-price">
        {price_reduced ? price_reduced * quantity : price * quantity},00lei
      </td>
      <td className="product-delete">
        <FontAwesomeIcon onClick={deleteItem} icon={faTimesCircle} />
      </td>
    </tr>
  );
};

export default OrderRow;
