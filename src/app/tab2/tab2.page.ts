import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  capturedImage: string | undefined;
  imageLabel: string | undefined; 
  constructor(public photoService: PhotoService) { }

   async addFoto() {
    this.capturedImage = ""; 
    this.imageLabel = "";
      await this.photoService.addFoto().then(async (result:any) => {
        if (result) {
          console.log("hola",result)
          this.capturedImage = `data:image/jpeg;base64,${result.imagen_procesada}`; 
          this.imageLabel = result.label; 
        }
      }).catch((error) => {
        console.error('Error en addFoto:', error);
      });
    }
    
}
