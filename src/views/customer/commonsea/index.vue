<template>
  <div class="main">
    <div class="main-head">
      <div class="head-part1">
        <!-- <div class="part1-left">
          <b>来源标签：</b>
        </div>-->
        <div class="part1-left">
          <b>搜索类：</b>
        </div>
        <el-checkbox-group v-model="urlFromLabelValue1" size="mini" style="float:left;">
          <el-checkbox-button
            v-for="url in urlFromLabel1"
            :key="url.value"
            :label="url.value"
          >{{ url.label }}</el-checkbox-button>
        </el-checkbox-group>
        <Button
          type="success"
          style="margin-left:10px;float:right;margin-right:1%"
          @click="sendFilter"
          icon="md-checkmark"
        >提交（{{ totalCount }}）</Button>
        <el-tooltip class="item" effect="dark" content="清空当前过滤条件" size="small" placement="bottom">
          <Button
            type="success"
            ghost
            @click="resetFilterForm"
            style="float:right;margin-left:1.5%"
          >清空筛选项</Button>
        </el-tooltip>
      </div>
      <div class="head-part1">
        <div class="part1-left">
          <b>展示类：</b>
        </div>
        <el-checkbox-group
          v-model="urlFromLabelValue2"
          size="mini"
          style="float:left;margin-right:2.5%;"
        >
          <el-checkbox-button
            v-for="url in urlFromLabel2"
            :key="url.value"
            :label="url.value"
          >{{ url.label }}</el-checkbox-button>
        </el-checkbox-group>
        <div class="part1-left">
          <b>信息状态：</b>
        </div>
        <el-checkbox-group
          v-model="infoStateValue"
          size="mini"
          style="margin-right:2.5%;float:left"
        >
          <el-checkbox-button
            v-for="info in infoState"
            :key="info.value"
            :label="info.value"
          >{{ info.label }}</el-checkbox-button>
        </el-checkbox-group>
        <div class="part1-left">
          <b>信息类型：</b>
        </div>
        <el-checkbox-group v-model="infoTypeValue" size="mini" style="margin-right:2.5%;float:left">
          <el-checkbox-button
            v-for="infoType in infoType"
            :key="infoType.value"
            :label="infoType.value"
          >{{ infoType.label }}</el-checkbox-button>
        </el-checkbox-group>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          :picker-options="pickerOptions"
          style="margin-right:0.5%;float:left"
        ></el-date-picker>
      </div>
      <div class="head-part2">
        <!-- <el-dropdown style="float:right;color:#1b8df2;margin-top:8px;margin-left:0.5%">
          <span class="el-dropdown-link">
            批量操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a" disabled>跟进</el-dropdown-item>
            <el-dropdown-item command="b" disabled>删除</el-dropdown-item>
            <el-dropdown-item command="c" disabled>拉黑</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
        <el-input
          placeholder="请输入你要搜索的关键词（请对应左侧选项）"
          v-model="keywordsInput"
          class="input-with-select"
          style="width:25%"
          size="mini"
        >
          <el-select v-model="searchSelect" slot="prepend" style="width:90px" placeholder="请选择">
            <el-option label="姓名" value="name"></el-option>
            <el-option label="手机号" value="mobile"></el-option>
            <el-option label="微信" value="wechat"></el-option>
            <el-option label="QQ" value="qq"></el-option>
          </el-select>
        </el-input>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="Loading"
        element-loading-spinner="el-icon-loading"
        border
        highlight-current-row
        fit
        style="width:100%"
        height="72vh"
        size="mini"
        @selection-change="selectionChange"
      >
        <el-table-column fixed="left" type="selection" width="50"></el-table-column>
        <el-table-column fixed="left" prop="id" label="ID" width="60"></el-table-column>
        <el-table-column fixed="left" prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column fixed="left" prop="mobile" label="手机号" width="130"></el-table-column>
        <el-table-column prop="form_remarks" label="表单备注" width="250"></el-table-column>
        <el-table-column prop="major" label="专业" width="100"></el-table-column>
        <el-table-column prop="wechat" label="微信" width="100"></el-table-column>
        <el-table-column prop="qq" label="QQ" width="100"></el-table-column>
        <el-table-column prop="form_sign" label="表单标签" width="200"></el-table-column>

        <el-table-column label="来源url" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.url_from" placement="top">
              <el-button type="text" size="small" v-clipboard:copy="scope.row.url_from">复制到粘贴板</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="首次访问url" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.url_first" placement="top">
              <el-button type="text" size="small" v-clipboard:copy="scope.row.url_first">复制到粘贴板</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="最后访问url" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" :content="scope.row.url_last" placement="top">
              <el-button type="text" size="small" v-clipboard:copy="scope.row.url_last">复制到粘贴板</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="ip" width="150"></el-table-column>
        <el-table-column prop="region" label="省份" width="90"></el-table-column>
        <el-table-column prop="city" label="城市" width="90"></el-table-column>
        <el-table-column fixed="right" prop="create_time" label="生成时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="来源标签" width="100">
          <template slot-scope="scope">
            <el-tag type="info" disable-transitions size="mini">{{ scope.row.url_from_label_desc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="信息类型" width="60">
          <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.row.info_type)"
              disable-transitions
              size="mini"
            >{{ scope.row.info_type_desc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="录入人" width="80">
          <template slot-scope="scope">
            <el-tag type disable-transitions size="mini">
              {{
              scope.row.inputer_name
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="信息状态" width="70">
          <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.row.info_state)"
              disable-transitions
              size="mini"
            >{{ scope.row.info_state_desc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="本条信息将流入私海" placement="left">
              <el-button
                @click="followUp(scope.row.id)"
                type="text"
                size="small"
                :disabled="isFollowShow(scope.row.info_state)"
              >跟进</el-button>
            </el-tooltip>
            <el-button
              type="text"
              size="small"
              @click="deleteOne(scope.row.id)"
              :disabled="isDeleteShow(scope.row.info_state)"
            >删除</el-button>
            <el-tooltip class="item" effect="dark" content="信息将流入回收站且无法恢复" placement="top">
              <el-button
                type="text"
                size="small"
                @click="deleteCompletely(scope.row.id)"
                :disabled="isDeleteShow2()"
              >到回收站</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page" style="width:100%;text-align:right;margin-top:15px">
      <el-button
        type="success"
        style="float:left;margin-left:0.5%"
        size="small"
        :disabled="disableAssign"
        @click="assignShow"
        icon="el-icon-user"
      >分配给</el-button>
      <el-button
        type="warning"
        style="float:left"
        size="small"
        icon="el-icon-document"
        @click="infoFormShow = true"
      >信息录入</el-button>
      <div style="float:left;margin-left:1.5%">
        <BookTypeOption v-model="bookType" />
        <el-tooltip class="item" effect="dark" content="导出当前页的数据结果" placement="bottom">
          <el-button
            :loading="downloadLoading"
            style="margin-left:5px;float:right"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload"
            size="small"
          >导出Excel</el-button>
        </el-tooltip>
      </div>

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
    <el-drawer
      :visible.sync="infoFormShow"
      :show-close="false"
      title="标题"
      :with-header="false"
      direction="rtl"
      custom-class="demo-drawer"
      :maskClosable="true"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="inputForm" ref="inputForm" :rules="inputFormRules">
          <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="inputForm.name" autocomplete="off" clearable style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
            <el-input v-model="inputForm.mobile" autocomplete="off" clearable style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="wechat" :label-width="formLabelWidth">
            <el-input v-model="inputForm.wechat" autocomplete="off" clearable style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq" :label-width="formLabelWidth">
            <el-input v-model="inputForm.qq" autocomplete="off" clearable style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major" :label-width="formLabelWidth">
            <el-select v-model="inputForm.major" placeholder="请选择专业">
              <el-option label="西点" value="西点"></el-option>
              <el-option label="西餐" value="西餐"></el-option>
              <el-option label="咖啡" value="咖啡"></el-option>
              <el-option label="调酒" value="调酒"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源标签" prop="url_from_label" :label-width="formLabelWidth">
            <el-select v-model="inputForm.url_from_label" placeholder="请选择标签">
              <el-option label="百度移动" value="1"></el-option>
              <el-option label="百度PC移动" value="2"></el-option>
              <el-option label="百度PC" value="3"></el-option>
              <el-option label="百度品专" value="4"></el-option>
              <el-option label="搜狗移动" value="5"></el-option>
              <el-option label="搜狗PC移动" value="6"></el-option>
              <el-option label="搜狗PC" value="7"></el-option>
              <el-option label="搜狗移动PC" value="8"></el-option>
              <el-option label="搜狗品专" value="9"></el-option>
              <el-option label="神马" value="10"></el-option>
              <el-option label="神马品专" value="11"></el-option>
              <el-option label="360pc" value="12"></el-option>
              <el-option label="360移动" value="13"></el-option>
              <el-option label="360品专" value="14"></el-option>
              <el-option label="网址访问" value="15"></el-option>
              <el-option label="小红书" value="16"></el-option>
              <el-option label="广点通" value="17"></el-option>
              <el-option label="抖音" value="18"></el-option>
              <el-option label="快手" value="19"></el-option>
              <el-option label="头条搜索" value="20"></el-option>
              <el-option label="热线" value="21"></el-option>
              <el-option label="百度信息流" value="22"></el-option>
              <el-option label="美团点评" value="23"></el-option>
              <el-option label="58同城" value="24"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="form_remarks" :label-width="formLabelWidth">
            <el-input v-model="inputForm.form_remarks" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="来源url" prop="url_from" :label-width="formLabelWidth">
            <el-input
              v-model="inputForm.url_from"
              autocomplete="off"
              clearable
              placeholder="请填写URL地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="首次访问" prop="url_first" :label-width="formLabelWidth">
            <el-input
              v-model="inputForm.url_first"
              autocomplete="off"
              clearable
              placeholder="请填写URL地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="最后访问" prop="url_last" :label-width="formLabelWidth">
            <el-input
              v-model="inputForm.url_last"
              autocomplete="off"
              clearable
              placeholder="请填写URL地址"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">关闭</el-button>
          <el-button type="info" @click="resetInputForm('inputForm')">重置</el-button>
          <el-button
            type="primary"
            @click="submitInputForm('inputForm')"
            :loading="inputFormloading"
          >{{ inputFormloading ? "录入中..." : "录入" }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog :visible.sync="dialogAssignShow" destroy-on-close style="background:rgba(0,0,0,0.6)">
      <el-form :model="assignForm">
        <el-form-item label="选择你要分配的咨询师" :label-width="600">
          <el-select v-model="personIdsValue" placeholder="请选择">
            <el-option
              :label="personId.nickname"
              :value="personId.id"
              v-for="personId in personIds"
              :key="personId.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAssignShow = false">取消</el-button>
        <el-button type="primary" @click="sendAssignPerson()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.sendFilter();
    this.kczxlist();
    this.getApi1();
    this.getApi2();
    this.getApi3();
    this.getApi4();
    this.getApi5();
  },
  components: {
    BookTypeOption: () => import("./components/BookTypeOption"),
  },
  data() {
    return {
      apiUrl: "http://api.cdomick.com/index.php/",
      // apiUrl: "http://api.cdomick.com/index.php/",
      //只看搜索类
      urlFromSwitchValue: false,
      //导出
      bookType: "xlsx",
      downloadLoading: false,
      checkboxGroup4: [],
      //分配de表单
      dialogAssignShow: false,
      assignForm: {
        assignPerson: "",
      },
      personIds: [],
      personIdsValue: "5",
      //分配
      disableAssign: true,
      assignArr: [],
      //分页
      pageSize: 15,
      totalCount: 0,
      currentPage: 1,
      //信息录入
      infoFormShow: false,
      inputFormloading: false,
      timer: null,
      searchSelect: "",
      keywordsInput: "",
      //关键词
      keywords: "",
      //提交按钮默认状态
      status: false,
      //提交按钮默认值
      loading_words: "搜索",
      //分配按钮默认值
      disab: true,
      //录入表单data
      inputForm: {
        major: "西点",
        name: "",
        url_first: "",
        url_last: "",
        url_from: "",
        qq: "",
        wechat: "",
        mobile: "",
        form_remarks: "",
        name: "",
        url_from_label: "",
      },
      //录入表单规则，验证
      inputFormRules: {
        name: [
          // { required: true, message: "姓名不能为空", trigger: "blur" }
          // {
          //   min: 2,
          //   max: 10,
          //   message: "长度在 2 到 10 个字符之间",
          //   trigger: "blur"
          // }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // { len: 11, message: "请输入正确的手机号位数", trigger: "blur" }
        ],
        wechat: [
          // { required: true, message: "微信不能为空", trigger: "blur" },
          // { max: 20, message: "微信长度不能超过20个字符", trigger: "blur" }
        ],
        qq: [
          // { required: true, message: "QQ不能为空", trigger: "blur" },
          // { max: 13, message: "QQ长度不能超过13个字符", trigger: "blur" }
        ],
        form_remarks: [
          { required: true, message: "备注不能为空", trigger: "blur" },
          { max: 50, message: "备注长度不能超过50个字符", trigger: "blur" },
        ],
        url_from: [
          // { required: true, message: "来源Url不能为空", trigger: "blur" }
        ],
        url_first: [
          // { required: true, message: "首次访问Url不能为空", trigger: "blur" }
        ],
        url_last: [
          // { required: true, message: "最后访问Url不能为空", trigger: "blur" }
        ],
      },
      formLabelWidth: "80px",
      timer: null,
      //信息状态
      infoState: [
        {
          value: "1",
          label: "正常",
        },
        {
          value: "0",
          label: "已删除",
        },
      ],
      infoStateValue: [],
      //信息类型
      infoType: [
        {
          value: "1",
          label: "表单",
        },
        {
          value: "3",
          label: "录入",
        },
      ],
      infoTypeValue: [],
      // 来源url标签
      urlFromLabel1: [
        {
          value: "1",
          label: "百度移动",
        },
        {
          value: "2",
          label: "百度PC移动",
        },
        {
          value: "3",
          label: "百度PC",
        },
        {
          value: "4",
          label: "百度品专",
        },
        {
          value: "5",
          label: "搜狗移动",
        },
        {
          value: "6",
          label: "搜狗PC移动",
        },
        {
          value: "7",
          label: "搜狗PC",
        },
        {
          value: "8",
          label: "搜狗移动PC",
        },
        {
          value: "9",
          label: "搜狗品专",
        },
        {
          value: "10",
          label: "神马",
        },
        {
          value: "11",
          label: "神马品专",
        },
        {
          value: "12",
          label: "360pc",
        },
        {
          value: "13",
          label: "360移动",
        },
        {
          value: "14",
          label: "360品专",
        },
        {
          value: "15",
          label: "网址访问",
        },

        {
          value: "20",
          label: "头条搜索",
        },

        {
          value: "21",
          label: "热线",
        },
      ],
      urlFromLabelValue1: [],
      urlFromLabel2: [
        {
          value: "16",
          label: "小红书",
        },
        {
          value: "17",
          label: "广点通",
        },
        {
          value: "18",
          label: "抖音",
        },
        {
          value: "19",
          label: "快手",
        },
        {
          value: "22",
          label: "百度信息流",
        },
        {
          value: "23",
          label: "美团点评",
        },
        {
          value: "24",
          label: "58同城",
        },
      ],
      urlFromLabelValue2: [],
      //时间选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      //列表数据
      tableData: [],
      tableLoading: false,
    };
  },
  methods: {
    //彻底删除
    deleteCompletely(id) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "info/deletecompletely1", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              type: "success",
            });
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
            });
          }
          this.sendFilter();
        })
        .catch((error) => {});
    },
    //彻底删除按钮是否禁用
    isDeleteShow2() {
      let userRole = Number(this.$store.getters.role);
      let userId = Number(this.$store.getters.id);
      let showRoleArr = [0, 1, 2, 6, 4];
      let isInfoShow = [0, 2];
      if (showRoleArr.indexOf(userRole) > -1) {
        return false;
      } else {
        return true;
      }
    },
    //导出Excel
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "ID",
          "姓名",
          "手机号",
          "表单标签",
          "专业",
          "微信",
          "QQ",
          "表单备注",
          "来源url",
          "首次访问url",
          "最后访问url",
          "ip",
          "省份",
          "城市",
          "生成时间",
          "来源标签",
          "信息类型",
          "信息状态",
        ];
        const filterVal = [
          "id",
          "name",
          "mobile",
          "form_sign",
          "major",
          "wechat",
          "qq",
          "form_remarks",
          "url_from",
          "url_first",
          "url_last",
          "ip",
          "region",
          "city",
          "create_time",
          "url_from_label_desc",
          "info_type_desc",
          "info_state_desc",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "公海list",
          autoWidth: true,
          bookType: this.bookType,
        });
        this.downloadLoading = false;
      });
    },
    //初始化 获取请求数据接口 今日头条搜索 抖音
    getApi1() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "display/dy", {
          params: {},
        })
        .then((response) => {})
        .catch((error) => {});
    },
    getApi2() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "display/jrtt", {
          params: {},
        })
        .then((response) => {})
        .catch((error) => {});
    },
    getApi3() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "display/kslist", {
          params: {},
        })
        .then((response) => {})
        .catch((error) => {});
    },
    getApi4() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "display/dy2", {
          params: {},
        })
        .then((response) => {})
        .catch((error) => {});
    },
    getApi5() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "display/jrttnew", {
          params: {},
        })
        .then((response) => {})
        .catch((error) => {});
    },

    //提交分配信息给咨询师
    sendAssignPerson() {
      let ids = this.assignArr;
      let newIds = [];
      let userId = this.personIdsValue;
      let apiUrl = this.apiUrl;
      for (let v of ids) {
        newIds.push(v["id"]);
      }
      this.$axios
        .get(apiUrl + "info/assign", {
          params: {
            data: newIds,
            userid: userId,
          },
        })
        .then((response) => {
          this.$message({
            message: response.data.msg,
            type: "success",
          });
          this.dialogAssignShow = false;
          this.sendFilter();
        })
        .catch((error) => {});
    },
    //获取咨询师列表
    kczxlist() {
      let apiUrl = this.apiUrl;
      this.personIds = [];
      this.$axios
        .get(apiUrl + "info/kczxlist1", {
          params: {},
        })
        .then((response) => {
          this.personIds = response.data.data;
        })
        .catch((error) => {});
    },
    //分配表单显示
    assignShow() {
      this.dialogAssignShow = true;
    },
    //多选
    selectionChange(val) {
      let storePost = Number(this.$store.getters.post);
      let postArr = [0, 1, 2, 3, 5];
      if (val.length == 0) {
        this.disableAssign = true;
      } else {
        if (postArr.indexOf(storePost) >= 0) {
          this.disableAssign = false;
          this.assignArr = val;
        } else {
          this.disableAssign = true;
        }
      }
    },
    //跟进
    followUp(id) {
      let apiUrl = this.apiUrl;
      let infoid = id;
      let userid = this.$store.getters.id;
      let nickname = this.$store.getters.nickname;
      this.$axios
        .get(apiUrl + "info/follow", {
          params: {
            id: infoid,
            userid: userid,
            nickname: nickname,
          },
        })
        .then((response) => {
          this.$message({
            message: response.data.msg,
            type: "success",
          });
          this.sendFilter();
        })
        .catch((error) => {});
    },
    //重置[录入]表单
    resetInputForm(formName) {
      this.urlFromSwitchValue = false;
      this.$refs[formName].resetFields();
    },
    //提交[录入]表单
    submitInputForm(formName) {
      let apiUrl = this.apiUrl;
      let userid = this.$store.getters.id;
      let nickname = this.$store.getters.nickname;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.inputFormloading = true;
          this.$axios
            .get(apiUrl + "info/insert", {
              params: {
                data: this.inputForm,
                inputerid: userid,
                inputername: nickname,
              },
            })
            .then((response) => {
              this.inputFormloading = false;
              if (response.data.code == 1) {
                this.$message({
                  message: response.data.msg,
                  type: "success",
                });
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "error",
                });
              }

              this.resetInputForm(formName);
              this.infoFormShow = false;
              this.sendFilter();
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
    //分页 每页条数改变
    pageSizeChange(val) {
      this.pageSize = val;
      this.sendFilter();
    },
    //当前页码发生变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.sendFilter();
    },
    //跟进按钮是否禁用
    isFollowShow(state) {
      let userRole = Number(this.$store.getters.role);
      if (state == 0) {
        return true;
      }
      if (state == 2) {
        return true;
      }
      if (state == 1) {
        if (userRole == 5) {
          return false;
        } else {
          return true;
        }
      }
    },
    //删除按钮是否禁用
    isDeleteShow(state) {
      let userRole = Number(this.$store.getters.role);
      let showRoleArr = [0, 1, 2, 6, 4];
      if (state == 0) {
        return true;
      }
      if (state == 2) {
        return true;
      }
      if (state == 1) {
        if (showRoleArr.indexOf(userRole) >= 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    //重置数据过滤器
    resetFilterForm() {
      this.infoStateValue = [];
      this.urlFromLabelValue1 = [];
      this.urlFromLabelValue2 = [];
      this.searchSelect = "";
      this.keywordsInput = "";
      this.value1 = "";
      this.value2 = "";
      this.infoTypeValue = [];
    },
    //收集所有过滤的值
    getFileterContent() {
      let param = {
        table: 1,
        info_state: this.infoStateValue,
        url_from_label1: this.urlFromLabelValue1,
        url_from_label2: this.urlFromLabelValue2,
        keywords_type: this.searchSelect,
        keywords: this.keywordsInput,
        time: this.value2,
        info_type: this.infoTypeValue,
        page: this.currentPage,
        pageSize: this.pageSize,
      };
      return param;
    },
    //收集完过滤器发送请求
    sendFilter() {
      let param = this.getFileterContent();
      this.getList(param);
    },
    //请求和获取数据列表
    getList(param) {
      this.tableData = [];
      this.tableLoading = true;
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "info/list", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          this.tableData = response.data.data.data;
          this.totalCount = response.data.data.count;
          this.tableLoading = false;
        })
        .catch((error) => {});
    },
    //删除一条信息
    deleteOne(id) {
      this.tableLoading = true;
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "info/delete", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          this.$message({
            message: response.data.msg,
            type: "success",
          });
          this.sendFilter();
        })
        .catch((error) => {});
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
    },
    //信息录入
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch((_) => {});
    },
    cancelForm() {
      this.loading = false;
      this.infoFormShow = false;
      clearTimeout(this.timer);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-badge__content {
  margin-top: 12px;
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
  padding: 15px;
}
.main-head {
  width: 100%;
  height: 11.5vh;
}
.table {
  margin-top: 20px;
}
.input-with-select {
  width: 20%;
}

.head-left {
  width: 89%;
  float: left;
}
.head-left-up {
  width: 100%;
  margin-bottom: 10px;
}
.head-left-down {
  width: 100%;
  margin-bottom: 15px;
}
.head-right {
  width: 11%;
  float: left;
}
.head-right-up {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.head-right-down {
  width: 100%;
  margin-bottom: 15px;
}

.demo-drawer__content {
  padding: 10px;
  width: 500px;
}
.demo-drawer__footer {
  text-align: center;
  button {
    width: 30%;
  }
}
.head-part1 {
  width: 100%;
  height: 28px;
  margin-bottom: 10px;
}
.head-part2 {
  width: 100%;
  height: 28px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.part1-left {
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  float: left;
}
</style>
