<template>
  <div class="main">
    <div class="article">
      <h2>文章管理</h2>
      <div style="width:100%;height:20px;"></div>
   
    <el-tabs tab-position="left">
      <el-tab-pane label="文章列表" style="padding: 0 0 0 15px;">
        <h2 style="padding: 5px 10px 10px 10px;">文章列表</h2>
        <el-table :data="articleTableData" border style="width: 100%;">
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="title" label="标题" width="440"></el-table-column>
          <el-table-column prop="author" label="作者" width="120"></el-table-column>
          <el-table-column prop="state" label="状态" width="120">
            <template slot-scope="scope">
              <Tag
                type="dot"
                :color="stateColor(scope.row.state)"
                size="medium"
              >{{ scope.row.state_desc }}</Tag>
            </template>
          </el-table-column>
          <el-table-column prop="click" label="阅读量" width="70"></el-table-column>
          <!-- <el-table-column label="封面" width="60">
            <a  href="http://localhost/uploads/cover/134b5b486ad59add28bd2b.jpg" target="_blank">查看</a>
          </el-table-column>-->
          <el-table-column label="栏目" width="100">
            <template slot-scope="scope">
              <Tag color="pink">{{ scope.row.from_label_desc }}</Tag>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="100">
            <template slot-scope="scope">
              <Tag color="geekblue">{{ scope.row.creater_name }}</Tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
          <el-table-column label="操作" width="216">
            <template slot-scope="scope">
              <Button
                type="success"
                @click="publish(scope.row.id)"
                :disabled="isPublicShow(scope.row.state)"
              >发布</Button>
              <Button type="success" ghost>编辑</Button>
              <Poptip confirm title="确定要删除？" @on-ok="deleteOne(scope.row.id)" placement="left">
                <Button type="error">删除</Button>
              </Poptip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="新增文章" style="padding: 0 0 0 15px;">
        <h2 style="padding: 5px 10px 10px 10px;">新增文章</h2>
        <div class="article-form">
          <el-form ref="form" :model="articleForm" label-width="90px">
            <el-form-item label="文章标题">
              <el-input v-model="articleForm.title" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="articleForm.author" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="栏目">
              <el-select v-model="articleForm.from_label" placeholder="选择你要发布到哪个栏目">
                <el-option label="学校新闻" value="1"></el-option>
                <el-option label="行业新闻" value="2"></el-option>
                <el-option label="学生风采" value="3"></el-option>
                <el-option label="入学答疑" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="阅读量">
              <el-input v-model="articleForm.click" style="width: 80px;"></el-input>
            </el-form-item>
            <el-form-item label="封面图片">
              <el-upload
                class="upload-demo"
                action="1"
                multiple
                :limit="1"
                :http-request="myUpload"
                list-type="picture"
                style="width: 50%;"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div></div>
          <h2 style="padding: 10px;">
            <Button
              type="success"
              style="position: absolute;top:0;right:20px;"
              @click="sendFilter"
              icon="md-checkmark"
            >保存文章</Button>
          </h2>
        </div>
        <tinymce ref="richText"></tinymce>
      </el-tab-pane>
    </el-tabs>
     </div>
  </div>
</template>
<script>
export default {
  components: {
    tinymce: () => import("./components/tinymce1")
  },
  mounted() {
    this.articleList();
  },
  data() {
    return {
      apiUrl: "http://api.cdomick.com/index.php/",
      // apiUrl: "http://localhost/index.php/",
      articleTableData: [],
      nowId: "",
      articleForm: {
        title: "",
        author: "",
        click: "",
        from_label: "1"
      },
      coverUrl: ""
    };
  },
  methods: {
    //文章发布
    sendFilter() {
      let apiUrl = this.apiUrl;
      let nickname = this.$store.getters.nickname;
      let id = this.$store.getters.id;
      let contents = this.$refs.richText.contents;
      console.log(contents);
      let coverUrl = this.coverUrl;
      let title = this.articleForm.title;
      let author = this.articleForm.author;
      let click = this.articleForm.click;
      let from_label = this.articleForm.from_label;
      let from_label_desc = this.getFromLabelDesc(from_label);
      let params = {
        creater_id: id,
        creater_name: nickname,
        content: contents,
        cover_url: coverUrl,
        title: title,
        author: author,
        click: click,
        from_label: from_label,
        from_label_desc: from_label_desc
      };
      this.$axios
        .post(apiUrl + "article/insert", params)
        .then(response => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          } else {
            this.$message({
              message: response.data.msg,
              type: "error"
            });
          }
        })
        .catch(error => {});
    },
    getFromLabelDesc(from_label) {
      if (from_label == 1) {
        var from_label_desc = "学校新闻";
      }
      if (from_label == 2) {
        var from_label_desc = "行业新闻";
      }
      if (from_label == 3) {
        var from_label_desc = "学生风采";
      }
      if (from_label == 4) {
        var from_label_desc = "入学答疑";
      }
      return from_label_desc;
    },
    //文件上传
    myUpload(content) {
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
          this.coverUrl = response.data.data;
        })
        .catch(error => {});
    },

    //新闻列表
    articleList() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "article/list", {
          params: {}
        })
        .then(response => {
          this.articleTableData = response.data.data;
        })
        .catch(error => {});
    },
    //发布
    publish(id) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "article/publish", {
          params: {
            id: id
          }
        })
        .then(response => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          } else {
            this.$message({
              message: response.data.msg,
              type: "error"
            });
          }

          this.articleList();
        })
        .catch(error => {});
    },
    //发布按钮禁用
    isPublicShow(state) {
      if (state == "1") {
        return true;
      }
    },
    //状态颜色
    stateColor(state) {
      if (state == "1") {
        return "success";
      } else {
        return "warning";
      }
    },
    deleteOne(id) {
      //删除一条新闻
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "article/deleteone", {
          params: {
            id: id
          }
        })
        .then(response => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          } else {
            this.$message({
              message: response.data.msg,
              type: "error"
            });
          }
          this.articleList();
        })
        .catch(error => {});
    }
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
  padding: 20px;
  background: #f0f2f5;
}
.article{
  width: 100%;
  padding:20px;
  background: #fff;
}
.article-form {
  width: 100%;
  min-height: 420px;
  position: relative;
}
</style>
