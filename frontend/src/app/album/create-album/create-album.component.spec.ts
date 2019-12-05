import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlbumComponent } from './create-album.component';

describe('CreateAlbumComponent', () => {
  let component: CreateAlbumComponent;
  let fixture: ComponentFixture<CreateAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
