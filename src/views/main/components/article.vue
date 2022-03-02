<template>
  <div class="article">
    <div class="title" @click="test">美好的一天从学习开始</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章" name="first">
        <Essay/>
      </el-tab-pane>
      <el-tab-pane label="说说" name="second">
        <shuoshuo/>
      </el-tab-pane>
      <el-tab-pane label="留言" name="third">
        <Leave-message/>
      </el-tab-pane>
      <el-tab-pane label="评论" name="fourth">未开通</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import shuoshuo from './shuoshuo.vue'
import Essay from './essay.vue'
import LeaveMessage from './leaveMessage.vue'
export default {
  components:{
    shuoshuo,
    Essay,
    LeaveMessage,
  },
  data() {
    return {
      activeName:'second'
    };
  },
  methods: {
    handleClick(){

    },
    test() {
      this.request({
        url: "/users/login",
        type: "get",
      }).then((data) => {
        console.log(data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.article {
  // height: 100%;

  border-radius: 10px;
  padding: 15px;
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>