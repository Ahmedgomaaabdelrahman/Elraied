var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TeachertabsPage } from './../teachertabs/teachertabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StudenttabsPage } from '../studenttabs/studenttabs';
import { User } from '../../model/UserModel';
import { CommonServerStaticsProvider } from '../../providers/common-server-statics/common-server-statics';
import { AuthProvider } from '../../providers/auth/auth';
import { Statics } from '../../model/StaticsModel';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
var EditaccountPage = /** @class */ (function () {
    function EditaccountPage(user, common, navCtrl, navParams, statics, commonServerStaticsProvider, auth) {
        this.user = user;
        this.common = common;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statics = statics;
        this.commonServerStaticsProvider = commonServerStaticsProvider;
        this.auth = auth;
        this.grades = [];
        this.years = [];
        // console.log(this.navParams.get('type'))
        // this.type=this.navParams.get('type');
        // this.user.USER_TYPE=this.type
        console.log(this.user.getuser());
        var saveduser = this.user.USER;
        this.name = saveduser.name;
        this.phone = saveduser.phone;
        this.password = null;
        this.image = saveduser.image;
        this.password_confirm = null;
        this.email = saveduser.mail;
        // this.statics.USER_TYPE,
        this.grade = saveduser.grade_id;
        this.year = saveduser.year_id;
        // this.image=saveduser.image
    }
    EditaccountPage.prototype.ionViewWillEnter = function () {
        console.log('params', this.user.getuser());
        document.getElementById("passwordCheck").style.display = "none";
        this.assignGradesAndYearslists();
    };
    EditaccountPage.prototype.checkPasswords = function () {
        return this.password == this.password_confirm;
    };
    EditaccountPage.prototype.home = function () {
        var _this = this;
        document.getElementById("passwordCheck").style.display = "none";
        console.log(this.checkPasswords());
        if (this.checkPasswords()) {
            // if()
            var user = {
                'name': this.name,
                'phone': this.phone,
                'password': this.password,
                'password_confirm': this.password_confirm,
                'mail': this.email,
                'type': this.user.USER_TYPE,
                'grade': this.grade,
                'year': this.year,
                'image': this.image
            };
            if (
            // (user.image===""||user.image===null)
            // &&
            (this.image === "" || this.image === null || this.image == this.user.USER.image)) {
                user.image = '';
                //  this.image=''
                console.log(this.image);
            }
            console.log('before edit :', user);
            // return;
            this.common.presentLoadingDefault();
            console.log('params', this.user.getuser().user_id, user);
            this.auth.editUp(this.user.getuser().user_id, user).subscribe(function (res) {
                _this.afterSignUp(res);
            }, function (e) {
                _this.common.loadDismess();
                console.log('error', e);
            });
            // this.navCtrl.push(StudenttabsPage);
        }
        else {
            document.getElementById("passwordCheck").style.display = "block";
        }
    };
    EditaccountPage.prototype.afterSignUp = function (res) {
        var _this = this;
        console.log('error', res['error']);
        if (res['error'] != undefined) {
            this.password = this.password_confirm = null;
            this.common.loadDismess();
            this.common.presentToast(res['error']);
            return;
        }
        console.log('response after edit: ', res);
        this.common.loadDismess();
        this.common.storeValue(this.statics.CURRENT_USER, res).then(function () {
            _this.user.setuser(res);
            if (_this.user.USER.type == '1') {
                _this.navCtrl.setRoot(StudenttabsPage);
            }
            else {
                _this.navCtrl.setRoot(TeachertabsPage);
            }
        });
    };
    EditaccountPage.prototype.assignGradesAndYearslists = function () {
        var _this = this;
        this.grades = [];
        this.years = [];
        this.commonServerStaticsProvider.getGrades().subscribe(function (grades) {
            _this.grades = grades;
            console.log(grades);
        }, function (e) {
            console.log(e);
        });
        this.commonServerStaticsProvider.getYear().subscribe(function (years) {
            _this.years = years;
            console.log(years);
        }, function (e) {
            console.log(e);
        });
    };
    EditaccountPage.prototype.getSelectedYear = function (year) {
        this.year = year['year_id'];
        console.log(year);
    };
    EditaccountPage.prototype.getSelectedGrade = function (grade) {
        this.grade = grade['grade_id'];
        console.log(this.grade);
    };
    EditaccountPage.prototype.profileImage = function () {
        var self = this;
        this.common.presentActionSheet(this.statics.USE_CAMERA, this.statics.USE_GALARY).then(function (cameraType) {
            self.common.camPic(cameraType).then(function (encodedImage) {
                // self.image=encodedImage
                self.image = 'data:image/jpeg;base64,' + encodedImage;
            });
        });
    };
    EditaccountPage = __decorate([
        Component({
            selector: 'page-editaccount',
            templateUrl: 'editaccount.html',
        }),
        __metadata("design:paramtypes", [User,
            CommonServicesProvider,
            NavController,
            NavParams,
            Statics,
            CommonServerStaticsProvider,
            AuthProvider])
    ], EditaccountPage);
    return EditaccountPage;
}());
export { EditaccountPage };
//# sourceMappingURL=editaccount.js.map