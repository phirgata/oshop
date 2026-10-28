import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy
} from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appColumnResize]'
})
export class ColumnResizeDirective
  implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  private resizer: HTMLElement;

  private isResizing = false;

  private startX = 0;
  private startWidth = 0;

  private column: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {

    this.column = this.elementRef.nativeElement;

    this.renderer.setStyle(
      this.column,
      'position',
      'relative'
    );

    this.createResizer();

    this.listenForMouseEvents();
  }

  private createResizer(): void {

    this.resizer =
      this.renderer.createElement('span');

    this.renderer.addClass(
      this.resizer,
      'column-resizer'
    );

    this.renderer.appendChild(
      this.column,
      this.resizer
    );
  }

  private listenForMouseEvents(): void {

    /*
     * IMPORTANT:
     *
     * Listen for mousedown on the resize handle,
     * NOT on the <th>.
     */
    fromEvent<MouseEvent>(
      this.resizer,
      'mousedown'
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.startResize(event);
      });

    /*
     * Once resizing has started, listen on document.
     */
    fromEvent<MouseEvent>(
      document,
      'mousemove'
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.resize(event);
      });

    fromEvent<MouseEvent>(
      document,
      'mouseup'
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        this.stopResize(event);
      });
  }

  private startResize(event: MouseEvent): void {

    /*
     * This is the critical part.
     *
     * The resize handle is inside the sortable <th>.
     * Don't allow the event to reach MatSortHeader.
     */
    event.preventDefault();
    event.stopPropagation();

    this.isResizing = true;

    this.startX = event.pageX;
    this.startWidth = this.column.offsetWidth;

    this.renderer.addClass(
      this.column,
      'isResizing'
    );

    this.renderer.addClass(
      document.body,
      'column-resizing'
    );
  }

  private resize(event: MouseEvent): void {

    if (!this.isResizing) {
      return;
    }

    event.preventDefault();

    const delta =
      event.pageX - this.startX;

    const newWidth =
      this.startWidth + delta;

    const minWidth = 50;

    if (newWidth < minWidth) {
      return;
    }

    this.renderer.setStyle(
      this.column,
      'width',
      `${newWidth}px`
    );

    this.renderer.setStyle(
      this.column,
      'min-width',
      `${newWidth}px`
    );

    this.renderer.setStyle(
      this.column,
      'max-width',
      `${newWidth}px`
    );
  }

  private stopResize(event: MouseEvent): void {

    if (!this.isResizing) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.isResizing = false;

    this.renderer.removeClass(
      this.column,
      'isResizing'
    );

    this.renderer.removeClass(
      document.body,
      'column-resizing'
    );
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

    if (this.resizer) {
      this.renderer.removeChild(
        this.column,
        this.resizer
      );
    }
  }
}
