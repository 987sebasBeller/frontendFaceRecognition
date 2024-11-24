import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PhotoService {


  constructor(private http: HttpClient) {}
  private serverUrl = 'http://localhost:5000/upload';
  public async addFoto() {
    const captura_foto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });
    const fotoBase64 = captura_foto.base64String;

    if (fotoBase64) {
      return this.enviarFoto(fotoBase64);
    }
    return "Nada"

  }
  
  private async enviarFoto(fotoBase64: string): Promise<{ imagen_procesada:string,etiqueta: string } | string> {
    const datos = { imagen: fotoBase64 };
    try {
      const url = this.serverUrl; // URL de tu API
      const response = await this.http
        .post<{ imagen_procesada:string,etiqueta: string }>(url, datos)
        .toPromise();
      console.log('Imagen enviada correctamente:', response);
      // Devolver la etiqueta del servidor
      return response || 'Etiqueta no encontrada';
    } catch (error) {
      console.error('Error al enviar la imagen al servidor:', error);
      return 'Error al obtener etiqueta';
    }
  }


  // private enviarFoto(fotoBase64: string) {
  //   const datos = { imagen: fotoBase64 };

  //   this.http.post(this.serverUrl, datos).subscribe({
  //     next: (response) => {
  //       console.log('Imagen enviada correctamente:', response);
  //       return response;
  //     },
  //     error: (error) => {
  //       console.error('Error al enviar la imagen:', error);
  //     },
  //   });
  // }
}
