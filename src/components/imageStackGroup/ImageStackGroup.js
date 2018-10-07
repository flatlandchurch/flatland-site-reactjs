import React from 'react';
import { ImageStack } from '@flatland/chokhmah';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

const ImageStackGroup = (props) => (
  <React.Fragment>
    {
      props.contents.map((content, idx) => (
        <ImageStack
          title={content.title || ''}
          content={content.content}
          key={`stack-${idx}-${uuid}`}
          action={content.action}
          image={content.image}
          square={props.square}
        />
      ))
    }
  </React.Fragment>
);

ImageStackGroup.propTypes = {
  contents: PropTypes.array.isRequired,
  square: PropTypes.bool,
};

ImageStackGroup.defaultProps = {
  square: false,
};

export default ImageStackGroup;
