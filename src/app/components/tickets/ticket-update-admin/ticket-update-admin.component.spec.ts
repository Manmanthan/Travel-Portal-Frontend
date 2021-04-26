import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUpdateAdminComponent } from './ticket-update-admin.component';

describe('TicketUpdateAdminComponent', () => {
  let component: TicketUpdateAdminComponent;
  let fixture: ComponentFixture<TicketUpdateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketUpdateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
