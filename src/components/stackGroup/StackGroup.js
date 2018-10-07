import React from 'react';
import { Stack } from '@flatland/chokhmah';
import uuid from 'uuid/v4';

const StackGroup = (props) => (
  <React.Fragment>
    {
      props.contents.map((content, idx) => (
        <Stack
          title={content.title || ''}
          content={content.content}
          key={`stack-${idx}-${uuid}`}
          action={content.action}
          list={content.lists}
        />
      ))
    }
  </React.Fragment>
);

export default StackGroup;
