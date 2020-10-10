<template>
  <div class="main">
    <div class="admin">
      <h2>系统管理员</h2>
      <div style="width:100%;height:15px"></div>
      <el-tabs tab-position="left">
        <el-tab-pane label="用户列表">
          <h2 style="padding:0 0 10px 15px;">用户列表</h2>
          <div class="main-1">
            <el-table :data="adminList" style="width: 100%" size="mini">
              <el-table-column prop="id" label="ID" width="180"></el-table-column>
              <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
              <el-table-column prop="department" label="所属部门" width="180"></el-table-column>
              <el-table-column prop="post_desc" label="职位称呼" width="180"></el-table-column>
              <el-table-column prop="last_login_time" label="最近一次登录时间" width="180"></el-table-column>
              <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                  <Button
                    type="success"
                    :disabled="isShow(scope.row.post)"
                    @click="showChangeDialog(scope.row)"
                  >修改</Button>
                  <Poptip
                    confirm
                    title="确定要删除？"
                    @on-ok="deleteOne(scope.row.id)"
                    placement="right-end"
                  >
                    <Button type="error" :disabled="isShow(scope.row.post)">删除</Button>
                  </Poptip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新增一名" :tagClick="insertBegin()">
           <h2 style="padding:0 0 10px 15px;">选择新增的角色</h2>
          <el-tabs tab-position="left" :value="insertTab">
            <el-tab-pane label="部门负责人" :disabled="isShow2(1)">
              <div class="form-one">
                <p style="text-align:center;padding:0 0 10px 0;font-size:15px;">
                  <b>新增部门负责人</b>
                </p>
                <el-form ref="form1" :model="form1" :rules="formRules" label-width="80px">
                  <el-form-item label="登录名" prop="username">
                    <el-input v-model="form1.username"></el-input>
                  </el-form-item>
                  <el-form-item label="登录密码" prop="password">
                    <el-input v-model="form1.password"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form1.nickname" placeholder="请填写真实姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="职位选择">
                    <el-select v-model="form1.post" placeholder="请选择对应的职位称呼">
                      <el-option label="市场负责人" value="1"></el-option>
                      <el-option label="网运负责人" value="2"></el-option>
                      <el-option label="咨询负责人" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button  type="primary" plain @click="resetForm('form1')">重置</el-button>
                    <el-button
                      type="primary"
                      style="width:35%"
                      :loading="insertLoading"
                      @click="onSubmit('form1')"
                    >立即创建</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="咨询师" :disabled="isShow2(6)">
              <div class="form-one">
                <p style="text-align:center;padding:0 0 10px 0;font-size:15px;">
                  <b>新增咨询师</b>
                </p>
                <el-form :model="form2" ref="form2" :rules="formRules" label-width="80px">
                  <el-form-item label="登录名" prop="username">
                    <el-input v-model="form2.username"></el-input>
                  </el-form-item>
                  <el-form-item label="登录密码" prop="password">
                    <el-input v-model="form2.password"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form2.nickname" placeholder="请填写真实姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button  type="primary" plain @click="resetForm('form2')">重置</el-button>
                    <el-button
                      type="primary"
                      style="width:35%"
                      :loading="insertLoading"
                      @click="onSubmit('form2')"
                    >立即创建</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="采集员" :disabled="isShow2(5)">
              <div class="form-one">
                <p style="text-align:center;padding:0 0 10px 0;font-size:15px;">
                  <b>新增采集员</b>
                </p>
                <el-form ref="form3" :model="form3" :rules="formRules" label-width="80px">
                  <el-form-item label="登录名" prop="username">
                    <el-input v-model="form3.username"></el-input>
                  </el-form-item>
                  <el-form-item label="登录密码" prop="password">
                    <el-input v-model="form3.password"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form3.nickname" placeholder="请填写真实姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button  type="primary" plain @click="resetForm('form3')">重置</el-button>
                    <el-button
                      type="primary"
                      style="width:35%"
                      :loading="insertLoading"
                      @click="onSubmit('form3')"
                    >立即创建</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="内容编辑员" :disabled="isShow2(4)">
              <div class="form-one">
                <p style="text-align:center;padding:0 0 10px 0;font-size:15px;">
                  <b>新增内容编辑员</b>
                </p>
                <el-form ref="form4" :model="form4" :rules="formRules" label-width="80px">
                  <el-form-item label="登录名" prop="username">
                    <el-input v-model="form4.username"></el-input>
                  </el-form-item>
                  <el-form-item label="登录密码" prop="password">
                    <el-input v-model="form4.password"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form4.nickname" placeholder="请填写真实姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" plain  @click="resetForm('form4')">重置</el-button>
                    <el-button
                      type="primary"
                      :loading="insertLoading"
                      style="width:35%"
                      @click="onSubmit('form4')"
                    >立即创建</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="游客" :disabled="true">
              <h3>没有操作权限</h3>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>

      <el-dialog
        title="修改"
        :visible.sync="changeDialogShow"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="changeForm" :model="changeForm" label-width="80px">
          <el-form-item label="登录名">
            <el-input v-model="changeForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="changeForm.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="changeForm.nickname"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeDialogShow = false">取 消</el-button>
          <el-button type="primary" :loading="changeFormLoading" @click="sendChangeForm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // apiUrl: "http://localhost:85/index.php/",
      apiUrl: "http://api.cdomick.com/index.php/",
      changeFormLoading: false,
      changeDialogShow: false,
      insertTab: "",
      adminList: [],
      insertLoading: false,
      tableLoading: false,
      changeForm: {
        id: "",
        username: "",
        password: "",
        nickname: ""
      },
      form1: {
        username: "",
        password: "",
        nickname: "",
        post: "1"
      },
      form2: {
        username: "",
        password: "",
        nickname: ""
      },
      form3: {
        username: "",
        password: "",
        nickname: ""
      },
      form4: {
        username: "",
        password: "",
        nickname: ""
      },
      formRules: {
        username: [
          { required: true, message: "登录名不能为空", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "长度在4至10位",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "长度在4至10位",
            trigger: "blur"
          }
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在2至5位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //显示 修改dialog
    showChangeDialog(row) {
      this.changeDialogShow = true;
      this.changeForm.id = row.id;
      this.changeForm.username = row.username;
      this.changeForm.password = row.password;
      this.changeForm.nickname = row.nickname;
    },
    sendChangeForm() {
      let apiUrl = this.apiUrl;
      this.changeFormLoading = true;
      let params = this.changeForm;
      this.$axios
        .get(apiUrl + "admin/update", {
          params: params
        })
        .then(response => {
          console.log(response);
          this.changeFormLoading = false;
          this.getAdminList();
          this.changeDialogShow = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交新增人员
    onSubmit(formName) {
      let apiUrl = this.apiUrl;
      this.insertLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "form1") {
            var params = this.form1;
          }
          if (formName == "form2") {
            var params = this.form2;
            params["post"] = 6;
          }
          if (formName == "form3") {
            var params = this.form3;
            params["post"] = 5;
          }
          if (formName == "form4") {
            var params = this.form4;
            params["post"] = 4;
          }
          this.$axios
            .get(apiUrl + "admin/insert", {
              params: params
            })
            .then(response => {
              this.$message({
                message: response.data.msg,
                type: "success"
              });
              this.insertLoading = false;
              this.resetForm(formName);
              this.getAdminList();
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    //初始化新增
    insertBegin() {
      let userPost = Number(this.$store.getters.post);
      if (userPost == 0 || userPost == 1) {
        this.insertTab = "部门负责人";
      } else if (userPost == 2) {
        this.insertTab = "内容编辑员";
      } else if (userPost == 3) {
        this.insertTab = "咨询师";
      } else {
        this.insertTab = "游客";
      }
    },
    isShow2(post) {
      let userPost = Number(this.$store.getters.post);
      let listPost = Number(post);
      if (userPost == 0 || userPost == 1) {
        return false;
      }
      if (userPost == 2) {
        let arr = [4];
        if (arr.indexOf(listPost) > -1) {
          return false;
        } else {
          return true;
        }
      }
      if (userPost == 3) {
        let arr = [5, 6];
        if (arr.indexOf(listPost) > -1) {
          return false;
        } else {
          return true;
        }
      }

      return true;
    },
    isShow(post) {
      let userPost = Number(this.$store.getters.post);
      let listPost = Number(post);
      if (userPost == 0) {
        return false;
      }
      if (userPost == 1) {
        if (listPost == 0) {
          return true;
        } else {
          return false;
        }
      }
      if (userPost == 2) {
        let arr = [0, 1, 3];
        if (arr.indexOf(listPost) > -1) {
          return true;
        } else {
          return false;
        }
      }
      if (userPost == 3) {
        let arr = [0, 1, 2];
        if (arr.indexOf(listPost) > -1) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    deleteOne(id) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "admin/delete", {
          params: {
            id: id
          }
        })
        .then(response => {
          this.$message({
            message: response.data.msg,
            type: "success"
          });
          this.getAdminList();
        })
        .catch(error => {});
    },
    getAdminList() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "admin/list", {})
        .then(response => {
          this.adminList = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getAdminList();
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
  min-height: 95vh;
  background: #eee;
  padding: 20px;
  .main-1 {
    padding: 0 15px 0 15px;
  }
}
.admin{
  width: 100%;
  padding:20px;
  background: #fff;
}
.form-one {
  width: 40%;
  height: 100vh;
}
</style>