<template>
  <div class>
    <div>
      链接
      <van-field v-model="email" />
    </div>
    <div>
      密码
      <van-field v-model="pass" type="password" />
    </div>
    <div>
      <van-button @click="signup">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      pass: ""
    };
  },

  methods: {
    async signup() {
      let url = this.email.split(/\n/).filter(ele => ele !== "" && ele !== " ");
      let pass = this.pass;
      let gzlist = "ilianyue";
      let push = await this.$axios.post(
        "api/lianyue",
        {
          url,
          pass,
          gzlist
        }
      );
      console.log();
      let data=push.data

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

<style>
</style>
