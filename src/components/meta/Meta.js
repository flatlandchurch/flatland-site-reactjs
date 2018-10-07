import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Meta = ({ data }) => {
    const title = `${data.title} | Flatland Church`;
    return (
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={data.canonical} />
          <meta name="description" content={data.description} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={data.description} />
          <meta name="twitter:image" content={data.image} />
          <meta property="og:url" content={data.canonical} />
          <meta property="og:description" content={data.description} />
          <meta property="og:image" content={data.image} />
          <meta property="og:title" content={title} />
        </Helmet>
    );
};

Meta.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Meta;