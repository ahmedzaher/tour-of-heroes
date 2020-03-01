import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    const heroId = +this.activatedRoute.snapshot.paramMap.get('hero-id');
    this.heroService.getHero(heroId).subscribe(hero => this.hero = hero);
  }

  updateHero() {
    this.heroService.updateHero(this.hero)
      .subscribe( _=> this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
