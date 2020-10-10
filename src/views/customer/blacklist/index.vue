<template>
  <div class="main">
    <h2>
      回收站
      <div style="float:right">
        <Button
          type="success"
          style="margin-right:1%;float:left"
          @click="getList"
          icon="md-refresh"
        >数据刷新（{{ totalCount }}）</Button>
      </div>
    </h2>
    <div style="width:100%;height:15px;"></div>
    <pl-table
      :data="tableData"
      size="mini"
      border
      v-loading="tableLoading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      :height="height"
    >
      <pl-table-column prop="id" label="序号" width="60" fixed="left"></pl-table-column>
      <pl-table-column prop="info_id" label="信息ID" width="60" fixed="left"></pl-table-column>
      <pl-table-column prop="name" label="姓名" width="100" fixed="left"></pl-table-column>
      <pl-table-column prop="mobile" label="手机号" width="130" fixed="left"></pl-table-column>
      <pl-table-column prop="form_sign" label="表单标签" width="200"></pl-table-column>
      <pl-table-column prop="form_remarks" label="表单备注" width="250"></pl-table-column>
      <pl-table-column prop="create_time" label="生成时间" width="150"></pl-table-column>
      <pl-table-column prop="move_private_time" label="流入时间" width="150"></pl-table-column>
      <pl-table-column prop="delete_time" label="回收时间" width="150"></pl-table-column>
      <pl-table-column prop="age" label="年龄" width="50"></pl-table-column>
      <pl-table-column prop="major" label="专业" width="100"></pl-table-column>
      <pl-table-column prop="qq" label="QQ" width="100"></pl-table-column>
      <pl-table-column prop="wechat" label="微信号" width="100"></pl-table-column>
      <pl-table-column prop="ip" label="IP" width="150"></pl-table-column>
      <pl-table-column prop="city" label="城市" width="90"></pl-table-column>
      <pl-table-column prop="region" label="省份" width="90"></pl-table-column>
      <pl-table-column label="来源URL" width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.url_from" placement="top">
            <el-button type="text" size="small" v-clipboard:copy="scope.row.url_from">复制到粘贴板</el-button>
          </el-tooltip>
        </template>
      </pl-table-column>
      <pl-table-column prop="url_first" label="首次访问URL" width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.url_first" placement="top">
            <el-button type="text" size="small" v-clipboard:copy="scope.row.url_first">复制到粘贴板</el-button>
          </el-tooltip>
        </template>
      </pl-table-column>
      <pl-table-column prop="url_last" label="最后访问URL" width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.url_last" placement="top">
            <el-button type="text" size="small" v-clipboard:copy="scope.row.url_last">复制到粘贴板</el-button>
          </el-tooltip>
        </template>
      </pl-table-column>
      <pl-table-column label="所属人" width="70" fixed="right">
        <template slot-scope="scope">
          <el-tag disable-transitions size="mini">
            {{
            scope.row.person_name
            }}
          </el-tag>
        </template>
      </pl-table-column>
      <pl-table-column label="原位置" width="60" fixed="right">
        <template slot-scope="scope">
          <el-tag :type="tagtypeArea(scope.row.from_area)" disable-transitions size="mini">
            {{
            scope.row.from_area
            }}
          </el-tag>
        </template>
      </pl-table-column>
      <pl-table-column label="来源标签" width="85" fixed="right">
        <template slot-scope="scope">
          <el-tag type="info" disable-transitions size="mini">
            {{
            scope.row.url_from_label_desc
            }}
          </el-tag>
        </template>
      </pl-table-column>
      <pl-table-column label="信息类型" width="80" fixed="right">
        <template slot-scope="scope">
          <el-tag
            :type="tagType(scope.row.info_type)"
            disable-transitions
            size="mini"
          >{{ scope.row.info_type_desc }}</el-tag>
        </template>
      </pl-table-column>
      <pl-table-column label="录入人" width="80" fixed="right">
        <template slot-scope="scope">
          <el-tag disable-transitions size="mini">
            {{
            scope.row.inputer_name
            }}
          </el-tag>
        </template>
      </pl-table-column>
      <pl-table-column prop="info_state_desc" label="信息状态" width="80" fixed="right">
        <template slot-scope="scope">
          <el-tag
            :type="tagType(scope.row.info_state)"
            disable-transitions
            size="mini"
          >{{ scope.row.info_state_desc }}</el-tag>
        </template>
      </pl-table-column>
      <pl-table-column label="回访记录" width="80" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            slot="reference"
            @click="visitContentDetail(scope.row.id)"
          >{{ scope.row.visit_num }} 条</el-button>
        </template>
      </pl-table-column>
      <pl-table-column prop="visit_state_desc" label="回访状态" width="80" fixed="right">
        <template slot-scope="scope">
          <el-tag
            :type="visitTagType(scope.row.visit_state)"
            disable-transitions
            size="mini"
          >{{ scope.row.visit_state_desc }}</el-tag>
        </template>
      </pl-table-column>
    </pl-table>
    <!-- <el-table :data="tableData" style="width: 100%" size="mini" :stripe="true" border :highlight-current-row="true"  element-loading-text="Loading"
        element-loading-spinner="el-icon-loading" height="80vh">
        <el-table-column prop="id" label="序号" width="60" fixed="left"></el-table-column>
      <el-table-column prop="info_id" label="信息ID" width="60" fixed="left"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100" fixed="left"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="130" fixed="left"></el-table-column>
      <el-table-column prop="form_sign" label="表单标签" width="200"></el-table-column>
      <el-table-column prop="form_remarks" label="表单备注" width="250"></el-table-column>
      <el-table-column prop="create_time" label="生成时间" width="150"></el-table-column>
      <el-table-column prop="move_private_time" label="流入时间" width="150"></el-table-column>
      <el-table-column prop="delete_time" label="回收时间" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" width="50"></el-table-column>
      <el-table-column prop="major" label="专业" width="100"></el-table-column>
      <el-table-column prop="qq" label="QQ" width="100"></el-table-column>
      <el-table-column prop="wechat" label="微信号" width="100"></el-table-column>
      <el-table-column prop="ip" label="IP" width="150"></el-table-column>
      <el-table-column prop="city" label="城市" width="90"></el-table-column>
      <el-table-column prop="region" label="省份" width="90"></el-table-column>
       <el-table-column label="来源URL" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.url_from" placement="top">
              <el-button type="text" size="small" v-clipboard:copy="scope.row.url_from">复制到粘贴板</el-button>
            </el-tooltip>
          </template>
       </el-table-column>
      <el-table-column prop="url_first" label="首次访问URL" width="100">
        <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.url_first" placement="top">
              <el-button type="text" size="small" v-clipboard:copy="scope.row.url_first">复制到粘贴板</el-button>
            </el-tooltip>
          </template>
      </el-table-column>
      <el-table-column prop="url_last" label="最后访问URL" width="100">
        <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.url_last" placement="top">
              <el-button type="text" size="small" v-clipboard:copy="scope.row.url_last">复制到粘贴板</el-button>
            </el-tooltip>
          </template>
      </el-table-column>
      <el-table-column label="所属人" width="70" fixed="right">
        <template slot-scope="scope">
            <el-tag disable-transitions size="mini">
              {{
              scope.row.person_name
              }}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column label="原位置" width="60" fixed="right">
        <template slot-scope="scope">
            <el-tag :type="tagtypeArea(scope.row.from_area)" disable-transitions size="mini">
              {{
              scope.row.from_area
              }}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column label="来源标签" width="85" fixed="right">
         <template slot-scope="scope">
            <el-tag type="info" disable-transitions size="mini">
              {{
              scope.row.url_from_label_desc
              }}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column label="信息类型" width="80" fixed="right">
        <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.row.info_type)"
              disable-transitions
              size="mini"
            >{{ scope.row.info_type_desc }}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="录入人" width="80" fixed="right">
         <template slot-scope="scope">
            <el-tag disable-transitions size="mini">
              {{
              scope.row.inputer_name
              }}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="info_state_desc" label="信息状态" width="80" fixed="right">
        <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.row.info_state)"
              disable-transitions
              size="mini"
            >{{ scope.row.info_state_desc }}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="回访记录" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              slot="reference"
              @click="visitContentDetail(scope.row.id)"
            >{{ scope.row.visit_num }} 条</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="visit_state_desc" label="回访状态" width="80" fixed="right">
          <template slot-scope="scope">
            <el-tag
              :type="visitTagType(scope.row.visit_state)"
              disable-transitions
              size="mini"
            >{{ scope.row.visit_state_desc }}</el-tag>
          </template>
      </el-table-column>
    </el-table>-->
    <div style="width:100%;height:15px;"></div>
    <div style="width:100%;">    <el-pagination
      background
      @size-change="pageSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20,30,50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      style="float:right"
    ></el-pagination></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      apiUrl: "http://api.cdomick.com/index.php/",
      // apiUrl: "http://localhost/index.php/",
      tableData: [],
      tableLoading: false,
      pageSize: 20,
      height: window.innerHeight * 0.8,
      totalCount: 0,
      currentPage: 1
    };
  },
  methods: {
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
    //获取数据列表
    getList() {
      let apiUrl = this.apiUrl;
      this.tableData = [];
      this.tableLoading = true;
      this.$axios
        .get(apiUrl + "info/recycle", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(response => {
          console.log(response);
          this.tableLoading = false;
          this.tableData = response.data.data;
          this.totalCount = response.data.count;
        })
        .catch(error => {});
    },
    //信息状态标签类型选择
    tagType(type) {
      if (type == 1) {
        return "success";
      }
      if (type == 0) {
        return "danger";
      }
      if (type == 2) {
        return "info";
      }
      if (type == 3) {
        return "warning";
      }
      if (type == 4) {
        return "success";
      }
      if (type == 5) {
        return "success";
      }
    },
    //回访状态标签类型选择
    visitTagType(type) {
      if (type == 1) {
        return "danger";
      }
      if (type == 2) {
        return "success";
      }
      if (type == 3) {
        return "info";
      }
      if (type == 4) {
        return "info";
      }
      if (type == 5) {
        return "info";
      }
    },
    tagtypeArea(type) {
      if (type == "公海") {
        return "warning";
      }
      if (type == "私海") {
        return "danger";
      }
    }
  },
  mounted() {
    this.getList();
  }
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
  padding: 20px;
}
</style>