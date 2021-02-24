// pages/ProblemReport/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({
    data: {
      userData:[],
      rows:15,
      page:2,
      if:true,
      refresh:"正在刷新",
      bottom:true,
      status:'',
      color:'',
      value:'',
      editData:[]
    },
    onChange:function(e){
            this.setData({
              value:e.detail
            })
    },
    
    onSearch:function(){
      wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseList', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            "page":1,
            "CASE_TITLE":this.data.value
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
            res.data.rows.forEach(item=>{
            if(item.Status == 1){
            item.Status = '问题上报'
            item.color = '#04d126'
            }else if(item.Status == 2){
            item.Status = '问题受理'
            item.color = '#04d126'
            }else if(item.Status == 3){
            item.Status = '问题核实'
            item.color = '#04d126'
            }else if(item.Status == 4){
            item.Status = '问题立案'
            item.color = '#04d126'
            }else if(item.Status == 5){
            item.Status = '问题派遣'
            item.color = '#04d126'
            }else if(item.Status == 6){
            item.Status = '督察员督查'
            item.color = '#04d126'
            }else if(item.Status == 7){
            item.Status = '案件处理中'
            item.color = '#04d126'
            }else if(item.Status == 8){
            item.Status = '案件处理完成'
            item.color = '#04d126'
            }else if(item.Status == 9){
            item.Status = '指派核查员'
            item.color = '#04d126'
            }else if(item.Status == 10){
            item.Status = '核查通过'
            item.color = '#04d126'
            }else if(item.Status == 11){
            item.Status = '结案'
            item.color = '#04d126'
            }else if(item.Status == 12){
            item.Status = '已指派核实'
            item.color = '#04d126'
            }else if(item.Status == 13){
            item.Status = '无需核实'
            item.color = '#04d126'
            }else if(item.Status == 100){
            item.Status = '受理员不受理'
            item.color = '#db0034'
            }else if(item.Status == 101){
            item.Status = '核查员核实有误'
            item.color = '#db0034'
            }else if(item.Status == 102){
            item.Status = '立案退回'
            item.color = '#db0034'
            }else if(item.Status == 103){
            item.Status = '立案不受理'
            item.color = '#db0034'
            }else if(item.Status == 104){
            item.Status = '立案不通过'
            item.color = '#db0034'
            }else{
            item.Status = '未经处理的状态'
            item.color = '#db0034'
            }
            })
          this.setData({
              userData:res.data.rows,
              bottom:false,
              if:true,
          })
        }
      })
    },
    add:function(){
          wx.navigateTo({
            url: '/pages/ProblemReportAdd/index'
          })
         
    },
    edit:function(e){
      var pid = new Array();
      pid.push(e.currentTarget.id);
      console.log(this.data.userData[e.currentTarget.id])
      this.setData({
        editData:this.data.userData[e.currentTarget.id]
      })
      var edit = JSON.stringify(this.data.editData)
      wx.navigateTo({                   
        url: '/pages/ProblemReportEdit/index?editData=' + edit
      })
    },
    delate: function (e){
      Dialog.confirm({
        title: '删除案件',
        message: '是否删除此案件',
      })
        .then(() => {
          var pid = new Array();
      pid.push(e.currentTarget.id);
        var jsonParam = JSON.stringify(pid);
        console.log(e)
      wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/CaseDelet', //仅为示例，并非真实的接口地址
        method:'post',
        data: 
           jsonParam
        ,
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        success :(res)=> {
          console.log(res.data,jsonParam)
          if(res.data.Status==true){
            wx.showToast({
              title: '成功',
              icon: 'succes',
              duration: 1000,
              mask:true
          })
          this.frushData()
          }
        }
      })
        })
        .catch(() => {
          // on cancel
        });
      
    },
    frushData: function () {
        wx.request({
            url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseList', //仅为示例，并非真实的接口地址
            method:'post',
            data: {
                "rows":this.data.rows,
                "page":1
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success :(res)=> {
              this.setData({
                bottom:false
              })
              res.data.rows.forEach(item=>{
                if(item.Status == 1){
                item.Status = '问题上报'
                item.color = '#04d126'
                }else if(item.Status == 2){
                item.Status = '问题受理'
                item.color = '#04d126'
                }else if(item.Status == 3){
                item.Status = '问题核实'
                item.color = '#04d126'
                }else if(item.Status == 4){
                item.Status = '问题立案'
                item.color = '#04d126'
                }else if(item.Status == 5){
                item.Status = '问题派遣'
                item.color = '#04d126'
                }else if(item.Status == 6){
                item.Status = '督察员督查'
                item.color = '#04d126'
                }else if(item.Status == 7){
                item.Status = '案件处理中'
                item.color = '#04d126'
                }else if(item.Status == 8){
                item.Status = '案件处理完成'
                item.color = '#04d126'
                }else if(item.Status == 9){
                item.Status = '指派核查员'
                item.color = '#04d126'
                }else if(item.Status == 10){
                item.Status = '核查通过'
                item.color = '#04d126'
                }else if(item.Status == 11){
                item.Status = '结案'
                item.color = '#04d126'
                }else if(item.Status == 12){
                item.Status = '已指派核实'
                item.color = '#04d126'
                }else if(item.Status == 13){
                item.Status = '无需核实'
                item.color = '#04d126'
                }else if(item.Status == 100){
                item.Status = '受理员不受理'
                item.color = '#db0034'
                }else if(item.Status == 101){
                item.Status = '核查员核实有误'
                item.color = '#db0034'
                }else if(item.Status == 102){
                item.Status = '立案退回'
                item.color = '#db0034'
                }else if(item.Status == 103){
                item.Status = '立案不受理'
                item.color = '#db0034'
                }else if(item.Status == 104){
                item.Status = '立案不通过'
                item.color = '#db0034'
                }else{
                item.Status = '未经处理的状态'
                item.color = '#db0034'
                }
                })
              this.setData({
                  userData:res.data.rows,
              })
                                
            }
          })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.frushData()
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
      this.frushData()
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
      wx.showNavigationBarLoading()
     
        this.frushData()
        setTimeout(()=>{
            this.setData({
                if:false,
                page:2,
                refresh:"刷新成功",})
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh();
        },2000)
        this.setData({
            bottom:true
        })
       

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
       wx.request({
        url: 'http://118.24.196.69:20015/api/HTSC_Case/GetPageReportCaseList', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            "page":this.data.page
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          
          if(res.data.rows!=[]){
            res.data.rows.forEach(item=>{
              if(item.Status == 1){
              item.Status = '问题上报'
              item.color = '#04d126'
              }else if(item.Status == 2){
              item.Status = '问题受理'
              item.color = '#04d126'
              }else if(item.Status == 3){
              item.Status = '问题核实'
              item.color = '#04d126'
              }else if(item.Status == 4){
              item.Status = '问题立案'
              item.color = '#04d126'
              }else if(item.Status == 5){
              item.Status = '问题派遣'
              item.color = '#04d126'
              }else if(item.Status == 6){
              item.Status = '督察员督查'
              item.color = '#04d126'
              }else if(item.Status == 7){
              item.Status = '案件处理中'
              item.color = '#04d126'
              }else if(item.Status == 8){
              item.Status = '案件处理完成'
              item.color = '#04d126'
              }else if(item.Status == 9){
              item.Status = '指派核查员'
              item.color = '#04d126'
              }else if(item.Status == 10){
              item.Status = '核查通过'
              item.color = '#04d126'
              }else if(item.Status == 11){
              item.Status = '结案'
              item.color = '#04d126'
              }else if(item.Status == 12){
              item.Status = '已指派核实'
              item.color = '#04d126'
              }else if(item.Status == 13){
              item.Status = '无需核实'
              item.color = '#04d126'
              }else if(item.Status == 100){
              item.Status = '受理员不受理'
              item.color = '#db0034'
              }else if(item.Status == 101){
              item.Status = '核查员核实有误'
              item.color = '#db0034'
              }else if(item.Status == 102){
              item.Status = '立案退回'
              item.color = '#db0034'
              }else if(item.Status == 103){
              item.Status = '立案不受理'
              item.color = '#db0034'
              }else if(item.Status == 104){
              item.Status = '立案不通过'
              item.color = '#db0034'
              }else{
              item.Status = '未经处理的状态'
              item.color = '#db0034'
              }
              })
              
            this.setData({
                userData:this.data.userData.concat(res.data.rows),
                page:this.data.page+1
            })
          }else{
                
          }
        }
        
      })
      setTimeout(()=>{
        this.setData({
            bottom:false,
            if:true,
        })
      },2000)
      
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})