//var username;
Page({
  data: {
    username:'',
    content:'进程控制',
    selectPerson: true,
    firstPerson: '进程与线程',
    selectArea: false,
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    this.setData({

      selectPerson: true,
      selectArea: false,

    })

    wx.navigateTo({
      url: '../learn/learn',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  Totest:function(){
    wx.navigateTo({
      url: '../test/test',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res.data)
        that.setData({ username: res.data })

      }
    })
  },
  onReady: function () {
    
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },




 Toquestion:function(){
    wx.navigateTo({
      url: '../question/question',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

 Toanswer:function(){
   wx.navigateTo({
     url: '../answer/answer',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
 },

 Todownload:function(){
   wx.navigateTo({
     url: '../download/download',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
 }
})