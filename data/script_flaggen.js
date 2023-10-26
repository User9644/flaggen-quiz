const list_link = './data/list.json';

let allow = true;

let points = 0;

async function loadJSONFile(filename){
    const response = await fetch(filename);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error('Fehler beim Laden der JSON-Datei');
    }
}

let list = [];

loadJSONFile(list_link).then(json => {
    list = [];
    for(let j in json){
        list.push({
            id: j,
            name: json[j],
            link: idToLink(j)
        });
    }

}).catch(error=>{console.error(error)});

function idToLink(id){
    let link = 'https://flagcdn.com/w1280/' + id + '.png';
    return link;
}

class randomFlag {
    constructor(a) {
        this._init_(a);
    }
    _init_(a){
        this.array = [];
        for (let i in a) {
            this.array[i] = a[i];
        }
    }
    getRandom(){
        let random = Math.floor(Math.random() * this.array.length);
        let value = this.array[random];
        this.array.splice(random, 1);
        return value;
    }
}

function click(id){
    if(!allow) return;
    allow = false;
    if(document.getElementById(id).innerHTML==currentFlag.name){// wenn falsch
        document.getElementById(id).style.backgroundColor = 'rgb(0, 255, 0)';
        points++;
    }
    else{
        document.getElementById(id).style.backgroundColor = 'rgb(255, 0, 0)';
        document.getElementById(right_answer_position).style.backgroundColor = 'rgb(0, 255, 0)'
        if(document.getElementById('hard_mode').checked){// wenn hard mode
            let total = localStorage.getItem('stats_total-score');
            localStorage.setItem('stats_total-score', parseInt(total) + points);

            points = 0;

            let played = localStorage.getItem('stats_played-rounds');
            localStorage.setItem('stats_played-rounds', parseInt(played) + 1);

            alert('Falsch!');
        }
    }
    setTimeout(() => {
        reset();
    }, 1000);
}

function reset(){
    localStorage.setItem('fq_hard-core', document.getElementById('hard_mode').checked)

    document.getElementById('points').innerHTML = points;

    right_answer_position = random.int(1, 10);

    answers = new randomFlag(list);

    right = flags.getRandom();
        
    if(right==undefined){// jede flaggen wurde erraten
        let total = localStorage.getItem('stats_total-score');
        localStorage.setItem('stats_total-score', parseInt(total) + points);

        if(points>0){
        let played = localStorage.getItem('stats_played-rounds');
        localStorage.setItem('stats_played-rounds', parseInt(played) + 1);
        }
        flags = new randomFlag(list);
        points = 0;

        alert('Ende!');
        reset();
        return;
    }

    document.getElementById('flagge').src = right.link;

    document.getElementById(right_answer_position).innerHTML = right.name;
    for(let i = 1; i <= 10; i++){
        if(i!=right_answer_position) document.getElementById(i).innerHTML = answers.getRandom().name;
        document.getElementById(i).style.backgroundColor = 'rgb(35, 35, 35)';
    }
    allow = true;
    currentFlag = right;

    if((localStorage.getItem('fq_high-score')<points)&&(document.getElementById('hard_mode').checked)){
        localStorage.setItem('fq_high-score', points);
    }
}

flags = new randomFlag(list);

setTimeout(() => {
    for(i=1; i<=10; i++){
        document.getElementById(i).addEventListener("click", function(){click(this.id);});
    }
    
    reset();
}, 1000);

function stats(){
    document.getElementById('flaggen_quiz').style.display = 'none';
    document.getElementById('_stats').style.display = 'block';
    document.getElementById('stats_a').href = 'javascript:exit_stats()';
    document.getElementById('stats_high-score').innerHTML = localStorage.getItem('fq_high-score');
    document.getElementById('stats_played-rounds').innerHTML = localStorage.getItem('stats_played-rounds');
    document.getElementById('stats_ave-score').innerHTML = parseInt(localStorage.getItem('stats_total-score')) / parseInt(localStorage.getItem('stats_played-rounds'));
}

function exit_stats(){
    document.getElementById('flaggen_quiz').style.display = 'block';
    document.getElementById('_stats').style.display = 'none';
    document.getElementById('stats_a').href = 'javascript:stats()';
}

function reset_stats(){
    if(confirm('Möchtest du alle deine Stats löschen?')){
    localStorage.setItem('fq_high-score', 0);
    localStorage.setItem('stats_played-rounds', 0);
    localStorage.setItem('stats_total-score', 0);
    stats();
    }
}