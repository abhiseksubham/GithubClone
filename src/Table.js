import React from 'react';
import './Table.css';
import { Row, Col, Container } from 'react-bootstrap';

const table = ({ rowData }) => {
  return (
    <div>
      {console.log(rowData.length)}
      {rowData.lenght == 0 ? (console.log('here'), 'No Data found') : null}
      {rowData?.map(repo => {
        return (
          <Container className="unit">
            {console.log({ repo })}
            <Row className="reponame">{repo.name}</Row>
            <Row>
              <span className="symbol"></span>
              <div className="language">{repo.language}</div>
              <div>Last Updated at{repo.updated_at}</div>
            </Row>
          </Container>
        );
      })}
    </div>
  );
};

export default table;
