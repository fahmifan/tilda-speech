import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'

import prep1 from './intro/prep1.png'
import prep2 from './intro/prep2.png'
import prep3 from './intro/prep3.png'

const Card = styled.div`
  min-width: 300px;
  min-height: 500px;
  background: url(${props => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  margin: 32px;
  margin-top: 8px;
`

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
`

class IntroPage extends React.Component {
  render() {
    return (
      <Container>
        <Card bg={prep1}/>
        <Card bg={prep2}/>
        <Card bg={prep3} onClick={() => this.props.history.replace('/start-challenge')} />
      </Container>
    );
  }
}

export default withRouter(IntroPage);