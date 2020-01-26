enchant()

var Sound = ["着信メロディ成歩堂龍一",
"捜査",
"エキセントリック",
"綾里春美～はみちゃんといっしょ",
"逆転裁判・開廷",
"逆転姉妹",
"永遠の灯",
"留置所",
"尋問",
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

  var Sound2 = ["着信メロディ成歩堂龍一",
  "捜査",
  "エキセントリック",
  "綾里春美～はみちゃんといっしょ",
  "逆転裁判・開廷",
  "逆転姉妹",
  "永遠の灯",
  "留置所",
  "尋問",
  "ぼくのフレンド",
  ];

  for (var i = 0; i < Sound.length; i++) {
    Sound[i] = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/"+Sound[i]+".wav";
  }
  game.preload(Sound);

  game.fps = 10;
  game.onload = function(){

    var StartScene = function(){

      var scene = new Scene();                                // 新しいシーンを作る

      var Numbers = 0;

      function Button(a,b,c){
        Buttons[a] = new Entity();
        Buttons[a].moveTo(width/4,Numbers);
        Buttons[a].width = width/2;
        Buttons[a].height = width/5;
        Buttons[a]._element = document.createElement('input');
        Buttons[a]._element.type = "submit";
        Buttons[a]._element.value = b;
        Buttons[a].backgroundColor = "buttonface";
        scene.addChild(Buttons[a]);
        Buttons[a].addEventListener('touchstart',function(e){
          if(this.backgroundColor == "buttonface"){
            this.backgroundColor = "red";
            game.assets[c].src = "https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/大江戸戦士トノサマン.wav";
            game.assets[c].play();
          }
          else{
            this.backgroundColor = "buttonface";
            game.assets[c].stop();
          }
        });
        Numbers += width/5;
      }

      var Buttons = [];
      for (var i = 0; i < Sound.length; i++) {
        Button(i,Sound2[i],Sound[i]);
      }

      return scene;
    };
    game.replaceScene(StartScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }
  game.start();
}
