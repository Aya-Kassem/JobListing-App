import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ToastModule } from 'primeng/toast';
import { BehaviorSubject, Subscription } from "rxjs";
import { MessageService } from 'primeng/api';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'AppToast',
  standalone: true,
  imports: [ToastModule, CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class AppToast {
  subscription!: Subscription;
  constructor(private _messageService: MessageService) { }
  @Input() msg!: string;
  @Input() fire!: BehaviorSubject<boolean>;
  @Input() type!: string;
  @Output() response: EventEmitter<boolean> = new EventEmitter();

  ngAfterContentInit() {
    this.subscription = this.fire.subscribe((val) => {
        if (val) {
            setTimeout(() => {
                this.show()
            }, 100)
        }
    });
  }

  show() {
    this._messageService.add({
      severity: 'success',
      summary: this.msg,
      life: 2000,
    });
  }

  toastEnded() {
    this.response.emit(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
