
## HY / Fullstack MOOC / Bloglist frontend v3

### Toiminnallisuus  

Blogi sovellus - React/Bootstrap, Node.js ja MongoDB 
Login, blogin lisäys, näyttö jne  
API authentication, Mongo integraatio
Testaus JETS ja Cypress
 

### Luonti  

Luotu kloonaamalla  
git clone https://github.com/fullstack-hy2020/bloglist-frontend  

Asennettu sovelluksen riippuvuudet  
npm install  

Poistettu kloonin repo ja luotu oma repo  
git init  

Asennettu Bootstrap  

### GIT

Tehtävät tallennettu omiin git -haaroihin  
paikallisen haaran push remote haaraan esim  
git push -u origin part4-22  

### Käynnistys  
Frontendin käynnistys  
npm start  
Lisäksi backend pitää olla käynnissä portissa 3001  
npm run dev  

### Edistyminen

5.1: blogilistan frontend, step1  
Login ja blogien esitys toiminnallisuus  

5.2 blogilistan frontend, step2 - git branch part5-02  
User/Token tallennus local storage. Logout tyhjentää local storage.  

5.3: blogilistan frontend, step3  
Kirjautunut käyttäjä voi lisätä uuden blogin  

5.4*: blogilistan frontend, step4  - git branch part5-04  
Notifikaatiot onnistuneista ja epäonnistuneista toimenpiteistä  

5.5 blogilistan frontend, step5  
"Uusi blogi" on näkyvissä vain pyydettäessä  

5.10
Delete -toiminto vain blogin luoneelle käyttäjälle.  

5.7* blogilistan frontend, step7  
View -toiminto joka näyttää blogin lisätiedot  

5.8*: blogilistan frontend, step8  
Like -toiminto joka lisää blogille "tykkäyksiä".  

5.9*: blogilistan frontend, step9  - git branch part5-10  
Sorttaa blogin taulukon tykkäysten lukumäärän perusteella   

5.13: blogilistan testit, step1  
Asennettu react-testing-library ja jest-dom  
npm install --save-dev @testing-library/react @testing-library/jest-dom  
Testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen,  
authorin mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.  
Ei tehty testejä - blogFront poikkeaa paljon esimerkeistä.   

5.17: blogilistan end to end -testit, step1  
Asennettu Cybress kirjasto  
npm install --save-dev cypress  

Testien käynnistys:  
backend käynnistys - npm run start:test  
frontend käynnistys - npm start   
testi scriptin käynnistys - npm run cypress:open  
testit tallennetaan /cypress/integration

Testi, joka varmistaa, että sovellus näyttää oletusarvoisesti kirjautumislomakkeen.  

5.18: blogilistan end to end -testit, step2  
Testit kirjautumiselle, testaa sekä onnistunut että epäonnistunut kirjautuminen.  

Asennettu Eslint laajennus - poistaa eslint herjat "cy."  
npm install eslint-plugin-cypress --save-dev  

5.19: blogilistan end to end -testit, step3  - git branch part5-19  
Testi, joka varmistaa, että kirjaantunut käyttäjä pystyy luomaan blogin.  


### Blogilistan laajennus ja refaktorointi.  
Otetaan käyttöön mm. Redux, React-router ja tyylejä.  

7.9: redux, step1  - git branch part7-09  
Asennettu Redux  
npm install redux --save  

Asennettu react-redux. Hyödynnetään <Provider /> komponenttia välittämään  
redux-storen eri komponenteille  
npm install --save react-redux  

Asennettu Redux DevTools, jonka avulla Redux-storen tilaa ja sitä muuttavia  
actioneja on mahdollisuus seurata selaimen konsolista.  
npm install --save-dev redux-devtools-extension  

Asennettu redux-thunk -kirjasto, joka mahdollistaa asynkronisten actionien luomisen.  
npm install --save redux-thunk  

Luotu  
/reducers -hakemisto  
store.js 

Notification käyttää Reduxia  

7.10: redux, step2  
Sovellus näyttää kaikki blogit redux'sta.  
Uuden blogin lisäys ok.    

7.11: redux, step3  - git branch part7-11  
Blogien "liketys" ok.  
Blogin poisto ok.  

7.12: redux, step4  
UNDER CODING: user >> reduxiin   
NEXT : LOGIN




