export class Computer {
  computerId: number;
  configuracionName: string;
  memoryId: number;
  memory: Memory;
  processor: string;
  hardDrive: string;
  lastModified: string;
}

export class Memory {
  memoryId: number;
  brand: string;
  sizeGb: number;
  speed: string;
  lastModified: string;
}
//[{
//  "computerId": 1, "configuracionName": "The Basic", "memoryId": 1, "processor": "AMD", "hardDrive": "512GB HDD",
//  "lastModified": "2018-04-03T19:32:58.9696013", "memory": {
//    "memoryId": 1, "brand": "Crucial", "sizeGb": 8, "speed": "DDR3-1600",
//    "lastModified": "2018-04-03T19:32:58.9570134", "computers": []
//  }
//}
