import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveModel } from './leave.model';
import { LeaveService } from './leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  lstLeave: LeaveModel[] = [];
  leaveModel = new LeaveModel();
  title = "Add Leave";
  currentPage: number = 1;
  remainleaves: number;
  leaveForm = new FormGroup({
    leaveId: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    employeeName: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    noOfDays: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    reportingPerson: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  })
  toasterService: any;
  get leaveId() {
    return this.leaveForm.get('leaveId');
  }
  get department() {
    return this.leaveForm.get('department');
  }
  get employeeName() {
    return this.leaveForm.get('employeeName');
  }
  get emailId() {
    return this.leaveForm.get('emailId');
  }
  get description() {
    return this.leaveForm.get('description');
  }
  get fromDate() {
    return this.leaveForm.get('fromDate');
  }
  get noOfDays() {
    return this.leaveForm.get('noOfDays');
  }
  get reason() {
    return this.leaveForm.get('reason');
  }
  get reportingPerson() {
    return this.leaveForm.get('reportingPerson');
  }
  get status() {
    return this.leaveForm.get('status');
  }
  get toDate() {
    return this.leaveForm.get('toDate');
  }
  get userId() {
    return this.leaveForm.get('userId');
  }
  constructor(private leaveService: LeaveService) { }

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
        this.lstLeave.forEach(element => {
          if (element.leaveId) {
            this.leaveService.getById(element.leaveId)
              .subscribe(response => element.department = response ? response.employeeName : '');
          }
          if (element.reportingPerson) {
            this.leaveService.getById(element.reportingPerson)
              .subscribe(response => {
                element.reportingPerson = response ? response.employeeName : '';
              })
          }
        });
        let employeeId = localStorage.getItem('employeeId');
        this.lstLeave = this.lstLeave.filter(x => x.employeeId === employeeId);
        this.remainleaves = 24 - this.lstLeave.length;
        console.log(this.lstLeave);
      })
  }
  addLeave() {
    this.title = "Add Leave";
    this.leaveModel = new LeaveModel();
    this.leaveForm.reset();
  }

  days() {
    //alert("hi");
    /*  var date1 = document.getElementById("txtFromDate").value;
     var date2 = document.getElementById("txtToDate").value;
     var date3 = new Date(date1);
     var date4 = new Date(date2);
     var date_change = date4.getTime() - date3.getTime();
     var days = date_change / (1000 * 60 * 60 * 24);
     return document.getElementById("txtNoOfDays").value = days; */

  }

  saveLeave() {
    this.leaveModel.reportingPersonId = localStorage.getItem('reportingPersonId');
    this.leaveModel.departmentId = localStorage.getItem('departmentId');
    this.leaveModel.status = 'Pending';
    this.leaveModel.employeeId = localStorage.getItem('employeeId');
    this.leaveService.create(this.leaveModel)
      .then(response => {
        console.log(response);
        this.toasterService.success("Leave Created successfully....")
      })
      .catch((error: Response) => {
        console.log(error);
        this.toasterService.error(error.statusText);
      })
    this.leaveModel = new LeaveModel();
    this.loadData();
  }

}
