import React from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const styles = {
  paper: {
    padding: 10,
    marginBottom: 10
  }
}

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
      showLoading: this.props.showLoading,
      error: this.props.error
    }
  }

  getPostsFromProps(props = this.props) {
    this.setState({
      posts: props.posts,
      showLoading: props.showLoading,
      error: this.props.error
    })
  }

  componentDidMount() {
    this.getPostsFromProps();
  }

  componentWillReceiveProps(nextProps) {
    this.getPostsFromProps(nextProps);
  }
  

  renderPosts() {
    if ( this.state.error ) {
      return <p>There was a problem...</p>
    }

    if ( !this.state.posts || this.state.posts.length === 0 || this.state.showLoading ) {
      return <Spinner />
    }

    return this.state.posts.map((post, index) => {
      return (
        <div className="col-12" key={index}>
          <Link to={`/post/${post.data.name}`} style={{ textDecoration: 'none' }}>
            <Paper elevation={1} square={true} rounded={0} style={styles.paper}>
              <small>Posted by {post.data.author}</small>
              <h5>{ post.data.title }</h5>
              <p>{ post.data.selftext }</p>
            </Paper>
          </Link>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="row">
        { this.renderPosts() }
      </div>
    )
  }
}

export default withStyles(styles)(Posts);