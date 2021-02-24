// pages/ProblemReportMap/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

const setting = {
    skew: 0,
    rotate: 0,
    showLocation: false,
    showScale: false,
    subKey: '',
    scale:8,
    layerStyle: 1,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    showCompass: false,
    enable3D: false,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: false,
  }
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        id:0,
        sub:'',
        main:'',
        show: false,
        actions: [],
        action:[],
        optiondata:[],
        latitude: '31.777843793445772',
        longitude: '104.38662999762656',
        markers:[]
    },
    selectMarket:function(e){
      console.log(e.detail.markerId)
      this.setData({
        latitude:this.data.markers[e.detail.markerId-1].latitude,
        longitude:this.data.markers[e.detail.markerId-1].longitude,
        name:this.data.markers[e.detail.markerId-1].name,
        show:true
      })
      console.log(this.data.longitude,this.data.name)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    close:function(){
      this.setData({
        show:false
      })
    },
    close2:function(){
      this.setData({
        show2:false
      })
    },
    confirm:function(){
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        name:this.data.name
      })
      wx.navigateBack({
        delta: 1
      })
    },
    onSelect:function(event){
           console.log(event.detail)
    },
    onLoad: function (options) {
      console.log(options.sub,options.main)
              this.setData({
                  sub:options.sub,
                  main:options.main,
              })
              console.log(this.data.height)
              var that = this
              wx.request({
                  url: 'http://118.24.196.69:20015/api/HTSC_Case/GetComponentList', 
                  method:'post',
                  data: JSON.stringify({mcode:that.data.main,scode:that.data.sub}),
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success :(res)=> {
                      console.log(res.data)
                      that.setData({
                          optiondata:res.data,
                      })
                      res.data.forEach(item=>{
                         let longitude = item.Compnt_LAN;
                         let latitude = item.Compnt_LAT;
                         let name = item.ObjName;
                         that.setData({
                             id:that.data.id+1
                         })
                         
                         let id = that.data.id
                         let width = '60rpx'
                         let height = '60rpx'
                         let iconPath = '/images/marker.png'
                         let callout =  {
                            content: item.ObjName,
                            padding:10,
                            display:'ALWAYS',
                            textAlign:'center',
                            borderRadius: '20rpx',
                            borderColor:'#ff4657',
                            borderWidth: 2,
                          }
                         let opdata ={id,name,width,height,iconPath,longitude,latitude,callout}
                         that.data.action.push(opdata)
                      })
                      that.setData({
                        markers:that.data.action
                      })
                      console.log(that.data.markers)
                  }
                })
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
            this.setData({
              markers:[],
            })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      this.setData({
        markers:[],
      })
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