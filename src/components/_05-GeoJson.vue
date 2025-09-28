<template>
  <div>
    <h1>LJK_学习Cesium笔记_05GeoJson(使用turf插件)</h1>
  </div>
  <button @click="toDel">删除</button>
  <div id="cesium-viewer">
  </div>

</template>

<script setup>
import * as Cesium from 'cesium';
import {markRaw, onMounted} from "vue";
import * as turf from '@turf/turf';
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
  const point = viewer.entities.add({
    id: 'point',
    position: homePos,
    point: {
      pixelSize: 50,
      color: Cesium.Color.BLUE.withAlpha(0.25)
    },
  })

  viewer.zoomTo(point)
  console.log("-------------------02、创建线-------------------------")
  const linesString1 = turf.lineString([
    [116.766689, 35.969522],
    [116.766889, 35.969722]
  ], {name: 'line1'});
  const promise = Cesium.GeoJsonDataSource.load(linesString1);//加载数据源
  console.log("promise数据已经成功加载完成:",promise)
  console.log("-------------------2.1、promise.then加载后返回数据，不阻塞-------------------------")
  await viewer.dataSources.add(promise);
  console.log("创建线完成！")
  // promise.then(function (dataOrigin) {//加载完成后返回的数据
  //   data=dataOrigin;
  //   //  01、根据数据源，直接创建实体
  //   // data.entities.values.forEach(function (entity) {
  //   //   viewer.entities.add(entity);
  //   //   console.log("Value:",entity.polyline.positions.getValue());
  //   // })
  //   console.log("内部执行时1：",dataOrigin.entities.owner.entities.values.length);//promise中的数据加载完成，此时数据源中的数据已经加载完成
  //   console.log("promise完成加载后：",data.entities.values[0].polyline.positions.getValue());
  //   // 02、根据数据源，创建实体
  //   viewer.dataSources.add(data).then(() =>{//等待 viewer.dataSources加载数据完成
  //     console.log("内部执行时3：",viewer.dataSources.length);//1 未加载完成
  //     console.log("viewer.dataSources添加过数据后：",viewer.dataSources.get(0).entities.values[0].polyline.positions.getValue())
  //   });
  //   console.log("内部执行时2：",viewer.dataSources.length);//0 未加载完成
  // })

  // console.log("--------2.2、 promise中的dataOrigin的entities 和 viewer.dataSource中的entities区别-------")
  // console.log("========1.1使用原始数据======")
  // const dataRes =await promise;//等待promise完成,获取promise中的数据
  // console.log("promise的原始数据：",dataRes.entities.values[0].polyline.positions.getValue())//等待promise完成，获取原始数据中的数据
  // console.log("========1.2使用原始数据======")
  // console.log("promise的原始数据的长度为：",dataRes.entities.values.length)//获取原始数据的长度
  // console.log("========2.1使用备份生成数据======")
  // await viewer.dataSources.add(data);//等待viewer.dataSources加载完数据
  // console.log("外部指定，等待后，viewer.dataSources的数据:",viewer.dataSources.get(0).entities.values)

  console.log("-------------------03、创建多边形-------------------------")
  const polygonString = turf.polygon( [[
        [116.766689, 35.969522],
        [116.766689, 35.969722],
        [116.766889, 35.969722],
        [116.766889, 35.969522],
        [116.766689, 35.969522]//闭合图形
      ]],//四个点的坐标
      {name: 'polygon1'});
  const promisePolygon = Cesium.GeoJsonDataSource.load(polygonString);
  await promisePolygon;
  await viewer.dataSources.add(promisePolygon);
  console.log("创建多边形完成！")

  //等待10s后
  setTimeout(()=>{
    // console.log("等待后，外部执行1：",data.entities.values[0].polyline.positions.getValue())//原始数据和备份数据源无影响，外部数据源对绘图没有影响
    // data=null;
    //viewer.dataSources加入数据后，可以绘制出线---------本节核心
    console.log("等待后，viewer.dataSources的数据:",viewer.dataSources.get(0).entities.values[0].polyline.positions.getValue())//viewer.dataSources中的数据受影响
    viewer.entities.removeAll();//删除所有实体,没有删除viewer.dataSources中的数据
    viewer.dataSources.removeAll();//删除所有数据源中的数据
  },10000)

})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
