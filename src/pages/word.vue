<template>
  <div>
    <div class="word-wraper">
      <span class="word">{{word}}</span>
      <span class="tianzige zs"></span>
      <span class="tianzige zx"></span>
      <span class="tianzige ys"></span>
      <span class="tianzige yx"></span>
    </div>

    <div class="btn">
      <van-button
        type="primary"
        style="margin-right:30px;"
        size="normal"
        @click="nextWord(true)"
      >认&nbsp;&nbsp;&nbsp;&nbsp;识</van-button>
      <van-button type="danger" size="normal" @click="nextWord(false)">不认识</van-button>
    </div>
    <div>已认识 ： {{rightCount}}个字， 不认识： {{wrongCount}}个字</div>
    <div>当前认识率 ： {{rightRate}}</div>
    <div>当前进度 ： 第{{finishCount+1 <= words.length?finishCount+1:finishCount}}字 / 总{{words.length}}字</div>
    <!-- {{test}} ,{{is_weixin()}} -->
    <div>
      <van-button type="warning" size="small" style="margin-right:20px;" @click="backWord()">返回</van-button>
      <van-button type="warning" size="small" style="margin-right:20px;" @click="clear()">清空</van-button>
      <van-button type="warning" size="small" style="margin-right:20px;" @click="showDIY=true">自定</van-button>
      <van-button type="warning" size="small" @click="showOption=!showOption" v-show="false">选项</van-button>
      <div v-show="showOption">
        <van-field v-model="skipNum" label="跳过前多少字" placeholder="请输入数字">
          <van-button slot="button" size="small" type="primary" @click="jump(skipNum)">跳过</van-button>
        </van-field>
        <van-button @click="save()">保存当前进度</van-button>
        <div>显示已完成数据</div>
        <div>显示错字集</div>
      </div>
    </div>
    <van-popup
      v-model="showDIY"
      position="bottom"
      closeable
      close-icon="close"
      :style="{ height: '20%' }"
    >
      <div>连续输入，无需空格或标点</div>
      <van-field v-model="wordsInputDIY" placeholder="请输入自定义汉字集合" />
      <van-button type="warning" size="small" style="margin-right:20px;" @click="useDIYwords()">确定更改</van-button>
    </van-popup>

    <div v-show="showPay" class="payment">
      <h3>测字软件好用吗？欢迎鼓励开发者</h3>
      <div style="margin:10px 0 14px;">
        <img src="./pay.jpg" alt width="300px" />
      </div>

      <div style="margin-top:160px;">
        <van-button type="danger" size="normal" @click="quitPay()">继续测试</van-button>
      </div>
      <!-- <div style="margin-top:20px;">
        <van-button type="default" size="small" @click="isPayed=true">赞赏完成</van-button>
      </div>-->
    </div>
    <!-- {{doneWords}} -->
  </div>
</template>

<script>
//设置cookie

//取回cookie

// var arr = "乙一二地用同所现是为";
var arr =
  "乙一二十丁厂七卜人入八九几儿了力乃刀又三于干亏士工土才寸下大丈与万上小口巾山千乞川亿个勺久凡及夕丸么广亡门义之尸弓己已子卫也女飞刃习叉马乡丰王井开夫天无元专云扎艺木五支厅不太犬区历尤友匹车巨牙屯比互切瓦止少日中冈贝内水见午牛手毛气升长仁什片仆化仇币仍仅斤爪反介父从今凶分乏公仓月氏勿欠风丹匀乌凤勾文六方火为斗忆订计户认心尺引丑巴孔队办以允予劝双书幻玉刊示末未击打巧正扑扒功扔去甘世古节本术可丙左厉右石布龙平灭轧东卡北占业旧帅归且旦目叶甲申叮电号田由史只央兄叼叫另叨叹四生失禾丘付仗代仙们仪白仔他斥瓜乎丛令用甩印乐句匆册犯外处冬鸟务包饥主市立闪兰半汁汇头汉宁穴它讨写让礼训必议讯记永司尼民出辽奶奴加召皮边发孕圣对台矛纠母幼丝式刑动扛寺吉扣考托老执巩圾扩扫地扬场耳共芒亚芝朽朴机权过臣再协西压厌在有百存而页匠夸夺灰达列死成夹轨邪划迈毕至此贞师尘尖劣光当早吐吓虫曲团同吊吃因吸吗屿帆岁回岂刚则肉网年朱先丢舌竹迁乔伟传乒乓休伍伏优伐延件任伤价份华仰仿伙伪自血向似后行舟全会杀合兆企众爷伞创肌朵杂危旬旨负各名多争色壮冲冰庄庆亦刘齐交次衣产决充妄闭问闯羊并关米灯州汗污江池汤忙兴宇守宅字安讲军许论农讽设访寻那迅尽导异孙阵阳收阶阴防奸如妇好她妈戏羽观欢买红纤级约纪驰巡寿弄麦形进戒吞远违运扶抚坛技坏扰拒找批扯址走抄坝贡攻赤折抓扮抢孝均抛投坟抗坑坊抖护壳志扭块声把报却劫芽花芹芬苍芳严芦劳克苏杆杠杜材村杏极李杨求更束豆两丽医辰励否还歼来连步坚旱盯呈时吴助县里呆园旷围呀吨足邮男困吵串员听吩吹呜吧吼别岗帐财针钉告我乱利秃秀私每兵估体何但伸作伯伶佣低你住位伴身皂佛近彻役返余希坐谷妥含邻岔肝肚肠龟免狂犹角删条卵岛迎饭饮系言冻状亩况床库疗应冷这序辛弃冶忘闲间闷判灶灿弟汪沙汽沃泛沟没沈沉怀忧快完宋宏牢究穷灾良证启评补初社识诉诊词译君灵即层尿尾迟局改张忌际陆阿陈阻附妙妖妨努忍劲鸡驱纯纱纳纲驳纵纷纸纹纺驴纽奉玩环武青责现表规抹拢拔拣担坦押抽拐拖拍者顶拆拥抵拘势抱垃拉拦拌幸招坡披拨择抬其取苦若茂苹苗英范直茄茎茅林枝杯柜析板松枪构杰述枕丧或画卧事刺枣雨卖矿码厕奔奇奋态欧垄妻轰顷转斩轮软到非叔肯齿些虎虏肾贤尚旺具果味昆国昌畅明易昂典固忠咐呼鸣咏呢岸岩帖罗帜岭凯败贩购图钓制知垂牧物乖刮秆和季委佳侍供使例版侄侦侧凭侨佩货依的迫质欣征往爬彼径所舍金命斧爸采受乳贪念贫肤肺肢肿胀朋股肥服胁周昏鱼兔狐忽狗备饰饱饲变京享店夜庙府底剂郊废净盲放刻育闸闹郑券卷单炒炊炕炎炉沫浅法泄河沾泪油泊沿泡注泻泳泥沸波泼泽治怖性怕怜怪学宝宗定宜审宙官空帘实试郎诗肩房诚衬衫视话诞询该详建肃录隶居届刷屈弦承孟孤陕降限妹姑姐姓始驾参艰线练组细驶织终驻驼绍经贯奏春帮珍玻毒型挂封持项垮挎城挠政赴赵挡挺括拴拾挑指垫挣挤拼挖按挥挪某甚革荐巷带草茧茶荒茫荡荣故胡南药标枯柄栋相查柏柳柱柿栏树要咸威歪研砖厘厚砌砍面耐耍牵残殃轻鸦皆背战点临览竖省削尝是盼眨哄显哑冒映星昨畏趴胃贵界虹虾蚁思蚂虽品咽骂哗咱响哈咬咳哪炭峡罚贱贴骨钞钟钢钥钩卸缸拜看矩怎牲选适秒香种秋科重复竿段便俩贷顺修保促侮俭俗俘信皇泉鬼侵追俊盾待律很须叙逃食盆胆胜胞胖脉勉狭狮独狡狱狠贸怨急饶蚀饺饼弯将奖哀亭亮度迹庭疮疯疫疤姿亲音帝施闻阀阁差养美姜叛送类迷前首逆总炼炸炮烂剃洁洪洒浇浊洞测洗活派洽染济洋洲浑浓津恒恢恰恼恨举觉宣室宫宪突穿窃客冠语扁袄祖神祝误诱说诵垦退既屋昼费陡眉孩除险院娃姥姨姻娇怒架贺盈勇怠柔垒绑绒结绕骄绘给络骆绝绞统耕耗艳泰珠班素蚕顽盏匪捞栽捕振载赶起盐捎捏埋捉捆捐损都哲逝换挽热恐壶挨耻耽恭莲莫荷获晋恶真框桂档桐株桥桃格校核样根索哥速逗栗配翅辱唇夏础破原套逐烈殊顾轿较顿毙致柴桌虑监紧党晒眠晓鸭晃晌晕蚊哨哭恩唤啊唉罢峰圆贼贿钱钳钻铁铃铅缺氧特牺造乘敌秤租积秧秩称秘透笔笑笋债借值倚倾倒倘俱倡候俯倍倦健臭射躬息徒徐舰舱般航途拿爹爱颂翁脆脂胸胳脏胶脑狸狼逢留皱饿恋桨浆衰高席准座脊症病疾疼疲效离唐资凉站剖竞部旁旅畜阅羞瓶拳粉料益兼烤烘烦烧烛烟递涛浙涝酒涉消浩海涂浴浮流润浪浸涨烫涌悟悄悔悦害宽家宵宴宾窄容宰案请朗诸读扇袜袖袍被祥课谁调冤谅谈谊剥恳展剧屑弱陵陶陷陪娱娘通能难预桑绢绣验继球理捧堵描域掩捷排掉堆推掀授教掏掠培接控探据掘职基著勒黄萌萝菌菜萄菊萍菠营械梦梢梅检梳梯桶救副票戚爽聋袭盛雪辅辆虚雀堂常匙晨睁眯眼悬野啦晚啄距跃略蛇累唱患唯崖崭崇圈铜铲银甜梨犁移笨笼笛符第敏做袋悠偿偶偷您售停偏假得衔盘船斜盒鸽悉欲彩领脚脖脸脱象够猜猪猎猫猛馅馆凑减毫麻痒痕廊康庸鹿盗章竟商族旋望率着盖粘粗粒断剪兽清添淋淹渠渐混渔淘液淡深婆梁渗情惜惭悼惧惕惊惨惯寇寄宿窑密谋谎祸谜逮敢屠弹随蛋隆隐婚婶颈绩绪续骑绳维绵绸绿琴斑替款堪搭塔越趁趋超提堤博揭喜插揪搜煮援裁搁搂搅握揉斯期欺联散惹葬葛董葡敬葱落朝辜葵棒棋植森椅椒棵棍棉棚棕惠惑逼厨厦硬确雁殖裂雄暂雅辈悲紫辉敞赏掌晴暑最量喷晶喇遇喊景践跌跑遗蛙蛛蜓喝喂喘喉幅帽赌赔黑铸铺链销锁锄锅锈锋锐短智毯鹅剩稍程稀税筐等筑策筛筒答筋筝傲傅牌堡集焦傍储奥街惩御循艇舒番释禽腊脾腔鲁猾猴然馋装蛮就痛童阔善羡普粪尊道曾焰港湖渣湿温渴滑湾渡游滋溉愤慌惰愧愉慨割寒富窜窝窗遍裕裤裙谢谣谦属屡强粥疏隔隙絮嫂登缎缓编骗缘瑞魂肆摄摸填搏塌鼓摆携搬摇搞塘摊蒜勤鹊蓝墓幕蓬蓄蒙蒸献禁楚想槐榆楼概赖酬感碍碑碎碰碗碌雷零雾雹输督龄鉴睛睡睬鄙愚暖盟歇暗照跨跳跪路跟遣蛾蜂嗓置罪罩错锡锣锤锦键锯矮辞稠愁筹签简毁舅鼠催傻像躲微愈遥腰腥腹腾腿触解酱痰廉新韵意粮数煎塑慈煤煌满漠源滤滥滔溪溜滚滨粱滩慎誉塞谨福群殿辟障嫌嫁叠缝缠静碧璃墙撇嘉摧截誓境摘摔聚蔽慕暮蔑模榴榜榨歌遭酷酿酸磁愿需弊裳颗嗽蜻蜡蝇蜘赚锹锻舞稳算箩管僚鼻魄貌膜膊膀鲜疑馒裹敲豪膏遮腐瘦辣竭端旗精歉熄熔漆漂漫滴演漏慢寨赛察蜜谱嫩翠熊凳骡缩慧撕撒趣趟撑播撞撤增聪鞋蕉蔬横槽樱橡飘醋醉震霉瞒题暴瞎影踢踏踩踪蝶蝴嘱墨镇靠稻黎稿稼箱箭篇僵躺僻德艘膝膛熟摩颜毅糊遵潜潮懂额慰劈操燕薯薪薄颠橘整融醒餐嘴蹄器赠默镜赞篮邀衡膨雕磨凝辨辩糖糕燃澡激懒壁避缴戴擦鞠藏霜霞瞧蹈螺穗繁辫赢糟糠燥臂翼骤鞭覆蹦镰翻鹰警攀蹲颤瓣爆疆壤耀躁嚼嚷籍魔灌蠢霸露囊罐隘腻";

export default {
  data() {
    return {
      word: "完",
      words: ["人", "天", "地"],
      doneWords: [],
      skipNum: 0,
      showOption: false,
      showPay: false,
      isPayed: false,
      test: "",
      time_ad_show: null,
      showDIY: false,
      wordsInputDIY: ""
    };
  },
  mounted() {
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    window.addEventListener("unload", e => this.beforeunloadHandler(e));
    if (localStorage.getItem("doneWords") != null)
      this.doneWords = JSON.parse(localStorage.getItem("doneWords"));
    if (localStorage.getItem("skipNum") != null)
      this.skipNum = localStorage.getItem("skipNum") - 0;

    this.words = arr.split("");
    this.word = this.words[this.doneWords.length];
    this.$notify({
      type: "primary",
      message: "本程序自动保存进度，无需一次性测完"
    });
  },
  destroyed() {
    window.removeEventListener("unload", e => this.beforeunloadHandler(e));
    // window.removeEventListener("beforeunload", e =>
    //   this.beforeunloadHandler(e)
    // );
  },
  computed: {
    rightRate() {
      var fixedF = (
        (this.rightCount / (this.rightCount + this.wrongCount)) *
        100
      ).toFixed(1);
      return this.rightCount + this.wrongCount === 0 ? 0 : fixedF + "%";
    },
    rightCount() {
      return this.doneWords.filter(w => w.right).length;
    },
    wrongCount() {
      return this.doneWords.filter(w => !w.right).length;
    },
    finishCount() {
      return this.doneWords.length;
    }
  },
  methods: {
    setCookie(c_name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        c_name +
        "=" +
        escape(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
    getCookie(c_name) {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          var c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    },
    beforeunloadHandler(e) {
      this.save();
    },
    isFinish(doneCount, allCount) {},
    nextWord(flag) {
      if (this.doneWords.length === this.words.length) {
        this.$notify({
          type: "primary",
          message: "哇！你已完成了全部测试，太厉害了！认字率为" + this.rightRate
        });
        return;
      }

      var obj = {};
      if (flag === true) {
        obj.right = true;
      } else {
        obj.right = false;
      }
      obj.word = this.word;
      this.doneWords.push(obj);
      this.checkPayment();
      if (this.doneWords.length === this.words.length) {
        this.$notify({
          type: "primary",
          message: "哇！你已完成了全部测试，太厉害了！认字率为" + this.rightRate
        });
        return;
      }
      this.word = this.words[this.finishCount];
      console.log(this.doneWords);
    },
    checkPayment() {
      var showNode = [100, 200];
      if (!this.isPayed) {
        if (
          showNode.some(v => v == this.finishCount) ||
          this.finishCount % 100 == 0
        ) {
          this.showPay = true;
          this.time_ad_show = new Date();
        }
      }
    },
    quitPay() {
      this.showPay = false;
      var timeNow = new Date();
      if (timeNow - this.time_ad_show > 5000) {
        console.log("大于5秒，关闭提示");
        this.isPayed = true;
        this.time_ad_show = null;
      }
    },
    backWord() {
      if (this.doneWords.length - 1 >= 0) {
        this.word = this.doneWords[this.doneWords.length - 1].word;
        this.doneWords.pop();
      }
    },
    jump(num) {
      this.words = arr.split("").slice(num);
      this.word = this.words[0];
      this.doneWords = [];
    },
    save() {
      if (this.wordsInputDIY == "") {
        localStorage.setItem("doneWords", JSON.stringify(this.doneWords));
        localStorage.setItem("skipNum", this.skipNum + "");
      } else {
        localStorage.removeItem("doneWords");
        localStorage.removeItem("doneWords");
      }
    },
    clear() {
      this.$dialog
        .confirm({
          title: "清空",
          message: "是否清空所有已测试数据，从头开始？"
        })
        .then(() => {
          this.words = arr.split("");
          this.doneWords = [];
          this.word = this.words[this.doneWords.length];
          this.wordsInputDIY = "";
          localStorage.removeItem("doneWords");
          localStorage.removeItem("doneWords");
        })
        .catch(() => {
          // on cancel
        });
    },
    useDIYwords() {
      if (this.wordsInputDIY) {
        this.$dialog
          .confirm({
            title: "确定使用输入项作为测试字集？",
            message: "当前已测试数据即将清空，且测试字集为一次性。"
          })
          .then(() => {
            this.showDIY = false;

            this.words = this.wordsInputDIY.split("");
            this.doneWords = [];
            this.word = this.words[this.doneWords.length];
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("micromessenger") != -1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.word-wraper {
  width: 20rem;
  height: 20rem;
  position: relative;
  margin: 0 auto;
  /* border: 1px red solid; */
}
.tianzige {
  /* background-color: aqua; */
  width: 10rem;
  height: 10rem;
  position: absolute;
  margin: 0;
}
.zs {
  left: 0px;
  top: 0px;
  border-style: none dashed dashed none;
  border-width: 1px;
  border-color: rgba(160, 156, 156, 0.472);
}
.ys {
  left: 10rem;
  top: 0;
  margin-left: 1px;
}
.zx {
  top: 10rem;
  left: 0;
  margin-top: 1px;
}
.yx {
  top: 10rem;
  left: 10rem;
  margin-left: 0px;
  margin-top: 0px;

  border-style: dashed none none dashed;
  border-width: 1px;
  border-color: rgba(160, 156, 156, 0.472);
}
.word {
  /* display: none; */
  font-size: 18rem;
  line-height: 18rem;
  /* line-height: 20rem; */
  border: 6px solid rgb(216, 214, 214);
  position: absolute;
  left: -4px;
  top: -4px;
  padding: 1rem;
}

.btn {
  margin-top: 30px;
}
button.van-button--normal {
  font-size: 30px;
  padding: 10px 20px;
  line-height: 30px;
  height: 50px;
  margin-bottom: 10px;
}
.payment {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(240, 240, 240);
}
</style>