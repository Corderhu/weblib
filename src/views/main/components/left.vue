<template>
  <div class="authorInfo">
    <div class="title" @click="gotoDesk">
      <img class="header" :src="author.header" />
      <span> 博客主: </span
      ><el-tag
        ><span>{{ author.username }}</span></el-tag
      >
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="item">
        <div>已发布</div>
        <div style="margin-top: 10px">{{ Number(author.essayTotal + author.commentTotal)}}</div>
      </div>
      <div class="item">
        <div>文章</div>
        <div style="margin-top: 10px">{{ author.essayTotal }}</div>
      </div>
      <div class="item">
        <div>说说</div>
        <div style="margin-top: 10px">{{ author.commentTotal }}</div>
      </div>
      <div class="item">
        <div>留言</div>
        <div style="margin-top: 10px">0</div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="search">
      <el-form action="" :model="outSearch">
        <el-input
          type="text"
          name="value"
          v-model="outSearch.value"
          placeholder="百度搜索"
        >
          <i slot="suffix" class="el-icon-search" @click="searchAll" />
        </el-input>
        <el-divider></el-divider>
        <el-input
          type="text"
          v-model="outSearch.ownValue"
          placeholder="文章搜索"
        >
          <i slot="suffix" class="el-icon-search" @click="searchMy" />
        </el-input>
      </el-form>
      <div v-if="searchData" style="margin-top: 10px; color: rgb(121 116 116); font-size: 12px">
        <div>文章搜索结果：</div>
        <div
          v-for="(ele, index) in searchData"
          :key="ele.essayId"
          style="
            padding-left: 20px;
            font-size: 15px;
            border-bottom: 1px solid #cdcdcd;
            cursor: pointer;
            padding-top:15px;
            padding-bottom:15px
          "
        >
          ({{ index + 1 }}){{ ele.title }}
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="active">
      <div>最新动态：{{ author.activeTime }}</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="文章" name="first">
          <div>
            <div
              v-for="(item, index) in author.essayList"
              :key="item.id"
              style="
                border-bottom: 1px solid #cdcdcd;
                padding: 10px;
                color: blue;
                cursor: pointer;
              "
            >
              <span style="color: #000; margin-right: 5px"
                >{{ index + 1 }}:</span
              >{{ item.title }}
              <div
                style="
                  text-align: right;
                  font-size: 12px;
                  color: #000;
                  margin-top: 20px;
                "
              >
                {{
                  item.createTime
                    .replace(/-/g, "/")
                    .replace("T", "")
                    .substr(0, 10)
                }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="说说" name="second">
          <div>
            <div
              v-for="(item, index) in author.shuoshuo"
              :key="item.id"
              style="
                border-bottom: 1px solid #cdcdcd;
                padding: 10px;
                color: blue;
                cursor: pointer;
              "
            >
              <span style="color: #000; margin-right: 5px"
                >{{ index + 1 }}:</span
              >{{ item.value }}
              <div
                style="
                  text-align: right;
                  font-size: 12px;
                  color: #000;
                  margin-top: 20px;
                "
              >
                {{
                  item.createTime
                    .replace(/-/g, "/")
                    .replace("T", "")
                    .substr(0, 10)
                }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="留言" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="评论" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: "",
      author: {
        username: "海贼王",
        shuoshuo: [],
      },
      outSearch: {
        value: "",
        ownValue: "",
      },
      activeName: "second",
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
      }).then((data) => {
        this.author = data.data;
        console.log(this.author);
      });
    },
    //查询文章
    searchMy() {
      // if (this.outSearch.ownValue != "") {
        // 模糊查询
        this.request({
          url: "users/search",
          method: "get",
          params: {
            type: 0,
            value: this.outSearch.ownValue,
          },
        }).then((data) => {
          this.searchData = data.data;
          // console.log(data)
        });
      // }
    },
    searchAll() {
      if (this.outSearch.value != "") {
        // 全局搜索
        window.open(
          "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=" +
            this.outSearch.value,
          "_blank"
        );
      }
    },
    // 跳转到首页
    gotoDesk(){
      const {href,location} = this.$router.resolve({
        name: "Production",
        query: { 
         id:1,
         type: 1,
        //  data:this.myperson,
         },
      });
      // console.log(href,location)
      window.open(href,'_blank')
    },
    handleClick() {},
  },
};
</script>
<style scoped lang='scss'>
.authorInfo {
  padding: 15px;
  // width: 100%;
  height: 100%;
  overflow: hidden;
  .title {
    margin-top: 50px;
    .header {
      width: 60px;
      height: 60px;
      vertical-align: middle;
      border-radius: 30px;
      margin-right: 30px;
    }
  }
  .line {
    height: 1px;
    margin: 8px 0;
    background-color: #cdcdcd;
  }
  .content {
    display: flex;
    justify-content: space-around;
    .item {
      text-align: center;
    }
  }
  .search {
    .el-icon-search {
      cursor: pointer;
      margin: 12px;
    }
  }
}
</style>