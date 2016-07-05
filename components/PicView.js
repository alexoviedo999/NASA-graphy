import React, { Component } from 'react';
import { Container, Panel } from 'muicss/react';

let PicView = (props) => {
  const {pic} = props;

  console.log('picviewProps', props);
  return (
    <div>
      <Container>
        <Panel
          className={pic.pic.id ? 'showPanel' : 'hidePanel'}
          style={{position: 'relative', backgroundColor: 'transparent', border: '2px solid #2196F3', padding: '15px 25px'}}>
          <h2>{pic.pic.title}</h2>
          <img
            style={{margin: '10px'}}
            src={'https://farm' + pic.pic.farm + '.staticflickr.com/' + pic.pic.server + '/' + pic.pic.id + '_' + pic.pic.secret + '_b' + '.jpg'} />
        </Panel>
        <Panel
          className={pic.pic.id ? 'hidePanel' : 'showPanel'}
          style={{backgroundColor: 'transparent', color: '#2196F3', textAlign: 'center', marginTop: '30px', fontSize: '30px'}}>Please search and select a photograph to view.
        </Panel>
      </Container>
    </div>
  )};

  export default PicView;
