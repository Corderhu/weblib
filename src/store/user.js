export default {
    state: {
        age:18,
        user:{
            username:'',//用户名
            userheader:'',//用户头像
            level:'',//用户权限
            users:{},
        },
    },
    mutations: {
        // 登陆时更新
        updateUserInfo(state,info){
            state.user = {
                username:info.username,
                userheader:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0726%252F19458896j00qwueyo001ec000b400b4c.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643272085&t=c140ff11499a95df217995e93380b9da',//用户头像
                level:info.level,//用户权限
                email:info.email,
                users:info.users
            }
            // 存储在本地
            localStorage.setItem('user',JSON.stringify(state.user))
            // 会话存储密码重新登陆,会话关闭就消失
            sessionStorage.setItem('password',info.password)
        },
        // 推出登录时清除
        clearUserIndo(state){
            state.user = {
                username:'',
                userheader:'',//用户头像
                level:'',//用户权限
                email:'',
                users:{}
            }
            localStorage.clear()
            sessionStorage.clear()
        }
    },
    actions: {
      
    },
    modules: {
      
    }

}

// const state = {
//     user:{
//         username:'',//用户名
//         userheader:'',//用户头像
//         level:'',//用户权限
//     },
//     total: 20
// }
// const getters = {
//     // getA (state) { return state.total }
// }
// const actions = {
    
//     // add ({commit,state}) {
//     //     state.total++
//     //     commit(type.TEST_MUTATIONS)
//     // }
// }
// const mutations = {
//     updateUserInfo(state,info){
//         state.user = {
//             username:info.username,
//         }
//     }
    // des (state) {
    //     state.total--
    // },
    // [type.TEST_MUTATIONS](state){
    //     console.log(state)
    // }
// }
// export default {
    
//     user
//     // state,
//     // getters,
//     // actions,
//     // mutations
// }
