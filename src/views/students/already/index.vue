<template>
  <div class="main">
    <div class="students">
      <div style="padding:0 0 20px 0;">
        <el-button icon="el-icon-message" type="danger" size="small" disabled>短信</el-button>
        <el-button icon="el-icon-magic-stick" type="warning" size="small" disabled>祝福</el-button>
        <el-button
          icon="el-icon-message"
          type="danger"
          class="button-3"
          size="small"
          @click="showDialog2()"
        >自定义短信</el-button>
        <el-button icon="el-icon-refresh" size="small" class="button-0" style="float:right">重置所有过滤器</el-button>
      </div>
      <el-table
        :data="tableData"
        element-loading-text="Loading"
        element-loading-spinner="el-icon-loading"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column type="selection" width="40" fixed="left"></el-table-column>
        <el-table-column prop="id" label="ID" width="50" fixed="left"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80" fixed="left"></el-table-column>
        <el-table-column prop="mobile" label="联系电话" width="100" fixed="left"></el-table-column>
        <el-table-column prop="id_card" label="证件号" width="150" fixed="left"></el-table-column>
        <el-table-column prop="age" label="年龄" width="45"></el-table-column>
        <el-table-column prop="group_major" label="集团专业" width="120"></el-table-column>
        <el-table-column prop="major" label="专业" width="120"></el-table-column>
        <el-table-column prop="standard_pricing" label="标准定价" width="70"></el-table-column>
        <el-table-column prop="advance_payment" label="预缴金额" width="70"></el-table-column>
        <el-table-column prop="discount_payment" label="优惠金额" width="70"></el-table-column>
        <el-table-column prop="permanent_address" label="户籍地址" width="180"></el-table-column>
        <el-table-column prop="submitter" label="提交人" width="70"></el-table-column>
        <el-table-column prop="first_consultant" label="首咨人" width="70"></el-table-column>
        <el-table-column prop="consultant" label="咨询师" width="70"></el-table-column>
        <el-table-column prop="claimant" label="认领人" width="70"></el-table-column>
        <el-table-column label="生日" width="220" fixed="right">
          <template slot-scope="scope">
            <el-tag disable-transitions size="mini">{{ scope.row.birthday }}</el-tag>
            <el-tag
              :type="tagType(scope.row.birthday_state)"
              disable-transitions
              size="mini"
            >{{ scope.row.birthday_state }}</el-tag>
            <el-button
              type="text"
              size="mini"
              @click="showDrawer(4,scope.row.id,'祝福记录')"
            >{{scope.row.birthday_num}}条</el-button>
            <el-button type="text" size="mini" @click="showDialog3(scope.row)">祝福</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="短信" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="showDrawer(2,scope.row.id,'短信记录')"
            >{{scope.row.message_num}}条</el-button>

            <el-button type="text" size="mini" @click="showDialog4(scope.row)">发送</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="回访" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="showDrawer(3,scope.row.id,'回访记录')"
            >{{scope.row.visit_num}}条</el-button>
            <el-button type="text" size="mini" @click="showDialog1(scope.row.id)">新增</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="deleteOne(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="other">
      <el-drawer :visible.sync="drawerShow" :with-header="false" direction="ltr">
        <div class="drawer-main">
          <h2>{{nowDrawerTitle}}</h2>
          <div style="width:100%;height:10px"></div>
          <el-table :data="messageList" border size="small" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="contents" label="内容" width="330"></el-table-column>
            <el-table-column prop="create_time" label="时间" width="150"></el-table-column>
          </el-table>
        </div>
      </el-drawer>
      <el-dialog :visible.sync="dialog1" title="新增回访记录">
        <el-form :model="visitForm">
          <el-form-item label="回访内容">
            <el-input v-model="visitForm.contents"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog1 = false">取 消</el-button>
          <el-button type="primary" @click="insertVisitRecord()" :loading="visitFormLoading">提 交</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialog2" title="自定义短信">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="目标电话" prop="mobile">
            <el-input v-model="ruleForm.mobile" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="回拨电话" prop="number">
            <el-input v-model="ruleForm.number" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="短信模版" prop="id">
            <el-select v-model="ruleForm.id" placeholder="请选择">
              <el-option
                v-for="item in templateOptions"
                :key="item.index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <div style="padding:5px 30px;">
            <div style="width:100%;height:10px;"></div>
            <el-button @click="chancel('ruleForm',2)">取 消</el-button>
            <el-button @click="resetForm1('ruleForm')" type="info">重 置</el-button>
            <el-button
              type="primary"
              @click="submitForm1('ruleForm')"
              :loading="ruleFormLoading"
            >发 送</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialog3" title="生日祝福">
        <el-form
          :model="ruleForm1"
          :rules="rules"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">{{ruleForm1.name}}</el-form-item>
          <el-form-item label="目标电话" prop="mobile">{{ruleForm1.mobile}}</el-form-item>
          <el-form-item label="回拨电话" prop="number">
            <el-input v-model="ruleForm1.number" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="短信模版" prop="id">
            <el-select v-model="ruleForm1.code" placeholder="请选择">
              <el-option
                v-for="item in templateOptions"
                :key="item.index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div style="padding:5px 30px;">
            <div style="width:100%;height:10px;"></div>
            <el-button @click="chancel('ruleForm1',3)">取 消</el-button>
            <el-button @click="resetForm('ruleForm1')" type="info">重 置</el-button>
            <el-button
              type="primary"
              @click="submitForm2('ruleForm1')"
              :loading="ruleFormLoading"
            >发 送</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialog4" title="发送短信">
        <el-form
          :model="ruleForm2"
          :rules="rules"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">{{ruleForm2.name}}</el-form-item>
          <el-form-item label="目标电话" prop="mobile">{{ruleForm2.mobile}}</el-form-item>
          <el-form-item label="回拨电话" prop="number">
            <el-input v-model="ruleForm2.number" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="短信模版" prop="id">
            <el-select v-model="ruleForm2.code" placeholder="请选择">
              <el-option
                v-for="item in templateOptions"
                :key="item.index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div style="padding:5px 30px;">
            <div style="width:100%;height:10px;"></div>
            <el-button @click="chancel('ruleForm2',4)">取 消</el-button>
            <el-button @click="resetForm('ruleForm2')" type="info">重 置</el-button>
            <el-button
              type="primary"
              @click="submitForm3('ruleForm2')"
              :loading="ruleFormLoading"
            >发 送</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div style="width:100%;padding:0 15px 10px 0;background:#fff;text-align:right;">
      <el-pagination
        background
        @size-change="pageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15,20,30,50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // apiUrl: "http://localhost/index.php/",
      apiUrl: "http://api.cdomick.com/index.php/",
      tableData: [],
      messageList: [],
      drawerShow: false,
      nowDrawerTitle: "",
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      visitForm: {
        type: 3,
        contents: "",
      },
      visitFormLoading: false,
      nowVisitId: "",
      ruleForm: {
        name: "",
        number: "",
        mobile: "",
        id: "",
      },
      ruleForm1: {
        id: "",
        name: "",
        number: "",
        mobile: "",
        code: "",
      },
      ruleForm2: {
        id: "",
        name: "",
        number: "",
        mobile: "",
        code: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入目标用户的姓名", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入回拨的手机号", trigger: "blur" },
          // { len: 11, message: "手机号长度为11位", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入目标的手机号", trigger: "blur" },
          { len: 11, message: "手机号长度为11位", trigger: "blur" },
        ],
        id: [{ required: true, message: "请选择短信模版", trigger: "blur" }],
      },
      templateOptions: [],
      templateOptions1: [],
      ruleFormLoading: false,
      //分页
      pageSize: 15,
      totalCount: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.getList();
    this.getTemplateList(2);
  },
  computed: {},
  methods: {
    //短信发送
    submitForm3(formName) {
      let apiUrl = this.apiUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .get("http://api.cdomick.com/alicms/index.php", {
              params: {
                mobile: this.ruleForm2.mobile,
                name: this.ruleForm2.name,
                number: this.ruleForm2.number,
                code: this.ruleForm2.code,
              },
            })
            .then((response) => {})
            .catch((error) => {});
          this.resetForm1("ruleForm2");
          this.dialog4 = false;
          this.sendRecord(this.ruleForm2.id, this.ruleForm2.code, 2);
        } else {
          return false;
        }
      });
    },
    //祝福短信发送
    submitForm2(formName) {
      let apiUrl = this.apiUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .get("http://api.cdomick.com/alicms/index.php", {
              params: {
                mobile: this.ruleForm1.mobile,
                name: this.ruleForm1.name,
                number: this.ruleForm1.number,
                code: this.ruleForm1.code,
              },
            })
            .then((response) => {})
            .catch((error) => {});
          this.resetForm1("ruleForm1");
          this.dialog3 = false;

          this.sendRecord(this.ruleForm1.id, this.ruleForm1.code, 4);
        } else {
          return false;
        }
      });
    },
    showDialog4(data) {
      this.dialog4 = true;
      this.getTemplateList(2);
      this.ruleForm2.name = data.name;
      this.ruleForm2.number = data.number;
      this.ruleForm2.mobile = data.mobile;
      this.ruleForm2.id = data.id;
    },
    //显示祝福操作的弹窗
    showDialog3(data) {
      this.dialog3 = true;
      this.getTemplateList(3);
      this.ruleForm1.name = data.name;
      this.ruleForm1.number = data.number;
      this.ruleForm1.mobile = data.mobile;
      this.ruleForm1.id = data.id;
    },
    showDialog2() {
      this.dialog2 = true;
      this.getTemplateList(2);
    },
    //写入消息记录
    sendRecord(id, code, type) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/record_in", {
          params: {
            id: id,
            code: code,
            type: type,
          },
        })
        .then((response) => {
          this.$message({
            message: response.data.msg,
            type: "success",
          });
          this.getList();
        })
        .catch((error) => {});
    },
    //自定义短信-关闭dialog
    chancel(formName, dialog) {
      this.$refs[formName].resetFields();
      if (dialog == 1) {
        this.dialog1 = false;
      }
      if (dialog == 2) {
        this.dialog2 = false;
      }
      if (dialog == 3) {
        this.dialog3 = false;
      }
      if (dialog == 4) {
        this.dialog4 = false;
      }
    },
    //自定义短信-发送
    submitForm1(formName) {
      let apiUrl = this.apiUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.ruleFormLoading = true;
          this.$axios
            .get("http://api.cdomick.com/alicms/index.php", {
              params: {
                mobile: this.ruleForm.mobile,
                name: this.ruleForm.name,
                number: this.ruleForm.number,
                code: this.ruleForm.id,
              },
            })
            .then((response) => {})
            .catch((error) => {});

          this.resetForm1("ruleForm");
          this.dialog2 = false;
          this.$message({
            message: "发送成功",
            type: "success",
          });
        } else {
          return false;
        }
      });
    },

    getTemplateList(type) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/templatelist", {
          params: {
            type: type,
          },
        })
        .then((response) => {
          this.templateOptions = response.data.data;
        })
        .catch((error) => {});
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
    showDialog1(id) {
      this.dialog1 = true;
      this.nowVisitId = id;
    },

    //新增回访记录
    insertVisitRecord() {
      let apiUrl = this.apiUrl;
      let id = this.nowVisitId;
      console.log(this.visitForm);
      this.visitFormLoading = true;
      this.$axios
        .get(apiUrl + "students/insertvisit", {
          params: {
            id: id,
            type: this.visitForm.type,
            contents: this.visitForm.contents,
          },
        })
        .then((response) => {
          this.visitFormLoading = false;
          this.$message({
            message: response.data.msg,
            type: "success",
          });
          this.dialog1 = false;
          this.getList();
          this.visitForm.contents = "";
        })
        .catch((error) => {});
    },
    deleteOne(id) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/delete", {
          params: {
            id: id,
            table: 2,
          },
        })
        .then((response) => {
          this.$message({
            message: response.data.msg,
            type: "success",
          });
          this.getList();
        })
        .catch((error) => {});
    },
    showDrawer(type, id, title) {
      this.drawerShow = true;
      this.nowDrawerTitle = title;
      this.getMessage(type, id);
    },
    getMessage(type, id) {
      let apiUrl = this.apiUrl;
      console.log(id);
      this.$axios
        .get(apiUrl + "students/messagelist", {
          params: {
            id: id,
            type: type,
          },
        })
        .then((response) => {
          this.messageList = response.data.data;
        })
        .catch((error) => {});
    },
    //数据列表
    getList() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/list", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
          },
        })
        .then((response) => {
          this.tableData = response.data.data;
          this.totalCount = response.data.count;
        })
        .catch((error) => {});
    },
    //分页 每页条数改变
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    //当前页码发生变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    tagType(type) {
      if (type == "已祝福") {
        return "success";
      }
      if (type == "今日") {
        return "danger";
      }
      if (type == "未到") {
        return "info";
      }
      if (type == "已过") {
        return "warning";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0px 20px;
}
.dialog2-left {
  width: 50%;
  height: 300px;
  float: left;
}
.dialog2-right {
  width: 50%;
  height: 300px;
  float: left;
}
.drawer-main {
  width: 100%;
  height: 100%;
  padding: 20px;
}
::v-deep .el-table__body tr.current-row > td {
  background: rgba(207, 255, 255, 1);
}
::v-deep .el-tag {
  border-radius: 2px;
  border-color: #409eff;
}
::v-deep .el-tag.el-tag--success {
  border-color: #19be6b;
  color: #19be6b;
}
::v-deep .el-tag.el-tag--danger {
  border-color: #f56c6c;
}
::v-deep .el-tag.el-tag--warning {
  border-color: #ee9a00;
  color: #ee9a00;
}
::v-deep .el-tag.el-tag--info {
  color: #9f79ee;
  border-color: #9f79ee;
}
.main {
  width: 100%;
  min-height: 95vh;
  padding: 20px;
  background: #f0f2f5;
}
.students {
  width: 100%;
  padding: 20px;
  background: #fff;
}
.button-0 {
  background: #fff;
  border: 1px solid #000;
}
.button-1 {
  background: #5ad8a6;
  color: #fff;
  border: 1px solid #5ad8a6;
}
.button-2 {
  background: #bdd2fd;
  color: #fff;
  border: 1px solid #bdd2fd;
}
.button-3 {
  background: #5b8ff9;
  border: 1px solid #5b8ff9;
  color: #fff;
}
.button-4 {
  background: #e8684a;
  color: #fff;
  border: 1px solid #e8684a;
}
.button-5 {
  background: #9270ca;
  border: 1px solid #9270ca;
  color: #fff;
}
.button-6 {
  background: #ff99c3;
  border: 1px solid #ff99c3;
  color: #fff;
}
</style>