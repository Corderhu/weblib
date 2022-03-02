<template>
  <div class="myshuo">
    <div class="cell" v-for="ele in shuoInfo.commentList" :key="ele.id">
      <div class="header">
        <img
          :src="shuoInfo.header"
          style="
            width: 40px;
            height: 40px;
            border-radius: 20px;
            vertical-align: top;
          "
        />
        <div style="display: inline-block; margin-left: 15px">
          <span>{{ shuoInfo.username }}</span
          ><br />
          <span
            style="color: rgb(135 126 126); font-size: 12px; font-weight: 400"
          >
            {{
              ele.createTime.replace(/-/g, ".").replace("T", "").substr(0, 15)
            }}</span
          >
        </div>
      </div>
      <div class="value">
        <span>{{ ele.value }}</span>
        <div class="value-img" v-if="ele.pictures">
          <div v-if="ele.picturesType == 0" style="display: flex">
            <div
              class="img-ele"
            
              v-for="item in ele.pictures.split(',')"
              :key="item"
            >
              <img class="bigImg" height="100%" width="auto" v-lazy="item" />
            </div>
          </div>
          <div v-if="ele.picturesType == 1" style="display:flex">
            <div
              class="video"
              v-for="item in ele.pictures.split(',')"
              :key="item"
              :style="$mobile? '':'width:200px;height:250px'"

            >
              <video
               
                width="auto"
                :height='$mobile? "100px":"250px"'
                z-index='10'
                x5-video-player-type="h5-page"
                poster='@/assets/img/play.png'
                muted
               
                :controls='!$mobile'
                :src="item"
              ></video>
            </div>
          </div>
        </div>
      </div>
      <div
        style="
          font-size: 12px;
          opacity: 0.7;
          text-align: right;
          margin-top: 40px;
        "
      >
        <img
          @click="thinkLike(ele.id, 0)"
          v-if="ele.myLike == 0"
          src="@/assets/unlike.png"
          style="
            vertical-align: middle;
            width: 20px;
            margin-right: 10px;
            cursor: pointer;
          "
          title="点赞"
        />
        <img
          @click="thinkLike(ele.id, 1)"
          v-if="ele.myLike == 1"
          src="@/assets/like.png"
          style="
            vertical-align: middle;
            width: 20px;
            margin-right: 10px;
            cursor: pointer;
          "
          title="取消赞"
        />
        <img
          @click="thinkDisLike(ele.id, 0)"
          v-if="ele.myDisLike == 0"
          src="@/assets/cai.png"
          style="
            margin-top: 8px;
            vertical-align: middle;
            width: 20px;
            margin-right: 50px;
            cursor: pointer;
          "
          title="踩一下"
        />
        <img
          @click="thinkDisLike(ele.id, 1)"
          v-if="ele.myDisLike == 1"
          src="@/assets/caied.png"
          style="
            margin-top: 8px;
            vertical-align: middle;
            width: 20px;
            margin-right: 50px;
            cursor: pointer;
          "
          title="取消踩"
        />
        发布时间：{{
          ele.createTime.replace(/-/g, ".").replace("T", "").substr(0, 15)
        }}
      </div>
      <div
        style="margin-top: 5px; font-size: 12px"
        v-if="ele.likeName.length > 0"
      >
        <img
          src="@/assets/unlike.png"
          style="
            vertical-align: middle;
            width: 20px;
            margin-right: 5px;
            cursor: pointer;
            padding-bottom: 5px;
          "
          title="点赞"
        />
        <span
          v-for="(item, index) in ele.likeName"
          :key="item"
          style="margin-left: 5px"
        >
          <span v-if="index <= 9">{{ item }}</span>
          <span v-if="index < ele.likeName.length - 1">,</span></span
        >
        <span v-if="ele.likeName.length > 10"
          >等{{ ele.likeName.length }}人觉得很赞</span
        >
        <span v-else> 赞过该作品</span>
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
        :total="shuoInfo.total"
        @current-change="handlePage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shuoInfo: {},
  },
  data() {
    return {
      page: 1,
    };
  },
  created() {
    console.log(this.$mobile)
  },
  // 监听对象变化
  // watch:{
  //     "shuoInfo":function(oldValue,newValue){
  //         console.log(oldValue)
  //         console.log(newValue)
  //     }
  // },
  methods: {
    handlePage(page) {
      this.page = page;
      this.$emit("changpageShuo", { page });
      //   console.log(page);
    },
    //点赞或者取消点赞
    thinkLike(id, type) {
      this.request({
        method: "put",
        url: "/users/likes",
        data: {
          id,
          type,
        },
      }).then((data) => {
        if (data.code == 200) {
          this.$emit("changpageShuo", { page: this.page, type: 1 });
        }
      });
    },
    thinkDisLike(id, type) {
      this.request({
        method: "put",
        url: "/users/dislikes",
        data: {
          id,
          type,
        },
      }).then((data) => {
        if (data.code == 200) {
          this.$emit("changpageShuo", { page: this.page, type: 1 });
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.myshuo {
  width: 100%;
  margin-top: 5px;
  .cell {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    .header {
      font-size: 14px;
      font-weight: 600;
    }
    .value {
      margin-top: 10px;
      font-size: 13px;

      .value-img {
        margin-top: 5px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .img-ele {
          width: 100px;
          margin-right: 1px;
          height: 120px;
          overflow: hidden;
          position: relative;

          .bigImg {
            z-index: 1;
            cursor: pointer;
            &:hover {
              transform: scale(1.1, 1.1);
            }
            &:hover::after {
              background-color: #cdcdcd;
              z-index: 2;
            }
          }
        }
        .video {
          display:inline-block;
          width:90px;
          height:100px;
           margin-right:1px;
           cursor:pointer;overflow:hidden
        }
      }
    }
  }
}
</style>