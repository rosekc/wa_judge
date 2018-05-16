import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavItem } from '../../shared/head/nav-item';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  navItems: NavItem[] = [
    new NavItem('考试', '/teacher/exam'),
    new NavItem('设置', '/teacher/settings')
  ];

  constructor() {}

  ngOnInit() {}
}
