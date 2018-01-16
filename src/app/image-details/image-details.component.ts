import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryImage } from '../models/galleryImage.models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  private imageUrl = '';

  //Contains the information about a route associated with a component loaded in an outlet.
  //An ActivatedRoute can also be used to traverse the router state tree
  constructor(private imageService: ImageService, private router: ActivatedRoute) { }

  //retuens a promise
  getImageUrl(key: string) {
    this.imageService.getImage(key)
    //.then(imageUrl => this.imageUrl = imageUrl.url);
    .then(image=> (console.log(image.url)));
  }
  //Once the page loaded the page's url should be the selected image's url from firebase 
  ngOnInit() {
    this.getImageUrl(this.router.snapshot.params['id']);
  }

}
