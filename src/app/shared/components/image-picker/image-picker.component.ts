import { Component, inject } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { NinjaResponseInterface } from '../../interfaces/ninja-response';

@Component({
  selector: 'app-image-picker',
  imports: [AsyncPipe],
  templateUrl: './image-picker.component.html',
})
export class ImagePickerComponent {
  private imageService: ImageService = inject(ImageService);

  convertedText$ = new BehaviorSubject<NinjaResponseInterface[] | null>(null);
  warningMessage = false;
  isRequest = false;

  onFileSelected(event: Event) {
    this.warningMessage = false;

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.isRequest = true;

    const maxSizeInKB = 200;
    const maxSizeInBytes = maxSizeInKB * 1024;

    if (file?.size > maxSizeInBytes) {
      input.value = '';
      this.warningMessage = true;
      return
    }

    this.imageService.sendImage(file).subscribe({
      next: (res) => {
        this.convertedText$.next(res);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
