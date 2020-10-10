const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  id: state => state.user.id,
  nickname: state => state.user.nickname,
  postdesc: state => state.user.postdesc,
  post: state => state.user.post
};
export default getters;
