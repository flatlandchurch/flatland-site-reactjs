import React from 'react';
import {
  PageCard,
  Jumbotron,
  PageNavigation,
  AttachmentCard,
  Carousel,
} from '@flatland/chokhmah';
import uuid from 'uuid/v4'

import StackGroup from '../../components/stackGroup';
import ImageStackGroup from '../../components/imageStackGroup';
import VideoStackGroup from '../../components/videoStackGroup';
import Form from '../../components/form';
import Location from '../../components/location';
import Meta from '../../components/meta';
import DynamicForm from '../../components/dynamicForm';

const Page = (props) => (
  <div className="page-wrapper">
    <Meta data={props.data.meta} />
    <Jumbotron
      title={props.data.callout || props.data.title}
      image={props.data.image}
    />
    <PageCard>
      {
        Boolean(props.data.navigation && props.data.navigation.length) &&
        <PageNavigation
          navItems={props.data.navigation.map((n) => Object.assign({}, n, { label: n.title }))}
        />
      }
      <div className="card-body">
        {
          Boolean(props.data.components.length) ?
            props.data.components.map((component, idx) => (
              <div key={`component-${idx}-${uuid}`}>
                {
                  (component.type === 'stack' || component.type === 'markdown') &&
                    <StackGroup contents={component.contents} />
                }
                {
                  component.type === 'image-stack' && component.subType !== 'carousel' &&
                    <ImageStackGroup contents={component.contents} square={component.subType === 'square'} />
                }
                {
                  component.type === 'form' &&
                    <Form form={component.contents[0]} />
                }
                {
                  component.type === 'location' &&
                    <Location />
                }
                {
                  component.type === 'video-stack' &&
                    <VideoStackGroup contents={component.contents} />
                }
                {
                  component.type === 'image-stack' && component.subType === 'carousel' &&
                    <Carousel contents={component.contents} />
                }
                {
                  component.type === 'dynamic-form' &&
                    <DynamicForm formId={component.formId} />
                }
              </div>
            )) :
            <p>{props.data.content}</p>
        }
        {
          props.data.attachments && Boolean(props.data.attachments.length) &&
            <React.Fragment>
              <h3>Downloads</h3>
              <div className="attachment-row">
                {
                  props.data.attachments.map((download) => (
                    <AttachmentCard
                      label={download.title}
                      fileSize={download.fileSize}
                      fileUrl={download.externalUrl}
                      key={download.externalUrl}
                    />
                  ))
                }
              </div>
            </React.Fragment>
        }
      </div>
    </PageCard>
  </div>
);

export default Page;
