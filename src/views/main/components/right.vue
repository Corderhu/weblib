<template>
  <div class="person">
    <h4>个人中心</h4>
    <!-- <div class="empty">
      <el-empty description="您未登录，请点击登录按钮登陆"></el-empty>

      <div style="margin-top: 20px">
        <el-button>去登陆</el-button>
      </div>
    </div> -->
    <div class="myPerson">
      <div class="label">
        <div>
          <div>已发布</div>
          <div style="margin-top: 10px">
            {{ Number(myperson.essayTotal + myperson.commentTotal) }}
          </div>
        </div>
        <div>
          <div>文章</div>
          <div style="margin-top: 10px">{{ myperson.essayTotal }}</div>
        </div>
        <div>
          <div>说说</div>
          <div style="margin-top: 10px">{{ myperson.commentTotal }}</div>
        </div>
        <div>
          <div>留言</div>
          <div style="margin-top: 10px">0</div>
        </div>
      </div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="我的文章" name="1">
          <div
            v-for="(item, index) in myperson.essayList"
            :key="item.id"
            class="item"
            style="margin-top: 10px; cursor: pointer"
            @click="handleEssay(item.id)"
          >
            {{ index + 1 + "、" + item.title }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="我的说说" name="2">
          <div
            v-for="(item, index) in myperson.shuoshuo"
            :key="item.id"
            class="item"
            style="margin-top: 10px; cursor: pointer"
          >
            {{ index + 1 + "、" + item.value }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="我的留言" name="3">
          <div style="text-align: center">暂未开通</div>
        </el-collapse-item>
        <el-collapse-item title="我的好友" name="4">
          <div style="text-align: center">暂未开通</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
      myperson: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.request({
        method: "get",
        url: "/users/superuser",
        params: {
          super: 1,
        },
      }).then((data) => {
        this.myperson = data.data;
        // console.log(data);
      });
    },
    //跳转界面
    handleEssay(id) {
      this.$router.push({
        name: "Production",
        params: { 
          id,
         type: 0 ,
         data:this.myperson,
         },
      });
      // this.$router.push({
      //   path:'/production',
      //   query:{id}
      // })
    },
  },
};
</script>
<style lang='scss' scoped>
.person {
  h4 {
    text-align: center;
  }
  .empty {
    text-align: center;
  }
  .myPerson {
    .label {
      padding: 20px 0;
      display: flex;
      justify-content: space-around;
      text-align: center;
    }
    padding: 0 10px;
    background-color: #fff;
  }
}
</style>