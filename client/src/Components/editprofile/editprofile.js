import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import axios from "axios";
import M from "materialize-css";
import './editprofile.css'

class EditProfile extends Component {
  state = {
    username: this.props.user.username,
    city: this.props.user.acquaintedCity,
    email: this.props.user.email,
    name: this.props.user.name,
    isAcquaintance: this.props.user.isAcquaintance,
    description: this.props.user.profileDescription,
    userImage: null
  };
  service = new AuthService();
  componentDidMount = () => {
    var elems = document.querySelectorAll(".modal");
    var modalInstances = M.Modal.init(elems, {});
  };
 
  handleAcquaintance(e) {
    if (!this.state.isAcquaintance) {
      this.setState({ isAcquaintance: true });
    } else {
      this.setState({ isAcquaintance: false });
    }
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value})
  };
  handlePicture = (e) => {
    console.log(e.target)
   this.setState({userImage: e.target.files[0]})
    // else {
    //   document.getElementById('edit-form-modal').submit();
    // }
  }
  submitEditForm = e => {
    e.preventDefault()
    console.log(this.state.userImage)
    const username = this.state.username;
    const email = this.state.email;
    const name = this.state.name;
    const city = this.state.city;
    const isAcquaintance = this.state.isAcquaintance;
    const description = this.state.description;
    const userImg = this.state.userImage;
    let theRequest = new FormData();
    theRequest.append('username', username)
    theRequest.append('email', email)
    theRequest.append('name', name)
    theRequest.append('city', city)
    theRequest.append('isAcquaintance', isAcquaintance)
    theRequest.append('description', description)
    theRequest.append('userImg', this.state.userImage)

    axios
      .post(`${process.env.REACT_APP_BASE}/user/editProfile`, theRequest,
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        this.props.updateUser(response)
      });
  };

  setInput = (el) => {
    this.imageInput = el
  }

  render() {
    return (
      <div>
        <div id="editPorfileModal1" class="modal">
          <div class="modal-content">
            <h4>Edit Profile</h4>
            <form onSubmit={this.submitEditForm}>
              <legend>Name</legend>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
              />
              <legend>Username</legend>
              <input
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
              />
              <legend>Email</legend>
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
              />
              <legend>City</legend>
              <input
                type="text"
                value={this.state.city}
                onChange={this.handleChange}
                name="city"
              />
               <legend>Profile Description</legend>
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
                name="description"
              />
              <legend>Upload an image</legend>
              <input type='file' onChange={this.handlePicture} name='userImage' />
              <legend>Acquaintance</legend>
              {!this.state.isAcquaintance && (
                <div class="switch">
                  <label>
                    Newbie (To get acquainted)
                    <input
                      onClick={e => this.handleAcquaintance(e)}
                      type="checkbox"
                    />
                    <span class="lever" />
                    Acquaintance (To become a host)
                  </label>
                </div>
              )}
              {this.state.isAcquaintance && (
                <div class="switch">
                  <label>
                    Newbie (To get acquainted)
                    <input
                      onClick={e => this.handleAcquaintance(e)}
                      type="checkbox"
                      checked
                    />
                    <span class="lever" />
                    Acquaintance (To become a host)
                  </label>
                </div>
              )}
            <button class="modal-close waves-effect submit-changes btn">
              Submit
            </button>
            </form>
          </div>
          </div>
        </div>
    );
  }
}

export default EditProfile;
