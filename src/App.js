import React from "react";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTopTenActive: false
    };
  }

  fetchData = () => {
    const ENDPOINT_URL = "https://itunes.apple.com";
  };

  render() {
    const { isTopTenActive } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="search-bar">
            <button
              className="top-ten-button"
              {...{ "data-active": isTopTenActive ? true : undefined }}
              onClick={() => {
                this.setState(previousState => ({
                  ...previousState,
                  isTopTenActive: !previousState.isTopTenActive
                }));
              }}
            >
              Top 10
            </button>
            <input
              type="text"
              className="input"
              placeholder="Search iTunes for media..."
            />
          </div>
          <div
            className="horizontal-list-box"
            {...{ "data-active": isTopTenActive ? true : undefined }}
          >
            <ol>
              <li>one</li>
              <li>two</li>
              <li>three</li>
              <li>four</li>
              <li>five</li>
              <li>six</li>
              <li>seven</li>
              <li>eight</li>
              <li>nine</li>
              <li>ten</li>
              <li>eleven</li>
              <li>twelve</li>
              <li>one</li>
              <li>two</li>
              <li>three</li>
              <li>four</li>
              <li>five</li>
              <li>six</li>
              <li>seven</li>
              <li>eight</li>
              <li>nine</li>
              <li>ten</li>
              <li>eleven</li>
              <li>twelve</li>
            </ol>
          </div>
          <button className="search-button" onClick={() => this.fetchData()}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default App;
