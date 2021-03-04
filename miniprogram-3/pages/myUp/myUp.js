// pages/myUp/myUp.js
var app=getApp();
Page({

  
  data: {
    showTopTips:false,
    msg:"陈丽敏",
    isPass:true,
    upList:[]
  },

  
  onLoad: function (options) {
      this.setData({
        upList: app.globalData.upList
      })
  },
  backToList(){
    wx.navigateBack({
      data:"1"
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var reg = /^\d+(\.\d+)?$/;
   
    if (e.detail.value.inputname != "" && e.detail.value.inputTransPay != "" && reg.test(e.detail.value.inputTransPay) ){
   
      this.setData({
        isPass: true
      })

      if (e.detail.value.pagPay != "" ){
        if ( !reg.test(e.detail.value.pagPay)) {
          this.setData({
            msg: "请正确输入礼袋费",
            showTopTips: true,
            isPass: false
          }) 
        }
      }
        if (e.detail.value.boxPay != "") {
          if (!reg.test(e.detail.value.boxPay)) {
            this.setData({
              msg: "请正确输入礼盒费",
              showTopTips: true,
              isPass: false
            }) 
          }
      }

    
    }else{
      this.setData({
      msg:"请正确输入必填项",
     showTopTips:true,
      isPass: false
      }) 
    }

    if (this.data.isPass){
     var isSame=false;
      for (let i = 0; i < this.data.upList.length;i++){
        if (e.detail.value.inputname == this.data.upList[i].inputname){
           isSame=true;
        }
     }

     if(!isSame){
       var list = this.data.upList;
       list.push(e.detail.value);
       this.setData({
         upList: list
       })
       wx.showToast({
         title: '添加成功',
         icon: 'success',
         duration: 2000
       })
       
       app.globalData.upList = this.data.upList;
       console.log(app.globalData.upList);
       wx.navigateTo({
         url: '../showUp/showUp',
       })
     }else{
       this.setData({
         msg: "该上家已经存在请重新输入",
         showTopTips: true,
     })
      }
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
})