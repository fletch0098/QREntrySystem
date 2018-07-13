import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';

import { ComputerManagementComponent } from '../computer-management/computer-management.component';
import { ComputersComponent } from '../computer-management/computers/computers.component';
import { ComputerDetailComponent } from '../computer-management/computer-detail/computer-detail.component';
import { ComputerService } from './computer.service';

import { AddMemoryComponent } from './memory/add-memory/add-memory.component';
import { MemoryDetailComponent } from './memory/memory-detail/memory-detail.component';
import { MemoryComponent } from './memory/memory.component';

import { ComputerManagementRoutingModule } from './computer-management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComputerSearchComponent } from './computer-search/computer-search.component';
import { AddComputerComponent } from './add-computer/add-computer.component';
import { MemoryService } from './memory/memory.service';
import { ComputerFormComponent } from './computer-form/computer-form.component';
import { MemoryFormComponent } from './memory/memory-form/memory-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComputerManagementRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  declarations: [
    ComputerManagementComponent,
    ComputersComponent,
    ComputerDetailComponent,
    DashboardComponent,
    ComputerSearchComponent,
    AddComputerComponent,
    ComputerFormComponent,
    AddMemoryComponent, MemoryDetailComponent, MemoryComponent, MemoryFormComponent, NavBarComponent
  ],
  providers: [ComputerService, MemoryService]
})
export class ComputerManagementModule { }
