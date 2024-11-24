const ans = [
    'さんぷる',
    'つき',
    'どろー',
    'とり'
];

const author = [
    'キャットスニャイル',
    'ちっくわ',
    'キャットスニャイル',
    '無限',
]

let clear = []
let Qnum
let yoko 
let haiti
const okButton = document.querySelector('#ok');

const hide = (id, bool) => {
    const sore = document.getElementById(id);
    if(bool){
        sore.style.display = 'none';
    }else{
        sore.style.display = '';
    }
};

const mondai = (num,imagename) => {
    const text = document.getElementById('num');
    const text2 = document.getElementById('author')
    const image = document.getElementById('image');
    text.textContent = 'Q.' + num;
    text2.textContent = '作者：' + author[num-1]
    image.innerHTML = '<img id="Qimage" src="image/'+num+'.png">';
};

const block = () =>{
    const body = document.getElementById('botton');
    for (let i = 1; i < 12; i++) {
        body.insertAdjacentHTML('beforeend',`<div id="${i}yoko" class="yoko"></div>`);
    };
    haiti = 1;
    for (let i = 1; i < 11; i++) {
        yoko = document.getElementById(i + 'yoko');
        for (let i = 1; i <11; i++){
            let end
            if(clear.includes(i+1)){
                end = 'box-clear';
            }else{
                end = 'box-notclear';
            };
            yoko.insertAdjacentHTML('beforeend', `<button id="box"  class="${end} a${haiti}" type="button">${haiti}</button>`);
            haiti = haiti + 1;
        };
    }; 
    yoko = document.getElementById('11yoko');
    yoko.insertAdjacentHTML('beforeend', '<button id="final"  class="final" type="button">final</button>');
};

const yomikomi = () => {
    console.log(clear)
    for(let i=0; i<clear.length; i++){
        const replace = document.querySelector(`.a${i+1}`)
        if(replace.classList.contains('box-notclear')){
            replace.classList.remove('box-notclear')
            replace.classList.add('box-clear')
        }
    }

};

const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    let element = document.getElementById('ans');
    console.log(element.value);
    document.getElementById('submit');
    const head = document.querySelector('#dialogLabel')
    const body = document.querySelector('.modal-body')
    if (element.value == ans[Qnum]){
        head.innerHTML = '正解'
        body.innerHTML = `おめでとうございます！あなたは${Qnum+1}問目に正解しました！`;
        console.log(clear)
        if (!(clear.includes(Qnum+1))){
            clear.push(Qnum+1)
            setCookie('progress',clear)
        }
    }else{
        head.innerHTML = '不正解'
        body.innerHTML = '残念... もう一度考えましょう！';
    }
    const dialog = new bootstrap.Modal(document.getElementById('dialog'));
    dialog.show();
});

document.addEventListener('DOMContentLoaded',function(){
    let btns = document.querySelectorAll('#box');
    for(let i = 0; i < btns.length; i++){
        btns[i].addEventListener('click',function(){
            hide('botton',true)
            hide('mondai',false)
            mondai(i+1,i+1)
            Qnum = i
        },false);
    }
},false);

const undo = document.getElementById('undo');
undo.addEventListener('click', () => {
    yomikomi()
    hide('botton',false)
    hide('mondai',true)
})


// ここからスタート
hide('mondai',true)
block()
yomikomi()