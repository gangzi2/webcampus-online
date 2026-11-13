import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebcampusCard } from './webcampus_card';

describe('WebcampusCard', () => {
  let component: WebcampusCard;
  let fixture: ComponentFixture<WebcampusCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebcampusCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WebcampusCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
