import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LeaveModel } from "./leave.model";

@Injectable({ providedIn: 'root' })
export class LeaveService {
    constructor(private fireStore: AngularFirestore) {

    }
    getAll() {
        return this.fireStore.collection('leave').snapshotChanges();
    }
    getById(leaveId: string) {
        console.log(leaveId);
        return this.fireStore.doc<LeaveModel>('leave/' + leaveId).valueChanges();
    }
    create(leaveModel: LeaveModel) {
        return this.fireStore.collection('leave').add({ ...leaveModel });
    }
    update(leaveId: string, leaveModel: LeaveModel) {
        return this.fireStore.doc('leave/' + leaveId).update({ ...leaveModel });
    }
    delete(deptId: string) {
        return this.fireStore.doc('leave/' + deptId).delete();
    }
}