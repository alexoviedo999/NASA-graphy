import React, { Component } from 'react';
import { Container, Panel } from 'muicss/react';
import { Button } from 'muicss/react';

let PicResults = (props) => {
    const {picResults} = props;

    const http = 'https://farm'

    return (
      <Container style={{marginTop: '30px'}}>
        <Panel>
          <div className="mui--text-center">
            <ul>{picResults.map((pic, i) => <li key={i}>
              <Button variant="raised">View</Button>
              <h5>{ pic.title }</h5>
              <img src={ 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg'} />
              </li>)}
            </ul>
          </div>
        </Panel>
      </Container>
    )};

export default PicResults;
