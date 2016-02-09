import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '../core/containers/main_layout';
import CoursesList from './containers/courses_list';
import Course from './containers/course';
import NewCourse from './containers/new_course';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/courses', {
    name: 'courses.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<CoursesList />)
      });
    }
  });

  FlowRouter.route('/courses/:courseId', {
    name: 'courses.single',
    action({courseId}) {
      mount(MainLayoutCtx, {
        content: () => (<Course courseId={courseId} />)
      });
    }
  });

  FlowRouter.route('/new-course', {
    name: 'courses.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewCourse />)
      });
    }
  });
}
