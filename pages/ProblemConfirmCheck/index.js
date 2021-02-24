// pages/ProblemReportEdit/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
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
      Reason:'',
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
  //获取核实附件
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
        'FileFrom': '2',
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
           if(//文件格式为图片
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
           }else if(//文件格式为视频
             item.FileExtension == '.mp4' ||
             item.FileExtension == '.avi' ||
             item.FileExtension == '.rmvb'
           ){
            this.data.videos.push(item)
            that.setData({
              havefile:true
             })
            
           }else{//文件格式为其他
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
  //选择上传文件
  upfile:function(){
    var that = this
    wx.chooseMessageFile({
      count: 9,//最大数量为9
      type: 'all',//上传格式不限制
      success:(res)=> {
      this.setData({
        filedata:res.tempFiles,//文件地址
        active:2,
      })
      this.upfile1()//上传文件
      }
    })
  },
  //从相册选择上传文件
  upimg:function(){
    var that = this
    wx.chooseMedia({
      count: 9,
      success:(res)=> {
      that.setData({
        filedata:res.tempFiles,
        active:2,
      })
      this.upfile2()//上传文件
      }
    })
  },
  //上传文件
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
          "fileFrom": '2',//其他需要参数
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
                
                'FileFrom': '2',
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
  //上传相册文件
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
          "fileFrom": '2',//其他需要参数
        },
        complete(res){
          //console.log(res)
        },
        success(res) {
            //成功回调函数
            Notify({ type: 'success', message: '上传成功' });
            //上传成功后清空文件列表
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
                'FileFrom': '2',
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
  Reason(event){
    this.setData({
      Reason:event.detail
    })
  },
  toest:function(){
    if(this.data.Reason == ''){
      Toast('请先输入核实建议')
    }
  },
  submit:function(){
    console.log(this.data.editData)
    var that = this
    Dialog.confirm({
      title: '核实问题',
      message: '是否核实问题',
    })
      .then(() => {
       // on confirm
        wx.request({
          url: 'http://118.24.196.69:20015/api/HTSC_Case/IsCaseVerification', 
          method:'post',
          data: JSON.stringify({
            'userid': "8001", 
            'suggestion':this.data.Reason,
            'pid':that.data.editData.PID,
            'istype': 1
            }),
          async: true,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
           Notify({ type: 'success', message: '成功指派核实上报问题！' });
            setTimeout(()=>{
                wx.navigateBack({
                  delta: 1,
                })
            },1000)
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  submit1:function(){
      var that = this
      Dialog.confirm({
          title: '不核实问题',
          message: '是否不核实问题',
        })
          .then(() => {
            // on confirm
            wx.request({
              url: 'http://118.24.196.69:20015/api/HTSC_Case/IsCaseVerification', 
              method:'post',
              data: JSON.stringify({
                'userid': "8001", 
               'suggestion':this.data.Reason,
               'pid':that.data.editData.PID,
               'istype': 2
                }),
              async: true,
              header: {
                'content-type': 'application/json' // 默认值
              },
              success :(res)=> {
               Notify({ type: 'success', message: '成功不指派核实上报问题！' });
                setTimeout(()=>{
                    wx.navigateBack({
                      delta: 1,
                    })
                },1000)
              }
            })
          })
          .catch(() => {
            // on cancel
          });
},
  // imageLoad: function (e) {//获取图片真实宽度  
  //   var imgwidth = e.detail.width,
  //     imgheight = e.detail.height,
  //     //宽高比  
  //     ratio = imgwidth / imgheight;
  //   //计算的高度值  
  //   var viewHeight = 750 / ratio;
  //   var imgheight = viewHeight;
  //   var imgheights = this.data.imgheights;
  //   //把每一张图片的对应的高度记录到数组里  
  //   imgheights[e.target.dataset.id] = imgheight;
  //   this.setData({
  //     imgheights: imgheights
  //   })
  // },
  // bindchange: function (e) {
  //   this.setData({ current: e.detail.current })
  // },
  // afterRead(event) {
  //   var that = this
  //   const { file } = event.detail;
  //   // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  //   that.setData({
  //     fileList:{url:file.url}
  //   })
  //   wx.request({
  //     url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseAddF', // 仅为示例，非真实的接口地址
  //     method:'post',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' //修改此处即可
  //       },
  //     name:file,
  //     data: {
  //       'case_no':that.data.editData.CASE_NO,
  //       "userid" : '8001',
  //       "fileFrom": '2',
  //       'Filedata': file.url,
  //     },
  //     success(res) {
  //       // 上传完成需要更新 fileList
  //      this.getfile()
  //     },
  //   })
  //   },
 //绑定播放视频事件
  playVideo:function(e){
    this.setData({
      videourl:this.data.videos[e.currentTarget.id].FilePath,
      videotitle:this.data.videos[e.currentTarget.id].FileName,
      play:true
    })
    this.videoContext = wx.createVideoContext('videos', this);//创建视频
    this.videoContext.requestFullScreen({ direction: 90 });//竖屏播放
  },
  //绑定视频显示事件
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
  //全屏显示图片事件
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
               
               'FileFrom': '2',
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
   

  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   wx.request({
     url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
     method:'post',
     data: {
       
       'FileFrom': '2',
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})