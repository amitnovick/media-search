import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./App.module.scss";
import ItemModal from "./ItemModal/ItemModal";
import DropdownSelect from "./DropdownSelect/DropdownSelect";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: {
        1478348234: {
          imageUrl:
            "https://is3-ssl.mzstatic.com/image/thumb/Video123/v4/4f/7e/21/4f7e21a1-f172-1ad8-268a-d3754b664842/source/600x600bb.jpg",
          trackName: "Circles",
          artistName: "Post Malone",
          previewUrl:
            "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/cb/03/19/cb031939-36c4-7542-af33-a64169be4c8c/mzaf_1558272479967123968.plus.aac.p.m4a",
          //"https://video-ssl.itunes.apple.com/itunes-assets/Video123/v4/16/e9/79/16e979ba-03ad-2ec1-dd92-aa9cf0459b95/mzvf_899078771603073976.640x358.h264lc.U.p.m4v",
          trackType: "audio" // 'video' | 'audio'
        }
      },
      previousSearches: {
        circles: 2,
        "post malone": 3,
        Halsey: 1
      },
      sortedSearchTerms: ["post malone", "circles", "halsey"],
      term: "",
      isAwaitingResponse: false,
      displayedTrackIds: Array(25).fill(1478348234), // the value 1478348234 is the trackId for Post Malone's Circles track
      isModalOpen: false,
      modalTrackId: null
    };
  }

  fetchData = term => {
    const ENDPOINT_URL = "https://itunes.apple.com";
    console.log("fetching...");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  submitTerm = async optionalTerm => {
    console.log("optionalTerm:", optionalTerm);
    if (!this.state.isAwaitingResponse) {
      const term = optionalTerm !== undefined ? optionalTerm : this.state.term;
      this.setState({ isAwaitingResponse: true, term: term });
      await this.fetchData(term);
      this.setState(previousState => {
        const updatedPreviousSearches = {
          ...previousState.previousSearches,
          [term]:
            term in previousState.previousSearches
              ? previousState.previousSearches[term] + 1
              : 1
        };
        const updatedSortedSearchTerms = Object.entries(updatedPreviousSearches)
          .sort(
            ([_, occurrencesA], [__, occurrencesB]) =>
              occurrencesB - occurrencesA
          )
          .map(([term]) => term); // Descending order, i.e. most frequent search term is first
        return {
          ...previousState,
          isAwaitingResponse: false,
          previousSearches: updatedPreviousSearches,
          sortedSearchTerms: updatedSortedSearchTerms
        };
      });
    }
  };

  render() {
    const {
      displayedTrackIds,
      tracks,
      sortedSearchTerms,
      isModalOpen,
      isAwaitingResponse,
      modalTrackId,
      term
    } = this.state;

    console.log("sortedSearchTerms:", sortedSearchTerms);
    console.log("previousSearches:", this.state.previousSearches);
    return (
      <div className={styles["background"]}>
        <div className={styles["container"]}>
          <div className={styles["search-bar"]}>
            <DropdownSelect
              items={sortedSearchTerms}
              onSelect={term => this.submitTerm(term)}
            />
            <input
              type="text"
              value={term}
              onChange={({ target }) => this.setState({ term: target.value })}
              className={styles["input"]}
              placeholder="Search iTunes..."
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  this.submitTerm();
                }
              }}
              data-loading={isAwaitingResponse ? "" : undefined}
            />
            <button
              className={styles["search-button"]}
              onClick={() => this.submitTerm()}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className={styles["tracks"]}>
            {displayedTrackIds.map((trackId, index) => {
              const { imageUrl, trackName, artistName } = tracks[trackId];

              return (
                <div
                  className={styles["track-container"]}
                  key={index}
                  onClick={() => {
                    this.setState({ isModalOpen: true, modalTrackId: trackId });
                  }}
                >
                  <img
                    className={styles["track-image"]}
                    src={imageUrl}
                    alt="artwork"
                  />
                  <h2
                    className={styles["track-title"]}
                  >{`${artistName} - ${trackName}`}</h2>
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
