import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

const Video = (props) => {
  return (
    <>
      <div className="home-jumbo-video-container">
        <video
          muted
          autoPlay
          loop
          src="https://firebasestorage.googleapis.com/v0/b/flatland-api.appspot.com/o/Flatland%20Web%20Video.mp4?alt=media&token=27c1cb44-db1c-4150-8cd7-be5ea4da2d75"
        />
      </div>
      <LazyLoadImage
        alt={props.callout}
        src={props.image}
        effect="blur"
        scrollPosition={props.scrollPosition}
      />
    </>
  );
};


export default Video;
