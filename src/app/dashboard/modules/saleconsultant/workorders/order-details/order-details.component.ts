import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../../services/shared.service';
import { ModalMessageComponent } from '../../../../../shared/components/modal-message/modal-message.component';
import { WorkOdersService } from '../services/workorders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  items = [1, 2];

  detailsType: string;
  colType: number;
  detailsId: any;
  constructor(
    private collectService: WorkOdersService,
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    debugger;
    //this.detailsType = this.route.snapshot.params['type'];
    this.detailsId = this.route.snapshot.params['id'];
    this.GetServiceDirectPaymentWorkOrdersDetails();
  }

  details: any;
  custmerName: string;
  statusObj:any;
  GetServiceDirectPaymentWorkOrdersDetails() {

    return this.collectService
      .GetServiceDirectPaymentWorkOrdersDetails(this.detailsId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
          debugger;
          const customername = this.details.customer.customerName.split(' ');
          let firstChar = customername[0];
          let secChar = customername[1];
          this.custmerName = firstChar.charAt(0) + ' ' + secChar.charAt(0);
          this.statusObj=this.details.statusObj;
        }
      });
  }

  GetDirectPaymentSalesOrdersDetails() {
    return this.collectService
      .GetDirectPaymentSalesOrdersDetails(this.detailsId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
          const customername = this.details?.customer.customerName.split(' ');
          let firstChar = customername[0];
          let secChar = customername[1];
          this.custmerName = firstChar.charAt(0) + ' ' + secChar.charAt(0);
        }
      });
  }

  GetSparePartsSalesOrdersDetails() {
    return this.collectService
      .GetSparePartsSalesOrdersDetails(this.detailsId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
          const customername = this.details?.customer.customerName.split(' ');
          let firstChar = customername[0];
          let secChar = customername[1];
          this.custmerName = firstChar.charAt(0) + ' ' + secChar.charAt(0);
        }
      });
  }

}
