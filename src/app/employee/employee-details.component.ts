import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DepartmentService } from "../department/department.service";
import { EmployeeModel } from "./employee.model";
import { EmployeeService } from "./employee.service";


@Component({
    selector: 'employee-details',
    templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent implements OnInit {
    employeeModel = new EmployeeModel();
    constructor(
        private activatedRoute: ActivatedRoute,
        private employeeService: EmployeeService,
        private deptService: DepartmentService
    ) { }

    ngOnInit(): void {
        let departmentId = this.activatedRoute.snapshot.paramMap.get('employeeId');
        this.employeeService.getById(departmentId)
            .subscribe(response => {
                this.employeeModel = response;
                console.log('121');
                this.deptService.getById(response.departmentId)
                    .subscribe(deptResponse => this.employeeModel.department = deptResponse.name);
                this.employeeService.getById(response.reportingPersonId)
                    .subscribe(empResponse => this.employeeModel.reportingPerson = empResponse.fullName);
            })
    }

}