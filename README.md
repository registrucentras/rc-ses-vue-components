# RC-SES Vue.js komponentų biblioteka

Šioje repozitorijoje rasite RC-SES Vue.js komponentų bibliotekos išeities kodą. Biblioteką sudaro:
 - pagal bendrą RC-SES gidą stilizuoti funkcionalūs paslaugų užsakymo formų komponentai;
 - struktūriniai sąsajos išdėstymo komponentai formų ir paslaugos užsakymo puslapio atvaizdavimui;
 - pavyzdinės (demo) formos komponentas su visais šioje bibliotekos versijoje prieinamais komponentais;
 - [Storybook](https://storybook.js.org/docs) komponentų ekspozicija, atvaizduojanti galimas komponentų variacijas, panaudojimo scenarijus, bei naudotinus parametrus.

## Prerekvizitai

1. Įsitikinkite, kad turite įdiegtą bent **18.3** arba naujesnę [Node.js](https://nodejs.org/en) versiją;
2. Jei to dar nepadarėte, lokaliai klonuokite `rc-ses-vue-components` projektą:
    ```bash
    git clone git@github.com:registrucentras/rc-ses-vue-components.git
    ```
3. Terminale atidarykite klonuoto projekto šakinį aplanką ir sudiekite projektui reikiamas bibliotekas:
    ```bash
    npm i
    ```

## Storybook

Repozitorijoje galite rasti [Storybook](https://storybook.js.org/docs) komponentų ekspoziciją, kuri leis susipažinti su bibliotekos teikiamais komponentais, jų variacijomis bei panaudojimo pavyzdžiais.

Norėdami lokaliai startuoti Storybook aplikaciją:
 - įsitikinkite, kad išpildytos visos sąlygos ir sėkmingai įvykdyti prerekvizitų skilties žingsniai;
 - atidarykite terminalą ir projekto šakniniame kataloge įvykdykite komandas:
    ```bash
      npm run build-storybook
      npm run preview-storybook
    ```
 - naršyklėje atidarykite nuorodą [http://localhost:8083/](http://localhost:8083/) (prievadas gali kisti, jei `8083` jau yra rezervuotas, tokiu atveju terminale bus išvesta nuoroda su automatiškai priskirtu alternatyviu prievadu).

## Pavyzdinė forma

Repozitorijoje galite rasti pavyzdinės formos komponento implementaciją (`src\pages\index.ts` ir `src\components\forms\*`).

Norėdami peržiūrėti pavyzdinę formą naršyklėje:

 - sukompiliuokite aplikaciją: `npm run build`;
 - startuokite aplikaciją *preview* rėžime: `npm run preview`;
 - naršyklėje atidarykite [http://localhost:4173/](http://localhost:4173/);

Alternatyviai, esant poreikiui pavyzdinės formos peržiūra galima ir *development* rėžime:

 - sukompiliuokite aplikaciją: `npm run dev`;
 - naršyklėje atidarykite [http://localhost:3000/](http://localhost:3000/);
