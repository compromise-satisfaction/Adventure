enchant();
window.onload = function() {
	var game = new Game(480, 480);
	game.fps = 30;
	game.onload = function() {

		// シナリオを作る。タイトルはセーブ／ロード時のキーとなるのでユニークな名前に！
		var scenario = new OesScenario('oes_test1');

		// 背景を設定。
		scenario._element.className = 'bg';

		// システム制御。
		var control = OesControl.instance;

		// ブラウザ対策。あらかじめ２種類のファイルを置いておくこと！
		var audioExt = 'mp3'; // 第１候補。
		if (!OesSound.canPlayType(audioExt)) {
			audioExt = 'ogg'; // 第２候補。ブラウザによってはこれもサポートされてない可能性がある。
		}
		audioExt = '.' + audioExt;

		// テスト一覧。
		var c_index = function(chapter) {

			// 必要なオブジェクトはあらかじめ作っておく。
			var text = new OesText();

			// これ以降は、chapter に行を追加する以外は原則やらないこと。

			// 章の各行を登録。
			chapter.act(function() {
				// 初期化。表示するものやサウンドは章に登録する。
				text.className = 'OesText _0';
				text.boxWidth = 480;
				text.boxHeight = 480;
				chapter.addChild(text);
			});
			chapter.print(text,
				'求めてない機能が多いからどこにあるかわからないぞ。順に削減しないとね。'
			);
			chapter.choose(text,[
				{text:'サウンド：ロードと再生', to:'sound'},
			]);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('textProgress').label = 'textProgress';
			chapter.exit('textExpression').label = 'textExpression';
			chapter.exit('textChoose').label = 'textChoose';
			chapter.exit('textWindow').label = 'textWindow';
			chapter.exit('textLogSkip').label = 'textLogSkip';
			chapter.exit('image').label = 'image';
			chapter.exit('sound').label = 'sound';
			chapter.exit('tween').label = 'tween';
			chapter.exit('record').label = 'record';
			chapter.exit('sample1').label = 'sample1';
			chapter.exit('sample2').label = 'sample2';
			chapter.exit('sample3').label = 'sample3';
		};

		// サウンド：ロードと再生。
		var c_sound = function(chapter) {

			// 必要なオブジェクトはあらかじめ作っておく。
			var text = new OesText();
			var img = new OesImage();
			var bgm = new OesSound();
			var se = new OesSound();
			var clickse = function() {
				se.play();
			};

			// これ以降は、chapter に行を追加する以外は原則やらないこと。

			// 章の各行を登録。
			chapter.loadImage(img,'bon.jpg');
			chapter.act(function() {
				// 初期化。表示可能なものはシーンに登録する。
				text.className = 'OesText _6';
				text.x = 0;
				text.y = 349;
				text.boxWidth = 480;
				text.boxHeight = 130;
				chapter.addChild(bgm);
				chapter.addChild(se);
				chapter.addChild(img);
				chapter.addChild(text);
			});
			chapter.print(text,
				'サウンドはロード後に再生できるようになります。再生時にループ指定ができます。{kp}ブラウザ毎に対応状況が異なっているため、サウンドがうまく鳴らない場合があるかもしれません。あらかじめご了承ください。{kp}それでは実際にやってみます。ＢＧＭをロードしてループ再生。{kp}'
			);
			console.log(bgm);
			console.log(chapter.loadSound);
			chapter.loadSound(bgm,"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/ぼくのフレンド.wav");
			chapter.act(function() {
				bgm.loop = true;
				bgm.play();
			});
			chapter.print(text,
				'なお、このテストではロードしつつ再生しましたが、必要なサウンドはあらかじめロードしておくようにするのが良いと思われます。{kp}続いて、効果音を鳴らしてみます。{kp}'
			);
			chapter.loadSound(se,"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/異議あり！(ミツルギ).wav");
			chapter.act(function() {
				img.addEventListener('touchend',clickse);
			});
			chapter.print(text,
				'背景をタッチまたはクリックすると再生します。{kp}以上で、この項の説明を終わります。{kp}'
			);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// 各章をシナリオに登録。
		scenario.addChapter('index',c_index);
		scenario.addChapter('sound',c_sound);

		// デバッグ用。
		scenario.onenterscenario = function() {
			control.autoplay = false;
			control.autoplayWait = 1;
			game.keybind(50,'autoplay'); // '2'
			game.onautoplaybuttonup = function() {
				control.autoplay = !control.autoplay; // toggle
			};
		};
		scenario.onexitscenario = function() {
			control.autoplay = false;
			game.keybind(50,undefined); // '2'
			delete game.onautoplaybuttonup;
		};

		// セーブデータがあればロード画面へ。
		if (OesRecord.hasRecord(scenario.title)) {
			scenario.loadRecord();
		} else {
			scenario.start();
		}
	};
	game.start();
};
