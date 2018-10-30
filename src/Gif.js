import App from "./App";
import React, { Component } from "react";

class Gif extends Component {
  render() {
    const { images } = this.props;
    return (
      <video
        className="grid-item video"
        autoPlay
        loop
        src={images.original.mp4}
      />
    );
  }
}

export default Gif;
