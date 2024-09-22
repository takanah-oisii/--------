const ans = [
    'さんぷる',
];

let clear = [0]
let Qnum
let yoko 
let haiti
const okButton = document.querySelector('#ok');

const hide = (id, bool) => {
    const sore = document.getElementById(id);
    if(bool){
        sore.style.display = 'none';
    }
    else{
        sore.style.display = '';
    }
};

const mondai = (num,imagename) => {
    const text = document.getElementById('num');
    const image = document.getElementById('image');
    text.textContent = 'Q.' + num;
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
        clear = getCookie()

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
    clear = getCookie()
    for (let i = 0; i < 100; i++) {
        if(clear.includes(i+1)){
            const replase = document.querySelector(`.a${i+1}`);
            if(replase.classList.contains('box-notclear')){
                replase.classList.add('box-clear')
                replase.classList.remove('box-notclear')
                console.log(replase.classList)
            }
        };
    };
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
        if (clear.includes(Qnum+1)){
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

const setCookie = (name, json)=>{


    let cookies = '';
    let expire = '';
    let period = '';

    //Cookieの保存名と値を指定
    cookies = name + '=' + JSON.stringify(json) + ';';

    //Cookieを保存するパスを指定
    cookies += 'path=/ ;';

    //Cookieを保存する期間を指定
    period = 30; //保存日数
    expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
    expire.toUTCString();
    cookies += 'expires=' + expire + ';';

    //Cookieを保存する
    document.cookie = cookies;
};

const getCookie = ()=>{
    
    let cookies = '';
    let cookieArray = new Array();
    let result = new Array();

    //Cookieを取得する
    cookies = document.cookie;

    //Cookieを配列に分割してJSONに変換する
    if(cookies){
        cookieArray = cookies.split(';');
        
        cookieArray.forEach(data => {
            data = data.split('=');

            //data[0]: Cookieの名前（例では「user」）
            //data[1]: Cookieの値（例では「json」）

            result[data[0]] = JSON.parse(data[1]);
        });
    }
    return result;
}

// ここからスタート
hide('mondai',true)
block()
yomikomi()