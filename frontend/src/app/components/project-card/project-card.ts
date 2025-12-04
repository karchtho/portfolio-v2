import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

import { Project } from '../../models/project.model';
import { Button } from '../button/button';

/**
 * ProjectCard Component
 *
 * Displays a single project as a card
 */
@Component({
  selector: 'app-project-card',
  imports: [Button, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCardComponent {
  /**
   * Project data as required input signal
   */
  project = input.required<Project>();
}
