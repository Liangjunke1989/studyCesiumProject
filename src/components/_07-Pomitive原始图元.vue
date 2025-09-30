<template>
  <div>
    <h1>LJK_学习Cesium笔记_07Promitive图元</h1>
  </div>
  <button @click="toDel">删除</button>
  <div id="cesium-viewer">
  </div>

</template>

<script setup>
import * as Cesium from 'cesium';
import {markRaw, onMounted} from "vue";

//entity: 实体
//调用方便，封装完美
//是基于primitive的封装

//primitive: 原生图元
//更接近底层，更自由，更灵活
//由几何实例和材质组成(Gemetry几何形状、Apperance外观)
//很多要素时候，使用primitive会比entity更快


let viewer, data;
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
  console.log("-------------------02、primitives原始图元-------------------------")
  // const instance=new Cesium.GeometryInstance({
  //   geometry: new Cesium.EllipseGeometry({//创建椭圆
  //     center: homePos,
  //     semiMinorAxis: 50.0,
  //     semiMajorAxis: 100.0,
  //     rotation:Cesium.Math.toRadians(45.0),
  //     vertexFormat: Cesium.VertexFormat.POSITION_AND_ST
  //   }),
  //   id: 'ellipse'
  // });
  // viewer.scene.primitives.add(new Cesium.Primitive({
  //   geometryInstances: instance,
  //   appearance: new Cesium.EllipsoidSurfaceAppearance({
  //     material: Cesium.Material.fromType('Checkerboard')
  //   })
  // }))
  // viewer.zoomTo(instance)
  console.log("-------------------03、primitives图元-------------------------")
  const primitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({//几何实例
      geometry: new Cesium.BoxGeometry({
        minimum: homePos,
        maximum: Cesium.Cartesian3.add(homePos, new Cesium.Cartesian3(50, 50, 50), new Cesium.Cartesian3()),
        vertexFormat: Cesium.VertexFormat.POSITION_AND_ST
      }),
      id: 'box'
    }),
    appearance: new Cesium.EllipsoidSurfaceAppearance({//材质
      // material: Cesium.Material.fromType('Water')
      material: new Cesium.Material({
        fabric: {
          type: 'color',
          uniforms: {
            color: new Cesium.Color(0.0, 0.0, 1.0, 0.5)
          }
        }
      })
    })
  });
  viewer.scene.primitives.add(primitive);
  await viewer.zoomTo(point);
})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
