<template>
  <div class="main">
    <div class="video">
      <h2>视频管理</h2>
      <div style="width:100%;height:20px;"></div>
      <el-tabs tab-position="left" style="height: 95%;">
        <el-tab-pane label="视频列表" style="padding:0 0 0 15px">
          <h2>视频列表</h2>
          <div style="width:100%;height:10px;"></div>
          <el-table :data="listData" border style="width: 100%;">
            <el-table-column prop="id" label="ID" width="40"></el-table-column>
            <el-table-column prop="title" label="标题" width="230"></el-table-column>
            <el-table-column prop="time" label="时长" width="70"></el-table-column>
            <el-table-column prop="views" label="播放(万)" width="80"></el-table-column>
            <el-table-column label="封面图" width="70">
              <template slot-scope="scope">
                <a :href="scope.row.cover_url" target="_blank" rel="noopener noreferrer">
                  <el-image style="width: 40px; height: 30px" :src="scope.row.cover_url"></el-image>
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="video_url" label="视频" width="70">
              <template slot-scope="scope">
                <a :href="scope.row.video_url" target="_blank" rel="noopener noreferrer">
                  <el-button type="text">查看</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="发布者" width="100"></el-table-column>
            <el-table-column prop="fans" label="粉丝(万)" width="80"></el-table-column>
            <el-table-column label="分类" width="70">
              <template slot-scope="scope">
                <Tag color="red">{{scope.row.type_desc}}</Tag>
              </template>
            </el-table-column>
            <el-table-column label="标签" width="190">
              <template slot-scope="scope">
                <Tag v-for="one in scope.row.tags" :key="one.index">{{one}}</Tag>
              </template>
            </el-table-column>
            <el-table-column prop="creater_name" label="创建人" width="80">
              <template slot-scope="scope">
                <Tag color="geekblue">{{scope.row.creater_name}}</Tag>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <Button type="success" ghost>编辑</Button>
                <Poptip confirm title="确定要删除？" @on-ok="deleteOne(scope.row.id)" placement="left">
                  <Button type="error">删除</Button>
                </Poptip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="新增视频" style="padding:0 0 0 15px">
          <h2>新增视频</h2>
          <div style="width:100%;height:10px;"></div>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="标题">
              <el-input v-model="form.title" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="播放量(万)">
              <el-input v-model="form.views" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="时长">
              <el-input v-model="form.time" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="发布者">
              <el-input v-model="form.author" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="粉丝(万)">
              <el-input v-model="form.fans" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="分类">
              <el-radio-group v-model="form.type" size="medium">
                <el-radio-button label="1">西点</el-radio-button>
                <el-radio-button label="2">西餐</el-radio-button>
                <el-radio-button label="3">咖啡</el-radio-button>
                <el-radio-button label="4">调酒</el-radio-button>
                <el-radio-button label="5">其他</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标签">
              <el-input
                v-model="form.tag"
                style="width:400px"
                placeholder="标签之间用#分隔 例如：标签1#标签2#标签3"
              ></el-input>
            </el-form-item>
            <el-form-item label="封面图">
              <el-input v-model="form.cover_url" style="width:700px"></el-input>
            </el-form-item>
            <el-form-item label="视频URL">
              <el-input v-model="form.video_url" style="width:700px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insertVideo">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       apiUrl: "http://api.cdomick.com/index.php/",
      // apiUrl: "http://localhost/index.php/",
      listData: [],
      form: {}
    };
  },
  mounted() {
    this.videoList();
  },
  methods: {
    videoList() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "videoadmin/list", {
          params: {}
        })
        .then(response => {
          this.listData = response.data.data;
        })
        .catch(error => {});
    },
    insertVideo() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "videoadmin/insert", {
          params: {
            data: this.form
          }
        })
        .then(response => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              type: "success"
            });
            this.videoList()
            this.form = {}
          } else {
            this.$message({
              message: response.data.msg,
              type: "error"
            });
            this.videoList()
          }
        })
        .catch(error => {});
    },
    deleteOne(id) {
      //删除一条video
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "videoadmin/deleteone", {
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
          this.videoList();
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  padding: 20px;
}
.video {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
}
::v-deep .el-tabs__item.is-active {
  color: #9270ca;
  background: #9270ca47;
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
  background-color: #9270ca;
}
::v-deep .el-button--primary {
  color: #fff;
  background-color: #9270ca;
  border-color: #9270ca;
}
::v-deep.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #9270ca;
  border-color: #9270ca;
  -webkit-box-shadow: -1px 0 0 0 #9270ca;
  box-shadow: -1px 0 0 0 #9270ca;
}
</style>