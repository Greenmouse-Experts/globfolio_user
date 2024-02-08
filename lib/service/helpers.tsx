export const getToken = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const token = localStorage.getItem('glob_token')
        return token
      }
      return null
}
export const getBearerToken = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const token = localStorage.getItem('glob_token')
        return `Bearer ${token}`
      }
}