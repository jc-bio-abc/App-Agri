import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SeedsRoutingModule } from './seeds-routing.module';
import { SeedsComponent } from './seeds.component';

@NgModule({
  declarations: [SeedsComponent],
  imports: [CommonModule, MatExpansionModule, MatIconModule, TranslateModule, SeedsRoutingModule]
})
export class SeedsModule {}
