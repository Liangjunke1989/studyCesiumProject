<template>
  <div>
    <h1>LJK_学习Cesium笔记_083DTiles加载3D模型</h1>
  </div>
  <button @click="toDel">删除</button>
  <div id="cesium-viewer">
  </div>

</template>

<script setup>
import * as Cesium from 'cesium';
import {markRaw, onMounted} from "vue";

let viewer, data;
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
  const point = viewer.entities.add({
    id: 'point',
    position: homePos,
    point: {
      pixelSize: 50,
      color: Cesium.Color.BLUE.withAlpha(0.25)
    },
  })
  // viewer.zoomTo(point)
  console.log("-------------------02、3DTiles加载-------------------------")
  //夜景影像
  // const layer = viewer.imageryLayers.addImageryProvider(
  //     await Cesium.IonImageryProvider.fromAssetId(3812),
  // );
  // 3DTiles 纽约3D城市白模
  const tilesets = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(75343),
  );
  const tilesetsOffline = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: '/src/assets/b3dm/tileset.json',
      }),
  );
  // await viewer.flyTo(tilesetsOffline)

  //await viewer.zoomTo(tilesets);

})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
