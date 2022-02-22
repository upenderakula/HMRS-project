import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { EmployeeDetailsComponent } from "./employee-details.component";
import { EmployeeComponent } from "./employee.component";
import { EmployeeService } from "./employee.service";

const routes: Route[] = [

    {
        path: ':employeeId',
        component: EmployeeDetailsComponent
    },
    {
        path: '',
        component: EmployeeComponent
    }
]
@NgModule({
    declarations: [EmployeeComponent, EmployeeDetailsComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        RouterModule.forChild(routes)
    ],
    providers: [EmployeeService],
    bootstrap: []

})

export class EmployeeModule {

}