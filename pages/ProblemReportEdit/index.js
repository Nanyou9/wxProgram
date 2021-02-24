// pages/ProblemReportEdit/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      editData:[],
      isimage:false,
      isfull:false,
      play:false,
      imglist:[],
      videourl:'',
      loadimg:true,
      show:false,
      readyload:false,
      videotitle:'',
      showbottom:false,
      isvideo:false,
      total:0,
      isother:false,
      videos:[],
      images:[],
      page:0,
      others:[],
      active: 0,
      havefile:false,
      color:["","#04d126","#db0034","#cabb04"],
      Frequency:["","一般","紧急","暂缓"],
      type:["","部件","事件"],
      activeNames: ['0'],
      fileList: [
      ],
      height: '',
      filedata:[],
      circular: true,
      //是否显示画板指示点  
      indicatorDots: true,
      //选中点的颜色  
      indicatorcolor: "#000",
      //是否竖直  
      vertical: false,
      //是否自动切换  
      autoplay: true,
      //自动切换的间隔
      interval: 6000,
      //滑动动画时长毫秒  
      duration: 500,
      //所有图片的高度  
      imgheights: [],
      //图片宽度 
      imgwidth: 750,
      //默认  
      current: 0
  },
  onChange(event) {
   
  },
  
  getfile:function(){
    var that= this
    this.setData({
      total:this.data.total+15,
      page:this.data.page+1
    })
    wx.request({
      url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
      method:'post',
      data: {
        'FileFrom': '1',
        'page':this.data.page,
        'CASE_NO': this.data.editData.CASE_NO,
        'rows':'15'
      },
      header: {
        'content-type': 'application/json' // 默认值
      }, 
      success :(res)=> {
        var rows = res.data.rows
        if(rows.length==0){
             this.setData({
              readyload:true
             })
        }
        res.data.rows.forEach((item,index)=>{
           if(
           item.FileExtension=='.png' || 
           item.FileExtension=='.jpg' || 
           item.FileExtension=='.jpeg'|| 
           item.FileExtension=='.jpe' ||
           item.FileExtension=='.gif'){
             this.data.images.push(item)
             this.data.imglist.push(item.FilePath)
             this.setData({
              havefile:true
             })
           }else if(
             item.FileExtension == '.mp4' ||
             item.FileExtension == '.avi' ||
             item.FileExtension == '.rmvb'
           ){
            this.data.videos.push(item)
            that.setData({
              havefile:true
             })
            
           }else{
             this.data.others.push(item)
             that.setData({
              havefile:true
             })
             
           }
        })
        this.setData({
          imglist:this.data.imglist,
          images:this.data.images,
          videos:this.data.videos,
          others:this.data.others,
          showbottom:true
        })
        console.log(this.data.images,this.data.videos,this.data.others)
      }
    })
  },
  upfile:function(){
    var that = this
    wx.chooseMessageFile({
      count: 9,
      type: 'all',
      success:(res)=> {
      this.setData({
        filedata:res.tempFiles,
        active:2,
      })
      this.upfile1()

      }
    })
  },
  upimg:function(){
    var that = this
    wx.chooseMedia({
      count: 9,
      success:(res)=> {
      that.setData({
        filedata:res.tempFiles,
        active:2,
      })
      this.upfile2()
      }
    })
  },
  upfile2:function(){
    var that = this
    that.data.filedata.forEach((item,index)=>{
      wx.uploadFile({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseAddF',
        filePath: that.data.filedata[index].tempFilePath,
        name: that.data.filedata[index].tempFilePath,
        formData: {
          'case_no':that.data.editData.CASE_NO,
          "userid" : '8001',
          "fileFrom": '1',//其他需要参数
        },
        complete(res){
          //console.log(res)
        },
        success(res) {
            //成功回调函数
            Notify({ type: 'success', message: '上传成功' });
            that.setData({
              page:1,
              total:15,
              images:[],
              videos:[],
              others:[]
            })
            wx.request({
              
              url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
              method:'post',
              data: {
                
                'FileFrom': '1',
                'page':that.data.page,
                'CASE_NO': that.data.editData.CASE_NO,
                'rows':'15'
              },
              header: {
                'content-type': 'application/json' // 默认值
              }, 
              success :(res)=> {
                res.data.rows.forEach((item,index)=>{
                   if(
                   item.FileExtension=='.png' || 
                   item.FileExtension=='.jpg' || 
                   item.FileExtension=='.jpeg'|| 
                   item.FileExtension=='.jpe' ||
                   item.FileExtension=='.gif'){
                     that.data.images.push(item)
                     that.data.imglist.push(item.FilePath)
                     that.setData({
                      havefile:true
                     })
                   }else if(
                     item.FileExtension == '.mp4' ||
                     item.FileExtension == '.avi' ||
                     item.FileExtension == '.rmvb'
                   ){
                    that.data.videos.push(item)
                    that.setData({
                      havefile:true
                     })
                    
                   }else{
                     that.data.others.push(item)
                     that.setData({
                      havefile:true
                     })
                     
                   }
                })
                that.setData({
                  imglist:that.data.imglist,
                  images:that.data.images,
                  videos:that.data.videos,
                  others:that.data.others
                })
              }
            })
        }
      })
    })
    
  },
  upfile1:function(){
    var that = this
    that.data.filedata.forEach((item,index)=>{
      wx.uploadFile({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseAddF',
        filePath: that.data.filedata[index].path,
        name: that.data.filedata[index].name,
        formData: {
          'case_no':that.data.editData.CASE_NO,
          "userid" : '8001',
          "fileFrom": '1',//其他需要参数
        },
        complete(res){
        },
        success(res) {
            //成功回调函数
            Notify({ type: 'success', message: '上传成功' });
            that.setData({
              page:1,
              total:15,
              images:[],
              videos:[],
              others:[]
            })
            wx.request({
              url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
              method:'post',
              data: {
                
                'FileFrom': '1',
                'page':that.data.page,
                'CASE_NO': that.data.editData.CASE_NO,
                'rows':'15'
              },
              header: {
                'content-type': 'application/json' // 默认值
              }, 
              success :(res)=> {
                res.data.rows.forEach((item,index)=>{
                   if(
                   item.FileExtension=='.png' || 
                   item.FileExtension=='.jpg' || 
                   item.FileExtension=='.jpeg'|| 
                   item.FileExtension=='.jpe' ||
                   item.FileExtension=='.gif'){
                     that.data.images.push(item)
                     that.data.imglist.push(item.FilePath)
                     that.setData({
                      havefile:true
                     })
                   }else if(
                     item.FileExtension == '.mp4' ||
                     item.FileExtension == '.avi' ||
                     item.FileExtension == '.rmvb'
                   ){
                    that.data.videos.push(item)
                    that.setData({
                      havefile:true
                     })
                    
                   }else{
                     that.data.others.push(item)
                     that.setData({
                      havefile:true
                     })
                     
                   }
                })
                that.setData({
                  imglist:that.data.imglist,
                  images:that.data.images,
                  videos:that.data.videos,
                  others:that.data.others
                })
              }
            })
        }
      })
    })
    
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  afterRead(event) {
    var that = this
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    that.setData({
      fileList:{url:file.url}
    })
    wx.request({
      url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseAddF', // 仅为示例，非真实的接口地址
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
      name:file,
      data: {
        'case_no':that.data.editData.CASE_NO,
        "userid" : '8001',
        "fileFrom": '1',
        'Filedata': file.url,
      },
      success(res) {
        // 上传完成需要更新 fileList
       this.getfile()
      },
    })
    },
  playVideo:function(e){
    console.log(213)
    this.setData({
      videourl:this.data.videos[e.currentTarget.id].FilePath,
      videotitle:this.data.videos[e.currentTarget.id].FileName,
      play:true
    })
    this.videoContext = wx.createVideoContext('videos', this);
    this.videoContext.requestFullScreen({ direction: 90 });
  },
  fullscreen:function(){
    if(this.data.isfull==false){
      this.setData({
        isfull:true
      })
    }else{
      this.setData({
        isfull:false,
        play:false
      })
    }
  },
  onClickHide:function(){
    this.setData({
      show:false
    })
  },
  showImages:function(e){
    console.log(e.target.id,this.data.imglist)
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: this.data.imglist // 需要预览的图片http链接列表
    })
  },
  delate:function(e){
    Dialog.confirm({
      title: '删除文件',
      message: '是否删除此文件',
    })
      .then(() => {
        var pid = [e.target.id]
        var that = this
        wx.request({
         method:'post',
         url: 'http://118.24.196.69:20015/api/HTSC_Case/CaseDeletFile',
         data: pid,
         header: {
          'content-type': 'application/json' // 默认值
         },
          success(res) {
           Notify({ type: 'success', message: '删除成功' });
           that.setData({
             page:1,
             total:15,
             images:[],
             videos:[],
             others:[]
           })
           wx.request({
             url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
             method:'post',
             data: {
               
               'FileFrom': '1',
               'page':that.data.page,
               'CASE_NO': that.data.editData.CASE_NO,
               'rows':'15'
             },
             header: {
               'content-type': 'application/json' // 默认值
             }, 
             success :(res)=> {
               res.data.rows.forEach((item,index)=>{
                  if(
                  item.FileExtension=='.png' || 
                  item.FileExtension=='.jpg' || 
                  item.FileExtension=='.jpeg'|| 
                  item.FileExtension=='.jpe' ||
                  item.FileExtension=='.gif'){
                    that.data.images.push(item)
                    that.data.imglist.push(item.FilePath)
                    that.setData({
                     havefile:true
                    })
                  }else if(
                    item.FileExtension == '.mp4' ||
                    item.FileExtension == '.avi' ||
                    item.FileExtension == '.rmvb'
                  ){
                   that.data.videos.push(item)
                   that.setData({
                    havefile:true
                   })
                   
                  }else{
                    that.data.others.push(item)
                    that.setData({
                      havefile:true
                     })
                    
                  }
               })
               that.setData({
                imglist:that.data.imglist,
                 images:that.data.images,
                 videos:that.data.videos,
                 others:that.data.others
               })
             }
           })
        
          },
          
        })
      })
      .catch(() => {
        // on cancel
      });
    
     
  },
  Change(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var edit = JSON.parse(options.editData)
    this.setData({
      editData:edit,
  })
  this.getfile()
  this.setData({
    showbottom:true
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
    this.setData({
      page:1,
      total:15,
      images:[],
      videos:[],
      others:[]
    })
   wx.request({
     url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
     method:'post',
     data: {
       
       'FileFrom': '1',
       'page':this.data.page,
       'CASE_NO': this.data.editData.CASE_NO,
       'rows':'15'
     },
     header: {
       'content-type': 'application/json' // 默认值
     }, 
     success :(res)=> {
       res.data.rows.forEach((item,index)=>{
          if(
          item.FileExtension=='.png' || 
          item.FileExtension=='.jpg' || 
          item.FileExtension=='.jpeg'|| 
          item.FileExtension=='.jpe' ||
          item.FileExtension=='.gif'){
            this.data.images.push(item)
            that.data.imglist.push(item.FilePath)
            this.setData({
             havefile:true
            })
          }else if(
            item.FileExtension == '.mp4' ||
            item.FileExtension == '.avi' ||
            item.FileExtension == '.rmvb'
          ){
           this.data.videos.push(item)
           that.setData({
            havefile:true
           })
           
          }else{
            this.data.others.push(item)
            that.setData({
              havefile:true
             })
            
          }
       })
       this.setData({
         imglist:that.data.imglist,
         images:this.data.images,
         videos:this.data.videos,
         others:this.data.others
       })
     }
   })

  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.readyload !=true){
      wx.showNavigationBarLoading()
      this.setData({
        showbottom:false
      })
      this.getfile()
      setTimeout(()=>{
              wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh();
              
      },2000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})