import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";

import { connect } from "react-redux";

// Actions
import { authorize } from "../redux/actions/authActions";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    type: "login"
  };
  handleChange = keyValue => {
    this.setState(keyValue);
  };

  handleSubmit = () => {
    this.props.authorize(this.state);
  };

  // changeType = type => {
  //   type === "login" ? (type = "register") : (type = "login");
  //   console.log("TCL: LoginForm -> type", type);
  // };

  render() {
    console.log(this.type);
    const { username, password } = this.state;
    // console.log(this.state);
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
                name="username"
                value={username}
                placeholder="Username"
                onChangeText={username => this.handleChange({ username })}
              />
            </Item>
            <Item>
              <Input
                value={password}
                placeholder="Password"
                secureTextEntry
                name="password"
                onChangeText={password => this.handleChange({ password })}
              />
            </Item>
            <Button onPress={this.handleSubmit}>
              <Text>{this.state.type}</Text>
            </Button>
          </Form>
          <Text
            style={{ color: "blue", textAlign: "center" }}
            onPress={() =>
              this.state.type === "login"
                ? this.setState({ type: "register" })
                : this.setState({ type: "login" })
            }
          >
            {this.state.type === "register"
              ? "login with existing account"
              : "not a user register"}
          </Text>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authorize: user => dispatch(authorize(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);

// type === "login"
//   ? (type="register")
//   : (type = "login")
