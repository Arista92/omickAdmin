<template>
  <div class="app-container">
    <div class="one">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
    <div class="line"></div>
    <div class="one">
      <h2>数据预览</h2>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
    <div class="one">
      <div style="text-align:center">
        <el-button style="width:150px;" @click="clear">清空</el-button>
        <el-button
          style="width:150px;"
          @click="importData"
          type="primary"
          :loading="loading"
          class="button-1"
        >导入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      // apiUrl: "http://localhost/index.php/",
        apiUrl: "http://api.cdomick.com/index.php/",
      tableData: [],
      tableHeader: [],
      loading: false
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
      console.log(results);
    },
    clear() {},
    importData() {
      this.loading = true;
      let apiUrl = this.apiUrl;
      this.$axios
        .post(apiUrl + "students/import", this.tableData)
        .then(response => {
          this.loading = false;
          this.tableData = [];
          this.tableHeader = [];
             this.$message({
            message: response.data.msg,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 95vh;
  padding: 20px;
  background: #eee;
}
.one {
  width: 100%;
  background: #fff;
  padding: 20px;
}
.line {
  width: 100%;
  height: 10px;
  background: #eee;
}
.button-1 {
  background: #5ad8a6;
  color: #fff;
  border: 1px solid #5ad8a6;
}
</style>