<template>
  <div>
    <h1>LJK_学习Cesium</h1>
  </div>

  <div id="cesium-toolbar">
    toolbar
  </div>
  <div id="cesium-viewer">

  </div>

</template>
<script setup>
import * as Cesium from 'cesium';
import {onMounted} from "vue";

onMounted(() => {
  const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZDY5MDU2ZS1mZTdlLTQzMmUtOGVlNC05NWM0ZDQ3MTUwNmIiLCJpZCI6MzQ0NzIxLCJpYXQiOjE3NTg4NTY4MDN9.TdrDuDBUqo2ZGzQ-sDUIJvBu8KqS5KSO6nx1s88OkQQ';
  Cesium.Ion.defaultAccessToken = myToken;
  const esri = new Cesium.ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    enablePickFeatures: false,
  });
  const viewer = new Cesium.Viewer('cesium-viewer', {
    imageryProvider: esri,//默认是谷歌的图层
    terrainProvider: Cesium.createWorldTerrain(
        {
          requestWaterMask: true,//水面特效
        }
    )//地形图层
  });
})

console.log(Cesium)
</script>

<style scoped>

#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
