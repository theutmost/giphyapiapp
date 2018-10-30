import React, { Component } from "react";
// we imported our loader spinner as image, used down below
import loader from "./images/loader.svg";
import Gif from "./Gif";

/*
const getData = async searchTerm => {
  try {
  } catch (error) {
    alert(error);
  }
};
*/

const Header = () => (
  <div className="header grid">
    <h1 className="title"> Giphy App</h1>
  </div>
);

//random gif function
const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {loading ? <img src={loader} className="block mx-auto" /> : hintText}
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: " ",
      hintText: "Type above. Hit Enter key to search",
      gif: null,
      //  where we store of gifs
      gifs: []
    };
  }
  //we can also write ASYNC methods into our components
  //that let us use the ASYNC/AWAIT style of funcs.
  searchGiphy = async searchTerm => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=N02XfqFWTaorgl6T6d3s0QII3nE89YDF&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
      );
      //here we convert our raw response into json data
      const { data } = await response.json();

      // here we grab a random result from our imgs
      const randomGif = randomChoice(data);

      console.log(randomGif);
      console.log(data.data);

      this.setState((prevState, props) => ({
        ...prevState,
        // rather than getting 1st result (data[0]) we want randoms
        gif: randomGif,
        //tajke our prev gifs and spread them out, then add our latest new gif in there
        gifs: [...prevState.gifs, randomGif]
      }));
    } catch (error) {}
  };

  // with create-react-app we can write our methods as arrow functions
  // meaning we don't need CONSTRUCTOR and BIND
  handleChange = event => {
    // const value = event.target.value
    const { value } = event.target;
    console.log(value);
    this.setState((prevState, props) => ({
      // we take our old props and spread them out here
      ...prevState,
      // and then overwrite them with the ones we want
      searchTerm: value,
      // we set the hint text only when we have more than 2 characters, otherwise it'll just me a blank string
      hintText: value.length > 2 ? `HIT ENTER TO SEARCH ${value}` : " "
    }));
    if (value.length > 2) {
      console.log("this is a valid search term");
    }
  };

  handleKeyPress = event => {
    // to see value of key pressed
    console.log(event.key);

    const { value } = event.target;

    if (value.length > 2 && event.key === "Enter") {
      this.searchGiphy(value);
    }
  };

  render() {
    // const searchTerm = this.state.searchTerm
    const { searchTerm, gif } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/*to get 1 video to show, but we will do several videos below
          {gif && (
            <video
              className="grid-item video"
              autoPlay
              loop
              src={gif.images.original.mp4}
            />
          )}*/}

          {/*CREATING/LAYERING LOTS OF VIDEOS, we loop over our arr of gifs from state*/}
          {this.state.gifs.map(gif => <Gif {...gif} />)}

          {/*our stack of images*/}
          <input
            onChange={this.handleChange}
            className="input grid-item"
            placeholder="type something"
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        {/*here we pass our UserHint all of our state using a spread*/}
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
