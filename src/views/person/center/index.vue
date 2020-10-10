<template>
  <div class="main">
    <div class="left">
      <div style="width:100%;height:10px"></div>
      <div class="avatar">
        <Avatar
          shape="square"
          :src="form.avatar"
          size="80"
        />
      </div>
      <div class="name">{{form.nickname}}</div>
      <div class="description">{{form.introduce}}</div>
      <div style="width:100%;height:10px"></div>
      <div class="line">职位：{{form.post_desc}}</div>
      <div class="line">部门：{{form.department}}</div>
      <div class="line">手机：{{form.mobile}}</div>
      <div class="line">微信：{{form.wechat}}</div>
      <div class="line">QQ：{{form.qq}}</div>
      <div class="line">生日：{{form.birthday}}</div>

      <div class="line">标签</div>
      <div class="tag">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          style="margin-right:5px"
        ></el-input>
        <!-- <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 增加标签</el-button> -->
      </div>
      <div class="line">团队成员</div>
      <div class="team">
        <div class="team-one" v-for="list in userList" :key="list.index">
          <div class="team-avatar" @click="getUserInfo(list.id)">
            <Avatar shape="square" :src="list.avatar" size="40" />
          </div>
          <div class="team-name">{{list.nickname}}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <Tabs>
        <TabPane label="我的动态">开发中...</TabPane>
        <TabPane label="团队动态">开发中...</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // apiUrl: "http://localhost/index.php/",
      apiUrl: "http://api.cdomick.com/index.php/",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      form: {
        birthday: "",
        nickname: "",
        mobile: "",
        email: "",
        introduce: "",
        wechat: "",
        qq: "",
        post_desc: "",
        department: "",
        id: "",
       
      },
      userList: []
    };
  },
   created() {
    
  },
  beforeMount(){
   
  },
  mounted() {
    this.getUserInfo();
    this.getUserList()
  },
  computed: {
    ...mapGetters(["id","avatar"])
  },
  watch: {
    
  },

  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //获取基本信息
    getUserInfo(otherId) {
      if (typeof otherId !== "undefined") {
        var id = otherId;
      } else {
        var id = this.id;
      }
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "admin/detail", {
          params: {
            id: id
          }
        })
        .then(response => {
          console.log(response.data);
          this.form = response.data.data;
          this.dynamicTags = response.data.tags;
        })
        .catch(error => {});
    },
    //获取管理员列表
    getUserList() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "admin/list", {
          params: {}
        })
        .then(response => {
          // console.log(response.data);
          this.userList = response.data.data;
        })
        .catch(error => {});
    }
  },

};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 5px;
  margin-bottom: 5px;
}
.team-name {
  padding: 0 5px;
}
.main {
  width: 100%;
  height: 100vh;
  padding: 20px;
  background: #f0f2f5;
}
.left {
  width: 25%;
  height: 100%;
  padding: 20px;
  background: #fff;
  float: left;
}
.avatar {
  width: 100%;
  text-align: center;
}
.description {
  width: 100%;
  text-align: center;
}
.name {
  width: 100%;
  padding: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
}
.line {
  width: 100%;
  text-align: left;
  padding: 5px 15px;
}
.team-one {
  width: 20%;
  float: left;
}
.team-name {
  width: 100%;
  float: left;
  text-align: center;
  font-size: 12px;
  padding: 5px 0;
}
.team-avatar {
  text-align: center;
}
.right {
  width: 74%;
  height: 100vh;
  padding: 15px;
  background: #fff;
  float: right;
}
</style>