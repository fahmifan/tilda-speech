import React, { Component } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PointPage from './PointPage';
import Challenge from './Challenge';

const color = {
  primary: '#FCB316',
  secondary: '#005188',
  secDark: '#1F3C74',
}

const AppBar = styled.div`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  background: ${color.secDark};

  display: flex;
  align-items: center;
  padding-left: 8px;

  span {
    font-weight: bold;
    color: white;
    font-size: 1em;
  }
`
const Header = styled.div`
  width: 100%;
`
const Shell = styled.div`
  width: 100%;
  min-height: 100vh;
`

if (!('webkitSpeechRecognition' in window)) {
  // eslint-disable-next-line no-undef
  upgrade();
  alert('no web kit?');
}

const initCountDown = 60;

class App extends Component {
  state = {
    speech: '',
    dialogCount: 0,
    countDown: initCountDown,
    isCountStart: false,
    // eslint-disable-next-line no-undef
    recognition: new webkitSpeechRecognition(),
  }

  render() {
    const { countDown, isCountStart } = this.state;

    if (isCountStart) {
      if (countDown > 0) {
        setTimeout(() => {
          this.setState({ countDown: countDown-1 })
        },1000)
      } else {
        this.handleStop();
      }
    }

    return (
      <Router>
        <Shell>
          <Header>
            <AppBar>
              <span>TSCDC-UNPAD</span>
            </AppBar>
            <Route path='/your-point' component={PointPage} />
            <Route path='/' exact component={Challenge} />
          </Header>
        </Shell>    
      </Router>
    );
  }
}

export default App;
