import App from "./App";
import React, { Component } from "react";

class Gif extends Component {
  // when our vid has loaded, we add loaded class name
  //otherwise the vid stays hidden
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  render() {
    const loaded = this.state;
    const { images } = this.props;
    return (
      <video
        //when we have the loaded state as true, we add a loaded class
        className={`grid-item video ${loaded && "loaded"}`}
        autoPlay
        loop
        src={images.original.mp4}
        // when the vid leads, we set the loaded state to be true
        onLoadedData={() => this.setState({ loaded: true })}
      />
    );
  }
}

export default Gif;
