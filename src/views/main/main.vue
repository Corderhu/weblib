<template>
  <div id="main">
    <header>
      <Navbar />
    </header>
    <article :style="bag">
      <aside class="left">
        <Left />
      </aside>
      <section class="content">
        <Article />
      </section>
      <aside class="right">
        <Right/>
      </aside>
    </article>
    <!-- <footer class="bottom">1212121212</footer> -->
  </div>
</template>
<script>
import Navbar from "../navbar/navbar.vue";
import Left from "./components/left.vue";
import Article from "./components/article.vue";
import Right from './components/right.vue'
export default {
  data() {
    return {
      bag: "",
    };
  },
  components: {
    Navbar,
    Left,
    Article,
    Right,
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
body,
html {
  padding: 0;
  margin: 0;
}
#main {
  padding: 0;
  margin: 0;
  min-width: 1200px;
  background-image: url("../../assets/img/04.gif");
  padding-bottom: 15px;
  // background-size: 100% 100%;
  header {
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
    border-bottom: 1px solid #cdcdcd;
  }
  article {
    // margin-top:15px;
    display: flex;
    justify-content: space-around;
    min-height: calc(100vh - 90px);
    width: 100%;
    padding-top: 80px;
    .content {
      border-radius: 15px;
      background-color: #eee6e6;
      width: 45%;
      min-height: 100%;
    }
    .left {
      background-color: #eee6e6;
      border-radius: 5px;
      width: 25%;
      min-height: 100%;
    }
    .right {
      border-radius: 5px;
      background-color: #eee6e6;
      width: 20%;
      min-height: 100%;
    }
  }
  // .bottom {
  //   padding: 50px;
  //   margin-top: 30px;
  //   background-color: #fff;
  //   height: 436px;
  //   // border-radius: 15px;
  //   // margin-left: 15px;
  //   // margin-right: 15px;
  //   background-image: url('//icon.qiantucdn.com/static/images/index4_1/index_footer_bg.png');
  //   background-size: cover;
  // }
}
</style>