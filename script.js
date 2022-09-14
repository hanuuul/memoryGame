let gameStage = 1;
let pcSelect = [];

//스테이지 start
function stageStart(){
    //게임시작 카운트
    let cnt = 3;
    let startTimer = setInterval(function(){
        if(cnt > 0){
            document.getElementById('count').innerHTML = cnt;
            cnt -= 1;
        }else{
            document.getElementById('count').innerHTML = '';
            clearInterval(startTimer);
        }
    }, 1000);
    //문제 출제 - pcSelect
    setTimeout(function(){
        for(let i=0; i<gameStage; i++){
            pcSelect.push(Math.floor(Math.random() * 9) + 1);
            setTimeout(function(){
                document.getElementById(pcSelect[i]).className = 'btnArea pcSelect';
                setTimeout(function(){
                    document.getElementById(pcSelect[i]).classList.remove("pcSelect");
                },500);
            }, 1000*i);
        }
    }, 4000);
}

//문제 풀이 userSelect
function userSelect(){
    const btnArea = document.getElementsByClassName('btnArea');
    let userClickId = '';
    let userClickCnt = 0;

    //유저가 영역 클릭하면 할일
    for(let i=0; i<9; i++){
        btnArea[i].addEventListener('click', function(e){
            //클릭영역 깜빡이고, userClickId에 id값을 추가
            e.currentTarget.className = 'btnArea userSelect';
            setTimeout(function(){
                btnArea[i].classList.remove("userSelect");
            }, 500);
            userClickId = e.currentTarget.getAttribute('id');

            //정답 체크
            if(userClickId != pcSelect[userClickCnt]){
                //오답, 게임오버
                console.log('gameOver');
                alert('gameOver');
                location.reload();
            }else{
                //정답
                userClickCnt += 1;
                console.log('continue');
                if(userClickCnt == gameStage){
                    //스테이지 성공
                    console.log('stageClear');
                    gameStage += 1;
                    pcSelect = [];
                    userClickId = '';
                    userClickCnt = 0;
                    stageStart();
                }
            }    
        }, false);
    }
}
userSelect();

//게임 시작
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click',function(e){
    stageStart();
    e.target.style.display = 'none';
});