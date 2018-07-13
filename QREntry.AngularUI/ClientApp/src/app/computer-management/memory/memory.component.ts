import { Component, OnInit } from '@angular/core';

import { Memory } from '../computer';
import { MemoryService } from './memory.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  memorys: Memory[];
  memory: Memory;

  constructor(private memoryService: MemoryService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getMemorys();
  }

  getMemorys(): void {
    this.memoryService.getMemorys()
      .subscribe(memorys => this.memorys = memorys);
  }

  edit(memory: Memory): void {
    this.memory = memory;
    this.location.go("add-memory");
    
  }
  add(): void {
    this.memory = new Memory();
    this.location.go("add-memory");
  }

  delete(memory: Memory): void {
    this.memorys = this.memorys.filter(h => h !== memory);
    this.memoryService.deleteMemory(memory).subscribe();
  }

}
