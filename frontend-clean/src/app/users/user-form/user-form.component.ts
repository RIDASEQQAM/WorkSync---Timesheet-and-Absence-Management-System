import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';
import { Role, RoleEnum } from '../../models/role.model';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private dialogRef = inject<MatDialogRef<UserFormComponent>>(MatDialogRef);
  data = inject<{
    user: User;
    isEdit: boolean;
}>(MAT_DIALOG_DATA);

  userForm!: FormGroup;
  roles: Role[] = [];
  supervisors: User[] = [];
  isEdit = false;
  roleEnum = RoleEnum;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const data = this.data;

    this.isEdit = data.isEdit;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
    this.loadSupervisors();

    if (this.isEdit && this.data.user) {
      this.patchForm(this.data.user);
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.isEdit ? null : Validators.required],
      address: [''],
      phone: [''],
      socialInsuranceNumber: [''],
      hireDate: ['', Validators.required],
      supervisor: [null],
      hourlyRate: [''],
      roles: [[], Validators.required]
    });
  }

  patchForm(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      socialInsuranceNumber: user.socialInsuranceNumber,
      hireDate: user.hireDate,
      supervisor: user.supervisor,
      hourlyRate: user.hourlyRate,
      roles: user.roles.map(role => role.id)
    });

    if (this.isEdit && this.userForm && this.userForm.get('password')) {
      this.userForm?.get('password')?.clearValidators();
      this.userForm?.get('password')?.updateValueAndValidity();
    }
  }

  loadRoles(): void {
    this.userService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  loadSupervisors(): void {
    this.userService.getSupervisors().subscribe(supervisors => {
      this.supervisors = supervisors;
    });
  }

  compareRoles(role1: Role, role2: Role): boolean {
    return role1 && role2 ? role1.id === role2.id : role1 === role2;
  }

  compareUsers(user1: User, user2: User): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      if (this.isEdit) {
        this.userService.updateUser(this.data.user.id, userData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.userService.createUser(userData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}