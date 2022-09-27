import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import { FilterComponent } from './filter/filter.component';
import { SlideGalleryComponent } from './slide-gallery/slide-gallery.component';
import { SwiperModule } from 'swiper/angular';
import { NextDirective } from './slide-gallery/next.directive';
import { PrevDirective } from './slide-gallery/prev.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  imports: [SharedLibsModule, SwiperModule, CarouselModule],
  declarations: [
    NextDirective,
    PrevDirective,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    SlideGalleryComponent,
    TimeAgoPipe,
    ShortenPipe,
    UsernamePipe,
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    SlideGalleryComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    TimeAgoPipe,
    ShortenPipe,
    UsernamePipe,
  ],
})
export class SharedModule {}
