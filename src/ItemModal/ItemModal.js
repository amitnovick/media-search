import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)"
  }
};

class ItemModal extends React.PureComponent {
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    console.log("after opened modal triggered");
  };

  render() {
    const { isModalOpen, closeModal, track } = this.props;
    return (
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className={styles["close-button"]} onClick={closeModal}>
          ×
        </button>

        {track !== null ? (
          <>
            <h2 className={styles["header"]}>{`${track.artistName} - ${
              track.trackName
            }`}</h2>
            <img
              className={styles["track-image"]}
              src={track.imageUrl}
              alt="artwork"
            />
            <details>
              <summary>Preview</summary>

              {track.trackType === "video" ? (
                <video controls className={styles["video"]}>
                  <source src={track.previewUrl} type="video/mp4" />
                  Sorry, your browser doesn't support embedded videos.
                </video>
              ) : null}
              {track.trackType === "audio" ? (
                <audio controls>
                  <source src={track.previewUrl} type="audio/mpeg" />
                  Sorry, your browser doesn't support embedded audios.
                </audio>
              ) : null}
            </details>
          </>
        ) : null}
      </Modal>
    );
  }
}

ItemModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  track: PropTypes.object
};

export default ItemModal;
