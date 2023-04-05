import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { HeaderService } from '../../../../services/header.service';
import { SharedService } from 'src/app/services/shared.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { WorkOdersService } from './services/workorders.service';

@Component({
  selector: 'app-work-order',
  templateUrl: './workorders.component.html',
  styleUrls: ['./workorders.component.scss'],
})
export class WorkOrdersComponent implements OnInit {
  branches!: any[];
  totalRecords!: number;
  totalPages!: number;
  errorMessage: any;
  totalAllRecordsCount: number;
  searchText: string = '';
  lookups:any;
  vin: string = '';
  opportunityNo:string='';
  sort: number = 1;
  branchTypes: any = [];
  branchId: number;
  bId: number;
  Id:number;
  typeName: string = 'Showroom Branches';
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  select: number;
  roleId: number;
  serviceAdvisorId: string = '';
  salesConsultantId: string = '';
  statusId: string='';
  @Output() titleOfPage = new EventEmitter<string>();

  isService: boolean = true;
  isRevenus: boolean;
  collectionOrderNum: number;

  constructor(
    private WorkOdersService: WorkOdersService,
    private router: Router,
    public headerService: HeaderService,
    public sharedService: SharedService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.headerService.setTitle('Direct Payment Work Orders');

     if (localStorage.getItem('collectBranchId')) {
       this.branchId = +localStorage.getItem('collectBranchId');
     }

     if (localStorage.getItem('branch')) {
      var branch = JSON.parse(localStorage.getItem('branch'));
      this.branchId=branch.branchId;
    }
    this.getlookup();
     this.GetServicesDirectPaymentWorkOrders();
  }

  ViewCollectDetails(item) {

    // localStorage.setItem('collectionOrderNum',this.collectionOrderNum.toString());

    if (this.branchId) {
      console.log(this.branchId);
      localStorage.setItem('collectBranchId', this.branchId?.toString());
    }
    
    if (this.searchText) {
      localStorage.setItem('collectSearchText', this.searchText);
    }
    if (this.vin) {
      localStorage.setItem('collectVin', this.vin);
    }

    this.headerService.setTitle('Direct Payment Work Orders > Order Details');
   this.router.navigateByUrl('/workorders/details/' + item.directPaymentSalesOrderOpportunityNo);
   
  }
  tabIndex: number = 0;
  isForAll: boolean = false;
  registers: any;
  collectionOrder: any;
  totalRecordsCount: number;
  ServicesWorkOrders: any;
  DirectPaymentSalesOrders: any;
  collects: any;
  workorders:any;
  GetServicesDirectPaymentWorkOrders() {
    debugger
      return this.WorkOdersService
      .GetServicesDirectPaymentWorkOrders(
        this.branchId,
        this.searchText,
        this.vin,
        this.statusId,
        this.serviceAdvisorId,
        this.sort,
        this.pageNo
      )
      .subscribe((response: any) => {
        
        if (response) {
          this.workorders = response.data;
          
console.log(this.workorders);
          this.totalRecordsCount = response.info?.totalRecordsCount;
          this.totalAllRecordsCount = response.info?.totalAllRecordsCount;
          this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
        }
      });
  }
  removeSearch() {
    this.searchText = '';
    this.pageNo = 0;
    this.sort = 1;
   this.loadDataWithCheck();
  }
  GetDirectPaymentSalesOrders() {
    return this.WorkOdersService
      .GetDirectPaymentSalesOrders(
        this.branchId,
        this.searchText,
        this.vin,
        this.salesConsultantId,
        this.sort,
        this.pageNo
      )
      .subscribe((response: any) => {
        if (response) {
          this.collects = response.data;

          this.totalAllRecordsCount = response.info?.totalAllRecordsCount;
          this.totalRecordsCount = response.info?.totalRecordsCount;
          this.totalRecords = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecords / 6);
          this.pages = _.range(this.pagin);
          // console.log(this.pagin);
          // console.log(this.pages);
        }
      });
  }



  getlookup() {
    return this.WorkOdersService.getLookupsById(10).subscribe((response: any) => {
      if (response) {
        this.lookups = response.data;
      }
    });
  }

  // users: any;
  // getUsers() {
  //   console.log('his.users');
  //   return this.WorkOdersService
  //     .getUsers(this.roleId)
  //     .subscribe((response: any) => {
  //       if (response) {
  //         this.users = response.data;
  //       }
  //     });
  // }

  



  search(event: any) {
   
    // console.log(event?.target.value);
    const text = event.target.value;
    // console.log(text.length);
    if (text.length >= 3) {
      
      this.searchText = text;
      this.pageNo = 0;
      this.loadDataWithCheck();
    }
    if (text.length == 0) {
      this.loadDataWithCheck();
    }
  }
  searchVin(event: any) {
    debugger
    console.log(event?.target.value);
    const text = event.target.value;
    console.log(text.length);
    if (text.length >= 3) {
      this.vin = text;
      this.pageNo = 0;
     this.loadDataWithCheck();
    }
    if (text.length == 0) {
      this.loadDataWithCheck();
    }
  }
  removeSearchVin() {
  
    this.vin = '';
    this.pageNo = 0;
    this.sort = 1;
    this.loadDataWithCheck();
  }

  SearchOpportunityNo(event:any){
    debugger;
    console.log(event?.target.value);
    //const text = event.target.value;
    if (event.target.value.length >= 2) {
      this.opportunityNo = event.target.value;
      this.pageNo = 0;
      this.serviceAdvisorId=this.opportunityNo;
     this.loadDataWithCheck();
    }
    if (event.target.value == 0) {
      this.serviceAdvisorId='';
      this.loadDataWithCheck();
    }
  }
  removeSearchOpportunityNo(){
    debugger;
    this.opportunityNo = '';
    this.serviceAdvisorId='';
    this.pageNo = 0;
    this.sort = 1;
    this.loadDataWithCheck();
  }
  sortByCustomer() {
    debugger
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }

    this.GetServicesDirectPaymentWorkOrders();
  }
  sortByType() {
    debugger
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.GetServicesDirectPaymentWorkOrders();
  
  }
  sortByStatus() {
    debugger
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.GetServicesDirectPaymentWorkOrders();
  }

  sortByDate() {
    debugger
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.GetServicesDirectPaymentWorkOrders();
  }

 

  setPage(page: number) {
    this.pageNo = page;
    this.GetServicesDirectPaymentWorkOrders();
  }

  collectUserId: number;
  filterByStatusId(e){
    
    console.log(e);
    this.statusId=e.id;
    this.pageNo = 0;
    this.loadDataWithCheck();
   
  }
  loadDataWithCheck() {
    this.GetServicesDirectPaymentWorkOrders();
  }
 
  clearStatus($event) {
    this.serviceAdvisorId = '';
    this.statusId='';
      this.GetServicesDirectPaymentWorkOrders();
    
  }
}
