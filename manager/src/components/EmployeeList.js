import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import ListItem from './ListItem';
import * as actions from '../actions';

class EmployeeList extends Component {
  componentWillMount() {
    const { employees, employeeFetch } = this.props;
    employeeFetch();

    this.createDataSource(employees);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.employees);
  }

  createDataSource(employees) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow = (employee) => {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = ({ employees }) => {
  const tmpEmployees = _.map(employees, (val, uid) => {
    return { ...val, uid };
  });
  
  return { employees: tmpEmployees };
};

export default connect(mapStateToProps, actions)(EmployeeList);
