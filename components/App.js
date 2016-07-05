import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Appbar,
  Input,
  Button,
  Container,
  Panel
} from 'muicss/react';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import PicResults from './picResults';
import PicView from './PicView';
import { browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picRequest: {
          tags: ''
      },
      picResults: [],
      picView: {
        pic: '',
        selectedTab: 0
      },
      selectedTab: 0
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handlePicView = this.handlePicView.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  handleUpdate (value) {
    //set student state
    this.setState({
      picRequest: {
        ...this.state.picRequest,
        tags: value
      }
    });
  }

  onTabChange (i, value, tab, ev) {
    console.log('tabs', arguments);
// debugger;
    console.log('select', this.state.picView.selectedTab);
    this.setState({
      picView: {
        ...this.state.picView,
        selectedTab: 1
      }
    });
  }

  handlePicView (pic) {
    // debugger;
    console.log('picView', pic);
    this.setState({
      picView: {
        ...this.state.picView,
        pic: pic,
        selectedTab: 1
      }
    });
  }

  handleSearchSubmit (e) {
    e.preventDefault();
    const { picRequest } = this.state;
// debugger;

    const fetchResult = fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3cfc5214b8dce09b084ad6ba57799de2&user_id=24662369@N07&tags=' + picRequest.tags + '&per_page=12&sort=relevance&format=json&nojsoncallback=1')
      .then(function (response) {
          console.log('response', response);
          return response.json();
      })
      .then((body) => {
          console.log('success', body.photos.photo);
          this.setState({picResults: body.photos.photo});
      })
      .catch(function (error) {
        console.log('request failed', error);
      });
  }

  render () {
    const { picRequest, picResults, picView } = this.state;
    var selectedTab = picView.selectedTab;
// debugger;
    return (
      <div id="page-wrap">
        <Appbar
          style={{textAlign: 'center', fontSize: '40px', padding: '10px 0px', backgroundColor: 'transparent', color: '#2196F3'}}
          className="mui--appbar-height"
            >NASA-Graphy
        </Appbar>
        <Tabs onSelect={this.onTabChange} initialSelectedIndex={0}
         value={this.state.picView.selectedTab} justified={true} style={{marginTop: '50px'}}>
          <Tab
            className="tab1"
            value="pane-1"
            label="Search Tab"
            onActive={this.onActive}>
            <Container style={{maxWidth: '600px', marginTop: '30px'}}>
              <Panel style={{background: 'rgba(255, 255, 255, .1)', border: 'solid 2px #2196F3'}}>
                <div
                  className="mui--text-center"
                  style={{backgroundColor: 'transparent'}}>
                  <Input type="text"
                    label='Search NASA Pics by "tag"'
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
                </div>
              </Panel>
            </Container>
            <PicResults picResults={picResults} handlePicView={this.handlePicView}/>
          </Tab>
          <Tab className="tab2" value="pane-2" label="View Selected Pic">
            <PicView pic={picView}/>
          </Tab>
        </Tabs>
      </div>);
    }
  }


export
default App;
