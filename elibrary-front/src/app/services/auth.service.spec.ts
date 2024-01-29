import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from "@angular/common/http";

describe('AuthService', () => {

    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthService,

            ]
        });

        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    it('login user successfully', () => {
        authService.signIn({
            email: '123@gmail.com',
            password: '1234'
        }).subscribe((user) => {
            expect(user).toBeTruthy();
        })

        const req = httpTestingController.expectOne('api/auth/signin');
        expect(req.request.method).toBe('POST');

        req.flush({
            access_token: 'someToken'
        })
    });

    it('login user fail', () => {
        authService.signIn({
            email: 'unsuportd mail',
            password: '1234'
        }).subscribe(
            (user) => fail('this test should fail'),
            (error: HttpErrorResponse) => expect(error.status).toBe(500)
        )

        const req = httpTestingController.expectOne('api/auth/signin');
        expect(req.request.method).toBe('POST');

        req.flush('Fail login', {
            status: 500,
            statusText: 'Internal Server Error'
        })
    });

    it('register user successfully', () => {
        authService.signUp({
            email: '123@gmail.com',
            password: '123'
        }).subscribe((user) => {
            expect(user).toBeTruthy();
        })

        const req = httpTestingController.expectOne('api/auth/signup');
        expect(req.request.method).toBe('POST');

        req.flush({
            access_token: 'someToken'
        })
    });

    it('register user fail', () => {
        authService.signUp({
            email: 'unsuportd mail',
            password: '1234'
        }).subscribe(
            (user) => fail('this test should fail'),
            (error: HttpErrorResponse) => expect(error.status).toBe(500)
        )

        const req = httpTestingController.expectOne('api/auth/signup');
        expect(req.request.method).toBe('POST');

        req.flush('Fail register', {
            status: 500,
            statusText: 'Internal Server Error'
        })
    });

    afterEach(() => {
        httpTestingController.verify();
    });
})