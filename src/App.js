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
  };

  async componentDidMount() {
    this.setState({
      loader: true,
    });
    try {
      const response = await fetch(
        'https://www.mocky.io/v2/5d639f263200008500ba1c0e',
      );
      const data = await response.json();
      this.setState({
        loader: false,
        data: data.data.content,
        filteredData: data.data.content,
      });
    } catch (error) {
      this.setState({
        loader: false,
        error: true,
        errorMessage: error.message,
      });
    }

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

  _handleChange = e => {
    const {
      target: { value },
    } = e;
    const { data } = this.state;
    if (!value) {
      this.setState({
        data: { ...this.state.data },
      });
    } else {
      const searchedUsers = data.filter(user => {
        if (!user.fo_phone_no.indexOf(value)) {
          return user;
        }
      });

      this.setState({
        filteredData: searchedUsers,
      });
    }
  };

  render() {
    const {
      loader,
      filteredData,
      data,
      error,
      errorMessage,
      filteredRepos,
    } = this.state;
    return (
      <>
        {error && <span>{errorMessage}</span>}
        {loader && <span>Loading</span>}
        {filteredRepos && data && (
          <>
            <Row>
              <Col xs={4}>
                <Container>
                  <Row>
                    {console.log(this.state.user?.avatar_url)}
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
                </Container>
              </Col>
              <Col xs={8}>
                <div className="border">
                  <input type="text" onChange={this._handleChange} />
                </div>
                <Table rowData={filteredRepos} />
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}

export default App;
