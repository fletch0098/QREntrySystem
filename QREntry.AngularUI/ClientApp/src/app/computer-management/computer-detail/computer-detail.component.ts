import { Component, OnInit, Input, ViewEncapsulation   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Computer } from '../computer';
import { ComputerService } from '../computer.service';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class ComputerDetailComponent implements OnInit {

  computer: Computer;

  constructor(
    private route: ActivatedRoute,
    private computerService: ComputerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getComputer();
  }

  getComputer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.computerService.getComputer(id)
      .subscribe(computer => this.computer = computer);
  }

  goBack(): void {
    this.location.back();
  }
}
