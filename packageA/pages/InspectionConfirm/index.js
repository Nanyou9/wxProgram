// pages/ProblemReportEdit/index.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify'
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  /**
   * 页面的初始数据
   */
  data: {
      radio: 'a',
      department:'',
      radio1: '请先选择派遣部门',
      editData:[],
      activeNames: ['0'],
      isimage:false,
      _t:'',
      supervisereason:'',
      supervisesuggestion:'',
      personList:[],
      page1:0,
      isfull:false,
      play:false,
      imglist:[],
      imglist1:[],
      department:'',
      columns1:[],
      videourl:'',
      videourl1:'',
      loadimg:true,
      show:false,
      show1:false,
      show2:false,
      readyload:false,
      videotitle:'',
      videotitle1:'',
      showbottom:false,
      isvideo:false,
      total:0,
      total1:0,
      isother:false,
      videos:[],
      images:[],
      videos1:[],
      images1:[],
      columns:[],
      page:0,
      page1:0,
      Reason:'',
      others:[],
      others1:[],
      active: 0,
      havefile:false,
      color:["","#04d126","#db0034","#cabb04"],
      Frequency:["","一般","紧急","暂缓"],
      type:["","部件","事件"],
      activeNames: ['0'],
      fileList: [],
      fileList1: [],
      height: '',
      filedata:[],
      filedata1:[],
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
  supervisesuggestion(e){
    this.setData({
      supervisesuggestion:e.detail
    })
  },
  supervisereason(e){
    this.setData({
      supervisereason:e.detail
    })
  },
  confirmChoose1:function(event){
    console.log(event.detail)
      // this.setData({
      //   person:event.detail.value[0].text,
      // })
  },
  changePerson(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  confirmChoose:function(event){
    console.log(event.detail.value)
    if(event.detail.value[1].text=='暂无下级部门'){
      this.setData({
        department:event.detail.value[0].text,
        departmentID:event.detail.value[0].id,
        show2:false,
      })
    }else{
      this.setData({
        department:event.detail.value[1].text,
        departmentID:event.detail.value[1].id,
        show2:false,
      })
    }
    console.log(this.data.department,this.data.departmentID)
  },
  changeChoose:function(event){
      const { picker, value, index } = event.detail;
      picker.setColumnValues(1,value[0].children);
  },
  closeChoose1:function(){
    this.setData({
      show3:false
    })
  },
  closeChoose:function(){
    this.setData({
      show2:false
    })
  },
  choose:function(){
    this.setData({
      show2:true
    })
  },
  onChange(event) {
   console.log(event)
   this.setData({
     active:event.detail.index
   })
  },
  showbot:function(){
    this.setData({
      show1:true
    })
  },
  onClose:function(){
    this.setData({
      show1:false
    })
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
  toest:function(){
    if(this.data.radio1 == '请先选择派遣部门'){
      Toast('未选择派遣部门或核查员')
    }
  },
  changePerson(event){
    console.log(event.detail)
    if(this.data.department!=""){
      this.setData({
        radio:event.detail,
        radio1:this.data.personList[event.detail].STAFF_NAME
      })
    }else{
      Toast('请先选择派遣部门!')
    }
  },
  submit:function(){
    console.log(this.data.editData)
    var that = this
    Dialog.confirm({
      title: '督办',
      message: '是否督办',
    })
      .then(() => {
       // on confirm
        wx.request({
          url: 'http://118.24.196.69:20015/api/HTSC_Case/IsCaseSupervision', 
          method:'post',
          data: JSON.stringify({
            'supervisereason':this.data.supervisereason,
            'supervisesuggestion':this.data.supervisesuggestion,
            'pid':that.data.editData.PID,
            'userid': 8001,
            }),
          async: true,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
           Notify({ type: 'success', message: '成功立案！' });
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
    this.setData({
      videourl:this.data.videos[e.currentTarget.id].FilePath,
      videotitle:this.data.videos[e.currentTarget.id].FileName,
      play:true
    })
    this.videoContext = wx.createVideoContext('videos', this);
    this.videoContext.requestFullScreen({ direction: 90 });
  },
  playVideo1:function(e){
    this.setData({
      videourl1:this.data.videos1[e.currentTarget.id].FilePath,
      videotitle1:this.data.videos1[e.currentTarget.id].FileName,
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
  showImages1:function(e){
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: this.data.imglist1 // 需要预览的图片http链接列表
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
  getfile1:function(){
    var that= this
    this.setData({
      total1:this.data.total1+15,
      page1:this.data.page1+1
    })
    wx.request({
      url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
      method:'post',
      data: {
        'FileFrom': '2',
        'page':this.data.page1,
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
              readyload1:true
             })
        }
        res.data.rows.forEach((item,index)=>{
           if(
           item.FileExtension=='.png' || 
           item.FileExtension=='.jpg' || 
           item.FileExtension=='.jpeg'|| 
           item.FileExtension=='.jpe' ||
           item.FileExtension=='.gif'){
             this.data.images1.push(item)
             this.data.imglist1.push(item.FilePath)
             this.setData({
              havefile1:true
             })
           }else if(
             item.FileExtension == '.mp4' ||
             item.FileExtension == '.avi' ||
             item.FileExtension == '.rmvb'
           ){
            this.data.videos1.push(item)
            that.setData({
              havefile1:true
             })
            
           }else{
             this.data.others1.push(item)
             that.setData({
              havefile1:true
             })
             
           }
        })
        this.setData({
          imglist1:this.data.imglist1,
          images1:this.data.images1,
          videos1:this.data.videos1,
          others1:this.data.others1,
          showbottom:true
        })
        console.log(this.data.images1,this.data.videos1,this.data.others1)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var edit = JSON.parse(options.editData)
    this.setData({
      editData:edit,
  })
  console.log(this.data.editData)
  this.getfile()
  this.getfile1()
  wx.request({
    url: 'http://118.24.196.69:20015/api/HTSC_Personne/GetPagePersonneList',
    method:'post',
    data: {'page':this.data.page1,rows:15},
    header: {
      'content-type': 'application/json' // 默认值
    }, 
    success :(res)=> {
      this.setData({
        personList:res.data.rows
      })
      console.log('person:',this.data.personList)
    }
  })
  wx.request({
    url: 'http://118.24.196.69:20015/api/HTSC_Case/OrganizationtreeDate',
    method:'post',
    data: '',
    header: {
      'content-type': 'application/json' // 默认值
    }, 
    success :(res)=> {
      console.log(res.data)
      res.data.forEach((item)=>{
         if(item.children==null){
          item.children = []
          item.children.push({text:'暂无下级部门',children: null})
         }
      })
      this.setData({
        columns: [
          {
              values: res.data,
              className: 'column1'
            },
            {
              values: res.data[0].children,
              className: 'column2',
              defaultIndex: 0
            },
      ]
      })
      console.log(this.data.columns)
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
     
      total:15,
      images:[],
      videos:[],
      others:[],
      imglist:[]
    })
    if(this.data.active==1){
      wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
        method:'post',
        data: {
          
          'FileFrom': '1',
          'page':1,
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
            others:this.data.others,
            page:1,
          })
        }
      })
    }
    if(this.data.active==2){
      wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
        method:'post',
        data: {
          
          'FileFrom': '1',
          'page':1,
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
               this.data.images1.push(item)
               that.data.imglist1.push(item.FilePath)
               this.setData({
                havefile1:true
               })
             }else if(
               item.FileExtension == '.mp4' ||
               item.FileExtension == '.avi' ||
               item.FileExtension == '.rmvb'
             ){
              this.data.videos1.push(item)
              that.setData({
               havefile1:true
              })
              
             }else{
               this.data.others1.push(item)
               that.setData({
                 havefile1:true
                })
               
             }
          })
          this.setData({
            imglist1:that.data.imglist1,
            images1:this.data.images1,
            videos1:this.data.videos1,
            others1:this.data.others1,
            page1:1,
          })
        }
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.active==1){
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
    }
    if(this.data.active==2){
     wx.request({
       url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
       method:'post',
       data: {
         'FileFrom': '1',
         'page':this.data.page1+1,
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
              this.data.images1.push(item)
              that.data.imglist1.push(item.FilePath)
              this.setData({
               havefile1:true
              })
            }else if(
              item.FileExtension == '.mp4' ||
              item.FileExtension == '.avi' ||
              item.FileExtension == '.rmvb'
            ){
             this.data.videos1.push(item)
             that.setData({
              havefile1:true
             })
             
            }else{
              this.data.others1.push(item)
              that.setData({
                havefile1:true
               })
              
            }
         })
         this.setData({
           imglist1:that.data.imglist1,
           images1:this.data.images1,
           videos1:this.data.videos1,
           others1:this.data.others1
         })
       }
     })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})