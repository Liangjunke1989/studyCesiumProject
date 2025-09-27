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
  //entity: 实体
  console.log("-------------------01、设置相机的初始位置-------------------------");
  //设置中国的初始位置
  const originPos0 = Cesium.Cartesian3.fromDegrees(0, 0, 0);
  viewer.camera.setView({
    destination: originPos0,//设置相机目的地，初始化相机的初始位置
    orientation: {
      heading: Cesium.Math.toRadians(0),//Radians弧度
      pitch: Cesium.Math.toRadians(-45),
      roll: 0
    }
  })
  console.log("-------------------2.1、设置相机的缩放到的目标点（写法一）-------------------------");
  const originPos = new Cesium.Cartesian3(116.766689, 35.9686000, 100);
  const homePos = Cesium.Cartesian3.fromDegrees(116.76666, 35.969522, 0);
  const point = new Cesium.Entity({
    position: homePos,//将经纬度转成笛卡尔坐标
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED
    }
  })
  // //声明创建 点
  // viewer.entities.add(point);//添加点
  //viewer.zoomTo(point)

  console.log("-------------------2.2、设置相机的缩放到的目标点（写法二）-------------------------");
  //声明创建 点
  const point02 = viewer.entities.add({
    id: 'point02',
    position: homePos,
    point: {
      pixelSize: 50,
      color: Cesium.Color.BLUE.withAlpha(0.25)
    },
  })
  //viewer.zoomTo(point02)
  // setTimeout(()=>{
  //   viewer.flyTo(point02, {
  //     duration: 3
  //   })
  // },2000)

  console.log("-------------------3、设置目标点的图标-------------------------");
  //创建图标
  const billboard = viewer.entities.add({
    id: 'billboard',
    position: homePos,
    billboard: {
      image: '/src/assets/location.png',
      scale: 0.05,
      color: Cesium.Color.YELLOW,
      // horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      // pixelOffset: new Cesium.Cartesian2(0, -10)
    }
  })
  // viewer.camera.lookAt(point.position,
  //     new Cesium.HeadingPitchRange(0, -Cesium.Math.toRadians(90), 20));

  console.log("-------------------4、设置目标点的标题（label）-------------------------");
  const label = viewer.entities.add({
    id: 'label',
    position: homePos,
    label: {
      text: 'LJK_Home',
      font: '20px sans-serif',
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      backgroundColor: new Cesium.Color(255, 255, 0),
      fillColor: Cesium.Color.BROWN,
      outlineWidth: 40,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, 80)
    }
  })
  //viewer.zoomTo(label);
  // setTimeout(()=>{
  //   viewer.flyTo(label, {
  //     duration: 3
  //   })
  // },2000)

  console.log("-------------------5、设置目标线-------------------------");
  const line = viewer.entities.add({
    id: 'line',
    polyline: {
      positions:Cesium.Cartesian3.fromDegreesArray([
          116.766689, 35.969522,
          116.766689, 35.969722,
          116.766889, 35.969722,
      ]),
      width: 80,
      material: Cesium.Color.BROWN.withAlpha(0.5)

    }
  })
  console.log(line.polyline.positions)
  viewer.zoomTo(label);

  console.log("-------------------6、设置目标面-------------------------");
  const polygon = viewer.entities.add({
    id: 'polygon',
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        116.766689, 35.969522,
        116.766689, 35.969722,
        116.766889, 35.969722,
        116.766889, 35.969522,
      ]),
      outlineWidth: 20,
      material: Cesium.Color.YELLOW
    }
  })

  console.log("-------------------7.1、设置目标立方体(多边形挤出)-------------------------");
  const polygon02 = viewer.entities.add({
    id: 'polygon02',
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        116.766689, 35.969522,
        116.766689, 35.969722,
        116.766889, 35.969722,
        116.766889, 35.969522,
      ]),
      material: Cesium.Color.AQUA.withAlpha(0.6),
      extrudedHeight: 10,
      height: 2,
      outline: true,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 200,
      shadows: Cesium.ShadowMode.ENABLED,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      zIndex: 1
    }
  })
  console.log("-------------------7.2、设置目标立方体（矩形）-------------------------");
  const rectangle = viewer.entities.add({
    id: 'rectangle',
    position: homePos,
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
          116.766579, 35.969522,
          116.766879, 35.969822
      ),
      material: '/src/assets/ljk.png',
      outline: true,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 20,
      extrudedHeight: 10,
    }
  })

  console.log("-------------------7.3、设置目标立方体(自带box)-------------------------");
  const box = viewer.entities.add({
    id: 'box',
    position: homePos,
    box: {
      dimensions: new Cesium.Cartesian3(20, 15, 5),
      material: Cesium.Color.WHITE.withAlpha(0.35),
      outline: true,
      outlineColor: Cesium.Color.WHITE,
    }
   })


  console.log("-------------------7.4、设置其他目标（如：椭圆）-------------------------");
  const ellipse = viewer.entities.add({
    id: 'ellipse',
    position: homePos,
    ellipse: {
      semiMajorAxis: 20,
      semiMinorAxis: 15,
      material: Cesium.Color.RED.withAlpha(0.15),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
      extrudedHeight: 5,
      rotation: Cesium.Math.toRadians(45),
      height: 2,
    }
  })


  console.log("-------------------8、设置目标点的标题的Button事件（label）-------------------------");
  // label的Button事件
  viewer.screenSpaceEventHandler.setInputAction(function (movement) {
    if (Cesium.defined(movement.position)) {
      const pickedObject = viewer.scene.pick(movement.position);
      // 判断是否点击了label
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'label') {
        console.log('点击了label');
      }
      // 判断是否点击了图标
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'billboard') {
        console.log('点击了图标');
      }
      // 判断是否点击了点
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'point02') {
        console.log('点击了点');
      }
      // 判断是否点击了线
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'line') {
        console.log('点击了线');
      }
      // 判断是否点击了面
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'polygon') {
        console.log('点击了面');
      }
      // 判断是否点击了立方体
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'polygon02') {
        console.log('点击了立方体');
      }
      // 判断是否点击了BOX
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'box') {
        console.log('点击了BOX');
      }
      // 判断是否点击了椭圆
      if (Cesium.defined(pickedObject) && pickedObject.id.id === 'ellipse') {
        console.log('点击了椭圆');
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
})
</script>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
