import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DepartmentModel } from './department/department.model';
import { DepartmentModule } from './department/department.module';
import { EmployeeModel } from './employee/employee.model';
import { EmployeeModule } from './employee/employee.module';
import { HomeModule } from './home/home.module';
import { LeaveModule } from './leave/leave.module';
import { LeaverequestModule } from './leaverequest/leaverequest.module';
import { LoginComponent } from './login1/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Route[] = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'home',
    loadChildren: () => HomeModule
  },
  {
    path: 'leave',
    loadChildren: () => LeaveModule
  },
  {
    path: 'leave-request',
    loadChildren: () => LeaverequestModule
  },
  {
    path: 'department',
    loadChildren: () => DepartmentModule
  },
  {
    path: 'employee',
    loadChildren: () => EmployeeModule
  },
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

