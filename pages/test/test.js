// pages/test/test.js
var myurl = 'http://127.0.0.1:8000/';
var answer_array=[];
var correct_choose_back=[];
var everyClick=null;//每发生点击事件对应的viewID
var everyChoose=null;
//var pageid=-1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_test: [
      // { title: '这是第一题，选啥（）', id: '0', value: [{ name: 'A', choose: '你说呢' }, { name: 'B', choose: '我说啊' }, { name: 'C', choose: '她说呢' }, {name:'D', choose:'它说呀'}]},
      // { title: '这是第二题，选啥（）', id: '1', value: [{ name: 'A', choose: '你说呢' }, { name: 'B', choose: '我说啊' }, { name: 'C', choose: '她说呢' }, { name: 'D', choose: '它说呀' }] },
    ],
    //index:0,
    question_num:[],
    choose:[,,,,],

    Click_view:[]
  },

  view1: function (e) {
    everyClick = e.currentTarget.id
    //console.log(e.currentTarget.id)

      if (this.data.Click_view.indexOf(everyClick) == -1) {
        this.data.Click_view.push(e.currentTarget.id)
        //answer_array.push(everyChoose)
        answer_array[everyClick] = everyChoose

      }else{
        answer_array[everyClick] = everyChoose
      }
    
    console.log(answer_array)
  },

  radioChange: function (e) {
    everyChoose=e.detail.value
    // if (this.data.Click_view.indexOf(everyClick) == -1)
    // {
    //   answer_array.push(e.detail.value)
    // }
    //e.detail.value

  },
    


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //console.log(this.data.class_test[0].title)
   //console.log(this.data.class_test[0].value[0].choose)
    var that = this;
    wx.request({
      url: myurl + 'class_test/',

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",

      success: function (res) {
        var quest_count = res.data["count"];
        console.log("quest_count" + quest_count);
        //实现习题从后端动态增加显示
        var myImgurls = []
        var Question = [];
        for (var i = 0; i < quest_count; i++) {
          var OneQeust = { id: res.data["Quest_List"][i].test_num, title: res.data["Quest_List"][i].title, value: res.data["Quest_List"][i].value }
          myImgurls.push(OneQeust);
          Question.push(',');
        };

        that.setData({
          //test_num_data : wx.getStorageSync('test_num'),
          'class_test': myImgurls,
          'question_num':Question
          
          //'Question': question,
        })

        //实现从后端循环取出正确答案的值
        for (var i = 0; i < quest_count; i++) {
          correct_choose_back.push(res.data["Corront_List"][i].correct)
        }
        console.log(correct_choose_back)
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