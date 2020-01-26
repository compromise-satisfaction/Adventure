var scenario_sample3 = function(callback) {

	var game = enchant.Game.instance;

	// シナリオを作る。タイトルはセーブ／ロード時のキーとなるので名前がかぶらないように注意！
	var scenario = new OesScenario('sample3_v2');

	// セーブデータのフラグ制御。
	var getflag = function(idx) {
		var shift = idx & 31;
		idx >>= 5;
		var v = scenario.record.flags[idx] || 0;
		return (v >> shift) & 1;
	};
	var setflag = function(idx) {
		var shift = idx & 31;
		idx >>= 5;
		var v = scenario.record.flags[idx] || 0;
		scenario.record.flags[idx] = v | (1 << shift);
	};
	var clrflag = function(idx) {
		var shift = idx & 31;
		idx >>= 5;
		var v = scenario.record.flags[idx] || 0;
		scenario.record.flags[idx] = v & ~(1 << shift);
	};

	// 第１章。
	var c1 = function(chapter) {

		// 必要なオブジェクトはあらかじめ作っておく。
		var imgs = [];
		var i = 11;
		while(i--) {
			imgs.push(new OesImage());
		}
		var text = new OesText();
		var picker = new OesPicker();
		var credit = new OesLabel('');
		var button = new OesLabel('');
		var fade = new Entity();

		// 章の各行を登録。
		chapter.loadImage(imgs[0],'room.jpg');
		chapter.loadImage(imgs[1],'lcd.png');
		chapter.loadImage(imgs[2],'desk.png');
		chapter.loadImage(imgs[3],'tv.png');
		chapter.loadImage(imgs[4],'cabinet.png');
		chapter.loadImage(imgs[5],'window.png');
		chapter.loadImage(imgs[6],'sofa.png');
		chapter.loadImage(imgs[7],'door.png');
		chapter.loadImage(imgs[8],'mirror.png');
		chapter.loadImage(imgs[9],'table.png');
		chapter.loadImage(imgs[10],'bed.png');
		chapter.act(function() {
			// 初期化。表示するものやサウンドは章に登録する。
			var i,onclick;
			imgs[1].x = 195;
			imgs[1].y = 229;
			imgs[2].x = 139;
			imgs[2].y = 239;
			imgs[3].x = 235;
			imgs[3].y = 187;
			imgs[4].x = 229;
			imgs[4].y = 220;
			imgs[5].x = 0;
			imgs[5].y = 35;
			imgs[6].x = 0;
			imgs[6].y = 259;
			imgs[7].x = 405;
			imgs[7].y = 139;
			imgs[8].x = 351;
			imgs[8].y = 145;
			imgs[9].x = 153;
			imgs[9].y = 299;
			imgs[10].x = 0;
			imgs[10].y = 357;
			onclick = function() {
				// 画像をクリックしたらテキストをクリックしたことにする。
				text.dispatchEvent(new Event('touchend'));
			};
			for (i=0;i<imgs.length;i++) {
				imgs[i].addEventListener('touchend',onclick);
			}
			imgs[0].visible = true;
			text.className = 'sample3_text';
			text.boxWidth = 480;
			text.boxHeight = 59;
			text.y = 421;
			credit.text = '<a href="http://www.flickr.com/photos/uniquehotelsgroup/5692338959/" target="_blank" style="text-decoration:none"><span style="color:#ddd">Zen Deluxe Room - Vihula Manor Country Club & Spa / Unique Hotels Group</span></a>';
			credit.className = 'sample3_credit';
			credit.autoSize();
			credit.x = 480 - credit.boxWidth - 1;
			credit.y = 421 - credit.boxHeight;
			button.text = 'セーブ';
			button.className = 'sample3_button';
			button.autoSize();
			button.backgroundColor = '#f00';
			button.x = 480 - button.boxWidth;
			button.addEventListener('touchend',function() {
				scenario.saveRecord();
			});
			picker.pickClass = 'sample3_pick';
			for (i=0;i<imgs.length;i++) {
				chapter.addChild(imgs[i]);
			}
			fade.className = 'bg';
			fade.width = 480;
			fade.height = 480;
			chapter.addChild(text);
			chapter.addChild(credit);
			chapter.addChild(button);
			chapter.addChild(fade);
		});
		chapter.resume(); // ロード後の再開をチェック。
		chapter.bookmark('目覚め');
		chapter.tween([
			{node:fade, time:game.fps*3, opacity:0, easing:enchant.Easing.QUAD_EASEIN}
		]);
		chapter.act(function() {
			fade.visible = false;
		});
		chapter.print(text,
			'・・・う～ん。{kp}'
			+ '・・・ふぁ～、よく寝た。{kp}'
			+ 'ん？{kw}　おや？？{kw}　ここはいったい・・・{kl}どこだ？？？{kp}'
			+ '確か自分の部屋で寝ていたはず。{kl}こんなホテルみたいな部屋じゃないし。{kp}'
			+ 'なんなんだ、いったい・・・{kl}何が起こったんだ？{kp}'
			+ '考えていても始まらない。とにかく今は、{kp}'
		);
		chapter.bookmark('ここはどこ？');
		chapter.print(text,
			'{wt=0}<span style="color:blue">（気になる所を調べてみるか・・・）</span>'
		).label = 'loop';
		chapter.pick(picker,[
			{image:imgs[1], to:'a1'},
			{image:imgs[2], to:'a2'},
			{image:imgs[3], to:'a3'},
			{image:imgs[4], to:'a4'},
			{image:imgs[5], to:'a5'},
			{image:imgs[6], to:'a6'},
			{image:imgs[7], to:'a7'},
			{image:imgs[8], to:'a8'},
			{image:imgs[9], to:'a9'},
			{image:imgs[10], to:'a10'}
		]);

		chapter.act(function() {
			text.clear();
			if (!getflag(10)) {
				setflag(10);
				return '10'; // jump
			}
			if (!getflag(11)) {
				setflag(11);
				return '11'; // jump
			}
			return '12'; // jump
		}).label = 'a1';
		chapter.print(text,
			'液晶ディスプレイだ。{kp}'
		).label = '10';
		chapter.jump('loop');
		chapter.print(text,
			'パソコンが見当たらない。ノートＰＣ用か？{kp}'
		).label = '11';
		chapter.jump('loop');
		chapter.print(text,
			'とりあえず今は使うことはない。{kp}'
		).label = '12';
		chapter.jump('loop');

		// 上記のように煩雑な記述になってしまう場合は、
		// 以降のようにaddLine()でやった方がわかりやすいこともある。
		// ただし「行」進行を自前でやる必要があるので注意。

		chapter.addLine(function() {
			var t;
			if (!getflag(20)) {
				t = '机と椅子だ。{kp}';
				setflag(20);
			} else
			if (!getflag(21)) {
				t = '引き出しには何も入っていない。{kp}';
				setflag(21);
			} else {
				t = 'これ以上調べる必要はなさそうだ。{kp}';
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a2';
		chapter.addLine(function() {
			var t;
			if (!getflag(30)) {
				t = 'テレビだ。{kp}';
				setflag(30);
			} else
			if (!getflag(31)) {
				t = '電源入れても動かない。壊れているのか？{kp}';
				setflag(31);
			} else {
				t = '・・・やはり壊れているようだ。{kp}';
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a3';
		chapter.addLine(function() {
			var t;
			if (!getflag(40)) {
				t = 'キャビネットだ。{kp}';
				setflag(40);
			} else
			if (!getflag(41)) {
				t = '開けてみたが何もみつからない。{kp}';
				setflag(41);
			} else {
				t = '何も入っていない・・・。{kp}';
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a4';
		chapter.addLine(function() {
			var t;
			if (!getflag(50)) {
				t = '大きな窓だ。{kp}';
				setflag(50);
			} else
			if (!getflag(51)) {
				t = 'おや？　開けることが出来ない・・・一枚の大きなガラス板になっている。{kp}';
				setflag(51);
			} else {
				t = '思ったよりも厚みがある。とても丈夫で壊せそうにないな。{kp}';
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a5';
		chapter.addLine(function() {
			var t;
			if (!getflag(60)) {
				t = 'ソファーだ。{kp}';
				setflag(60);
			} else
			if (!getflag(61)) {
				t = 'クッションが２つある。その下には・・・何もない。{kp}';
				setflag(61);
			} else {
				t = 'もう調べる必要はなさそうだ。{kp}';
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a6';
		chapter.addLine(function() {
			var to = 'loop';
			var t;
			if (!getflag(70)) {
				t = 'ドアだ。{kp}';
				setflag(70);
			} else
			if (!getflag(71)) {
				t = 'ん？　開かない・・・鍵が掛かっている！{kp}';
				setflag(71);
			} else {
				if (!getflag(82)) {
					t = 'ダメだ！　やはり開かない！！{kp}';
				} else {
					t = 'そうか！　この鍵を使えば、{kl}・・・開いた！{kp}';
					to = 'out';
				}
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine(to);
			});
		}).label = 'a7';
		chapter.addLine(function() {
			var t;
			if (!getflag(80)) {
				t = '鏡だ。{kp}';
				setflag(80);
			} else {
				if (!getflag(93)) {
					if (!getflag(81)) {
						t = 'おかしい、自分の姿が映らない！？{kp}';
						setflag(81);
					} else {
						t = 'やはり映らない。いったいどうなってるんだ、この鏡は・・・。{kp}';
					}
				} else {
					if (!getflag(82)) {
						t = '鏡の裏に何かある。{kl}・・・鍵だ！{kp}';
						setflag(82);
					} else {
						t = 'この鍵はなんだろ？{kp}';
					}
				}
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a8';
		chapter.addLine(function() {
			var t;
			if (!getflag(90)) {
				t = 'テーブルだ。{kp}';
				setflag(90);
			} else
			if (!getflag(91)) {
				t = '上に置いてあるこの四角い白い板はなんだろ。{kp}';
				setflag(91);
			} else
			if (!getflag(92)) {
				t = 'おや、白い板の裏に何か書いてあるぞ。{kl}『脱出せよ』・・・なんだこれ？{kp}';
				setflag(92);
			} else {
				t = '『脱出せよ』ってことは、ここは密室ということか・・・。{kp}';
				setflag(93);
				scenario.record.caption = '密室！？'; // セーブデータの見出しだけ変える。
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a9';
		chapter.addLine(function() {
			var t;
			if (!getflag(100)) {
				t = 'ベッドだ。{kp}';
				setflag(100);
			} else
			if (!getflag(101)) {
				t = 'ふかふかだ。{kp}';
				setflag(101);
			} else {
				t = 'また、ぐっすり眠れそうだ・・・。{kp}';
			}
			text.clear();
			text.print(t,function() {
				chapter.gotoLine('loop');
			});
		}).label = 'a10';
		chapter.print(text,
			'脱出成功！{kp}'
		).label = 'out';
		chapter.act(function() {
			fade.visible = true;
		});
		chapter.tween([
			{node:fade, time:game.fps, opacity:1, easing:enchant.Easing.QUAD_EASEOUT}
		]);
		// 章を終了。登録オブジェクトはシーンから自動的に外され、サウンドは自動停止。
		chapter.exit();
	};

	// 章をシナリオに登録。
	scenario.addChapter('c1',c1);

	// シナリオ開始時やロード再開時の処理。
	scenario.onenterscenario = function() {
		var record = scenario.record;
		if (!record.flags) {
			// セーブデータにフラグが設定されてないなら初期化。
			record.flags = [];
		}
	};

	// シナリオ終了時の処理。
	scenario.onexitscenario = function() {
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
	game.onload = scenario_sample3(function(){alert('done');});
	game.start();
};
*/
