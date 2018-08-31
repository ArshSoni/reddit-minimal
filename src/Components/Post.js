import React from 'react'
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const post = this.props.post;

    if ( !post ) {
      return null;
    }
    
    return (
      <div className="post">
       {
         <React.Fragment>
          <Link to="/">Back</Link>
          
          <article>
            <p>
              <small>Posted by {post.data.author}</small>
            </p>
            <Typography component="h4" variant="headline">{ post.data.title }</Typography>

          </article>
          
         </React.Fragment>
       }
      </div>
    )
  }
}

export default Post;