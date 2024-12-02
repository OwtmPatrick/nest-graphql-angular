import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from '../pages/home/ui/home/home.component';
import { AppRoutingModule } from './routes/routing.module';
import { GraphQLModule } from './api/graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PropertiesListComponent } from '../pages/home/ui/properties-list/properties-list.component';
import { FilterComponent } from '../pages/home/ui/filter/filter.component';
import { HeaderComponent } from 'src/widgets/header/header.component';
import { LoginComponent } from 'src/pages/login/ui/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from 'src/pages/login/config/BaseUrlInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropertiesListComponent,
    FilterComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // material -ui
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
