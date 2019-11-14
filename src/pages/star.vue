<template>
  <div class="content">
    <div class="title">科学育儿=耐心+规则+鼓励</div>
    <van-popup
      class="card"
      v-model="settingDialogVisible"
      position="bottom"
      :style="{ height: '80%' }"
    >
      设置预留项，自定义奖励等级和图片，即将开启
      <div>
        <h3>最近变更记录：</h3>手动变更数量
        <van-stepper v-model="stepNum" min="-100" max="100" />
        <van-button type="primary" round @click="updateStars(stepNum)">变更星星</van-button>
      </div>

      <table>
        <tr>
          <th>序号</th>
          <th>操作时间</th>
          <th>星星变动数</th>
        </tr>
        <tr v-for="(list, index) in starsHistory" :key="list.id">
          <td>{{ index + 1 }}</td>
          <td>{{ formatCtime(list.createdAt) }}</td>
          <td>{{ list.stars > 0 ? "+" + list.stars : list.stars }}</td>
        </tr>
      </table>
    </van-popup>
    <div>
      <div style="font-size:22px;line-height:40px;color:#909399;margin-top:20px;">今天是 {{ today }}</div>
      <div class="main" shadow="hover">
        <div>你好，{{ name }}小朋友</div>
        <div>
          总计:
          <span class="stars">{{ totalstars }}</span> 颗星星！
        </div>
      </div>
      <div class="main" shadow="hover">
        <div>
          今日奖励星星：
          <span class="stars">{{ todaystars }}</span>
        </div>
        <van-rate v-model="todaystars" class="bigrate"></van-rate>

        <div style="margin-top:24px;">
          <van-button type="primary" round @click="adddata">提交</van-button>
        </div>
      </div>
    </div>
    <van-button type="primary" @click="dialogVisible=true">兑换</van-button>
    <van-button type="primary" @click="settingDialogVisible=true">设置</van-button>
    <van-popup
      closeable
      v-model="dialogVisible"
      position="bottom"
      :style="{ height: '60%' }"
      :close="handleClose"
    >
      <!-- <van-dialog title="我要兑换" :visible.sync="dialogVisible" width="90%" :before-close="handleClose"> -->
      <h4>选择要兑换的礼物等级：</h4>

      <div>
        <van-row>
          <van-col :span="7" :offset="1">
            <!-- <van-card :body-style="{ padding: '0px' }" shadow="hover"> -->
            <div @click="clickPresent(0)" class="card" :class="{ selected: selectedIndex == 1 }">
              <div>￥1-149</div>
              <img src="./pic/60.jpg" class="image" />
              <div style="padding: 0px;">
                <span>{{ presentList[0] }} 颗星</span>
              </div>
            </div>
            <!-- </van-card> -->
          </van-col>
          <van-col :span="7" :offset="1">
            <!-- <van-card :body-style="{ padding: '0px' }" shadow="hover"> -->
            <div @click="clickPresent(1)" class="card" :class="{ selected: selectedIndex == 2 }">
              <div>￥150-299</div>
              <img src="./pic/120.jpg" class="image" />
              <div style="padding: 0px;">
                <span>{{ presentList[1] }} 颗星</span>
              </div>
            </div>
            <!-- </van-card> -->
          </van-col>
          <van-col :span="7" :offset="1">
            <!-- <van-card :body-style="{ padding: '0px' }" shadow="hover"> -->
            <div @click="clickPresent(2)" class="card" :class="{ selected: selectedIndex == 3 }">
              <div>￥300-500</div>
              <img src="./pic/200.jpg" class="image" />
              <div style="padding: 0px;">
                <span>{{ presentList[2] }} 颗星</span>
              </div>
            </div>
            <!-- </van-card> -->
          </van-col>
        </van-row>
        <van-row>
          <div style="margin-top:35px;">
            <van-button type="primary" @click="useStars">确 定</van-button>
          </div>
        </van-row>
      </div>
      <!-- </van-dialog> -->
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeIndex: 0,
      activeName: "login",
      loginDialogVisible: false,
      loginORsignup: true,
      settingDialogVisible: false,
      todaystars: 0,
      totalstars: 0,
      name: "",
      user_name: "",
      today: "",
      dialogVisible: false,
      wantUse: 0,
      presentList: [60, 120, 200],
      selectedIndex: 0,
      posttime: 0,
      starsHistory: [],
      stepNum: 0
    };
  },
  mounted() {
    var d = new Date();
    this.today =
      d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
    this.initSelect();
    this.refreshID();
  },

  methods: {
    formatCtime(d) {
      let data = new Date(d);
      // console.log(data.format("yyyy"));
      return data.toLocaleString();
    },

    refreshID() {
      //拉取本id的星星数
      // fetch("http://localhost:3012/stars/" + user_name, {
      this.$axios
        .post("api/stars/total", {})
        // .then(response => {
        //   return response.json();
        // })

        .then(res => {
          console.log(res);
          let data = res.data.data;
          this.loginDialogVisible = false;
          this.totalstars = data.stars.stars - 0 || 0;
          this.name = data.real_name;
          this.starsHistory = data.history;
        })
        .catch(err => {
          this.loginDialogVisible = true;
          this.loginORsignup = true;
          console.log(err);
        });
    },

    initSelect() {
      this.wantUse = 0;
      this.selectedIndex = 0;
      this.dialogVisible = false;
    },

    updateStars(stars) {
      this.$axios
        .post("api/stars/add", {
          stars: stars - 0,
          user_name: this.user_name
        })
        .then(res => {
          console.log(res, this.totalstars);
          if (res.statusText == "OK") {
            this.refreshID();
          } else {
            this.$toast({
              type: "fail",
              message: "添加失败，请报告管理员"
            });
          }
        });
    },
    useStars() {
      if (this.wantUse != 0) {
        if (this.wantUse <= this.totalstars) {
          this.$dialog
            .confirm({
              title: "兑换",
              message: "要花费" + this.wantUse + "颗星星兑换本级礼物？"
            })

            .then(() => {
              this.$toast({
                type: "success",
                message: "兑换成功!"
              });
              this.updateStars(-1 * this.wantUse);
              this.dialogVisible = false;
              this.initSelect();
            })
            .catch(() => {
              this.$toast({
                type: "info",
                message: "已取消兑换"
              });
              this.initSelect();
            });
        } else {
          this.$toast({
            type: "fail",
            message: "星星还不够换哦，继续努力吧"
          });
        }
      } else {
        this.$toast({
          type: "warning",
          message: "尚未选择兑换等级"
        });
      }
    },
    clickPresent(type) {
      console.log(type);
      if (type == 0) {
        this.selectedIndex = 1;
        this.wantUse = 60;
      } else if (type == 1) {
        this.wantUse = 120;
        this.selectedIndex = 2;
      } else if (type == 2) {
        this.wantUse = 200;
        this.selectedIndex = 3;
      } else {
      }
    },

    adddata() {
      var clip = new Date() - this.posttime;
      if (clip < 600000) {
        this.$toast.fail("每10分钟只能加星一次哦");
      } else {
        if (this.todaystars != 0) {
          this.$axios
            .post("api/stars/add", {
              stars: this.todaystars,
              user_name: this.user_name
            })
            .then(res => {
              console.log(res);
              if (res.statusText == "OK") {
                this.refreshID();
                this.$toast({
                  type: "success",
                  message: "又加星了呀!很棒"
                });
                this.posttime = new Date();
              } else {
                this.$toast({
                  type: "fail",
                  message: "添加失败，请报告管理员"
                });
              }
            });
        } else {
          this.$toast({
            type: "fail",
            message: "未选择星星数量"
          });
        }
      }
    },
    handleClose(done) {
      this.initSelect();
      done();
    }
  }
};
</script>

<style>
.title {
  padding: 40px 0 30px 0;
  font-family: cursive;
}
.content {
  font-size: 28px;
  /* background-image: url("./pic/bg3.jpg"); */
}
.stars {
  font-size: 24px;
  color: blue;
}
.selected {
  background-color: rgb(225, 247, 247);
}
.image {
  width: 100%;
  height: auto;
}

i.van-rate__icon {
  font-size: 36px;
}
.card {
  font-size: 18px;
}
</style>
