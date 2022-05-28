$(document).ready(function(){
   
   const timer = document.getElementById('timer');
   const start = document.getElementById('start');
   const stop = document.getElementById('stop');
   const reset = document.getElementById('reset');
 	//押した時の時刻を記録する変数
 	let startTime;
   //経過時間の変数
   let elapsedTime = 0;
   //タイマーを止めるためのclearTimeoutの引数に渡すid
   let intervalID;
   //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数
   let timeToadd = 0;
   //時.分.秒に直すための関数
   function updateTimetText(){ 
     //与えられた数値以下の最大の整数を返すメソッド
     let h = Math.floor(elapsedTime / 3600000);
     let m = Math.floor(elapsedTime / 1000 / 60) % 60;
     let s = Math.floor(elapsedTime / 1000) % 60;
     let ms = elapsedTime % 1000;
     //h.m.s末尾から２つを取得、msは３つを取得
     h = ('0' + h).slice(-2); 
     m = ('0' + m).slice(-2); 
     s = ('0' + s).slice(-2);
     ms = ('0' + ms).slice(-3);
     
     timer.textContent = h + ':' + m + ':' + s + '.' + ms;
   }
   //復帰用
   function countUp(){
     //intervalID変数はsetTimeoutの返り値になるので代入
     intervalID = setTimeout(function(){
       //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引きストップを押した時の時刻(timeToadd)を足す
       elapsedTime = Date.now() - startTime + timeToadd;
       //時.分.秒に直すための関数updateTimetText()を呼ぶ
       updateTimetText()
       //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
       countUp();
       //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
     },10);
   }
   //スタートボタン
   start.addEventListener("click", function(){
	  //協定世界時で現在の時間を示すDate.nowを代入
	  startTime = Date.now();
	  //復帰用のcountUp()を呼ぶ
	  countUp();
	  //スタートを押すとスタートボタンを非活性
	  start.disabled = true;
	  //スタートを押すとストップボタンを活性
	  stop.disabled = false;
	});
   //ストップボタン
   stop.addEventListener("click", function(){
     //タイマーをストップさせる
　   clearTimeout(intervalID);
　   //ストップを押した時の時刻
　   timeToadd += Date.now() - startTime;
　   //ストップを押すとスタートボタンを活性
　   start.disabled = false;
　   //ストップを押すとストップボタンを非活性
　   stop.disabled = true;
 	});
 	//リセットボタン
 	reset.addEventListener("click", function(){
 	  //タイマーをストップさせる
 	  clearTimeout(intervalID);
	  //経過時刻を0
	  elapsedTime = 0;
	  //過去の経過時刻を0
	  timeToadd = 0;
	  //表示を0にする
	  updateTimetText();
	  //リセットを押すとストップボタンを活性
	  start.disabled = false;
	  //リセットを押すとストップボタンを活性
	  stop.disabled = false;
 	});
	　 
});