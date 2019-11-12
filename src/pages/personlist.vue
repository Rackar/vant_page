<template>
  <div>
    <van-divider content-position="left">我创建的</van-divider>
    <h3>选择要兑换的礼物等级：</h3>

    <div>
      <div @click="clickPresent(0)" :class="{ selected: selectedIndex == 1 }">
        <div>￥1-149</div>
        <img src="./pic/60.jpg" class="image" />
        <div style="padding: 0px;">
          <span>{{ presentList[0] }} 颗星</span>
        </div>
      </div>

      <div @click="clickPresent(1)" :class="{ selected: selectedIndex == 2 }">
        <div>￥150-299</div>
        <img src="./pic/120.jpg" class="image" />
        <div style="padding: 0px;">
          <span>{{ presentList[1] }} 颗星</span>
        </div>
      </div>

      <div @click="clickPresent(2)" :class="{ selected: selectedIndex == 3 }">
        <div>￥300-500</div>
        <img src="./pic/200.jpg" class="image" />
        <div style="padding: 0px;">
          <span>{{ presentList[2] }} 颗星</span>
        </div>
      </div>

      <div style="margin-top:35px;">
        <van-button type="primary" round @click="useStars">确 定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
let singleStuc = {
  name: "姓名",
  avatar: "",
  id: "5d9a1eb2539da63860763ad4"
};
export default {
  data() {
    return {
      activeNames: ["1"],
      favoriteList: [],
      historyList: [],
      myList: [],
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
  methods: {
    jumpToSingle(id) {
      this.$router.push(`/single/${id}`);
    },
    fetchInitData() {
      let id = this.$store.state.userid;
      if (id) {
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
    }
  },
  created() {
    this.fetchInitData();
  }
};
</script>

<style scoped>
</style>