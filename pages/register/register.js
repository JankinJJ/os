var myurl = 'http://127.0.0.1:8000/';
// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['计算机科学与技术', '网络工程', '软件工程', '物联网工程'],
    arraygrade: ['2014级', '2015级', '2016级','2017级'],
    arrayclass: ['一班','二班','三班','四班'],
    index: 0,
    indexgrade:0,
    indexclass:0
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      num: e.detail.value
    })
    console.log('picker发送选择改变，携带值为', e)
  },

  bindPickerChangeGrade:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexgrade: e.detail.value
    })
  },

  bindPickerChangeClass: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexclass: e.detail.value
    })
  },

  formregister: function (e) {
    console.log(e);
    var that = this;
    wx.request({
      url: myurl + 'register/',
      data: {
        user:e.detail.value.user,
        pass: e.detail.value.pass,
        num: e.detail.value.num,
        phoneNum: e.detail.value.phoneNum,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",
      success: function (res) {
        wx.redirectTo({
          url: '../login/login',
        });
      },
      fail: function () {
        console.log("bad");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  btnRegister:function(){
    wx.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 3000
    }),
    wx.redirectTo({
      url: '../login/login',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})