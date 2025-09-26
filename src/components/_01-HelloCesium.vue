<template>
  <div>
    <h1>LJK_学习Cesium笔记_01初识Cesium</h1>
  </div>

  <!--  <div id="cesium-toolbar">-->
  <!--    toolbar-->
  <!--  </div>-->
  <div id="cesium-viewer">
  </div>
</template>

<script setup>
import * as Cesium from 'cesium';
import { onMounted } from "vue";

onMounted(async () => {
  const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZDY5MDU2ZS1mZTdlLTQzMmUtOGVlNC05NWM0ZDQ3MTUwNmIiLCJpZCI6MzQ0NzIxLCJpYXQiOjE3NTg4NTY4MDN9.TdrDuDBUqo2ZGzQ-sDUIJvBu8KqS5KSO6nx1s88OkQQ';
  Cesium.Ion.defaultAccessToken = myToken;

  // const esri = new Cesium.ArcGisMapServerImageryProvider({
  //   url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  //   enablePickFeatures: false,
  // });

  // const viewer = new Cesium.Viewer('cesium-viewer', {
  //   imageryProvider: esri,
  //   terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1), // 使用新的地形提供方式
  //   requestWaterMask: true,
  // });
  //cesium 中所有的API的开始
  const viewer = new Cesium.Viewer('cesium-viewer',{
    baseLayerPicker:false,//隐藏底图选择器
    geocoder:false,//隐藏搜索框
    homeButton:false,//隐藏home按钮
    infoBox:false,//隐藏信息框
    sceneModePicker:false,//隐藏场景模式选择器
    navigationHelpButton:false,//隐藏帮助按钮
    fullscreenButton:false,//隐藏全屏按钮
    timeline:false,//隐藏时间轴
    animation:false,//隐藏动画
    vrButton:false,//隐藏VR按钮
    navigationInstructionsInitiallyVisible:false,//隐藏导航提示
    //隐藏cesium ion logo
    //通过隐藏样式来隐藏
  })
  console.log(Cesium);
})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
