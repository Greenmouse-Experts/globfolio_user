export const getToken = () => {
    const token = localStorage.getItem('guard_token')
    return `Bearer ${token}`
}