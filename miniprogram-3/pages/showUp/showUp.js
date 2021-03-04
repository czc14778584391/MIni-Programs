// pages/showUp/showUp.js

var app=getApp();
const buttons = [{
 
  label: '添加上家',
  icon:"../../images/write2.png",
},

{
  label: '返回首页',
  icon: "../../images/icon_11.png"
},
]

Page({
  data: {
    slideButtons: [
      {
      type: 'warn',
      text: '删除',
      extClass: 'test',
    }],

    uplist:null,
    showTips:true,
    buttons,
    showAdd:true,
    showUpDetail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      uplist: app.globalData.upList
    })
    if(this.data.uplist.length==0){
      this.setData({
        showTips:false
      })
    }
  },
  hideDetail(){
    this.setData({
      showAdd:true
    })
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index == 1) {
      wx.redirectTo({
        url: '../mine/mine',
      })
    }
    if (e.detail.index == 0) {
      wx.redirectTo({
        url: '../myUp/myUp',
      })
    }
    this.setData({
      showAdd: true,
    })
  },
  onContact(e) {
    console.log('onContact', e)
  },
  onGotUserInfo(e) {
    console.log('onGotUserInfo', e)
  },

  onChange(e) {
    console.log('onChange', e)
  },

  slideButtonTap(e) {
    var that = this;
    console.log('slide button tap', e)
    if(e.detail.index=1){
      wx.showModal({
        content: '确认删除？',
        confirmText: "确认",
        cancelText: "取消删除",
        success: function (res){
          if (res.confirm) {
            var list2 = that.data.uplist;
            that.data.uplist.splice(e.currentTarget.dataset.id, 1);
            that.setData({
              uplist: list2
            })
            app.globalData.upList = list2;
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            })

            if (that.data.uplist.length == 0) {
              that.setData({
                showTips: false
              })
            }
          }else{
            wx.showToast({
              title: '取消操作',
              icon: 'success',
              duration: 1000,
            })
          }
        }
      })
    }
  },
 
  addup(){
    wx.navigateTo({
      url: '../myUp/myUp',
    })
  },

  more(e){
    console.log(e.currentTarget.dataset.id);
    var index = e.currentTarget.dataset.id;
    this.setData({
      showAdd:false,
      showUpDetail:this.data.uplist[index]
    })
  } 
})