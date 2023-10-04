import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainFuncService } from '../../services/main-func.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnDestroy{

  private subscription: Subscription;

  constructor(
    private mainFuncService: MainFuncService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
