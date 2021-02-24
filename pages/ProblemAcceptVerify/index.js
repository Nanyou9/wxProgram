// pages/ProblemReportEdit/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {
          radio: 'a',
          radio1: '1',
          name:'',
          title:'',
          page:1,
          rows:15,
          desc:'',
          casecheckerno:'',
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
          person:'',
          mainn:'',
          latitude:'',
          personData:[],
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
    Change(event) {
        this.setData({
          activeNames: event.detail,
        });
      },
      noperson(event) {
        if(this.data.radio1==1){
          this.setData({
            radio1:event.currentTarget.dataset.name,
            radio:'a',
            person:'',
            casecheckerno:''
          })
        }else{
            this.setData({
                radio1:1
            })
        }
      },
      Reason:function(v){
          console.log(v.detail)
          this.setData({
            Reason:v.detail
          })
      },
      choose(event) {
          if(this.data.radio1 =='a'){
              this.setData({
                  radio:'a',
              })
              Toast('请先取消勾选"不选择核查员"')
          }else{
             this.setData({
               radio: event.detail,
               person:this.data.caseData.PID,
               casecheckerno:this.data.personData[event.detail].STAFF_UserId,
               radio1: 1
          });
        }
       
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
        title: '核实问题上报',
        message: '是否指派核实问题上报',
      })
        .then(() => {
          // on confirm
          wx.request({
            url: 'http://118.24.196.69:20015/api/HTSC_Case/IsAssign', 
            method:'post',
            data: JSON.stringify({
              'userid': "8001", 
              'casecheckerno':that.data.casecheckerno,
              'pid':that.data.person,
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
            title: '不指派核实问题上报',
            message: '是否不指派核实问题上报',
          })
            .then(() => {
              // on confirm
              wx.request({
                url: 'http://118.24.196.69:20015/api/HTSC_Case/IsAssignNo', 
                method:'post',
                data: JSON.stringify({
                  'pid':that.data.caseData.PID,
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
    confirm2:function(event){
      const { picker, value, index } = event.detail;
      this.setData({
        degree:event.detail.value,
        degreecode:event.detail.index+1,
        show2:false
      })
    },
    toest:function(){
        if(this.data.person == ''){
        Toast('请先选择核查员');
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
        var case1 = JSON.parse(options.editData)
        this.setData({
          caseData:case1,
         })
         console.log(this.data.caseData)
      var that = this
      wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Personne/GetPagePersonneList', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            "page":this.data.page,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          this.setData({
              personData:res.data.rows,
          })
        }
      })
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