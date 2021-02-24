//index.js
//获取应用实例
const app = getApp()
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  data: {
    username:'',
    password:'',
    home:'home',
    me:'me',
    staffData:[]
  },
  //事件处理函数
  home: function () {
  },
  me: function () {
    wx.navigateTo({
      url: '/pages/Mine/index',//跳转至我的页面
    })
  },
  //
  onLoad: function (option) {
    var that = this
     wx.hideHomeButton()//隐藏home按钮
     wx.getStorage({//获取key里面的用户名和密码
      key: 'key',
      success(res) {
        that.setData({
          username:res.data[0],
          password:res.data[1]
        })
      },
      fail(res) {
        if(that.data.password==''||that.data.username==''){
          Toast.loading({
            message: '登录失效或未登录...',
            forbidClick: true,
          });
           setTimeout(()=>{
             wx.reLaunch({
               url: '/pages/Login/index'//返回登录页面
             })
         },2000)
        }
      }
    })
  },
})
