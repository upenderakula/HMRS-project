import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  IsLoggedIn: boolean = false;
  Role: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) {
    let employeeId = localStorage.getItem('employeeId');
    this.Role = localStorage.getItem('role');
    if (employeeId) {
      this.IsLoggedIn = true;
      this.router.navigate(['/home']);
    }
  }

  logout() {
    if (confirm("Are u sure to logout ?")) {
      localStorage.clear();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();

      });
    }
  }
}
