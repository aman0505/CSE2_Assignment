import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FloatingElementComponent} from '../components/floating-element/floating-element.component';
import {FloatingComponent} from '../components/floating/floating.component';
import {TextRotateComponent} from '../components/text-rotate/text-rotate.component';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Our Website';
  subtitle = 'Your one-stop solution for all your needs';
  features: Feature[] = [
    {
      id: 1,
      title: 'Responsive Design',
      description: 'Our application works seamlessly across all devices and screen sizes.',
      icon: 'devices'
    },
    {
      id: 2,
      title: 'Modern Architecture',
      description: 'Built with the latest technologies to ensure high performance and scalability.',
      icon: 'architecture'
    },
    {
      id: 3,
      title: 'User Experience',
      description: 'Intuitive interfaces designed with the user in mind for maximum usability.',
      icon: 'Technology'
    }
  ];

  showMore = false;

  ngOnInit(): void {
    // Any initialization logic
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }
}


