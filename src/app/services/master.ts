import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/user.model';
import { UserService } from './user';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  userServ = inject(UserService)
  apiUrl="https://api.freeprojectapi.com/api/SmartParking/"
  constructor(private http: HttpClient) { }

  getSiteByClientId(): Observable<ResponseModel> {
    const clientId = this.userServ.loggedUserData?.extraId;    
    return this.http.get<ResponseModel>(`${this.apiUrl}GetSitesByClientId?id=${clientId}`)
  }

  getBuildingBySiteId(siteId:number | null):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`${this.apiUrl}GetBuildingBySiteId?id=${siteId}`)
  }

  getFloorByBuildingId(buildingId:number | null):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`${this.apiUrl}GetFloorsByBuildingId?id=${buildingId}`)
  }

  getParkingSpotByFloorId(floorId:number | null):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`${this.apiUrl}GetAllParkingByFloor?id=${floorId}`)
  }

  bookSpot(obj:any):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(`${this.apiUrl}AddParking`,obj)
  }
}
