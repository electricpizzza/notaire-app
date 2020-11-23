import auth from '~/assets/store/authStore'

export default function ({ redirect }) {
  console.log(auth.user);
  if (!auth.user.authenticated) {
    return redirect('/login')
  }
  else{
    
  }
}