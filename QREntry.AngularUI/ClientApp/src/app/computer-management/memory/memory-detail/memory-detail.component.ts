import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MemoryService } from '../memory.service';
import { Memory } from '../../computer';

@Component({
  selector: 'app-memory-detail',
  templateUrl: './memory-detail.component.html',
  styleUrls: ['./memory-detail.component.css']
})
export class MemoryDetailComponent implements OnInit {

  memory: Memory;

  constructor(
    private route: ActivatedRoute,
    private memoryService: MemoryService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMemory();
  }

  getMemory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.memoryService.getMemory(id)
      .subscribe(memory => this.memory = memory);
  }

  goBack(): void {
    this.location.back();
  }
}
