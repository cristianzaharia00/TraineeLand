import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router";
import Terms from "./about_terms";
import ReturnForm from "./return_form";
import ReturnPolicy from "./return_policy";
import OurStory from "./our_story";
import Measure from "./about_measure";
import Footer from "../../Shared/footer";
const About = () => {
  return (
    <>
      <Switch>
        <Route exact path="/about/return">
          <ReturnForm />
        </Route>
        <Route exact path="/about/measure">
          <Measure />
        </Route>
        <Route path="/about/terms">
          <Terms></Terms>
        </Route>
        <Route path="/about/returnPolicy">
          <ReturnPolicy></ReturnPolicy>
        </Route>
        <Route exact path="/about">
          <OurStory></OurStory>
        </Route>
      </Switch>
      <Footer></Footer>
    </>
  );
};

export default About;
