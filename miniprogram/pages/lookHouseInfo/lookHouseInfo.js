// pages/lookHouseInfo/lookHouseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: Object,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
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
        console.log('shuju===' + JSON.stringify(res));
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
})