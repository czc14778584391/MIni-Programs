// pages/list/list.js
import url from "../../utils/util.js";
Page({

  data: {
   list:[]
  },

  onLoad: function (options) {
      var that=this;
      var id=options.id;
      var name=options.name;
      var  requestUrl="";
    var status = options.status;
      wx.setNavigationBarTitle({
        title:name,
      })
      //获取歌单详情
      //推荐歌单
      if(status==0){
         requestUrl = url.baseUrl + '/playlist/detail?id=' + id;
      }
      //获取排行榜歌单
      if(status==1){
        requestUrl = url.baseUrl+'/top/list?idx='+id;
      }

      wx.request({
        url:requestUrl,
        success:function(res){
          that.setData({
            list: res.data.playlist.tracks
          }) 
        }
      })
  },

  //跳转到播放页面
  toSong(e) {
    var key = e.currentTarget.dataset.id;
    console.log(key);
    wx.navigateTo({
      url: '../index/index?key=' + key,
    })
  }
})
