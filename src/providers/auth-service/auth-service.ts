import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  get Id():string{
    return this.user.uid;
  }

  get ImageUrl():string{
    return this.user.photoURL;
  }

  get nome():string{
    return this.user.displayName;
  }

  get authenticated(): boolean{
    return this.user != null;
  }

  signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
  }
  
  signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
      .then(() => {
        return this.afAuth.auth.getRedirectResult().then( result => {
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          let token = result.credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          console.log(token, user);
        }).catch(function(error) {
          // Handle Errors here.
          alert(error.message);
        });
      });
    }
  }  
}