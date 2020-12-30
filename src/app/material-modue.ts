import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    exports: [MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatTabsModule,
        MatProgressBarModule,
        MatSelectModule
    ]
})
export class MaterialModule {}
