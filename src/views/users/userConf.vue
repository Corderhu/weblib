<template>
  <div class="userConf">
    <div class="content">
      <h4 style="text-align:center">我的资料</h4>
      <div class="box">
        <span>头像：</span>
        <el-image
          style="width: 80px; height: 80px; vertical-align: middle;border-radius:40px"
          :src="userInfo.users.header"
        ></el-image>

        <el-upload
          v-if="modifyInfo"
          class="avatar-uploader"
          :action="$baseUrl + '/users/uploadPicture'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="picture"
        >
          新头像为
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:80px;height:80px;border-radius:40px;vertical-align:middle" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="box" style="margin-top:80px">
        <span>用户账号：</span>
        <span>{{ userInfo.username }}</span>
        <span style="margin-left: 100px">用户权限：</span>
        <span v-if="userInfo.level == 0">管理员</span>
        <span v-if="userInfo.level == 1">普通用户</span>
      </div>
      <div class="box" style="margin-top:80px">
        <span>个人邮箱：</span>
        <span v-if="!modifyInfo">{{ userInfo.email }}</span>
        <el-input
          v-else
          type="email"
          placeholder="请输入邮箱"
          style="width: 200px"
          v-model="email"
        ></el-input>
      </div>
      <div class="box" style="text-align: right; margin-top: 50px">
        <el-button @click="modifyInfo? modifyInfo=false:$router.go(-1)">返回</el-button>
        <el-button v-if="!modifyInfo" @click="modify('modify')" type="primary"
          >编辑信息</el-button
        >
       
        <el-button v-else @click="modify('sure')" type="primary">确认修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},

      modifyInfo: false,
      imageUrl: "",
      email: "",
      
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res)
      if (res.code == 200) {
        this.imageUrl = res.url;
      }
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        // const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        // if (!isLt2M) {
        //   this.$message.error("上传头像图片大小不能超过 2MB!");
        // }
        return isJPG
    },
    // 获取个人信息
    getData() {
      console.log('aaa')
      this.userInfo = this.$store.state.user.user;
      
      // this.info;
      console.log(this.userInfo);
      this.email = this.userInfo.email
    },
    modify(text) {
      if (text == "modify") {
        this.modifyInfo = !this.modifyInfo;
      } else if (text == "sure") {
        const postData = {
          picture: "",
          email: "",
        };
        if (this.imageUrl !== "") {
          postData["picture"] = this.imageUrl;
        }
        if (this.email !== "") {
          postData["email"] = this.email;
        }
        if ( postData.email == this.userInfo.email && postData.picture == "") {
          this.$message("没有要修改的内容,不能提交");
          return;
        }
        console.log(postData);
        this.request({
          url: "/users/modifyUsersInfo",
          method: "post",
          data: postData,
        }).then((data) => {
          if (data.code == 200) {
            this.$message("修改成功");
            const user = {};
            user["username"] = JSON.parse(
              localStorage.getItem("user")
            ).username;
            user["password"] = sessionStorage.getItem("password");
            // this.$login_in(user);
            new Promise((resolve,reject)=>{
               this.$login_in(user,resolve);
              
            }).then(()=>{
              this.getData()
              console.log('执行了')
              
            })
          
            this.modifyInfo = false;
          }
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.userConf {
  box-sizing: border-box;
  padding: 30px;
  text-align: center;
  background: #cdcdcd;
  min-height: 100vh;
  .content {
    padding: 80px;
    min-width: 600px;
    max-width: 800px;
    min-height: 400px;
    background-color: #fff;
    margin: 0 auto;
    text-align: left;
    border-radius: 20px;
    .box {
      margin-top: 20px;
      margin-left: 100px;
    }
  }
}
.avatar-uploader {
  display: inline-block;
  margin-left: 20px;
  vertical-align: middle;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  // display: block;
  border: 1px solid #cdcdcd;
}
</style>