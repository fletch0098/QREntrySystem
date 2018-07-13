// globals.ts
import { Injectable } from '@angular/core';

@Injectable()

export class Globals {
  title: string = "Computer App";
  //baseURL: string = 'https://computerwebapi20180331072552.azurewebsites.net/';
  baseURL: string = 'http://localhost:53467/';
  //baseURL: string = 'http://localhost:61760/';
}
