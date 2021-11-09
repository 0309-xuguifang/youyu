Page({
  onLoad(){
    wx.cloud.callFunction({
      name:'getLogin'
    })
    .then(res=>{
      console.log('云函数获取数据成功',res)
    })
    .catch(err=>{
      console.log('云函数获取数据失败',err)
    })
  },
  data: {
    active: 0,
    icon1: {
      normal: '../../images/detail.png',
      active: '../../images/detail2.png',
    },
    icon2:{
      normal: '../../images/statistics.png',
      active: '../../images/statistics2.png',
    },
    icon3:{
      normal: '../../images/me.png',
      active: '../../images/me2.png',
    }
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  onClick(event) {
    wx.showToast({
      title: '点击标签 ${event.detail + 1}',
      icon: 'none',
    });
  },
})