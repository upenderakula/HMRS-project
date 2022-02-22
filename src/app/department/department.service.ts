import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { DepartmentModel } from "./department.model";


@Injectable({ providedIn: 'root' })
export class DepartmentService {
    constructor(private fireStore: AngularFirestore) {

    }
    getAll() {
        return this.fireStore.collection('department').snapshotChanges();
    }
    getById(deptId: string) {
        return this.fireStore.doc<DepartmentModel>('department/' + deptId).valueChanges();
    }
    create(departmentModel: DepartmentModel) {
        return this.fireStore.collection('department').add({ ...departmentModel });
    }
    update(deptId: string, departmentModel: DepartmentModel) {
        return this.fireStore.doc('department/' + deptId).update({ ...departmentModel });
    }
    delete(deptId: string) {
        return this.fireStore.doc('department/' + deptId).delete();
    }
}

