// pages/learn/learn.js
var myurl = 'http://127.0.0.1:8000/';
var student_ID='';
var judge='';
var test_num='';
var pre_grade = [];
var count_all='';
var pageid = -1;
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

    count:''


    

    //radio:false
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
      // console.info("pageid=",pageid);
      // this.data.answer_array[pageid] = this.data.everyChoose;
      console.log("当前页与页数组不相同")
      console.log("this.data.everyChoose=" + this.data.everyChoose)
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


    

    // pre_grade.push(e.detail.value);

    // console.log(pre_grade);

    //this.setData({ radio:true})
   

  /*
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
    */
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
      url: myurl + 'exercises/',

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
        
        var myImgurls = []
        var question=[];
        for (var i = 0; i < quest_count-1;i++)
        {
          var OneQeust = { id: res.data["Quest_List"][i].id,title: res.data["Quest_List"][i].title,value: res.data["Quest_List"][i].value}
          myImgurls.push(OneQeust);
          question.push(',');
        }
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