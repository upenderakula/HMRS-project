import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
]
@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(routes)],
    providers: [],
    bootstrap: []
})

export class HomeModule {

}