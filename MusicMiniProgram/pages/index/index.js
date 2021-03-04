import url from "../../utils/util.js"
var audio = null;

//全局数据
Page({
  data: {
    image: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
    value: 0,
    duration: 0,
    currentTime: 0,
    sumTime:"00:00",
    nowTime:"00:00",
    isplay:false,
    isControl:true,
    lyric:{},
    viewId:"ti-00:00",
    songName:"音乐播放"
  },
  //加载数据
  onLoad: function (options) {
     var that=this
   var id=options.key;
  // var id=1390417840;
 
     if(!audio){
       audio = wx.createInnerAudioContext()
     }
    audio.src = "https://music.163.com/song/media/outer/url?id=" + id + ".mp3"
   
    audio.onPlay(function(){ });
    //更新音乐数据
      audio.onTimeUpdate(function () {
        if (that.data.isControl) {
        var nowTime = audio.currentTime;
        var sumTime = audio.duration;
        var start = that.trunTime(nowTime);
        var end = that.trunTime(sumTime);
        that.setData({
          nowTime: start,
          sumTime: end,
          currentTime: nowTime,
          duration: sumTime
        })
        }
        //转换成歌词时间
        if(start in that.data.lyric&&"ti-"+start!=that.data.viewId){
          that.setData({
            viewId: "ti-" + start
          })
        }
      }) 

 //获取歌曲封面/名字
    wx.request({
      url: url.baseUrl+"/song/detail?ids="+id, 
      success:function(res){
         that.setData({
           image: res.data.songs[0].al.picUrl,
           songName:res.data.songs[0].al.name         
         })
        wx.setNavigationBarTitle({
          title: that.data.songName,
        })
      }
    })

    



//获取歌词
    wx.request({
      url: url.songlyric+'?id='+id,
      success:function(res){
        var str = res.data.lrc.lyric;
        var json={};
         //歌词处理
        var reg = /\[(.*?)](.*)/g
        str.replace(reg,function(f1,f2,f3){ 
          f2=f2.slice(0,5);
          json[f2]=f3;
        })
        that.setData({
          lyric:json
        })
      }
    })
  },

 


//时间转换
  trunTime(num){
    var mimute = Math.floor(num / 60);
    mimute=mimute>10?mimute:"0"+mimute;
    var second = Math.floor(num )%60;
    second=second>10?second:"0"+second;
    return mimute+":"+second;
  },
//图片点击事件
  bind() {
    if(this.data.isplay){
      audio.pause();
    }else{
      audio.play();
    }
    this.setData({
      isplay: !this.data.isplay
    })
  },


  changeing(e) {
    this.setData({ 
      isControl:false,
    })
  },

  change(e){
    this.setData({
      isControl:true,
    })
    audio.seek(e.detail.value);
  },

})
