<template>
  <div class="main">
    <div class="content">
      <h2>个人设置</h2>
      <div style="width:100%;height:20px;"></div>
      <el-tabs tab-position="left" style="height: 95%;">
        <el-tab-pane label="基本设置" @tab-click="test()">
          <div class="page">
            <h2>基本设置</h2>
            <div style="width:100%;height:20px;"></div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="昵称">
                <el-input v-model="form.nickname" style="width:200px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="form.mobile" style="width:200px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" style="width:200px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="微信">
                <el-input v-model="form.wechat" style="width:200px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="QQ">
                <el-input v-model="form.qq" style="width:200px" size="small"></el-input>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input
                  type="textarea"
                  style="width:220px"
                  :rows="4"
                  placeholder="个人简介"
                  v-model="form.introduce"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
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
            <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 增加个人标签</el-button>
            <div style="width:100%;height:60px;padding:20px 0;">
              <el-button type="primary" @click="updateUserInfo()" :loading="UserInfoLoading">更新基本信息</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <div class="page">
            <h2>修改密码</h2>
            <div style="width:100%;height:20px;"></div>
            <el-form ref="form2" :model="form2" :rules="form2Rules" label-width="80px">
              <el-form-item label="原密码" prop="oldpassword">
                <el-input
                  v-model="form2.oldpassword"
                  type="password"
                  style="width:200px"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newpassword">
                <el-input
                  v-model="form2.newpassword"
                  type="password"
                  style="width:200px"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-form>
            <div style="width:100%;height:60px;padding:20px 0;">
              <el-button type="primary" :loading="sendPasswordLoading" @click="sendPassword('form2')">更新密码</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="头像设置">
          <div class="page">
            <h2>头像设置</h2>
            <div style="width:100%;height:20px;"></div>
             <el-upload
                class="upload-demo"
                action="1"
                multiple
                :limit="1"
                :http-request="headUpload"
                list-type="picture"
                style="width: 50%;"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">上传jpg/png文件</div>
              </el-upload>
              <div style="width:100%;height:30px;"></div>
               <el-button type="primary" @click="headUpdate()" :loading="UserInfoLoading">更新头像</el-button>
            <!-- <headupload></headupload>   -->
          </div>
        </el-tab-pane>
      </el-tabs>
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
      form: {
        birthday: "",
        nickname: "",
        mobile: "",
        email: "",
        introduce: "",
        wechat: "",
        qq: ""
      },
      dynamicTags: [],
      form2: {
        oldpassword: "",
        newpassword: ""
      },
      form2Rules: {
        oldpassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "长度在4至10位",
            trigger: "blur"
          }
        ],
        newpassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "长度在4至10位",
            trigger: "blur"
          }
        ]
      },
      inputVisible: false,
      inputValue: "",
      UserInfoLoading: false,
      sendPasswordLoading: false,
      headUrl:'',
    };
  },
  components:{
    headupload: () => import("./components/headUpload")
  },
  methods: {
    //标签关闭
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //标签input框
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //增加标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //获取基本信息
    getUserInfo() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "admin/detail", {
          params: {
            id: this.id
          }
        })
        .then(response => {
          console.log(response.data);
          this.form = response.data.data;
          this.dynamicTags = response.data.tags;
        })
        .catch(error => {});
    },
    //更新基本信息
    updateUserInfo() {
      this.UserInfoLoading = true;
      let apiUrl = this.apiUrl;
      let data = this.form;
      data.tags = this.dynamicTags;
      this.$axios
        .get(apiUrl + "admin/infoupdate", {
          params: {
            id: this.id,
            data: data
          }
        })
        .then(response => {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: "success"
          });
          this.UserInfoLoading = false;

          this.getUserInfo();
        })
        .catch(error => {});
    },
    //更新密码
    sendPassword(formName) {
      let apiUrl = this.apiUrl;
      this.sendPasswordLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {

          this.$axios
            .get(apiUrl + "admin/updatepassword", {
              params: {
                id: this.id,
                old: this.form2.oldpassword,
                new: this.form2.newpassword
              }
            })
            .then(response => {
              if (response.data.code == 0) {
                this.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: "error"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: response.data.msg,
                  type: "success"
                });
                this.form2.oldpassword = '',
                this.form2.newpassword = ''
              }
              this.sendPasswordLoading = false;
              this.getUserInfo();
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
     //头像上传
    headUpload(content) {
      let apiUrl = this.apiUrl;
      var form = new FormData();
      form.append("file", content.file);
      this.$axios
        .post(apiUrl + "article/coveruploads", form)
        .then(response => {
          this.$message({
            message: response.data.msg,
            type: "success"
          });
          console.log(response);
          this.headUrl = response.data.data;
        })
        .catch(error => {});
    },
    //头像更新
    headUpdate(){
      let apiUrl = this.apiUrl;
      if(this.headUrl == ''){
        this.$message({
            showClose: true,
            message: '请先上传头像',
            type: "error"
          });
          return false;
      }
      this.$axios
        .get(apiUrl + "admin/headupdate", {
          params: {
            id: this.id,
            url: this.headUrl
          }
        })
        .then(response => {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: "success"
          });
          this.getUserInfo();
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.getUserInfo();
  },
  computed: {
    ...mapGetters(["id"])
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__item.is-active {
  color: #409eff;
  background: #e6f7ff;
}
::v-deep .el-tabs--left .el-tabs__item.is-left {
  width: 210px;
  text-align: left;
}
::v-deep .el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__active-bar.is-right,
.el-tabs--right .el-tabs__active-bar.is-left,
.el-tabs--right .el-tabs__active-bar.is-right {
  width: 3px;
}
.main {
  width: 100%;
  height: 94.5vh;
  background-color: #f0f2f5;
  padding: 24px;
}
.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 24px;
}
.page {
  width: 100%;
  height: 100%;
  padding: 5px 30px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>