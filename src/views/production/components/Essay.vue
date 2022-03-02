<template>
  <div class="essay">
    <div class="essay-content" v-if="scrollTop.id">
      <div class="label">
        <img src="@/assets/img/center.png" />
        <a style="cursor: pointer" @click="goBack">个人博客</a>
        <span> » 正文</span>
      </div>
      <div class="essay-title">
        <h2 style="text-align: center">{{ essay.title }}</h2>
        <div class="desc">{{ essay.desc }}</div>
      </div>
      <div class="p">
        <div class="essay-p" v-for="(item) in essay.p" :key="item.p" style="text-align:center">
          <img v-if="item.url" :src="item.url" width='50%' style="margin-bottom:15px;"/>
          <div style="text-align:left">{{ item.p }}</div>
        </div>
      </div>
    </div>
    <div><el-button>返回</el-button></div>
  </div>
</template>
<script>
export default {
  props: {
    // id: "",
    scrollTop: "",
  },
  created() {
    this.getData();
    // console.log(this.id)
  },
  mounted() {
    console.log(this.scrollTop);
  },
  data() {
    return {
      essay: {},
    };
  },
  methods: {
    // 根据id 获取文章
    async getData() {
      let { data } = await this.request({
        url: "users/getOneEssay",
        method: "get",
        params: {
          id: this.scrollTop.id,
        },
      });
      console.log(data);
      this.essay = data;
      this.essay.p.forEach((item,index) => {
        if (this.essay.pictures != "" && this.essay.pictures != null) {
          this.essay.pictures.forEach((element) => {
            if (element.index == index) {
              this.essay.p[index] = {
                p:item,
                url:element.url
              }
            
            }
          });
        } else {
         this.essay.p[index] = {
           p:item
         }
        }
      });
    },
    // 返回触发事件
    goBack() {
      this.$emit("hideEssay", this.scrollTop.top);
    },
    showOrFalse(index) {
      if (this.essay.pictures != "" && this.essay.pictures != null) {
        this.essay.pictures.forEach((element) => {
          if (element.index == index) {
            console.log("符合");
            return element.url;
          }
        });
      } else {
        console.log("a");
        return false;
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.essay {
  margin-top: 5px;
  width: 100%;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  .essay-content {
    // text-align: center;
    font-size: 16px;
    .label {
      font-size: 14px;
      margin: 10px 0;
      img {
        vertical-align: middle;
        margin-right: 5px;
        padding-bottom: 3px;
      }
      a {
        color: rgb(212, 75, 75);
      }
    }
    .essay-title {
      .desc {
        text-indent: 20px;
        font-size: 12px;
        color: rgb(160, 153, 153);
      }
    }
    .p {
      font-size: 13px;
      .essay-p {
        margin-top: 15px;
        text-indent: 26px;
      }
    }
  }
}
</style>