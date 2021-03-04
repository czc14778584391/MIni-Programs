const app = getApp()
var util=require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取用户信息
    scrollTop: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: false,
    showAdd:true,
    topHide:false,
    creating:false,

    multiArray: [['小詹姐', '李姐'], ['独角兽手链', '独角兽项链', '人鱼手镯', '鱼骨头项链', '月光石手链',], ['默认', '要礼盒', '要礼袋', '礼袋+礼盒']],

    multiArray1: [['小詹姐', '李姐'], ['独角兽手链', '独角兽项链', '人鱼手镯', '鱼骨头项链', '月光石手链'], ['默认', '要礼盒', '要礼袋', '礼袋+礼盒']],
    proArry: [['独角兽手链', '独角兽项链', '人鱼手镯', '鱼骨头项链', '月光石手链'], ['月光石名牌手链', '绿幽灵草莓晶手链', '草莓晶星月手链']],

    multiIndex: [0, 0, 0],   
    startY:0,
    list:[],
    proNum2:'',
    realPrice2: ' ',
    curIpt1:'',
    curIpt2: '',
    profit:0,
    expenditur:0,
    date: '',
    number:0,

     uplist: ['小詹姐', '李姐'],
     prolist:[],

    right: [
    {
      text: 'Delete',
      style: 'background-color: #F4333C; color: white',
    }],

    into:false
  },

  onLoad: function () {

    var that = this;

    // wx.getStorage({
    //   key: 'proList',
    //   success: function(res) {
    //       app.globalData.proList=res
    //   },
    // })


    wx.getStorage({
      key: 'usersList',
      success: function (res) {
        if (res.data) {
          var number2 = 0;
          var sumMoney = 0;
          var sumInprice = 0;
          for (let i = 0; i < res.data.length; i++) {
            if (that.data.date == res.data[i].date) {
              number2++;
              sumMoney += res.data[i].sum;
              sumInprice += res.data[i].inPrice;
            }
          }
          console.log(res.data);
          that.setData({
            number: number2,
            profit: sumMoney,
            expenditur: sumInprice,
            list: res.data
          })
        }
      }
    })
    
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    
   var uplist2=[];
    if (app.globalData.upList.length != 0) {
    for (let i = 0; i < app.globalData.upList.length;i++){
      
      uplist2.push(app.globalData.upList[i].inputname);
    }
   console.log(uplist2);
      this.data.multiArray.splice(0, 1, uplist2);
      console.log(this.data.multiArray);
     this.setData({
       multiArray: this.data.multiArray
     })
     }else{
      this.setData({
        multiArray: this.data.multiArray1
      })
     }

    var prolist2 = [];
    var proArry2=this.data.proArry;
    if (app.globalData.proList.length != 0) {
     
           for(let j=0; j<app.globalData.upList.length;j++){
                for (let i = 0; i < app.globalData.proList.length; i++) {
                  if (app.globalData.proList[i].up==j){
                    proArry2[j].push(app.globalData.proList[i].inputname);
                }
             }
           }
    
          this.setData({
            proArry:proArry2
          })

    }

   
  },


  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })

  },
  bindMultiPickerColumnChange: function (e) {
   
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
   
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = this.data.proArry[0];
            break;
          case 1:
            data.multiArray[1] = this.data.proArry[1];
        break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
        data.multiIndex[2] = 0;
    }
    // console.log(data.multiIndex);
    this.setData(data);
  },

  selectNum(e){
     this.setData({
       proNum2:e.detail.value
     })
  },

  selectPrice(e){
    this.setData({
      realPrice2:e.detail.value
    })
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 3) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  
  onChange1(e) {
   if(e.detail.value){
     this.setData({
       showAdd: false,
       creating: false,
     })
   }else{
       this.setData({
         showAdd: true
       })
   }
  },
//日期选择
  bindDateChange: function (e) {
    var that=this;
    this.setData({
      date: e.detail.value,
    })
    var number2 = 0;
    var sumMoney = 0;
    var sumInprice = 0;
    for (let i = 0; i < that.data.list.length; i++) {
      if (that.data.date == that.data.list[i].date) {
        number2++;
        sumMoney += that.data.list[i].sum;
        sumInprice += that.data.list[i].inPrice;
      }
    }
    that.setData({
      number: number2,
      profit: sumMoney,
      expenditur: sumInprice
    })
    console.log(that.data.expenditur);
    console.log(e.detail.value);
  },
  //添加数据
  bindSubmit(){
    var that=this;
    var reg1 = /^[1-9]\d*$|^0$/; 
    var  reg = /^\d+(\.\d+)?$/;
     let proNum = this.data.proNum2, realproprice = this.data.realPrice2, newLists = this.data.list,i=newLists.length,date2=this.data.date;

    var sum = 0;

 
    if (reg1.test(proNum) & reg.test(realproprice) & proNum!=0){

//-------------------------------------------------------------------------------------
      
            var inPrice = 0;
            for (let j = 0; j < app.globalData.proList.length; j++) {
              if (this.data.multiIndex[0] == app.globalData.proList[j].up && this.data.proArry[this.data.multiIndex[0]][this.data.multiIndex[1]] == app.globalData.proList[j].inputname) {
                inPrice = app.globalData.proList[j].inputPrice;
              }
              console.log(inPrice);
            }

            let transPrice = 0, boxPay = 0, pagPay = 0;
            for (let k = 0; k < app.globalData.upList.length; k++) {
             
              if (this.data.multiArray[0][this.data.multiIndex[0]] == app.globalData.upList[k].inputname) {
                transPrice = app.globalData.upList[k].inputTransPay;
                boxPay = app.globalData.upList[k].boxPay;
                pagPay = app.globalData.upList[k].pagPay;
              }
              console.log(transPrice, boxPay, pagPay);
            }

      switch (this.data.multiIndex[2]) {
        case 0:
          sum = (realproprice - inPrice - transPrice) * proNum;
          break;
            case 1:
          sum = (realproprice - inPrice - transPrice - boxPay) * proNum;
              break;
            case 2:
          sum = (realproprice - inPrice - transPrice - pagPay) * proNum;
              break;
        case 3:
          sum = (realproprice - inPrice - transPrice - pagPay - boxPay) * proNum;
          break;
          
      }
  
          console.log(sum);
      inPrice = inPrice * proNum;
      
//-----------------------------------------------------------------------------------------
      newLists.push({ id: i, name: this.data.multiIndex[0], proName: this.data.multiIndex[1], isGbox: this.data.multiIndex[2], proNum: proNum, realPrice: realproprice, date: date2, sum: sum, inPrice: inPrice});
      this.setData({
        list: newLists,
        into:true
      }) 
     
     
      wx.setStorage({
        key: 'usersList',
        data: newLists
      })
    
      wx.showToast({
        title: '添加成功',
        icon:'none',
        duration:1500
      })
      console.log(that.data.list);
      var number2=0;
      var sumMoney=0;
      var sumInprice=0;
      for (let i=0; i < that.data.list.length; i++) {
        if (that.data.date == that.data.list[i].date) {
          number2++;
          sumMoney+=that.data.list[i].sum;
          sumInprice += that.data.list[i].inPrice;
        }
      }
      that.setData({
        number:number2,
        profit:sumMoney,
        expenditur:sumInprice
      })
    }else{
      wx.showToast({
        title: '请输入正确的数量和价格',
        icon: 'none',
        duration: 1000
      })
    }
  },

  func: function () {
    if (this.data.flag) {
      this.setData({
        flag: false
      })
    } else {
      this.setData({
        flag: true
      })
    }
  },


 
  openConfirm: function (e) {
   
    var index = e.detail.data;
    var that=this;
    wx.showModal({
      
      content: '确认删除？',
      confirmText: "确认",
      cancelText: "取消删除",
      success: function (res) {
       
        if (res.confirm) {
          var list2 = that.data.list;
          that.data.list.splice(index, 1);
          that.setData({
            list: list2
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          })

          var number2 = 0;
          var sumMoney = 0;
          var sumInprice = 0;
          for (let i = 0; i < that.data.list.length; i++) {
            if (that.data.date == that.data.list[i].date) {
              number2++;
              sumMoney += that.data.list[i].sum;
              sumInprice += that.data.list[i].inPrice;
            }
          }
          that.setData({
            number: number2,
            profit: sumMoney,
            expenditur: sumInprice
          })
        } else {
         
          wx.showToast({
            title: '取消操作',
            icon: 'success',
            duration: 1000,
          })
        }
      }
    });
  },
  onChange(e) {
    this.setData({
      proNum2: e.detail.value,
    })
  },

  turnBack(){
    if(this.data.flag){
      this.setData({
        flag:false
      })
    }
  },

 
showAdd(){
  this.setData({
    showAdd: false,
    creating: false,
  })
},

})
