import { Component, OnInit, Input } from '@angular/core';
import { Memory } from '.././../computer';
import { MemoryService } from '../memory.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-memory-form',
  templateUrl: './memory-form.component.html',
  styleUrls: ['./memory-form.component.css']
})
export class MemoryFormComponent implements OnInit {

  @Input() model: Memory;

  submitted = false;

  constructor(
    private memoryService: MemoryService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

  }

  onSubmit() {

    console.log(this.model.memoryId);
    console.log(this.model);
    if (this.model.memoryId != null) {
      this.memoryService.updateMemory(this.model)
        .subscribe(() => this.goBack());
    
    }
    else {
      this.memoryService.addMemory(this.model)
        .subscribe(() => this.goBack());
    }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  goBack(): void {
    this.location.back();
  }
}
