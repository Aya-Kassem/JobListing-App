import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayJobComponent } from './Components/display-job/display-job.component';
import { SearchJobComponent } from './Components/search-job/search-job.component';
import { MainService } from './Services/mainService';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DisplayJobComponent, SearchJobComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jobListingApp';
  constructor(private _MainService: MainService){}
  ngOnInit(){
    // this._MainService.createDatabase().subscribe((res) => {
    //   console.log(res);
      
    // })
  }
}
