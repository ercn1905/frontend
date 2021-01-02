import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading = false;
  submitted = false;
  user: User;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('',[ Validators.required, Validators.email ]),
    address: new FormControl('',Validators.required),
    password: new FormControl('',[ Validators.required, Validators.minLength(6) ]),
    fullname: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    check: new FormControl('',Validators.required)
  });

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }
  get f() { return this.registerForm.controls; }


  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
  }

}
