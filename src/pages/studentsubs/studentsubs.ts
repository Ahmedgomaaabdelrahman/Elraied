import { SelectingSubjectsProvider } from '../../providers/selecting-subjects/selecting-subjects';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SubjcontentPage } from '../subjcontent/subjcontent';
import { TeachertabsPage } from '../teachertabs/teachertabs';
import { HomePage } from './../home/home';
import { StudenttabsPage } from '../studenttabs/studenttabs';
import {User} from '../../model/UserModel'
import {CommonServerStaticsProvider} from '../../providers/common-server-statics/common-server-statics'
import { AuthProvider } from '../../providers/auth/auth';
import { Statics } from '../../model/StaticsModel';
import { CommonServicesProvider } from '../../providers/common-services/common-services';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-studentsubs',
  templateUrl: 'studentsubs.html',
})
export class StudentsubsPage {
  password
  phone
  subs:object;
  grade
  constructor(
    private sanitizer: DomSanitizer,
  private user:User,
    private common:CommonServicesProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public statics:Statics,
    public supjectsProvider:SelectingSubjectsProvider,
    public commonServerStaticsProvider:CommonServerStaticsProvider,
    private auth:AuthProvider) {
  }

  ionViewWillEnter(){
    this.grade=this.user.getuser().grade
    this.subs=[]
    console.log(this.user.getuser().grade_id)
   this.supjectsProvider.getSubject(this.user.USER.grade_id,this.user.USER.year_id).subscribe(subs=>{
     console.log(subs)
     this.subs=subs
     // this.sanitizer.bypassSecurityTrustStyle(this.subs[0]['image']);

   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentsubsPage');
  }


  gotosign(){
    this.navCtrl.push(SignupPage);
  }
  details(subject){
    console.log(subject)
    this.navCtrl.push(SubjcontentPage,{subject_id:subject.subject_id,image:subject.image
      ,name:subject.name});
  }
}
