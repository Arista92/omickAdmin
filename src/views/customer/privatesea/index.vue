<template>
  <div class="main">
    <div class="main-head">
      <div class="main-head-1">
        <el-radio-group v-model="personIdsValue" size="medium">
          <el-radio-button
            :label="personId.id"
            v-for="personId in personIds"
            :key="personId.id"
            :disabled="isPersonShow(personId.id)"
          >{{ personId.nickname }}</el-radio-button>
        </el-radio-group>
        <Button
          type="success"
          style="margin-right:1%;float:right"
          @click="sendFilter"
          icon="md-checkmark"
        >提交（{{ totalCount }}）</Button>
        <el-tooltip class="item" effect="dark" content="清空当前筛选条件" placement="bottom">
          <Button
            type="success"
            ghost
            @click="resetFilterForm"
            style="margin-right:5px;float:right"
          >清空筛选项</Button>
        </el-tooltip>

        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          :picker-options="pickerOptions"
          style="margin-right:1.5%;float:right"
        ></el-date-picker>
        <el-input
          placeholder="搜索关键词"
          v-model="keywordsInput"
          class="input-with-select"
          style="width:15%;float:right;margin-right:1.5%;"
          size="small"
        >
          <el-select v-model="searchSelect" slot="prepend" style="width:90px;" placeholder="请选择">
            <el-option label="姓名" value="name"></el-option>
            <el-option label="手机号" value="mobile"></el-option>
            <el-option label="微信" value="wechat"></el-option>
            <el-option label="QQ" value="qq"></el-option>
          </el-select>
        </el-input>
      </div>
      <div class="head-part1">
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
        <div style="float:left;margin-left:1%">
          <el-switch
            v-model="onlySearchValue"
            @change="onlyWatchSearch"
            active-color="#19be6b"
            inactive-color="#c0c4cc"
            style="margin-top:3px;"
          ></el-switch>
          <div class="part1-left">
            <b>全选：</b>
          </div>
        </div>
      </div>
      <div class="head-part1">
        <div class="part1-left">
          <b>展示类：</b>
        </div>
        <el-checkbox-group v-model="urlFromLabelValue2" size="mini" style="float:left;">
          <el-checkbox-button
            v-for="url in urlFromLabel2"
            :key="url.value"
            :label="url.value"
          >{{ url.label }}</el-checkbox-button>
        </el-checkbox-group>
        <div style="float:left;margin-left:1%;margin-right:1.5%">
          <div class="part1-left">
            <b>全选：</b>
          </div>
          <el-switch
            v-model="onlyDisplayValue"
            @change="onlyWatchDisplay"
            active-color="#19be6b"
            inactive-color="#c0c4cc"
            style="margin-top:3px;"
          ></el-switch>
        </div>
        <div class="part1-left">
          <b>信息状态：</b>
        </div>
        <el-checkbox-group
          v-model="infoStateValue"
          size="mini"
          style="margin-right:1.5%;float:left;"
        >
          <el-checkbox-button
            v-for="info in infoState"
            :key="info.value"
            :label="info.value"
          >{{ info.label }}</el-checkbox-button>
        </el-checkbox-group>
        <div class="part1-left">
          <b>回访状态：</b>
        </div>
        <el-checkbox-group
          v-model="visitStateValue"
          size="mini"
          style="margin-right:1.5%;float:left;"
        >
          <el-checkbox-button
            v-for="visit in visitState"
            :key="visit.value"
            :label="visit.value"
          >{{ visit.label }}</el-checkbox-button>
        </el-checkbox-group>
        <div class="part1-left">
          <b>信息类型：</b>
        </div>
        <el-checkbox-group
          v-model="infoTypeValue"
          size="mini"
          style="margin-right:1.5%;float:left;"
        >
          <el-checkbox-button
            v-for="infoType in infoType"
            :key="infoType.value"
            :label="infoType.value"
          >{{ infoType.label }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div class="head-part1">
        <!-- <el-dropdown style="float:right;color:#1b8df2;margin-top:8px;margin-left:10px;">
          <span class="el-dropdown-link">
            批量操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>删除</el-dropdown-item>
            <el-dropdown-item disabled>拉黑</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        element-loading-text="Loading"
        element-loading-spinner="el-icon-loading"
        border
        :highlight-current-row="true"
        fit
        style="width: 100%;"
        height="70vh"
        size="mini"
      >
        <el-table-column fixed="left" type="selection" width="50"></el-table-column>
        <el-table-column fixed="left" prop="id" label="ID" width="60"></el-table-column>
        <el-table-column fixed="left" prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column fixed="left" prop="mobile" label="手机号" width="100"></el-table-column>
        <el-table-column prop="wechat" label="微信" width="100"></el-table-column>
        <el-table-column prop="major" label="专业" width="50"></el-table-column>
        <el-table-column prop="form_remarks" label="表单备注" width="300"></el-table-column>
        <el-table-column prop="move_time" label="流入时间" width="150"></el-table-column>
        <!-- <el-table-column prop="qq" label="QQ" width="100"></el-table-column> -->
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
        <el-table-column prop="create_time" label="生成时间" width="150"></el-table-column>
        <el-table-column prop="ip" label="ip" width="150"></el-table-column>
        <!-- <el-table-column prop="region" label="省份" width="90"></el-table-column>
        <el-table-column prop="city" label="城市" width="90"></el-table-column>-->
        <!-- <el-table-column prop="update_time" label="修改时间" width="150"></el-table-column> -->
        <!-- <el-table-column prop="end_time" label="截止日期" width="150"></el-table-column> -->
        <el-table-column fixed="right" label="所属人" width="70">
          <template slot-scope="scope">
            <el-tag disable-transitions size="mini">
              {{
              scope.row.person_name
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="来源标签" width="90">
          <template slot-scope="scope">
            <el-tag type="info" disable-transitions size="mini">
              {{
              scope.row.url_from_label_desc
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="信息类型" width="80">
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
        <el-table-column fixed="right" label="信息状态" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="tagType(scope.row.info_state)"
              disable-transitions
              size="mini"
            >{{ scope.row.info_state_desc }}</el-tag>
            <el-button
              type="text"
              @click="openInfoDialog(scope.row.id, scope.$index)"
              style="font-size:12px;"
              :disabled="
                isDeleteShow(scope.row.info_state, scope.row.person_id)
              "
            >更换</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="回访记录" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              slot="reference"
              @click="openVisitContentDialog(scope.row.id, scope.$index)"
              :disabled="
                isDeleteShow(scope.row.info_state, scope.row.person_id)
              "
            >新增</el-button>
            <el-button
              type="text"
              size="mini"
              slot="reference"
              @click="visitContentDetail(scope.row.id)"
            >{{ scope.row.visit_num }} 条</el-button>
            <!-- <el-badge class="mark" :value="scope.row.visit_num" type="primary" /> -->
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="回访状态" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="visitTagType(scope.row.visit_state)"
              disable-transitions
              size="mini"
            >{{ scope.row.visit_state_desc }}</el-tag>

            <el-button
              type="text"
              @click="openVisitDialog(scope.row.id, scope.$index)"
              style="font-size:12px;"
              :disabled="
                isDeleteShow(scope.row.info_state, scope.row.person_id)
              "
            >更换</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="已推送平台" width="100">
          <template slot-scope="scope">
            <el-tag type="info" disable-transitions size="mini">{{ pushTag(scope.row.push_tag) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              @click="changeShowFunc(scope.row.id, scope.$index)"
              type="text"
              size="small"
              :disabled="
                isDeleteShow(scope.row.info_state, scope.row.person_id)
              "
            >修改</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteOne(scope.row.id, scope.$index)"
              :disabled="
                isDeleteShow(scope.row.info_state, scope.row.person_id)
              "
            >删除</el-button>
            <el-tooltip class="item" effect="dark" content="信息将流入回收站且无法恢复" placement="top">
              <el-button
                type="text"
                size="small"
                @click="deleteCompletely(scope.row.id)"
                :disabled="
                  isDeleteShow2(scope.row.info_state, scope.row.person_id)
                "
              >到回收站</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page" style="width:100%;text-align:right;margin-top:13px;">
      <div style="float:left;margin-left:10px">
        <BookTypeOption v-model="bookType" />
        <el-tooltip class="item" effect="dark" content="导出当前页的数据结果" placement="bottom">
          <el-button
            :loading="downloadLoading"
            style="margin-left:5px;float:right;"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload"
            size="small"
          >导出Excel</el-button>
        </el-tooltip>
      </div>
      <el-button
        type="danger"
        size="small"
        :disabled="isRepeatShow()"
        style="float:left;margin-left:10px;"
        @click="repeatShow()"
      >清理重复项</el-button>
      <el-pagination
        background
        @size-change="pageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15,20,30,50,100,200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <div class="other">
      <el-drawer
        :visible.sync="repeatListShow"
        :show-close="false"
        title="标题"
        :with-header="false"
        custom-class="demo-drawer"
        :maskClosable="true"
        ref="drawer"
        size="40%"
      >
        <div class="repeat-list" style="width:100%;height:100vh;padding:10px">
          <div style="padding: 10px 0">
            <el-radio-group v-model="repeatTypeValue" size="small">
              <el-radio-button label="手机重复"></el-radio-button>
              <el-radio-button label="姓名重复"></el-radio-button>
              <el-radio-button label="微信重复"></el-radio-button>
              <el-radio-button label="QQ重复"></el-radio-button>
            </el-radio-group>
            <el-tooltip class="item" effect="dark" content="请选择要清理的项，需要保留的项请勿勾选" placement="bottom">
              <el-button
                type="danger"
                size="small"
                :disabled="repeatSendDisabled"
                :loading="repeatSendLoading"
                style="float:right;margin-right:10px;"
                @click="sendRepeatIds()"
              >清理选中项</el-button>
            </el-tooltip>
          </div>
          <el-table
            :data="repeatTableData"
            v-loading="repeatTableLoading"
            element-loading-text="Loading"
            element-loading-spinner="el-icon-loading"
            border
            fit
            style="width: 100%;"
            height="80vh"
            size="mini"
            @selection-change="repeatTableSelection"
          >
            <el-table-column fixed="left" type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="130"></el-table-column>
            <el-table-column prop="wechat" label="微信" width="100"></el-table-column>
            <el-table-column prop="qq" label="QQ" width="100"></el-table-column>
            <el-table-column prop="create_time" label="生成时间" width="150"></el-table-column>
            <el-table-column fixed="right" prop="visit_num" label="访问次数" width="50">
              <template slot-scope="scope">
                <el-tag type="danger" disable-transitions size="mini">
                  {{
                  scope.row.visit_num
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="来源标签" fixed="right" width="110">
              <template slot-scope="scope">
                <el-tag type="info" disable-transitions size="mini">
                  {{
                  scope.row.url_from_label_desc
                  }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="所属人" width="70">
              <template slot-scope="scope">
                <el-tag disable-transitions size="mini">
                  {{
                  scope.row.person_name
                  }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-drawer>
      <el-dialog
        :visible.sync="changeShow"
        :modal="isChangeShow"
        fullscreen
        width="60%"
        style="background:rgba(0,0,0,0.6);"
      >
        <div style>
          <el-table :data="changeTableData1" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
            <el-table-column prop="form_sign" label="表单标签"></el-table-column>
            <el-table-column prop="form_remarks" label="备注"></el-table-column>
            <el-table-column prop="create_time" label="生成时间"></el-table-column>
            <el-table-column prop="move_time" label="流入时间"></el-table-column>
          </el-table>
          <div style="width:100%;height:15px"></div>
          <el-form ref="form" label-width="300">
            <el-form-item label="信息状态">
              <el-radio-group v-model="changeInfoState">
                <el-radio label="3">已跟进</el-radio>
                <el-radio label="4">预报名</el-radio>
                <el-radio label="5">已报名</el-radio>
              </el-radio-group>
              <el-button
                type="primary"
                size="small"
                style="margin-left:15px;"
                @click="changeSendInfoState"
                :loading="changeButtonLoading1"
              >立即修改</el-button>
            </el-form-item>
            <el-form-item label="回访状态">
              <el-radio-group v-model="changeVisitState">
                <!-- <el-radio label="1">未回访</el-radio> -->
                <el-radio label="2">有效</el-radio>
                <el-radio label="3">重复</el-radio>
                <el-radio label="4">骚扰</el-radio>
                <el-radio label="5">无效</el-radio>
              </el-radio-group>
              <el-button
                type="primary"
                size="small"
                style="margin-left:15px;"
                @click="changeSendVisitState"
                :loading="changeButtonLoading2"
              >立即修改</el-button>
            </el-form-item>
            <el-form-item label="新增一条回访记录">
              <el-input v-model="changeVisitInput" size="small" style="width:50%" clearable></el-input>
              <el-button
                type="primary"
                size="small"
                style="margin-left:15px;"
                @click="changeSendVisitRecord"
                :loading="changeButtonLoading3"
              >立即新增</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="changeTableData2" style="width: 100%">
            <el-table-column type="index" width="100"></el-table-column>
            <el-table-column prop="create_time" label="时间" width="200"></el-table-column>
            <el-table-column prop="content" label="内容" width="1400"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogVisitInfo"
        :modal="isDialogShow"
        destroy-on-close
        style="background:rgba(0,0,0,0.6);"
      >
        <el-form :model="infoStateform">
          <el-form-item label="选择你要更换的信息状态" :label-width="600">
            <el-select v-model="infoStateform.dialogInfoState" placeholder="请选择">
              <el-option label="已跟进" value="3"></el-option>
              <el-option label="预报名" value="4"></el-option>
              <el-option label="已报名" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisitInfo = false">取消</el-button>
          <el-button type="primary" @click="updateInfoState()" :loading="infoSendLoading">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogVisitNew"
        :modal="isDialogShow"
        destroy-on-close
        style="background:rgba(0,0,0,0.6);"
      >
        <el-form :model="visitContentform">
          <el-form-item label="新增一条回访记录(新增回访记录之后，请在【快速更改】更换合适的选项)" :label-width="600">
            <el-input v-model="visitContentform.visitContentInput" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisitNew = false">取消</el-button>
          <el-button type="primary" @click="updateVisitContent()" :loading="visitNewLoading">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogFormVisible"
        :modal="isDialogShow"
        destroy-on-close
        style="background:rgba(0,0,0,0.6);"
      >
        <el-form :model="visitStateform">
          <el-form-item label="选择你要更换的回访状态" :label-width="600">
            <el-select v-model="visitStateform.dialogVisitState" placeholder="请选择">
              <!-- <el-option label="未回访" value="1"></el-option> -->
              <el-option label="有效" value="2"></el-option>
              <el-option label="重复" value="3"></el-option>
              <el-option label="骚扰" value="4"></el-option>
              <el-option label="无效" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateVisitState()" :loading="visitSendLoading">确 定</el-button>
        </div>
      </el-dialog>
      <el-drawer
        :visible.sync="visitContentShow"
        direction="ltr"
        size="30%"
        :withHeader="isVisitDrawerShow"
      >
        <el-table
          :data="visitContentTable"
          v-loading="tableContentLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="create_time" label="日期" width="150"></el-table-column>
          <el-table-column property="content" label="内容" width="320"></el-table-column>
        </el-table>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    BookTypeOption: () => import("./components/BookTypeOption"),
  },
  data() {
    return {
      // apiUrl: "http://localhost/index.php/",
      apiUrl: "http://api.cdomick.com/index.php/",
      //查询和去掉重复
      repeatTypeValue: "手机重复",
      repeatSendDisabled: true,
      repeatSendLoading: false,
      repeatTableLoading: false,
      repeatListShow: false,
      repeatTableData: [],
      //只看搜索类
      onlySearchValue: false,
      onlyDisplayValue: false,
      //修改表单
      changeTableData1: [],
      changeTableData2: [],
      changeInfoState: "",
      changeVisitState: "",
      changeVisitInput: "",
      changeButtonLoading1: false,
      changeButtonLoading2: false,
      changeButtonLoading3: false,
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

      //按钮loading
      visitSendLoading: false,
      infoSendLoading: false,
      visitNewLoading: false,
      //当前选中行索引值
      nowTableIndex: 0,
      //访问次数 数字输入框
      visitNumInput: 1,
      //导出
      bookType: "xlsx",
      downloadLoading: false,
      //修改
      changeShow: false,
      isChangeShow: false,
      changeForm: {
        name: "",
        resource: "",
        desc: "",
      },
      //查看回访记录
      visitContentShow: false,
      tableContentLoading: false,
      visitContentTable: [],
      isVisitDrawerShow: false,
      visitContentId: "",
      dialogVisitNew: false,
      visitContentform: {
        visitContentInput: "",
      },
      //快速更改
      dialogFormVisible: false,
      isDialogShow: false,
      visitThisId: "",
      visitStateform: {
        dialogVisitState: "2",
      },
      //分页
      pageSize: 15,
      totalCount: 0,
      currentPage: 1,
      //所属人
      personIds: [],
      personIdsValue: "0",
      //信息状态
      infoThisId: "",
      dialogVisitInfo: false,
      infoStateform: {
        dialogInfoState: "4",
      },
      infoState: [
        {
          value: "3",
          label: "已跟进",
        },
        {
          value: "4",
          label: "预报名",
        },
        {
          value: "5",
          label: "已报名",
        },
        {
          value: "0",
          label: "已删除",
        },
      ],
      infoStateValue: [],

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
      //回访状态
      visitState: [
        {
          value: "1",
          label: "未回访",
        },
        {
          value: "6",
          label: "进行中",
        },
        {
          value: "2",
          label: "有效",
        },
        {
          value: "3",
          label: "重复",
        },
        {
          value: "4",
          label: "骚扰",
        },
        {
          value: "5",
          label: "无效",
        },
      ],
      visitStateValue: [],

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

      //搜索框
      searchSelect: "",
      keywordsInput: "",
      keywords: "",

      //列表数据
      tableData: [],
    };
  },
  methods: {
    pushTag(tag) {
      if (tag == null) {
        return "无";
      } else {
        return tag;
      }
    },
    //彻底删除
    deleteCompletely(id) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "info/deletecompletely2", {
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
    //清理重复项按钮权限
    isRepeatShow() {
      let person = this.personIdsValue;
      let userPost = Number(this.$store.getters.post);
      let postArr1 = [0, 1, 2, 3];
      if (person == 0) {
        if (postArr1.indexOf(userPost) > -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    //重复项-提交清理
    sendRepeatIds() {
      let ids = this.repeatIds;
      let newIds = [];
      let apiUrl = this.apiUrl;
      this.repeatSendLoading = true;
      for (let v of ids) {
        newIds.push(v["id"]);
      }
      this.$axios
        .get(apiUrl + "info/clear", {
          params: {
            ids: newIds,
            table: "2",
          },
        })
        .then((response) => {
          this.repeatSendLoading = false;
          this.repeatShow();
        })
        .catch((error) => {});
    },
    //重复项多选
    repeatTableSelection(val) {
      if (val.length > 0) {
        this.repeatSendDisabled = false;
        this.repeatIds = val;
      } else {
        this.repeatSendDisabled = true;
      }
    },
    //重复项列表
    repeatShow() {
      this.repeatTableData = [];
      this.repeatListShow = true;
      this.repeatTableLoading = true;
      let apiUrl = this.apiUrl;
      let personId = this.personIdsValue;
      this.$axios
        .get(apiUrl + "info/repeat", {
          params: {
            table: 2,
            type: this.repeatTypeValue,
            personId: personId,
          },
        })
        .then((response) => {
          this.repeatTableLoading = false;
          // console.log(response.data.data)
          this.repeatTableData = response.data.data;
        })
        .catch((error) => {});
    },
    //只看搜索类
    onlyWatchSearch() {
      let onlyArr = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "20",
        "21",
      ];
      let nowArr = this.urlFromLabelValue1;
      console.log(nowArr);
      if (this.onlySearchValue == true) {
        console.log(111);
        nowArr.push(...onlyArr);
        let newArr = Array.from(new Set(nowArr));

        this.urlFromLabelValue1 = newArr;
      } else {
        let set1 = new Set(onlyArr);
        let set2 = new Set(nowArr);
        let subset = [];
        for (let item of set2) {
          if (!set1.has(item)) {
            subset.push(item);
          }
        }
        this.urlFromLabelValue1 = subset;
        console.log(subset);
      }
    },
    //只看展示类
    onlyWatchDisplay() {
      let onlyArr = ["16", "17", "18", "19", "22", "23", "24"];
      let nowArr = this.urlFromLabelValue2;
      if (this.onlyDisplayValue == true) {
        nowArr.push(...onlyArr);
        let newArr = Array.from(new Set(nowArr));
        this.urlFromLabelValue2 = newArr;
      } else {
        let set1 = new Set(onlyArr);
        let set2 = new Set(nowArr);
        let subset = [];
        for (let item of set2) {
          if (!set1.has(item)) {
            subset.push(item);
          }
        }
        this.urlFromLabelValue2 = subset;
      }
    },

    //修改页面 修改信息状态 提交
    changeSendInfoState() {
      let apiUrl = this.apiUrl;
      this.changeButtonLoading1 = true;
      let index = this.nowTableIndex;
      let id = this.infoThisId;
      let infoState = this.changeInfoState;
      let param = {
        id: id,
        info_state: infoState,
      };
      let infoStateDesc = this.getInfoStateDesc(infoState);
      this.$axios
        .get(apiUrl + "info/updateinfostate", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          this.tableData[index].info_state = infoState;
          this.tableData[index].info_state_desc = infoStateDesc;
          this.$forceUpdate;
          this.changeButtonLoading1 = false;
        })
        .catch((error) => {});
    },
    //修改页面 修改回访状态 提交
    changeSendVisitState() {
      let apiUrl = this.apiUrl;
      this.changeButtonLoading2 = true;
      let index = this.nowTableIndex;
      let id = this.infoThisId;
      let visitState = this.changeVisitState;
      let param = {
        id: id,
        visit_state: visitState,
      };
      let infoVisitDesc = this.getVisitStateDesc(visitState);
      this.$axios
        .get(apiUrl + "info/update", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          this.tableData[index].visit_state = visitState;
          this.tableData[index].visit_state_desc = infoVisitDesc;
          this.$forceUpdate;
          this.changeButtonLoading2 = false;
        })
        .catch((error) => {});
    },
    //修改页面 新增回访记录
    changeSendVisitRecord() {
      let apiUrl = this.apiUrl;
      this.changeButtonLoading3 = true;
      let id = this.infoThisId;
      let index = this.nowTableIndex;
      let param = {
        id: id,
        content: this.changeVisitInput,
      };
      this.$axios
        .get(apiUrl + "info/insertone", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          if (response.data.change == 1) {
            this.tableData[index].visit_state_desc = "进行中";
            this.tableData[index].visit_state = 6;
          }
          this.tableData[index].visit_num =
            Number(this.tableData[index].visit_num) + 1;
          this.$forceUpdate;
          this.changeButtonLoading3 = false;
          this.changeVisitInput = "";
          this.changeGetVisitList(id);
        })
        .catch((error) => {
          this.$message({
            message: "失败！",
            type: "success",
          });
        });
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
          "流入时间",
          "修改时间",
          "截止日期",
          "所属人",
          "来源标签",
          "信息类型",
          "信息状态",
          "回访记录",
          "回访状态",
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
          "move_time",
          "update_time",
          "end_time",
          "person_name",
          "url_from_label_desc",
          "info_type_desc",
          "info_state_desc",
          "visit_num",
          "visit_state_desc",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "私海list",
          autoWidth: true,
          bookType: this.bookType,
        });
        this.downloadLoading = false;
      });
    },
    //修改页面 获取访问记录list
    changeGetVisitList(id) {
      let param = {
        id: id,
      };
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "info/detail", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          let data = response.data.data;
          console.log(data);
          this.changeTableData2 = data;
        })
        .catch((error) => {});
    },
    //修改按钮 显示
    changeShowFunc(id, index) {
      this.changeShow = true;
      this.nowTableIndex = index;
      this.infoThisId = id;
      let obj = this.tableData[index];
      this.changeTableData1[0] = obj;
      this.changeInfoState = obj.info_state;
      this.changeVisitState = obj.visit_state;
      this.changeGetVisitList(id);
    },
    //删除一条信息
    deleteOne(id, index) {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "info/deleteprivat", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          this.tableData[index].info_state = 0;
          this.tableData[index].info_state_desc = "已删除";
        })
        .catch((error) => {});
    },
    getVisitStateDesc(visitState) {
      // if (visitState == "1") {
      //   return "未回访";
      // }
      // if (visitState == "6") {
      //   return "进行中";
      // }
      if (visitState == "2") {
        return "有效";
      }
      if (visitState == "3") {
        return "重复";
      }
      if (visitState == "4") {
        return "骚扰";
      }
      if (visitState == "5") {
        return "无效";
      }
    },
    getInfoStateDesc(infoState) {
      if (infoState == "0") {
        return "已删除";
      }
      if (infoState == "2") {
        return "已回流";
      }
      if (infoState == "3") {
        return "已跟进";
      }
      if (infoState == "4") {
        return "预报名";
      }
      if (infoState == "5") {
        return "已报名";
      }
    },
    //快速更换信息状态
    updateInfoState() {
      let apiUrl = this.apiUrl;
      this.infoSendLoading = true;
      let index = this.nowTableIndex;
      let id = this.infoThisId;
      let infoState = this.infoStateform.dialogInfoState;
      let param = {
        id: id,
        info_state: infoState,
      };
      let infoStateDesc = this.getInfoStateDesc(infoState);
      this.$axios
        .get(apiUrl + "info/updateinfostate", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          this.tableData[index].info_state = infoState;
          this.tableData[index].info_state_desc = infoStateDesc;
          this.$forceUpdate;
          this.infoSendLoading = false;
          this.dialogVisitInfo = false;
        })
        .catch((error) => {});
    },
    //信息状态 获取id 打开快速更改
    openInfoDialog(id, index) {
      this.nowTableIndex = index;
      this.dialogVisitInfo = true;
      this.infoThisId = id;
    },
    //回访记录 获取记录
    visitContentDetail(id) {
      this.visitContentShow = true;
      this.tableContentLoading = true;
      let apiUrl = this.apiUrl;
      let param = {
        id: id,
      };
      this.$axios
        .get(apiUrl + "info/detail", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          this.tableContentLoading = false;
          this.visitContentTable = response.data.data;
        })
        .catch((error) => {});
    },

    //回访记录 获取id 打开新增
    openVisitContentDialog(id, index) {
      this.nowTableIndex = index;
      this.dialogVisitNew = true;
      this.visitContentId = id;
    },
    //回访记录 提交新增
    updateVisitContent() {
      this.visitNewLoading = true;
      let apiUrl = this.apiUrl;
      let id = this.visitContentId;
      let index = this.nowTableIndex;
      let param = {
        id: id,
        content: this.visitContentform.visitContentInput,
      };
      this.$axios
        .get(apiUrl + "info/insertone", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          // console.log(response)
          if (response.data.change == 1) {
            this.tableData[index].visit_state_desc = "进行中";
            this.tableData[index].visit_state = 6;
          }
          this.tableData[index].visit_num =
            Number(this.tableData[index].visit_num) + 1;
          this.$forceUpdate;
          this.visitNewLoading = false;
          this.dialogVisitNew = false;
          this.visitContentform.visitContentInput = "";
        })
        .catch((error) => {
          this.$message({
            message: "失败！",
            type: "success",
          });
        });
    },
    //快速更改 获取id
    openVisitDialog(id, index) {
      this.nowTableIndex = index;
      this.dialogFormVisible = true;
      this.visitThisId = id;
    },
    //快速更改
    updateVisitState() {
      let apiUrl = this.apiUrl;
      this.visitSendLoading = true;
      let index = this.nowTableIndex;
      let id = this.visitThisId;
      let visitState = this.visitStateform.dialogVisitState;
      let visitStateDesc = this.getVisitStateDesc(visitState);
      let param = {
        id: id,
        visit_state: visitState,
      };
      this.$axios
        .get(apiUrl + "info/update", {
          params: {
            data: param,
          },
        })
        .then((response) => {
          this.tableData[index].visit_state = visitState;
          this.tableData[index].visit_state_desc = visitStateDesc;
          if (visitState == 2) {
            this.$axios
              .get(apiUrl + "jzl/sendone", {
                params: {
                  id: this.visitThisId,
                },
              })
              .then((response) => {
                this.tableData[index].push_tag = "九枝兰";
              })
              .catch((error) => {});
          }
          this.$forceUpdate;
          this.visitSendLoading = false;
          this.dialogFormVisible = false;
        })
        .catch((error) => {});
    },
    //彻底删除按钮是否禁用
    isDeleteShow2(state, personId) {
      let isAll = this.personIdsValue;
      let userRole = Number(this.$store.getters.role);
      let userId = Number(this.$store.getters.id);
      let showRoleArr = [0, 1, 2, 6];
      let isInfoShow = [0, 2];
      if (isInfoShow.indexOf(state) !== -1) {
        return true;
      } else {
        if (isAll == "0") {
          return true;
        } else {
          if (userId == personId) {
            return true;
          } else {
            if (showRoleArr.indexOf(userRole) > -1) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    },
    //删除按钮是否禁用
    isDeleteShow(state, personId) {
      //咨询师选择全部
      let isAll = this.personIdsValue;
      let userRole = Number(this.$store.getters.role);
      let userId = Number(this.$store.getters.id);
      let showRoleArr = [0, 1, 2, 6];
      let isInfoShow = [0, 2];
      if (state == 0) {
        return true;
      }
      if (isInfoShow.indexOf(state) !== -1) {
        return true;
      } else {
        if (isAll == "0") {
          return true;
        } else {
          if (userId == personId) {
          } else {
            if (showRoleArr.indexOf(userRole) > -1) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
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

    //获取咨询师列表
    kczxlist() {
      let apiUrl = this.apiUrl;
      this.personIds = [];
      this.$axios
        .get(apiUrl + "info/kczxlist", {
          params: {},
        })
        .then((response) => {
          this.personIds = response.data.data;
        })
        .catch((error) => {});
    },
    //所属人 权限
    isPersonShow(value) {
      let userRole = Number(this.$store.getters.role);
      let userId = Number(this.$store.getters.id);
      let showRoleArr = [0, 1, 2, 6];
      let isRole = true;
      if (showRoleArr.indexOf(userRole) == -1) {
        //是否拥有权限
        isRole = false;
      }
      if (value == 0) {
        //全部
        return false;
      } else if (isRole) {
        //是否拥有权限
        return false;
      } else if (value == userId) {
        //是否是本人的按钮
        return false;
      } else {
        return true;
      }
    },

    //重置数据过滤器
    resetFilterForm() {
      this.infoStateValue = [];
      // this.urlFromLabelValue = [];
      this.urlFromLabelValue1 = [];
      this.urlFromLabelValue2 = [];
      this.visitStateValue = [];
      this.searchSelect = "";
      this.keywordsInput = "";
      this.value1 = "";
      this.value2 = "";
      this.infoTypeValue = [];
      this.onlySearchValue = false;
      this.onlyDisplayValue = false;
    },

    //收集所有过滤的值
    getFileterContent() {
      let param = {
        table: 2,
        person_id: this.personIdsValue,
        info_state: this.infoStateValue,
        url_from_label1: this.urlFromLabelValue1,
        url_from_label2: this.urlFromLabelValue2,
        keywords_type: this.searchSelect,
        keywords: this.keywordsInput,
        visit_state: this.visitStateValue,
        time: this.value2,
        page: this.currentPage,
        pageSize: this.pageSize,
        info_type: this.infoTypeValue,
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
      let apiUrl = this.apiUrl;
      this.tableData = [];
      this.tableLoading = true;
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
  },
  mounted() {
    this.kczxlist();
    this.sendFilter();
  },
  watch: {
    personIdsValue: "sendFilter",
    repeatTypeValue: "repeatShow",
  },
  computed: {},
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
  padding: 20px;
}
.main-head {
  width: 100%;
  height: 14vh;
}
.main-head-1,
.main-head-2,
.main-head-3 {
  width: 100%;
  margin-bottom: 10px;
}
.table {
  margin-top: 10px;
}
.head-part1 {
  width: 100%;
  height: 28px;
  margin-bottom: 10px;
}
.part1-left {
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  float: left;
}
</style>
