import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress = () => {
    const { name, phone, shift, employeeCreate } = this.props;

    employeeCreate({ name, phone, shift: shift || 'Manday' });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift } = employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, actions)(EmployeeCreate);
