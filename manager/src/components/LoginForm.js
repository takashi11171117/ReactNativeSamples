import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import * as actions from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }
  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }
  onButtonPress = () => {
    const { email, password, loginUser } = this.props;

    loginUser({ email, password });
  }

  renderError = () => {
    if (this.props.error) {
      console.log('a');
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton = () => {
    if (!this.props.loading) {
      return (
        <Button onPress={this.onButtonPress}>
          Login
        </Button>
      );
    }

    return <Spinner size="small" />;
  }

  render() {
    const { email, password } = this.props;

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange}
            value={email}
          />
        </CardSection>


        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={password}
            onChangeText={this.onPasswordChange}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, actions)(LoginForm);
