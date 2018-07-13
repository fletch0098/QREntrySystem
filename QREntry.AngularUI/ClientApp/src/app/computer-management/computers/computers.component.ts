import { Component, OnInit } from '@angular/core';

import { Computer } from '../computer';
import { ComputerService } from '../computer.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {
  computers: Computer[];

  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.getComputers();
  }

  getComputers(): void {
    this.computerService.getComputers()
      .subscribe(computers => this.computers = computers);
  }

  delete(computer: Computer): void {
    this.computers = this.computers.filter(h => h !== computer);
    this.computerService.deleteComputer(computer).subscribe();
  }

}
