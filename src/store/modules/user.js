import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import axios from "axios";
import router from '@/router'

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  nickname: "",
  role: "",
  postdesc: "",
  post:"",
  id:""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname;
  },
  SET_POSTDESC:(state,postdesc)=>{
    state.postdesc = postdesc;
  },
  SET_POST:(state,post)=>{
    state.post = post;
  }
};

const actions = {
 
  // user login
  login({ commit }, formdata) {
    
    axios
      .get("http://api.cdomick.com/index.php/user/login", {
        params: {
          data: formdata
        }
      })
      .then(response => {
        let data = response.data.data;
        if (response.data.code == 0) {
          alert(response.data.msg)
          return false;
        } else {
          commit("SET_TOKEN", data.token);
          
          setToken(data.token);
          router.push({ path: this.redirect || "/" });
        }
      })
      .catch(error => {
        message({
          message: error,
          type: "error"
        });
      });
  },

  // get user info
  getInfo({ commit, state }) {
    axios
      .get("http://api.cdomick.com/index.php/user/getinfo", {
        params: {
          data: state.token
        }
      })
      .then(response => {
        let data = response.data.data;
        if (response.data.code == 0) {
          return false;
        } else {
          commit("SET_NAME", data.username);
          commit("SET_ROLE", data.role);
          commit("SET_NICKNAME", data.nickname);
          commit("SET_ID", data.id);
          commit("SET_AVATAR", data.avatar);
          commit("SET_POSTDESC",data.post_desc);
          commit("SET_POST",data.post)
        }
      })
      .catch(error => {
      });

    // return new Promise((resolve, reject) => {
    //   getInfo(state.token)
    //     .then(response => {
    //       const { data } = response;

    //       if (!data) {
    //         reject("Verification failed, please Login again.");
    //       }

    //       const { name, avatar } = data;

    //       commit("SET_NAME", name);
    //       commit("SET_AVATAR", avatar);
    //       resolve(data);
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
