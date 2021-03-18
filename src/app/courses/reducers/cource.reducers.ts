import { compareCourses, Course } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { on,createReducer } from '@ngrx/store';
import { CourseActions } from '../action-types';

export interface CoursesState extends EntityState<Course> {
  allCourseLoaded: boolean
}


export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState(
  {
    allCourseLoaded:false
  }
);

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded,
    (state, action) => adapter.addAll(
      action.courses,
      {...state, allCourseLoaded: true}
      )),
  on(CourseActions.courseUpdated, (state, action) =>
  adapter.updateOne(action.update, state))
);

export const {
  selectAll
} = adapter.getSelectors();
