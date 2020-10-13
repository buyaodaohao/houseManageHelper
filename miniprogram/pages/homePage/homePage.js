// pages/homePage/homePage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
isHaveAddAuth:true,//是否有添加信息权限
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // var temp = this.getDaysOfMonth(2020, 2);
    var tempDate = new Date(2019,10,30);
    console.log('tempDate === ' + tempDate);
    var needDate = this.getDateAfterOneDateSomeMonthes(tempDate,3);
    console.log('needDate === ' + needDate);
    var temp = this.getDaysOfCurrentMonth();
    console.log('总天数' + temp);



  
    
    // var openId = app.globalData.openid;
    // if (openId != 'oX4FG4zB-ZIRtXio3E_Lwlp5EbIQ' || openId != 'oX4FG41W6-C33GdccZuYHuwOgQnk' || openId != 'oX4FG41Vuj0-Z0dXifhlbgjM4Y6M')//朱妈妈,仇，还有我的id，只有三个人有权限查看并修改自己添加的记录
    // {
    //   this.setData(
    //     {
    //       isHaveAddAuth:true
    //     }
    //   );
    // }
    // else
    // {
    //   this.setData(
    //     {
    //       isHaveAddAuth: false
    //     }
    //   );
    // }
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
  /**
   * 跳转到上传房屋信息模块
   */
  tapToUploadHouseInfo:function () {
wx.navigateTo({
  url: '../editHouseInfo/editHouseInfo',
})
  },
  /**
   * 跳转到查询房屋信息模块
   */
  tapToQueryHouseInfo:function () {
    wx.navigateTo({
      url: '../queryHouseInfoList/queryHouseInfoList',
    })
  },
  // 获取某个月份有几天
  getDaysOfMonth:function(year, month) {
    var date = new Date(year, month, 0);
    var days = date.getDate();
    return days;
  },
  // 获取当前月份的天数
  getDaysOfCurrentMonth:function(){
    var date = new Date();
    console.log(date);
    //将当前月份加1，下移到下一个月
    date.setMonth(date.getMonth() + 1);
    //将当前的日期置为0，
    date.setDate(0);
    //再获取天数即取上个月的最后一天的天数
    var days = date.getDate();
    return days;
  },
  getDateAfterOneDateSomeMonthes:function (date,num)
  {
    
    //date为格式化后的日期字符yyyy-MM-dd,num为增加的月份
    var monthNum = parseInt(num);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    console.log('月份==' + month);
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    
    if (month + monthNum > 12) 
    {
      var newYear = year + 1;
      var newMonth = month + monthNum - 12;
      var newDay = day;
      var daysOfNewMonth = this.getDaysOfMonth(newYear,newMonth);
      if (day > 28 && daysOfNewMonth <= 30)
      {
        newDay = daysOfNewMonth;
      } 
      var newDate = newYear + "-" + newMonth + "-" + newDay;
      return newDate;
    }
    else 
    {
      var newYear = year
      var newMonth = month + monthNum;
      var newDay = day;
      var daysOfNewMonth = this.getDaysOfMonth(newYear, newMonth);
      if (day > 28 && daysOfNewMonth <= 30) 
      {
        newDay = daysOfNewMonth;
      } 
      var newDate = newYear + "-" + newMonth + "-" + newDay;
      return newDate;
    }
    

  },
})