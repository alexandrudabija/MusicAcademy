import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {

footerarray=

["Monday :	10.00 – 20.00 ",
"Tuesday	 :09.30 – 20.00 ",
'Wednesday :	09.30 – 20.00 ',
"Thursday :	09.30 – 20.00 ",
" Friday :	09.30 – 17.00",
"Saturday :	09.30 – 17.00",
" Sunday :	'Closed'",

]




footerObj:any= {
      phone: "068694961", address: "Str Grigore Vieru 15"
    }
  


}
