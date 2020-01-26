var scenario_sample1 = function(callback) {

	var game = enchant.Game.instance;

	// シナリオを作る。タイトルはセーブ／ロード時のキーとなるので名前がかぶらないように注意！
	var scenario = new OesScenario('sample1_v2');

	// システム制御。
	var control = OesControl.instance;
	control.log = true;
	control.autoplay = false;
	control.skipread = false;

	// ブラウザ対策。あらかじめ２種類のファイルを置いておくこと！
	var audioExt = 'mp3'; // 第１候補。
	if (!OesSound.canPlayType(audioExt)) {
		audioExt = 'ogg'; // 第２候補。ブラウザによってはこれもサポートされてない可能性がある。
	}
	audioExt = '.' + audioExt; 

	// ログ画面。
	var log = new OesLogForm();

	// 秒をフレーム数へ変換。
	var sec = function(s) {
		return s * game.fps;
	};

	// 複数のボタンをまとめてグループ化する。
	var buttons = new Group();
	var w = 0;
	var logButton = new OesLabel('ログ');
	logButton.className = 'sample1_button';
	logButton.backgroundColor = '#fc0';
	logButton.x = w;
	w += logButton.boxWidth;
	logButton.addEventListener('touchend',function() {
		log.open('バックログ');
	});
	buttons.addChild(logButton);
	var autoButton = new OesLabel('オート');
	autoButton.className = 'sample1_button';
	autoButton.backgroundColor = '#0c0';
	autoButton.x = w;
	w += autoButton.boxWidth;
	autoButton.addEventListener('touchend',function() {
		control.autoplay = !control.autoplay; // トグル動作
		if (control.autoplay) {
			this.addClass('on');
		} else {
			this.removeClass('on');
		}
	});
	buttons.addChild(autoButton);
	var skipButton = new OesLabel('スキップ');
	skipButton.className = 'sample1_button';
	skipButton.backgroundColor = '#09f';
	skipButton.color = '#999';
	skipButton.x = w;
	w += skipButton.boxWidth;
	skipButton.addEventListener('touchend',function() {
		// スキップ可能状態でないと凹にできないようにする。
		if (!control.skipread && this.color !== 'rgb(255, 255, 255)') {
			return;
		}
		control.skipread = !control.skipread; // トグル動作
		if (control.skipread) {
			this.addClass('on');
		} else {
			this.removeClass('on');
		}
	});
	buttons.addChild(skipButton);
	var loadButton = new OesLabel('ロード');
	loadButton.className = 'sample1_button';
	loadButton.backgroundColor = '#00f';
	loadButton.x = w;
	w += loadButton.boxWidth;
	loadButton.addEventListener('touchend',function() {
		scenario.loadRecord(true);
	});
	buttons.addChild(loadButton);
	var saveButton = new OesLabel('セーブ');
	saveButton.className = 'sample1_button';
	saveButton.backgroundColor = '#f00';
	saveButton.x = w;
	w += saveButton.boxWidth;
	saveButton.addEventListener('touchend',function() {
		scenario.saveRecord();
	});
	buttons.addChild(saveButton);
	buttons.x = 480 - w;

	// 第一章。
	var c1 = function(chapter) {

		// 必要なオブジェクトはあらかじめ作っておく。
		var bg = new Entity();
		var a = new OesImage();
		var b = new OesImage();
		var a1 = new OesImage();
		var b1 = new OesImage();
		var text = new OesText();
		var bgm = new OesSound();
		var bar = new Entity();
		var caption = new OesLabel('');
		var fade = new Entity();

		// 章の各行を登録。
		chapter.loadImage(a,'a.png');
		chapter.loadImage(b,'b.png');
		chapter.loadImage(a1,'sankaku.png');
		chapter.loadImage(b1,'sankaku.png');
		chapter.loadSound(bgm,'087'+audioExt);
		chapter.act(function() {
			// 初期化。表示するものやサウンドは章に登録する。
			bg.className = 'sample1_bg';
			bg.width = 480;
			bg.height = 480;
			a.x = -164;
			a.y = 136;
			a.opacity = 0;
			b.x = 480;
			b.y = 136;
			b.opacity = 0;
			a1.x = 92;
			a1.y = 335;
			a1.visible = false;
			b1.x = 360;
			b1.y = 335;
			b1.visible = false;
			text.className = 'sample1_text';
			text.y = -130; // 353;
			text.boxWidth = 480;
			text.boxHeight = 130;
			text.opacity = 0;
			text.printTags.talk = function(args) { // ユーザー定義タグのハンドラ設定。
				a1.visible = (args[0] === 'a');
				b1.visible = (args[0] === 'b');
			};
			text.onchangeskipable = function(skipable) { // 既読スキップ可能状態が変化。
				if (skipable) {
					text.addClass('skipable');
					skipButton.color = '#fff';
				} else {
					text.removeClass('skipable');
					skipButton.color = '#999';
					// 自動でボタンを凸状態へ。
					if (control.skipread) {
						control.skipread = false;
						skipButton.removeClass('on');
					}
				}
			};
			bar.width = 480;
			bar.height = saveButton.boxHeight;
			bar.backgroundColor = '#fff';
			bar.opacity = 0.8;
			caption.className = 'sample1_caption';
			caption.width = 480;
			caption.x = 480;
			caption.y = saveButton.boxHeight;
			fade.className = 'bg';
			fade.width = 480;
			fade.height = 480;
			chapter.addChild(bgm);
			chapter.addChild(bg);
			chapter.addChild(caption);
			chapter.addChild(a);
			chapter.addChild(b);
			chapter.addChild(a1);
			chapter.addChild(b1);
			chapter.addChild(text);
			chapter.addChild(bar);
			chapter.addChild(buttons);
			chapter.addChild(fade);
		});
		chapter.resume(); // ロード後の再開をチェック。
		// ■
		chapter.bookmark('Ａ＆Ｂ登場');
		// フェードイン。
		chapter.tween(
			{node:fade, time:sec(1), opacity:0, easing:enchant.Easing.QUAD_EASEIN}
		);
		chapter.act(function() {
			fade.visible = false;
		});
		// テキストが上から降りてくる。
		chapter.tween([
			{node:text, time:sec(1), opacity:1, easing:enchant.Easing.QUAD_EASEIN},
			{node:text, time:sec(1), y:351, easing:enchant.Easing.LINEAR}
		]);
		// 見出しアクション。
		chapter.act(function() {
			caption.text = scenario.record.caption;
			//caption.autoSize();
			caption.x = 480;
			caption.opacity = 0;
		});
		chapter.tween([
			{node:caption, time:sec(1), x:0, easing:enchant.Easing.QUAD_EASEOUT},
			{node:caption, time:sec(1), opacity:1, easing:enchant.Easing.QUAD_EASEOUT}
		],{}); // async
		// Ａが左から入場。
		chapter.tween([
			{node:a, time:sec(0.5), opacity:1, easing:enchant.Easing.QUAD_EASEIN},
			{node:a, time:sec(0.5), x:24, easing:enchant.Easing.LINEAR}
		]);
		chapter.print(text,
			'{talk=a}'
			+ 'Ａ「はじめまして、わたしはＡです。{kp}'
			+ '{talk}'
		);
		// Ｂが右から入場。
		chapter.tween([
			{node:b, time:sec(1), opacity:1, easing:enchant.Easing.QUAD_EASEIN},
			{node:b, time:sec(1), x:292, easing:enchant.Easing.LINEAR}
		]);
		chapter.print(text,
			'{talk=b}'
			+ 'Ｂ「どうも～、Ｂです。{kp}'
			+ 'Ｂ「ふたり合わせて、危険戦隊アブレンヂャー！{kp}'
			+ '{talk}'
		);
		// Ａが退場。
		chapter.tween(
			{node:a, time:sec(0.5), x:-164, easing:enchant.Easing.LINEAR}
		);
		chapter.wait(2);
		chapter.print(text,
			'{talk=b}'
			+ 'Ｂ「・・・・・お～い{kp}'
			+ 'Ｂ「・・・・・かえってこ～い{kp}'
			+ 'Ｂ「オレが悪かった、戻って来てくれ。{kl}いや、戻って来てください。{kp}'
			+ '{talk}'
		);
		// Ａが再入場。
		chapter.tween(
			{node:a, time:sec(0.5), x:24, easing:enchant.Easing.LINEAR}
		);
		// Ｂが退場。
		chapter.tween(
			{node:b, time:sec(0.5), x:644, easing:enchant.Easing.LINEAR}
		);
		chapter.print(text,
			'{talk=a}'
			+ 'Ａ「どこへ行くんぢゃ、ゴラぁ！{kp}'
			+ '{talk}'
		);
		// Ｂが再入場。
		chapter.tween(
			{node:b, time:sec(0.5), x:292, easing:enchant.Easing.LINEAR}
		);
		// ■
		chapter.bookmark('oes.enchant.jsとは？');
		// 見出しアクション。
		chapter.act(function() {
			caption.text = scenario.record.caption;
			//caption.autoSize();
			caption.x = 480;
			caption.opacity = 0;
		});
		chapter.tween([
			{node:caption, time:sec(1), x:0, easing:enchant.Easing.QUAD_EASEOUT},
			{node:caption, time:sec(1), opacity:1, easing:enchant.Easing.QUAD_EASEOUT}
		],{}); // async
		chapter.print(text,
			'{talk=b}'
			+ 'Ｂ「いやぁ、思わず逃げてしまった。{kl}ところで、オレらここで何をしようってんだい？{kp}'
			+ '{talk=a}'
			+ 'Ａ「『oes.enchant.js』の紹介です。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「・・・なに、それ？{kp}'
			+ '{talk=a}'
			+ 'Ａ「HTML5＋JavaScriptなゲームエンジンである『enchant.js』用のプラグインの名前です。{kp}'
			+ 'Ａ「このプラグインはノベルゲーム向けの機能を備えています。{kp}'
			+ 'Ａ「これを利用することで、Webブラウザ上で動くノベルゲームっぽいものが作れるようになります。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「へ～・・・。{kl}それは食えるのか？<br>うまいのか？{kp}'
			+ '{talk}'
		);
		// Aが退場しようとする。
		chapter.tween(
			{node:a, time:sec(0.5), x:-82, easing:enchant.Easing.LINEAR}
		);
		// Bが引きとめようとする。
		chapter.tween(
			{node:b, time:sec(0.5), x:82, easing:enchant.Easing.EXPO_EASEOUT}
		);
		// Aを引っ張りながらBが戻る。
		chapter.tween([
			{node:a, time:sec(1), x:24, easing:enchant.Easing.LINEAR},
			{node:b, time:sec(1), x:188, easing:enchant.Easing.LINEAR}
		]);
		// Bが元の位置へ。
		chapter.tween(
			{node:b, time:sec(0.5), x:292, easing:enchant.Easing.EXPO_EASEOUT}
		);
		chapter.print(text,
			'{talk=b}'
			+ 'Ｂ「じょ、冗談だよ、冗談。<br>ハッハッハッハッ・・・{kp}'
			+ 'Ｂ「んで、そのノベルゲームっぽいのをどうやって作るんだ。{kp}'
			+ '{talk=a}'
			+ 'Ａ「それをこれから説明していくのです。{kp}'
			+ 'Ａ「ちなみに、私たちが出てるこれ自体がoes.enchant.jsを使ったサンプルになっています。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「ほ～。{kp}'
			+ '{talk=a}'
			+ 'Ａ「作るにはまず素材を用意してください。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「素材？{kp}'
			+ '{talk=a}'
			+ 'Ａ「絵素材としてはJPG、PNG、GIFなど、音素材としてはMP3とかOGGとかのファイルをサポートしています。{kp}'
			+ 'Ａ「ただし、音ファイルはブラウザによって対応状況が異なるようです。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「・・・え～と、{kp}'
			+ '{talk=a}'
			+ 'Ａ「よくわからないときはインターネットとかで検索したりして調べてください。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「ちょっと教えてくれたっていいぢゃないか、見た目が火のように赤いのに冷たいやつだな。{kp}'
			+ '{talk=a}'
			+ 'Ａ「・・・あなたこそ、見た目が水のように青いんだから冷静になってください。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「・・・そう来たか。{kp}'
			+ '{talk=a}'
			+ 'Ａ「素材が用意できたら、ストーリーを考えてスクリプトを書きます。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「スクリプトって？{kp}'
			+ '{talk=a}'
			+ 'Ａ「JavaScriptのことです。プラグインで提供されるノベルゲームの機能を使ってプログラムするのです。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「プログラム？{kp}'
			+ '{talk=a}'
			+ 'Ａ「ん～なんというか・・・。{kp}'
			+ 'Ａ「ああしたらこうするといった手続きを列挙した指示書、とでも言えばわかりますか？{kp}'
			+ '{talk=b}'
			+ 'Ｂ「ん～、なんとなくわかったような、そうでないような。{kp}'
			+ '{talk=a}'
			+ 'Ａ「まぁ、習うより慣れろでいろいろやってみれば、そのうちどうにかなりますよ。ハッハッハッハッハッ・・・。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「なんか、なげやりだな。{kp}'
			+ '{talk=a}'
			+ 'Ａ「ええ、学生時代はやりなげの選手でしたから。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「・・・。{kp}'
			+ '{talk=a}'
			+ 'Ａ「・・・。{kp}'
			+ 'Ａ「スクリプトが書けたら、ＰＣ上でデバッグします。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「デバッグとは？{kp}'
			+ '{talk=a}'
			+ 'Ａ「テストもせず、いきなりお披露目して問題があったりしたら、カッコ悪いじゃないですか。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「ふむ。{kp}'
			+ '{talk=a}'
			+ 'Ａ「本番同様にサーバーにアップロードしてテストしてもよいのですが、それなりに手間がかりますし。{kp}'
			+ 'Ａ「Webブラウザがあればローカルな環境でテストできますので、まずはそこで色々試行錯誤するわけです。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「要するに、憎いあんちくしょうとケンカする前のシャドーボクシングということだな。{kp}'
			+ '{talk=a}'
			+ 'Ａ「その例えはどうかと思いますが・・・。まぁ、気持ち的にはそんな感じですね。{kp}'
			+ 'Ａ「スクリプトに間違いがあったり、挙動が想定と違っていたりしないか確認できたら、いよいよお披露目です。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「４回戦デビューというわけだな。{kp}'
			+ '{talk=a}'
			+ 'Ａ「・・・なぜにボクシングを例えに？{kp}'
			+ '{talk=b}'
			+ 'Ｂ「そして、最後は燃え尽きて真っ白い灰に・・・。{kp}'
			+ '{talk=a}'
			+ 'Ａ「どうして、そうなるんですか！{kl}Ｂさんは放っておいて先へ進めます。{kp}'		
			+ 'Ａ「準備した素材ファイル、スクリプトファイルを、どこかWebサイトへアップロードします。{kp}'
			+ 'Ａ「あとは、アップロードした場所にアクセスすればスクリプトが実行され、プレイできるというわけです。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「ふむ。まぁ、なんとなくわかった。{kl}ところで気になることがあるんだが。{kp}'
			+ '{talk=a}'
			+ 'Ａ「なんでしょう？{kp}'
			+ '{talk=b}'
			+ 'Ｂ「ノベルゲームにつきもののサウンドはどうした。聞こえていないようだが・・・。{kp}'
			+ '{talk=a}'
			+ 'Ａ「た、確かにそうですね。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「それに前から思ってたんだが、この背景とかオレらの絵とか・・・殺風景すぎないか？{kp}'
			+ '{talk=a}'
			+ 'Ａ「・・・それは作者に絵心とか音心とか無いので、しょうがないんです。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「ショウガの無いショウガ焼き並みにしょうがないな。{kp}'
			+ '{talk}'
			+ '＊「・・・・・・・・・・。{kp}'
		);
		// ■
		chapter.bookmark('サウンド鳴ります');
		// 見出しアクション。
		chapter.act(function() {
			caption.text = scenario.record.caption;
			//caption.autoSize();
			caption.x = 480;
			caption.opacity = 0;
		});
		chapter.tween([
			{node:caption, time:sec(1), x:0, easing:enchant.Easing.QUAD_EASEOUT},
			{node:caption, time:sec(1), opacity:1, easing:enchant.Easing.QUAD_EASEOUT}
		],{}); // async
		chapter.print(text,
			'{talk=a}'
			+ 'Ａ「さすがに音が無いのはさみしいので、{kp}'
			+ 'Ａ「ネットの無料素材を利用させてもらいました。『DOVA-SYNDROME』さんに感謝です。{kp}'
			+ '{talk}'
		);
		chapter.act(function() {
			bgm.loop = true;
			bgm.play();
		});
		chapter.print(text,
			'<span style="color:red">♪</span>{kp}'
			+ '{talk=a}'
			+ 'Ａ「どうでしょう、Ｂさん。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「オッケー！ ベイベェ！！ ノってきたぜぃ！！！{kp}'
			+ '{talk=a}'
			+ 'Ａ「そんな曲調じゃないでしょ！{kp}'
			+ '{talk=b}'
			+ 'Ｂ「いやぁ、なんか勢いで・・・。{kp}'
			+ '{talk=a}'
			+ 'Ａ「ざっとですが、紹介は以上です。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「もうオレらは、用無しってことか。{kp}'
			+ '{talk=a}'
			+ 'Ａ「ＡとかＢとか、名前からしてどうでもいい感じですし。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「やれやれだぜ。{kp}'
			+ '{talk=a}'
			+ 'Ａ「それでは皆さん、さようなら～。{kp}'
			+ '{talk=b}'
			+ 'Ｂ「Ｚｚｚ・・・{kp}'
			+ '{talk}'
		);
		// フェードアウト。
		chapter.act(function() {
			fade.visible = true;
		});
		chapter.tween([
			{node:bgm, time:sec(3), volume:0, easing:enchant.Easing.QUAD_EASEOUT},
			{node:fade, time:sec(3), opacity:1, easing:enchant.Easing.QUAD_EASEOUT}
		]);
		// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
		chapter.exit();
	};

	// 章をシナリオに登録。
	scenario.addChapter('c1',c1);

	// シナリオ開始時やロード再開時の処理。
	scenario.onenterscenario = function() {
		if (control.autoplay) {
			control.autoplay = false;
			autoButton.removeClass('on');
		}
		if (control.skipread) {
			control.skipread = false;
			skipButton.removeClass('on');
		}
	};

	// シナリオ終了時の処理。
	scenario.onexitscenario = function() {
		control.log = false;
		control.autoplay = false;
		control.skipread = false;
		control.clearLog();
		if (callback) {
			callback();
		}
	};

	if (OesRecord.hasRecord(scenario.title)) {
		// セーブデータがあればロード画面へ。
		scenario.loadRecord();
	} else {
		// シナリオ開始。
		scenario.start();
	}
};
/*
//test
enchant();
window.onload = function() {
	var game = new Game(480, 480);
	game.fps = 30;
	game.onload = scenario_sample1(function(){alert('done');});
	game.start();
};
*/
