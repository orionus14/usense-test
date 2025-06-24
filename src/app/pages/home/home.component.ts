import { Component, inject } from '@angular/core';
import { ImageService } from '../../shared/services/image.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  imageService: ImageService = inject(ImageService);

  
}
