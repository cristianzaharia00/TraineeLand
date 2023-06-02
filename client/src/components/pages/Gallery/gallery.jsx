import React, { Component, useState } from "react";
import { Container } from "react-bootstrap";
import ResponsiveGallery from "react-responsive-gallery";
import listReactFiles from "list-react-files";

function myRandomInts(quantity, max) {
  const set = new Set();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1);
  }
  return set;
}

const getImages = () => {
  var quantity = 100;
  var list = [];
  var set = myRandomInts(quantity, 475);
  set = Array.from(set);

  for (var i = 0; i < quantity; i++) {
    list.push({ src: "/GalleryPhotos/" + set[i] + ".png" });
  }

  return list;
};

const Gallery = () => {
  console.log(__dirname);
  const [images, setImages] = useState(getImages());
  const [imgPerRow, setImgPerRow] = useState({
    xs: 1,
    s: 1,
    m: 2,
    l: 3,
    xl: 3,
    xxl: 4,
  });

  return (
    <React.Fragment>
      <Container>
        <h1 className="offset">Gallery page</h1>
        <ResponsiveGallery images={images} numOfImagesPerRow={imgPerRow} />
      </Container>
    </React.Fragment>
  );
};

export default Gallery;
