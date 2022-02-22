import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { LeaveDetailsComponent } from "./leave-details.component";
import { LeaveComponent } from "./leave.component";
import { LeaveService } from "./leave.service";

const routes: Route[] = [
    {
        path: ':leaveId',
        component: LeaveDetailsComponent
    },
    {
        path: '',
        component: LeaveComponent
    }
]
@NgModule({
    declarations: [LeaveComponent, LeaveDetailsComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgxPaginationModule
    ],
    providers: [LeaveService],
    bootstrap: []
})
export class LeaveModule {

}