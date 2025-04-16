import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../Interfaces/menu';
import { MenuService } from '../../Services/menu.service';
import { UtilityService } from '../../Reusable/utility.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  listMenus: Menu[] = [];
  fullName: string = '';
  rolUsers: string = '';

  constructor(
    private router: Router,
    private _menuService : MenuService,
    private _utilityService : UtilityService
  ) {}

  ngOnInit(): void {
    const user = this._utilityService.gateUserSession();

    if(user != null){
      this.fullName = user.fullName;
      this.rolUsers = user.roleDescription;
      this._menuService.list(user.idUsers).subscribe({
        next: (data) =>{
          if(data.status) this.listMenus = data.value;
        },
        error:(e)=>{}
      })
    }
  }

  logOff(){
    this._utilityService.deleteUserSession();
    this.router.navigate(['login'])
  }
}
