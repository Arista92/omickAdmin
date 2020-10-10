<template>
  <div class="main">
    <div class="message">
      <el-button icon="el-icon-plus" class="button-1" size="small" @click="dialogShow=true">新增短信模版</el-button>
      <div style="width:100%;height:20px;"></div>
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
        <el-table-column prop="code" label="CODE" width="120"></el-table-column>
        <el-table-column prop="name" label="名称" width="200"></el-table-column>
        <el-table-column prop="contents" label="短信内容" width="830"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150" fixed="right"></el-table-column>
        <el-table-column label="类型" width="100" fixed="right">
          <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.row.type)"
              disable-transitions
              size="mini"
            >{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" fixed="right">
          <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.row.state)"
              disable-transitions
              size="mini"
            >{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="release(scope.row.id)"
              :disabled="is_sisabled(scope.row.state)"
            >发布</el-button>
            <el-button type="text" size="mini">修改</el-button>
            <el-button type="text" size="mini" @click="deleteOne(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="other">
      <el-dialog :visible.sync="dialogShow">
        <el-form :model="form">
          <el-form-item label="模版名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="短信内容">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容，姓名用name替换，例如：你好！name,成都欧米奇通知您，最近..."
              v-model="form.contents"
            ></el-input>
          </el-form-item>
          <el-form-item label="CODE">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="模版类型">
            <el-radio-group v-model="form.type" size="small">
              <el-radio-button label="短信"></el-radio-button>
              <el-radio-button label="祝福"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="sendForm">提 交</el-button>
        </div>
      </el-dialog>
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
      dialogShow: false,
      form: {
        name: "",
        contents: "",
        type: "短信",
        code: "",
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    deleteOne(id) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/delete", {
          params: {
            id: id,
            table: 1,
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
    release(id) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/release", {
          params: {
            id: id,
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
    is_sisabled(state) {
      console.log(state);
      if (state == "已发布") {
        return true;
      }
    },
    sendForm() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/templateinsert", {
          params: {
            data: this.form,
          },
        })
        .then((response) => {
          this.$message({
            message: response.data.msg,
            type: "success",
          });
          this.dialogShow = false;
          this.getList();
        })
        .catch((error) => {});
    },
    getList() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "students/templatelist", {
          params: {
            type: 1,
          },
        })
        .then((response) => {
          this.tableData = response.data.data;
        })
        .catch((error) => {});
    },
    tagType(type) {
      if (type == "已发布") {
        return "success";
      }
      if (type == "短信") {
        return "info";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
.message {
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