export const storeToken = (token) => {
  localStorage.setItem('accessToken', token)
}

export const getToken = () => {
  const token = localStorage.getItem('accessToken')
  return token
}

export const removeToken = () => {
  localStorage.clear();
}