const startBtn = document.getElementById('startBtn');
const stageNum = document.getElementById('stageNum');
let gameStage = 1;
let pcSelect = [];
let isPcSelectDone = false;

//게임 시작                     
function gameStart(){
  startBtn.addEventListener('click', function(e){
    e.target.style.display = 'none';
    stageNum.style.display = 'block';
    stageStart().then(userSelect);
  });
}
                            
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
    }, 500);
    //문제 출제 - pcSelect
  return new Promise(function(resolve){
    setTimeout(function(){
      for(let i=0; i<gameStage; i++){
        pcSelect.push(Math.floor(Math.random() * 9) + 1);
        setTimeout(function(){
          document.getElementById(pcSelect[i]).className = 'btnArea pcSelect';
          setTimeout(function(){
            document.getElementById(pcSelect[i]).classList.remove("pcSelect");
            if(i == gameStage - 1){
              isPcSelectDone = false;
            }
          },300);
        }, 600*i);
      }
      resolve();
    }, 2400);
    //게임 스테이지
    setTimeout(function(){
        stageNum.innerHTML = 'STAGE ' + gameStage;
    }, 400);
  });
}

//문제 풀이 userSelect
function userSelect(){
    const btnArea = document.getElementsByClassName('btnArea');
    let userClickId = '';
    let userClickCnt = 0;

    //유저가 영역 클릭하면 할일
    for(let i=0; i<9; i++){
        btnArea[i].addEventListener('click', function(e){
            if(isPcSelectDone == true){return false};
            //클릭영역 깜빡이고, userClickId에 id값을 추가
            if(pcSelect.length == gameStage){
                e.currentTarget.className = 'btnArea userSelect';
                setTimeout(function(){
                    btnArea[i].classList.remove("userSelect");
                }, 300);
            }
            userClickId = e.currentTarget.getAttribute('id');

            //정답 체크
            if(userClickId != pcSelect[userClickCnt]){
                //오답, 게임오버
                console.log('gameOver');
                alert("You've got " + String(gameStage - 1) + 'stage!!');
                location.reload();
            }else{
                //정답
                userClickCnt += 1;
                console.log('continue');
                if(userClickCnt == gameStage){
                    //스테이지 성공
                    isPcSelectDone = true;
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
  
  
gameStart();