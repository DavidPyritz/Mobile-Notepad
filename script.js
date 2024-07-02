let titles = [];    //array leer variablen
let notices = [];
let trashTitle = [];
let trashNotice = [];

load();                     //lädt Daten vom Localstorage

function render() {                                                 //lädt die HTML Dateien
    let mainContainer = document.getElementById('mainContainer')    //was in container mit id mainContainer drin ist(index.HTML), übergebe ich an eine Variable
    mainContainer.innerHTML = getMainHtml();                        //greife auf den Code innerhalb des mainContainer.innerHTML zu,

    let trashLike = document.getElementById('trashLike');           //was in container mit id trashLike wandelt in variable um, angezeigt wird
    for (let i = 0; i < trashNotice.length; i++) {                  //führt zeile 14 aus, solange variable aus wie vorgegeben ist (trashNotice.length) (Bedingung erfüllt ist)
        trashLike.innerHTML += getTrashHtml(trashTitle, trashNotice, i);   //somit muss man die funnktion nur einmal aufschreiben und wird beliebig(trashNotice.length) oder bis Bsp.: 10 notizen ausgeführt 
    }

    let completeNotice = document.getElementById('myposts');            //was in container mit id myposts drin ist(index.HTML), übergebe ich an eine Variable
    for (let i = 0; i < notices.length; i++) {                          //solange variable aus wie vorgegeben ist (notices.length)
        completeNotice.innerHTML += getNoticeHtml(titles, notices, i);  //somit muss man die funnktion nur einmal aufschreiben und wird beliebig(notices.length) oder bis Bsp.: 10 notizen ausgeführt 
    }
}
                                                                        
function addNote() {                                                    
    let text = document.getElementById('title').value;                 //greife auf alles in inputfeld zu und übergebe an eine variable text <input type="text" id="title" placeholder="Title">
    let name = document.getElementById('notice').value;                //greife auf alles in inputfeld zu und übergebe an eine variable name <textarea type="text" id="notice" placeholder="Take a note..."></textarea>
    titles.push(text);                                                 //das was in die variable text reingeschrieben wurde, wird in das array titles reingeschrieben
    notices.push(name);                                                //das was in die variable name reingeschrieben wurde, wird in das array notices reingeschrieben
    save();
    render();                                                          //Hinweis man muss vorher pushen, bzw nicht weiterverwendet werden, weil die (value)gelöscht ist also gleich null, leere String
    document.getElementById('title').value = '';                       //wenn man was in das inputfeld 'title' geschrieben hat, wird danach der Inhalt wieder gelöscht
    document.getElementById('notice').value = '';                      //wenn man was in das inputfeld 'notice' geschrieben hat, wird danach der Inhalt wieder gelöscht
    save();
    render();
}

function deleteNote(i) {                                             //ist der Mülleimer innerhalb der Notiz
    trashTitle.push(titles[i]);                                      //was in die variable titles mit stelle i (let titles = [];) steht oder ist, wird in das array trashTitle reingeschrieben
    trashNotice.push(notices[i]);                                    //was in die variable notices mit stelle i (let notices = [];) steht oder ist, wird in das array trashNotice reingeschrieben
    titles.splice(i, 1);                                             //splice: teilt, rausnehmen vom array titles rausschneiden position i einmal (titles.splice(i, 1);) 
    notices.splice(i, 1);                                            //splice: teilt, rausnehmen vom array notices rausschneiden position i einmal (notices.splice(i, 1);)
    save();                                                          //
    render();                                                        // 
}

function save() {                                                    //der Inhalt wird in string umgewandelt, damit es gespeichert werden kann
    titlesAsText = JSON.stringify(titles);                           //titles wird in string umgewandelt in variable titlesAsText übergeben
    localStorage.setItem('titles', titlesAsText);                    //festlegen der titles ist der key für localstorage value ist: titlesAsText, damit der key gefunden werden kann
    noticesAsText = JSON.stringify(notices);                         //usw. die variable hat nichts titlesAsText);
    localStorage.setItem('notices', noticesAsText);
    trashTitleAsText = JSON.stringify(trashTitle);
    localStorage.setItem('trashTitle', trashTitleAsText);
    trashNoticeAsText = JSON.stringify(trashNotice);
    localStorage.setItem('trashNotice', trashNoticeAsText);
}

function load() {                                                     //wird inhalt aus localstorage geladen                             
    titlesAsText = localStorage.getItem('titles');                    //titles aus localstorage wird in variable übergeben (titlesAsText) (titlesAsText hat nichts mit dem titlesAsText aus save zu tun
    noticesAsText = localStorage.getItem('notices');                  //notices aus localstorage wird in variable übergeben (noticesAsText)
    trashTitleAsText = localStorage.getItem('trashTitle');
    trashNoticeAsText = localStorage.getItem('trashNotice');
    if (titlesAsText && noticesAsText && trashTitleAsText && trashNoticeAsText) {  //wenn diese variablen existieren, 
        titles = JSON.parse(titlesAsText);                                         //zielort(titles) aus localstorage (titlesAsText)(auf array titles wird zugegriffen)
        notices = JSON.parse(noticesAsText);                                       //das was aus localstorage rausgeholt wurde (getItem) wird hier in notices festgelegt
        trashTitle = JSON.parse(trashTitleAsText);
        trashNotice = JSON.parse(trashNoticeAsText);
    }
}

function openTrash() {                                                            //öffnet den mülleimer von alle gelöschten Notizen nur wenn mindestenz eine Notiz drin ist
    if (trashNotice.length > 0) {                                                 //wenn mind. 1 notiz drin (> 0) ist dann dann führt er die nächsten 4 Zeilen aus 

        let trashLike = document.getElementById('trashLike');                     //übergebe den container mit der id trashLike an die variable trashLike
        let myposts = document.getElementById('myposts');                         //übergebe den container mit der id myposts an die variable myposts
        myposts.classList.add('d-none');                                          //füge dem container mit der id myposts füge ich die klasse d-none hinzu
        trashLike.classList.remove('d-none');                                     //nehme dem container mit der id trashLike die klasse d-none weg
    } else {                                                                      //wenn keine notiz drin ist dann wird openTrash nicht ausgeführt
        return false;                                                             //
    }
}

function hideTrash() {
    let trashLike = document.getElementById('trashLike');                         //hideTrash also mülleimer ausblenden, und normale notizen einblenden
    let myposts = document.getElementById('myposts');
    myposts.classList.remove('d-none');
    trashLike.classList.add('d-none');
}

function deleteTrashNote(i) {                                  //rote mülleimer entgültiges löschen der notizen as
    trashTitle.splice(i, 1);                                   //das was von titles in trashTitle reingeschrieben wurde wird entgültig gelöscht, nur eine notiz wird gelöscht(i, 1)
    trashNotice.splice(i, 1);                                  //das was von notices in trashNotice reingeschrieben wurde wird entgültig gelöscht, nur eine notiz wird gelöscht(i, 1)
    save();                                                    //muss gespeichert werden
    render();                                                  //was geändert wurde muss angezeigt werden
    openTrash();                                               //Bsp.: wenn opentrash nicht aktiviert ist, dann schliesst sich der komplette mülleimer, wenn mna auf rot klickt
}

function recoverTrashNote(i) {                                 //wiederherstellung recover von Notizen aus Müleimer nach...                    
    titles.push(trashTitle[i]);                                //das was in dem array trashTitle an der stelle i drin ist, wird zurück in array titles gepusht
    notices.push(trashNotice[i]);                              //das was in dem array trashNotice an der stelle i drin ist, wird zurück in array notices gepusht
    trashTitle.splice(i, 1);                                   //hiermit wird der Inhalt aus dem trashTitle der gepusht wurd in titles gelöscht 
    trashNotice.splice(i, 1);                                  //hiermit wird der Inhalt aus dem trashNotice der gepusht wurd in notices gelöscht 
    save();
    render();
}



