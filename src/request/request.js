import axios  from "axios";
import {Message} from 'element-ui'
axios.defaults.withCredentials=true;
// 本地开发环境


// const baseURL = 'http://192.168.0.106:8888';
// const baseURL = 'http://192.168.0.108:8888';
const baseURL = 'http://192.168.1.11:8888';
// const baseURL = 'http://192.168.1.103:8888';
// 上线环境
// const baseURL = 'https:huxukang.club';
const instance = axios.create({
    baseURL,
    timeout:6000,
    // headers:{
    //     'content-type': "application/x-www-form-urlencoded"
    // }
})
let requests = ''
instance.interceptors.request.use((request)=>{
    
    requests = request.url;
    return request
})

// 请求结果过滤
instance.interceptors.response.use((response)=>{
    let data = response.data
    if(response.status == 200){
        
        if(data.code == 302){
            Message({
                message: `该操作需要登录，请登陆后操作`,
                type: 'warning'
            })
           
        }
        return response.data;
    }else if(data.code == 404){
        Message({
            message: `不存在${requests}该接口`,
            type: 'warning'
        })
    }
        // return
    
    
}) 
const request = instance
export  {request,baseURL}  