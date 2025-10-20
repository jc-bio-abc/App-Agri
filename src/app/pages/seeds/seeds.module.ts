import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SeedsRoutingModule } from './seeds-routing.module';
import { SeedsComponent } from './seeds.component';

@NgModule({
  declarations: [SeedsComponent],
  imports: [CommonModule, MatExpansionModule, MatIconModule, SeedsRoutingModule]
})
export class SeedsModule {}
