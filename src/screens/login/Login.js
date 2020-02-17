import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";

import "./Login.css";
import Header from "../../common/header/Header";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameRequired: false,
      username: "",
      passwordRequired: false,
      password: "",
      loginError: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    };
  }

  inputUsername = e => {
    this.setState({
      username: e.target.value
    });
    if (!e.target.value) {
      this.setState({ usernameRequired: true });
    } else {
      this.setState({ usernameRequired: false });
    }
  };

  inputPassword = e => {
    this.setState({
      password: e.target.value
    });
    if (!e.target.value) {
      this.setState({ passwordRequired: true });
    } else {
      this.setState({ passwordRequired: false });
    }
  };
  
  loginClicked = () => {
    this.setState({ loginError: false });

    if (this.state.username !== "" && this.state.password !== "") {
      if (
        this.state.username === "admin" &&
        this.state.password === "password"
      ) {
        sessionStorage.setItem(
          "access-token",
          "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784"
        );
        this.props.history.push("/home");
      } else {
        this.setState({ loginError: true });
      }
    }
  };

  render() {
    return (
      <div>
        <Header {...this.props}  showSearchBar={false}/>
        <div className="loginpagecontent">
          <Card className="logincard">
            <CardContent>
              <Typography component="div">
                LOGIN
              </Typography>
              <FormControl className="logincardform" required>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type="text"
                  username={this.state.username}
                  onChange={this.inputUsername}
                />
                {this.state.usernameRequired ? (
                  <FormHelperText>
                    <span className="red">required</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <br/>
              <br/>
              <FormControl className="logincardform" required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  password={this.state.password}
                  onChange={this.inputPassword}
                />
                {this.state.passwordRequired ? (
                  <FormHelperText>
                    <span className="red">required</span>
                  </FormHelperText>
                ) : null}
              </FormControl>
              <br/>
              <br/>
              {this.state.loginError ? (
                <FormHelperText>
                  <span className="red">
                    Incorrect username and/or password
                  </span>
                </FormHelperText>
              ) : null}
              <br/>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.username === "" || this.state.password === ""}
                onClick={this.loginClicked}
              >
                LOGIN
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
