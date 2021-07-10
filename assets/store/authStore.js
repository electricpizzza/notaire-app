import Axios from "axios";

export default {
  user: {
    email: null,
    roll: "guest",
    nom: null,
    prenom: null,
    authenticated: false,
    token: null
  },
  login(email, password) {
    this.user.authenticated = true;
    // Axios.post('https://notaitre-api.herokuapp.com/login',{
    //     email,
    //     password,
    // }).then(resp =>{
    //     console.log(resp);
    //     this.email = email;
    //     this.password = password;
    //     this.authenticated = true;
    // }).catch(err => console.error(err));
    return this.user;
  }
};
