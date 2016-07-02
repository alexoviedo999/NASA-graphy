import React, { Component } from 'react';
import { Container, Panel } from 'muicss/react';
import {
  Appbar,
  Input,
  Button
} from 'muicss/react';
import PicResults from './picResults.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picRequest: {
          tags: ''
      },
      picResults: []
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(value) {
    //set student state
    this.setState({
      picRequest: {
        ...this.state.picRequest,
        tags: value
      }
    });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const { picRequest } = this.state;

    //api post
    const fetchResult = fetch('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=3cfc5214b8dce09b084ad6ba57799de2&user_id=24662369@N07&nojsoncallback=1&format=json&per_page=10&tags=' + picRequest.tag)
      .then(function (response) {
          console.log('response', response);
          return response.json();
      })
      .then((body) => {
          console.log('success', body.photos.photo);
          this.setState({picResults:body.photos.photo})
      })
      .catch (function (error) {
        console.log('request failed', error);
      });
  }

  render () {
    const { picRequest, picResults } = this.state;

    return (
      <div>
        <Container style={{maxWidth: '600px', marginTop: '30px'}}>
          <h3>NASA Photography</h3>
          <Panel>
            <div className="mui--text-center">
              <Input type="text"
                label='Search NASA Pics by "tag"'
                floatingLabel={true}
                required={true}
                value={picRequest.tag}
                onChange={(e) => this.handleUpdate(e.target.value)}
                />
              <Button
                variant="raised"
                type="submit"
                onClick={e => this.handleSearchSubmit(e)}>Send
              </Button>
            </div>
          </Panel>
        </Container>
        <PicResults picResults={picResults}/>
      </div>)
    }
  }


export
default App;
