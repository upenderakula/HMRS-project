
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { environment } from "src/environments/environment";
import { DepartmentDetailsComponent } from "./department-details.component";
import { DepartmentComponent } from "./department.component";
import { DepartmentService } from "./department.service";

const routes: Route[] = [
    {
        path: ':id',
        component: DepartmentDetailsComponent
    },
    {
        path: '',
        component: DepartmentComponent
    }
]

@NgModule({
    declarations: [DepartmentComponent, DepartmentDetailsComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        RouterModule.forChild(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
    ],
    providers: [DepartmentService],
    bootstrap: []
})

export class DepartmentModule {

}