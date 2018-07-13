import { Component, OnInit } from '@angular/core';
import { Computer } from '../computer';
import { ComputerService } from '../computer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  computers: Computer[] = [];

  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.getComputers();
  }

  dashboardfilter(computer: Computer, index, array) {
    return (computer.memory.sizeGb >= 16);
}

  getComputers(): void {
    this.computerService.getComputers()
      //.subscribe(computers => this.computers = computers.slice(0, 4));
      .subscribe(computers => this.computers = computers.filter(this.dashboardfilter));
  }
}
