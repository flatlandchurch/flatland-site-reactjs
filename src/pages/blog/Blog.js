import React from 'react';
import {
  PageCard,
  Jumbotron,
  PageNavigation,
  ImageCard,
  Button,
  TextField,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';
import Modal from 'react-aria-modal';

import './Blog.css';

import Meta from '../../components/meta';
import api from '../../utils/api';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false,
      email: '',
      sending: false,
      subscribed: false,
    };
  }

  handleChange = (field) => (value) => {
    this.setState({ [field]: value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.toggleModal();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ sending: true });
    api.post('forms/9348002c-b7ce-4b27-ac20-42e34674b9ce', {
      email: this.state.email,
    })
      .then(() => {
        this.setState({
          sending: false,
          subscribed: true,
        });
      });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ modalActive: !prevState.modalActive }));
  };

  render() {
    const {
      data,
      loadMore,
      posts,
    } = this.props;

    return (
      <div className="page-wrapper">
        <Meta data={data.meta} />
        <Jumbotron
          title={data.callout || data.title}
          image={data.image}
        />
        <PageCard>
          {
            Boolean(data.navigation && data.navigation.length) &&
            <PageNavigation
              navItems={data.navigation.map((n) => Object.assign({}, n, { label: n.title }))}
              navActionButton={
                <Button
                  onClick={this.toggleModal}
                >
                  Subscribe
                </Button>
              }
            />
          }
          <div className="image-cards-card-body">
            {
              posts.map((post) => (
                <div className="image-cards-card-wrapper" key={post.permalink}>
                  <Link to={`/blog/${post.permalink}`}>
                    <ImageCard
                      title={post.title}
                      image={post.image}
                      alt={post.title}
                      tag={Object.keys(post.topics)[0]}
                    />
                  </Link>
                </div>
              ))
            }
          </div>
          <div className="card-body center-button">
            <Button context="black" onClick={loadMore}>Load More</Button>
          </div>
        </PageCard>
        {
          this.state.modalActive &&
            <Modal
              titleText="Fresh content delivered to your inbox daily."
              underlayStyle={{
                zIndex: 5000,
              }}
              onExit={this.toggleModal}
              verticallyCenter
            >
              <div className="subscribe-modal">
                <div
                  className="btn-x"
                  role="button"
                  tabIndex={0}
                  onClick={this.toggleModal}
                  onKeyDown={this.handleKeyDown}
                >
                  <span />
                  <span />
                </div>
                <div className="subscribe-row">
                  {
                    this.state.subscribed ?
                      <React.Fragment>
                        <h3>Done!</h3>
                        <p>We're so excited to share this with you. Daily content is on its way.</p>
                        <Button onClick={this.toggleModal}>Done</Button>
                      </React.Fragment> :
                      <React.Fragment>
                        <h3>Sign up for fresh content delivered to your inbox daily.</h3>
                        <form onSubmit={this.handleSubmit}>
                          <TextField
                            type="email"
                            label="Email"
                            onChange={this.handleChange('email')}
                            value={this.state.email}
                            required
                            disabled={this.state.sending}
                          />
                          <Button
                            context="primary"
                            disabled={this.state.sending}
                          >
                            Subscribe
                          </Button>
                        </form>
                      </React.Fragment>
                  }

                </div>
              </div>
            </Modal>
        }
      </div>
    );
  }
}

export default Blog;
