/// <reference types="vite/client" />

// 为高德地图定义全局类型
declare namespace AMap {
  class Map {
    constructor(container: string | HTMLElement, options?: any);
    destroy(): void;
    setFitView(markers: any): void;
    setCenter(center: [number, number]): void;
    addControl(control: any): void;
    clearMap(): void;
  }
  
  class Marker {
    constructor(options: any);
    setMap(map: Map): void;
    getPosition(): any;
    on(event: string, callback: Function): void;
  }
  
  class InfoWindow {
    constructor(options: any);
    open(map: Map, position: any): void;
  }
  
  class Icon {
    constructor(options: any);
  }
  
  class Size {
    constructor(width: number, height: number);
  }
  
  class Pixel {
    constructor(x: number, y: number);
  }
  
  class Scale {
    constructor();
  }
  
  class ToolBar {
    constructor();
  }
}

interface Window {
  AMap: typeof AMap;
}