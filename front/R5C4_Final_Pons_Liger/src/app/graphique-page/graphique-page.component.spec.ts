import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiquePageComponent } from './graphique-page.component';

describe('GraphiquePageComponent', () => {
  let component: GraphiquePageComponent;
  let fixture: ComponentFixture<GraphiquePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiquePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphiquePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
