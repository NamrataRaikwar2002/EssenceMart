export const authReducer = (userDetail, userAction) => {
  switch (userAction.type) {
    case 'LOGIN': {
      return {
        ...userDetail,
        user: userAction.payload.user,
        token: userAction.payload.token,
      }
    }
    case 'SIGNUP': {
      return {
        ...userDetail,
        user: userAction.payload.user,
        token: userAction.payload.token,
      }
    }
    case 'LOGOUT': {
      return { ...userDetail, user: {}, token: '' }
    }
    default:
      return userDetail
  }
}
