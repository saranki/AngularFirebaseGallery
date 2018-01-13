export interface GalleryImage{
    //These are attributes in our firbase database

    //This is the unique key which is going to identify the image
    $key?:string;

    //The name of the image
    name?:string;

    //The location path from where we are going to get the image
    url?:string;
}