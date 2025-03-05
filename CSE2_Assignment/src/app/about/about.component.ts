// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-about',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './about.component.html',
//   styleUrls: ['./about.component.css']
// })
// export class AboutComponent {
//   teamMembers = [
//     {
//       name: 'Nisarg Solanki',
//       position: 'CEO & Founder',
//       bio: 'With over 15 years of industry experience, Jane leads our company vision and strategy.',
//       image: 'https://i.pinimg.com/474x/e7/cb/9e/e7cb9ec21fc52e514e7f2193ab3576d6.jpg'
//     },
//     {
//       name: 'Jaydeep Solanki',
//       position: 'CTO',
//       bio: 'John oversees all technical aspects and ensures we stay at the cutting edge of technology.',
//       image: 'https://i.pinimg.com/474x/61/fa/0c/61fa0c5bfac9a34005a3c45ac808939e.jpg'
//     },
//     {
//       name: 'Vrukshika Oad',
//       position: 'Design Lead',
//       bio: 'Alice brings creative solutions to complex problems with her innovative design approach.',
//       image: 'https://i.pinimg.com/474x/47/79/9d/47799df0501fac813f776c9e85e02371.jpg'
//     }
//     ,
//     {
//       name: 'Krushi Koradiya',
//       position: 'Marketing Lead',
//       bio: 'Mark is responsible for our marketing strategy and execution.',
//       image: 'https://i.pinimg.com/474x/64/57/98/645798ef43ef272d17dd7d468549ae64.jpg'
//     }
//   ];
//
//   companyHistory = [
//     { year: '2018', event: 'Company founded with a mission to revolutionize the industry' },
//     { year: '2020', event: 'Expanded services and doubled team size' },
//     { year: '2022', event: 'Launched innovative new product line' },
//     { year: '2023', event: 'Achieved industry recognition with multiple awards' },
//     { year: '2024', event: 'Opened new headquarters and expanded globally' }
//   ];
// }



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedTestimonialsComponent, Testimonial } from '../components/animated-testimonials/animated-testimonials.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AnimatedTestimonialsComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Nisarg Solanki',
      position: 'CEO & Founder',
      bio: 'With over 15 years of industry experience, Jane leads our company vision and strategy.',
      image: 'https://i.pinimg.com/474x/e7/cb/9e/e7cb9ec21fc52e514e7f2193ab3576d6.jpg'
    },
    {
      name: 'Jaydeep Solanki',
      position: 'CTO',
      bio: 'John oversees all technical aspects and ensures we stay at the cutting edge of technology.',
      image: 'https://i.pinimg.com/474x/61/fa/0c/61fa0c5bfac9a34005a3c45ac808939e.jpg'
    },
    {
      name: 'Vrukshika Oad',
      position: 'Design Lead',
      bio: 'Alice brings creative solutions to complex problems with her innovative design approach.',
      image: 'https://i.pinimg.com/474x/47/79/9d/47799df0501fac813f776c9e85e02371.jpg'
    },
    {
      name: 'Krushi Koradiya',
      position: 'Marketing Lead',
      bio: 'Mark is responsible for our marketing strategy and execution.',
      image: 'https://i.pinimg.com/474x/64/57/98/645798ef43ef272d17dd7d468549ae64.jpg'
    }
  ];

  testimonials: Testimonial[] = this.teamMembers.map(member => ({
    name: member.name,
    designation: member.position,
    quote: member.bio,
    src: member.image
  }));

  companyHistory = [
    { year: '2018', event: 'Company founded with a mission to revolutionize the industry' },
    { year: '2020', event: 'Expanded services and doubled team size' },
    { year: '2022', event: 'Launched innovative new product line' },
    { year: '2023', event: 'Achieved industry recognition with multiple awards' },
    { year: '2024', event: 'Opened new headquarters and expanded globally' }
  ];
}
