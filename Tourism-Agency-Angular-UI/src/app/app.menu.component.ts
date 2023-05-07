import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard'] },
            {
                label: 'Kullanıcılar', icon: 'pi pi-star',
                items: [
                    { label: 'Kullanıcılar', icon: 'pi pi-users', routerLink: ['/component/user/list'] },
                    { label: 'Kullanıcı ekle', icon: 'pi pi-plus', routerLink: ['/component/user/add'] }
                ]
            },
            {
                label: 'Tur', icon: 'pi pi-car',
                items: [
                    { label: 'Turlar', icon: 'pi pi-ticket', routerLink: ['/component/tour/list'] },
                    { label: 'Tur ekle', icon: 'pi pi-plus', routerLink: ['/component/tour/add'] },
                    { label: 'Tura tur ekle', icon: 'pi pi-plus', routerLink: ['/component/tour/item'] }
                ]
            },
            // {
            //     label: 'UI Kit', icon: 'pi pi-star', routerLink: ['/uikit'],
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Float Label', icon: 'pi pi-bookmark', routerLink: ['/uikit/floatlabel'] },
            //         { label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
            //         { label: 'Button', icon: 'pi pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
            //         { label: 'Table', icon: 'pi pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-bars', routerLink: ['/uikit/menu'], preventExact: true },
            //         { label: 'Message', icon: 'pi pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Misc', icon: 'pi pi-circle-off', routerLink: ['/uikit/misc'] }
            //     ]
            // },
            // {
            //     label: 'Prime Blocks', icon: 'pi pi-prime', routerLink: ['/blocks'],
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'] },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities', icon: 'pi pi-compass', routerLink: ['/utilities'],
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Pages', icon: 'pi pi-briefcase', routerLink: ['/pages'],
            //     items: [
            //         { label: 'Crud', icon: 'pi pi-pencil', routerLink: ['/pages/crud'] },
            //         { label: 'Calendar', icon: 'pi pi-calendar-plus', routerLink: ['/pages/calendar'] },
            //         { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline'] },
            //         { label: 'Landing', icon: 'pi pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
            //         { label: 'Login', icon: 'pi pi-sign-in', routerLink: ['/login'] },
            //         { label: 'Invoice', icon: 'pi pi-dollar', routerLink: ['/pages/invoice'] },
            //         { label: 'Help', icon: 'pi pi-question-circle', routerLink: ['/pages/help'] },
            //         { label: 'Error', icon: 'pi pi-times-circle', routerLink: ['/error'] },
            //         { label: 'Not Found', icon: 'pi pi-exclamation-circle', routerLink: ['/notfound'] },
            //         { label: 'Access Denied', icon: 'pi pi-lock', routerLink: ['/access'] },
            //         { label: 'Empty', icon: 'pi pi-circle-off', routerLink: ['/pages/empty'] }
            //     ]
            // },
            // {
            //     label: 'Hierarchy', icon: 'pi pi-align-left',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-align-left',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-align-left' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-align-left' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-align-left' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-align-left',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-align-left' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-align-left',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-align-left' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-align-left' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-align-left',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-align-left' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Start', icon: 'pi pi-download',
            //     items: [
            //         {
            //             label: 'Buy Now', icon: 'pi pi-shopping-cart', url: ['https://www.primefaces.org/store']
            //         },
            //         {
            //             label: 'Documentation', icon: 'pi pi-info-circle', routerLink: ['/documentation']
            //         }
            //     ]
            // },
        ];
    }
}
