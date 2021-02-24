// pages/ProblemReportEdit/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
    /**
     * 页面的初始数据
     */
    data: {
          name:'',
          title:'',
          desc:'',
          activeNames: ['0'],
          site:'',
          case:'',
          color:["","#04d126","#db0034","#cabb04"],
          Frequency:["","一般","紧急","暂缓"],
          type:["","部件","事件"],
          caseData:'',
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
          Reason:'',
          userid:'',
          Reason:'',
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
    Change(event) {
        this.setData({
          activeNames: event.detail,
        });
      },
      Reason:function(v){
          console.log(v.detail)
          this.setData({
            Reason:v.detail
          })
      },
      //绑定滑动选择窗口事件
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
    close2:function(){
        this.setData({
          show2:false
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
      Dialog.confirm({
        title: '受理上报问题',
        message: '是否受理上报问题',
      })
        .then(() => {
          // on confirm
          wx.request({
            url: 'http://118.24.196.69:20015/api/HTSC_Case/IsAcceptance', 
            method:'post',
            data: JSON.stringify({
             ' casereason':'',
              'userid': "8001", 
              'pid':that.data.caseData.PID,
              'istype': 1
              }),
            async: true,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success :(res)=> {
             Notify({ type: 'success', message: '成功受理上报问题！' });
              setTimeout(()=>{
                  wx.navigateBack({
                    delta: 1,
                  })
              },1000)
            }
          })
        })
        .catch(() => {
        });
    },
    submit1:function(){
        var that = this
        Dialog.confirm({
            title: '不受理上报问题',
            message: '是否不受理上报问题',
          })
            .then(() => {
              wx.request({
                url: 'http://118.24.196.69:20015/api/HTSC_Case/IsAcceptance', 
                method:'post',
                data: JSON.stringify({
                 ' casereason':that.data.Reason,
                  'userid': "8001", 
                  'pid':that.data.caseData.PID,
                  'istype': 2
                  }),
                async: true,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success :(res)=> {
                 Notify({ type: 'success', message: '成功不受理上报问题！' });
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
      //绑定确认事件
    confirm2:function(event){
      const { picker, value, index } = event.detail;
      this.setData({
        degree:event.detail.value,
        degreecode:event.detail.index+1,
        show2:false
      })
    },
    toest:function(){
        if(this.data.Reason == ''){
        Toast('请先填写不受理原因');
    }
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
    //绑定地图选点事件
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
        var case1 = JSON.parse(options.editData)
        this.setData({
          caseData:case1,
         })
         console.log(this.data.caseData)
      var that = this
      wx.request({
          url: 'http://118.24.196.69:20015/api/HTSC_Case/ComboxtreeDate', 
          method:'post',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
              console.log(res.data)
                that.setData({
                  _event:res.data,
                })
                //把返回数据转成选择器格式
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})