import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbheaderComponent } from './rbheader.component';

describe('RbheaderComponent', () => {
  let component: RbheaderComponent;
  let fixture: ComponentFixture<RbheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RbheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
