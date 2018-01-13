import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../services/image.service';
import { GalleryImage } from '../models/galleryImage.models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {

  //Observable is sort of an array in angular with asynchronous data. For example to store data that comes from backend.
  //Angular uses a third-party library called Reactive Extensions (RxJS)
  //Images is an array which is going to hold all the images.
  images: Observable<GalleryImage[]>;

  //Constructor is used only for class member initialization and nothing beyond that.
  constructor(private imageSerive: ImageService) { }
  
  //The actual work left in the constructor is done here. (for modularity - best pratice)
  ngOnInit() {

    //When the app is launched we need to load all the images. For that we need to implement a method called "getImages" in image service.
    this.images = this.imageSerive.getImages();
  }

  ngOnChanges(){
    //After a change in the app all the images should get loaded according to the change made.
    this.images = this.imageSerive.getImages();
  }
}
