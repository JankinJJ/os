var util = require('../../utils/util.js')
// pages/learn/learn.js
var myurl = 'http://127.0.0.1:8000/';
var student_ID='';
var judge='';
var test_num='';
var pre_grade = [];
var count_all='';
var pageid = -1;
var correct_choose_back = [];//存放后端传来的习题正确答案
var student_answer_array = [];//学生题目作答答案的数组
var correct_count = 0;//学生答题正确的个数
//var correct_answer_array=[];
var username='';
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
    /*
    items: [
    { name: 'A', value: '' },
    { name: 'B', value: '' },
    { name: 'C', value: '' },
    { name: 'D', value: '' },
    ],
    */
  

    //test_num:'',
    title_one:'',

   
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    Selects:[
      ,,,,
    ],
    Question:[
     
    ],
    everyChoose:'',
    answer_array:[],
    pageView_array:[],

    count:'',
    //count_comment:'',
    username:'',
    time:'',
    commentShow:[],
    count_comment: 0,
    //comment_date:
    comment_list_number:[],
    input_judge:false
  },
 //pre:预习部分习题
  slip_end : function(e){
    console.log(e)
    //this.data.answer_array.push(this.data.everyChoose)
    //console.log(this.data.answer_array)
    // this.data.everyChoose=''
    console.log("e.detail.current=" + e.detail.current);
    console.log("this.data.pageView_array=" + this.data.pageView_array);
   

    console.log("pageid=" + pageid)
    //翻页时必须执行
    if (pageid != -1 && this.data.everyChoose!='') {
      console.log("上一次的页面pageid" + pageid + "this.data.everyChoose=" + this.data.everyChoose)
      if (this.data.answer_array[pageid] != this.data.everyChoose) {
        console.log("改变选项了");
        this.data.answer_array[pageid] = this.data.everyChoose;
      }
      // this.data.answer_array[pageid] = this.data.everyChoose;
      this.data.everyChoose='';
      pageid=-1;
     
    }

    if(this.data.pageView_array.indexOf(e.detail.current)==-1)
    {
      // console.log("当前页与页数组不相同")
      // console.log("this.data.everyChoose=" + this.data.everyChoose)
       this.data.pageView_array.push(e.detail.current)
       this.data.answer_array.push(this.data.everyChoose);
      //  this.data.everyChoose = '';

    }else{
      console.log("当前页与页数组相同")

      pageid = e.detail.current;
      // console.log("pageid=" + pageid);
      console.log("this.data.everyChoose"+this.data.everyChoose)
      // if (this.data.answer_array[e.detail.current]!=this.data.everyChoose)
      // {
      //   console.log("改变选项了");
      //   this.data.answer_array[e.detail.current] = this.data.everyChoose;
      // }
      console.log("e.detail.current" + e.detail.current);
      
      // this.data.answer_array[e.detail.current] = this.data.everyChoose;
      // console.log(this.data.answer_array);
      // this.data.pageView_array.push(e.detail.current)
      // this.data.answer_array.push(this.data.everyChoose)
    }
    console.log("显示答案数组")
    console.log(" this.data.answer_array=" + this.data.answer_array);
    student_answer_array = this.data.answer_array
    console.log(" student_answer_array=" + student_answer_array);
 
   
    // console.log(this.data.pageView_array)
    //console.log('页面是否存在'+j)
    // if (j==1)
    // {
    //   this.data.pageView_array.push(e.detail.current)
    //   console.log(this.data.pageView_array)
    // }else{
    //   console.log("嘿哥们，重复了")
    // }
   
  },

  radioChange: function (e) {
   
    console.log(e)
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      everyChoose: e.detail.value
    })
  },

  //发表评论
  comment_Submit:function(e){
    console.log('评论内容：'+e.detail.value.textarea)
    var content = e.detail.value.textarea
    if (content=='')
    {
      this.setData({
        input_judge:true
      })
    }else{
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });

    
    wx.request({
      url: myurl + 'learn_comment/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "post",
      data:{
        comment: e.detail.value.textarea,
        date:time,
        username:username
      },
      success:function(res){
        console.log(res.data)
        // that.setData({
        //   count_comment:res.data
        // })
      }

    })
    }

  },

  //判断对错并存入后端数据库
  submit_pre_answer:function(){
    for (var i = 0; i < correct_choose_back.length ;i++)
    {
      if (student_answer_array[i] == correct_choose_back[i])
      {
        correct_count++;
      }
    }
    console.log('答对了'+correct_count+'道题');

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
    this.data.pageView_array.push(0);
    console.log(this.data.pageView_array);
    var that=this;
    wx.request({
      url: myurl + 'pre_test/',

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",

      success: function (res) {
        
        // wx.setStorageSync('test_num', res.data["Quest_List"].id);
        // var asd = wx.getStorageSync('test_num')
        // console.log(asd)
        var quest_count=res.data["count"]+1;
        console.log("quest_count" + quest_count);
    
        //var quest_count = paresInt(count_all)+1;
        //实现习题从后端动态增加显示
        var myImgurls = []
        var question=[];
        for (var i = 0; i < quest_count-1;i++)
        {
          var OneQeust = { id: res.data["Quest_List"][i].id,title: res.data["Quest_List"][i].title,value: res.data["Quest_List"][i].value}
          myImgurls.push(OneQeust);
          question.push(',');
        };
        //实现从后端循环取出正确答案的值
        for (var i = 0; i < quest_count - 1; i++) {
          //var correct_choose = { correct: res.data["Corront_List"][i].correct};
          //console.log(res.data["Corront_List"][i].correct);
          correct_choose_back.push(res.data["Corront_List"][i].correct)
          //question.push(',');
        }
        //console.log('所有正确答案是：'+correct_choose_back)
        //最后一个
        // OneQeust = { id: 'haha', title: '恭喜你', value: [{ 'name': 'A', 'choose': 'dfj' }, { 'name': 'A', 'choose': 'dfj' }, { 'name': 'A', 'choose': 'dfj' }, { 'name': 'A', 'choose': 'dfj' }] }
        OneQeust={title:'恭喜你做完了题目'}
        myImgurls.push(OneQeust)
        question.push(',');

        console.log("myImgurls" + myImgurls);
        that.setData({
          //test_num_data : wx.getStorageSync('test_num'),
          'imgUrls': myImgurls,
          'Question': question,
        })
     
          //console.log(test_num)
          //wx.setStorageSync('test_num',res.data["id"])
       
      },
      fail: function (res) {
        console.log("失败了北鼻");
      }
     }),
      student_ID = wx.getStorageSync('student_id')

    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res.data)
        username = res.data
      },
    })
    var that = this;
    wx.request({
      url: myurl + 'comment_back/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "get",
    
      success: function (res) {
        console.log(res.data["count"])
        var commentNum = res.data["count"]
        that.setData({count_comment:res.data["count"]})
        var comment_back = []
        var comment_number=[]
        console.log(commentNum)
        for (var i = 0; i < commentNum; i++) {
          var Onecomment = { username: res.data["Comment_List"][i].username, comment: res.data["Comment_List"][i].comment, date: res.data["Comment_List"][i].date }
          comment_back.push(Onecomment);
          comment_number.push(',');
        };

        //console.log(comment_back)
        that.setData({
          //test_num_data : wx.getStorageSync('test_num'),
          'commentShow': comment_back,
          'comment_list_number':comment_number
        })
        console.log('这是真的吗'+that.data.commentShow)

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