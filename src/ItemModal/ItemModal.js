import React from "react";
import Modal from "react-modal";

import "./styles.scss";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "70%",
    height: "70%",
    transform: "translate(-50%, -50%)"
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
        <button onClick={closeModal}>x</button>
        {track !== null ? (
          <>
            <img className="track-image" src={track.imageUrl} alt="artwork" />
            <h2>{track.trackName}</h2>
            <h3>by {track.artistName}</h3>
            {track.trackType === "video" ? (
              <video controls className="video">
                <source src={track.previewUrl} type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
              </video>
            ) : null}
          </>
        ) : null}
      </Modal>
    );
  }
}

export default ItemModal;
