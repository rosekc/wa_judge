import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavItem } from '../../shared/head/nav-item';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  navItems: NavItem[] = [
    new NavItem('考试', '/student/exam'),
    new NavItem('设置', '/student/settings')
  ];

  constructor() {}

  ngOnInit() {}
}
