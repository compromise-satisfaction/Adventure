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

  var Image_DATAS = [];

  game.preload(Image_DATAS);
  game.preload("sound/Item.wav");
  game.preload("sound/セーブ.wav");
  game.preload("sound/進む.wav");
  game.preload("sound/ページ.wav");
  game.preload("sound/メニュー.wav");
  game.preload("sound/メニュー移動.wav");
  game.preload("sound/アイテム表示音.wav");
  game.preload("sound/戻る.wav");
  game.preload("sound/選択音.wav");
  game.preload("image/画像無.png");
  game.preload("image/Background.png");

  var Number = 0;
  var Ig = false;
  var Type = "アイテム";
  var Item_Flag = [
    ["COOLEST","カスタマイZ↓COOLEST（カスタマイＺ盤）↓カスタマイZ↓エンドウ．（ＧＥＥＫＳ）","image/画像無し.png","再生","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/COOLEST.wav","CD"],
    ["スマホ", "僕のスマホだ。", "スマホ", "使う", "移動使うスマホ", "スマホ"]
  ];
  var Setting_Flag = ["名前","苗字","未設定",game.fps,"最初から",0,0,0,true,5,5,5,"最初から","Black",""];
  var Button_time_next = 3;
  var Button_time = Button_time_next;
  var BGM = document.createElement("audio");

  function Button_push(expression){
    if(Button_time==Button_time_next){
      game.fps = 10;
      Button_time = 0;
      switch (expression) {
        case "音無し":
          break;
        default:
          Sound_ON(expression,true);
          break;
      }
      return(false);
    }
    else return(true);
  }
  function Sound_ON(Sound_Name,Play,Type){
    switch (Sound_Name) {
      case "お任せなのだ":
      case "音量調整用":
        if(Setting_Flag[11]==0) Play = false;
        else var Volume = Setting_Flag[11]/10;
        break;
      default:
        if(Setting_Flag[10]==0) Play = false;
        else var Volume = Setting_Flag[10]/10;
        break;
    }
    if(Type){
      switch (Type) {
        case "音声":
          if(Setting_Flag[11]==0) Play = false;
          else var Volume = Setting_Flag[11]/10;
          break;
        default:
          if(Setting_Flag[10]==0) Play = false;
          else var Volume = Setting_Flag[10]/10;
          break;
      }
      if(Play){
        if(game.assets[Sound_Name].src==undefined){
          game.assets[Sound_Name].volume = Volume;
        }
        else{
          game.assets[Sound_Name]._volume = Volume;
        }
        game.assets[Sound_Name].play();
      }
      else{
        game.assets[Sound_Name].play();
        game.assets[Sound_Name].stop();
      }
      return;
    }
    if(Play){
      if(game.assets["sound/"+Sound_Name+".wav"].src==undefined){
        game.assets["sound/"+Sound_Name+".wav"].volume = Volume;
      }
      else{
        game.assets["sound/"+Sound_Name+".wav"]._volume = Volume;
      }
      game.assets["sound/"+Sound_Name+".wav"].play();
    }
    else{
      game.assets["sound/"+Sound_Name+".wav"].play();
      game.assets["sound/"+Sound_Name+".wav"].stop();
    }
    return;
  }
  function conversion_url(name,Type){
    switch (Type) {
      case "画像":
        for (var i = 0; i < Image_DATAS.length; i++) {
          if(Image_DATAS[i].名前==name) return(Image_DATAS[i].url);
        }
        break;
      case "サウンド":
        for (var i = 0; i < Sounds_DATAS.length; i++) {
          if(Sounds_DATAS[i].名前==name) return(Sounds_DATAS[i].url);
        }
        break;
    }
    return(name);
  }

  game.fps = 10;
  game.onload = function(){

    var ItemScene = function(Number,Ig,Type){

      var scene = new Scene();                                // 新しいシーンを作る
      switch (Type) {
        case "アイテム":
          var PAGAS = 5;
          var Choice_Flag = Item_Flag;
          var Type2 = "人物";
          break;
        case "人物":
          var PAGAS = 6;
          var Choice_Flag = Character_Flag;
          if(Ig) var Type2 = "アイテム";
          else var Type2 = "トロフィー";
          break;
        case "トロフィー":
          var PAGAS = 7;
          var Choice_Flag = Trophy_Flag;
          var Type2 = "アイテム";
          break;
      }

      var xxx = game.assets["image/Background.png"].width;
      var yyy = game.assets["image/Background.png"].height;
      var Background = new Sprite(xxx,yyy);
      Background.scaleX = ((width)/xxx);
      Background.scaleY = ((height)/yyy);
      Background.image = game.assets["image/Background.png"];
      Background.x = (Background.scaleX*xxx/2)-xxx/2;
      Background.y = (Background.scaleY*yyy/2)-yyy/2;
      scene.addChild(Background);

      var Item_image = new Sprite(0,0);
      scene.addChild(Item_image);

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
            case Type2:
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
              case "遊ぶ":
                OASOBI = true;
                game.popScene();
                game.pushScene(ReversiScene());
                console.log("Scene数",Scene_kazu);
                break;
              case "改造":
                game.replaceScene(TransformScene(Number,Ig));
                console.log("Scene数",Scene_kazu);
                break;
              case "再生":
                BGM.src = Button[3].詳細;
                BGM.play();
                break;
              default:
                if(Button[3].詳細.substring(0,2)=="移動"){
                  Button[3].詳細 = Button[3].詳細.substring(2);
                  game.popScene();
                  Scene_kazu--;
                  console.log("Scene数",Scene_kazu);
                  Scene_loads(Number+"↓"+Button[3].詳細,false,Choice_Item,false);
                }
                else {
                  game.pushScene(DetailsScene(Button[3].詳細,0));
                  Scene_kazu++;
                  console.log("Scene数",Scene_kazu);
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
              case "戻る":
                game.fps = Setting_Flag[3];
                game.popScene();
                Scene_kazu--;
                console.log("Scene数",Scene_kazu);
                break;
              case "設定を開く":
                game.pushScene(SettingScene(Number));
                Scene_kazu++;
                console.log("Scene数",Scene_kazu);
                break;
              case Type2:
                game.replaceScene(ItemScene(Number,Ig,Type2));
                break;
              case "つきつける":
                game.popScene();
                Scene_kazu--;
                console.log("Scene数",Scene_kazu);
                if(Ig==Choice_Item||(Ig!="日常"&&(Choice_Item=="強欲な壺"||Choice_Item=="万能"||Choice_Item=="ヒント"))){
                  if(Choice_Item=="ヒント"){
                    Scene_loads("ヒント"+Number,false,false);
                    return;
                  }
                  if(Choice_Item=="強欲な壺"){
                    Get_ICFT(["アイテム","強欲な壺→強欲なカケラ","強欲な壺を使った証。","強欲なカケラ","","","強欲なカケラ"]);
                  }
                  game.pushScene(PopScene(Number,"異議あり！","主人公異議あり！"));
                  Scene_kazu++;
                  console.log("Scene数",Scene_kazu);
                }
                else if(Ig=="日常") Scene_loads(Number,false,"つきつける"+Choice_Item,Type);
                else{
                  game.pushScene(PopScene("つきつけ失敗","異議あり！","主人公異議あり！"));
                  Scene_kazu++;
                  console.log("Scene数",Scene_kazu);
                }
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
                console.log(f[0]+"を選択 つきつけコード"+Choice_Item);
                var Item_image_url = conversion_url(f[2],"画像");
                if(game.assets[Item_image_url]==undefined) Item_image_url = "image/画像無.png";
                var xxx = game.assets[Item_image_url].width;
                var yyy = game.assets[Item_image_url].height;
                Item_image.image = game.assets[Item_image_url];
                Item_image.width = xxx;
                Item_image.height = yyy;
                Item_image.scaleX = ((width/4)/xxx);
                Item_image.scaleY = ((width/4)/yyy);
                Item_image.x = (Item_image.scaleX*xxx/2)-xxx/2+(width/1.6);
                Item_image.y = (Item_image.scaleY*yyy/2)-yyy/2+(width/4)+(width/20)+(width/25);
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
                console.log(f);
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
      Submit("戻る",W_X_H,W_Y_H,S_X_H,S_Y_H);
      Submit("設定を開く",width/2-S_X_H/2,W_Y_H,S_X_H,S_Y_H);
      Submit(Type2,width-S_X_H-W_X_H,W_Y_H,S_X_H,S_Y_H);
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
          //Item[Item_Number] = new Items(Choice_Flag[i+Setting_Flag[PAGAS]]);
          Submit(Choice_Flag[i+Setting_Flag[PAGAS]][0],width/8,Numbers,width/2.5+W_X_H-width/8,W_X_H,Choice_Flag[i+Setting_Flag[PAGAS]]);
          Numbers += (width/20)+(width/25)+(width/50);
        };
      }

      return scene;
    };
    game.replaceScene(ItemScene(Number,Ig,Type));  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
