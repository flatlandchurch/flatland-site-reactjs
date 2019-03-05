import React from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';

import api from '../../utils/api';
import Blog from './Blog';
import { setBlogData } from '../../modules/fetches';
import { setPageData } from '../../modules/pages';
import ValidPage from '../../utils/ValidPage';

const loadMore = (props) => async () => {
  const posts = await api.get('blog', { page: { offset: props.posts.length } });
  props.setBlogData([...props.posts, ...posts]);
};

const frontload = async (props) => {
  if (!props.data) {
		props.setPageData('blog', await api.get('pages/blog'));
  }

	props.setBlogData(await api.get('blog'));
};

const mapStateToProps = (state) => ({
  data: state.pages.blog,
  posts: state.fetches.posts,
});

const mapDispatchToProps = (dispatch) => ({
  setPageData: (key, data) => {
    dispatch(setPageData(key, data));
  },
  setBlogData: (data) => {
    dispatch(setBlogData(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false,
  })((props) => {
    return (
      <ValidPage
        checkKeys={['data', 'data.title', 'posts.length', 'data.meta']}
        props={props}
      >
        <Blog
          data={props.data}
          posts={props.posts}
          showLoadMore={!(props.posts % 12)}
          loadMore={loadMore(props)}
        />
      </ValidPage>
    );
  })
);
