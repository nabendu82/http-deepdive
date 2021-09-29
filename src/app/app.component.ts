import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http.post<{ name: string }>(
      'https://angular-http-demo-768df-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', 
        postData).subscribe(res => {
        console.log(res)
      })
  }
  
  onFetchPosts() {
    this.fetchPosts();
  }
  
  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>(
    'https://angular-http-demo-768df-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
    .pipe(map(res => {
      const posts: Post[] = [];
      for(const key in res){
        posts.push({ ...res[key], id: key })
      }
      return posts;
    }))
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    })
  }

  onClearPosts() {
    // Send Http request
  }

}
