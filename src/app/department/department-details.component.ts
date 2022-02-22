import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentModel } from './department.model';
import { DepartmentService } from './department.service';

@Component({
    selector: 'department-details',
    templateUrl: './department-details.component.html'
})
export class DepartmentDetailsComponent implements OnInit {
    departmentModel = new DepartmentModel();
    constructor(private activatedRoute: ActivatedRoute, private deptService: DepartmentService) { }

    ngOnInit(): void {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.deptService.getById(id)
            .subscribe(response => {
                this.departmentModel = response;
            })
    }

}