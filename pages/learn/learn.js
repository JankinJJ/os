// pages/learn/learn.js
var myurl = 'http://127.0.0.1:8000/';
var student_ID='';
var judge='';
var test_num='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //student_ID:'',
    test_num_data:'',
    test_num:'',

    flag_pre: false,
    flag_ing: true,
    flag_re: true,
    title_pre:'headerTitle1',
    title_ing:'headerTitle2',
    title_re:'headerTitle2',

    items: [
    { name: 'A', value: '' },
    { name: 'B', value: '' },
    { name: 'C', value: '' },
    { name: 'D', value: '' },
    ],
    radio_group_one:false,

    //test_num:'',
    title_one:'',

    // imgUrls: [
    //   { title: '../../images/1.jpg', name: 'A', value:'于镇宁很帅'},
    //  {title: '../../images/2.jpg', name: 'A', value: '于镇宁很'},
    
    // ],
    imgUrls: [
    { title: '../../images/1.jpg', name: 'A', value:[{name:'A',a:'于镇宁很帅'},{name:'B',a:'与'},{name:'C',a:'hahahha'}]},
    { title: '../../images/2.jpg', name: 'A', value: [{ name: 'A', a: '于镇很帅' }, { name: 'B', a: 'sdhfjsdfhdjf' }, { name: 'C',a:'dhjf'}]},

    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    Selects:[
      ,,,
    ],
    Question:[
      ,,
    ]
  },
 //pre:预习部分习题

  radioChange: function (e) {
    console.log(e)
    console.log('radio发生change事件，携带value值为：', e.detail.value)

   if (e.detail.value=="B")
    {
      judge="ok"
    }else{
      judge="bad"
    }

   wx.getStorage({
     key: 'key2',
     success: function (res) {
       console.log(res.data),
         test_num = res.data

     }
   })


    this.setData({ radio_group_one:true})
    wx.request({ 
      url: myurl + 'pre_answer/',
      data: {
        answer: e.detail.value,
        student_num:student_ID,
        test_num2: wx.getStorageSync('test_num'),
        pre_answer: e.detail.value,
        judge:judge,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",
    })
  },
  
  Topre:function(){
    this.setData({
      flag_ing: true,
      flag_pre: false,
      flag_re: true,
      title_pre: 'headerTitle1',
      title_ing: 'headerTitle2',
      title_re: 'headerTitle2'     
    })   
  },

  Toing:function(){
    this.setData({
      flag_ing:false,
      flag_pre:true,
      flag_re:true,
      title_pre: 'headerTitle2',
      title_ing: 'headerTitle1',
      title_re: 'headerTitle2'
    })
  },

  Toreview:function(){
    this.setData({
      flag_pre:true,
      flag_ing:true,
      flag_re:false,
      title_pre: 'headerTitle2',
      title_ing: 'headerTitle2',
      title_re: 'headerTitle1'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: myurl + 'exercises/',

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",

      success: function (res) {
        //test_num = res.data["id"];
        //console.log(res.data)
        //console.log(test_num)
        wx.setStorageSync('test_num', res.data["id"])
        that.setData({
          test_num_data : wx.getStorageSync('test_num'),
          title_one: res.data["title"],
          'items[0].value': res.data["choose_A"],
          'items[1].value': res.data["choose_B"],
          'items[2].value': res.data["choose_C"],
          'items[3].value': res.data["choose_D"],
        })
          console.log(res.data)
          //console.log(test_num)
          //wx.setStorageSync('test_num',res.data["id"])

      },
      fail: function (res) {
        console.log("失败了北鼻");
      }
  

    }),
      student_ID = wx.getStorageSync('student_id')
  
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