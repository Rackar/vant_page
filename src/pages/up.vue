<template>
  <div class="up">
    <div>连岳微信文章链接提交</div>
    <van-field label="链接：" v-model="email" />

    <van-field label="密码：" v-model="pass" type="password" />

    <div>
      <van-button @click="signup" :disabled="loading">提交</van-button>
      <van-loading size="24px" vertical v-show="loading">提交中，已可以关闭页面</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      pass: "",
      loading: false
    };
  },

  methods: {
    async signup() {
      let url = this.email.split(/\n/).filter(ele => ele !== "" && ele !== " ");
      let pass = this.pass;
      let gzlist = "ilianyue";
      this.loading = true;
      // debugger;
      let push = await this.$axios.post("api/lianyue", {
        url,
        pass,
        gzlist
      });
      this.loading = false;
      let data = push.data;
      // let data = {};

      if (data.status === 1) {
        this.$toast({
          type: "success",
          message: data.msg
        });
      } else {
        this.$toast({
          type: "fail",
          message: data.msg
        });
      }
    }
  }
};
</script>

<style scoped>
.up /deep/ .van-field__body {
  border: 1px solid rgb(204, 234, 251);
}
</style>>

