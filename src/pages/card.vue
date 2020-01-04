<template>
  <div>
    <div class="warpper">
      <div class="title">
        <span class="name">张飞</span> <span class="type">坦克</span>
      </div>
      <div >
        <img src="./pic/c1.jpg" alt="" class="pic">

      </div>
      <div class="rate">☆☆☆☆☆☆☆☆☆</div>
      <div class="skill">
       
      </div>
      <div class="num">
        <div>攻击：100</div> <div> 血量：100</div>
      </div>
      <div class="skill">
          <span class="name">狮子吼：</span
        ><span class="detail">用气功大喝对方，造成300伤害</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.warpper {
  width: 80%;
  height: 400px;
  border: 2px grey solid;
  .title {
    font-size: 2rem;
    font-weight: bolder;
  }
  .pic {
    height: 200px;
    width: 200px;
  }
  .num{
    font-size: 1.6rem;
    display:flex;
    justify-content:space-around;
  }
}
</style>
