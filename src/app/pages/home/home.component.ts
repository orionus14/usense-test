import { Component, inject } from '@angular/core';
import { ImageService } from '../../shared/services/image.service';
import { ImagePickerComponent } from "../../shared/components/image-picker/image-picker.component";

@Component({
  selector: 'app-home',
  imports: [ImagePickerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  // imageService: ImageService = inject(ImageService);


}
