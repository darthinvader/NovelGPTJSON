import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faEraser, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {
  @Input() clearAll?: Function;
  @Input() download?: Function;
  @Input() handleFileInput?: Function;

  @ViewChild('fileInput') fileInput!: ElementRef;

  faEraser = faEraser;
  faDownload = faDownload;
  faUpload = faUpload;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

}
