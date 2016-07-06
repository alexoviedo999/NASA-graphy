import React, { Component } from 'react';
import {
  Appbar,
  Input,
  Button,
  Container,
  Panel,
  Form
} from 'muicss/react';
import PicResults from './picResults';
import PicView from './PicView';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      picRequest: {
          tags: ''
      },
      picResults: [],
      picView: {
        pic: ''
      },
      toggleView: 0,
      resultStatus: true
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handlePicView = this.handlePicView.bind(this);
  }

  handleUpdate (value) {
    this.setState({
      picRequest: {
        ...this.state.picRequest,
        tags: value
      }
    });
  }

  handlePicView (pic) {
    console.log('picView', pic);
    this.setState({
      picView: {
        ...this.state.picView,
        pic: pic
      },
      toggleView: 1
    });
  }

  handleSearchView (pic) {
    console.log('picView', pic);
    this.setState({
      toggleView: 0
    });
  }

  handleSearchSubmit (e) {
    e.preventDefault();
    const { picRequest } = this.state;
    const fetchResult = fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3cfc5214b8dce09b084ad6ba57799de2&user_id=24662369@N07&tags=' + picRequest.tags + '&per_page=12&sort=relevance&format=json&nojsoncallback=1')
      .then(function (response) {
          console.log('response', response);
          return response.json();
      })
      .then((body) => {
          console.log('success', body.photos.photo);
          let resultStatus = body.photos.photo.length ? true : false;
          this.setState({
            picResults: body.photos.photo,
            toggleView: 0,
            resultStatus: resultStatus
          });
      })
      .catch(function (error) {
        console.log('request failed', error);
      });
  }

  render () {
    const {
      picRequest,
      picResults,
      picView,
      toggleView,
      resultStatus
    } = this.state;
    let contents;

    // Conditional for managing pic results vs. single pic view vs. no results
    if (toggleView) {
      contents = <div>
        <a onClick={e => this.handleSearchView(e)} style={{fontSize: '16px', display: 'block', textAlign: 'center'}}>Return to results</a>
        <PicView pic={picView} />
      </div>;
    } else {
      if (resultStatus) {
        contents = <PicResults picResults={picResults} handlePicView={this.handlePicView} />;
      } else {
        contents = <h3 style={{textAlign: 'center'}}>No results, please search again.</h3>;
      }
    }

    return (
      <div id="page-wrap">
        <Appbar
          style={{textAlign: 'center', fontSize: '44px', fontWeight: 'bold', padding: '10px 0px', backgroundColor: 'transparent', color: '#2196F3'}}
          className="mui--appbar-height">
          NASA-Graphy
        </Appbar>
          <Container style={{maxWidth: '600px', marginTop: '30px'}}>
            <Panel style={{background: 'rgba(255, 255, 255, .1)', border: 'solid 2px #2196F3'}}>
              <div
                className="mui--text-center"
                style={{backgroundColor: 'transparent'}}>
                <Form>
                  <Input type="text"
                    label='Search NASA flickr Pics by "tag"'
                    floatingLabel={true}
                    required={true}
                    value={picRequest.tag}
                    style={{color: '#999', borderBottom: '#2196F3 solid 2px'}}
                    onChange={(e) => this.handleUpdate(e.target.value)}
                    />
                  <Button
                    className="mui-btn--primary"
                    variant="raised"
                    type="submit"
                    onClick={e => this.handleSearchSubmit(e)}>Search
                  </Button>
                </Form>
              </div>
            </Panel>
          </Container>
          {contents}
      </div>);
    }
  }

export default App;
