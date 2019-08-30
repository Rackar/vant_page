<template>
  <div>
    新建
    <van-button></van-button>
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

      <!-- <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      />-->
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="pickedBirthday"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    openPickDay(type) {
      this.show = true;
      this.opendPickDay = type;
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