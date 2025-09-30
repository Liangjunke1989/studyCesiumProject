<template>
  <div>
    <h1>LJK_学习Cesium笔记_04创建物体</h1>
  </div>
  <button @click="toDel">删除</button>
  <button @click="toReset">重置</button>
  <div id="cesium-viewer">
  </div>

</template>

<script setup>
import * as Cesium from 'cesium';
import {markRaw, onMounted} from "vue";

let viewer, data, handler,myLine;
const toDel = () => {
  viewer.entities.removeAll();//删除所有实体

}
const toReset = () => {
  //重置鼠标点击事件
  //todo: 待完善
}

const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZDY5MDU2ZS1mZTdlLTQzMmUtOGVlNC05NWM0ZDQ3MTUwNmIiLCJpZCI6MzQ0NzIxLCJpYXQiOjE3NTg4NTY4MDN9.TdrDuDBUqo2ZGzQ-sDUIJvBu8KqS5KSO6nx1s88OkQQ';
onMounted(async () => {//挂载时执行
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
  // 3DTiles 加载倾斜摄影数据
  const tileset02 = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(69380),
  );
  await viewer.flyTo(tileset02)

  console.log("-------------------03、设置鼠标交互事件-------------------------")

  let pointArray = [];
  //绘制多边形
  myLine = viewer.entities.add({
    polyline: {
      positions:[],
      with:20,
      material: Cesium.Color.BLUE.withAlpha(0.5),
    },
  });
  let polygonPointArray = [];
  // let myPolygon=viewer.entities.add({
  //   polygon: {
  //     hierarchy: Cesium.Cartesian3.fromDegreesArray([
  //       116.766689, 35.969522,
  //       116.766689, 35.969722,
  //       116.766889, 35.969722,
  //       116.766889, 35.969522,
  //     ]),
  //     material: Cesium.Color.BLUE.withAlpha(0.5),
  //   },
  // });
  let myPolygon = markRaw(viewer.entities.add({
    polygon: {
      hierarchy: [], // 初始为空
      material: Cesium.Color.BLUE.withAlpha(0.5),
    },
  }));
  myPolygon.show = false;
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(async (event) => {
    const pickPos = viewer.scene.pickPosition(event.position);//获取点击位置的经纬度

    console.log( pickPos);
    if (Cesium.defined(pickPos)) {
      const cartographic = Cesium.Cartographic.fromCartesian(pickPos);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude);
      const latitude = Cesium.Math.toDegrees(cartographic.latitude);
      const height = cartographic.height;
      console.log('经度：' + longitude + '  纬度：' + latitude + '  高度：' + height);

      const point = viewer.entities.add({
        // id: 'pickPoint',
        position: pickPos,
        point: {
          pixelSize: 50,
          color: Cesium.Color.BLUE.withAlpha(0.25)
        },
      })
    }
    pointArray.push(pickPos);
    myLine.polyline.positions = pointArray;
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);//鼠标左击事件

  handler.setInputAction(async (event) => {
    // 添加参数检查
    if (!event.position) {
      console.warn('Missing position in right click event');
      return;
    }

    // 将 event.endPosition 改为 event.position
    const pickPos = viewer.scene.pickPosition(event.position);



    //绘制多边形
    if (pointArray.length > 2){
      pointArray.push(pointArray[0]);
      // 提取经纬度数组
      const degreesArray = [];
      for (let i = 0; i < pointArray.length; i++) {
        const cartographic = Cesium.Cartographic.fromCartesian(pointArray[i]);
        if (cartographic) {
          degreesArray.push(Cesium.Math.toDegrees(cartographic.longitude));
          degreesArray.push(Cesium.Math.toDegrees(cartographic.latitude));
        }
      }
      if (degreesArray.length >= 6) { // 至少3个点
        myPolygon.polygon.hierarchy = new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(degreesArray)
        );
        myPolygon.show = true;
      }
    } else {
      console.log("请至少绘制三个点！")
    }
    // 鼠标右击事件,结束绘制
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    console.log("已结束点击事件！");
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);



})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
