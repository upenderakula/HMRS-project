import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentModel } from '../department/department.model';
import { DepartmentService } from '../department/department.service';
import { EmployeeModel } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  lstRole = [{ value: 'employee', text: 'Employee' }, { text: 'Manager', value: 'manager' }, { text: 'HR-Admin', value: 'hr-admin' }];
  lstEmployee: EmployeeModel[] = [];
  lstDepartment: DepartmentModel[] = [];
  lstAdminRole: EmployeeModel[] = [];
  employeeModel = new EmployeeModel();
  title: string = "Add Employee";
  currentPage: number = 1;
  alertMessage: string = '';
  selectedReportingPerson = this.lstAdminRole[0];
  selectedRole = this.lstRole[0];
  selectedDepartment = this.lstDepartment[0];
  onRoleChange(role: any) {
    this.selectedRole = role;
  }
  onDepartmentChange(department: any) {
    this.selectedDepartment = department;
  }
  onReportingPersonChange(reportingPerson: EmployeeModel) {
    this.selectedReportingPerson = reportingPerson;
  }
  employeeForm = new FormGroup({
    departmentId: new FormControl('', Validators.required),
    emailAddress: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    reportingPerson: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  })
  get departmentId() {
    return this.employeeForm.get('departmentId');
  }
  get emailAddress() {
    return this.employeeForm.get('emailAddress');
  }
  get firstName() {
    return this.employeeForm.get('firstName');
  }
  get fullName() {
    return this.employeeForm.get('fullName');
  }
  get lastName() {
    return this.employeeForm.get('lastName');
  }
  get password() {
    return this.employeeForm.get('password');
  }
  get reportingPerson() {
    return this.employeeForm.get('reportingPerson');
  }
  get role() {
    return this.employeeForm.get('role');
  }

  constructor(
    private employeeService: EmployeeService,
    private toasterService: ToastrService,
    private deptService: DepartmentService
  ) {

  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.employeeService.getAll()
      .subscribe(response => {
        this.lstEmployee = response.map((data) => {
          return {
            employeeId: data.payload.doc.id,
            ...data.payload.doc.data() as EmployeeModel
          }
        });
        this.lstAdminRole = this.lstEmployee.filter(x => x.role != 'employee');
        let role = localStorage.getItem('role');
        let employeeId = localStorage.getItem('employeeId');
        if (role === 'manager') {
          this.lstEmployee = this.lstEmployee.filter(x => x.reportingPersonId == employeeId);
        }
        this.lstEmployee.forEach(element => {
          if (element.departmentId) {
            this.deptService.getById(element.departmentId)
              .subscribe(response => element.department = response ? response.name : '');
          }
          if (element.reportingPersonId) {
            this.employeeService.getById(element.reportingPersonId)
              .subscribe(response => {
                element.reportingPerson = response ? response.fullName : '';
              })
          }
        });
      })
    this.deptService.getAll()
      .subscribe(response => {
        this.lstDepartment = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as DepartmentModel
          }
        });
      })
  }
  addEmployee() {
    this.title = "Add Employee";
    this.employeeModel = new EmployeeModel();
    this.employeeForm.reset();
  }
  editEmployee(employeeModel: EmployeeModel) {
    this.title = "Edit Employee";
    this.employeeModel = employeeModel;
    this.selectedReportingPerson = this.lstEmployee.filter(x => x.employeeId == employeeModel.reportingPersonId)[0];
    this.selectedRole = this.lstRole.filter(x => x.value === employeeModel.role)[0];
    this.selectedDepartment = this.lstDepartment.filter(x => x.id === employeeModel.departmentId)[0];
  }
  deleteEmployee(departmentId: string) {
    if (confirm('Are you sure you want to delete')) {
      console.log(departmentId)
      this.employeeService.delete(departmentId)
        .then(response => {
          console.log(response);
          this.toasterService.success("Employee Delete successfully...")
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
      this.loadData();
    }
  }
  saveEmployee() {
    if (this.employeeModel.employeeId) {
      this.employeeModel.reportingPersonId = this.selectedReportingPerson.employeeId;
      this.employeeModel.role = this.selectedRole.value;
      this.employeeModel.departmentId = this.selectedDepartment.id;
      this.employeeService.update(this.employeeModel.employeeId, this.employeeModel)
        .then(response => {
          console.log(response);
          this.toasterService.success("Employee Update successfully....");
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
    }
    else {
      this.employeeModel.reportingPersonId = this.selectedReportingPerson.employeeId;
      this.employeeModel.role = this.selectedRole.value;
      this.employeeModel.departmentId = this.selectedDepartment.id;
      this.employeeService.create(this.employeeModel)
        .then(response => {
          console.log(response);
          this.toasterService.success(" Employee Created successfully....")
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
    }
    this.employeeModel = new EmployeeModel();
    this.loadData();
  }
}

