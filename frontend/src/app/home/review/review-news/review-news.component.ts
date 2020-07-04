import { Component, OnInit } from "@angular/core";
import { ReviewService, PostData } from "../review.service";

@Component({
  selector: "app-review-news",
  templateUrl: "./review-news.component.html",
  styleUrls: ["./review-news.component.scss"],
})
export class ReviewNewsComponent implements OnInit {
  constructor(private reviewService: ReviewService) {}

  allPosts: PostData[];
  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.reviewService
      .listarAll()
      .subscribe((posts) => (this.allPosts = posts));
  }
}
