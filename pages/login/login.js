Page({
  
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  doLogin:function(callback = () =>{}){
    let that = this;
    wx.login({
      success:function(loginRes){
        if(loginRes){
          //获取用户信息-重点，重点，重点，重点，重点，重点，重点，重点！！！
          wx.getUserProfile({
            withCredentials:true,//非必填  默认为true
            success:function(infoRes){
              console.log(infoRes,'>>>');
              //请求服务端的登录接口
              wx.request({
                url: api.loginUrl,
                data:{
                  code:loginRes.code,//临时登录凭证
                  rawData:infoRes.rawData,//用户非敏感信息
                  signature:infoRes.signature,//签名
                  encrypteData:infoRes.encryptedData,//用户敏感信息
                  iv:infoRes.iv//解密算法的向量
                },
                success:function(res){
                  console.log('login success');
                  res = res.data;
                  if(res.result==0){
                    that.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo',JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag',res.skey);
                    console.log("skey="+res.skey);
                    callback();
                  }else{
                    that.showInfo('res.errmsg');
                  }
                },
                fail:function(error){
                  //调用服务端登录接口失败
                 // that.showInfo('调用接口失败');
                  console.log(error);
                }
              });
            }
          });
        }else{
         //不用管，这是授权获取信息之后直接获取的代码，不用管对于这次更新
        }
      }
    });
  },
})