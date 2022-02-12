import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/user/services/user.service';
import { TokenService } from '../../services/token.service';
import { RenewComponent } from '../renew/renew.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string | undefined = this.tokenService.currentUser?.userName;
  timeout: number = this.calcSeconds(this.tokenService.currentUser?.expired);

  interval: any;
  reNewOpen: Boolean = false;

  constructor(private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.timeout > 0) 
      this.startTimer();

    this.tokenService.currentUser$.subscribe(s => {
      if(this.interval)
          clearInterval(this.interval);

      if(s) {
        this.userName = s.userName;
        this.timeout = this.calcSeconds(s.expired);

        this.startTimer();
      } else
        this.userName = undefined;
    });
  }

  logout() {
    this.tokenService.removeUser();
    this.router.navigateByUrl("/user/login");
  }

  transform(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    return String(minutes).padStart(2, "0") + ':' + String(seconds - minutes * 60).padStart(2, "0");
  }

  private openRenew() {
    this.reNewOpen = true;
    this.modalService.open(RenewComponent).result.then((result) => {
      if(result === 'OK') {
        this.userService.renewToken().subscribe(() => {
          this.reNewOpen = false;
        },
          () => {
            console.log('Error');
          });
      }
    });

  }

  private calcSeconds(expired: number | undefined) {
    if(!expired)
      return 0;

    return Math.floor((new Date(expired * 1000).getTime() - new Date().getTime())/1000);
  }

  private startTimer() {
    this.interval = setInterval(() => {
      this.timeout--;

      if(this.timeout < 300 && !this.reNewOpen)
        this.openRenew();

      if(this.timeout < 1) {
        clearInterval(this.interval);
        this.logout();
      }        
    }, 1000);
  }
}
