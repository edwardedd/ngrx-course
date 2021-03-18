import { CoursesState } from './reducers/cource.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCourses from './reducers/cource.reducers';


export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category ==='BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category ==='ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const areCourseLoaded = createSelector(
  selectCoursesState,
  state => state.allCourseLoaded
)

