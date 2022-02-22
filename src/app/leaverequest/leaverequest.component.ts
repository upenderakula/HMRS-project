
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department/department.service';
import { EmployeeService } from '../employee/employee.service';
import { LeaveModel } from '../leave/leave.model';
import { LeaveService } from '../leave/leave.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.css']
})
export class LeaveRequestComponent implements OnInit {

  lstLeave: LeaveModel[] = [];
  currentPage: number = 1;
  constructor(
    private leaveService: LeaveService,
    private empService: EmployeeService,
    private deptService: DepartmentService
  ) {

  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.leaveService.getAll()
      .subscribe(response => {
        console.log(response);
        this.lstLeave = response.map((data) => {
          return {
            leaveId: data.payload.doc.id,
            ...data.payload.doc.data() as LeaveModel
          }
        });
        let employeeId = localStorage.getItem('employeeId');
        let role = localStorage.getItem('role');
        if (role === 'manager') {
          this.lstLeave = this.lstLeave.filter(x => x.reportingPersonId === employeeId);
        }
        console.log(this.lstLeave);
        this.lstLeave.forEach(element => {
          this.empService.getById(element.employeeId)
            .subscribe(empResponse => {
              element.employeeName = empResponse.fullName;
              element.emailId = empResponse.emailAddress;
            });
          this.empService.getById(element.reportingPersonId)
            .subscribe(repResponse => {
              element.reportingPerson = repResponse.fullName;
            });
          this.deptService.getById(element.departmentId)
            .subscribe(deptResponse => {
              element.department = deptResponse.name;
            });
        });

      })
  }
  approveLeaveRequest(leaveModel: LeaveModel) {
    leaveModel.status = 'Approved';
    this.leaveService.update(leaveModel.leaveId, leaveModel);
  }
  rejectLeaveRequest(leaveModel: LeaveModel) {
    leaveModel.status = 'Rejected';
    this.leaveService.update(leaveModel.leaveId, leaveModel);
  }
}