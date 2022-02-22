import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { LeaveRequestComponent } from "./leaverequest.component";

const routes: Route[] = [
    {
        path: '',
        component: LeaveRequestComponent
    },
    {
        path: 'leaverequest',
        component: LeaveRequestComponent
    }
]
@NgModule({
    declarations: [LeaveRequestComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgxPaginationModule
    ],
    providers: [],
    bootstrap: []
})
export class LeaverequestModule {

}