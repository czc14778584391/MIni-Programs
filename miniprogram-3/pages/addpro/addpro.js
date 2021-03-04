// pages/addpro/addpro.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    categoryArray:['手链','项链','手镯','戒指','耳钉','其他'],
    categoryIndex:0,
    index:0,
    showTopTips: false,
     proList: [],
    upList: ['小詹姐', '李姐']
    
  },

 
  onLoad: function (options) {

  
    this.setData({
      proList: app.globalData.proList
    })
    
    var uplist2 = [];
    if (app.globalData.upList.length != 0) {
      for (let i = 0; i < app.globalData.upList.length; i++) {
        uplist2.push(app.globalData.upList[i].inputname);
      }
      console.log(uplist2);
       this.setData({
         upList: uplist2
    })
    }

  },

  backToList() {
    wx.navigateBack({
      data: "1"
    })
    },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  

  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      categoryIndex: e.detail.value
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var reg = /^\d+(\.\d+)?$/;
    if (e.detail.value.inputname != "" && reg.test(e.detail.value.reallyPrice) && reg.test(e.detail.value.inputPrice)) {
      
      for (let i = 0; i < this.data.proList.length; i++) {
        var isSame = false;
        if (e.detail.value.inputname == this.data.proList[i].inputname && e.detail.value.up == this.data.proList[i].up) {
          isSame=true
        }
      }
      if(isSame){
        this.setData({
          msg: "已存在相同的商品信息，请重新输入！",
          showTopTips: true,
        })
      }else{

        var list= this.data.proList;
        list.push(e.detail.value);
        this.setData({
          proList: list
        })
        console.log(this.data.proList);

      
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })

        app.globalData.proList = this.data.proList;
        console.log(app.globalData.proList);
        wx.redirectTo({
          url:'../showProList/showProList'
        })
      }

    } else {
      this.setData({
        msg: "请正确输入商品信息",
        showTopTips: true,
      })
    }
  }
 
})