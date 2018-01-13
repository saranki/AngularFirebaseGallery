import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { GalleryImage } from '../models/galleryImage.models';
import * as firebase from 'firebase';

@Injectable()
export class ImageService {

  private userId: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth=>{
      if(auth !==undefined && auth !==null){

        // The user's ID(auth.id), unique to the Firebase project. 
        // Do NOT use this value to authenticate with your backend server, if you have one. Use User.getToken() instead.
        this.userId = auth.uid;
      }
    });
  }

  //Method to get all the images
  //getImages() method will return an  observable array of gallery images.
  getImages(): Observable<GalleryImage[]> {
    
    //In order to get Observable<Response> from AngularFireList from 5.0 onwards, use valueChanges() function.
    return this.db.list('upload').valueChanges();
  }
    
}
