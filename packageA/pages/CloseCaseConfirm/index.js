// pages/ProblemReportEdit/index.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify'
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  /**
   * 页面的初始数据
   */
  data: {
      imglist1:[],
      videourl:'',
      videos1:[],
      total1:[],
      page1:0,
      images1:[],
      fileList1: [],
      imglist2:[],
      videour2:'',
      videos2:[],
      total2:[],
      page2:0,
      images2:[],
      fileList2: [],
      imglist3:[],
      videour3:'',
      videos3:[],
      total3:[],
      page3:0,
      images3:[],
      fileList3: [],
      radio: 'a',
      radio1: '请先选择派遣部门',
      radio2:'',
      editData:[],
      activeNames: ['0'],
      isimage:false,
      _t:'',
      statusV:"",
      statusType:"",
      status:["未处理","处理中","处理完毕"],
      supervisereason:'',
      supervisesuggestion:'',
      personList:[],
      page1:0,
      isfull:false,
      play:false,
      imglist:[],
      department:'',
      columns1:[],
      videourl:'',
      loadimg:true,
      show:false,
      show1:false,
      show2:false,
      readyload:false,
      videotitle:'',
      showbottom:false,
      isvideo:false,
      total:0,
      isother:false,
      videos:[],
      images:[],
      columns:[],
      page:0,
      Reason:'',
      others:[],
      active: 0,
      havefile:false,
      color:["","#04d126","#db0034","#cabb04"],
      Frequency:["","一般","紧急","暂缓"],
      type:["","部件","事件"],
      activeNames: ['0'],
      fileList: [],
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
  getfile2:function(){
    var that= this
    this.setData({
      total2:this.data.total2+15,
      page2:this.data.page2+1
    })
    wx.request({
      url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
      method:'post',
      data: {
        'FileFrom': '4',
        'page':this.data.page2,
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
              readyload2:true
             })
        }
        res.data.rows.forEach((item,index)=>{
           if(
           item.FileExtension=='.png' || 
           item.FileExtension=='.jpg' || 
           item.FileExtension=='.jpeg'|| 
           item.FileExtension=='.jpe' ||
           item.FileExtension=='.gif'){
             this.data.images2.push(item)
             this.data.imglist2.push(item.FilePath)
             this.setData({
              havefile2:true
             })
           }else if(
             item.FileExtension == '.mp4' ||
             item.FileExtension == '.avi' ||
             item.FileExtension == '.rmvb'
           ){
            this.data.videos2.push(item)
            that.setData({
              havefile2:true
             })
            
           }else{
             this.data.others2.push(item)
             that.setData({
              havefile2:true
             })
             
           }
        })
        this.setData({
          imglist2:this.data.imglist2,
          images2:this.data.images2,
          videos2:this.data.videos2,
          others2:this.data.others2,
          showbottom:true
        })
        console.log(this.data.images2,this.data.videos2,this.data.others2)
      }
    })
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
  getfile3:function(){
    var that= this
    this.setData({
      total3:this.data.total3+15,
      page3:this.data.page3+1
    })
    wx.request({
      url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
      method:'post',
      data: {
        'FileFrom': '3',
        'page':this.data.page3,
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
              readyload3:true
             })
        }
        res.data.rows.forEach((item,index)=>{
           if(
           item.FileExtension=='.png' || 
           item.FileExtension=='.jpg' || 
           item.FileExtension=='.jpeg'|| 
           item.FileExtension=='.jpe' ||
           item.FileExtension=='.gif'){
             this.data.images3.push(item)
             this.data.imglist3.push(item.FilePath)
             this.setData({
              havefile3:true
             })
           }else if(
             item.FileExtension == '.mp4' ||
             item.FileExtension == '.avi' ||
             item.FileExtension == '.rmvb'
           ){
            this.data.videos3.push(item)
            that.setData({
              havefile3:true
             })
            
           }else{
             this.data.others3.push(item)
             that.setData({
              havefile3:true
             })
             
           }
        })
        this.setData({
          imglist3:this.data.imglist3,
          images3:this.data.images3,
          videos3:this.data.videos3,
          others3:this.data.others3,
          showbottom:true
        })
      }
    })
  },
  playVideo3:function(e){
    this.setData({
      videourl3:this.data.videos3[e.currentTarget.id].FilePath,
      videotitle3:this.data.videos3[e.currentTarget.id].FileName,
      play:true
    })
    this.videoContext = wx.createVideoContext('videos', this);
    this.videoContext.requestFullScreen({ direction: 90 });
  },
  playVideo1:function(e){
    console.log(2231)
    this.setData({
      videourl1:this.data.videos1[e.currentTarget.id].FilePath,
      videotitle1:this.data.videos1[e.currentTarget.id].FileName,
      play:true
    })
    this.videoContext = wx.createVideoContext('videos', this);
    this.videoContext.requestFullScreen({ direction: 90 });
  },
  playVideo2:function(e){
    console.log(2231)
    this.setData({
      videourl2:this.data.videos2[e.currentTarget.id].FilePath,
      videotitle2:this.data.videos2[e.currentTarget.id].FileName,
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
  showImages3:function(e){
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: this.data.imglist3 // 需要预览的图片http链接列表
    })
  },
  showImages1:function(e){
    console.log(e.target.id,this.data.imglist1)
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: this.data.imglist1 // 需要预览的图片http链接列表
    })
  },
  showImages2:function(e){
    console.log(e.target.id,this.data.imglist2)
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: this.data.imglist2 // 需要预览的图片http链接列表
    })
  },
  supervisesuggestion(e){
    this.setData({
      supervisesuggestion:e.detail
    })
  },
  choose:function(){
    this.setData({
      show:true
    })
  },
  status:function(){
    this.setData({
      show1:true
    })
  },
  closeStatus:function(){
    this.setData({
      show1:false
    })
  },
  confirmStatus:function(e){
    this.setData({
      statusV:e.detail.value,
      statusType:e.detail.index,
      show1:false
    })
  },
  changeChoose:function(event){
      const { picker, value, index } = event.detail;
      picker.setColumnValues(1,value[0].children);
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
  
  confirmChoose:function(event){
    console.log(event.detail.value)
    if(event.detail.value[1].text=='暂无下级部门'){
      this.setData({
        department:event.detail.value[0].text,
        departmentID:event.detail.value[0].id,
        show:false,
      })
    }else{
      this.setData({
        department:event.detail.value[1].text,
        departmentID:event.detail.value[1].id,
        show:false,
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
      show:false
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
        active:4,
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
        active:4,
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
          "fileFrom": '3',//其他需要参数
        },
        complete(res){
          //console.log(res)
        },
        success(res) {
            //成功回调函数
            Notify({ type: 'success', message: '上传成功' });
            that.setData({
              page3:1,
              total3:15,
              images3:[],
              videos3:[],
              others3:[],
              imglist3:[]
            })
            wx.request({
              url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
              method:'post',
              data: {
                'FileFrom': '3',
                'page':that.data.page3,
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
                     that.data.images3.push(item)
                     that.data.imglist3.push(item.FilePath)
                     that.setData({
                      havefile3:true
                     })
                   }else if(
                     item.FileExtension == '.mp4' ||
                     item.FileExtension == '.avi' ||
                     item.FileExtension == '.rmvb'
                   ){
                    that.data.videos3.push(item)
                    that.setData({
                      havefile3:true
                     })
                    
                   }else{
                     that.data.others3.push(item)
                     that.setData({
                      havefile3:true
                     })
                     
                   }
                })
                that.setData({
                  imglist3:that.data.imglist3,
                  images3:that.data.images3,
                  videos3:that.data.videos3,
                  others3:that.data.others3
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
      this.setData({
        radio:event.detail,
        radio1:this.data.personList[event.detail].STAFF_NAME,
        radio2:this.data.personList[event.detail].STAFF_UserId,
      })
  },
  submit:function(){
    console.log(this.data.editData)
    var that = this
    Dialog.confirm({
      title: '审核案件',
      message: '是否审核案件',
    })
      .then(() => {
       // on confirm
        wx.request({
          url: 'http://118.24.196.69:20015/api/HTSC_Case/IsCheckCase', 
          method:'post',
          data: JSON.stringify({
            'inspectsuggestion':this.data.supervisesuggestion,
            'istype':0,
            'pid':that.data.editData.PID,
            }),
          async: true,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
           Notify({ type: 'success', message: '成功审核此案件！' });
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
          "fileFrom": '3',//其他需要参数
        },
        complete(res){
        },
        success(res) {
            //成功回调函数
            Notify({ type: 'success', message: '上传成功' });
            that.setData({
              page3:1,
              total3:15,
              images3:[],
              videos3:[],
              others3:[],
              imglist3:[]
            })
            wx.request({
              url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
              method:'post',
              data: {
                'FileFrom': '3',
                'page':that.data.page3,
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
                     that.data.images3.push(item)
                     that.data.imglist3.push(item.FilePath)
                     that.setData({
                      havefile3:true
                     })
                   }else if(
                     item.FileExtension == '.mp4' ||
                     item.FileExtension == '.avi' ||
                     item.FileExtension == '.rmvb'
                   ){
                    that.data.videos3.push(item)
                    that.setData({
                      havefile3:true
                     })
                    
                   }else{
                     that.data.others3.push(item)
                     that.setData({
                      havefile3:true
                     })
                   }
                })
                that.setData({
                  imglist3:that.data.imglist3,
                  images3:that.data.images3,
                  videos3:that.data.videos3,
                  others3:that.data.others3
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
                page3:1,
                total3:15,
                images3:[],
                videos3:[],
                others3:[]
              })
              wx.request({
                url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
                method:'post',
                data: {
                  'FileFrom': '3',
                  'page':that.data.page3,
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
                       that.data.images3.push(item)
                       that.data.imglist3.push(item.FilePath)
                       that.setData({
                        havefile3:true
                       })
                     }else if(
                       item.FileExtension == '.mp4' ||
                       item.FileExtension == '.avi' ||
                       item.FileExtension == '.rmvb'
                     ){
                      that.data.videos3.push(item)
                      that.setData({
                       havefile3:true
                      })
                     }else{
                       that.data.others3.push(item)
                       that.setData({
                         havefile3:true
                        })
                     }
                  })
                  that.setData({
                   imglist3:that.data.imglist3,
                    images3:that.data.images3,
                    videos3:that.data.videos3,
                    others3:that.data.others3
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
  console.log(this.data.editData)
  this.getfile()
  this.getfile1()
  this.getfile2()
  this.getfile3()
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
   
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
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
            others:this.data.others,
            page:this.data.page+1,
          })
        }
      })
    }
    if(this.data.active==2){
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
            page1:this.data.page1+1,
          })
        }
      })
    }
    if(this.data.active==3){
      wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
        method:'post',
        data: {
          
          'FileFrom': '4',
          'page':this.data.page2,
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
               this.data.images2.push(item)
               that.data.imglist2.push(item.FilePath)
               this.setData({
                havefile2:true
               })
             }else if(
               item.FileExtension == '.mp4' ||
               item.FileExtension == '.avi' ||
               item.FileExtension == '.rmvb'
             ){
              this.data.videos2.push(item)
              that.setData({
               havefile2:true
              })
              
             }else{
               this.data.others2.push(item)
               that.setData({
                 havefile2:true
                })
               
             }
          })
          this.setData({
            imglist2:that.data.imglist2,
            images2:this.data.images2,
            videos2:this.data.videos2,
            others2:this.data.others2,
            page2:this.data.page2+1,
          })
        }
      })
    }
    if(this.data.active==4){
      wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseListFile',
        method:'post',
        data: {
          
          'FileFrom': '3',
          'page':this.data.page3,
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
               this.data.images3.push(item)
               that.data.imglist3.push(item.FilePath)
               this.setData({
                havefile3:true
               })
             }else if(
               item.FileExtension == '.mp4' ||
               item.FileExtension == '.avi' ||
               item.FileExtension == '.rmvb'
             ){
              this.data.videos3.push(item)
              that.setData({
               havefile3:true
              })
              
             }else{
               this.data.others3.push(item)
               that.setData({
                 havefile3:true
                })
               
             }
          })
          this.setData({
            imglist3:that.data.imglist3,
            images3:this.data.images3,
            videos3:this.data.videos3,
            others3:this.data.others3,
            page3:this.data.page3+1,
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