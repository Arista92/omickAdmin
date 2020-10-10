<template>
  <div class="main">
    <div class="left">
      <h2 style="border-bottom: 1px solid #f0f2f5;">信息</h2>
      <div class="num">
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n1}}</span>条
          </div>
          <div class="num-one-title">总数</div>
        </div>
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n2}}</span>条
          </div>
          <div class="num-one-title">今日</div>
        </div>
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n3}}</span>条
          </div>
          <div class="num-one-title">昨日</div>
        </div>
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n4}}</span>条
          </div>
          <div class="num-one-title">最近一周</div>
        </div>
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n5}}</span>条
          </div>
          <div class="num-one-title">最近一个月</div>
        </div>
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n6}}</span>条
          </div>
          <div class="num-one-title">搜索类</div>
        </div>
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n7}}</span>条
          </div>
          <div class="num-one-title">展示类</div>
        </div>
      </div>
      <h2 style="border-bottom: 1px solid #f0f2f5;">内容</h2>
      <div class="num">
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n8}}</span>篇
          </div>
          <div class="num-one-title">新闻</div>
        </div>
        <div class="num-one">
          <div class="num-one-data">
            <span>{{n9}}</span>条
          </div>
          <div class="num-one-title">视频</div>
        </div>
      </div>
      <h2 style="border-bottom: 1px solid #f0f2f5;">信息趋势图</h2>
    </div>
    <div class="right">
      <div style="width:100%;height:30px;">
        <div :class="className1" @click="click1()">来源渠道占比</div>
        <div :class="className2" @click="click2()">回访状态占比</div>
      </div>
      <div style="width:100%;height:10px;"></div>
      <h4>时间粒度</h4>
      <el-radio-group v-model="time" size="small">
        <el-radio-button label="1">全部</el-radio-button>
        <el-radio-button label="2">本月</el-radio-button>
        <el-radio-button label="3">今日</el-radio-button>
        <el-radio-button label="6">昨日</el-radio-button>
        <el-radio-button label="4">最近一周</el-radio-button>
        <el-radio-button label="5">最近一个月</el-radio-button>
      </el-radio-group>

      <div style="width:100%;height:15px"></div>
      <div class="line" v-for="proportion in proportionData" :key="proportion.index">
        <div class="line-left">{{proportion.label}}({{proportion.c}})</div>
        <div class="line-right">
          <Progress :percent="proportion.b" status="active" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // apiUrl: "http://localhost/index.php/",
      apiUrl: "http://api.cdomick.com/index.php/",
      time: 1,
      nowTitle: 1,
      className1: "title-on",
      className2: "title-off",
      proportionData: [],
      proportionTotal: "",
      n1: "",
      n2: "",
      n3: "",
      n4: "",
      n5: "",
      n6: "",
      n7: "",
      n8: "",
      n9: "",
      config: {
        number: [999],
        content: "{nt}个"
      }
    };
  },
  components: {
    number: () => import("./components/number")
  },
  mounted() {
    this.getProportion();
    this.getInfoNum();
  },
  watch: {
    time: "getProportion"
  },
  methods: {
    click1() {
      this.className1 = "title-on";
      this.className2 = "title-off";
      this.nowTitle = 1;
      this.getProportion();
    },
    click2() {
      this.className2 = "title-on";
      this.className1 = "title-off";
      this.nowTitle = 2;
      this.getProportion();
    },
    getProportion() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "data/proportion", {
          params: {
            time: this.time,
            type: this.nowTitle
          }
        })
        .then(response => {
          this.proportionData = response.data.data;
          this.proportionTotal = response.data.total;
        })
        .catch(error => {});
    },
    getInfoNum() {
      let apiUrl = this.apiUrl;
      this.$axios
        .get(apiUrl + "data/infonum", {})
        .then(response => {
          this.n1 = response.data.n1;
          this.n2 = response.data.n2;
          this.n3 = response.data.n3;
          this.n4 = response.data.n4;
          this.n5 = response.data.n5;
          this.n6 = response.data.n6;
          this.n7 = response.data.n7;
          this.n8 = response.data.n8;
          this.n9 = response.data.n9;
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.num-one-data span {
  font-size: 38px;
  font-weight: 700;
  margin-right: 5px;
  // color: #378adf;
  color: #f18b8b;
}
.num-one-data {
  width: 100%;
  height: 55px;
  text-align: center;
}
.num-one-title {
  width: 100%;
  text-align: center;
  height: 20px;
  font-size: 14px;
  font-weight: 600;
}
.num-one {
  width: 110px;
  height: 75px;
  margin-right: 3%;
}
.num {
  width: 100%;
  height: 110px;
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
::v-deep .ivu-progress-bg {
  background-color: #81d8d0;
}
::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #81d8d0;
  border-color: #81d8d0;
}
.main {
  width: 100%;
  height: 95vh;
  padding: 20px;
  background: #f0f2f5;
}
.right {
  width: 38%;
  height: 90vh;
  padding: 15px;
  background: #fff;
  float: left;
  margin-left: 1.3%;
}
.left {
  padding: 15px;
  width: 60%;
  height: 90vh;
  background: #fff;
  float: left;
}
.title-on {
  float: left;
  padding-right: 10px;
  display: block;
  color: #81d8d0;
  font-size: 1.5em;
  font-weight: bold;
}
.title-off {
  float: left;
  margin-top: 10px;
  padding-right: 10px;
  display: block;
  font-weight: bold;
}
.line {
  width: 100%;
  height: 30px;
}
.line-left {
  width: 20%;
  height: 30px;
  float: left;
  text-align: left;
  margin-right: 1%;
}
.line-right {
  width: 79%;
  height: 30px;
  float: left;
}
</style>