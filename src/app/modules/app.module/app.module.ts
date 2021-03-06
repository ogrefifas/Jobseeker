//components
import { AppComponent } from './app.component/app.component';
import {LoadingSectionComponent} from './loadingSection.component/loadingSection.component';
import {HeaderComponent} from './header.component/header.component';
import {SettingsComponent} from './settings.component/settings.component';
//general modules
import { NgModule } from '@angular/core';
import {GeneralModule} from '../general.module/general.module';

//internal modules
import {WorkflowModule} from '../workflow.module/workflow.module';
import {LoginModule} from '../login.module/login.module';
//routing
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

//custom services
import { HttpWrapperService } from '../../general/services/httpWrapper.service';
import { LocalStorageWrapperService } from '../../general/services/localStorageWrapper.service';
import { SharedService } from '../../general/services/shared.service';
import { JWTService } from '../../general/services/jwt.service';
import { AuthService } from '../../general/services/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        LoadingSectionComponent,
        HeaderComponent,
        SettingsComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        GeneralModule,
        WorkflowModule,
        LoginModule
    ],
    exports : [],
    providers: [
        HttpWrapperService,
        JWTService,
        LocalStorageWrapperService,
        SharedService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
