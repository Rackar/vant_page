<template>
  <div class="single">
    <navBarTop />
    <div>
      <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div>{{userinfo.name}}</div>
    <div>{{userinfo.birth}}-{{userinfo.death}}</div>
    <div class="info">{{userinfo.info}}</div>
    <!-- <div>
      <van-button round type="primary">文章</van-button>
      <van-button round type="primary">照片</van-button>
      <van-button round type="primary">编辑</van-button>
      <van-button round type="primary">分享</van-button>
      <van-button round type="primary">投诉</van-button>
    </div>-->
    <div>
      <van-cell
        v-for="item in articles"
        :key="item.id"
        :title="item.title"
        :to="'/article/'+item.id"
        :value="item.value"
      />
    </div>
    <div @click="showPic">相册图标</div>
    <van-image-preview
      v-model="show"
      :start-position="index"
      :lazy-load="true"
      :images="images"
      @change="onChange"
    >
      <template v-slot:index>
        <div>第{{ index }}页</div>
        <div>名称</div>
        <span class="bottom slot">{{imageInfo}}</span>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import navBarTop from "../components/navBarTop";
export default {
  components: {
    navBarTop
  },
  data() {
    return {
      articles: [
        { title: "在高考的那一年里", id: "2", value: "老大" },
        { title: "在高考的那一年里2", id: "3", value: "老2" }
      ],
      userinfo: { name: "", birth: 0, death: 0, info: "" },
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      imageInfo: "",
      show: false,
      index: 0,
      ImageList: [
        {
          url: "0",
          name: "0",
          info: "0"
        }
      ]
    };
  },
  props: {
    id: {
      type: String,
      default: "0"
    }
  },
  computed: {
    // userid() {
    //   return this.$route.params.id;
    // }
  },
  created() {
    this.fetchSinglePerson(this.id);
    this.getImagesList(this.id);
    this.getArticlesList(this.id);
  },
  methods: {
    fetchSinglePerson(id = 0) {
      console.log(id);
      this.userinfo = {
        name: "毛18",
        birth: 2018,
        death: 2019,
        info: "阿斯顿发的说asdfasdf sadf法fsaasdfsad发送到发斯蒂芬df是对方"
      };
      this.articles = this.articles;
    },
    getImagesList(id) {
      var ImageList = [
        {
          url: "https://img.yzcdn.cn/vant/apple-1.jpg",
          name: "1.jpg",
          info: "第一个图的的的大多数疯狂夺金爱丽丝的房间爱丽丝的房间介绍1"
        },
        {
          url: "https://img.yzcdn.cn/vant/apple-2.jpg",
          name: "2.jpg",
          info: "介绍2"
        }
      ];
      this.ImageList = ImageList;
      this.images = ImageList.map(data => data.url);
      this.onChange(0);
    },
    getArticlesList(id) {},
    showPic() {
      this.show = true;
    },
    onChange(index) {
      this.index = index;
      this.imageInfo = this.ImageList[index].info;
    }
  }
};
</script>

<style >
.single div.info {
  height: 100px;
  color: #fc9898;
}
.swipeImg {
  width: 30px;
  height: 50px;
}
.slot.bottom {
  position: fixed;
  width: 200px;
  top: 0px;
  left: -80px;
  margin-top: 90vh;
}
</style>