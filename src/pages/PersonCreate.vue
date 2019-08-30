<template>
  <div>
    新建
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="姓名"
        placeholder="请输入姓名"
        @click-right-icon="$toast('question')"
      />
      <van-cell
        title="出生年月"
        is-link
        arrow-direction="down"
        @click="openPickDay('birth')"
      >{{birthday}}</van-cell>

      <van-cell
        title="得到年月"
        is-link
        arrow-direction="down"
        @click="openPickDay('death')"
      >{{deathday}}</van-cell>
      <van-field v-model="message" label="生平" type="textarea" placeholder="请输入" rows="2" autosize />

      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="pickedBirthday"
          @cancel="cancelBirthday"
          cancel-button-text="清除"
        />
      </van-popup>
    </van-cell-group>
    <div>
      头像
      <van-uploader v-model="fileList" multiple :max-count="1" :after-read="avatar_upload" />
    </div>
    <div>
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
      message: "",
      opendPickDay: "",
      birthday: "",
      deathday: "",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(2025, 10, 1),
      username: "",
      currentDate: new Date(),
      show: false,
      actions: [
        { name: "选项" },
        { name: "选项" },
        { name: "选项", subname: "描述信息" }
      ]
    };
  },

  methods: {
    avatar_upload(file) {
      console.log(file);
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
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    },
    onCancel(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>