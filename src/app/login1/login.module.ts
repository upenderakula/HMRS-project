/* import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";

const routes: Route[] = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
]
@NgModule({
    declarations: [LoginComponent],
    imports: [FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    bootstrap: []
})
export class LoginModule {

} */