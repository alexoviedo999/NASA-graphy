import React, { Component } from 'react';
import { Container, Panel, Button, Row, Col } from 'muicss/react';

let PicResults = (props) => {
    const {picResults} = props;

    const http = 'https://farm'

    return (
      <Container style={{marginTop: '30px'}}>
          <div className="mui--text-center">
            <Row style={{display: 'block'}}>{picResults.map((pic, i) => <Col lg="4" md="6" sm="12" xs="12" key={i} style={{height: '400px', marginBottem: '10px'}}>

              <Panel style={{position: 'relative', height: '390px'}}>
              <p>{ pic.title }</p>
              <img style={{margin: '10px'}} src={ 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '_m' + '.jpg'} />
              <div className="viewButton" style={{bottom: '10', width: '100%', height: '50px'}}>
                <Button variant="raised">View</Button>
              </div>
              </Panel>
              </Col>)}
            </Row>
          </div>
      </Container>
    )};

export default PicResults;
