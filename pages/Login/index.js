// pages/Login/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

    /**
     * 页面的初始数据
     */
    data: {
       username:'',
       password:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    //绑定用户名
    onChange:function(value){
       this.setData({
          username:value.detail
       })
       console.log(this.data.username)
    },
    //绑定密码
    onChange1:function(value){
        this.setData({
           password:value.detail
        })
        console.log(this.data.password)
     },
     //登录
     submit:function(){
        var that = this
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
          });
         if(this.data.username =="" || this.data.username == undefined){
            Toast('请输入用户名');
         }else if(this.data.password == ""){
            Toast('请输入密码');
         }else{
            wx.request({
                url: 'http://118.24.196.69:20015/api/HTSC_Case/Login', 
                method:'post',
                data: {username:this.data.username,password:this.data.password},
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success :(res)=> {
                    Toast.clear
                    if(res.data.Msg == '失败'){
                        Toast('用户名或密码错误');
                        this.setData({
                            password:'',
                        })
                    }else{
                        console.log(res)
                        wx.setStorage({//保存key值
                            key: 'key',
                            data: [
                                that.data.username,
                                that.data.password,
                                res.data.Data.STAFF_NAME,
                                res.data.Data.STAFF_POSITION,
                            ],
                            success(res) {
                             }
                        })
                        Toast.success('登录成功');
                        var staff = JSON.stringify(res.data.Data)
                        setTimeout(()=>{
                            wx.reLaunch({
                             url: '/pages/index/index?staffData=' + staff,
                           })
                        },1000)
                    }
                },
                fail(res){
                    Toast.fail('登陆失败,请检查网络');
                }
              })
         }
     },
    onLoad: function (options) {
        wx.hideHomeButton()
        this.setData({
          username: options.username,
      })
      console.log(options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})