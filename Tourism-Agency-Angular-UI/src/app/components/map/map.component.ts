import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MapService } from 'src/app/services/map/map.service';

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

  constructor(private mapService:MapService) {}

  ngOnInit() {
      this.options = {
          center: {lat: 39.93, lng:32.86},
          zoom: 7
      };

      this.initOverlays();

      this.infoWindow = new google.maps.InfoWindow();
  }


  handleMapClick(event) {
      // this.dialogVisible = true;
      // this.selectedPosition = event.latLng;
      console.log(event.latLng);
  }

  handleOverlayClick(event) {
      let isMarker = event.overlay.getTitle != undefined;

      if (isMarker) {
          let title = event.overlay.getTitle();
          this.infoWindow.setContent('' + title + '');
          this.infoWindow.open(event.map, event.overlay);
          event.map.setCenter(event.overlay.getPosition());
      }
  }

  // addMarker() {
  //     this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
  //     this.markerTitle = null;
  //     this.dialogVisible = false;
  // }

  // handleDragEnd(event) {
  //     this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
  // }

  initOverlays() {
    this.overlays = new Array();
    this.mapService.getOverlays().subscribe(res => {
        console.log(res);
        this.overlays.push(new google.maps.Marker({position: {lat: res.latitute, lng:res.longitude}, title:res.name}))
        this.overlays.push(new google.maps.Marker({position: {lat: 38.42, lng:27.14}, title:"İzmir"}))
        this.overlays.push(new google.maps.Marker({position: {lat: 38.74, lng:41.05}, title:"Muş"}))
        this.overlays.push(new google.maps.Marker({position: {lat: 41.00, lng:28.97}, title:"İstanbul"}))
        this.overlays.push(new google.maps.Marker({position: {lat: 36.89, lng:30.71}, title:"Antalya"}))
        this.overlays.push(new google.maps.Marker({position: {lat: 40.79, lng:37.38}, title:"Ordu"}))
        this.overlays.push(new google.maps.Marker({position: {lat: 39.93, lng:32.86}, title:"Ankara"}))
        this.overlays.push(new google.maps.Polyline({path: [{lat: res.latitute, lng:res.longitude},{lat: 39.93, lng:32.86}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2}))
    })

    //   if (!this.overlays||!this.overlays.length) {
    //       this.overlays = [
    //           new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
    //           new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
    //       ];
    //   }
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
