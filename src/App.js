import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTopTenActive: false,
      tracks: {
        1478348234: {
          imageUrl:
            "https://is3-ssl.mzstatic.com/image/thumb/Video123/v4/4f/7e/21/4f7e21a1-f172-1ad8-268a-d3754b664842/source/600x600bb.jpg",
          trackName: "Circles",
          artistName: "Post Malone"
        }
      },
      displayedTrackIds: Array(25).fill(1478348234) // the value 1478348234 is the trackId for Post Malone's Circles track
    };
  }

  fetchData = () => {
    const ENDPOINT_URL = "https://itunes.apple.com";
    console.log("fetching...");
  };

  render() {
    const { isTopTenActive, displayedTrackIds, tracks } = this.state;
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
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  this.fetchData();
                }
              }}
            />
            <button className="search-button" onClick={() => this.fetchData()}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
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
          <div className="tracks">
            {displayedTrackIds.map((trackId, index) => (
              <div className="track-container" key={index}>
                <img
                  className="track-image"
                  src={tracks[trackId].imageUrl}
                  alt="artwork"
                />
                <h2 className="track-title">{`${tracks[trackId].artistName} - ${
                  tracks[trackId].trackName
                }`}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
