import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  options: any;

  overlays: any[];

  infoWindow: any;

  draggable: boolean;

  map: google.maps.Map;

  constructor() {}

  ngOnInit() {
      this.options = {
          center: {lat: 36.890257, lng: 30.707417},
          zoom: 12
      };

      this.initOverlays();

      this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event) {
      // this.dialogVisible = true;
      // this.selectedPosition = event.latLng;
      console.log(event.latLng);
  }

  // handleOverlayClick(event) {
  //     let isMarker = event.overlay.getTitle != undefined;

  //     if (isMarker) {
  //         let title = event.overlay.getTitle();
  //         this.infoWindow.setContent('' + title + '');
  //         this.infoWindow.open(event.map, event.overlay);
  //         event.map.setCenter(event.overlay.getPosition());

  //         this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
  //     }
  //     else {
  //         this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
  //     }
  // }

  // addMarker() {
  //     this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
  //     this.markerTitle = null;
  //     this.dialogVisible = false;
  // }

  // handleDragEnd(event) {
  //     this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
  // }

  initOverlays() {
      if (!this.overlays||!this.overlays.length) {
          this.overlays = [
              new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
              // new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
          ];
      }
  }

  // zoomIn(map) {
  //     map.setZoom(map.getZoom()+1);
  // }

  // zoomOut(map) {
  //     map.setZoom(map.getZoom()-1);
  // }

  // clear() {
  //     this.overlays = [];
  // }
}
