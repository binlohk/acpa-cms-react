export const storeToken = (token) => {
  localStorage.setItem('accessToken', token)
}

export const storeUser = (user) => {
  localStorage.setItem('id', user.id)
  localStorage.setItem('username', user.username)
  localStorage.setItem('email', user.email)
}

export const getUser = () => {
  return {
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email')
  }
}

export const getToken = () => {
  const token = localStorage.getItem('accessToken')
  return token
}

export const removeToken = () => {
  localStorage.clear();
}