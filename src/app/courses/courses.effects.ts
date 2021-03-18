import { CoursesHttpService } from './services/courses-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { CourseActions } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { allCoursesLoaded } from './course.actions';

@Injectable()
export class CoursesEffects{

  loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap(action =>
        this.courseHTTP.findAllCourses()),
      map(courses => allCoursesLoaded({courses}))
    )
  );

  saveCourse$ = createEffect(
    () => this.actions$
    .pipe(
      ofType(CourseActions.courseUpdated),
      concatMap(action => this.courseHTTP.saveCourse(
        action.update.id,
        action.update.changes
      ))
    ),
    {dispatch: false}
  )
  constructor(private actions$: Actions, private courseHTTP: CoursesHttpService){

  }
}