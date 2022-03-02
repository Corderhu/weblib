<template>
  <div class="register">
    <div class="main">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          >
          <el-button @click="historyBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        password2: "",
        email: "",
      },
    };
  },
  methods: {
    //邮箱验证
    check(email) {
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      ); //正则表达式
    //   var obj = email; //要验证的对象
      if (email.trim() === "") {
        //输入不能为空
        this.$message("输入不能为空!");
        return false;
      } else if (!reg.test(email.trim())) {
        //正则验证不通过，格式不对
        this.$message("邮箱验证不通过!");
        return false;
      } else {
        // alert("通过！");
        return true;
      }
    },
    // 登录
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.ruleForm.username.trim() == "") {
            this.$message("账号不能为空");
            return;
          } else if (this.ruleForm.password.trim() == "") {
            this.$message("密码不能为空");
            return;
          } else if (this.ruleForm.password2.trim() == "") {
            this.$message("密码不能为空");
            return;
          } else if (
            this.ruleForm.password.trim() !== this.ruleForm.password2.trim()
          ) {
            this.$message("密码不一致");
            return;
          }else if(!this.check(this.ruleForm.email)){
              return
          }
        //   console.log(this.ruleForm)
        //   return
          //   登录
          this.request({
            url: "/users/register",
            method: "post",
            data: this.ruleForm,
          }).then((data) => {
            console.log(data);
            if (data.code == 200) {
              this.$message("注册成功，可以登录了");
              this.$router.push("/");
            } else {
              this.$message(data.msg);
            }
          });

          // alert('submit!');
        } else {
          this.$message("出现未知错误，请刷新后重试");
          return false;
        }
      });
    },
    //
    historyBack() {
      this.$historyBack();
    },
  },
};
</script>
<style scoped lang='scss'>
.register {
  text-align: center;
  .main {
    width:80%;
    height: 80%;
    max-width: 500px;
    max-height: 500px;
    padding: 30px;
    //
    margin: 0 auto;
    margin-top: 150px;
  }
}
</style>