var app = getApp();
const buttons = [{

  label: '添加商品',
  icon: "../../images/write2.png",
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
    categoryArray: ['手链', '项链', '手镯', '戒指', '耳钉', '其他'],
    prolist: null,
    showTips: true,
    buttons,
    showAdd: true,
    showProDetail: '',
    upList: ['小詹姐', '李姐']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      prolist: app.globalData.proList
    })
    if (this.data.prolist.length == 0) {
      this.setData({
        showTips: false
      })
    }

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
  hideDetail() {
    this.setData({
      showAdd: true
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
        url: '../addpro/addpro',
      })
    }
    this.setData({
      showAdd: true,
    })
  },
  

  slideButtonTap(e) {
    var that = this;
    console.log('slide button tap', e)
    if (e.detail.index = 1) {
      wx.showModal({
        content: '确认删除？',
        confirmText: "确认",
        cancelText: "取消删除",
        success: function (res) {
          if (res.confirm) {
            var list2 = that.data.prolist;
            that.data.prolist.splice(e.currentTarget.dataset.id, 1);
            that.setData({
              prolist: list2
            })
            app.globalData.proList = list2;
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            })

            if (that.data.prolist.length == 0) {
              that.setData({
                showTips: false
              })
            }
          } else {
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


  more(e) {
    console.log(e.currentTarget.dataset.id);
    var index = e.currentTarget.dataset.id;
    this.setData({
      showAdd: false,
      showProDetail: this.data.prolist[index]
    })
  }
})
