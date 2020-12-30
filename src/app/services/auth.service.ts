import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UserI } from '../model/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userlist: AngularFireList<any>;
  public userData: Observable<firebase.default.User>;

  constructor(
    private afsAuth: AngularFireAuth,
    private firebase: AngularFireDatabase
  ) { 
    this.userData = afsAuth.authState;
  }

  loginUser(user: UserI){
    const {email, password} = user;
    return this.afsAuth.signInWithEmailAndPassword(email, password);
  }

  isLoading(){
    return this.afsAuth.onAuthStateChanged((user) => {
      if (user){
        return true;
      }else{
        return false;
      }
    });
  }

  logout(){
    this.afsAuth.signOut();
  }

  registerUser(user: UserI){
    const{email, password,displayName} = user;
    return new Promise(( resolve , reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user,displayName);
      }).catch(err => console.log(reject(err)));
    });
  }

  updateUserData(user,displayName){
    this.userlist = this.firebase.list('Users');
    this.userlist.update(user.uid, {
      uid: user.uid,
      email: user.email,
      password: user.email,
      displayName
    });
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
}
