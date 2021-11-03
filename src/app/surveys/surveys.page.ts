import { Component, OnInit } from '@angular/core';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.page.html',
  styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage implements OnInit {
  posts: any = [];
  constructor(public redditService: RedditService, private router: Router) { }
  
  
  ngOnInit() {
    this.redditService.getSuveys().subscribe(data => {
      this.posts = data;
    })
  }

  async view(event, posts) {
    this.router.navigateByUrl('/questions');
    console.log(posts.id);
  }

 
  doRefresh(event) {
    setTimeout(() => {
      this.redditService.getSuveys().subscribe(data => {
        this.posts = data;
      })
      event.target.complete();
    }, 2000);
  }

}
