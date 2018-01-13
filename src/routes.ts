import { Routes } from '@angular/router';
import { GalleryComponent } from './app/gallery/gallery.component';
import { ImageDetailsComponent } from './app/image-details/image-details.component';
import { LoginComponent } from './app/login/login.component';
import { UploadComponent } from './app/upload/upload.component';
import { AuthenticationGuard } from '../src/app/services/authenticationGuard.service';

export const appRoutes: Routes = [
    //This is prevent the user by entering into a page by just changing the url without facing the authentication 
    { path: 'gallery', component: GalleryComponent, canActivate: [AuthenticationGuard]},
    { path: 'upload', component: UploadComponent, canActivate: [AuthenticationGuard]},
    { path: 'image/:id', component: ImageDetailsComponent, canActivate: [AuthenticationGuard]},
    
    //Default path apart from above mentioned paths
    { path: '', redirectTo:'/gallery', pathMatch: 'full'},

    //No need to athenticate to go to this page
    { path: 'login', component: LoginComponent},
    
    
    
    
];