import { Component, OnInit } from "@angular/core";
import { PostData } from "../home/review/review.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { SearchService } from "./search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  constructor(
    private searchSrv: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getTagCatData();
      }
    });
  }

  ngOnInit(): void {
    this.getTagCatData();
  }

  data: PostData[];

  getTagCatData(): void {
    const id = this.route.snapshot.paramMap.get("id");
    const type = this.route.snapshot.paramMap.get("type");
    this.searchSrv
      .listarPostTagOrCat(id, type)
      .subscribe((posts) => (this.data = posts));
  }
}
