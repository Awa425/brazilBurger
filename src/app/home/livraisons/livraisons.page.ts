import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { MyserviceService } from 'src/app/myservice.service';
import jsQR from 'jsqr';


@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.page.html',
  styleUrls: ['./livraisons.page.scss'],
})
export class LivraisonsPage implements OnInit {
   livraisons : any
   commande : any
   @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;
  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;

  constructor(
    private activateRoute: ActivatedRoute, 
    private myService: MyserviceService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private plt: Platform 
    ) {
      const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (pa: Params) => {
        const id = pa['id'];
        this.myService.getLivraisonsByLivreur(id).subscribe(
          res => {
            this.livraisons = res            
          }  
        )
        this.myService.getOne('livraisons', id).subscribe(
          commande => { this.commande = commande }
        )
      }
    )
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }

  reset() {
    this.scanResult = null;
  }

  stopScan() {
    this.scanActive = false;
  }

	
async startScan() {
  // Not working on iOS standalone mode!
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' }
  });
 
  this.videoElement.srcObject = stream;
  // Required for Safari
  this.videoElement.setAttribute('playsinline', true);
 
  this.loading = await this.loadingCtrl.create({});
  await this.loading.present();
 
  this.videoElement.play();
  requestAnimationFrame(this.scan.bind(this));
}
 
async scan() {
  if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
      this.scanActive = true;
    }
 
    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;
 
    this.canvasContext.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });
 
    if (code) {
      this.scanActive = false;
      this.scanResult = code.data;
      this.showQrToast();
    } else {
      
      if (this.scanActive) {
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  } else {
    requestAnimationFrame(this.scan.bind(this));
  }
}

captureImage() {
  this.fileinput.nativeElement.click();
}
 
handleFile(files: FileList) {
  const file = files.item(0);
 
  var img = new Image();
  img.onload = () => {
    this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });
 
    if (code) {
      this.scanResult = code.data;
      this.showQrToast();
    }
  };
  img.src = URL.createObjectURL(file);
}

}


