import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.scss";
import ItemModal from "./ItemModal/ItemModal";

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
          artistName: "Post Malone",
          previewUrl:
            "https://video-ssl.itunes.apple.com/itunes-assets/Video123/v4/16/e9/79/16e979ba-03ad-2ec1-dd92-aa9cf0459b95/mzvf_899078771603073976.640x358.h264lc.U.p.m4v",
          trackType: "video" // 'video' | 'audio'
        }
      },
      displayedTrackIds: Array(25).fill(1478348234), // the value 1478348234 is the trackId for Post Malone's Circles track
      isModalOpen: false,
      modalTrackId: null
    };
  }

  fetchData = () => {
    const ENDPOINT_URL = "https://itunes.apple.com";
    console.log("fetching...");
  };

  render() {
    const {
      isTopTenActive,
      displayedTrackIds,
      tracks,
      isModalOpen,
      modalTrackId
    } = this.state;
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
            {displayedTrackIds.map((trackId, index) => {
              const { imageUrl, trackName, artistName } = tracks[trackId];

              return (
                <div
                  className="track-container"
                  key={index}
                  onClick={() => {
                    this.setState({ isModalOpen: true, modalTrackId: trackId });
                  }}
                >
                  <img className="track-image" src={imageUrl} alt="artwork" />
                  <h2 className="track-title">{`${artistName} - ${trackName}`}</h2>
                </div>
              );
            })}
          </div>
          <ItemModal
            isModalOpen={isModalOpen}
            closeModal={() => {
              this.setState({ isModalOpen: false });
            }}
            track={
              isModalOpen && modalTrackId != null ? tracks[modalTrackId] : null
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
