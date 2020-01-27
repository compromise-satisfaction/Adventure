enchant()

var Sound = [
"ぼくのフレンド",
];

function Images(width,height){
  Load(width,height);
}


function Load(width,height){
  var game = new Core(width, height);

  var loadScene = new Scene();
	game.loadingScene = loadScene;

  var label = new Label();
  var progress = 0;

  var Texts = Class.create(Label, {
    initialize: function(a,b) {
      Label.call(this);
      this.font  = "30px monospace";
      this.color = 'black';
      this.x = 10;
      this.y = 100 + 40*b;
      this.width = width;
      this.height = 30;
      this.text = a;
      loadScene.addChild(this);
    }
  });

	loadScene.addEventListener('progress', function(e){

    label.moveTo(100,290);
    label.color = 'Black';
    label.font  = "30px monospace";
    loadScene.addChild(label);

		progress = e.loaded / e.total;
		progress *= 100;
		progress = Math.round(progress);
    if(progress<10) progress = "00" + progress;
    else if(progress<100) progress = "0" + progress;
    label.text = "LOADING..." + progress + "％";

	});
	loadScene.addEventListener('load', function(e) {
      var core = enchant.Core.instance;
      core.removeScene(core.loadingScene);
      core.dispatchEvent(e);
	});

  game.addEventListener("enterframe", function(){
    if(Button_time==Button_time_next) return;
    else Button_time++;
    return;
  });

  var Name = [
    "COOLEST",
    "Get Wild",
    "HANABI",
    "OVERLAP",
    "POP TEAM EPIC",
    "ＰＯＰＰＹ　ＰＡＰＰＹ　ＤＡＹ（女性ｖｅｒ．１）",
    "Red Flash Revolution",
    "Ｔｗｉｎｋｌｉｎｇ　ｓｔａｒ",
    "きみのままで",
    "キラメク誓い",
    "たーのしーたーのしーたーのしー！",
    "とっても賢いじゅるり_れしぴ_"
  ];
  var Item_Flag = [
    [Name[0],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[0]+".wav","CD"],
    [Name[1],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[1]+".wav","CD"],
    [Name[2],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[2]+".wav","CD"],
    [Name[3],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[3]+".wav","CD"],
    [Name[4],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[4]+".wav","CD"],
    [Name[5],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[5]+".wav","CD"],
    [Name[6],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[6]+".wav","CD"],
    [Name[7],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[7]+".wav","CD"],
    [Name[8],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[8]+".wav","CD"],
    [Name[9],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[9]+".wav","CD"],
    [Name[10],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[10]+".wav","CD"],
    [Name[11],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[11]+".wav","CD"],
    [Name[12],"カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[12]+".wav","CD"],
  ];
  var Setting_Flag = ["名前","苗字","未設定",false,"最初から",0,0,0,true,5,5,5,"最初から","Black",""];
  var Button_time_next = 3;
  var Button_time = Button_time_next;
  var BGM = document.createElement("audio");

  function Button_push(expression){
    if(Button_time==Button_time_next){
      game.fps = 10;
      Button_time = 0;
      return(false);
    }
    else return(true);
  }

  game.fps = 10;
  game.onload = function(){

    var ItemScene = function(Number,Ig,Type){

      var scene = new Scene();                                // 新しいシーンを作る

      var PAGAS = 5;
      var Choice_Flag = Item_Flag;

      var Button = [];
      var submits = 0;
      function Submit(a,b,c,d,e,f){
        Button[submits] = new Entity();
        Button[submits].moveTo(b,c);
        Button[submits].width = d;
        Button[submits].height = e;
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        if(a){
          if((a=="設定を開く"&&Ig)==false&&a!="詳細") scene.addChild(Button[submits]);
        }
        Button[submits].addEventListener('touchstart',function(e){
          switch (a) {
            case "戻る":
              var ooo = "戻る";
              break;
              case "▶":
              case "◀":
              var ooo ="メニュー移動";
              break;
            case "設定を開く":
              var ooo ="メニュー";
              break;
            default:
              var ooo ="選択音";
              break;
          }
          if(this.backgroundColor=="red"){
            var ooo ="戻る";
          }
          if(Button_push(ooo)) return;
          if(this.backgroundColor=="red"){
            game.replaceScene(ItemScene(Number,Ig,Type));
          }
          if(a=="詳細"){
            switch (Button[3]._element.value){
              default:
                if(Button[3]._element.value == "停止"){
                  Button[3]._element.value = "再生";
                  BGM.pause();
                }
                else{
                  BGM.src = Button[3].詳細;
                  Button[3]._element.value = "停止";
                  BGM.currentTime = 0;
                  BGM.play();
                }
                break;
            }
          }
          else{
            switch (this._element.value){
              case "▶":
                if(Setting_Flag[PAGAS]==0){
                  Setting_Flag[PAGAS] = Choice_Flag.length-Choice_Flag.length%5;
                  if(Choice_Flag.length%5==0) Setting_Flag[PAGAS]-=5;
                }
                else Setting_Flag[PAGAS]-=5;
                game.replaceScene(ItemScene(Number,Ig,Type));
                break;
              case "◀":
                if(Setting_Flag[PAGAS] == Choice_Flag.length-Choice_Flag.length%5) Setting_Flag[PAGAS] = 0;
                else{
                  Setting_Flag[PAGAS]+=5;
                  if(Setting_Flag[PAGAS]==Choice_Flag.length) Setting_Flag[PAGAS] = 0;
                }
                game.replaceScene(ItemScene(Number,Ig,Type));
                break;
              case "リピート":
                Setting_Flag[3] = true;
                BGM.loop = Setting_Flag;
                break;
              case "ランダム":
                break;
              default:
                for (var i = 0; i < 5; i++) {
                  if(f[1].split("↓")[i]==undefined) Text[i].text = "";
                  else Text[i].text = f[1].split("↓")[i];
                }
                for (var i = 0; i < submits; i++) {
                  Button[i].backgroundColor = "buttonface";
                }
                Choice_Item = f[5];
                this.backgroundColor = "red";
                if(f[3]){
                  Button[3]._element.value = f[3];
                  Button[3].詳細 = f[4];
                  scene.addChild(Button[3]);
                }
                else scene.removeChild(Button[3]);
                if(Ig){
                  Button[4]._element.value = "つきつける";
                  scene.addChild(Button[4]);
                }
                break;
            }
          }
        });
        submits++;
      }
      var S_X_H = (width-width/6)/3-width/12;
      var S_Y_H = width/10;
      var W_X_H = width/12;
      var W_Y_H = width/9;
      Submit("リピート",W_X_H,W_Y_H,S_X_H,S_Y_H);
      Submit("",width/2-S_X_H/2,W_Y_H,S_X_H,S_Y_H);
      Submit("ランダム",width-S_X_H-W_X_H,W_Y_H,S_X_H,S_Y_H);
      Submit("詳細",width/2+width/20,(width/4)+((width/20)+(width/25)+(width/50))*4,width/2.5+W_X_H-width/8,W_X_H);
      Submit("",width/2+width/20,(width/4)+((width/20)+(width/25)*14),width/2.5+W_X_H-width/8,W_X_H);

      var Text = [];
      var Text_Number = 0;

      function Description_text(){
        Text[Text_Number] = new Label();
        Text[Text_Number].font  = (width/20)+"px monospace";
        Text[Text_Number].color = 'black';
        Text[Text_Number].x = (width/8);
        Text[Text_Number].y = (width/4) + ((width/20)+(width/25)*(18+Text_Number*2)) - (width/25);
        Text[Text_Number].width = width;
        Text[Text_Number].height = (width/20);
        Text[Text_Number].text = "";
        scene.addChild(Text[Text_Number]);
      }

      for (var i = 0; i < 5; i++) {
        Description_text();
        Text_Number++;
      }

      if(Choice_Flag.length>5){
        Submit("◀",width/8,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
        Submit("▶",width/2.5,(width/4)+((width/20)+(width/25)*14),W_X_H,W_X_H);
      }
      else Setting_Flag[PAGAS] = 0;


      var Item = [];
      var Image = [];
      var Item_Number = 0;
      var Numbers = (width/4);
      var Choice_Item = "未設定";

      for (var i = 0; i < 5; i++) {
        if(Choice_Flag[i+Setting_Flag[PAGAS]]){
          Submit(Choice_Flag[i+Setting_Flag[PAGAS]][0],width/8,Numbers,width/2.5+W_X_H-width/8,W_X_H,Choice_Flag[i+Setting_Flag[PAGAS]]);
          Numbers += (width/20)+(width/25)+(width/50);
        };
      }

      return scene;
    };
    game.replaceScene(ItemScene(0,0,0));  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
