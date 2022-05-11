import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { APIService } from '../service/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  allData:any;
  restaurantModelObj:RestaurantData=new RestaurantData;
  constructor(private formBuilder: FormBuilder, private api:APIService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }
addRestaurant(){
  this.restaurantModelObj.name=this.formValue.value.name;
  this.restaurantModelObj.email=this.formValue.value.email;
  this.restaurantModelObj.mobile=this.formValue.value.mobile;
  this.restaurantModelObj.address=this.formValue.value.address;
  this.restaurantModelObj.services=this.formValue.value.services;

  this.api.createRestaurant(this.restaurantModelObj).subscribe(res=>{
    console.log(res);
    alert("Restaurant Added Successfully");
    this.formValue.reset();
    this.getAllData();
  },
  err=>{
    alert("Something is Wrong");
  })
}

getAllData(){
  this.api.getRestaurant().subscribe(res=>{
    this.allData=res;
  })
}

deleteResto(data:any){
  this.api.deleteRestaurant(data.id).subscribe(res=>{
    alert("Record Deleted")
    this.getAllData();
  })
}

editResto(data:any){
  this.restaurantModelObj.id=data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);
}

updateRestaurant(){
  this.restaurantModelObj.name=this.formValue.value.name;
  this.restaurantModelObj.email=this.formValue.value.email;
  this.restaurantModelObj.mobile=this.formValue.value.mobile;
  this.restaurantModelObj.address=this.formValue.value.address;
  this.restaurantModelObj.services=this.formValue.value.services;

  this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
    alert("Record Updated")
    this.getAllData();
  })
}
}
