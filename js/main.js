enchant()

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
    "とっても賢いじゅるり_れしぴ_",
  ];
  var BGMs = [];
  for (var i = 0; i < Name.length; i++) {
    BGMs[i] = [Name[i],"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/music/"+Name[i]+".wav"];
  }
  BGMs[i] = ["捜査","https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/捜査.wav"];
  var BGM = [];
  for (var i = 0; i < BGMs.length; i++) {
    BGM[i] = document.createElement("audio");
    BGM[i].src = BGMs[i][1];
    BGM[i].title = BGMs[i][0];
  }

  game.fps = 10;
  game.onload = function(){

    var Newscene = function(){

      var scene = new Scene();                                // 新しいシーンを作る

      var Button = [];
      var Number_x = 0;
      var Number_y = 0;
      var submits = 0;
      function Submit(a,b){
        Button[submits] = new Entity();
        Button[submits].moveTo(Number_x,Number_y);
        Number_y += height/10;
        if(submits==9){
          Number_x += width/4;
          Number_y = 0;
        }
        Button[submits].width = width/4;
        Button[submits].height = height/10;
        Button[submits]._element = document.createElement('input');
        Button[submits]._element.type = "submit";
        Button[submits]._element.value = a;
        scene.addChild(Button[submits]);
        Button[submits].addEventListener('touchstart',function(e){
          BGM[b].addEventListener("ended",function(e){
            if(Button[b].backgroundColor=="red") Button[b].backgroundColor = "buttonface";
          });
          switch (this.backgroundColor){
            default:
              BGM[b].play();
              this.backgroundColor = "red";
              break;
            case "red":
              BGM[b].loop = true;
              this.backgroundColor = "blue";
              break;
            case "blue":
              BGM[b].pause();
              BGM[b].loop = false;
              BGM[b].currentTime = 0;
              this.backgroundColor = "buttonface";
              break;
          }
        });
        submits++;
      }
      for (var i = 0; i < BGM.length; i++) {
        Submit(BGM[i].title,i);
      }

      return scene;
    };
    game.replaceScene(Newscene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
