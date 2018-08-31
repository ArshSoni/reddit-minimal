import React, { Component } from 'react';
import { fetchReddit } from './Components/API';
import Posts from './Components/Posts';
import Post from './Components/Post';
import Search from './Components/Search';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      posts: [],
      showPostLoading: false,
      searchTerm: 'frontend',
      error: ''
    }
  }

  componentDidMount() {
    fetchReddit(this.state.searchTerm).then(res => {
      this.setState({ 
        data: res, 
        posts: res.data.children,
        error: null
      });
    })
  }

  handleSearchKeyPress(e) {
    if ( e.key.toLowerCase() === 'enter' ) {
      const { value } = e.target;
      if ( !value ) {
        return false;
        this.setState({
          showPostLoading: false
        })
      }

      this.props.history.push('/');

      this.setState({
        showPostLoading: true ,
        searchTerm: value
      }, () => {
        fetchReddit(value).then(res => {
          if ( res.error ) {
            this.setState({
              error: res.error ,
              showPostLoading: false
            })
          } else {
            this.setState({
              data: res,
              posts: res.data.children,
              showPostLoading: false,
              error: null
            })
          }
        })
      })

    }
  }

  handleSearchTyping(e) {
    this.setState({ 
      searchTerm: e.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static" style={{ marginBottom: 30, position: 'relative', backgroundColor: '#2196f3' }}>
          <div className="container">
            <div className="row">
              <div className="col-auto">
                <Link to="/">
                  <img src="/reddit-logo.png" style={{ width: 50, position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                </Link>
              </div>
              <div className="col">
                <Toolbar style={{ padding: 0, width: '100%' }}>
                  <Search
                    type="text"
                    placeholder="Search for subreddit"
                    onKeyPress={this.handleSearchKeyPress.bind(this)}
                    style={{ width: '100%', padding: 8, height: 40, backgroundColor: '#1E88E5', outline: 'none', color: 'white', borderRadius: 4, border: 0, '::placeholder': 'gray'}}
                    value={this.state.searchTerm}
                    onChange={this.handleSearchTyping.bind(this)}
                  />
                </Toolbar>
              </div>
            </div>
          </div>
        </AppBar>

        <div className="container">
          <p>Results for "<b>{this.state.searchTerm}</b>"</p>
          <Switch>
            <Route exact path="/" render={() => {
              return <Posts 
                        posts={this.state.posts} 
                        showLoading={this.state.showPostLoading}
                        error={this.state.error}
                      />
            }} />
            <Route exact path="/post/:postName" render={props => {
              return <Post {...props} 
                post={this.state.posts.filter(item => item.data.name === props.match.params.postName)[0]}
              />
            }} />
          </Switch>
        </div>
      </React.Fragment>

    )
  }
}

export default withRouter(App);
