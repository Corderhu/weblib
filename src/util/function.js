//vue 公共函数建议$
const fun = {
  // 直接将函数写在fun中  
  $historyBack: function () {
    this.$router.back(-1)
  },
  // 登录接口
  $login_in: function (user,callback) {
    localStorage.clear()
    sessionStorage.clear()
    this.request({
      url: '/users/login_in',
      method: 'post',
      data: user
    }).then((data) => {
      console.log(data)
      if (data.code == 200) {
        // 登录成功
        //  this.$store.commit
        this.$store.commit('updateUserInfo', data.data)
        callback()
        // this.$message('登录成功')
        // this.$router.push('/')
      } else if (data.code == 201) {
        this.$message(data.msg)
        this.$login_out()
      }
    })
    // alert('submit!');
  },
  // 推出登录
  $login_out: function () {
    this.request({
      url: "/users/login_out",
      method: "post",
    }).then((data) => {
      if (data.code == 200) {
        //个人信息清空
        this.$store.commit('clearUserIndo')
        this.$message({
          message: "请重新登录",
        });
       
      }
    });
  }
}
export default fun