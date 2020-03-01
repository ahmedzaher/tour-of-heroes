import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private messagesService: MessagesService

  ) { }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes() {
    this.heroService.getHeroes().subscribe(_heros => this.heroes = _heros);
  }

  addHero(name: string) {
    if(!name || !name.trim()) {
      return;
    }

    this.heroService.addHero({ name }  as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero.id)
      .subscribe(()=>this.heroes = this.heroes.filter(h => h !== hero));
  }

}
