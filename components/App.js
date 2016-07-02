import React, { Component } from 'react';
import { Container, Panel } from 'muicss/react';
import {
  Appbar,
  Input,
  Button
} from 'muicss/react';

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

  render() {
    const { picRequest } = this.state;
    let input;

    return (
      <div>
        <Container style={{maxWidth: '600px', marginTop: '30px'}}>
          <Panel>
            <h3>NASA Photography</h3>
          </Panel>
        </Container>
      </div>
    );
  }
}


export
default App;
