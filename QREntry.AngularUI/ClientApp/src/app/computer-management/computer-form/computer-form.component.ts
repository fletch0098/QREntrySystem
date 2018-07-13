import { Component, OnInit, Input } from '@angular/core';
import { Computer } from '../computer';
import { Memory } from '../computer';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComputerService } from '../computer.service';
import { MemoryService } from '../memory/memory.service';

@Component({
  selector: 'app-computer-form',
  templateUrl: './computer-form.component.html',
  styleUrls: ['./computer-form.component.css']
})

export class ComputerFormComponent implements OnInit {

  @Input() model: Computer;

  memoryList: any;

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private computerService: ComputerService,
    private location: Location,
    private memoryService: MemoryService,

  ) {  }

  ngOnInit() {
    this.getMemorys();
  }

  getMemorys() {
    this.memoryService.getMemorys().subscribe(data => {
      this.memoryList = data;
    });
  }

  onSubmit() {

    console.log(this.model.computerId);
    console.log(this.model);
    if (this.model.computerId != null) {
      this.computerService.updateComputer(this.model)
        .subscribe(() => this.goBack());
    }
    else {
      this.computerService.addComputer(this.model)
        .subscribe(() => this.goBack());
    }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  goBack(): void {
    this.location.back();
  }

}

