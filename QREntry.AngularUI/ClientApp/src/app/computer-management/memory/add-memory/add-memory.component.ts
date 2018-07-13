import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Memory } from '../../computer';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.css']
})
export class AddMemoryComponent implements OnInit {

  memory: Memory = new Memory();

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

  }

  goBack(): void {
    this.location.back();
  }
}
