import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    {
      title: 'Web Development',
      description: 'Building responsive and high-performance web applications.',
      icon: 'web'
    },
    {
      title: 'Mobile Development',
      description: 'Creating mobile applications for both Android and iOS platforms.',
      icon: 'smartphone'
    },
    {
      title: 'Cloud Services',
      description: 'Offering scalable cloud solutions for your business needs.',
      icon: 'cloud'
    }
  ];
}
