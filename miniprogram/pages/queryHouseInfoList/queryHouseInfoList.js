// pages/queryHouseInfoList/queryHouseInfoList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kindList: [
      {
        'title': '已出租',
      },
      {
        'title': '未出租',
      },
      {
        'title': '未交租',
      },
    ], //分类集合,上方tab
    currentKind: "已出租", //选中的当前分类,上方tab
    showDataList:[],//
    isNeedRefresh:false,//是否需要刷新
    nowDate:'',//当前时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.fetchDataFromCloudServer();

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
    console.log(this.data.isNeedRefresh);
if(this.data.isNeedRefresh)
{
  this.fetchDataFromCloudServer();
}
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
   * 选中服务分类-大类中的某一项
   */
  selectOneKind: function (e) {
    var kindName = e.target.dataset.model.title;
    this.setData(
      {
        currentKind:kindName
      }
    );
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    this.fetchDataFromCloudServer();

  },
  // 从云端获取数据
  fetchDataFromCloudServer:function () {
    var tempDate = new Date();
    var year = tempDate.getFullYear();
    var month = tempDate.getMonth() + 1;
    
    var day = tempDate.getDate();
    var tempDate = year + "-" + month + "-" + day;
    const db = wx.cloud.database()
var isRented = this.data.currentKind == '已出租'?true:false;
if(this.data.currentKind == '未交租')
{
  db.collection('houses').where({
    isRent: true,
    isPayRent: false
  }).get({
    success: res => {

      var needList = [];
      for (let i = 0; i < res.data.length; i++)
      {
        var tempDic = res.data[i];
        var nextPayDate = tempDic.nextPayDate;
        var nowDate = new Date();
        var range = this.getDaysBetween(nowDate, this.stringToDate(nextPayDate));
        if(range <= 10)
        {
          needList.push(tempDic);
        }

      }
      this.setData({
        showDataList: needList,
        nowDate: tempDate
      });
      wx.hideLoading();
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err);
      wx.hideLoading();
    }
  });
}
else
{
  db.collection('houses').where({
    isRent: isRented
  }).get({
    success: res => {
      this.setData({
        showDataList: res.data,
        nowDate: tempDate
      });
      wx.hideLoading();
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err);
      wx.hideLoading();
    }
  });
}
    
  },
  // 修改房屋信息
  tapToModifyHouseInfo:function(e)
  {
    var openId = app.globalData.openid;
    console.log('用户id===' + openId);
    if (openId != 'oX4FG4zB-ZIRtXio3E_Lwlp5EbIQ' && openId != 'oX4FG41W6-C33GdccZuYHuwOgQnk' && openId != 'oX4FG41Vuj0-Z0dXifhlbgjM4Y6M')//朱妈妈,仇，还有我的id，只有三个人有权限查看并修改自己添加的记录
    {
      return;
    }
    var itemId = e.currentTarget.dataset.model._id;
    var itemOpenId = e.currentTarget.dataset.model._openid;
    if(itemOpenId == openId)
    {
      wx.navigateTo({
        url: '../upDateHouseInfo/upDateHouseInfo?id=' + itemId,
      });
    }
    else
    {
      wx.navigateTo({
        url: '../lookHouseInfo/lookHouseInfo?id=' + itemId,
      });

    }
    
  },
  // 字符串转日期Date
  stringToDate: function (dateStr, separator) {
    if (!separator) {
      separator = "-";
    }
    var dateArr = dateStr.split(separator);
    var year = parseInt(dateArr[0]);
    var month;
    if (dateArr[1].indexOf("0") == 0) {

      month = parseInt(dateArr[1].substring(1));

    }
    else {
      month = parseInt(dateArr[1]);
    }
    var day = parseInt(dateArr[2]);
    var date = new Date(year, month - 1, day);
    return date;
  },
  // 获取某个月份有几天
  getDaysOfMonth: function (year, month) {
    var date = new Date(year, month, 0);
    var days = date.getDate();
    return days;
  },
  // 获取当前月份的天数
  getDaysOfCurrentMonth: function () {
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
  getDateAfterOneDateSomeMonthes: function (date, num) {

    //date为格式化后的日期字符yyyy-MM-dd,num为增加的月份
    var monthNum = parseInt(num);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    console.log('月份==' + month);
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month + monthNum > 12) {
      var newYear = year + 1;
      var newMonth = month + monthNum - 12;
      var newDay = day;
      var daysOfNewMonth = this.getDaysOfMonth(newYear, newMonth);
      if (day > 28 && daysOfNewMonth <= 30) {
        newDay = daysOfNewMonth;
      }
      var newDate = newYear + "-" + newMonth + "-" + newDay;
      return newDate;
    }
    else {
      var newYear = year
      var newMonth = month + monthNum;
      var newDay = day;
      var daysOfNewMonth = this.getDaysOfMonth(newYear, newMonth);
      if (day > 28 && daysOfNewMonth <= 30) {
        newDay = daysOfNewMonth;
      }
      var newDate = newYear + "-" + newMonth + "-" + newDay;
      return newDate;
    }
  },
  // 计算两个日期相差的天数
  getDaysBetween: function (startDate, endDate) {

    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return days;
  },

  //确认交租
  tapToUpdateRentPayStatus:function(e){
    var that = this;
    var item = e.target.dataset.model;
    var nextPayDate = item.nextPayDate;
    var message = '交租期为' + nextPayDate + ',确认已交租？';
    wx.showModal({
      title: '温馨提示',
      content: message,
      success(res) {
        if (res.confirm) {


          var tempRange = item.payRange;//交租周期
          tempRange = tempRange.split('个')[0];
          
          nextPayDate = that.getDateAfterOneDateSomeMonthes(that.stringToDate(nextPayDate), tempRange);
          const db = wx.cloud.database()
          db.collection('houses').doc(item._id).update({
            data: {
              isPayRent:false,
              nextPayDate:nextPayDate
            },
            success: res => {
              // 在返回结果中会包含新创建的记录的 _id

              wx.showToast({
                title: '更新成功',
              });
              that.fetchDataFromCloudServer();

              

              
              
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '更新失败'
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  },
  // 添加房产信息
  tapToAddHouseInfo:function () {
    wx.navigateTo({
      url: '../editHouseInfo/editHouseInfo',
    });
  },
})