import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-page-footer',
  standalone: true,
  templateUrl: './page-footer.html',
  styleUrl: './page-footer.css'
})
export class PageFooter implements OnInit, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const modal = document.getElementById('sub-modal');
    const form = document.getElementById('subForm');
    const email = document.getElementById('subEmail');
    const registerBtn = document.getElementById('footer-register-btn');

    if (!modal || !form || !email) {
      console.warn('Sub-modal elements not found');
      return;
    }

    const openModal = () => {
      modal.removeAttribute('aria-hidden');
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('show');
      document.body.style.overflow = '';
    };

    // ✅ Nút close
    const closeBtn = modal.querySelector('.sub-close');
    if (closeBtn) {
      this.renderer.listen(closeBtn, 'click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    // ✅ Click backdrop
    const backdrop = modal.querySelector('.sub-backdrop');
    if (backdrop) {
      this.renderer.listen(backdrop, 'click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    // ✅ ESC key
    this.renderer.listen(document, 'keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    // ✅ Click nút "Đăng ký"
    if (registerBtn) {
      this.renderer.listen(registerBtn, 'click', () => {
        const v = (email as HTMLInputElement).value.trim();
        const ok = /.+@.+\..+/.test(v);

        if (!ok) {
          (email as HTMLInputElement).focus();
          email.setAttribute('aria-invalid', 'true');
          return;
        }

        email.setAttribute('aria-invalid', 'false');
        openModal();
        setTimeout(closeModal, 2500);
        (form as HTMLFormElement).reset();
      });
    }
  }
}
