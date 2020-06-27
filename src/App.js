import React, { Component } from 'react';
import Table from './Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
class App extends Component {
  state = {
    loader: true,
    data: null,
    filteredData: null,
    error: false,
    errorMessage: null,
    user: null,
    repos: '',
    filteredRepos: '',
    selectedType: '',
  };

  async componentDidMount() {
    this.setState({
      loader: true,
    });

    try {
      const response = await fetch(
        'https://api.github.com/users/supreetsingh247/repos',
      );
      const data = await response.json();
      console.log({ data });
      this.setState({
        loader: false,
        repos: data,
        filteredRepos: data,
      });
    } catch (e) {}

    try {
      const response = await fetch(
        'https://api.github.com/users/supreetsingh247',
      );
      const data = await response.json();
      console.log(data);
      this.setState({
        loader: false,
        user: data,
      });
    } catch (error) {
      this.setState({
        loader: false,
        error: true,
        errorMessage: error.message,
      });
    }
  }

  setSelected = e => {
    const {
      target: { value },
    } = e;
    console.log(value);
    this.setState({ selectedType: value }, () => this.fetchRepos());
  };

  fetchRepos = () => {
    let data;
    try {
      const response = fetch(
        'https://api.github.com/users/supreetsingh247?type=' +
          this.state.selectedType,
      )
        .then(response => response.json())
        .then(data =>
          this.setState({
            loader: false,
            user: data,
          }),
        );
    } catch (error) {
      this.setState({
        loader: false,
        error: true,
        errorMessage: error.message,
      });
    }
  };

  _handleChange = e => {
    const {
      target: { value },
    } = e;
    const { repos } = this.state;
    if (!value) {
      this.setState({
        repos: { ...this.state.repos },
      });
    } else {
      const searchedRepo = repos.filter(repo => {
        // Do Lower Case Comparision
        if (!repo.name.toLowerCase().indexOf(value.toLowerCase())) {
          return repo;
        }
      });
      this.setState({
        filteredRepos: searchedRepo,
      });
    }
  };

  render() {
    const { loader, user, error, errorMessage, filteredRepos } = this.state;
    return (
      <>
        {error && <span>{errorMessage}</span>}
        {loader && <span>Loading</span>}
        {filteredRepos && user && (
          <>
            <Container>
              <Row>
                <Col xs={4}>
                  <Container>
                    <div className="userdata">
                      <Row>
                        <img src={this.state.user?.avatar_url}></img>
                      </Row>
                      <Row>
                        <div>{this.state.user?.name}</div>
                      </Row>
                      <Row>{this.state.user?.bio}</Row>
                      <Row>
                        <div>{this.state.user?.company}</div>
                      </Row>
                      <Row>
                        <div>{this.state.user?.location}</div>
                      </Row>
                      <Row>
                        <div>{this.state.user?.email}</div>
                      </Row>
                    </div>
                  </Container>
                </Col>
                <Col xs={8}>
                  <div className="border">
                    <input type="text" onChange={this._handleChange} />
                    <select name="type" id="type" onChange={this.setSelected}>
                      <option value="all" selected>
                        Type:All
                      </option>
                      <option value="public">Type:Public</option>
                      <option value="private">Type:Private</option>
                      <option value="source">Type:Sources</option>
                      <option value="fork">Type:Forks</option>
                    </select>
                  </div>
                  {filteredRepos?.length === 0 && <div>No data Found</div>}
                  <Table rowData={filteredRepos} />
                </Col>
              </Row>
            </Container>
          </>
        )}
      </>
    );
  }
}

export default App;
