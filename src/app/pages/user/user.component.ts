import { User } from '../model/user';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultSignupLayoutComponent } from '../../components/default-signup-layout/default-signup-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatPaginatorModule, MatIconModule, MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  //users: Observable<User[]>;
  displayedColumns = ['name', 'email', 'password', 'gender', 'actions'];

  constructor(private userService: UserService){

    //this.users = this.userService.list();
  }
}
