<template>
  <div>
    <div style="height:350px;width:80%;margin:10px auto">
      <h2 style="margin-bottom:100px;">上传相片:</h2>
      <van-uploader
        v-model="fileList"
        :max-count="6"
        :before-read="beforeRead"
        :after-read="avatar_upload"
        @delete="delImg"
      />
    </div>
    <div style>
      <van-button>保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        // { url: "https://img.yzcdn.cn/vant/cat.jpeg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true }
      ],
      info: "",
      opendPickDay: "",
      birthday: "",
      deathday: "",
      avatarfilePath: "",

      minDate: new Date(1900, 1, 1),
      maxDate: new Date(2025, 10, 1),
      name: "",
      currentDate: new Date(),
      show: false
    };
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    }
  },
  methods: {
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        this.$toast("请上传 jpg/png 格式图片");
        return false;
      }

      return true;
    },
    delImg(file, detail) {
      console.log(file, detail);
    },
    avatar_upload(file) {
      console.log(file);
      let obj = {
        img: file,
        userid: "id"
      };

      let data = new FormData();
      data.append("avatar", file.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios
        .post("/api/uploadimage", data, config)
        .then(res => {
          console.log(res);
          this.avatarfilePath = res.data.data.filename;
        })
        .catch(err => console.log(err));
    },
    openPickDay(type) {
      this.show = true;
      this.opendPickDay = type;
    },
    cancelBirthday() {
      if (this.opendPickDay == "birth") this.birthday = "";
      else if (this.opendPickDay == "death") this.deathday = "";
      this.show = false;
    },
    pickedBirthday(value) {
      console.log(value);
      var today = value;
      today.setHours(today.getHours() + 8);
      today = today.toISOString().substring(0, 7);
      console.log(today);
      this.show = false;
      if (this.opendPickDay == "birth") this.birthday = today;
      else if (this.opendPickDay == "death") this.deathday = today;
      this.opendPickDay = "";
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },

    savePerson() {
      let person = {
        name: this.name,
        birthday: this.birthday,
        deathday: this.deathday,
        info: this.info,
        avatarfilePath: this.avatarfilePath,
        createrId: this.$store.state.userid
      };
      this.$axios.post("/person", person).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.status == 1) {
          this.$router.back();
        } else {
          this.$toast.fail("保存出现问题，请重试");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>