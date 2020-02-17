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

  checkIfExist = (element) => {
    return element.caption.text.toUpperCase().split("#")[0].indexOf(this.state.searchText.toUpperCase()) > -1
  }

  onTextSearch = event => {
    this.setState({ searchText: event.target.value });
    if ( this.state.searchText == null || this.state.searchText.trim() === "" ) {
      this.setState({filterData: this.state.userMediaData});
    } else {
      var filterData = this.state.userMediaData.filter( this.checkIfExist );
      this.setState({filterData: filterData});
    }
  }


  render() {
    return (
      <div>
        <Header
          {...this.props}
          showSearchBar={true}    
          showIcon={true}  
          showMyAccount={true}    
          searchHandler={this.onTextSearch}
        />
        <Container>
          <ImageCard {...this.props} userMediaData={this.state.filterData}/>
        </Container>        
      </div>
    );
  }

}

export default Home;
