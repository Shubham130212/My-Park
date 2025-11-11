import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IBuildingModel, IFloorModel, ISiteModel, ResponseModel } from '../../model/user.model';

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  vehicleNumber: string;
  checkIn: string;
  checkOut: string;
  specialRequests?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  siteList: ISiteModel[] = [];
  buildingList: IBuildingModel[] = [];
  floorList: IFloorModel[] = [];
  selectedSiteId: number | null = null;
  selectedBuildingId: number | null = null;
  selectedFloorId: number | null = null;
  parkingSpots: number[] = [];
  masterServ = inject(MasterService);
  selectedSpot: number | null = null;
  @ViewChild('bookModal') bookModal!: ElementRef;

  ngOnInit(): void {
    this.loadSites();
    this.loadBuildings();
    this.loadFloors();
    this.loadParking();
  }


  openModal(spotNo: number) {
    this.selectedSpot = spotNo;
    if (this.bookModal) {
      this.bookModal.nativeElement.classList.add('show');
      this.bookModal.nativeElement.style.display = 'block';
      document.body.classList.add('modal-open');
      // Add backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  closeModal() {
    if (this.bookModal) {
      this.bookModal.nativeElement.classList.remove('show');
      this.bookModal.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      // Remove backdrop
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const bookingData: BookingForm = form.value;
      console.log('Booking Data:', {
        ...bookingData,
        spotNumber: this.selectedSpot
      });
      
      // For now, just show a success message
      alert('Booking submitted successfully!');
      this.closeModal();
      form.reset();
    } else {
      // Mark all fields as touched to show validation messages
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
    }
  }

  private loadSites(): void {
    this.masterServ.getSiteByClientId().subscribe({
      next: (res: ResponseModel) => {
        this.siteList = Array.isArray(res.data) ? res.data : [];
        console.log('siteList', this.siteList);
      },
      error: (error) => {
        console.error('Error loading sites:', error);
        this.siteList = [];
      }
    });
  }

  public loadBuildings(): void {
    console.log('siteId', this.selectedSiteId);
    this.masterServ.getBuildingBySiteId(this.selectedSiteId).subscribe({
      next: (res: ResponseModel) => {
        this.buildingList = Array.isArray(res.data) ? res.data : [];
      },
      error: (error) => {
        console.error('Error loading buildings:', error);
        this.buildingList = [];
      }
    });
  }

  public loadFloors(): void {
    console.log('buildingId', this.selectedBuildingId);
    this.masterServ.getFloorByBuildingId(this.selectedBuildingId).subscribe({
      next: (res: ResponseModel) => {
        this.floorList = Array.isArray(res.data) ? res.data : [];
      },
      error: (error) => {
        console.error('Error loading floors:', error);
        this.floorList = [];
      }
    });
  }

  public loadParking(): void {
    const floor = this.floorList.find((f: IFloorModel) => f.floorId == this.selectedFloorId)
    console.log('floor',floor);
    console.log('totalParkingSpots',floor?.totalParkingSpots);
    
    
    if (floor) {
      for (let i = 1; i <= floor.totalParkingSpots; i++) {
        this.parkingSpots.push(i)
      }
    }
  }
}
