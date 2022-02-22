import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department/department.service';
import { EmployeeModel } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employee = new EmployeeModel();
  constructor(private empService: EmployeeService, private deptService: DepartmentService) {

  }

  ngOnInit(): void {
    let employeeId = localStorage.getItem('employeeId');
    console.log(employeeId);
    this.empService.getById(employeeId)
      .subscribe(
        (response) => {
          this.employee = response
          this.deptService.getById(response.departmentId)
            .subscribe(deptResponse => this.employee.department = deptResponse.name);
          this.empService.getById(response.reportingPersonId)
            .subscribe(empResponse => this.employee.reportingPerson = empResponse.fullName);
          console.log(response);
        });
  }
}
