import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { EmployeeModel } from "./employee.model";

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private fireStore: AngularFirestore) {

    }
    getAll() {
        return this.fireStore.collection('employee').snapshotChanges();
    }
    getById(empId: string) {
        return this.fireStore.doc<EmployeeModel>('employee/' + empId).valueChanges();
    }
    create(employeeModel: EmployeeModel) {
        return this.fireStore.collection('employee').add({ ...employeeModel });
    }
    update(empId: string, employeeModel: EmployeeModel) {
        return this.fireStore.doc('employee/' + empId).update({ ...employeeModel });
    }
    delete(empId: string) {
        return this.fireStore.doc('employee/' + empId).delete();
    }
}
