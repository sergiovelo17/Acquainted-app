import axios from 'axios'


class AuthServices {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api/user',
      withCredentials: true
    });
    this.service = service;
  }

  login = (username, password) =>{
    console.log('<<<<<<<<<<<<<reached here>>>>>>>>>>>>>>>')
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }
  currentUser = ()=>{
    return this.service.get('/currentUser')
    .then(response=>response.data)
  }
  signup = (username, password,name,email,city,isAcquaintance) => {
    return this.service.post('/signup', {username:username, password:password, name: name, email: email, city: city, isAcquaintance: isAcquaintance})
    .then(response => response.data)
  }

  logout = () =>{
    return this.service.post('/logout')
    .then(response => response.data)
  }

}

export default AuthServices