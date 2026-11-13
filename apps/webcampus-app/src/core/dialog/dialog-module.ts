import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { DialogService } from './dialog-service';

@NgModule({
  declarations: [],
  imports: [OverlayModule],
  providers: [DialogService],
})
export class DialogModule {}
