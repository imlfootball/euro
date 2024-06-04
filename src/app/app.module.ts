// Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { LoginComponent } from './shared/components/login/login.component';
import { MatchlistComponent } from './shared/components/matchlist/matchlist.component';
import { MatchdetailsComponent } from './shared/components/matchdetails/matchdetails.component';
import { MatchComponent } from './shared/components/match/match.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { BestScorerComponent } from './pages/games/best-scorer/best-scorer.component';
import { CorrectScoreComponent } from './pages/games/correct-score/correct-score.component';
import { BracketComponent } from './pages/games/bracket/bracket.component';
import { QuizComponent } from './pages/games/quiz/quiz.component';
import { RankingComponent } from './pages/games/ranking/ranking.component';
import { GamesComponent } from './pages/competition/games/games.component';
import { TeamsComponent } from './pages/competition/teams/teams.component';
import { StadiumsComponent } from './pages/competition/stadiums/stadiums.component';
import { StatisticsComponent } from './pages/competition/statistics/statistics.component';
import { ErrorComponent } from './pages/error/error.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HeroComponent } from './shared/components/hero/hero.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HpnewsComponent } from './components/hpnews/hpnews.component';
import { TeamDetailsComponent } from './shared/components/team-details/team-details.component';
import { BreadcrumpComponent } from './shared/components/breadcrump/breadcrump.component';
import { CacheInterceptor } from './shared/services/core/cacheinterceptor.interceptor';
import { TabcontentComponent, TabContentDirective } from './shared/components/tabcontent/tabcontent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ArticlesComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    LoginComponent,
    MatchlistComponent,
    MatchdetailsComponent,
    MatchComponent,
    LayoutComponent,
    DialogComponent,
    NavComponent,
    BestScorerComponent,
    CorrectScoreComponent,
    BracketComponent,
    QuizComponent,
    RankingComponent,
    GamesComponent,
    TeamsComponent,
    StadiumsComponent,
    StatisticsComponent,
    ErrorComponent,
    FaqComponent,
    HeroComponent,
    LoaderComponent,
    HpnewsComponent,
    TeamDetailsComponent,
    BreadcrumpComponent,
    TabcontentComponent,
    TabContentDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
