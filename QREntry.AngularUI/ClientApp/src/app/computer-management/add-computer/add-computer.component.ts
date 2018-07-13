import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Computer } from '../computer';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.css']
})

export class AddComputerComponent implements OnInit {

  computer: Computer = new Computer();

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
