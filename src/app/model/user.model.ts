export class User {
  emailId: string;
  password: string;

  constructor() {
    this.emailId = '';
    this.password = '';
  }
}

export interface IUserModel {
  userId: number
  emailId: string
  password: string
  createdDate: string
  projectName: string
  fullName: string
  mobileNo: string
  extraId: number
}

export interface ResponseModel {
  message: string
  result: boolean
  data: any
}

export interface ISiteModel {
  siteId: number
  clientId: number
  siteName: string
  siteCity: string
  siteAddress: string
  sitePinCode: string
  totalBuildings: number
  createdDate: string
}

export interface IBuildingModel {
  buildingId: number
  siteId: number
  buildingName: string
  buildingManagerName: string
  contactNo: string
  siteName: string
}

export interface IFloorModel {
  floorId: number
  buildingId: number
  floorNo: string
  isOperational: boolean
  totalParkingSpots: number
}

export interface BookParkingModel {
  parkId: number
  floorId: number
  custName: string
  custMobileNo: string
  vehicleNo: string
  parkDate: string
  parkSpotNo: number
  inTime: string
  outTime: null
  amount: number
  extraCharge: number
  parkingNo: string
}