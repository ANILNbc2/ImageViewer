import React, { Component } from "react";
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

  render() {
    return (
      <div>
        <Header
          {...this.props}
          showSearchBar={true}          
        />        
      </div>
    );
  }

}

export default Home;
