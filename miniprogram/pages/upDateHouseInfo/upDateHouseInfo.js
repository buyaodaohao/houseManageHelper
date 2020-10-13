// pages/upDateHouseInfo/upDateHouseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
model:Object,
    
    payRangeList: [
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
    var tempItemID = options.id;
    this.fetchDataFromCloudServer(tempItemID);
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
  // 从云端获取数据
  fetchDataFromCloudServer: function (queryID) {
    var that = this;
    const db = wx.cloud.database()
    
    db.collection('houses').where({
      
      _id: queryID
    }).get({
      success: res => {
        
        that.setData({
          model: res.data[0]
          
        });
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  // 房屋描述输入框获取焦点
  textAreaInputFocus: function (e) {

  },
  // 房屋描述输入框获内容发生变化
  textAreaInputChange: function (e) {
    this.data.model.houseDesc = e.detail.value;
  },
  // 房屋描述输入框失去焦点
  textAreaInputBlur: function (e) {
    this.data.model.houseDesc = e.detail.value;
  },

  // 房屋位置输入框获取焦点
  inputHouseAddressFocus: function (e) {

  },

  // 房屋位置输入框内容发生变化
  inputHouseAddressChange: function (e) {
    this.data.model.address = e.detail.value;
  },

  // 房屋位置输入框失去焦点
  inputHouseAddressBlur: function (e) {
    this.data.model.address = e.detail.value;
  },


  // 租金输入框获取焦点
  inputHouseRentPriceFocus: function (e) {

  },

  // 租金输入框内容发生变化
  inputHouseRentPriceChange: function (e) {
    this.data.model.rentPrice = e.detail.value;
  },

  // 租金输入框失去焦点
  inputHouseRentPriceBlur: function (e) {
    this.data.model.rentPrice = e.detail.value;
  },


  // 租房时长输入框获取焦点
  inputHouseRentTimeRangeFocus: function (e) {

  },

  // 租房时长输入框内容发生变化
  inputHouseRentTimeRangeChange: function (e) {
    this.data.model.rentTime = e.detail.value;
  },

  // 租房时长输入框失去焦点
  inputHouseRentTimeRangeBlur: function (e) {
    this.data.model.rentTime = e.detail.value;
  },
  // 房东姓名输入框获取焦点
  inputHouseOwnerNameFocus: function (e) {

  },

  // 房东姓名输入框内容发生变化
  inputHouseOwnerNameChange: function (e) {
    this.data.model.houseOwner = e.detail.value;
  },

  // 房东姓名输入框失去焦点
  inputHouseOwnerNameBlur: function (e) {
    this.data.model.houseOwner = e.detail.value;
  },

  // 房东证件号码输入框获取焦点
  inputHouseOwnerIDCardNumFocus: function (e) {

  },

  // 房东证件号码输入框内容发生变化
  inputHouseOwnerIDCardNumChange: function (e) {
    this.data.model.houseOwnerIDNum = e.detail.value;
  },

  // 房东证件号码输入框失去焦点
  inputHouseOwnerIDCardNumBlur: function (e) {
    this.data.model.houseOwnerIDNum = e.detail.value;
  },


  // 房东电话号码输入框获取焦点
  inputHouseOwnerPhoneNumFocus: function (e) {

  },

  // 房东电话号码输入框内容发生变化
  inputHouseOwnerPhoneNumChange: function (e) {
    this.data.model.ownerPhone = e.detail.value;
  },

  // 房东电话号码输入框失去焦点
  inputHouseOwnerPhoneNumBlur: function (e) {
    this.data.model.ownerPhone = e.detail.value;
  },

  // 租客姓名输入框获取焦点
  inputHouseRenterNameFocus: function (e) {

  },

  // 租客姓名输入框内容发生变化
  inputHouseRenterNameChange: function (e) {
    this.data.model.renter = e.detail.value;
  },

  // 租客姓名输入框失去焦点
  inputHouseRenterNameBlur: function (e) {
    this.data.model.renter = e.detail.value;
  },


  // 租客证件号码输入框获取焦点
  inputHouseRenterIDCardNumFocus: function (e) {

  },

  // 租客证件号码输入框内容发生变化
  inputHouseRenterIDCardNumChange: function (e) {
    this.data.model.renterIDNum = e.detail.value;
  },

  // 租客证件号码输入框失去焦点
  inputHouseRenterIDCardNumBlur: function (e) {
    this.data.model.renterIDNum = e.detail.value;
  },

  // 租客电话号码输入框获取焦点
  inputHouseRenterPhoneNumFocus: function (e) {

  },

  // 租客电话号码输入框内容发生变化
  inputHouseRenterPhoneNumChange: function (e) {
    this.data.model.renterPhone = e.detail.value;
  },

  // 租客电话号码输入框失去焦点
  inputHouseRenterPhoneNumBlur: function (e) {
    this.data.model.renterPhone = e.detail.value;
  },

  // 水表号输入框获取焦点
  inputHouseWaterMeterFocus: function (e) {

  },

  // 水表号输入框内容发生变化
  inputHouseWaterMeterChange: function (e) {
    this.data.model.waterNum = e.detail.value;
  },

  // 水表号输入框失去焦点
  inputHouseWaterMeterBlur: function (e) {
    this.data.model.waterNum = e.detail.value;
  },

  // 电表号输入框获取焦点
  inputHouseElectricMeterFocus: function (e) {

  },

  // 电表号输入框内容发生变化
  inputHouseElectricMeterChange: function (e) {
    this.data.model.electricNum = e.detail.value;
  },

  // 电表号输入框失去焦点
  inputHouseElectricMeterBlur: function (e) {
    this.data.model.electricNum = e.detail.value;
  },

  // 燃气号输入框获取焦点
  inputHouseGasMeterFocus: function (e) {

  },

  // 燃气号输入框内容发生变化
  inputHouseGasMeterChange: function (e) {
    this.data.model.gasNum = e.detail.value;
  },

  // 燃气号输入框失去焦点
  inputHouseGasMeterBlur: function (e) {
    this.data.model.gasNum = e.detail.value;
  },

  // 是否需要押金
  clickToChangeDepositStatus: function (e) {
    if (e.detail.value == 'r1')//是
    {
      var tempModel = this.data.model;
      tempModel.isNeedDeposit = true;
      this.setData(
        {
          model: tempModel
        }
      );
    }
    else {
      var tempModel = this.data.model;
      tempModel.isNeedDeposit = false;
      this.setData(
        {
          model: tempModel
        }
      );
    }
  },
  // 房屋出租状态
  clickToChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    if (e.detail.value == 'r1')//是
    {

      var tempModel = this.data.model;
      tempModel.isRent = true;
      this.setData(
        {
          model: tempModel
        }
      );
    }
    else {
      var that = this;
      wx.showModal({
        title: '温馨提示',
        content: '确认将房屋置为待出租吗？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var tempModel = that.data.model;
            tempModel.isRent = false;
            that.setData(
              {
                model: tempModel
              }
            );
          } else if (res.cancel) {
            console.log('用户点击取消');
            var tempModel = that.data.model;
            tempModel.isRent = true;
            that.setData(
              {
                model: tempModel
              }
            );
          }
        }
      })
      
    }
  },
  // 付租周期选择
  bindPayRangeChange(e) {
    var tempModel = this.data.model;
    tempModel.payRange = this.data.payRangeList[e.detail.value];
    this.setData({
      model:tempModel 
    });
  },

  // 日期选择
  bindDateChange(e) {
    var tempModel = this.data.model;
    tempModel.rentStartTime = e.detail.value;
    this.setData({
      model: tempModel
    });
  },
  tapToUpdateHouseInfo:function(){

    var nextPayDate = '';//下一交租期

    if (this.data.model.rentPrice.length == 0) {
      wx.showToast({
        title: '请输入房屋月租金',
        icon: 'none'
      })
      return;
    }
    if (this.data.model.isRent) {
      if (this.data.model.renter.length == 0) {
        wx.showToast({
          title: '请输入租客姓名',
          icon: 'none'
        })
        return;

        var tempRange = this.data.model.payRange;//交租周期
        tempRange = tempRange.split('个')[0];

        nextPayDate = this.getDateAfterOneDateSomeMonthes(this.stringToDate(this.data.model.rentStartTime), tempRange);
      }
    }
    if (this.data.model.houseDesc.length == 0) {
      wx.showToast({
        title: '请输入房屋描述信息',
        icon: 'none'
      })
      return;
    }
    const db = wx.cloud.database()
    db.collection('houses').doc(this.data.model._id).update({
      data: {
        address: this.data.model.address,
        electricNum: this.data.model.electricNum,
        gasNum: this.data.model.gasNum,
        houseDesc: this.data.model.houseDesc,
        houseOwner: this.data.model.houseOwner,
        houseOwnerIDNum: this.data.model.houseOwnerIDNum,
        isRent: this.data.model.isRent,
        isPayRent:false,
        nextPayDate:nextPayDate,
        lastPayDate: this.data.model.isRent ? this.data.model.rentStartTime : '',
        ownerPhone: this.data.model.ownerPhone,

        rentPrice: this.data.model.rentPrice,
        renter: this.data.model.isRent ? this.data.model.renter:'',
        renterIDNum: this.data.model.isRent ? this.data.renterIDNum:'',
        renterPhone: this.data.model.isRent ? this.data.model.renterPhone:'',
        waterNum: this.data.model.waterNum,
        rentStartTime: this.data.model.isRent ? this.data.model.rentStartTime : '',

        rentTime: this.data.model.isRent ? this.data.model.rentTime : '',
        payRange: this.data.model.payRange
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id

        wx.showToast({
          title: '更新成功',
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
          complete: (res) => {
            
           },
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
})