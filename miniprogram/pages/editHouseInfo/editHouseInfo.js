// pages/editHouseInfo/editHouseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRented:false,
    
    contentInputValue:'',//房屋描述
    houseAddressInputValue:'',//房屋位置
    houseRentPriceInputValue:'',//房屋租金
    houseRentTimeRangeInputValue:'',//房屋出租时长
    houseOwnerNameInputValue:'',//房东姓名
    houseOwnerIDCardNumInputValue:'',//房东证件号码
    houseOwnerPhoneNumInputValue:'',//房东电话号码
    houseRenterNameInputValue:'',//租客姓名
    houseRenterIDCardNumInputValue:'',//租客证件号码
    houseRenterPhoneNumInputValue:'',//租客电话号码
    houseWaterMeterInputValue:'',//水表号
    houseElectricMeterInputValue:'',//电表号
    houseGasMeterInputValue:'',//燃气号


    openid: '',
    loading: false,
    date: '2016-09-01',
    isShowDatePicker:false,
    isNeedDeposit:true,//是否需要押金
    payRange:'1个月',
    payRangeList:[
      '1个月',
      '2个月',
      '3个月',
      '4个月',
      '5个月',
      '6个月',
      '12个月'
    ],//交租周期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    this.setData({
      date:year + '-' + month + '-' + day
    });
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    if (!this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          console.log(res.result.openid);
          this.setData({
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function () { } : function () {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
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
  // 是否需要押金
  clickToChangeDepositStatus:function (e) {
    if (e.detail.value == 'r1')//是
    {
      this.setData(
        {
          isNeedDeposit: true
        }
      );
    }
    else {
      this.setData(
        {
          isNeedDeposit: false
        }
      );
    }
  },
  // 房屋出租状态
  clickToChange:function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if(e.detail.value == 'r1')//是
    {
      this.setData(
        {
          isRented:true
        }
      );
    }
    else
    {
      this.setData(
        {
          isRented: false
        }
      );
    }
  },
  // 日期选择
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },
  // 付租周期选择
  bindPayRangeChange(e){
    this.setData({
      payRange: this.data.payRangeList[e.detail.value]
    });
  },
  // 提交、更新房屋信息
  tapToCommitHouseInfo:function(){
    var nextPayDate = '';//下一交租期
if(this.data.houseAddressInputValue.length == 0)
{
  wx.showToast({
    title: '请输入房屋位置信息',
    icon: 'none'
  })
  return;
}

    if (this.data.houseRentPriceInputValue.length == 0) {
      wx.showToast({
        title: '请输入房屋月租金',
        icon: 'none'
      })
      return;
    }
    if (this.data.isRented) {
      if(this.data.houseRenterNameInputValue.length == 0)
      {
        wx.showToast({
          title: '请输入租客姓名',
          icon: 'none'
        })
        return;
      }

      
      var tempRange = this.data.payRange;//交租周期
      tempRange = tempRange.split('个')[0];
      
nextPayDate = this.getDateAfterOneDateSomeMonthes(this.stringToDate(this.data.date),tempRange);
var nowDate = new Date();

      var diffDays = this.getDaysBetween(nowDate, this.stringToDate(nextPayDate));
      while(diffDays<-15)
      {
        nextPayDate = this.getDateAfterOneDateSomeMonthes(this.stringToDate(nextPayDate), tempRange);
        diffDays = this.getDaysBetween(nowDate, this.stringToDate(nextPayDate));
      }
    }
    if (this.data.contentInputValue.length == 0) {
      wx.showToast({
        title: '请输入房屋描述信息',
        icon: 'none'
      })
      return;
    }
const db = wx.cloud.database()
    db.collection('houses').add({
      data: {
        address: this.data.houseAddressInputValue,
        electricNum:this.data.houseElectricMeterInputValue,
        gasNum:this.data.houseGasMeterInputValue,
        houseDesc:this.data.contentInputValue,
        houseOwner:this.data.houseOwnerNameInputValue,
        houseOwnerIDNum:this.data.houseOwnerIDCardNumInputValue,
        isRent:this.data.isRented,
        ownerPhone:this.data.houseOwnerPhoneNumInputValue,
isPayRent:false,
rentPrice:this.data.houseRentPriceInputValue,
renter:this.data.houseRenterNameInputValue,
renterIDNum:this.data.houseRenterIDCardNumInputValue,
renterPhone:this.data.houseRenterPhoneNumInputValue,
waterNum:this.data.houseWaterMeterInputValue,
        rentStartTime: this.data.isRented?this.data.date:'',
        lastPayDate: this.data.isRented ? this.data.date : '',
        nextPayDate: this.data.isRented ? nextPayDate : '',
rentTime:this.data.houseRentTimeRangeInputValue,
payRange:this.data.payRange,
isNeedDeposit:this.data.isNeedDeposit
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        
        wx.showToast({
          title: '添加成功',
        });


        let pages = getCurrentPages();
        console.log(pages.length);
        let currPage = null; //当前页面
        let prevPage = null; //上一个页面

        if (pages.length >= 2) {
          currPage = pages[pages.length - 1]; //当前页面
          prevPage = pages[pages.length - 2]; //上一个页面
        }
        if (prevPage) {
          // console.log('cunzai');
          prevPage.setData({
            isNeedRefresh: true
          });

        }

        wx.navigateBack({

        });
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '添加失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    
  },
  // 房屋描述输入框获取焦点
  textAreaInputFocus:function(e){
    
  },
  // 房屋描述输入框获内容发生变化
  textAreaInputChange:function(e){
    this.data.contentInputValue = e.detail.value;
  },
  // 房屋描述输入框失去焦点
  textAreaInputBlur:function(e){
    this.data.contentInputValue = e.detail.value;
  },
  
  // 房屋位置输入框获取焦点
  inputHouseAddressFocus:function(e){

  },

  // 房屋位置输入框内容发生变化
  inputHouseAddressChange: function (e) {
    this.data.houseAddressInputValue = e.detail.value;
  },

  // 房屋位置输入框失去焦点
  inputHouseAddressBlur: function (e) {
    this.data.houseAddressInputValue = e.detail.value;
  },


  // 租金输入框获取焦点
  inputHouseRentPriceFocus: function (e) {

  },

  // 租金输入框内容发生变化
  inputHouseRentPriceChange: function (e) {
    this.data.houseRentPriceInputValue = e.detail.value;
  },

  // 租金输入框失去焦点
  inputHouseRentPriceBlur: function (e) {
    this.data.houseRentPriceInputValue = e.detail.value;
  },


  // 租房时长输入框获取焦点
  inputHouseRentTimeRangeFocus: function (e) {
    
  },

  // 租房时长输入框内容发生变化
  inputHouseRentTimeRangeChange: function (e) {
    this.data.houseRentTimeRangeInputValue = e.detail.value;
  },

  // 租房时长输入框失去焦点
  inputHouseRentTimeRangeBlur: function (e) {
    this.data.houseRentTimeRangeInputValue = e.detail.value;
  },
  // 房东姓名输入框获取焦点
  inputHouseOwnerNameFocus: function (e) {

  },

  // 房东姓名输入框内容发生变化
  inputHouseOwnerNameChange: function (e) {
    this.data.houseOwnerNameInputValue = e.detail.value;
  },

  // 房东姓名输入框失去焦点
  inputHouseOwnerNameBlur: function (e) {
    this.data.houseOwnerNameInputValue = e.detail.value;
  },

  // 房东证件号码输入框获取焦点
  inputHouseOwnerIDCardNumFocus: function (e) {

  },

  // 房东证件号码输入框内容发生变化
  inputHouseOwnerIDCardNumChange: function (e) {
    this.data.houseOwnerIDCardNumInputValue = e.detail.value;
  },

  // 房东证件号码输入框失去焦点
  inputHouseOwnerIDCardNumBlur: function (e) {
    this.data.houseOwnerIDCardNumInputValue = e.detail.value;
  },


  // 房东电话号码输入框获取焦点
  inputHouseOwnerPhoneNumFocus: function (e) {

  },

  // 房东电话号码输入框内容发生变化
  inputHouseOwnerPhoneNumChange: function (e) {
    this.data.houseOwnerPhoneNumInputValue = e.detail.value;
  },

  // 房东电话号码输入框失去焦点
  inputHouseOwnerPhoneNumBlur: function (e) {
    this.data.houseOwnerPhoneNumInputValue = e.detail.value;
  },

  // 租客姓名输入框获取焦点
  inputHouseRenterNameFocus: function (e) {

  },

  // 租客姓名输入框内容发生变化
  inputHouseRenterNameChange: function (e) {
    this.data.houseRenterNameInputValue = e.detail.value;
  },

  // 租客姓名输入框失去焦点
  inputHouseRenterNameBlur: function (e) {
    this.data.houseRenterNameInputValue = e.detail.value;
  },


  // 租客证件号码输入框获取焦点
  inputHouseRenterIDCardNumFocus: function (e) {

  },

  // 租客证件号码输入框内容发生变化
  inputHouseRenterIDCardNumChange: function (e) {
    this.data.houseRenterIDCardNumInputValue = e.detail.value;
  },

  // 租客证件号码输入框失去焦点
  inputHouseRenterIDCardNumBlur: function (e) {
    this.data.houseRenterIDCardNumInputValue = e.detail.value;
  },

  // 租客电话号码输入框获取焦点
  inputHouseRenterPhoneNumFocus: function (e) {

  },

  // 租客电话号码输入框内容发生变化
  inputHouseRenterPhoneNumChange: function (e) {
    this.data.houseRenterPhoneNumInputValue = e.detail.value;
  },

  // 租客电话号码输入框失去焦点
  inputHouseRenterPhoneNumBlur: function (e) {
    this.data.houseRenterPhoneNumInputValue = e.detail.value;
  },

  // 水表号输入框获取焦点
  inputHouseWaterMeterFocus: function (e) {

  },

  // 水表号输入框内容发生变化
  inputHouseWaterMeterChange: function (e) {
    this.data.houseWaterMeterInputValue = e.detail.value;
  },

  // 水表号输入框失去焦点
  inputHouseWaterMeterBlur: function (e) {
    this.data.houseWaterMeterInputValue = e.detail.value;
  },

  // 电表号输入框获取焦点
  inputHouseElectricMeterFocus: function (e) {

  },

  // 电表号输入框内容发生变化
  inputHouseElectricMeterChange: function (e) {
    this.data.houseElectricMeterInputValue = e.detail.value;
  },

  // 电表号输入框失去焦点
  inputHouseElectricMeterBlur: function (e) {
    this.data.houseElectricMeterInputValue = e.detail.value;
  },

  // 燃气号输入框获取焦点
  inputHouseGasMeterFocus: function (e) {

  },

  // 燃气号输入框内容发生变化
  inputHouseGasMeterChange: function (e) {
    this.data.houseGasMeterInputValue = e.detail.value;
  },

  // 燃气号输入框失去焦点
  inputHouseGasMeterBlur: function (e) {
    this.data.houseGasMeterInputValue = e.detail.value;
  },
// 字符串转日期Date
  stringToDate: function (dateStr, separator){
    if(!separator) 
    {
      separator = "-";
    }
      var  dateArr = dateStr.split(separator);
    var  year = parseInt(dateArr[0]);
    var  month;
    if(dateArr[1].indexOf( "0") == 0)
    {
  
  month = parseInt(dateArr[1].substring(1));

} 
else 
{
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
  }
  
})