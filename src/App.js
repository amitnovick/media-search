import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./App.module.scss";
import ItemModal from "./ItemModal/ItemModal";
import DropdownSelect from "./DropdownSelect/DropdownSelect";
import Axios from "axios";

const trackKinds = {
  /* iTunes Search API- `kind` values mapped to content types in the appp */
  "coached-audio": "audio",
  "feature-movie": "video",
  "music-video": "video",
  "podcast-episode": "audio",
  song: "audio",
  "tv-episode": "video"
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: {},
      previousSearches: {},
      sortedSearchTerms: [],
      term: "",
      isAwaitingResponse: false,
      displayedTrackIds: [],
      isModalOpen: false,
      modalTrackId: null
    };
  }

  fetchData = async term => {
    const ENDPOINT_URL = "https://itunes.apple.com/search";
    try {
      const {
        data: { results }
      } = await Axios.get(ENDPOINT_URL, {
        params: {
          term: term.replace(" ", "+"),
          country: "US",
          limit: 25
        }
      });
      const relevantResults = results.filter(
        result => result.kind in trackKinds
      );
      const tracks = relevantResults.reduce(
        (
          aggregate,
          { artworkUrl100, previewUrl, trackName, artistName, kind, trackId }
        ) => ({
          ...aggregate,
          [trackId]: {
            imageUrl: artworkUrl100.replace("100x100bb", "600x600bb"),
            trackName: trackName,
            artistName: artistName,
            previewUrl: previewUrl,
            trackType: trackKinds[kind] // 'video' | 'audio'
          }
        }),
        {}
      );
      this.setState({
        tracks: tracks,
        displayedTrackIds: Object.keys(tracks)
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  submitTerm = async optionalTerm => {
    if (!this.state.isAwaitingResponse) {
      const term = optionalTerm !== undefined ? optionalTerm : this.state.term;
      this.setState({ isAwaitingResponse: true, term: term });
      await this.fetchData(term);
      this.setState(previousState => {
        const updatedPreviousSearches =
          term.trim() !== ""
            ? {
                ...previousState.previousSearches,
                [term]:
                  term in previousState.previousSearches
                    ? previousState.previousSearches[term] + 1
                    : 1
              }
            : previousState.previousSearches;
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
          {isAwaitingResponse ? (
            <CircularProgress
              className={styles["spinner"]}
              variant="indeterminate"
            />
          ) : (
            <div className={styles["tracks"]}>
              {displayedTrackIds.map((trackId, index) => {
                const { imageUrl, trackName, artistName } = tracks[trackId];

                return (
                  <div
                    className={styles["track-container"]}
                    key={index}
                    onClick={() => {
                      this.setState({
                        isModalOpen: true,
                        modalTrackId: trackId
                      });
                    }}
                  >
                    <img
                      className={styles["track-image"]}
                      src={imageUrl}
                      alt="artwork"
                      data-active={
                        isModalOpen && String(trackId) === String(modalTrackId)
                          ? ""
                          : undefined
                      }
                    />
                    <h2
                      className={styles["track-title"]}
                    >{`${artistName} - ${trackName}`}</h2>
                  </div>
                );
              })}
            </div>
          )}
          {isModalOpen ? (
            <ItemModal
              isModalOpen={isModalOpen}
              closeModal={() => {
                this.setState({ isModalOpen: false });
              }}
              track={
                isModalOpen && modalTrackId != null
                  ? tracks[modalTrackId]
                  : null
              }
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
