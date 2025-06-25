import { Component, DestroyRef, inject } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, map, take } from 'rxjs';
import { NinjaResponseInterface } from '../../interfaces/ninja-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-image-picker',
  imports: [AsyncPipe, MatIconModule],
  templateUrl: './image-picker.component.html',
})
export class ImagePickerComponent {
  private destroyRef = inject(DestroyRef);
  private imageService: ImageService = inject(ImageService);

  convertedText$ = new BehaviorSubject<NinjaResponseInterface[] | null>(null);
  textLine$ = this.convertedText$.pipe(
    map(items => items?.map(i => i.text).join(' ') ?? '')
  );

  warningMessage = false;
  isRequest = false;
  isLoading = false;
  isCopiedText = false;
  imageFile: File | null = null;
  imageUrl: string | null = null;

  onImageSelected(event: Event): void {
    this.convertedText$.next(null);
    this.warningMessage = false;
    this.isRequest = false;
    this.isLoading = false;
    this.isCopiedText = false;
    this.imageFile = null;
    this.imageUrl = null;

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const maxSizeInKB = 200;
    const maxSizeInBytes = maxSizeInKB * 1024;

    if (file?.size > maxSizeInBytes) {
      input.value = '';
      this.warningMessage = true;
      return
    }

    this.imageFile = file;
    this.imageUrl = URL.createObjectURL(file);
  }

  onSendImage(): void {
    if (!this.imageFile) return;

    this.isLoading = true;
    this.isRequest = true;
    this.convertedText$.next(null);
    this.isCopiedText = false;

    this.imageService.sendImage(this.imageFile)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.convertedText$.next(res);
          this.isLoading = false;
        },
        error: err => {
          console.error('Error:', err);
          this.convertedText$.next([]);
          this.isLoading = false;
        }
    });
  }

  copyToClipboard(): void {
    this.textLine$
      .pipe(take(1))
      .subscribe(text => {
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
          this.isCopiedText = true;

          setTimeout(() => {
            this.isCopiedText = false;
          }, 2000);
        })
      })
  }
}
