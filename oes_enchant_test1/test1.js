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

		// 序章。
		var c_intro = function(chapter) {

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
				'これは、HTML5 + JavaScript なゲームエンジンである「<a href="http://enchantjs.com/ja/?s=ja" target="_blank">enchant.js</a>」を利用したノベルゲーム向けの機能テストのサンプルです。{kw}ノベルゲーム向けの機能はプラグインの形で実装しています。{kw}このサンプルを実行するには、HTML5およびCSS3をサポートしているWebブラウザが必要です。ブラウザによって対応状況が異なることがあるようです。{kw}Windows上の<a href="http://www.google.co.jp/chrome/intl/ja/landing_ch.html" target="_blank">Chrome</a>ブラウザにて動作確認をしていますが、OSや使用フォントなど動作環境のちがいにより、うまく動作しなかったり、見え方が異なることがあるかもしれません。あらかじめご了承ください。{kp}このテストではインターネットで公開されている無料素材を利用させていただいております。皆様に感謝です。<br><a href="http://www.s-hoshino.com" target="_blank">「フリー素材屋Hoshino」</a>様。<br><a href="http://kage-design.com/wp/" target="_blank">「シルエットデザイン」</a>様。<br><a href="http://www.avatar-maker.info/am_01/" target="_blank">「アバターメーカー」</a>様。<br><a href="http://www.patterncooler.com/index.php" target="_blank">「PatternCooler」</a>様。<br><a href="http://dova-s.jp/" target="_blank">「DOVA SYNDROME」</a>様。<br><a href="http://osabisi.sakura.ne.jp/m2/" target="_blank">「ザ・マッチメイカァズ」</a>様。<br><a href="http://sozai.7gates.net/" target="_blank">「無料素材倶楽部」</a>様。<br><a href="http://www.igosso.net/" target="_blank">「igosso画像検索」</a>様。<br><a href="http://www.yen-soft.com/ssse/" target="_blank">「フリー効果音 On-Jin ～音人～」</a>様。<br>（順不同）{kp}'
			);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

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
				'ノベルゲーム向け機能テストの目次。'
			);
			chapter.choose(text,[
				{text:'テキスト：逐次的出力と入力待ち', to:'textProgress'},
				{text:'テキスト：文字表現', to:'textExpression'},
				{text:'テキスト：選択肢', to:'textChoose'},
				{text:'テキスト：ウインドウ表現', to:'textWindow'},
				{text:'テキスト：バックログと既読スキップ', to:'textLogSkip'},
				{text:'画像：ロードと配置と選択', to:'image'},
				{text:'サウンド：ロードと再生', to:'sound'},
				{text:'Tweenアニメーション', to:'tween'},
				{text:'フラグとセーブ/ロード', to:'record'},
				{text:'実践的サンプル１：「紹介」風', to:'sample1'},
				{text:'実践的サンプル２：「ノベル」風', to:'sample2'},
				{text:'実践的サンプル３：「脱出」風', to:'sample3'}
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

		// テキスト：逐次的出力と入力待ち。
		var c_textProgress = function(chapter) {

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
				'デフォルトではこのように逐次的に文字が順に表示されるようになっています。{kl}{wt=0.1}ゆっくり表示させたり、{kw}{wt=0.0166}はやく表示させたり、{kw}{wt=0}瞬間的に表示させたりと、{kw}{wt}速度を変えることができるようになっています。{kl}句読点などの特定文字は、表示後の待ちが少し長めになるようにしてありますが、{kw}無効にしたり待ちの長さを調整したり、別な特定文字に変えることも可能です。{kl}また、このように入力待ちさせたり、{kw}入力待ち後に改行させたり、{kl}入力待ち後に改ページさせたりすることもできます。{kp}入力待ちアイコンの画像は変更することもできます。{kp}逐次的な文字出力の速度や入力待ちは独自のタグをテキスト中に埋め込むことで実現できるようになっています。{kl}具体的には、<b>&#123;wt=0.1&#125;</b>や<b>&#123;kl&#125;</b>といったように表記して埋め込みます。ユーザー定義のタグを追加することも可能です。{kl}なお、入力待ちでない逐次表示中にテキストをクリックやタッチすると、待ちをキャンセルして瞬間的に表示させることができます。その状態は次に改ページするまで継続されます。{kp}以上で、この項の説明を終わります。{kp}'
			);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// テキスト：文字表現。
		var c_textExpression = function(chapter) {

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
				'&lt;span&gt;タグによるCSS適用で、いろいろな文字表現を行うことが可能です。{kl}<span class="textColor">色を付けたり</span>、{kl}<span class="textBold">太字にしたり</span>、{kl}<span class="textBox">ワクで囲ったり</span>、{kl}<span class="textSmall">小さくしたり</span>、{kl}<span class="textLarge">大きくしたり</span>、{kl}<span class="textShadow">影を落としたり</span>、{kl}<span class="textOutline">袋文字にしたり</span>、{kl}<span class="textDim">ぼかしたり</span>、{kl}<span class="textGlow">光らせたり</span>、{kl}など工夫次第で色々できそうですね。{kp}また、ルビを振ることもできます。<ruby>漢<rt>かん</rt>字<rt>じ</rt></ruby>。ただし、いずれの<ruby>場<rt>ば</rt>合<rt>あい</rt></ruby>もブラウザによって<ruby>対<rt>たい</rt>応<rt>おう</rt>状<rt>じょう</rt>況<rt>きょう</rt></ruby>が<ruby>異<rt>こと</rt></ruby>なることがあるようですので、ご<ruby>注<rt>ちゅう</rt>意<rt>い</rt></ruby>ください。{kp}以上で、この項の説明を終わります。{kp}'
			);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// テキスト：選択肢。
		var c_textChoose = function(chapter) {

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
				'選択肢は例えば以下のような感じになります。選択すると改ページ処理が行われ、テキストはクリアされます。試しに選択してみてください。'
			);
			chapter.setLabel('a');
			chapter.choose(text,[
				{text:'これがよさげ。', to:'a0'},
				{text:'これですよね？', to:'a0'},
				{text:'これにすべき！', to:'a1'}
			]);
			chapter.setLabel('a0');
			chapter.print(text,
				'残念、はずれ。もう一度。'
			);
			chapter.jump('a');
			chapter.setLabel('a1');
			chapter.print(text,
				'当り！　次へ進みます。{kp}'
			);
			chapter.print(text,
				'シャッフルしてランダムな順に表示することができます。何度か試してから次へ進んでみてください。'
			);
			chapter.act(function() {
				text.chooseShuffle = true;
			});
			chapter.setLabel('b');
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'b0'},
				{text:'選択肢Ｂ', to:'b0'},
				{text:'選択肢Ｃ', to:'b0'},
				{text:'選択肢Ｄ', to:'b0'},
				{text:'次へ進む', to:'b1'}
			]);
			chapter.setLabel('b0');
			chapter.print(text,
				'毎回、表示順がちがっているはずです。'
			);
			chapter.jump('b');
			chapter.setLabel('b1');
			chapter.act(function() {
				text.chooseShuffle = false;
				text.chooseInline = true;
			});
			chapter.print(text,
				'選択肢はインラインに表示することもできます。どれを選んでも次へ進みます。<br>'
			);
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'c'},
				{text:'選択肢Ｂ', to:'c'},
				{text:'選択肢Ｃ', to:'c'},
				{text:'選択肢Ｄ', to:'c'},
				{text:'選択肢Ｅ', to:'c'}
			]);
			chapter.setLabel('c');
			chapter.act(function() {
				text.chooseInlineSeparator = ' | ';
			});
			chapter.print(text,
				'インライン表示時の区切りは「カンマ＋空白」がデフォルトとなっていますが、変更することができます。どれを選んでも次へ進みます。<br>'
			);
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'c1'},
				{text:'選択肢Ｂ', to:'c1'},
				{text:'選択肢Ｃ', to:'c1'},
				{text:'選択肢Ｄ', to:'c1'},
				{text:'選択肢Ｅ', to:'c1'}
			]);
			chapter.setLabel('c1');
			chapter.act(function() {
				text.chooseInlineSeparator = '<br>';
			});
			chapter.print(text,
				'区切りを「&lt;br&gt;」に変更すると、見た目にはデフォルトと同じようにできます。実際にはブロック要素とインライン要素の違いとなります。どれを選んでも次へ進みます。<br>'
			);
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'c2'},
				{text:'選択肢Ｂ', to:'c2'},
				{text:'選択肢Ｃ', to:'c2'},
				{text:'選択肢Ｄ', to:'c2'},
				{text:'選択肢Ｅ', to:'c2'}
			]);
			chapter.setLabel('c2');
			chapter.act(function() {
				text.chooseInline = false;
				text.chooseClass = 'choose2';
			});
			chapter.print(text,
				'選択肢の視覚表現を変更することもできます。どれを選んでも次へ進みます。'
			);
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'d'},
				{text:'選択肢Ｂ', to:'d'},
				{text:'選択肢Ｃ', to:'d'}
			]);
			chapter.setLabel('d');
			chapter.act(function() {
				text.chooseClass = 'choose';
				text.choosePrefix = function(n) {
					return '&#0' + (n+65) + '.';
				};
			});
			chapter.print(text,
				'順番の添え字を変更することもできます。アルファベットにしてみました。どれを選んでも次へ進みます。'
			);
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'e'},
				{text:'選択肢Ｂ', to:'e'},
				{text:'選択肢Ｃ', to:'e'}
			]);
			chapter.setLabel('e');
			chapter.act(function() {
				text.chooseClass = 'choose3';
				text.choosePrefix = function(n) {
					return '';
				};
			});
			chapter.print(text,
				'順番の添え字を無くして、センタリングとかもできます。どれを選んでも次へ進みます。'
			);
			chapter.choose(text,[
				{text:'これ？', to:'f'},
				{text:'これかな？', to:'f'},
				{text:'これにしようかな？', to:'f'}
			]);
			chapter.setLabel('f');
			chapter.act(function() {
				text.chooseClass = 'choose';
				text.chooseLingering = 1;
				text.choosePrefix = function(n) {
					return String(n+1) + '.';
				};
			});
			chapter.print(text,
				'選択された項目だけを暫く残し、それ以外を消すことで「余韻」を表現することができます。「余韻」の時間は調整可能です。どれを選んでも次へ進みます。'
			);
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'g'},
				{text:'選択肢Ｂ', to:'g'},
				{text:'選択肢Ｃ', to:'g'}
			]);
			chapter.setLabel('g');
			chapter.act(function() {
				text.chooseInline = true;
				text.chooseInlineSeparator = ', ';
			});
			chapter.print(text,
				'インライン表示時でも「余韻」を設定できます。どれを選んでも次へ進みます。<br>'
			);
			chapter.choose(text,[
				{text:'選択肢Ａ', to:'h'},
				{text:'選択肢Ｂ', to:'h'},
				{text:'選択肢Ｃ', to:'h'},
				{text:'選択肢Ｄ', to:'h'},
				{text:'選択肢Ｅ', to:'h'}
			]);
			chapter.setLabel('h');
			chapter.print(text,
				'以上で、この項の説明を終わります。{kp}'
			);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// テキスト：ウインドウ表現。
		var c_textWindow = function(chapter) {

			// 必要なオブジェクトはあらかじめ作っておく。
			var text = new OesText();
			var text2 = new OesText();
			var img1 = new OesImage();
			var img2 = new OesImage();

			// これ以降は、chapter に行を追加する以外は原則やらないこと。

			// 章の各行を登録。リソースはあらかじめロードしておく。
			chapter.loadImage(img1,'avator1.gif');
			chapter.loadImage(img2,'avator2.gif');
			chapter.act(function() {
				// 初期化。表示するものやサウンドは章に登録する。
				text.className = 'OesText _0';
				text.boxWidth = 480;
				text.boxHeight = 480;
				text.printTags.cn = function(args) { // ユーザー定義タグのハンドラ設定。
					text.className = 'OesText _' + args[0];
					text.boxWidth = 480;
				};

				text2.className = 'OesText _6';
				text2.x = 0;
				text2.y = 349;
				text2.boxWidth = 480;
				text2.boxHeight = 130;
				text2.visible = false;

				img1.visible = false;
				img2.visible = false;

				chapter.addChild(text);
				chapter.addChild(text2);
				chapter.addChild(img1);
				chapter.addChild(img2);
			});
			chapter.print(text,
				'デフォルトではテキストの背景は透明ですが、大きさを調整して背景色を適用させると…。{kp}'
			);
			chapter.act(function() {
				text.className = 'OesText _1';
				text.x = 0;
				text.y = 0;
				text.boxWidth = 480;
				text.boxHeight = 130;
			});
			chapter.print(text,
				'このようなウインドウ表現ができます。なお、クリックやタッチの反応はウインドウ範囲内に限定されるようになるので注意してください。{kp}'
			);
			chapter.print(text,
				'{cn=2}境界線を付けたり、{kw}{cn=3}角丸な境界線にしたり、{kw}{cn=4}影を落としたり、{kw}{cn=5}画像を入れたり…{kw}と、CSSを適用させることで色々なウインドウ表現が可能です。{kp}'
			);
			chapter.act(function() {
				text2.visible = true;
			});
			chapter.print(text2,
				'複数のテキストを作れば、複数のウインドウ表現が可能です。{kp}'
			);
			chapter.act(function() {
				text.className = 'OesText _7';
				text.boxWidth = 480;
				img1.x = 7;
				img1.y = 15;
				img1.visible = true;
			});
			chapter.print(text,
				'パディングを調整して手前に絵を配置すると、こんな感じにできます。{kw}'
			);
			chapter.act(function() {
				text2.className = 'OesText _7';
				text2.boxWidth = 480;
				img2.x = 7;
				img2.y = 364;
				img2.visible = true;
			});
			chapter.print(text2,
				'同じようにすれば、こちらもこんな感じになります。{kp}複数のテキストを使うと、こんな感じな選択肢表現も可能です。'
			);
			chapter.act(function() {
				text.className = 'OesText _9';
				text.boxWidth = 480;
				text.chooseClass = 'choose4';
				text.clear();
				img1.visible = false;
			});
			chapter.print(text2,
				'どれを選んでも次へ進みます。'
			);
			chapter.choose(text,[
				{text:'せっかちだからオレはこれを選ぶぜ！', to:'a'},
				{text:'せっかくだからオレはこれを選ぶぜ！', to:'a'},
				{text:'せっかいだからオレはこれを選ぶぜ！', to:'a'}
			]);
			chapter.print(text2,
				'{np}以上で、この項の説明を終わります。{kp}'
			).label = 'a';
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// バックログと既読スキップ。
		var c_textLogSkip = function(chapter) {

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
				'ノベルゲームにつきものの機能といえば、読んだ文章をさかのぼって表示するバックログ、既に読んだ文章を飛ばす既読スキップ、テキストを自動で送るオートプレイ、といったところでしょうか。{kl}既読スキップとオートプレイについては速度（自動で待つ時間）を調整することが可能です。{kl}これら機能を実践的サンプル１および２に導入してみましたので、試してみてください。{kp}操作方法について簡単に説明します。{kl}「ログ」ボタンがバックログ、「スキップ」が既読スキップ、「オート」がオートプレイにそれぞれ対応します。{kw}「スキップ」と「オート」はトグル動作となっています。ボタンをクリックすると凹んでオン状態、もう一度クリックすると凸に戻ってオフ状態となります。{kw}また「スキップ」ボタンは既読スキップ可能状態なら明色、そうでなければ暗色となります。{kp}既読スキップの動作を確認するには次のようにしてください。{kl}適当なところまで読み進めた後、「ロード」をクリックして「はじめから」を選びます。あるいは既読が確認できるセーブデータを選択します。既読であれば本文の色が変わるようになっていますので、「スキップ」をクリックすると既読スキップ動作が開始されます。{kl}なお、Ｆ５キーを押すなどしてリロードすると既読情報が全て失われるのでご注意ください。既読スキップが有効となるのは、プレイ途中でロードしてやり直した場合だけです。{kp}以上で、この項の説明を終わります。{kp}'
			);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// 画像：ロードと配置と選択。
		var c_image = function(chapter) {

			// 必要なオブジェクトはあらかじめ作っておく。
			var text = new OesText();
			var imgs = [];
			var i = 5;
			while (i--) {
				imgs.push(new OesImage());
			}
			var picker = new OesPicker();

			// これ以降は、chapter に行を追加する以外は原則やらないこと。

			// 章の各行を登録。
			chapter.act(function() {
				// 初期化。表示するものやサウンドは章に登録する。
				text.className = 'OesText _6';
				text.x = 0;
				text.y = 349;
				text.boxWidth = 480;
				text.boxHeight = 130;
				text.opacity = 0.85;
				for (i=0;i<imgs.length;i++) {
					imgs[i].z = 0;
					imgs[i].visible = false;
					chapter.addChild(imgs[i]);
				}
				chapter.addChild(text);
			});
			chapter.print(text,
				'画像はロード後に配置できるようになります。それでは実際にやってみます。{kp}背景をロードして表示。{kw}'
			);
			chapter.loadImage(imgs[0],'bon.jpg');
			chapter.act(function() {
				imgs[0].visible = true;
				imgs[0].render();
			});
			chapter.print(text,
				'画像１をロードして配置。{kw}'
			);
			chapter.loadImage(imgs[1],'yukata1.gif');
			chapter.act(function() {
				imgs[1].x = 100;
				imgs[1].y = 64;
				imgs[1].opacity = 0.9;
				imgs[1].visible = true;
				imgs[1].render();
			});
			chapter.print(text,
				'画像２をロードして配置。{kw}'
			);
			chapter.loadImage(imgs[2],'yukata2.gif');
			chapter.act(function() {
				imgs[2].x = 60+100;
				imgs[2].y = 64;
				imgs[2].opacity = 0.9;
				imgs[2].visible = true;
				imgs[2].render();
			});
			chapter.print(text,
				'画像３をロードして配置。{kw}'
			);
			chapter.loadImage(imgs[3],'yukata3.gif');
			chapter.act(function() {
				imgs[3].x = 120+100;
				imgs[3].y = 64;
				imgs[3].opacity = 0.9;
				imgs[3].visible = true;
				imgs[3].render();
			});
			chapter.print(text,
				'画像４をロードして配置。{kp}'
			);
			chapter.loadImage(imgs[4],'yukata4.gif');
			chapter.act(function() {
				imgs[4].x = 180+100;
				imgs[4].y = 64;
				imgs[4].opacity = 0.9;
				imgs[4].visible = true;
				imgs[4].render();
			});
			chapter.print(text,
				'このテストではロードしつつ配置しましたが、必要な画像はあらかじめロードしておくようにするのが良いと思われます。{kp}テキストや画像などの表示可能なオブジェクトは、シーンに登録した順に奥から手前へと配置されるようになっていますが、{kp}Ｚ値(CSSにおけるz-indexに相当)を操作することでその順序を変えることが可能です。{kp}現在、人物の画像は左から順に奥から手前へと位置していますが、これを左から順に手前から奥へ位置するように変えてみます。{kp}一番左、{kw}'
			);
			chapter.act(function() {
				imgs[1].z = 3;
			});
			chapter.print(text,
				'その右、{kw}'
			);
			chapter.act(function() {
				imgs[2].z = 2;
			});
			chapter.print(text,
				'その次、{kw}'
			);
			chapter.act(function() {
				imgs[3].z = 1;
			});
			chapter.print(text,
				'このように逆順になりました。{kp}'
			);
			chapter.act(function() {
				imgs[1].z = 3;
				imgs[2].z = 2;
				imgs[3].z = 1;
				imgs[4].z = 0;
			}).label = 'a';
			chapter.print(text,
				'画像そのものを選択肢にすることもできます。どれかの人物をクリックまたはタッチしてみてください。'
			);
			chapter.pick(picker,[
				{image:imgs[1], to:'a1'},
				{image:imgs[2], to:'a2'},
				{image:imgs[3], to:'a3'},
				{image:imgs[4], to:'a4'}
			]);
			chapter.print(text,
				'{np}左から１番目の画像を選択しました。{kp}'
			).label = 'a1';
			chapter.jump('b');
			chapter.print(text,
				'{np}左から２番目の画像を選択しました。{kp}'
			).label = 'a2';
			chapter.jump('b');
			chapter.print(text,
				'{np}左から３番目の画像を選択しました。{kp}'
			).label = 'a3';
			chapter.jump('b');
			chapter.print(text,
				'{np}左から４番目の画像を選択しました。{kp}'
			).label = 'a4';
			//chapter.jump('b');
			chapter.print(text,
				'ただしこの例に見られるように、選択は境界矩形で判定されるため、重なり合って配置されている場合は、奥の画像をうまく選択できないことがあります。{kp}重ならないように工夫するか、重なり順序を調整して対処します。{kp}この例では、重なり順序を以前の状態に戻すと改善します。{kp}では、画像を選択してみてください。'
			).label = 'b';
			chapter.act(function() {
				imgs[1].z = 0;
				imgs[2].z = 1;
				imgs[3].z = 2;
				imgs[4].z = 3;
			});
			chapter.pick(picker,[
				{image:imgs[1], to:'b1'},
				{image:imgs[2], to:'b2'},
				{image:imgs[3], to:'b3'},
				{image:imgs[4], to:'b4'}
			]);
			chapter.print(text,
				'{np}左から１番目の画像を選択しました。{kp}'
			).label = 'b1';
			chapter.jump('c');
			chapter.print(text,
				'{np}左から２番目の画像を選択しました。{kp}'
			).label = 'b2';
			chapter.jump('c');
			chapter.print(text,
				'{np}左から３番目の画像を選択しました。{kp}'
			).label = 'b3';
			chapter.jump('c');
			chapter.print(text,
				'{np}左から４番目の画像を選択しました。{kp}'
			).label = 'b4';
			//chapter.jump('c');
			chapter.choose(text,[
				{text:'もういちど画像選択を試す。', to:'a'},
				{text:'先へ進む。', to:'d'}
			]).label = 'c';
			chapter.print(text,
				'以上で、この項の説明を終わります。{kp}'
			).label = 'd';
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
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
			chapter.loadSound(bgm,'041'+audioExt);
			chapter.act(function() {
				bgm.loop = true;
				bgm.play();
			});
			chapter.print(text,
				'なお、このテストではロードしつつ再生しましたが、必要なサウンドはあらかじめロードしておくようにするのが良いと思われます。{kp}続いて、効果音を鳴らしてみます。{kp}'
			);
			chapter.loadSound(se,'cursor10'+audioExt);
			chapter.act(function() {
				img.addEventListener('touchend',clickse);
			});
			chapter.print(text,
				'背景をタッチまたはクリックすると再生します。{kp}以上で、この項の説明を終わります。{kp}'
			);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// Tweenアニメーション。
		var c_tween = function(chapter) {

			// 必要なオブジェクトはあらかじめ作っておく。
			var text = new OesText();
			var text2 = new OesText();
			var img = new OesImage();
			var img2 = new OesImage();
			var bgm = new OesSound();
			var waitobj = {}; // 非同期tweenの待ち用。

			// これ以降は、chapter に行を追加する以外は原則やらないこと。

			// 章の各行を登録。
			chapter.loadImage(img,'bon.jpg');
			chapter.loadImage(img2,'yukata4.gif');
			chapter.loadSound(bgm,'041'+audioExt);
			chapter.act(function() {
				// 初期化。表示するものやサウンドは章に登録する。
				text.className = 'OesText _0';
				text.boxWidth = 480;
				text.boxHeight = 480;
				text2.className = 'OesText _6';
				text2.x = 0;
				text2.y = -130; //356;
				text2.boxWidth = 480;
				text2.boxHeight = 130;
				text2.opacity = 0; //0.85;
				img.opacity = 0;
				img2.x = 480;
				img2.y = 170; //64;
				img2.opacity = 0.9;
				chapter.addChild(bgm);
				chapter.addChild(img);
				chapter.addChild(img2);
				chapter.addChild(text);
				chapter.addChild(text2);
			});
			chapter.print(text,
				'ある値を連続的に変化させて表現するのをTweenアニメーションと言います。具体的には、指定された時間内に現在値から目標値へ補間することで表現します。{kw}tl.enchant.jsプラグインを利用して実現しています。{kw}テキストや画像などの表示可能なオブジェクトだけでなく、サウンドのボリューム変化にも適用できます。{kw}それでは実際にやってみます。透明度を補間して背景をフェードインさせてみます。{kp}'
			);
			chapter.tween(
				{node:img, time:game.fps, opacity:1, easing:enchant.Easing.QUAD_EASEIN}
			);
			chapter.print(text,
				'<span class="textOutline">複数の対象値を並列に異なる補間方法でtweenすることも可能です。{kw}位置を線形補間で、透明度を放物線補間で、テキストを上から下へ登場させてみます。</span>{kp}'
			);
			chapter.tween([
				{node:text2, time:game.fps, opacity:0.85, easing:enchant.Easing.QUAD_EASEIN},
				{node:text2, time:game.fps, y:349, easing:enchant.Easing.LINEAR}
			]);
			chapter.print(text2,
				'こんな感じにtweenされます。{kp}次は、サウンドをフェードインさせてみます。{kl}'
			);
			chapter.act(function() {
				bgm.loop = true;
				bgm.volume = 0;
				bgm.play();
			});
			chapter.tween(
				{node:bgm, time:game.fps*4, volume:1, easing:enchant.Easing.QUAD_EASEIN}
			);
			chapter.print(text2,
				'{np}通常は、tweenの完了を待って次へ進みますが、待たずに非同期に行うこともできます。非同期tweenを行った場合は、あとで待ち合わせる処理を行います。{kp}それでは実際にやってみます。{kp}'
			);
			chapter.tween(
				{node:img2, time:game.fps*4, x:10, easing:enchant.Easing.LINEAR}
			,waitobj);
			chapter.print(text2,
				'{wd=2}こんな風に画像をtweenさせながら、文字を表示することが可能です。{kl}'
			);
			chapter.waitTween(waitobj);
			chapter.tween(
				{node:text2, time:game.fps*5, y:0, easing:enchant.Easing.LINEAR}
			,waitobj);
			chapter.print(text2,
				'{np}{wd=2}また、こんな感じにテキスト本体を移動させながら、文字を表示することも可能です。{kl}'
			);
			chapter.waitTween(waitobj);
			chapter.print(text2,
				'{np}最後は、テキスト、背景、サウンドを全てフェードアウトして、この項の説明を終わります。{kl}'
			);
			chapter.tween([
				{node:text2, time:game.fps*4, opacity:0, easing:enchant.Easing.QUAD_EASEOUT},
				{node:img, time:game.fps*4, opacity:0, easing:enchant.Easing.QUAD_EASEOUT},
				{node:img2, time:game.fps*4, opacity:0, easing:enchant.Easing.QUAD_EASEOUT},
				{node:bgm, time:game.fps*4, volume:0, easing:enchant.Easing.QUAD_EASEOUT}
			]);
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// フラグとセーブ/ロード。
		var c_record = function(chapter) {

			// 必要なオブジェクトはあらかじめ作っておく。
			var text = new OesText();
			var icon = new OesImage();
			var savegame = function() {
				scenario.saveRecord();
			};

			// これ以降は、chapter に行を追加する以外は原則やらないこと。

			// 章の各行を登録。
			chapter.loadImage(icon,'save.gif');
			chapter.act(function() {
				// 初期化。表示するものやサウンドは章に登録する。
				text.className = 'OesText _8';
				text.boxWidth = 480;
				text.boxHeight = 480;
				icon.className = 'saveicon';
				icon.x = 480 - icon.width;
				icon.y = 0;
				icon.z = 100; // 最も手前になるようにする。
				icon.visible = false;
				icon.addEventListener('touchend',savegame);
				chapter.addChild(text);
				chapter.addChild(icon);
			});
			chapter.resume(); // ロード後の再開をチェック。
			chapter.print(text,
				'フラグなどのセーブしたいデータは特定のオブジェクトにプロパティとしてセットすることで管理されます。{kw}そのオブジェクトをHTML5のlocalStorageに登録することでセーブを実現します。データはＰＣにローカルに保存されることになります。{kw}CCleanerなどの掃除ソフトを使用すると削除されてしまうことがあるようですので、ご注意ください。{kw}複数のセーブデータを管理することができます。デフォルトでは３個となっています。{kw}セーブあるいはロードの管理画面を呼び出す機能はノベルエンジンとは別なプラグインとして用意してありますが、独自に管理画面を作ることも可能です。{kp}'
			);
			chapter.act(function() {
				icon.visible = true;
			});
			chapter.bookmark('フラグとセーブ/ロード（始め）','a');
			chapter.print(text,
				'それでは実際に試してみましょう。<br>画面の右上にあるアイコンをクリックすると、セーブ画面に切り替わりますので、セーブを行ってみてください。セーブしたら先へ進んでください。{kp}ここでＦ５キーを押すなどしてリロードさせると、ロード画面が現れるはずですので、先ほどセーブしたデータを選んでロードを行ってください。そうすると、この章を再開します。{kp}'
			);
			chapter.act(function() {
				// resume対策。
				icon.visible = true;
			}).label = 'a';
			chapter.print(text,
				'さて、続きです。このように章の途中から再開することができます。{kp}次に、分岐したそれぞれの場合で同様に試してみましょう。{kw}以下のどちらかを選んで先へ進んでください。'
			);
			chapter.choose(text,[
				{text:'分岐１', to:'a1'},
				{text:'分岐２', to:'a2'}
			]);
			chapter.bookmark('フラグとセーブ/ロード（分岐１）','a11').label = 'a1';
			chapter.print(text,
				'分岐１が選択されました。{kl}では、画面の右上にあるアイコンをクリックしてセーブしてください。ただし、先にセーブしたデータは上書きせずに残しておいてください。{kl}ここでＦ５キーを押すなどしてリロードさせたら、「分岐１」と表示されているデータをロードして再開してください。{kp}'
			);
			chapter.act(function() {
				// resume対策。
				icon.visible = true;
			}).label = 'a11';
			chapter.print(text,
				'分岐１の続きです。分岐してもこのように再開できます。{kp}今度は、分岐２を選んだ場合を試してみてください。Ｆ５キーを押すなどしてリロードさせたら、「始め」と表示されているデータをロードして再開してください。すでに両方とも試している場合は先へ進んでください。{kp}'
			);
			chapter.jump('b');
			chapter.bookmark('フラグとセーブ/ロード（分岐２）','a12').label = 'a2';
			chapter.print(text,
				'分岐２が選択されました。{kl}では、画面の右上にあるアイコンをクリックしてセーブしてください。ただし、先にセーブしたデータは上書きせずに残しておいてください。{kl}ここでＦ５キーを押すなどしてリロードさせたら、「分岐２」と表示されているデータをロードして再開してください。{kp}'
			);
			chapter.act(function() {
				// resume対策。
				icon.visible = true;
			}).label = 'a12';
			chapter.print(text,
				'分岐２の続きです。分岐してもこのように再開できます。{kp}今度は、分岐１を選んだ場合を試してみてください。Ｆ５キーを押すなどしてリロードさせたら、「始め」と表示されているデータをロードして再開してください。すでに両方とも試している場合は先へ進んでください。{kp}'
			);
			chapter.print(text,
				'セーブは基本的に随時行うことができますが、セーブした瞬間の状況を一意に保存する機能を備えていません。{kw}代わりに節目節目に目印を設定し、次回ロード時に目印へジャンプすることでセーブ時の復帰に対応します。{kw}したがってセーブしたタイミングによっては、次回のロード時に多少巻き戻ることがあります。{kw}プレイする上で実害がない程度にこまめに目印を設定することで、あまり巻き戻り感が起きないように配慮すると良いと思われます。{kp}最後に、セーブデータを消去して、この項の説明を終わります。{kp}'
			).label = 'b';
			chapter.act(function() {
				OesRecord.deleteRecords(scenario.title);
			});
			// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
			chapter.exit('index');
		};

		// サンプル１。
		var c_sample1 = function(chapter) {
			chapter.addLine(function() {
				scenario_sample1(function() {
					chapter.nextLine();
				});
			});
			chapter.exit('index');
		};

		// サンプル２。
		var c_sample2 = function(chapter) {
			chapter.addLine(function() {
				scenario_sample2(function() {
					chapter.nextLine();
				});
			});
			chapter.exit('index');
		};

		// サンプル３。
		var c_sample3 = function(chapter) {
			chapter.addLine(function() {
				scenario_sample3(function() {
					chapter.nextLine();
				});
			});
			chapter.exit('index');
		};

		// 各章をシナリオに登録。
		scenario.addChapter('intro',c_intro);
		scenario.addChapter('index',c_index);
		scenario.addChapter('textProgress',c_textProgress);
		scenario.addChapter('textExpression',c_textExpression);
		scenario.addChapter('textChoose',c_textChoose);
		scenario.addChapter('textWindow',c_textWindow);
		scenario.addChapter('textLogSkip',c_textLogSkip);
		scenario.addChapter('image',c_image);
		scenario.addChapter('tween',c_tween);
		scenario.addChapter('sound',c_sound);
		scenario.addChapter('record',c_record);
		scenario.addChapter('sample1',c_sample1);
		scenario.addChapter('sample2',c_sample2);
		scenario.addChapter('sample3',c_sample3);

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
