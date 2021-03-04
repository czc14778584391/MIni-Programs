// pages/search/search.js
import url from "../../utils/util.js"

Page({
  data: {
   arr:null,
   val:null
  },

  onLoad: function (options) {

  },

  //获取输入数据
  inputRes(e) {
    this.setData({
      val: e.detail.value
    })
  },

  //查找歌曲
  search() {
    var that = this;
    wx.request({
      url: url.song + '?keywords=' + that.data.val,
      success: function (res) {
        that.setData({
          arr: res.data.result.songs,
        })
      }
    })
  },

  //跳转到播放页面
  tosong(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../index/index?key=' + id,
    })
  },


})