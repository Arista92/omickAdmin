<template>
  <div class="dashboard-container">
    <div class="head">
      <div class="head-title">
        <h2>我的工作台</h2>
      </div>
      <div class="small-title">我的数据</div>
      <div class="head-user">
        <div class="avatar">
          <img :src="avatar" alt />
        </div>
        <div class="head-info">
          <div class="info-1">
            hello，
            <b>{{ nickname }}</b>，祝你开心每一天！
          </div>
          <div class="info-2">{{ postdesc }}</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <h2>系统更新</h2>
        <div class="left-content" style="width:100%;padding:30px">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Avatar } from "element-ui";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["nickname", "postdesc", "avatar"])
  },
  mounted() {},
  data() {
    return {
      text: "",
      activities: [
         {
          content: "【私海】新增推送九枝兰功能。当信息被更改回访状态为‘有效’时，会触发推送接口，将此信息自动推送至九枝兰平台（或者其他平台），推送成功会显示‘九枝兰’标签，失败则显示‘无’",
          timestamp: "2020-9-13"
        },
          {
          content: "【视频管理】新增了 视频管理 功能",
          timestamp: "2020-7-3"
        },
          {
          content: "【公海，私海】交换了表单备注和表单标签的顺序",
          timestamp: "2020-7-2"
        },
           {
          content: "【私海】调整了回访记录详情的宽度，让回访内容可以全部显示，更易于浏览",
          timestamp: "2020-6-12"
        },
         {
          content: "【数据分析】不同时间粒度，分类的数据统计，占比",
          timestamp: "2020-6-9"
        },
          {
          content: "【公海，私海】增加了[进行中]状态标签，移除了更换回访状态里的未回访标签（说明1：信息流入私海，默认标签是未回访，当第一次产生回访记录时，标签会自动更换为进行中；说明2：未回访，进行中为被动标签。有效，无效，重复，骚扰为主动标签）",
          timestamp: "2020-6-5"
        },
          {
          content: "【公海，私海】增加了 58同城、美团点评 标签",
          timestamp: "2020-6-3"
        },
         {
          content: "【个人中心】增加了 头像设置 个人信息设置 修改登录密码功能",
          timestamp: "2020-5-21"
        },
         {
          content: "【个人主页】增加了 资料卡 ，可查看其他成员的资料卡，后续会将个人数据，动态等内容增加上去",
          timestamp: "2020-5-21"
        },
        {
          content: "【私海】修改了筛选器的布局和样式",
          timestamp: "2020-5-18"
        },
        {
          content:
            "【公海，私海】增加了 百度信息流 标签,增加了每页条数的选项：10条/页，20条/页，200条/页",
          timestamp: "2020-5-17"
        },
        {
          content:
            "【公海，私海】取消了 彻底删除 功能，替换成 回收站 功能，点击 到回收站 按钮，信息会流入回收站。",
          timestamp: "2020-5-13"
        },
        {
          content:
            "【公海，私海】更改了信息采集员的权限：可以将信息丢弃到回收站。",
          timestamp: "2020-5-12"
        },
        {
          content:
            "【公海，私海】增加了 彻底删除 功能，需要部门主管级别的权限才能操作，删除之后将不会显示在信息列表中",
          timestamp: "2020-4-22"
        },
        {
          content: "【公海，私海】调整了标签的颜色和样式，视觉更易区分",
          timestamp: "2020-4-21"
        },
        {
          content:
            "【公海】调整了信息采集员的权限：在公海可以删除信息（软删除），删除之后信息仍会显示在列表，状态会切换成已删除",
          timestamp: "2020-4-20"
        },
        {
          content:
            "【文章管理】文章管理系统，包括 文章发布 富文本编辑器编辑，图片上传，文章删除，文章修改",
          timestamp: "2020-4-19"
        },
        {
          content: "【系统管理员】列表页，账户密码修改，账户删除",
          timestamp: "2020-4-10"
        },
        {
          content: "【系统管理员】新增用户，主管级别的权限可以添加权限内的角色",
          timestamp: "2020-4-9"
        },
        {
          content: "【私海】新增了 switch开关 来快速选择搜索类和展示类",
          timestamp: "2020-4-8"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.head {
  padding: 30px 30px 0 30px;
  border-bottom: 1px solid #eee;
}
.head-title {
  width: 100%;
  height: 20px;
  margin-bottom: 30px;
}
.head-user {
  width: 100%;
  height: 100px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.avatar {
  width: 80px;
  height: 80px;
  float: left;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.head-info {
  width: 93%;
  height: 100px;
  float: left;
}
.info-1 {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
}
.info-2 {
  width: 100%;
  height: 50px;
  line-height: 40px;
  font-size: 14px;
  color: #8c8c8c;
}
.head-data {
  width: 20%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.data-one-1 {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #8c8c8c;
  font-size: 14px;
}
.data-one-2 {
  width: 100%;
  text-align: center;
  line-height: 40px;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
}
.content {
  width: 100%;
}
.content-left {
  width: 55%;
  padding: 30px;
  background: #fff;
}
.small-title {
  width: 100%;
  font-size: 14px;
}
.content-right {
  width: 44%;
  height: 200px;
  padding: 30px;
  background: #fff;
}
.left-head {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
}
.left-title {
  width: 20%;
}
.member {
  width: 100%;
}
</style>
