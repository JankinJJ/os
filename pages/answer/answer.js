// pages/answer/answer.js
var student_number= '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student_number:'',
    choose_iamge:''
  },
  bindFormSubmit: function (e) {
    console.log(e);
    console.log(e.detail.value.textarea);
    //var that = this;
    wx.setStorageSync('textarea_content', e.detail.value.textarea)
    var textarea_content = wx.getStorageSync('textarea_content');
        wx.uploadFile({
          url: 'http://localhost:8000/upload/',
          filePath: wx.getStorageSync('file_path'),
          name: 'file',

          header: {
            'content-type': 'multipart/form-data'
          }, // 设置请求的 heade
          method: 'POST',

          formData: {
            'value': textarea_content,
            'number': student_number
          },

          success: function (res) {
            var data = res.data
            console.log(res.data)
            //do something
          }
        })

  },

  //答疑图片上传 
  insert_image: function(){
    var that=this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        filePath: tempFilePaths[0],
        that.setData({
          choose_iamge:tempFilePaths[0]
        })
        wx.setStorageSync('file_path', tempFilePaths[0])
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    var that = this;
    wx.getStorage({
      key: 'key1',
      success: function (res) {
        console.log(res.data);
        student_number=res.data; 

      }
    })
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
  
  }
})