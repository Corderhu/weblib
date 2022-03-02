<template>
  <div class="login">
    <div class="main">
      <el-form
        :model="ruleForm"
        status-icon
       
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
         <el-form-item label="账号" prop="username" >
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="historyBack">返回</el-button>
          
        </el-form-item>
      </el-form>
      <span type="primary" @click="register" style="color:blue;cursor:pointer;margin-left:85px"
      >没有账号，去 [ 注册 ] ?</span
          >
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data(){
      return{
          ruleForm:{
            username:'',
            password:'',
           
          }
      }
  },
  methods:{
      // 登录
      submitForm(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
              if((this.ruleForm.username.trim() == "")){
                  this.$message('账号不能为空')
                  return
              }else if(this.ruleForm.password.trim() == ""){
                  this.$message('密码不能为空')
                  return
              }
            //   登录
             this.request({
                 url:'/users/login_in',
                 method:'post',
                 data:this.ruleForm
             }).then((data)=>{
                 console.log(data)
                 if(data.code == 200){
                     // 登录成功
                    //  this.$store.commit
                     this.$store.commit('updateUserInfo',data.data)
                     this.$message('登录成功')
                     this.$router.push('/')
                 }else if(data.code == 201){
                     this.$message(data.msg)
                 }
             })
              console.log(valid)
            // alert('submit!');
          } else {
            this.$message('出现未知错误，请刷新后重试')
            return false;
          }
        });
      },
      register(){
        this.$router.push('/register')
      },
      historyBack(){
        this.$historyBack()
      }
  }
};
</script>
<style scoped lang='scss'>
.login {
  text-align: center;
  .main{
      width: 80%;
      height: 80%;
      max-width: 500px;
    
      padding: 30px;
    //  
    margin: 0 auto;
    margin-top: 150px;
  }
}
</style>
