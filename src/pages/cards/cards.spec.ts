import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CardsPage } from './cards';
import { IonicModule, Platform, NavController, NavParams} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavParamsMock, CardsProviderMock } from '../../../test-config/mocks-ionic';
import { CardsProvider } from '../../providers/cards/cards';
import { AuthService } from "../../providers/auth-service/auth-service";
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../../config';
import { AngularFireModule } from 'angularfire2';
import { MyCardsProvider } from '../../providers/my-cards/my-cards';

describe('Cards', () => {
  let de: DebugElement;
  let comp: CardsPage;
  let fixture: ComponentFixture<CardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardsPage],
      imports: [
        IonicModule.forRoot(CardsPage),
        AngularFireModule.initializeApp(firebaseConfig.fire)
      ],
      providers: [
        NavController,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: CardsProvider, useClass: CardsProviderMock},
        AuthService,
        AngularFireAuth,
        MyCardsProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsPage);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h3'));
  });

  it('should create component', () => {
    let element = fixture.debugElement.query(By.css('[name="menu"]'));
    expect(element).not.toBeNull();
  });
});
