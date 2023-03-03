import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent {

public text1='The Music  Academy aims to train open-minded and internationally oriented students. The course offers a broad training in the most important Musical fields and an excellent introduction to the Musical Arts business. Moreover, the program offers an introduction to the operation of the main European institutions, with a special emphasis on Individuality and Quality. Students perspectives will be enriched by the international learning environment offered by the Music academy. ';
public text2='Innovative program aimed at training a new class of talented people, responding to the specific requirements of the national and international labor markets. School Acd combines strong quantitative skills in personal training as an artist with rigorous thinking towards personal development and growth, combining traditional courses and based on the experience of teachers. Graduates will be fully bilingual in the Musical field.';
public text3='International Diploma: The 4-year Academic Course sets students on an international career from day one, with an understanding of various disciplines from Music history to Harmony, Composition, Singing, statistics, methodology and how they influence contemporary societies. Teaching is enhanced through data analysis and personal skills, academic language, internships and opportunities to study abroad. Graduates will improve their knowledge of English, the working language of the program and a foreign language (Italian, French and Russian).';

volume: number = 0;

ngOnInit() {
  this.start();
}

start() {
  const video = document.getElementById('bg-video') as HTMLVideoElement;
  video.volume = this.volume; // mute the video
}

soundOn() {
  const video = document.getElementById('bg-video') as HTMLVideoElement;
  this.volume = this.volume === 0 ? 1 : 0; // toggle volume between 0 and 1
  video.volume = this.volume;
}
}
