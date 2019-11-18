<template>
  <div class="calc">
    <h2>航摄参数计算</h2>

    <div class="copy">杨旭</div>
    <van-cell-group>
      航摄仪： 选择 飞机选择
      <van-field
        readonly
        clickable
        label="航摄仪"
        :value="cam.name"
        placeholder="选择航摄仪"
        @click="showCamPicker = true"
      />

      <van-popup v-model="showCamPicker" position="top">
        <van-picker
          show-toolbar
          :columns="camNames"
          @cancel="showCamPicker = false"
          @confirm="setCam"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        label="飞机"
        :value="plane.name"
        placeholder="选择飞机"
        @click="showPlanePicker = true"
      />

      <van-popup v-model="showPlanePicker" position="top">
        <van-picker
          show-toolbar
          :columns="planeNames"
          @cancel="showPlanePicker = false"
          @confirm="setPlane"
        />
      </van-popup>
    </van-cell-group>
    <van-cell-group>
      <van-field
        label-width="200"
        label="地面分辨率（米）"
        v-model="form.fenbianlv"/>
      <van-field
        label-width="200"
        v-model="form.pxchongdie"
        label="旁向重叠度（%）"
      >
      </van-field>
      <van-field
        label-width="200"
        label="航向重叠度（%）"
        v-model="form.hxchongdie"
      >
      </van-field>
      <van-field
        label-width="200"
        label="测区长度（公里）"
        v-model="form.changdu"
      >
      </van-field>
      <van-field
        label-width="200"
        label="测区宽度（公里）"
        v-model="form.kuandu"
      >
      </van-field>
      <van-field
        label-width="200"
        label="单架次航时（时）"
        v-model="form.dancixiaoshi"
      >
      </van-field
    ></van-cell-group>
    <div class="result">
      <van-col :span="24">
        <van-tag>相对航高</van-tag>
        {{ XDhanggao }}米
      </van-col>
      <van-col :span="12">
        <van-tag>基线长度</van-tag>
        {{ jixian }}米
      </van-col>
      <van-col :span="12">
        <van-tag>航线间隔</van-tag>
        {{ jiange }}米
      </van-col>
      <van-col :span="12">
        <van-tag>航片数量</van-tag>
        {{ hangpian }}片
      </van-col>
      <van-col :span="12">
        <van-tag>航线数量</van-tag>
        {{ hangxian }}条
      </van-col>
      <van-col :span="12">
        <van-tag>作业航程</van-tag>
        {{ hangcheng }}公里
      </van-col>
      <van-col :span="12">
        <van-tag>作业小时</van-tag>
        {{ xiaoshi }}小时
      </van-col>
    </div>
    <!-- <van-row :gutter="10">
      <van-col :xs="0" :sm="3" :md="6" :lg="8" :xl="8">
        <div class="grid-content bg-purple">&nbsp;</div>
      </van-col>
      <van-col :xs="24" :sm="18" :md="12" :lg="8" :xl="8">
        <van-cell-group> -->
    <!-- <van-field label="航摄仪选择">
            <van-select
              v-model="form.cam"
              label="请选择航摄仪"
              @change="setCam"
            >
              <van-option
                v-for="cam in cams"
                :label="cam.name"
                :value="cam.name"
                :key="cam.id"
              ></van-option>
            </van-select>
          </van-field>
          <van-field label="飞机选择">
            <van-select
              v-model="form.plane"
              label="请选择飞机"
              @change="setPlane"
            >
              <van-option
                v-for="plane in planes"
                :label="plane.name"
                :value="plane.name"
                :key="plane.id"
              ></van-option>
            </van-select>
          </van-field> -->
    <!-- <van-field label="地面分辨率（米）" v-model="form.fenbianlv">
          </van-field>
          <van-field v-model="form.pxchongdie" label="旁向重叠度（%）">
          </van-field>
          <van-field label="航向重叠度（%）" v-model="form.hxchongdie">
          </van-field>
          <van-field label="测区长度（公里）" v-model="form.changdu">
          </van-field>
          <van-field label="测区宽度（公里）" v-model="form.kuandu">
          </van-field>
          <van-field label="单架次航时（时）" v-model="form.dancixiaoshi">
          </van-field>
          <van-divider></van-divider>

          
        </van-cell-group>
      </van-col>
      <van-col :xs="0" :sm="3" :md="6" :lg="8" :xl="8">
        <div class="grid-content bg-purple">&nbsp;</div>
      </van-col>
    </van-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cam: "UCE80",
        plane: "运5",
        fenbianlv: 0.1,
        pxchongdie: 35,
        hxchongdie: 65,
        changdu: 10,
        kuandu: 10,
        dancixiaoshi: 3
      },
      cams: [
        {
          type: "",
          status: "",
          name: "UCE80",
          pxpx: 20010,
          hxpx: 13080,
          jiaoju: 80,
          xiangyuan: 5.2
        },
        {
          type: "",
          status: "",
          name: "UCLp",
          pxpx: 11704,
          hxpx: 7920,
          jiaoju: 70,
          xiangyuan: 6
        },
        {
          type: "",
          status: "",
          name: "AX80",
          pxpx: 10328,
          hxpx: 7760,
          jiaoju: 50,
          xiangyuan: 5.2
        },
        {
          type: "",
          status: "",
          name: "UCD",
          pxpx: 11500,
          hxpx: 7500,
          jiaoju: 100,
          xiangyuan: 9
        },
        {
          type: "",
          status: "",
          name: "UCX",
          pxpx: 14430,
          hxpx: 9420,
          jiaoju: 100,
          xiangyuan: 7.2
        },
        {
          type: "",
          status: "",
          name: "UCXP",
          pxpx: 17310,
          hxpx: 11310,
          jiaoju: 100,
          xiangyuan: 6
        },
        {
          type: "",
          status: "",
          name: "UCXP-WA",
          pxpx: 17310,
          hxpx: 11310,
          jiaoju: 70,
          xiangyuan: 6
        },
        {
          type: "",
          status: "",
          name: "5DmarkII-24",
          pxpx: 5616,
          hxpx: 3744,
          jiaoju: 24,
          xiangyuan: 6.4
        },
        {
          type: "",
          status: "",
          name: "5DmarkII-35",
          pxpx: 5616,
          hxpx: 3744,
          jiaoju: 35,
          xiangyuan: 6.4
        },
        {
          type: "",
          status: "",
          name: "DMC",
          pxpx: 13824,
          hxpx: 7680,
          jiaoju: 120,
          xiangyuan: 12
        },
        {
          type: "",
          status: "",
          name: "UCOp",
          pxpx: 11674,
          hxpx: 7514,
          jiaoju: 80,
          xiangyuan: 6
        },
        {
          type: "",
          status: "",
          name: "DMC2 140",
          pxpx: 12096,
          hxpx: 11200,
          jiaoju: 92,
          xiangyuan: 7.2
        },
        {
          type: "",
          status: "",
          name: "DMC2 250",
          pxpx: 17216,
          hxpx: 14656,
          jiaoju: 112,
          xiangyuan: 5.6
        },
        {
          type: "",
          status: "",
          name: "DMC2 230",
          pxpx: 15552,
          hxpx: 14144,
          jiaoju: 92,
          xiangyuan: 5.6
        },
        {
          type: "",
          status: "",
          name: "SWDC",
          pxpx: 16000,
          hxpx: 12000,
          jiaoju: 50,
          xiangyuan: 6
        },
        {
          type: "",
          status: "",
          name: "SWDC-5",
          pxpx: 8176,
          hxpx: 6132,
          jiaoju: 100,
          xiangyuan: 6
        }
      ],
      planes: [
        { name: "运5", type: "", status: "", speed: 160, turn_time: 0.08 },
        { name: "运12", type: "", status: "", speed: 230, turn_time: 0.08 },
        { name: "塞斯纳", type: "", status: "", speed: 250, turn_time: 0.08 },
        { name: "国王", type: "", status: "", speed: 400, turn_time: 0.1 },
        { name: "运8", type: "", status: "", speed: 550, turn_time: 0.11 }
      ],
      cam: {},
      plane: {},
      showCamPicker: false,
      showPlanePicker: false
    };
  },

  methods: {
    onSubmit() {
      //   console.log("submit!");
    },
    setCam(value) {
      //   console.log(value);
      let selectCam = this.cams.filter(cam => cam.name == value);
      //   let selectCam = this.cams[value];
      //   console.log(selectCam[0]);
      this.cam = selectCam[0];
      this.showCamPicker = false;
    },
    setPlane(value) {
      //   console.log(value);
      //   let selectPlane = this.planes[value];
      let selectPlane = this.planes.filter(plane => plane.name == value);
      //   console.log(selectPlane[0]);
      this.plane = selectPlane[0];
      this.showPlanePicker = false;
    }
  },
  //   zxiangduihanggao = fenbianlv.value * jiaoju.value /xiangyuandaxiao.value *1000;
  // zjx = fenbianlv.value * hangxiangpx.value * (100-hangxiangcd.value)/100;
  // zjg = fenbianlv.value * pangxiangpx.value * (100-pangxiangcd.value)/100;
  // zhx = Math.round(cequkd.value / zjg * 1000)+1;
  // zhc = cequcd.value * zhx;
  // var zxs1=zhc/fjsudu/0.85;
  // var zxs2=fjzw*(zhx-1);
  // zxs=zxs1+zxs2;
  // zhp=cequcd.value/zjx*zhx*1000;
  mounted() {
    this.cam = this.cams[0];
    this.plane = this.planes[0];
  },
  computed: {
    camNames() {
      return this.cams.map(cam => cam.name);
    },
    planeNames() {
      return this.planes.map(plane => plane.name);
    },
    XDhanggao() {
      return Math.round(
        ((this.form.fenbianlv * this.cam.jiaoju) / this.cam.xiangyuan) * 1000
      );
    },
    jixian() {
      return (
        (this.form.fenbianlv * this.cam.hxpx * (100 - this.form.hxchongdie)) /
        100
      );
    },
    jiange() {
      return Math.round(
        (this.form.fenbianlv * this.cam.pxpx * (100 - this.form.pxchongdie)) /
          100
      );
    },
    hangcheng() {
      return this.form.changdu * this.hangxian;
    },
    hangxian() {
      return Math.round((this.form.kuandu / this.jiange) * 1000) + 1;
    },
    hangpian() {
      return Math.round(
        (this.form.changdu / this.jixian) * this.hangxian * 1000
      );
    },
    xiaoshi() {
      return (
        this.hangcheng / this.plane.speed / 0.85 +
        this.plane.turn_time * (this.hangxian - 1)
      ).toFixed(2);
    }
  }
};
</script>

<style></style>
