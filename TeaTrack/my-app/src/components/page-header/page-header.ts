import { Component } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
  standalone: true
})
export class PageHeader {
    isAdmin = localStorage.getItem('admin_token') ? true : false;
}
