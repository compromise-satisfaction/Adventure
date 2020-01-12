enchant()

var Sound = ["アイテム","トロフィー","永遠の灯","ぼくのフレンド","異議あり！","待った！"];

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

  for (var i = 0; i < Sound.length; i++) {
    game.preload("sound/"+Sound[i]+".wav");
  }

  game.fps = 10;
  game.onload = function(){

    var StartScene = function(){

      var scene = new Scene();                                // 新しいシーンを作る

      var Numbers = 0;

      function Button(a,b){
        Buttons[a] = new Entity();
        Buttons[a].moveTo(width/4,Numbers);
        Buttons[a].width = width/2;
        Buttons[a].height = width/5;
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        Buttons[a].backgroundColor = "white"
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          if(this.backgroundColor == "white"){
            this.backgroundColor = "red";
            game.assets["sound/"+b+".wav"].play();
            game.assets["sound/"+b+".wav"]._element.loop = true;
          }
          else{
            this.backgroundColor = "white";
            game.assets["sound/"+b+".wav"].stop();
          }
          console.log(game.assets["sound/"+b+".wav"]);
        });
        Numbers += width/5;
      }

      var Buttons = [];
      for (var i = 0; i < Sound.length; i++) {
        Button(i,Sound[i]);
      }

      return scene;
    };
    game.replaceScene(StartScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
