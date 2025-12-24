import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProjectTable } from "../../components/project-table/project-table";

@Component({
  selector: 'app-admin',
  imports: [ProjectTable],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Admin {

}
