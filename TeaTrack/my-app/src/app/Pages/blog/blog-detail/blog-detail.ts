import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BLOG_DATA, RELATED_BLOGS } from '../blog-data';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['../blog.css', '../../../../styles.css'],
})
export class BlogDetail implements OnInit {
  blogId: string = '';
  blog: any;
  relatedBlogs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Lắng nghe thay đổi ID trên URL (khi click bài liên quan vẫn dùng cùng component)
    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('id') || '';
      this.loadBlog();
    });
  }

  // Khi click bài viết liên quan
  openBlog(id: string) {
    this.router.navigate(['/blog', id]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private loadBlog() {
    // Lấy blog data tương ứng
    this.blog = BLOG_DATA[this.blogId as keyof typeof BLOG_DATA];

    // Nếu không tìm thấy, báo lỗi
    if (!this.blog) {
      this.blog = {
        heading: 'Blog không tồn tại',
        content: '<p>Xin lỗi, blog này không tồn tại hoặc đã bị xóa.</p>',
        headingColor: '#D33'
      };
      this.relatedBlogs = [];
      document.title = 'Blog không tồn tại - Hồng Trà Ngô Gia';
      return;
    }

    // Lấy danh sách bài viết liên quan (tối đa 6 bài, bỏ bài hiện tại)
    this.relatedBlogs = RELATED_BLOGS
      .filter(b => b.id !== this.blogId)
      .slice(0, 6);

    // Cập nhật title trang giống script cũ
    if (this.blog.title) {
      document.title = this.blog.title;
    }
  }
}
