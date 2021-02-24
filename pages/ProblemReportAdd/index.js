// pages/ProblemReportEdit/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'


Page({

    /**
     * 页面的初始数据
     */
    data: {
          name:'',
          title:'',
          desc:'',
          site:'',
          case:'',
          show:false,
          show1:false,
          show2:false,
          degree:'',
          degreecode:'',
          index: 0,
          multiArray: [],
          _event:[],
          columns: [],
          main:'',
          userid:'',
          sub:'',
          subn:'',
          mainn:'',
          latitude:'',
          type:'',
          ce_type:'',
          leve:'',
          levecode:'',
          longitude:'',
          disabled:false,
          columns1: ['日常', '偶尔', '突发'],
          columns2: ['一般', '紧急', '暂缓'],
    },
    bindMultiPickerChange: function (e) {
    },
    close2:function(){
      this.setData({
        show2:false
      })
    },
    Change(event) {
      this.setData({
        activeNames: event.detail,
      });
    },
    onChange:function(event) {
        const { picker, value, index } = event.detail;
        
        if (event.detail.index === 0) {
          picker.setColumnValues(1, value[0].children);
          picker.setColumnValues(2, value[0].children[0].children);
          this.setData({
            
            sub:value[2].attributes.ce_sub_code,
            subn:value[2].attributes.ce_sub_name,
            main:value[2].attributes.ce_main_code,
            mainn:value[2].attributes.ce_main_name,
            ce_type:value[2].attributes.ce_type,
            })
    //这个setData的是滑动第一级时触发，这改变了第一级的数值，并不会改变后面的数值，setDate//每一层在setData是有必要的，不然名称和id可能传的并非想要选中的，可以实时console.log(event)查看里面的值对应上
        } else if (event.detail.index === 1) {
          picker.setColumnValues(2, value[1].children);
          this.setData({
           
            sub:value[2].attributes.ce_sub_code,
            subn:value[2].attributes.ce_sub_name,
            main:value[2].attributes.ce_main_code,
            mainn:value[2].attributes.ce_main_name,
            ce_type:value[2].attributes.ce_type,
            })
        } else if (event.detail.index == 2) {
            picker.setColumnValues(2, value[1].children)

          this.setData({
            sub:value[2].attributes.ce_sub_code,
            subn:value[2].attributes.ce_sub_name,
            main:value[2].attributes.ce_main_code,
            mainn:value[2].attributes.ce_main_name,
            ce_type:value[2].attributes.ce_type,
            })
        }
        console.log(event.detail,value)
      },
    show:function(){
          this.setData({
              show:true
          })
    },
    title:function(value){
         this.setData({
           title:value.detail
         })
    },
    desc:function(value){
      this.setData({
        desc:value.detail
      })
    },
    case:function(value){
     this.setData({
       case:value.detail
     })
    },
    site:function(value){
     this.setData({
       site:value.detail
     })
    },
    submit:function(){
      var that = this
      var verify = true;
      if (that.data.title == ""){ verify = false;  Notify({ type: 'danger', message: '请输入问题标题!' });        }
      if (that.data.desc == "") { verify = false;  Notify({ type: 'danger', message: '请输入问题描述！' });       }
      if (that.data.leve == "") { verify = false;  Notify({ type: 'danger', message: '请选择问题等级！' });       }
      if (that.data.degree == ""){ verify = false; Notify({ type: 'danger', message: '请选择紧急程度！' });       }
      if (that.data.case == "") { verify = false;  Notify({ type: 'danger', message: '请输入立案条件！' });       }
      if (that.data.site == "") { verify = false;  Notify({ type: 'danger', message: '请输入事发地点！' });       }
      if (that.data.name == "") { verify = false;  Notify({ type: 'danger', message: '请在地图中选择一个部件'});   }
      console.log(verify)
      if(verify){
      wx.request({
          url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseAdd', 
          method:'post',
          data: JSON.stringify({
            CASE_TITLE:that.data.title,
            REPORT_DETAIL:that.data.desc,
            Case_Frequency:that.data.levecode,
            Case_Urgent:that.data.degreecode,
            CE_CASE_ON_NORM:that.data.case,
            Report_ADDR:that.data.site,
            Case_Lng:that.data.longitude,
            Case_Lat:that.data.latitude,
            userid: "8001", 
            CE_MAIN_CODE:that.data.main,
            CE_MAIN_NAME:that.data.mainn,
            CE_SUB_CODE: that.data.sub,
            CE_SUB_NAME: that.data.subn}),
          async: true,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
           Notify({ type: 'success', message: '成功上报！' });
            setTimeout(()=>{
                wx.navigateBack({
                  delta: 1,
                })
            },1000)
          }
        })
      }
    },
    confirm2:function(event){
      const { picker, value, index } = event.detail;
      this.setData({
        degree:event.detail.value,
        degreecode:event.detail.index+1,
        show2:false
      })
    },
    show2:function(){
      this.setData({
        show2:true
      })
    },
    confirm1:function(event){
      const { picker, value, index } = event.detail;
      this.setData({
        leve:event.detail.value,
        levecode:event.detail.index+1,
        show1:false
      })
    },
    show1:function(){
      this.setData({
        show1:true
      })
    },
    map:function(event){
      const { picker, value, index } = event.detail;
      this.setData({
        show:false,
        name:event.detail.value[2].text,
        ce_type:event.detail.value[2].attributes.ce_type,
        main:event.detail.value[2].attributes.ce_main_code,
        sub:event.detail.value[2].attributes.ce_sub_code,
        subn:event.detail.value[2].attributes.ce_sub_name,
        mainn:event.detail.value[2].attributes.ce_main_name
      })
      wx.navigateTo({
        url: '/pages/ProblemReportMap/index?sub=' + this.data.sub + '&main=' +this.data.main
      })
      console.log(event.detail.value)
      
      
    },
    close:function(){
        this.setData({
            show:false
        })
    },
    close1:function(){
      this.setData({
          show1:false
      })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      wx.request({
          url: 'http://118.24.196.69:20015/api/HTSC_Case/ComboxtreeDate', 
          method:'post',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
             
                that.setData({
                  _event:res.data,
                })
                that.setData({
                  columns: [
                      {
                          values: that.data._event,
                          className: 'column1'
                        },
                        {
                          values: that.data._event[0].children,
                          className: 'column2',
                          defaultIndex: 0
                        },
                        {
                          values: that.data._event[0].children[0].children,
                          className: 'column3',
                          defaultIndex: 0
                        }
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
      console.log(this.data.latitude,this.data.longitude)
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