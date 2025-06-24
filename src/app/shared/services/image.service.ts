import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { NinjaResponseInterface } from '../interfaces/ninja-response';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  sendImage(file: File): Observable<NinjaResponseInterface[]> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<NinjaResponseInterface[]>(this.apiUrl, formData);
  }
}
