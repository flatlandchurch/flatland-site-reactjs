import React from 'react';
import { VideoStack } from '@flatland/chokhmah';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const VideoStackGroup = (props) => (
  <React.Fragment>
    {
      props.contents.map((content, idx) => (
        <VideoStack
          {...content}
          title={content.title || ''}
          key={`stack-${idx}-${uuid}`}
          videoId={content.videoId.toString()}
        />
      ))
    }
  </React.Fragment>
);

VideoStackGroup.propTypes = {
  contents: PropTypes.array.isRequired,
};

export default VideoStackGroup;
