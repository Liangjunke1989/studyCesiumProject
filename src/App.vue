<template>
  <div>
    <h1>LJK_学习Cesium笔记</h1>
  </div>

  <!--  <div id="cesium-toolbar">-->
  <!--    toolbar-->
  <!--  </div>-->
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
  const position = Cesium.Cartesian3.fromDegrees(114,30,1000);
  viewer.camera.setView({
    destination: position//设置相机目的地，初始化相机的初始位置
  })
  //相机的三个方向
  //orientation用来设定相机的方向，默认是lookat
  //orientation用来控制相机的heading(偏航角), pitch(仰俯角), roll(翻滚角)，相机镜头当前浏览器窗口所在的方位
  //绕Y轴旋转：yaw    ----摇头
  //绕X轴旋转：pitch  ----俯仰
  //绕Z轴旋转：roll   ----翻滚



})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
