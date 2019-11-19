<template>
  <div class="calc">
    <h1>航摄参数计算</h1>

    <van-cell-group>
      <!-- <van-button square type="primary">增加飞机</van-button>
      <van-button round type="info">编辑航摄仪</van-button> -->
      <van-field
        readonly
        clickable
        label-width="150"
        label="选择航摄仪"
        :value="cam.name"
        placeholder="选择航摄仪"
        @click="showCamPicker = true"
      ></van-field>

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
        label-width="150"
        label="选择飞机"
        :value="plane.name"
        placeholder="选择飞机"
        @click="showPlanePicker = true"
      ></van-field>

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
        label-width="150"
        label="地面分辨率（米）"
        v-model="form.fenbianlv"/>
      <van-field
        label-width="150"
        v-model="form.pxchongdie"
        label="旁向重叠度（%）"
      >
      </van-field>
      <van-field
        label-width="150"
        label="航向重叠度（%）"
        v-model="form.hxchongdie"
      >
      </van-field>
      <van-field
        label-width="150"
        label="测区长度（公里）"
        v-model="form.changdu"
      >
      </van-field>
      <van-field
        label-width="150"
        label="测区宽度（公里）"
        v-model="form.kuandu"
      >
      </van-field>
      <van-field
        label-width="150"
        label="单架次航时（时）"
        v-model="form.dancixiaoshi"
      >
      </van-field
    ></van-cell-group>
    <div class="result">
      <van-row type="flex">
        <van-col :span="10" offset="2">
          <van-tag mark type="primary">相对航高</van-tag>
          {{ XDhanggao }}米
        </van-col> </van-row
      ><van-row type="flex">
        <van-col :span="10" offset="2">
          <van-tag mark type="primary">基线长度</van-tag>
          {{ jixian }}米
        </van-col>
        <van-col :span="10" offset="1">
          <van-tag mark type="primary">航线间隔</van-tag>
          {{ jiange }}米
        </van-col> </van-row
      ><van-row type="flex">
        <van-col :span="10" offset="2">
          <van-tag mark type="primary">航片数量</van-tag>
          {{ hangpian }}片
        </van-col>
        <van-col :span="10" offset="1">
          <van-tag mark type="primary">航线数量</van-tag>
          {{ hangxian }}条
        </van-col> </van-row
      ><van-row type="flex">
        <van-col :span="10" offset="2">
          <van-tag mark type="primary">作业航程</van-tag>
          {{ hangcheng }}公里
        </van-col>
        <van-col :span="10" offset="1">
          <van-tag mark type="primary">作业小时</van-tag>
          {{ xiaoshi }}小时
        </van-col></van-row
      >
    </div>
    <div class="contain">
      <canvas id="myCanvas" width="300" height="400" ref="myCanvas"></canvas>
    </div>
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
      showPlanePicker: false,
      canvasObj: null
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
    },
    changeCanvas() {
      if (this.hangxian && this.form.changdu && this.form.kuandu) {
        let myCanvas = this.$refs.myCanvas;
        //画布的宽高
        let Cwidth = 300;
        let CHeight = 300;
        // 创建一个画布上绘图的环境
        var ctx = myCanvas.getContext("2d");
        ctx.clearRect(0, 0, Cwidth, CHeight);
        ctx.beginPath();
        let chang = this.form.changdu;
        let kuan = this.form.kuandu;
        let max = chang > kuan ? chang : kuan;
        let hangxian = this.hangxian;

        ctx.fillStyle = "rgba(0, 0, 230, 0.2)";
        ctx.fillRect(
          20,
          20,

          (chang / max) * CHeight - 40,
          (kuan / max) * Cwidth - 40
        );
        let offset = 20 - 30;
        for (let index = 0; index <= hangxian; index++) {
          ctx.moveTo(0, 20 - 30 + (((kuan / max) * Cwidth) / hangxian) * index); //设置起点状态
          ctx.lineTo(
            (chang / max) * CHeight,
            20 - 30 + (((kuan / max) * Cwidth) / hangxian) * index
          ); //设置末端状态
          ctx.lineWidth = 1; //设置线宽状态
          ctx.strokeStyle = "#222"; //设置线的颜色状态
          ctx.stroke(); //进行绘制
        }

        // 一般情况下，canvas的背景颜色是透明的，当生成图片的时候也是透明
        // 如果希望图片有个背景颜色，可以创建一个框高100%的矩形
        // 画布的最底端-这样就可以有个背景颜色
        // ctx.fillStyle = "#fff";
        // ctx.fillRect(0, 0, Cwidth, CHeight);

        // //设置颜色也可以适用rgba
        // ctx.fillStyle = "rgba(0,0,0,0.9)";
        // //绘制一个矩形的边框(x, y, width, height)
        // ctx.strokeRect(50, 100, 100, 100);

        // // 可以在页面插入文字
        // ctx.fillStyle = "#333";

        // // 三个参数-文字，横坐标-纵坐标
        // ctx.font = "16px Arial";
        // ctx.fillText("今天是个好日子", 50, 50);

        // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        // ctx.fillRect(200, 30, 80, 50);

        // 还可以插入图片
        // 首先创建一个图片标签
        // 等待图片加载完之后在渲染画布中
        // let imgObj = new Image()
        // imgObj.src = 'http://img4.imgtn.bdimg.com/it/u=3704809141,1787261659&fm=11&gp=0.jpg'
        // let imgUrl = await this.imgOnload(imgObj)
        // ctx.drawImage(imgUrl, 250, 200, 150, 150)

        // 这里图片的我注释了，，因为跨域的图片链接，在生成图片时会失败，你可以使用本地图片
        // 基本步骤就这样

        // 生成图片（图片的格式）
        // let imageUrl = myCanvas.toDataURL("image/png", 0.5);

        // base64图片地址就获取到了
        // 现实中存在两种情况，一个显示页面中，点击下载，这个就简单了，可以利用a标签进行下载
        //还有一种情况就是，图片base64地址生成后，自动下载
        // this.downloadFile(imageUrl, "1.png");
        // 加载图片-二维码-条形码
        // function imgOnload(img) {
        //   return new Promise(resolve => {
        //     img.onload = function() {
        //       resolve(this);
        //     };
        //   });
        // }
        // // 创建下载图片事件
        // function downloadFile(data, filename) {
        //   //创建一个具有指定的命名空间URI和限定名称的元素
        //   var save_link = document.createElementNS(
        //     "http://www.w3.org/1999/xhtml",
        //     "a"
        //   );
        //   save_link.href = data;
        //   save_link.download = filename;
        //   // 绑定下载事件
        //   var event = document.createEvent("MouseEvents");
        //   event.initMouseEvent(
        //     "click",
        //     true,
        //     false,
        //     window,
        //     0,
        //     0,
        //     0,
        //     0,
        //     0,
        //     false,
        //     false,
        //     false,
        //     false,
        //     0,
        //     null
        //   );
        //   save_link.dispatchEvent(event);
        // }
      }
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
  updated() {
    // ;
    if (
      this.hangxian &&
      this.form.changdu &&
      this.form.kuandu &&
      this.form.fenbianlv
    ) {
      this.changeCanvas();
    }
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
        (((this.form.fenbianlv == 0 || this.form.fenbianlv == "0."
          ? 0.1
          : this.form.fenbianlv - 0) *
          this.cam.jiaoju) /
          this.cam.xiangyuan) *
          1000
      );
    },
    jixian() {
      return (
        ((this.form.fenbianlv == 0 || this.form.fenbianlv == "0."
          ? 0.1
          : this.form.fenbianlv - 0) *
          this.cam.hxpx *
          (100 - this.form.hxchongdie)) /
        100
      ).toFixed(2);
    },
    jiange() {
      return Math.round(
        ((this.form.fenbianlv == 0 || this.form.fenbianlv == "0."
          ? 0.1
          : this.form.fenbianlv - 0) *
          this.cam.pxpx *
          (100 - this.form.pxchongdie)) /
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

<style>
.van-field__control {
  color: #3636e6;
}
.result {
  text-align: left;
}
</style>
