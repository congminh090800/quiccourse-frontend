// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signIn: "/api/signin",
  signUp: "/api/signup",
  createAdmin: "/api/createAdmin",
  createCourse: "/api/courses",
  getCourses: "/api/courses",
  getMyCourses: "/api/courses/me",
  getMyInfo: "/api/user/me",
  getUserInfo: (id) => `/api/user/${id}`,
  participateCourse: (codeRoom) => `/api/courses/participate/${codeRoom}`,
  uploadCover: "/api/upload/upload-cover",
  getClassInfo: (code) => `/api/courses/me/${code}`,
  refreshToken: "/api/refreshToken",
  googleSignIn: "/api/google-signin",
};
