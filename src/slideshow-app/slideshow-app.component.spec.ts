import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SlideshowAppComponent } from './slideshow-app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SlideshowAppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SlideshowAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'slide works!'`, async(() => {
    const fixture = TestBed.createComponent(SlideshowAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('slide works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(SlideshowAppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('slide works!');
  }));
});
