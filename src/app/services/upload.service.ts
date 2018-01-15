import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { GalleryImage } from '../models/galleryImage.models';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-';
import { AngularFireDatabase } from 'angularfire2/database';
// for Observables
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Upload } from '../models/upload.model';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  private basePath = '/upload';
  private uploads: FirebaseListObservable<GalleryImage[]>;
  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase) { }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    //Make reference to the location we want to put the file
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
                      .put(upload.file);

    //Progress of uploading a file
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //3 Observers
    //1. state_changed observer
    //Monitor upload in progress
    (snapshot) => {
      //Progress bar
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },
    //2. Error observer
    //If uploads fail
    (error) => {
      console.log(error);
    },
    //3.Success Observer
    (): any => {
      upload.url = uploadTask.snapshot.downloadURL;
      upload.name  = upload.file.name;
      this.saveFileData(upload);
  }
);
}
//Once the file is successfully uploaded we can save our file data and push it to our database
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    console.log("File Saved!: "+ upload.url);
  }
}
