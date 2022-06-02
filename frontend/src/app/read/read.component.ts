import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;
  sucessMsg:any;
  searchValue!:string;
  
  ngOnInit(): void {
    this.getAllData();
  }

    deleteID(id:any){
      console.log(id,'deleteid==>');
      this.service.deletarDados(id).subscribe((res)=>{
        console.log(res,'deleteres==>');
        this.sucessMsg = res.message;
        this.getAllData();
      });

    }
     getAllData(){
       this.service.getAllData().subscribe((res)=>{
          console.log(res,"res==>");
          this.readData = res.data;
        });
     }
}
