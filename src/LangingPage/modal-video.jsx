import React, { useState, useRef } from 'react';

function ModalVideo({ thumb, thumbWidth, thumbHeight, thumbAlt, video, videoWidth, videoHeight }) {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);

  // Function to open the modal and play the video
  const openModal = () => {
    setModalOpen(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Function to close the modal and pause the video
  const closeModal = () => {
    setModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div>
      {/* Video thumbnail */}
      <div>
        <div className="relative flex justify-center items-center" data-aos="fade-up" data-aos-delay="200">
          {/* Use the img tag */}
          <img src={thumb} width={thumbWidth} height={thumbHeight} alt={thumbAlt} />
          {/* Play button */}
          <button className="absolute group" onClick={openModal} aria-label="Watch the video">
            {/* Your SVG icon for play button */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18l13-9L5 3z" />
            </svg>
          </button>
        </div>
      </div>
      {/* End: Video thumbnail */}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative">
            <button className="absolute top-4 right-4 text-white" onClick={closeModal} aria-label="Close modal">
              {/* Close button */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video ref={videoRef} width={videoWidth} height={videoHeight} loop controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalVideo;
