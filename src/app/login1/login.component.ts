
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeModel } from "../employee/employee.model";
import { EmployeeService } from "../employee/employee.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginEmail: string;
  loginPassword: string;
  loginForm = new FormGroup(
    {
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    }
  )
  constructor(private employeeService: EmployeeService, private router: Router) {

  }
  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }
  login() {
    let lstEmployee: EmployeeModel[];
    this.employeeService.getAll()
      .subscribe(response => {
        lstEmployee = response.map((data) => {
          return {
            employeeId: data.payload.doc.id,
            ...data.payload.doc.data() as EmployeeModel
          }
        });

        let filterEmployee = lstEmployee.filter(x => (x.emailAddress === this.loginEmail && x.password == this.loginPassword));

        if (filterEmployee.length > 0) {

          localStorage.setItem('employeeId', filterEmployee[0].employeeId);
          localStorage.setItem('emailAddress', filterEmployee[0].emailAddress);
          localStorage.setItem('fullName', filterEmployee[0].fullName);
          localStorage.setItem('role', filterEmployee[0].role);
          localStorage.setItem('departmentId', filterEmployee[0].departmentId);
          localStorage.setItem('reportingPersonId', filterEmployee[0].reportingPersonId);

          this.router.navigate(['./home']).then(() => {
            window.location.reload();
          });
        }
        else {
          alert('Invalid email address or password');
        }

      })
  }
}