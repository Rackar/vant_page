<template>
  <div class="content">
    <div>科学育儿=耐心+规则+鼓励</div>
    <!-- <van-menu class="van-menu-demo" mode="horizontal" @select="handleSelect">
      <van-menu-item index="1">登录/注册</van-menu-item>

      <van-menu-item index="2">我要兑换</van-menu-item>
      <van-menu-item index="3">设置</van-menu-item>
    </van-menu>-->
    <!-- <van-dialog :visible.sync="loginDialogVisible" width="350px" :before-close="handleCloseLogin">
      <div>孩子完成约定任务后加星，累积星星可兑换奖励。微信收藏本页方便记录。</div>
      <van-tabs v-model="activeName" type="card">
        <van-tab-pane label="登录" name="login">
          <login @refreshID="refreshID" />
        </van-tab-pane>
        <van-tab-pane label="注册" name="signup">
          <signup @refreshID="refreshID" />
        </van-tab-pane>
      </van-tabs>
    </van-dialog>-->
    <van-dialog :visible.sync="settingDialogVisible" width="350px">
      设置预留项，自定义奖励等级和图片，即将开启
      <div>
        <h3>最近变更记录：</h3>
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
    </van-dialog>
    <!-- <van-button @click="(loginDialogVisible = true), (loginORsignup = true)"
      >登录/注册</van-button
    >-->
    <div>
      <div style="font-size:22px;line-height:40px;color:#909399;margin-top:20px;">今天是 {{ today }}</div>
      <!-- <br /> -->
      <van-card class="main" shadow="hover">
        <div>你好，{{ name }}小朋友</div>
        <div>
          总计:
          <span class="stars">{{ totalstars }}</span> 颗星星！
        </div>
      </van-card>

      <!-- <van-button @click="dialogVisible = true">我要兑换</van-button> -->

      <van-card class="main" shadow="hover">
        <div>
          今日奖励星星：
          <span class="stars">{{ todaystars }}</span>
        </div>
        <van-rate v-model="todaystars" class="bigrate"></van-rate>

        <div style="margin-top:24px;">
          <van-button type="primary" round @click="adddata">提交</van-button>
        </div>
      </van-card>
    </div>

    <van-dialog title="我要兑换" :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
      <h3>选择要兑换的礼物等级：</h3>

      <div>
        <van-row>
          <van-col :span="7" :offset="1">
            <van-card :body-style="{ padding: '0px' }" shadow="hover">
              <div @click="clickPresent(0)" :class="{ selected: selectedIndex == 1 }">
                <div>￥1-149</div>
                <img src="./pic/60.jpg" class="image" />
                <div style="padding: 0px;">
                  <span>{{ presentList[0] }} 颗星</span>
                </div>
              </div>
            </van-card>
          </van-col>
          <van-col :span="7" :offset="1">
            <van-card :body-style="{ padding: '0px' }" shadow="hover">
              <div @click="clickPresent(1)" :class="{ selected: selectedIndex == 2 }">
                <div>￥150-299</div>
                <img src="./pic/120.jpg" class="image" />
                <div style="padding: 0px;">
                  <span>{{ presentList[1] }} 颗星</span>
                </div>
              </div>
            </van-card>
          </van-col>
          <van-col :span="7" :offset="1">
            <van-card :body-style="{ padding: '0px' }" shadow="hover">
              <div @click="clickPresent(2)" :class="{ selected: selectedIndex == 3 }">
                <div>￥300-500</div>
                <img src="./pic/200.jpg" class="image" />
                <div style="padding: 0px;">
                  <span>{{ presentList[2] }} 颗星</span>
                </div>
              </div>
            </van-card>
          </van-col>
        </van-row>
        <van-row>
          <div style="margin-top:35px;">
            <van-button type="primary" round @click="useStars">确 定</van-button>
          </div>
        </van-row>
      </div>
    </van-dialog>
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
      starsHistory: []
    };
  },
  mounted() {
    var d = new Date();
    this.today =
      d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
    this.initSelect();
    this.checkLogin();
    // this.getdata();
  },

  methods: {
    formatCtime(d) {
      let data = new Date(d);
      // console.log(data.format("yyyy"));
      return data.toLocaleString();
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == 1) {
        this.loginDialogVisible = true;
        this.loginORsignup = true;
      } else if (key == 2) {
        this.dialogVisible = true;
      } else if (key == 3) {
        this.settingDialogVisible = true;
      }
    },
    refreshID(user_name) {
      //拉取本id的星星数
      this.user_name = user_name;
      // fetch("http://localhost:3012/stars/" + user_name, {
      this.$axios
        .post("api/stars/total", {})
        // .then(response => {
        //   return response.json();
        // })

        .then(res => {
          console.log(res);
          res = res.data;
          this.loginDialogVisible = false;
          this.totalstars = res.stars - 0 || 0;
          this.name = res.real_name;

          localStorage.setItem("user_name", user_name);
          //   this.totalstars -= stars;
          // this.$emit("refreshID", this.user_name);
          // this.$message({
          //   type: "success",
          //   message: "注册成功"
          // });
          // fetch("http://localhost:3012/stars/list/" + user_name, {
          //   this.$axios("stars/list/" + user_name, {
          //     method: "GET"
          //   })
          //     // .then(response => {
          //     //   return response.json();
          //     // })
          //     .then(res => {
          //       this.starsHistory = res.data;
          //     });
        })
        .catch(err => {
          localStorage.removeItem("user_name");
          this.loginDialogVisible = true;
          this.loginORsignup = true;
          console.log(err);
        });
    },
    handleCloseLogin(done) {
      if (this.checkLogin()) done();
    },
    initSelect() {
      this.wantUse = 0;
      this.selectedIndex = 0;
      this.dialogVisible = false;
    },
    checkLogin() {
      //   if (localStorage.length > 0) {
      //     var user_name = localStorage.getItem("user_name");
      //     if (user_name != null) {
      //       if (this.name == "") this.refreshID(user_name);
      //       return true;
      //     } else {
      //       //重新登录
      //       this.loginDialogVisible = true;
      //       this.loginORsignup = true;
      //       return false;
      //     }
      //   } else {
      //     this.loginDialogVisible = true;
      //     return false;
      //   }
    },
    updateStars(stars) {
      this.$axios
        .post("stars/add", {
          stars: 0 - stars,
          user_name: this.user_name
        })
        // fetch("http://localhost:3012/stars/add", {
        //   method: "POST",
        //   mode: "cors",
        //   body: JSON.stringify({
        //     stars: 0 - stars,
        //     user_name: this.user_name
        //   }),
        //   // fetch("http://123.206.94.184:3012/postdata", {
        //   //   method: "POST",
        //   //   mode: "cors",
        //   //   body: JSON.stringify({ data: 0 - stars }),
        //   headers: {
        //     "content-type": "application/json"
        //   }
        // })
        .then(res => {
          console.log(res, this.totalstars);
          if (res.statusText == "OK") {
            this.refreshID(this.user_name);
          } else {
            this.$message({
              type: "error",
              message: "添加失败，请报告管理员"
            });
          }
        });
    },
    useStars() {
      if (this.wantUse != 0) {
        if (this.wantUse <= this.totalstars) {
          this.$confirm(
            "要花费" + this.wantUse + "颗星星兑换本级礼物？",
            "确定兑换",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.$message({
                type: "success",
                message: "兑换成功!"
              });
              this.updateStars(this.wantUse);
              this.dialogVisible = false;
              this.initSelect();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消兑换"
              });
              this.initSelect();
            });
        } else {
          this.$message({
            type: "error",
            message: "星星还不够换哦，继续努力吧"
          });
        }
      } else {
        this.$message({
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
    getdata() {
      // fetch("http://123.206.94.184:3012/getall", {
      this.$axios("/getall", {
        method: "GET",
        mode: "cors"
      })
        .then(res => {
          // console.log(res)
          return res.json();
        })
        .then(json => {
          console.log("获取的结果", json);
          this.name = json.name;
          this.totalstars = json.total;
          return json;
        });
    },
    adddata() {
      var clip = new Date() - this.posttime;
      if (clip < 600000) {
        this.$message.error("每10分钟只能加星一次哦");
      } else {
        if (this.todaystars != 0) {
          // fetch("http://123.206.94.184:3012/postdata", {
          //             method: "POST",
          //             mode: "cors",
          //             body: JSON.stringify({ data: this.todaystars }),

          // fetch("http://localhost:3012/stars/add", {
          this.$axios
            .post("stars/add", {
              stars: this.todaystars,
              user_name: this.user_name
              // method: "POST",
              // mode: "cors",
              // data: JSON.stringify({
              //   stars: this.todaystars,
              //   user_name: this.user_name
              // }),
              // headers: {
              //   "content-type": "application/json"
              // }
            })
            .then(res => {
              // console.log(res, typeof this.totalstars, typeof this.todaystars);
              console.log(res);
              if (res.statusText == "OK") {
                this.refreshID(this.user_name);
                this.$message({
                  type: "success",
                  message: "又加星了呀!很棒"
                });
                this.posttime = new Date();
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败，请报告管理员"
                });
              }
            });
        } else {
          this.$message({
            type: "error",
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
.content {
  font-size: 28px;
  /* background-image: url("./pic/bg3.jpg"); */
}
.stars {
  font-size: 30px;
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
div.main.van-card {
  margin: 25px 0;
  border-radius: 35px;
  line-height: 46px;
  background-color: #d8ecff;
}
</style>
