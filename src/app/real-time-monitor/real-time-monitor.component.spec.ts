import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeMonitorComponent } from './real-time-monitor.component';

describe('RealTimeMonitorComponent', () => {
  let component: RealTimeMonitorComponent;
  let fixture: ComponentFixture<RealTimeMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
