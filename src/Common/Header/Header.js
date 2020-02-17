import React, { Component } from 'react';
import './Header.css';

import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Header extends Component {

  constructor() {
    super();
    this.state = {
      anchorEl: null,
      searchValue: "",
      userProfileData: null
    };

  }
  
  componentDidMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push("/");
    }
    this.fetchUserProfile();
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
        console.log("error...", error);
      }
    );
  }

  /* Opens the menu on click */
  openMenuOnClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
  };

  /* If menu is open, then close it */
  closeMenuOnClick = () => {
      this.setState({ anchorEl: null });
  };

  /* When user logsout, remove access token*/
  logoutUser = () => {
    sessionStorage.removeItem("access-token");
    this.closeMenuOnClick();
    this.props.history.push("/");
  };

  /*redirect to profile page*/
  redirectToProfile = () => {
    this.props.history.push("/home");
  };

  /*redirect to home page*/
  redirectToHome = () => {
    this.props.history.push("/home");
  };


  render() {
    return (
      <div className="header">
        <div className="title" onClick={this.redirectToHome}>Image Viewer</div>

        <div className="displaySearchBar">
          {this.props.showSearchBar === true ?
              
              <div id="searchBar">
                
                <div className="searchIcon">
                  <SearchIcon/>
                </div>
                
                <Input className="searchInput" onChange={this.props.searchChangeHandler} disableUnderline={true}
                      placeholder="Search..."/>
              </div> : ""}
          
          
            <IconButton id="profile-icon" edge="start" color="inherit" aria-label="menu">
              {this.state.userProfileData ?
                <Avatar alt={this.state.userProfileData.full_name} id="profile-icon" fontSize="small"
                        ariant="circle" src={this.state.userProfileData.profile_picture}
                        onClick={this.openMenuOnClick}/> : null}
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.closeMenuOnClick}
              >
                <MenuItem onClick={this.redirectToProfile}>My Account</MenuItem>
                <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
              </Menu>
            </IconButton>    
        </div>

      </div>
    );
  }
}

export default Header;
