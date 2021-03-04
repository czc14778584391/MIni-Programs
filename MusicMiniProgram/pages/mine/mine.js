import url from "../../utils/util.js"
Page({

  data: {
    songArr:null,
    isplay:false,
    id:null,
    banner:{},
    recommedList:null
  },


//获取封面
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: "http://localhost:3000/banner/banner?type=2",
      success: function (res) {
         that.setData({
           banner:res.data.banners
         }) 
      }
    }),

  wx.request({
      url: url.baseUrl+ '/personalized?limit=30',
      success: function (res) {
        that.setData({
          recommedList:res.data.result
        })
      }
      })
  },

  //获取推荐歌单
 
//跳转到播放页面
  tosong(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../index/index?key=' + id  ,
    })
  },

  //跳转到搜索页面
  tosearch(e){
   wx.navigateTo({
     url: '../search/search',
   })
  },

  toList(e){
    var id=e.currentTarget.dataset.id;
    var name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../list/list?id='+id+'&status=0&name='+name,
    })
  }
})