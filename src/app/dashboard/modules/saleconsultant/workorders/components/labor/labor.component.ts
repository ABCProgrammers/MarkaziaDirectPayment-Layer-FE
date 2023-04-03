import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../../services/shared.service';
import * as _ from 'underscore';
import { WorkOdersService } from '../../services/workorders.service';
@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.scss'],
})
export class LaborComponent implements OnInit {
  items = [1, 2];

  detaisId: number;
  constructor(
    private collectService: WorkOdersService,
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.detaisId = this.route.snapshot.params['id'];
    // this.detaisId = 62;
    if (this.detaisId) {
      this.GetServicesWorkOrderLabors();
    }
  }

  labors: any;
  totaAmount: number;
  totalRecordCount: number;
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  GetServicesWorkOrderLabors() {
    return this.collectService
      .GetServicesWorkOrderLabors(this.detaisId, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.labors = response.data;
          this.totaAmount = response.info.totaAmount;

          this.totalRecordCount = response.info?.totalRecordCount;

          // this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecordCount / 3);
          this.pages = _.range(this.pagin);
        }
      });
  }

  setPage(page: number) {
    this.pageNo = page;
    this.GetServicesWorkOrderLabors();
  }
}
