<template>
  <div>
    <h1>LJK_学习Cesium笔记_04创建物体</h1>
  </div>
  <button @click="toDel">删除</button>
  <div id="cesium-viewer">
  </div>

</template>

<script setup>
import * as Cesium from 'cesium';
import {markRaw, onMounted} from "vue";
let viewer,data;
const toDel = () => {
  //viewer.entities.removeAll();
  viewer.dataSources.remove(data);
}
const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZDY5MDU2ZS1mZTdlLTQzMmUtOGVlNC05NWM0ZDQ3MTUwNmIiLCJpZCI6MzQ0NzIxLCJpYXQiOjE3NTg4NTY4MDN9.TdrDuDBUqo2ZGzQ-sDUIJvBu8KqS5KSO6nx1s88OkQQ';
onMounted(async () => {
  Cesium.Ion.defaultAccessToken = myToken;
  //cesium中所有的API的开始
  viewer = new Cesium.Viewer('cesium-viewer', {
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
  const homePos = Cesium.Cartesian3.fromDegrees(116.76666, 35.969522, 0);

  console.log("-------------------01、设置相机的初始位置-------------------------");
  // const point = viewer.entities.add({
  //   id: 'point',
  //   position: homePos,
  //   point: {
  //     pixelSize: 50,
  //     color: Cesium.Color.BLUE.withAlpha(0.25)
  //   },
  // })
  // viewer.zoomTo(point)
  console.log("-------------------02、创建topojson-------------------------")
  // const promise = Cesium.GeoJsonDataSource.load('/src/assets/usa.topojson');
  // await viewer.dataSources.add(promise);
  //await viewer.zoomTo(promise);
  console.log("-------------------03、创建kmz-------------------------")
  // const promise02 =Cesium.KmlDataSource.load('/src/assets/gdpPerCapita2008.kmz');
  // await viewer.dataSources.add(promise02);
  //await viewer.zoomTo(promise02);
  console.log("-------------------04、创建czml-------------------------")
  const promise11 = Cesium.CzmlDataSource.load('/src/assets/MultipartVehicle_part1');
  const promise22 = Cesium.CzmlDataSource.load('/src/assets/MultipartVehicle_part2');
  const promise33 = Cesium.CzmlDataSource.load('/src/assets/MultipartVehicle_part3');
  await viewer.dataSources.add(promise11);
  await viewer.dataSources.add(promise22);
  await viewer.dataSources.add(promise33);
  await viewer.zoomTo(promise11);
})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
