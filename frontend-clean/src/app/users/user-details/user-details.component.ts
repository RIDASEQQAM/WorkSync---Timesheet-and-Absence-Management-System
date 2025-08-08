import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports: [CommonModule, MatDialogModule]
})
export class UserDetailsComponent {
  user = inject<User>(MAT_DIALOG_DATA);

  getRoleNames(roles: Role[]): string {
    return roles.map(role => role.name.replace('ROLE_', '')).join(', ');
  }

  getSupervisorName(): string {
    return this.user.supervisor ? this.user.supervisor.name ??  'None': 'None';
  }
}