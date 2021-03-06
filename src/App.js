import React, { Component } from "react";
// we imported our loader spinner as image, used down below
import loader from "./images/loader.svg";
import Gif from "./Gif";
import clearButton from "./images/close-icon.svg";

/*
const getData = async searchTerm => {
  try {
  } catch (error) {
    alert(error);
  }
};
*/

const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {/*if we have results, show clear button. otherwise, show the title at top! */}
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} />
      </button>
    ) : (
      <h1 className="title"> Giphy App</h1>
    )}
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
      loading: false,
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
    //here we set the loading state to be true and this will show spinner at the btm
    this.state = {
      loading: true
    };

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=N02XfqFWTaorgl6T6d3s0QII3nE89YDF&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`
      );
      //here we convert our raw response into json data
      const { data } = await response.json();

      // check if array of results is empty? if so, throw error that'll stop the code here and handle it in the catch area
      if (!data.length) {
        throw `nothing found here for ${searchTerm}`;
      }

      // here we grab a random result from our imgs
      const randomGif = randomChoice(data);

      console.log(randomGif);
      console.log(data.data);

      this.setState((prevState, props) => ({
        ...prevState,
        // rather than getting 1st result (data[0]) we want randoms
        gif: randomGif,
        //take our prev gifs and spread them out, then add our latest new gif in there
        gifs: [...prevState.gifs, randomGif],
        // we turn off the loading spinner again
        loading: false,
        hintText: `You can hit enter to see more ${searchTerm}`
      }));
    } catch (error) {
      this.setState((prevState, props) => ({
        hintText: error,
        loading: false
      }));
      console.log(error);
    }
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

  // Function to CLEAR search by RESETTING the state...
  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: "",
      hintText: "",
      gifs: []
    }));
    // here we grab the input THEN focus the cursor back into it (USING REFS)
    this.textInput.focus();
  };

  render() {
    // const searchTerm = this.state.searchTerm
    const { searchTerm, gif, gifs } = this.state;
    // here we set a var to see is we have any results
    const hasResults = gifs.length;

    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />

        <h1 onClick={this.clearSearch}>Clear Search</h1>
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
            ref={input => {
              this.textInput = input;
            }}
          />
        </div>
        {/*here we pass our UserHint all of our state using a spread*/}
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
