import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../../services/shared.service';
import * as _ from 'underscore';
import { WorkOdersService } from '../../services/workorders.service';

@Component({
  selector: 'app-spare-parts',
  templateUrl: './spare-parts.component.html',
  styleUrls: ['./spare-parts.component.scss'],
})
export class SparePartsComponent implements OnInit {
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
      this.GetServicesWorkOrderSpareparts();
    }
  }

  Spareparts: any;
  totaAmount: number;
  totalRecordCount: number;
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  GetServicesWorkOrderSpareparts() {
    return this.collectService
      .GetServicesWorkOrderSpareparts(this.detaisId, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.Spareparts = response.data;
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
    this.GetServicesWorkOrderSpareparts();
  }
}
