import { Component, Input } from '@angular/core';
import { SharedService } from '../../../general/services/shared.service';
import { HttpWrapperService } from '../../../general/services/httpWrapper.service';
import { GENERAL } from '../../../general/constants/general.constant';
import {MdSnackBar} from '@angular/material';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AvatarComponent } from '../avatar.component/avatar.component';
@Component({
 	selector: 'profile',
	templateUrl: './profile.component.html',
 	styleUrls: ['./profile.component.css']
})
export class ProfileComponent{

    currentUser : any;

    formData : any = {
        countries : [],
        cities : []
    }
    
    constructor( private sharedService : SharedService, private httpWrapperService : HttpWrapperService, private snackBar : MdSnackBar, private dialog : MdDialog ) {
        this.sharedService.getCurrentUser().subscribe((user)=> {
            this.currentUser = Object.assign({}, user);
        })
        this.getAllCountries();
    }	

    profileSavedResponseHandler(data, error) {
        if(!error){
            this.sharedService.setCurrentUser(this.currentUser);
        }
    }

    saveProfile(profileForm, currentUser) {
        if(profileForm.form.valid) {
            this.httpWrapperService.sendRequest({
                isErrorDisplayingNeeded : true,
                successMessage : 'Profile successfully updated',
                route : 'updateUser',
                callback : this.profileSavedResponseHandler.bind(this),
                body : currentUser
            })
        }
    }

    openAvatarDialog(picName) {
        let config = new MdDialogConfig();
        config.data = {
            imageSrc : picName
        }
        config.disableClose = true;
        let dialogRef = this.dialog.open(AvatarComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            if(this.currentUser){
                this.currentUser.avatarUrl = result;
            }
        });      
    }

     getAllCountries() {
        this.httpWrapperService.sendRequest({
            route : 'countries',
            callback : this.countriesResponseHandler.bind(this)
        })
    }

    countriesResponseHandler(countries, error) {
        if(!error && countries && countries[0]) {
            this.formData.countries = countries;
            this.getAllCitiesByContryId(countries[0].id);
        }
    }

    countryChanged(country) {
        if(this.currentUser) {
            this.currentUser.country = country;
            this.getAllCitiesByContryId(country.id);
        }

    }

    getAllCitiesByContryId(countryId) {
        this.httpWrapperService.sendRequest({
            route : 'cities',
            callback : this.citiesResponseHandler.bind(this),
            urlParams : {
                countryId : countryId
            }
        })
    }

    citiesResponseHandler(cities, error){
        if(!error && this.currentUser){
            this.formData.cities = cities;
            if(this.currentUser.country && this.currentUser.country.id) {
                this.currentUser.city = cities[0] || {};                
            }
        }
    }

    cityChanged(city){
        this.currentUser.city = city;
    }

    setUserRole(currentRole : string) {
        this.currentUser.role = (currentRole === 'employer') ? GENERAL.roles[0] : GENERAL.roles[1]; 
    }

}
