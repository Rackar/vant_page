<template>
  <div>
    <h3>新建人物</h3>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="姓名"
        placeholder="请输入姓名"
        @click-right-icon="$toast('question')"
      />
      <van-field v-model="birthday" center clearable label="出生年月" placeholder="输入格式：1950-05">
        <van-button slot="button" @click="openPickDay('birth')" size="small" type="primary">日期选择</van-button>
      </van-field>
      <van-field v-model="deathday" center clearable label="去世年月" placeholder="健在请留空">
        <van-button slot="button" @click="openPickDay('death')" size="small" type="primary">日期选择</van-button>
      </van-field>

      <van-field v-model="message" label="生平" type="textarea" placeholder="请输入" rows="5" autosize />

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
      <div>上传相片:</div>
      <van-uploader v-model="fileList" multiple :max-count="1" :after-read="avatar_upload" />
    </div>
    <div>
      <van-button @click="savePerson">保存</van-button>
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

    savePerson() {}
  }
};
</script>

<style lang="scss" scoped>
</style>