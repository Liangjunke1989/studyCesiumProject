<template>
  <div>
    <h1>LJK_学习Cesium笔记_02坐标转换</h1>
  </div>
  <div id="cesium-viewer">
  </div>
</template>

<script setup>
import * as Cesium from 'cesium';
import {onMounted} from "vue";

const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZDY5MDU2ZS1mZTdlLTQzMmUtOGVlNC05NWM0ZDQ3MTUwNmIiLCJpZCI6MzQ0NzIxLCJpYXQiOjE3NTg4NTY4MDN9.TdrDuDBUqo2ZGzQ-sDUIJvBu8KqS5KSO6nx1s88OkQQ';
onMounted(async () => {
  Cesium.Ion.defaultAccessToken = myToken;
  //cesium中所有的API的开始
  const viewer = new Cesium.Viewer('cesium-viewer', {
    baseLayerPicker: false,//隐藏底图选择器
    geocoder: false,//隐藏搜索框
    homeButton: false,//隐藏home按钮
    infoBox: false,//隐藏信息框
    sceneModePicker: false,//隐藏场景模式选择器
    navigationHelpButton: false,//隐藏帮助按钮
    fullscreenButton: false,//隐藏全屏按钮
    timeline: false,//隐藏时间轴
    animation: false,//隐藏动画
    vrButton: false,//隐藏VR按钮
    navigationInstructionsInitiallyVisible: false,//隐藏导航提示
    //隐藏cesium ion logo
    //通过隐藏样式来隐藏
  })
  console.log("----------------1.笛卡尔坐标系-----------------------");
  let originPoint = new Cesium.Cartesian3(0,0,0);//笛卡尔坐标
  console.log(originPoint);
  console.log("\n")
  console.log("----------------2.将经纬度转成笛卡尔坐标--------------");
  //将经纬度转成笛卡尔坐标
  let CartesianPos =Cesium.Cartesian3.fromDegrees(114,30,100)//经纬度,高度
  console.log("CartesianPos:",CartesianPos);
  let CartesianPos2 =Cesium.Cartesian3.fromDegrees(114,30,120)//经纬度,高度
  console.log("CartesianPos2:",CartesianPos2);
  console.log("\n")
  console.log("----------------3.将笛卡尔坐标转成经纬度坐标（需要中间使用弧度坐标进行转换）--");
  console.log("----------------3.1 将笛卡尔坐标转成弧度坐标系-----------");
  //将经纬度转成弧度坐标系
  let CartographicPos = Cesium.Cartographic.fromDegrees(114,30,100);//经纬度,高度
  console.log("CartographicPos:",CartographicPos);

  let CartographicPos2 = Cesium.Cartographic.fromCartesian(CartesianPos);//经纬度,高度
  console.log("CartographicPos2:",CartographicPos2);
  let CartographicPos3 = Cesium.Cartographic.fromCartesian(CartesianPos2);//经纬度,高度
  console.log("CartographicPos3:",CartographicPos3);
  console.log("---------------3.2 将弧度坐标转成经纬度坐标（原始）------------")
  let lon=180/Math.PI*CartographicPos.longitude;
  let lat=180/Math.PI*CartographicPos.latitude;
  console.log("lon:",lon);
  console.log("lat:",lat);
  let lon2=180/Math.PI*CartographicPos2.longitude;
  let lat2=180/Math.PI*CartographicPos2.latitude;
  console.log("lon2:",lon2);
  console.log("lat2:",lat2);
  console.log("---------------3.2 将弧度坐标转成经纬度坐标（自带api）------------")
  let lon3=Cesium.Math.toDegrees(CartographicPos.longitude);
  let lat3=Cesium.Math.toDegrees(CartographicPos.latitude);
  console.log("lon3:",lon3);
  console.log("lat3:",lat3);
  let lon4=Cesium.Math.toDegrees(CartographicPos2.longitude);
  let lat4=Cesium.Math.toDegrees(CartographicPos2.latitude);
  console.log("lon4:",lon4);
  console.log("lat4:",lat4);

  console.log("----------------遗留拓展问题--------------");
  // js的精度问题?
  console.log("js的小数精度问题？");
  console.log(0.1+0.2);
  console.log(0.1+0.2==0.3);//false
  //怎么解决js的精度问题？
  var flaot01 = (0.1+0.2).toFixed(1);
  console.log(flaot01==0.3);

})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
