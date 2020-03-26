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
      let push = await this.$axios.post("http://123.206.94.184:5000/add", {
        url,
        pass,
        gzlist
      });
      console.log(push.data);

      if (push.data == "ok") {
        this.$toast({
          type: "success",
          message: "添加链接成功!"
        });
      } else {
        this.$toast({
          type: "fail",
          message: "添加链接失败!"
        });
      }
    }
  }
};
</script>

<style>
</style>
