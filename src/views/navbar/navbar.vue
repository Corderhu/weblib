<template>
  <div id="navbar">
    <div class="open">
      <audio ref="music" muted controls="controls" loop style="display: none">
        你的浏览器暂不支持本歌曲播放
        <source
          src="http://music.163.com/song/media/outer/url?id=1897927515.mp3"
        />
      </audio>
      <div class="welcome">博客</div>
      <div class="song">
        <div ref="songs">
          <span>背景音乐《 十年 》- 陈奕迅 </span>
          <span style="margin-left: 20px">背景音乐《 十年 》- 陈奕迅 </span>
        </div>
      </div>
      <div class="own" v-if="!login" @click="loginIn">
        <el-avatar
          icon="el-icon-user-solid"
          style="vertical-align: middle; margin: 10px"
        ></el-avatar>
        <span style="color: blue; font-size: 12px">点击登录</span>
      </div>
      <div class="own" style='padding-top:10px'  v-else>
        <img
          @click="userConf"
          :src="$store.state.user.user.users.header? $store.state.user.user.users.header:$store.state.user.user.userheader"
          style="vertical-align: middle; margin-right: 10px;width:40px;height:40px;border-radius:20px"
        >
        <span style="color: red; font-size: 12px" @click="loginOut">{{
          $store.state.user.user.username
        }}</span>
      </div>
      <el-button
        style="float: right; margin-left: 20px; margin-top: 10px"
        @click="closeMusic"
        >关闭</el-button
      >
      <el-button
        style="
          float: right;
          margin-top: 10px;
          background-color: orange;
          border: 0;
          color: #fff;
        "
        @click="loadMusic"
        >播放</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      play: false,
      activeName: "second",
      setInter: "",
      // user:{
      //   username:'',
      //   userheader:''
      // },
      login: false, //默认你未登录
    };
  },
  created() {
    // this.request({
    //   url: "/users/login",
    //   type: "get",
    // }).then((data) => {
    //   console.log(data);
    // });
  },
  //自动触发点击事件
  // directives:{
  //   trigger:{
  //     inserted(el,binging){
  //       // console.log(binging)
  //      el.click()

  //     }
  //   }
  // },
  mounted() {
    this.updateUser();
    // window.addEventListener("mousedown", this.loadMusic);
    // this.scrollSong()
  },
  // 破坏后
  destroyed() {
    // window.removeEventListener("mousedown", this.loadMusic);
    clearInterval(this.setInter);
  },
  methods: {
    //登录信息更新
    updateUser() {
      // this.user.username = this.$store.state.user.user.username;
      // this.user.userheader = this.$store.state.user.user.userheader;
      // console.log(this.$store.state.user.user.username);
      if (this.$store.state.user.user.username != "") {
        // console.log(this.user.username)
        // console.log(this.$store.state.user.user.username);
        this.login = true;
      }
    },
    // handleClick(){
    //歌曲字体和滚动
    scrollSong() {
      let distance = -20;
      if (this.setInter) {
        clearInterval(this.setInter);
      }
      this.setInter = setInterval(() => {
        if (distance < -201) {
          distance = 0;
        }
        distance -= 20;

        this.$refs.songs.style.marginLeft = distance + "px";
      }, 1000);
    },
    loadMusic() {
      this.$nextTick(function () {
        if (!this.play) {
          this.$refs.music.play();
          this.scrollSong();
          this.play = true;
          // 移除监听事件
          window.removeEventListener("mousedown", this.loadMusic);
        }
      });
    },
    closeMusic() {
      this.$nextTick(function () {
        if (this.play) {
          this.$refs.music.pause();
          clearInterval(this.setInter);
          this.play = false;
        }
      });
    },
    // 登录
    loginIn() {
      this.$router.push("/login");
    },
    // 个人中心
    userConf(){
      this.$router.push('/userConf')
    },
    // 退出登录
    loginOut() {
      this.$confirm("是否退出登录？", "提示")
        .then(() => {
          // 调用退出登录接口
          this.request({
            url: "/users/login_out",
            method: "post",
          }).then((data) => {
            if (data.code == 200) {
              //个人信息清空
              this.$store.commit('clearUserIndo')  
              this.$message({
                message: "退出登陆成功",
              });
              this.login = false
            }
          });
        })
        .catch(() => {});
      // this.owner = {
      //   img: "",
      //   type: false,
      // };
    },
    // },
  },
};
</script>
<style lang="scss" scoped>
#navbar {
  min-width: 1200px;
  // border-bottom: 1px solid #cdcdcd;
  // width: 100%;
  .open {
    box-sizing: border-box;
    // display: flex;
    // height: 80px;
    .welcome {
      float: left;
      // position: relative;
      line-height: 60px;
      // top: 0;
      height: 60px;
      // display: inline-block;
      width: 20%;
      text-align: center;
    }
    .song {
      display: inline-block;
      line-height: 60px;
      white-space: nowrap;
      width: 220px;
      overflow: hidden;
      color: #e63411;
    }
    .own {
      user-select: none;
      text-align: right;
      margin-right: 20px;
      float: right;
      cursor: pointer;
      // clear: both;
      width: 20%;
      display: inline;
    }
  }
}
</style>