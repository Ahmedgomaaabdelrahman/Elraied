import { AskProvider } from '../../providers/ask/ask';
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



@Component({
  selector: 'page-studentask',
  templateUrl: 'studentask.html',
})
export class StudentaskPage {
  password
  image:string='';
  audioRecord:string=''
  audioSend:string=''
questionText:string=''
  phone
  subs:object;
  subject_id
grade_id:any=''
  grade:any=''
/////////////////////////////////////
// 'student_id':, =>int
// 'grade_id':,   =>int

// 'subject_id':, =>int
// 'question':, =>text , string
// 'image_url':,=>string , base64
// 'audio_url': =>string , base64

////////////////////////////////////
  constructor(

    private user:User,
    private common:CommonServicesProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public statics:Statics,
    public askProvider:AskProvider,
    public supjectsProvider:SelectingSubjectsProvider,
    public commonServerStaticsProvider:CommonServerStaticsProvider,
    private auth:AuthProvider) {
  }
  selectSubject(subj){
    console.log(subj)
    this.subject_id=subj.subject_id
    this.grade_id=subj.grade_id

  }
  ionViewWillEnter(){
    this.grade=this.user.getuser().grade
    this.subs=[]
    console.log(this.user.getuser().grade_id)
   this.supjectsProvider.getSubject(this.user.getuser().grade_id).subscribe(subs=>{
     console.log('subss',subs)
     this.subs=subs
   })
  }
  record(){
    let self=this
    this.common.media().then(audioFile=>{
console.log(audioFile[0].fullPath)
self.audioRecord=audioFile[0].fullPath

this.common.toBase64(audioFile[0].fullPath).then(base64=>{
  var str = base64;
  var res = str.split("data:image/*;charset=utf-8;base64,");
self.audioSend=res;
}).catch(e=>{
  console.log(e)
  this.common.presentToast('خطأ')
})

}).catch(e=>{

      console.log(e)
    })
  }
  sendImage:string=''
  addImage(){
    let self=this;

    this.common.presentActionSheet(this.statics.USE_CAMERA,this.statics.USE_GALARY).then(cameraType=>{
      self.common.camPic(cameraType).then(encodedImage=>{


        self.image='data:image/jpeg;base64,'+encodedImage
       self. sendImage=encodedImage;

})
    })
  }
 ask(){

   let question={
     'student_id':this.user.getuser().user_id,
'grade_id':this.grade_id,

'subject_id':this.subject_id,
'question':this.questionText,
'image_url':this.sendImage,
'audio_url': this.audioSend

   }
   console.log(question)
   this.askProvider.ask(question).subscribe(res=>{

    console.log('response : ',res)
   },(e)=>{
     console.log(e)
   })
 }
}
