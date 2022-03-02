<template>
  <div class="shuoshuo">
    <div class="send">
      <span @click="test">我也来发布一条说说</span><br />
      <!-- <el-button style="margin: 8px 0">上传带图片的说说</el-button> -->

      <div>
        <div style="font-size:16px;color:blue;margin-top:10px;margin-left:20px">
          <span v-if='videoOrPict==1' style="cursor:pointer" @click="videoOrPict=0;pictureList=[]">去上传图片<br><span style="color:#000">目前只能上传视频</span></span>
          <span v-if='videoOrPict==0' style="cursor:pointer" @click="videoOrPict=1;pictureList=[]">去上传视频<br><span style="color:#000">目前只能上传图片</span></span>
        </div>
        <div
          v-for="(item, dex) in pictureList"
          :key="item"
          style="
            display: inline-block;
            margin-right: 20px;
            margin-top: 20px;
           
            vertical-align: middle;
          "
        >
          <img :src="item" v-if="videoOrPict==0" class="send-img" @click="handlepictures(dex, 1)" />
          <video :src="item" v-if="videoOrPict==1" class="send-img" @click="handlepictures(dex, 1,1)" autoplay/>
        </div>
        <div
          style="
            display: inline-block;
            margin-right: 20px;
            margin-top: 20px;
             margin-left:20px;
            vertical-align: middle;
          "
        >
          <el-upload
            v-if="pictureList.length < 3"
            class="avatar-uploader"
            :action="$baseUrl + '/users/uploadPicture'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="pictures"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <el-input
        style="margin: 8px 0"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-button
        style="float: right"
        type="primary"
        :loading="loading"
        @click="addshuoshuo"
        >发布</el-button
      >
    </div>
    <div class="item" v-for="ele in list" :key="ele.id">
      <div class="header">
        <img
          :src="ele.header? ele.header:$store.state.user.user.userheader"
          style="
            vertical-align: middle;
            width: 30px;
            height: 30px;
            border-radius: 15px;
          "
        />
        {{ ele.username }} :
      </div>
      <div class="content">
        <div v-if="ele.pictures">
          <div v-if="ele.picturesType==0">
            <img
              
              v-for="item in ele.pictures.split(',')"
              :key="item"
              :src="item"
              style="width: 100px; height: 100px; margin-right: 25px"
              @click="handlepictures(item, 2,false)"
            />
          </div>
          <div v-if="ele.picturesType==1">
            <video
              
              v-for="item in ele.pictures.split(',')"
              :key="item"
              :src="item"
              autoplay
              controls
              muted
              style="width: 150px; height: 150px; margin-right: 15px"
              @click="handlepictures(item, 2,true)"
            />
          </div>
        </div>
        <div style="margin-top: 5px;text-indent:2em">{{ ele.value }}</div>
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
            margin-top:8px;
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
            margin-top:8px;
            vertical-align: middle;
            width: 20px;
            margin-right: 50px;
            cursor: pointer;
          "
          title="取消踩"
        />
        发布时间：{{ ele.createTime }}
      </div>
      <div style="mardin-top:20px;padding-left:50px" v-if="ele.like.length>0">
        <span v-for="(user,index) in ele.likeList" :key="user.username">
            <span style="color:green">{{user.username}}</span>
            <span v-if="index+1 < ele.likeList.length">,</span>
        </span>
        <span > {{ele.likeList.length}}人觉得很赞</span>
      </div>
    </div>
    <div style="padding: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next,sizes"
        :total="total"
        :page-size="5"
        :page-sizes="[5, 10, 15, 20, 50, 100]"
      >
      </el-pagination>
    </div>
    <el-dialog title="查看大图" :visible.sync="dialogVisible">
      <div v-if="show == 'upload'" style="text-align: center">
        <img  v-if="videoOrPict==0" :src="pictureList[index]" style="width: 60%" />
        <video  v-else-if="videoOrPict==1 && dialogVisible" :src="pictureList[index]" style="width: 60%" autoplay loop />
        <div
          style="
            padding-top: 20px;
            border-top: 1px solid #cdcdcd;
            margin-top: 20px;
          "
        >
          <el-button @click="removePicture(index)">删除</el-button>
          <el-button @click="dialogVisible = !dialogVisible">确认</el-button>
        </div>
      </div>
      <div v-else style="text-align: center">
        <img v-if="!showVideo" :src="picture" style="width: 60%" />
        <video autoplay loop controls v-else-if="showVideo && dialogVisible" :src="picture" style="width: 60%" />
        <div
          style="
            padding-top: 20px;
            border-top: 1px solid #cdcdcd;
            margin-top: 20px;
          "
        >
          <!-- <el-button @click="removePicture(index)">删除</el-button> -->
          <el-button @click="dialogVisible = !dialogVisible">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      textarea: "",
      loading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      pictureList: [],
      dialogVisible: false,
      index: 0,
      show: "",
      picture: "",
      videoOrPict:0, //0:图片1：视频
      showVideo:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    test() {
      this.request({
        method: "put",
        data: {
          type: 0,
          id: 1,
        },
        url: "/users/likes",
      }).then((data) => {
        console.log(data);
      });
    },
    //获取数据
    getData() {
      this.request({
        method: "get",
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
        url: "/users/checkComment",
      }).then((data) => {
        this.list = data.data;
        this.total = data.total;
      });
    },
    // 上传图片成功
    handleAvatarSuccess(res) {
      if (res.code == 200) {
        console.log(res);
        this.pictureList.push(res.url);
      }
    },
    // 查看或删除图片：
    handlepictures(index, type,videoOrPict) {
      if (type == 1) {
        this.index = index;
        this.show = "upload";
      } else if (type == 2) {
        this.show = "";
        this.picture = index;
        this.showVideo = videoOrPict;
       
      }

      this.dialogVisible = true;
    },
    //点赞或者取消点赞
    thinkLike(id, type) {
      this.request({
        method: "put",
        url: "/users/likes",
        data:{
          id,
          type
        }
      }).then((data)=>{
        console.log(data)
        this.getData()
      });
    },
    thinkDisLike(id,type){
       this.request({
        method: "put",
        url: "/users/dislikes",
        data:{
          id,
          type
        }
      }).then((data)=>{
        console.log(data)
        this.getData()
      });
    },
    removePicture(index) {
      this.pictureList.splice(index, 1);
      this.dialogVisible = false;
      // console.log(index);

      // console.log(this.pictureList);
    },
    beforeAvatarUpload(file) {
      console.log(file.type)
      if (this.videoOrPict == 0){
        const isJPG = (file.type === "image/jpeg" || file.type === 'image/png' || file.type === 'image/gif');
        if(!isJPG){
           this.$message.error("上传格式不正确!");
          return false
        }
      }else{
        const isVIDEO = file.type === 'video/mp4'
        if(!isVIDEO){
          this.$message.error("上传格式不正确!");
          return false
        }
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
        return true
    },
    addshuoshuo() {
      // console.log(this.$store.state.user);
      if (this.textarea.trim() == "") {
        this.$message("不能发布空");
        return;
      }
      let pictures = "";
      if (this.pictureList.length > 0) {
        pictures = this.pictureList.join(",");
      }
      this.loading = true;
      this.request({
        method: "post",
        data: {
          value: this.textarea,
          type:this.videoOrPict,
          pictures,
        },
        url: "/users/addComment",
      }).then((data) => {
        if (data.code == 200) {
          this.$message("发布成功");
          this.pictureList = [];
          this.textarea = "";
        }
        this.getData();
        this.loading = false;
        // console.log(data);
      });
    },
    //页码改变
    handleSizeChange(e) {
      this.pageSize = e;

      this.getData();
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
.shuoshuo {
  .send {
    padding: 10px;
    .send-img {
      width: 100px;
      height: 100px;
    }
  }
  .item {
    .header {
      color: rgb(32, 34, 141);
      cursor: pointer;
    }
    border-bottom: 1px solid #cdcdcd;
    padding: 20px 0;
    .content {
      margin-top: 20px;
      padding-left: 20px;
    }
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    border: 1px solid #cdcdcd;
    display: inline-block;
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