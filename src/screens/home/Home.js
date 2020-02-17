import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import ImageCard from "./ImageCard";
import Header from "../../common/header/Header";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: null,
      filterData: null,
      userMediaData: null,
      searchValue: ""
    };
  }

  componentWillMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push("/");
    }
    this.fetchUserProfile();
    this.fetchMedia();
  }

  /* fetch User data */
  fetchUserProfile() {
    fetch(this.props.baseUrl + "?access_token=" + sessionStorage.getItem("access-token"))
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({ userProfileData: result.data });
      },
      (error) => {
        console.log("Error fetching user profile data from Instagram", error);
      }
    );
  }

  fetchMedia() {
    fetch(
      this.props.baseUrl +
      "media/recent/?access_token=" +
      sessionStorage.getItem("access-token")
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            userMediaData: result.data,
            filterData: result.data
          });
        },
        error => {
          console.log("Error fetching user media data from Instagram.", error);
        }
      );
  }

  render() {
    return (
      <div>
        <Header
          {...this.props}
          showSearchBar={true}          
        />
        <Container>
          <ImageCard {...this.props} userMediaData={this.state.filterData}/>
        </Container>        
      </div>
    );
  }

}

export default Home;
