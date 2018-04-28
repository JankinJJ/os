var num = 10//计时  
var strH = ''
var strM = ''
var strS = ''
var timer = ''  

// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeText: '',//展示 
    stop:'',
    hey:false
  },

  haha:function(){
   
  },

  submit_test:function(){


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.move()
    //计时开始 后面的1000是毫秒 每1000毫秒跳一次  
    timer = setInterval(this.move, 1000);  
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
  move() {
    //时  
    strH = this.zeroFill('' + parseInt(num / 3600 % 24), 2)

    //分  
    strM = this.zeroFill('' + parseInt(num / 60 % 24), 2)

    //秒  
    strS = this.zeroFill('' + parseInt(num % 60), 2)

    //赋值给text内容  
    this.setData({
      timeText: strH + ':' + strM + ':' + strS
    })

    //当时间归零停止计时器  
    if (num == 0) {
      clearInterval(timer)
      this.data.stop=1
      console.log(this.data.stop)
      this.setData({
        hey:true
      })
      return
    }

    //每秒递减  
    num--
  },
  zeroFill(str, n) {
    //补零方法，str为数字字符串 n为需要的位数，不够补零  
    if (str.length < n) {
      str = '0' + str
    }
    return str
  }

})