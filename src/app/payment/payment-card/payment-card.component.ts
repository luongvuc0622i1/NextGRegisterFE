import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-card',
  template: `
    <ng-container *ngIf="itemChoose != 'card'; else cardTemplate">
      <ng-container *ngIf="itemChoose != 'debit'; else debitTemplate">
        <ng-container *ngIf="itemChoose != 'ali'; else aliTemplate">
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #cardTemplate>
      <app-card [countries]="countries" (findDiscountPer)="findDiscountPer($event)" [discountMessage]="discountMessage" [formTotal]="formTotal" (payByCard)="payByCard($event)"></app-card>
    </ng-template>
    <ng-template #debitTemplate>
      <app-bank [banks]="banks" [countries]="countries" (findDiscountPer)="findDiscountPer($event)" [discountMessage]="discountMessage" [formTotal]="formTotal" (payByBank)="payByBank($event)"></app-bank>
    </ng-template>
    <ng-template #aliTemplate>
      <app-alipay [countries]="countries" (findDiscountPer)="findDiscountPer($event)" [discountMessage]="discountMessage" [formTotal]="formTotal" (payByAlipay)="payByAlipay($event)"></app-alipay>
    </ng-template>
  `,
  styleUrls: ['../payment.component.css']
})
export class PaymentCardComponent {
  // @ts-ignore
  @Input formTotal: FormGroup;
  // @ts-ignore
  @Input countries: string[];
  // @ts-ignore
  @Input banks: any[];
  // @ts-ignore
  @Input discountMessage: string;
  itemChoose: string = 'card';
  @Output() findDiscount = new EventEmitter<string>();
  @Output() payWithCard = new EventEmitter<any>();
  @Output() payWithAlipay = new EventEmitter<any>();
  @Output() payWithBank = new EventEmitter<any>();

  findDiscountPer(discountCode: string) {
    this.findDiscount.emit(discountCode);
  }

  payByCard(event: any) {
    this.payWithCard.emit(event);
  }

  payByAlipay(event: any) {
    this.payWithAlipay.emit(event);
  }

  payByBank(event: any) {
    this.payWithBank.emit(event);
  }
}