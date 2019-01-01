import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const CHATQUERY = gql`
  subscription {
    post {
      node {
        id
        title
        published
      }
      previousValues {
        id
        title
        published
      }
    }
  }`
  
/* What is this error?
"GraphQL error: Cannot return null for non-nullable field PostSubscriptionPayload.mutation."
 */

export const withChat = graphql(CHATQUERY, {
  options: (/* { episode } */) => ({
    // variables: { episode },
  }),
  props: ({ data }) => ({ ...data }),
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      chat: []
    }
  }
  static getDerivedStateFromProps(props, state){
    if (props.post) {
      state.chat.push(props.post.node.title)
      return {
        chat: state.chat
      }
    } else {
      return null
    }
  }
  render() {
    console.log('-------------------- (this.props)\n', this.props)
    console.log('-------------------- (this.state)\n', this.state)
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div className="App" style={{display: 'flex'}}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
        <div style={{display: 'flex', flexDirection: 'column',}}>
          <p>chat</p>
          <div>
            {this.state.chat.length > 0 ? 
              this.state.chat.map((ele, idx) => (
                <div key={'chat-'+idx}>{ele}</div>
              )) : 
              'there is no chatting history.'}
          </div>
        </div>
      </div>
    );
  }
}

export default withChat(App);
