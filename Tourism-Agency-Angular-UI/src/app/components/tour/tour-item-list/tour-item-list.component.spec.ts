import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourItemListComponent } from './tour-item-list.component';

describe('TourItemListComponent', () => {
  let component: TourItemListComponent;
  let fixture: ComponentFixture<TourItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
