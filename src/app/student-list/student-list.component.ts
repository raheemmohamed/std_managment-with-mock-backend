import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StudentService } from '../student.service';
import { Subscription } from 'rxjs';
import { Student, Course } from '../interface';
import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';
import { NodeMockDbService } from '../node-mock-db.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  title = 'angular new';

  // stored service data variables
  stdServiceData: Student;
  mockStdData: Student;
  courseData: Course;

  // subcription Array type
  subcribesList = [];

  AngularLocalStorageData;

  constructor(
    private stdService: StudentService,
    private router: Router,
    private angularLocalStorage: LocalStorageService,
    private nodeMockService: NodeMockDbService
  ) {}

  ngOnInit() {
    this.getStudentData();
    this.getCourseData();
  }

  getStudentData() {
    this.subcribesList[this.subcribesList.length] = this.nodeMockService.getStudentfromMock().subscribe(
      data => {
        this.stdServiceData = data;
        console.log(data);
      }
    );
  }

  getCourseData() {
    this.subcribesList[this.subcribesList.length] = this.stdService.getCourse().subscribe(
      dataCourse => {
        this.courseData = dataCourse;
      },
      error => {
        error = error;
      }
    );
  }
  createNewStudent() {
    this.router.navigate(['/createStudent']);
  }

  viewEachStudentData(id, courseId) {
    this.router.navigate(['/studentView/', id, courseId]);
  }

  editStudents(id) {
    console.log('Message is trigger');
    this.router.navigate(['/editStudent/', id]);
  }

  deleteStudent(id) {
    const deleterecord = this.nodeMockService.deleteStudent(id).subscribe(
      f => f,
      error => {
        console.log(error.erroMessage);
      }
    );

    if (deleterecord) {
      this.getStudentData();
    }
  }

  ngOnDestroy() {
    this.subcribesList.forEach(subcribesData => subcribesData.unsubscribe());
  }
}
