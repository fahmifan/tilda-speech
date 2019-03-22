import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'

import imgEv1 from './photos/1.jpg';
import imgEv2 from './photos/2.jpg';

const color = {
  primary: '#FCB316',
  secondary: '#005188',
  secDark: '#1F3C74',
}

const Card = styled.div`
  background: ${color.secDark};
  color: white;
  font-weight: bold;
  padding: 16px;
  margin: 16px;
  margin-top: 30px;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
`
const PointBadge = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 150px;
  height: 150px;
  margin: auto;
  margin-bottom: 50px;
  box-shadow: 0px 0px 42px -13px rgba(0,0,0,0.20);
`
const EventImg = styled.div`
  background: ${props => `url(${props.imgURL})` || '#ccc'};
  background-size: cover;
  min-height: 50px;
  width: 100px;
  border-radius: 5px 5px 0 0;
`

const CardEvent = styled.div`
  display: block;
  width: 100px;
  font-size: 12px;
  margin: 8px;
  box-shadow: 20px 16px 50px -38px rgba(0,0,0,0.75);
`

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
  padding: 8px;
`

const CardsTiltle = styled.span`
  font-size: 24px;
`

class PointPage extends React.Component {
  state = {
    events: [
      {
        desc: 'Persiapkan dirimu untuk menghadapi test TOEFL',
        img: imgEv1,
      },
      {
        desc: 'Seminar Informatika IFEST mengusung tema Industri 4.0',
        img: imgEv2
      },
      {
        desc: 'Persiapkan dirimu untuk menghadapi test TOEFL',
        img: imgEv1
      },
      {
        desc: 'Seminar Informatika IFEST mengusung tema Industri 4.0',
        img: imgEv2
      }
    ]
  }

  componentDidMount() {
    this.props.handleStop();
  }

  render() {    
    return (
      <>
        <Card><span>YOUR POINT</span></Card>
        <PointBadge>
          <span style={{ color: color.primary, fontWeight: 'bold', textAlign: 'center', fontSize: '3em' }}>100</span>
        </PointBadge>

        <span style={{ fontSize: '18px', padding: '8px' }}>Unpad Closest Event</span> <br />
        <span style={{ padding: '8px', fontSize: '12px' }}>Click banner to get more info</span> <br />
        <Container>
            {
              this.state.events.map(ev => (
                <CardEvent>
                  <EventImg imgURL={ev.img} />
                  <span style={{ padding: '8px', }}>{ev.desc}</span>
                </CardEvent>
              ))
            }
        </Container>
      </>
    );
  }
}

export default withRouter(PointPage);