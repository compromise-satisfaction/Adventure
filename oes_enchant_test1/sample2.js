var scenario_sample2 = function(callback) {

	var game = enchant.Game.instance;

	// シナリオを作る。タイトルはセーブ／ロード時のキーとなるので名前がかぶらないように注意！
	var scenario = new OesScenario('sample2_v2');

	// システム制御。
	var control = OesControl.instance;
	control.log = true;
	//control.logHtmltag = true;
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
	logButton.className = 'sample2_button';
	logButton.backgroundColor = '#fc0';
	logButton.x = w;
	w += logButton.boxWidth;
	logButton.addEventListener('touchend',function() {
		log.open('バックログ');
	});
	buttons.addChild(logButton);
	var autoButton = new OesLabel('オート');
	autoButton.className = 'sample2_button';
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
	skipButton.className = 'sample2_button';
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
	loadButton.className = 'sample2_button';
	loadButton.backgroundColor = '#00f';
	loadButton.x = w;
	w += loadButton.boxWidth;
	loadButton.addEventListener('touchend',function() {
		scenario.loadRecord(true);
	});
	buttons.addChild(loadButton);
	var saveButton = new OesLabel('セーブ');
	saveButton.className = 'sample2_button';
	saveButton.backgroundColor = '#f00';
	saveButton.x = w; 
	w += saveButton.boxWidth;
	saveButton.addEventListener('touchend',function() {
		scenario.saveRecord();
	});
	buttons.addChild(saveButton);
	buttons.x = 480 - w;
	buttons.y = 480 - saveButton.boxHeight;

	// 第１章。
	var c1 = function(chapter) {

		// 必要なオブジェクトはあらかじめ作っておく。
		var se = new OesSound();
		var back = new Entity();
		var img = new OesImage(); // bg切り替え用のソースとして利用する。
		var bg1 = new OesImage();
		var bg2 = new OesImage();
		var text = new OesText();
		var fade = new Entity();

		// 章の各行を登録。
		chapter.loadImage(img,['eki.jpg','apart.jpg','neko.jpg']);
		chapter.loadSound(se,['step08'+audioExt,'close11'+audioExt,'neko01'+audioExt]);
		chapter.act(function() {
			// 初期化。表示するものやサウンドは章に登録する。
			back.width = 480;
			back.height = 480;
			back.backgroundColor = '#000';
			back.visible = false;
			//bg2.visible = false;
			text.className = 'sample2_text';
			text.boxWidth = 480;
			text.boxHeight = 480;
			text.chooseClass = 'sample2_choose';
			text.chooseLingering = 1;
			text.printTags.se = function(args) {
				se.source = parseInt(args[0]);
				se.play();
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
			fade.className = 'bg';
			fade.width = 480;
			fade.height = 480;
			fade.opacity = 0;
			fade.visible = false;
			chapter.addChild(se);
			chapter.addChild(bg2);
			chapter.addChild(back);
			chapter.addChild(bg1);
			chapter.addChild(text);
			chapter.addChild(buttons);
			chapter.addChild(fade);
		});
		// ロード後の再開チェックは、章の初期化が済んだ後にやる。
		chapter.resume(); 
		// ■第１節
		chapter.bookmark('帰宅');
		chapter.act(function() {
			bg1.set(img.sources[0]);
			bg1.className = 'sample2_to';
			bg1.opacity = 0;
			bg1.scaleX = 4;
			bg1.scaleY = 4;
			//bg2.visible = false;
		});
		chapter.tween([
			{node:bg1, time:sec(2), opacity:1, easing:enchant.Easing.QUAD_EASEIN},
			{node:bg1, time:sec(2), scaleX:1, easing:enchant.Easing.LINEAR},
			{node:bg1, time:sec(2), scaleY:1, easing:enchant.Easing.LINEAR}
		]);
		chapter.print(text,
			'夜勤あけの眠たい身体に鞭打って、オレはどうにか自宅の最寄り駅に降り立った。{kl}'
			+ '「やれやれ」{kl}'
			+ 'そんな言葉が思わず口をついて出そうになる。{kw}'
			+ '早朝の太陽光は疲れた体に妙に沁み入って来る。'
			+ '早いとこ、家へ帰って寝てしまおう。{kw}'
			+ 'こんなとき駅から自宅まで近いと、ほんと助かる。{kl}'
			+ 'と言ってもこんな寂れた所だから、駅から近い場所に部屋を借りることができたわけだが・・・。{kp}'
		);
		chapter.act(function() {
			bg2.set(img.sources[1]);
			bg2.opacity = 0;
			//bg2.visible = true;
		});
		chapter.tween([
			{node:bg1, time:sec(2), opacity:0, easing:enchant.Easing.QUAD_EASEIN},
			{node:bg2, time:sec(2), opacity:1, easing:enchant.Easing.QUAD_EASEIN}
		]);
		chapter.act(function() {
			bg1.set(img.sources[1]);
			bg1.opacity = 1;
			//bg2.visible = false;
		});
		chapter.print(text,
			'２階建てアパートの前に来た。{kl}'
			+ '踏み上がるたびに嫌な金属音を立てる、{k}{se=0}あちらこちらが錆付いている外階段を上り切ると、{k}そこに待っているのは見慣れた暗がりの通路。{kl}'
			+ '陰気な雰囲気のさらにその奥の２つ目のドアの内側に「我が家」はある。'
			+ '我が家といっても、一人暮らしの身なので誰も待っているものはいない。{kl}'
			+ '財布から取り出した鍵で錠を外し、ノブを引いておもむろにドアを開けた。{kp}{se=1}'
		);
		chapter.wait(1);
		// ■第２節
		chapter.bookmark('猫！？');
		chapter.act(function() {
			back.visible = true;
			bg1.set(img.sources[2]);
			bg1.className = 'sample2_to2';
			bg1.opacity = 0;
			bg1.scaleX = 4;
			bg1.scaleY = 4;
		});
		chapter.tween([
			{node:bg1, time:sec(0.4), opacity:1, easing:enchant.Easing.QUAD_EASEIN},
			{node:bg1, time:sec(0.4), scaleX:1, easing:enchant.Easing.BACK_EASEIN},
			{node:bg1, time:sec(0.4), scaleY:1, easing:enchant.Easing.BACK_EASEIN}
		]);
		chapter.act(function() {
			back.visible = false;
		});
		chapter.print(text,
			'{se=2}{wt=0}<span class="sample2_exclaim">！！！！！！？</span>{kl}{wt}'
			+ '猫だ！　猫がいる！？{kl}'
			+ 'バ、バカな、そんな・・・。{kl}'
			+ 'オレは眼を疑ったが、眼前の事実はそれを明らかに否定している。{kl}'
			+ '思わずオレは、{kl}'
		);
		chapter.choose(text,[
			{text:'冷静になって現実に目を向けた。', to:'a1'},
			{text:'慌てて一目散に逃げ出した。', to:'a2'},
			{text:'なぜだかわからないが呪文を唱えた。', to:'a3'}
		]);
		chapter.print(text,
			'<span class="sample2_shout">「ルーラ！」</span>{kp}'
		).label = 'a3';
		chapter.act(function() {
			bg2.set(img.sources[0]);
			bg2.y = 480;
			//bg2.visible = true;
		});
		chapter.tween([
			{node:bg1, time:sec(0.5), y:-480, easing:enchant.Easing.EXPO_EASEIN},
			{node:bg2, time:sec(0.5), y:0, easing:enchant.Easing.EXPO_EASEIN}
		]);
		chapter.act(function() {
			bg1.set(img.sources[0]);
			bg1.y = 0;
			//bg2.visible = false;
		}).label = 'a2';
		chapter.print(text,
			'気が付いてみると、駅のそばまで来ていた。{kw}'
			+ '毎日のように通っているせいか、ここに辿り着いてしまったようだ。{kl}'
			+ 'それにしても、なぜだ！{kl}'
			+ '戸締りは完璧だったはず。猫どころか、蟻一匹入る隙は無かったはずだ。{kl}'
			+ '・・・いや、蟻が入る隙はあったかも。{kl}'
			+ 'それはともかく、どうしたものか・・・。{kp}'
			+ 'しばらく色々考えた末、オレは覚悟を決めた。{kl}'
			+ '<span class="sample2_shout">「よしっ！　今日は駅寝だ！！」</span>{kl}'
			+ 'その昔「鉄ちゃん」だった頃を思い出し、{k}ひさしぶりにワクワクする気持ちを抑え切れずに、駅へと足早に歩いて行くのであった・・・。{kl}'
			+ '(終){kl}'
		);
		chapter.jump('end');
		// ■第３節
		chapter.bookmark('対峙').label = 'a1';
		chapter.act(function() {
			bg1.set(img.sources[2]);
		});
		chapter.print(text,
			'昨日出かける時、しっかり戸締りしたのを覚えている。{k}'
			+ 'わりと用心深いたちなので、二度三度と確認もした。{k}'
			+ '猫どころか、蟻一匹入る隙は無かったはずだ。{kl}'
			+ '・・・いや、蟻が入る隙はあったかも。{kl}'
			+ 'それはともかく、どうしたものか・・・。{kp}'
			+ '相変わらずこちらを凝視している猫を見てオレは思った。{kl}'
		);
		chapter.act(function() {
			text.chooseShuffle = true;
		});
		chapter.choose(text,[
			{text:'ミャウリンガルを買いに行こう。' ,to:'b1'},
			{text:'猫語で会話をしよう。' ,to:'b1'},
			{text:'なでなでしよう。' ,to:'b1'},
			{text:'肉球に触ろう。' ,to:'b1'},
			{text:'ネコビームに気をつけよう。' ,to:'b1'},
			{text:'カリカリを用意しよう。' ,to:'b1'},
			{text:'ネコジャラシを取ってこよう。' ,to:'b1'},
			{text:'そうだ京都へ行こう。' ,to:'b1'},
			{text:'ネコになろう。' ,to:'b1'},
			{text:'一緒に住もう。' ,to:'b2'}
		]).label = 'b';
		chapter.print(text,
			'いや、いや、いや。そうじゃないだろ。{kl}'
			+ '何考えてんだオレは。{kw}'
			+ '深く一呼吸して自分を落ち着かせ、再びオレは思った。{kl}'
		).label = 'b1';
		chapter.jump('b');
		chapter.print(text,
			'そうだ、そうしよう。{kl}'
			+ 'それがいい！　これは運命なんだ！！{kl}'
			+ 'もともとネコ好きなオレは、これは天からの恵みとばかりに心から喜び、受け入れることにした。{kp}'
			+ 'さて、一緒に住むとなると、いろいろと入用だな。{k}'
			+ 'エサに、トイレに、あとワクチンとか打たないと・・・。{k}'
			+ 'あと大家さんはどうやってごまかすか、{k}ペット禁止なんだよな・・・。{k}'
			+ 'っていうか名前だよ、名前。まずはそれを決めないと・・・。{kl}'
			+ 'バラ色の生活が始まることにワクワクしてとまらないオレは、{kl}'
			+ '<span class="sample2_exclaim">「今日はもう眠れないぜ、コンチクショー！」</span>{kl}'
			+ 'とばかりに、いろいろ思いを巡らしまくるのであった。{kl}'
			+ '(終・・・？){kl}'
		).label = 'b2';
		chapter.act(function() {
			back.visible = true;
		});
		chapter.tween([
			{node:bg1, time:sec(2), opacity:0, easing:enchant.Easing.QUAD_EASEOUT},
			{node:text, time:sec(2), opacity:0, easing:enchant.Easing.QUAD_EASEOUT}
		]);
		chapter.wait(3);
		// ■第４節
		chapter.bookmark('救い');
		chapter.act(function() {
			back.visible = true;
			bg1.visible = false;
			text.opacity = 1;
			text.clear();
		});
		chapter.print(text,
			'ＰＳ．{kl}'
			+ '次の日、ネコが首輪を付けていることに気づいたオレが、{k}'
			+ 'バラ色からどん底に落ちたのは言うまでもない・・・。{kl}'
			+ 'そんな肝心な事にさえ気が回らないほどに舞い上がってしまっていたようだ。{kl}'
			+ '結局のところ、ボロアパートの天井裏を遊び場にしていた、{k}'
			+ '近所の飼いネコがオレの部屋の天袋から侵入したに過ぎなかった。{kl}'
			+ '以前から天井裏のネズミがうるせーなと思っていたのは、{k}'
			+ 'このネコの仕業だったようだ。{kp}'
			+ '唯一の救いは、{kl}'
			+ 'そのネコの飼い主である、ご近所の美人おねーさんとお近づきになれたことである。{kl}'
			+ '会話した時にビビッと感じたのだが、どうやら「鉄子」っぽい気がする。{kl}'
			+ 'その昔「鉄ちゃん」だった頃を思い出し、{k}ひさしぶりにワクワクする気持ちを抑え切れずに、{kl}'
			+ '<span class="sample2_exclaim">「今日はもう眠れないぜ、コンチクショー！」</span>{kl}'
			+ 'とばかりに、いろいろ思いを巡らしまくるのであった。{kl}'
			+ '(完){kl}'
		);
		chapter.act(function() {
			fade.visible = true;
		}).label = 'end';
		chapter.tween([
			{node:fade, time:sec(2), opacity:1, easing:enchant.Easing.QUAD_EASEOUT}
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
	game.onload = scenario_sample2(function() {alert('done');});
	game.start();
};
*/
