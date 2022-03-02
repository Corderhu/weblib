<template>
  <div class="essay">
    <div class="send" v-if="!writeEssay">
      <el-button @click="goWrite">我来写篇文章</el-button>
    </div>
    <div class="write" v-if="writeEssay">
      <div class="content">
        <div class="title" style="display: flex">
          <span style="margin-right: 35px">文章首页图:</span>
          <el-upload
            class="avatar-uploader"
            :action="$baseUrl + '/users/uploadPicture'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="pictures"
          >
            <div v-if="firstPicture">
              <img :src="firstPicture" width="100px" height="100px" />
              <span @click.stop="firstPicture = ''">重新上传</span>
            </div>

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="title">
          <span style="margin-right: 50px">文章标题:</span>
          <el-input
            style="width: 200px"
            v-model="essay.title"
            placeholder="文章标题"
          >
          </el-input>
        </div>
        <div class="title">
          <span style="margin-right: 50px">文章标签:</span>
          <el-select v-model="essaylabel" placeholder="请选择">
            <el-option label="生活情感" :value="1"> </el-option>
            <el-option label="技术" :value="2"> </el-option>
          </el-select>
        </div>
        <div class="desc">
          <span style="margin-right: 50px">文章描述:</span>
          <el-input
            type="textarea"
            style="width: 500px; vertical-align: middle"
            v-model="essay.desc"
            placeholder="文章描述"
            rows="3"
          >
          </el-input>
        </div>
        <div class="p" v-for="(item, index) in essay.p" :key="index">
          <div style="margin-bottom: 25px">
            <span style="margin-right: 25px">该段落前是否上传图片</span>
            <el-radio-group v-model="item.show">
              <el-radio :label="false">不上传</el-radio>
              <el-radio :label="true">上传</el-radio>
            </el-radio-group>
          </div>
          <div style="margin-bottom: 25px" v-if="item.show">
            <span style="margin-right: 85px">图片:</span>
            <el-upload
              class="avatar-uploader"
              :action="$baseUrl + '/users/uploadPicture'"
              :show-file-list="false"
              :on-success="handleAvatarSuccessP"
              :before-upload="beforeAvatarUpload"
              name="pictures"
              :data="{ index }"
            >
              <div v-if="item.img" style="vertical-align: middle">
                <img :src="item.img" width="100px" height="100px" />
                <span @click.stop="item.img = ''">重新上传</span>
              </div>

              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <span style="margin-right: 75px">段落{{ index + 1 }}</span>
          <el-input
            type="textarea"
            style="width: 450px; vertical-align: middle"
            v-model="item['p']"
            placeholder="段落"
            rows="5"
          >
          </el-input>
          <i
            v-if="index > 0"
            @click="removeP(index)"
            style="margin-left: 10px; color: rgb(144 141 141)"
            class="el-icon-circle-close"
          ></i>
        </div>
      </div>
      <el-button @click="addP">添加段落</el-button>

      <el-button @click="writeEssay = false">取消写作</el-button>
      <el-button @click="putMyEssay">提交写作</el-button>
    </div>
    <div class="show" v-else>
      <div
        v-show="showTitle"
        class="item"
        v-for="(ele, index) in showEssay"
        :key="ele.id"
        @click="checkEssay(index)"
      >
        <div>
          <img
            :src="ele.header"
            style="
              width: 40px;
              border-radius: 20px;
              vertical-align: middle;
              margin-right: 15px;
            "
          />
          <span style="">{{ ele.username }} :</span>
        </div>
        <div class="title">{{ ele.title }}</div>
        <div class="desc">描述：{{ ele.desc }}</div>
        <!-- <p v-for="item in ele.p.split('#$%$%#') " :key="item">  {{item }}</p>
        <p>100</p> -->
      </div>
      <div v-show="!showTitle">
        <div>
          <h1 style="text-align: center">{{ showDatail.title }}</h1>
          <div style="font-size: 13px; opacity: 0.7; text-indent: 2em">
            描述：{{ showDatail.desc }}
          </div>
          <p
            v-for="item in showDatail.p.split('#$%$%#')"
            :key="item"
            style="text-indent: 2em; letter-spacing: 1px"
          >
            {{ item }}
          </p>
        </div>
        <el-button @click="showTitle = true">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstPicture: "",
      writeEssay: false,
      showTitle: true,
      essay: {
        title: "",
        desc: "",
        p: [{ p1: "", show: false, img: "" }],
      },
      showEssay: [],
      essaylabel:1,
      showDatail: {
        p: "",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.request({
        method: "get",
        url: "users/getEssay",
      }).then((data) => {
        this.showEssay = data.data;
        console.log(data);
      });
    },
    handleAvatarSuccess(e) {
      // console.log(e);
      this.firstPicture = e.url;
    },
    handleAvatarSuccessP(e) {
      this.essay.p[e.index].img = e.url;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      if (!isJPG) {
        this.$message.error("上传格式不正确!");
        return false;
      }

      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG && !isVIDEO) {
      //   this.$message.error("上传格式不正确!");
      //   return false
      // }else if(isVIDEO){
      //   this.videoOrPict = 1
      // }else if(isJPG){
      //   this.videoOrPict = 0
      // }
      return true;
    },
    // 上传文章
    goWrite() {
      this.writeEssay = true;
    },
    addP() {
      this.essay.p.push({ p: "", show: false, img: "" });
    },
    removeP(index) {
      this.essay.p.splice(index, 1);
    },
    checkEssay(index) {
      this.showDatail = this.showEssay[index];
      this.showTitle = false;

      console.log(index);
    },
    putMyEssay() {
      // 提交文章
      // 对p进行处理
      let p = "";
      let img = []
      this.essay.p.forEach((ele, index) => {
        // 对段落进行处理；不动
        if (index + 1 === this.essay.p.length) {
          p += ele.p;
        } else {
          p += ele.p + "#$%$%#";
        }
        // 对段落图片进行处理
        if(ele.show && ele.img !=''){
          img.push({
            index,
            'url':ele.img
          })
        }
      });
      this.request({
        method: "put",
        url: "/users/addEssay",
        data: {
          title: this.essay.title,
          desc: this.essay.desc,
          p,
          img,
          label:this.essaylabel,
          firstPicture: this.firstPicture,
        },
      }).then((data) => {
        if (data.code == 200) {
          this.essay = {
            title: "",
            desc: "",
            p: [{ p: "", img: "", show: false }],
          };
          this.$message(data.msg);
          this.getData();
          this.writeEssay = false;
        }
        // console.log(data);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.essay {
  padding: 20px 0;
  .write {
    .content {
      margin-bottom: 50px;
      .title {
        margin-bottom: 50px;
      }
      .desc {
        margin-bottom: 50px;
      }
      .p {
        margin-bottom: 50px;
      }
    }
  }
  .show {
    //   border-top:1px solid #cdcdcd;
    .item {
      cursor: pointer;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .title {
        padding-left: 20px;
        font-size: 16px;
        font-weight: 600;
        margin-top: 15px;
      }
      .desc {
        margin-top: 15px;
        font-size: 14px;
        // padding-left: 35px;
        max-height: 40px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        opacity: 0.7;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    border: 1px solid #cdcdcd;
    display: inline-block;
    vertical-align: top;
    // padding-top: 20px ;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
  }
}
</style>