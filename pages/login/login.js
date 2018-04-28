var myurl = 'http://127.0.0.1:8000/';
var username;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //username1:'',
    msg: '',
  },
  //登录点击事件
  formSubmit: function (e) {
    console.log(e);
    var that = this;
    wx.request({
      url: myurl + 'login/',
      data: {
        num: e.detail.value.num,
        pass: e.detail.value.pass,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",
      success: function (res) {
        //var that = this;
        //var username=null;
        console.log(res)
        console.log(res.data["status"]);
        // dat=JSON.parse(res);
        //var username=null;
        if (res.data["status"]==1){
          //var that = this;
          //that.setData({username1:res.data["username"] });
          username=res.data["username"];
          wx.setStorage({
            key: "key",
            data: res.data["username"]
          })
          wx.setStorageSync('student_id', res.data["number"])
          console.log(username);
          
          wx.redirectTo({
            url: '../index/index',
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    })

  },

  btnregister:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  btnforgetPassword:function(){
    wx.navigateTo({
      url: '../forget/forget',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

//获取用户名并存到本地缓存
  
})