<template>
  <!-- 此页面做一个自适应界面，可针对手机和web两个端 -->
  <div class="production">
    <div class="navbar" v-if="!phone && !fixed">
      <a title="博客中心">
        <div>
          <span class="name">{{ auther }}个人博客</span>
          <span>回忆美好，充实未来！往后余生，写作将是我生活的一部分。</span>
        </div>
      </a>
    </div>
    <div class="tab">
      <ul class="nav1" v-if="!phoneTrue">
        <li
          v-for="(item, index) in nav"
          :key="item"
          @click="changetab(index + 1)"
          :class="active === index + 1 ? 'item active' : 'item'"
        >
          {{ item }}
        </li>
      </ul>
      <div
        v-else
        style="height: 50px; background-color: #fff; line-height: 50px"
      >
        <span style="margin-left: 30px; margin-right: 15px; font-size: 18px"
          >{{ auther }}博客</span
        >
        <span>>{{ nav[active - 1] }}</span>
        <!-- 弹框拉出来写 -->

        <el-popover
          placement="bottom"
          trigger="manual"
          class="dep"
          v-model="visible"
        >
          <img
            slot="reference"
            src="@/assets/img/radio-button.png"
            @click="visible = !visible"
            style="
              float: right;
              margin-right: 25px;
              margin-top: 15px;
              vertical-align: middle;
            "
          />
          <div style="width: 100vw; box-sizing: border-box">
            <ul style="list-style-type: none; padding: 0">
              <li
                v-for="(item, index) in nav"
                :key="item"
                style="padding: 20px; box-sizing: border-box; font-size: 15px"
                :style="index == active - 1 ? 'background-color:#cdcdcd' : ''"
                @click="changetab(index + 1)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </el-popover>
      </div>
    </div>
    <div
      class="article"
      ref="article"
      id="article"
      :style="
        phone || fixed
          ? 'height:calc(100vh - 50px)'
          : 'height:calc(100vh - 130px)'
      "
    >
      <div class="content">
        <div
          v-show="allShow"
          class="left-content"
          :style="phone ? 'width:100%' : ''"
        >
          <div v-if="active <= 3">
            <div class="ele" v-for="ele in info.essayList" :key="ele.id">
              <div style="overflow: hidden" v-if="ele.firstPicture">
                <img
                  class="img-ele"
                  :src="ele.firstPicture"
                  style="width: 100%"
                />
              </div>
              <div class="title">
                <h2 style="font-weight: 500; margin: 0 15px">
                  <a>{{ ele.title }}</a>
                </h2>
              </div>
              <div class="desc">
                <img
                  src="@/assets/img/rili.png"
                  style="
                    margin-right: 8px;
                    vertical-align: middle;
                    padding-bottom: 4px;
                  "
                />
                <time class="fa-time">{{
                  ele.createTime
                    .replace(/-/g, "/")
                    .replace("T", "")
                    .substr(0, 10)
                }}</time>
                <span style="margin: 0 10px">|</span>
                <img
                  src="@/assets/img/wenjianjia.png"
                  style="
                    margin-right: 8px;
                    vertical-align: middle;
                    padding-bottom: 4px;
                  "
                />
                <span v-if="ele.essayType == 1" class="fa-time">生活情感</span>
                <span v-if="ele.essayType == 2" class="fa-time">技术类</span>
                <span style="margin: 0 10px">|</span>
                <img
                  src="@/assets/img/author.png"
                  style="
                    margin-right: 8px;
                    vertical-align: middle;
                    padding-bottom: 4px;
                  "
                />
                <span class="fa-time">{{ info.username }}</span>
                <span style="margin: 0 10px">|</span>
                <img
                  src="@/assets/img/look.png"
                  style="
                    margin-right: 8px;
                    vertical-align: middle;
                    padding-bottom: 4px;
                  "
                />
                <span class="fa-time">{{ ele.glance }}</span>
              </div>
              <div class="p">
                {{ ele.p }}
              </div>
              <div
                style="
                  background-color: #fff;
                  height: 35px;
                  padding: 15px;
                  color: red;
                "
              >
                <a
                  style="float: right; cursor: pointer"
                  @click="addGlance(ele.id)"
                  >阅读全文»</a
                >
              </div>
            </div>
            <div
              style="
                background-color: #fff;
                width: 100%;
                overflow: hidden;
                text-align: right;
                padding: 20px 0;
              "
            >
              <el-pagination
                background
                layout="prev, pager, next"
                small
                :pager-count="5"
                :page-size="5"
                :total="info.total"
                @current-change="handlePage"
              >
              </el-pagination>
            </div>
          </div>
          <div v-else-if="active == 4">
            <My-shuo :shuoInfo="shuoInfo" @changpageShuo="changpageShuo1" />
          </div>
          <div v-else-if="active == 5">暂未开放</div>
        </div>
        <div
          v-if="!allShow"
          class="left-content"
          :style="phone ? 'width:100%' : ''"
        >
          <Essay :scrollTop="scrollTop" @hideEssay="hideEssay" />
        </div>

        <div
          class="right-content"
          v-if="!phone"
          :style="phone || fixed ? 'top:55px' : 'top:135px'"
        >
          <el-tabs type="border-card">
            <el-tab-pane label="热点文章">
              <div slot="label">
                <img
                  src="@/assets/img/hotarticle.png"
                  style="vertical-align: middle; margin-right: 5px"
                />
                热点文章
              </div>
              <div class="essay" style="min-height: 200px">
                <div v-for="item in hotEssay" :key="item.id" class="ele">
                  {{ item.title }}
                  <div class="ele-item">
                    <img src="@/assets/img/glance-essay.png" />{{ item.glance }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="热点说说">
              <div slot="label">
                <img
                  src="@/assets/img/hotashuo.png"
                  style="vertical-align: middle; margin-right: 5px"
                />热点说说
              </div>
              <div class="comment" style="min-height: 200px">
                <div v-for="item in hotComment" :key="item.id" class="ele">
                  {{
                    item.value.length > 15
                      ? item.value.substr(0, 15) + "..."
                      : item.value.substr(0, 15)
                  }}
                  <div class="ele-item">
                    <img src="@/assets/img/super.png" />{{ item.likesNum }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="热点留言">
              <div slot="label">
                <img
                  src="@/assets/img/hotmessage.png"
                  style="vertical-align: middle; margin-right: 5px"
                />热点留言
              </div>
              <div style="min-height: 200px">暂未开放</div>
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
          </el-tabs>
          <div class="total">
            <div class="title">{{ auther }}个人博客统计</div>
            <div class="fenlei">
              <div class="label">博客：</div>
              <div class="info">{{ auther }}</div>
            </div>
            <div class="fenlei">
              <div class="label">文章：</div>
              <div class="info">{{ totalAll.commentLen }}</div>
            </div>
            <div class="fenlei">
              <div class="label">说说：</div>
              <div class="info">{{ totalAll.essayLen }}</div>
            </div>
            <div class="fenlei">
              <div class="label">时间：</div>
              <div class="info">{{ totalAll.differ }}天</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyShuo from "./components/myshuo.vue";
import Essay from "./components/Essay.vue";
export default {
  components: {
    MyShuo,
    Essay,
  },
  data() {
    return {
      info: {},
      auther: "",
      phone: false,
      phoneTrue: false,
      fixed: false,
      visible: false,
      allShow: true,
      active: 1,
      id: 1,
      essayId: "",
      nav: ["首页", "生活情感", "技术类", "说说", "留言"],
      hotEssay: [],
      hotComment: [],
      queryData: {
        id: 1,
        type: 1,
      },
      shuoInfo: {},
      totalAll: {},
      scrollTop: {
        top: 0,
      },
    };
  },
  created() {
    this.initData();
    // 刚开始就测试下

    this.handleResize();

    // 监听界面缩小情况
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    this.handleScroll();
    this.$refs.article.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    // this.$refs.article.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handlePage(e) {
      document.getElementsByClassName("article")[0].scrollTop = 0;
      this.getInfo(this.id, 1, e);
      // console.log(e);
    },
    //
    changetab(num) {
      this.allShow = true;
      this.active = num;
      this.visible = false;
      document.getElementsByClassName("article")[0].scrollTop = 0;
      if (this.active <= 3) {
        this.getInfo(this.queryData.id, 1);
      } else {
        this.getInfo(this.queryData.id, 0);
      }
    },
    addGlance(id) {
      this.essayId = id;
      this.scrollTop["id"] = id;
      this.scrollTop.top =
        document.getElementsByClassName("article")[0].scrollTop;
      try {
        this.request({
          url: "/users/addGlance",
          method: "post",
          data: {
            id,
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.allShow = false;
      }
    },
    // 判断尺寸
    handleResize() {
      const width = document.body.clientWidth;
      if (width < 1000 && width >= 750) {
        this.phone = true;
        this.phoneTrue = false;
      } else if (width < 750) {
        this.phoneTrue = true;
        this.phone = true;
      } else {
        this.phone = false;
        this.phoneTrue = false;
      }
    },
    //滚动
    handleScroll() {
      const top = 80;
      // const element = this.$refs.article
      const element = document.getElementsByClassName("article")[0];
      if (element.scrollTop > top) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }

      // console.log(document.documentElement.scrollTop)
    },
    //返回
    goback() {
      this.$router.go(-1);
    },
    async getHotThings(type) {
      let { data } = await this.request({
        url: "users/getHotThings",
        method: "get",
        params: {
          type,
        },
      });
      return data;
    },
    async getTotalAll() {
      let { data } = await this.request({
        url: "users/getTotalAll",
        method: "get",
        params: {
          id: this.id,
        },
      });
      this.totalAll = data;
    },
    async getInfo(id, type, page) {
      if (!page) {
        page = 1;
      }
      if (!id) {
        id = this.id;
      }
      let { data } = await this.request({
        method: "get",
        url: "/users/getTypeThings",
        params: {
          id,
          type,
          page,
          active: this.active,
        },
      });
      if (this.active <= 3) {
        this.info = data;
      } else {
        this.shuoInfo = data;
      }
      this.auther = this.info.username;
    },
    async initData() {
      this.queryData = this.$route.query;

      // console.log(this.$route)
      if (this.queryData.type == 0) {
        // 代表查的是自己

        this.auther = "我的";
      } else if (this.queryData.type == 1) {
        // 代表查的是别人
        this.id = this.queryData.id;
        this.getInfo(this.queryData.id, this.queryData.type);
      } else {
        this.goback();
      }
      //获取热点文章
      this.hotEssay = await this.getHotThings(0);
      this.hotComment = await this.getHotThings(1);
      this.getTotalAll();
    },
    changpageShuo1(obj) {
      if (!obj.type) {
        document.getElementsByClassName("article")[0].scrollTop = 0;
      }
      // console.log(document.getElementsByClassName("article")[0].scrollTop)
      this.getInfo(null, 0, obj.page);
    },
    watchScroll(height) {
      try{
        setTimeout(()=>{
          let dom = document.getElementsByClassName("article")[0];
          dom.scrollTo(0, height);
        },10) 
      }catch(err){
        this.watchScroll(height);
        return
      }
    },
    hideEssay(height) {
      this.allShow = true;
      this.watchScroll(height);
    },
  },
};
</script>
<style lang='scss' scoped>
.production {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .navbar {
    box-sizing: border-box;
    padding-left: 50px;
    background: #2e3641;
    z-index: 100;
    height: 75px;
    line-height: 75px;
    width: 100%;
    overflow: hidden;
    color: #fff;
    .name {
      font-size: 30px;
      margin-right: 60px;
      &:hover {
        cursor: pointer;
        color: rgb(214, 93, 118);
      }
    }
  }
  .tab {
    background-color: #fff;
    width: 100%;
    // position: fixed;
    // top:80;
    top: 0;
    position: sticky;
    z-index: 999;
    border-bottom: 1px solid rgb(153, 148, 148);
    .nav1 {
      width: 70%;
      display: flex;
      list-style-type: none;
      justify-content: space-around;
      margin: 0;
      min-height: 50px;
      .active {
        background-color: rgba(192, 203, 209, 0.5);
        color: rgb(123, 114, 250) !important;
      }
      .item {
        min-width: 100px;
        color: #777;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        margin: 10px 0;

        &:hover {
          color: #000;
          font-size: 20px;
        }
      }
      //   text-align: center;
    }
  }
  .article {
    position: relative;
    overflow-y: auto;
    height: calc(100vh - 130px);
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .content {
      padding-bottom: 30px;
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .left-content {
        width: 60%;
        box-sizing: border-box;
        min-height: 100%;

        border: 1px solid #e3e3e3;
        .ele {
          background-color: #fff;
          margin-top: 15px;
          overflow: hidden;

          .img-ele {
            cursor: pointer;
            transition: all 0.6s;
          }
          .img-ele:hover {
            transform: scale(1.1, 1.1);
          }
        }
        .title {
          margin: 10px 0;
        }
        .desc {
          font-family: FontAwesome;
          padding: 0 20px;
          margin-bottom: 5px;
          color: #aaa;
          font-size: 14px;
        }
        .p {
          box-sizing: border-box;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          overflow: hidden;
          -webkit-box-orient: vertical;
          line-height: 2em;
          font-size: 16px;
          color: #333;
          padding: 0 15px;
          // margin: 15px;
          // letter-spacing: 1px;
        }
        // padding: 19px;
      }
      .right-content {
        position: fixed;
        // float: right;
        top: 130px;
        right: 8%;
        overflow: auto;
        width: 30%;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
        &::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        box-sizing: border-box;
        .ele {
          background-color: #fff;
          color: #555;
          padding: 10px 15px;
          border: 1px solid #ddd;
          position: relative;
          cursor: pointer;
          font-size: 14px;
          img {
            vertical-align: middle;
            margin-right: 5px;
            padding-bottom: 2px;
            width: 20px;
          }
          .ele-item {
            text-align: left;
            width: 60px;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            right: 25px;
            font-weight: 600;
            font-size: 10px;
            color: red;
          }
        }
        .total {
          background-color: #fff;
          margin-top: 50px;

          .title {
            font-family: inherit;
            font-weight: 500;
            height: 20px;
            padding: 10px;
            font-size: 20px;
            line-height: 16px;
            // text-align: center;
            color: #555;
          }
          .fenlei {
            display: flex;
            padding: 15px;
            border-bottom: 1px solid #ddd;
          }
        }
      }
    }
  }
}
</style>