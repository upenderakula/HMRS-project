import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DepartmentService } from "../department/department.service";
import { EmployeeService } from "../employee/employee.service";
import { LeaveModel } from "./leave.model";
import { LeaveService } from "./leave.service";


@Component({
    selector: 'leave-details',
    templateUrl: './leave-details.component.html'
})
export class LeaveDetailsComponent implements OnInit {
    leaveModel = new LeaveModel();
    constructor
        (
            private activatedRoute: ActivatedRoute,
            private leaveService: LeaveService,
            private empService: EmployeeService,
            private deptService: DepartmentService,
    ) {

    }

    ngOnInit(): void {
        let leaveId = this.activatedRoute.snapshot.paramMap.get('leaveId');
        console.log(leaveId);
        this.leaveService.getById(leaveId)
            .subscribe(response => {
                this.leaveModel = response;
                console.log(response);
                this.empService.getById(response.employeeId)
                    .subscribe(empResponse => {
                        this.leaveModel.employeeName = empResponse.fullName;
                        this.leaveModel.emailId = empResponse.emailAddress;
                    });
                this.empService.getById(response.reportingPersonId)
                    .subscribe(repResponse => {
                        this.leaveModel.reportingPerson = repResponse.fullName;
                    });
                this.deptService.getById(response.departmentId)
                    .subscribe(deptResponse => {
                        this.leaveModel.department = deptResponse.name;
                    });

            })
    }

}