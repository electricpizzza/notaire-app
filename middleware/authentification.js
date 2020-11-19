import auth from '~/assets/store/authStore'

export default function ({ redirect }) {
  if (!auth.user.autentificated) {
    return redirect('/login')
  }
  else{
    
  }
}