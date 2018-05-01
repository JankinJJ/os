var num = 10//计时  
var strH = ''
var strM = ''
var strS = ''
var timer = ''  
var myurl = 'http://127.0.0.1:8000/';
var query_test_num = wx.getStorageSync('query_test_num')
var student_number = wx.getStorageSync('student_id')
var student_choose = ''
//var query_correct = ''
var choose_judge=''
var count_ok=''
var count_bad=''
var count_total=''
var count_A=''
var count_B = ''
var count_C = ''
var count_D = ''
//var test_number=''
// pages/question/question.js
Page({
  data: {
    timeText: '',//展示 
    stop:'',
    items: [
      { name: 'A', value: ' ' },
      { name: 'B', value: ' ' },
      { name: 'C', value: ' ' },
      { name: 'D', value: ' ' },
    ],
    query_content:'',
    wxml_test_num:'',
    test_correct:'',
    radio:false,
    view_HID:true,
    check_queryAnswer:true,
    query_correct:'',
    count_cent:'',
    count_cent_A:'',
    count_cent_B: '',
    count_cent_C: '',
    count_cent_D: '',
    width:20
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    wx.setStorage({
      key:'student_choose',
      data:e.detail.value
      })
    wx.getStorage({
      key: 'student_choose',
      success: function(res) {
        student_choose=res.data
      },
    })
  },
  //this.data.pageView_array.indexOf(e.detail.current) == -1
  submit_test:function(e){
    console.log(this.data.test_correct)
    if (this.data.test_correct.indexOf(student_choose)==-1)
    {
      choose_judge="bad"
    }else{
      choose_judge="ok"
    }
    console.log(choose_judge)
    //console.log(query_correct)
    //console.log(choose_judge)
    this.setData({
      radio:true
    })
    wx.request({
      url: myurl + 'Query_answer/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        testNum: query_test_num[0],
        studebt_number: student_number,
        student_choose: student_choose,
        choose_judge: choose_judge,
        test_category:'class-query'
      },
      method: "get",
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log("我居然败了！")
       },
      complete: function (res) { },
    })
    this.setData({
      answer_bnt: true
    })
  },

  check_queryAnswer:function(){
    var that=this
    wx.request({
      url: myurl + 'queryAnswer_check/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",
      success: function (res) {
        //console.log(res.data)
        count_ok=res.data["count_ok"],
        count_bad=res.data["count_bad"],
        count_A = res.data["count_A"],
        count_B = res.data["count_B"],
        count_C = res.data["count_C"],
        count_D = res.data["count_D"],
        count_total = res.data["count_total"]
        var count_cent;
        var count_cent_A;
        var count_cent_B;
        var count_cent_C;
        var count_cent_D;
        count_cent = count_ok / count_total
        count_cent_A = count_A / count_total
        count_cent_B = count_B / count_total
        count_cent_C = count_C / count_total
        count_cent_D = count_D / count_total
        that.setData({
          count_cent : count_cent.toFixed(2) *100,
          count_cent_A: count_cent_A.toFixed(2) * 100,
          count_cent_B: count_cent_B.toFixed(2) * 100,
          count_cent_C: count_cent_C.toFixed(2) * 100,
          count_cent_D: count_cent_D.toFixed(2) * 100,
          check_queryAnswer:false
        })
        //count_cent.toFixed(2) 
        //console.log(count_cent)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: myurl + 'class_query/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "post",
      success: function(res) {
        that.setData({
          test_correct: res.data["query_correct"],
          wxml_test_num: res.data["query_num"],
          query_content: res.data["query_content"],
          'items[0].value': res.data["query_choose_A"],
          'items[1].value': res.data["query_choose_B"],
          'items[2].value': res.data["query_choose_C"],
          'items[3].value': res.data["query_choose_D"] 
        })
        wx.setStorageSync('query_test_num', res.data["query_num"])
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  onReady: function () {
    this.move()
    //计时开始 后面的1000是毫秒 每1000毫秒跳一次  
    timer = setInterval(this.move, 1000);  
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
        answer_bnt:true,
        view_HID:false
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