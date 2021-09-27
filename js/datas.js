var Stage_Datas = {};
var Message_Datas = {};
Message_Datas.看板 = {
  "image":{0:{name:"その1",width:1600,height:900,x:0,y:0}},
  "image":{1:{name:"その2",width:1600,height:900,x:0,y:0}},
  "image":{2:{name:"その3",width:1600,height:900,x:0,y:0}},
  "image":{3:{name:"その4",width:1600,height:900,x:0,y:0}},
  "image":{4:{name:"その5",width:1600,height:900,x:0,y:0}},
  1:{"text":"看板:φφφφφφφφφφφφφφφ操作は大丈夫みたいですね。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav",フラグ:"既読","固定値":1},
  2:{"text":"看板:φφφφφφφφφφφφφφφ左右キーを二連打する事でもφφφφφ走ることが出来ます。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  3:{"text":"看板:φφφφφφφφφφφφφφφ扉などに入るときはφφφφφφφφφ↑キーを使おうと思っています。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  4:{"text":"看板:φφφφφφφφφφφφφφφ右に行くといいでしょう。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  はい:{"text":"看板:φφφφφφφφφφφφφφφご理解感謝。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  たぶん:{"text":"看板:φφφφφφφφφφφφφφφまあ、やってりゃわかりますよ。φφφたぶん。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  オッケー:{"text":"看板:φφφφφφφφφφφφφφφ元気がいいですね。結構な事です。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  無言:{"text":"看板:φφφφφφφφφφφφφφφ…無口な方ですね。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  5:{
    text:"看板:φφφφφφφφφφφφφφφご理解いただけましたか？",
    音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav",
    選択肢:{
      1:{text:"…。",next:"無言"},
      2:{text:"いいえ",next:2},
      3:{text:"はい",next:"はい"},
      4:{text:"たぶん",next:"たぶん"},
      5:{text:"オッケー！",next:"オッケー"},
    }
  }
};
Message_Datas.看板2 = {
  1:{"text":"看板:φφφφφφφφφφφφφφφまた会いましょう。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
};
Message_Datas.海看板 = {
  1:{"text":"看板:φφφφφφφφφφφφφφφ目覚めるには浮上しろ。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
};
Message_Datas.夢看板 = {
  1:{"text":"看板:φφφφφφφφφφφφφφφよう！また会ったな！φφφφφφφφもう操作はバッチリっぽいな！","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  2:{"text":"看板:φφφφφφφφφφφφφφφ起きたきゃまた右に行くんだぜ！","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
};
Message_Datas.夢看板2 = {
  1:{"text":"看板:φφφφφφφφφφφφφφφまた来たのか。φφφφφφφφφφφちょっと寝すぎじゃね？","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"}
};
Message_Datas.表札 = {
  1:{text:"表札:φφφφφφφφφφφφφφφなんとか学園。",音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"}
};
Message_Datas.カード = {
  1:{フラグ:"カード拾い","固定値":0},
  2:{"text":"カードを10枚拾った！","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav",フラグ:"カード","増加量":10}
};
Message_Datas.カードない = {
  1:{"text":"カードが流れてきそうな空間だ。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"}
};
Message_Datas.百円 = {
  1:{text:"百円玉を見つけた！",音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav",フラグ:"所持金",増加量:100}
};
Message_Datas.ベッド = {
  1:{text:"My bed.",音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav"},
  寝:{フラグ:"カード拾い","固定値":1,next:"月",text:"寝た！",音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav","image":{0:{name:"闇",src:"image/黒.png",width:1600,height:900,x:0,y:0}}},
  月:{フラグ:"睡眠回数","増加量":1,x:820,向き:"右",ステージ移動:"月",text:"夢を見た！",音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav","image":{0:{name:"闇",src:"image/黒.png",width:1600,height:900,x:0,y:0}}},
  セーブ:{text:"セーブしました。",音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav",セーブ:"セーブ"},
  セーブ削除:{text:"既存セーブを削除しました。φφφφφゲームは続けることができます。",音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav",セーブ:"削除"},
  2:{
    text:"Do you sleep?",
    音:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav",
    選択肢:{
      1:{text:"セーブ削除",next:"セーブ削除"},
      2:{text:"セーブ",next:"セーブ"},
      3:{text:"いいえ"},
      4:{text:"はい",next:"寝"},
    }
  }
};
Message_Datas.ミミ = {
  "image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}},
  1:{"text":"ミミ:φφφφφφφφφφφφφφφ早く帰って晩御飯の支度しなきゃ…。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  2:{"text":"ミミ:φφφφφφφφφφφφφφφちょうど良かった。φφφφφφφφφお掃除当番変わってくれる？","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  3:{"text":"ミミ:φφφφφφφφφφφφφφφただ、理由もなく変わってもらうわけにいかないわね。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  5:{"text":"ミミ:φφφφφφφφφφφφφφφデッキを持ってない？φφφφφφφφじゃあ仕方ないわね。φφφφφφφφさっさと終わらせて帰るわ。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}}},
  4:{BGM:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/BGM/VS 天上院明日香.wav",BGMED:38.015,"text":"ミミ:φφφφφφφφφφφφφφφそうね、ラッシュデュエルで勝った方がお掃除当番をするっていうのはどう？","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ2.png",width:1600,height:900,x:0,y:0}}}
};
Message_Datas.ミミ2 = {
  "image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}},
  1:{"text":"ミミ:φφφφφφφφφφφφφφφ早く帰って晩御飯の支度しなきゃ…。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  2:{"text":"ミミ:φφφφφφφφφφφφφφφちょうど良かった。φφφφφφφφφお掃除当番変わってくれる？","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  3:{"text":"ミミ:φφφφφφφφφφφφφφφただ、理由もなく変わってもらうわけにいかないわね。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  4:{"text":"ミミ:φφφφφφφφφφφφφφφそうね、ラッシュデュエルで勝った方がお掃除当番をするっていうのはどう？","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ2.png",width:1600,height:900,x:0,y:0}}},
  5:{"text":"ミミ:φφφφφφφφφφφφφφφあら？カードが足りないみたいね。φφデッキは最低40枚いるわよ。φφφφこれじゃ仕方ないわね。φφφφφφφさっさと終わらせて帰るわ。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}}},
};
Message_Datas.ミミ3 = {
  "image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}},
  1:{"text":"ミミ:φφφφφφφφφφφφφφφ早く帰って晩御飯の支度しなきゃ…。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  2:{"text":"ミミ:φφφφφφφφφφφφφφφちょうど良かった。φφφφφφφφφお掃除当番変わってくれる？","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  3:{"text":"ミミ:φφφφφφφφφφφφφφφただ、理由もなく変わってもらうわけにいかないわね。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  4:{
    選択肢:{
      1:{text:"いいえ",next:"しない"},
      2:{text:"はい",next:"デュエル！"},
      3:{text:"デュエル！",next:"デュエル！"}
    },
  text:"ミミ:φφφφφφφφφφφφφφφそうね、ラッシュデュエルで勝った方がお掃除当番をするっていうのはどう？","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ2.png",width:1600,height:900,x:0,y:0}}},
  "デュエル！":{next:"負け",text:"ミミ:φφφφφφφφφφφφφφφラッシュデュエル！","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav"},
  負け:{next:"負け2",text:"負けてしまった！","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(男).wav","image":{0:{name:"ミミ",src:"image/黒.png",width:1600,height:900,x:0,y:0}}},
  負け2:{next:"負け3",text:"ミミ:φφφφφφφφφφφφφφφあたちの勝ちね。φφφφφφφφφφそれじゃ約束通り…","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}}},
  負け3:{next:"しない",text:"ミミ:φφφφφφφφφφφφφφφえ？勝った方がするって約束？φφφφ確かにそう言っちゃった気がするわね。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}}},
  しない:{"text":"ミミ:φφφφφφφφφφφφφφφそう…。じゃ仕方ないわね。φφφφφさっさと終わらせて帰るわ。","音":"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/効果音/ポポポ(女).wav","image":{0:{name:"ミミ",src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/ミミ1.png",width:1600,height:900,x:0,y:0}}},
};

var Nizinizi = {
  左:{1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/0.png"},
  空中左:{1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/8.png"},
  歩左:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/3.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/4.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/5.png",
    6:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/6.png",
    7:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/7.png",
    8:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/6.png",
    9:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/5.png",
    10:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/4.png",
    11:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/3.png",
    12:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/2.png"
  },
  走左:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/7.png"
  }
};

var Paipai = {
  右:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/3.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/4.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/5.png",
    6:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/6.png",
    7:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/7.png",
    8:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/8.png",
    9:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/9.png",
    10:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/10.png",
    11:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/11.png",
    12:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/12.png"
  },
  歩右:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/3.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/4.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/5.png",
    6:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/6.png",
    7:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/7.png",
    8:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/8.png",
    9:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/9.png",
    10:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/10.png",
    11:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/11.png",
    12:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/12.png"
  },
  走右:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/3.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/4.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/5.png",
    6:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/6.png",
    7:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/7.png",
    8:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/8.png",
    9:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/9.png",
    10:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/10.png",
    11:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/11.png",
    12:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/12.png"
  },
  空中右:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/3.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/4.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/5.png",
    6:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/6.png",
    7:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/7.png",
    8:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/8.png",
    9:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/9.png",
    10:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/10.png",
    11:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/11.png",
    12:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/その他/12.png"
  }
};

var Stick_figure = {
  左:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_3.png",
    2:50,
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_2.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_1.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_2.png",
  },
  空中右:{1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/飛ぶ棒人間.png"},
  歩左:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_3.png"
  },
  走右:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_3.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_4.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_5.png",
    6:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_6.png",
    7:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_7.png",
    8:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_8.png"
  }
};
var Stick_figure_sea = {
  左:{1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_3.png"},
  空中左:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/泳ぐ棒人間1.png",
    2:10,
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/泳ぐ棒人間2.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/泳ぐ棒人間2.png",
    5:9
  },
  歩左:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/歩く棒人間_3.png"
  },
  走右:{
    1:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_1.png",
    2:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_2.png",
    3:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_3.png",
    4:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_4.png",
    5:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_5.png",
    6:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_6.png",
    7:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_7.png",
    8:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/走る棒人間_8.png"
  }
};

var width = 1600;
var height = 900;

Stage_Datas.最初 = {
  人:Stick_figure,
  人:Paipai,
  設定:{ジャンプ:1000},
  画像:{
    操作説明:{width:450,height:450,x:0,y:0,src:"image/操作説明.png",opacity:0},
    操作説明触れる:{width:450,height:450,x:0,y:height-450},
    看板ポップ:{width:450,height:450,x:width-450,y:0,src:"image/読む.png",opacity:0},
    看板:{width:450,height:450,x:width-450,y:height-450,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/アイテム/看板.png"},
    人:{width:290/2,height:450/2,x:0,y:height-45},
    配置:{width:130,height:94,x:731,y:512,src:"image/配置.png"},
  },
  接触:{
    1:{
      接触:"看板",
      対象:"看板ポップ",
      データ:"opacity",
      真値:1,
      偽値:0
    },
    2:{
      接触:"操作説明触れる",
      対象:"操作説明",
      データ:"opacity",
      真値:1,
      偽値:0
    },
    3:{
      接触:"配置",
      対象:"人",
      データ:"地面",
      上:true,
      真値:height-513,
      偽値:0,
    },
    4:{
      接触:"配置",
      対象:"人",
      データ:"縦加速度",
      下:true,
      真値:0,
    },
    5:{
      接触:"配置",
      対象:"人",
      データ:"y",
      下:true,
      真値:512+290/2,
    },
  },
  cキー:{
    1:{
      1:{接触:"看板"},
      2:{フラグ:"睡眠回数","=":0},
      2:{フラグ:"既読","=":0},
      対象:"看板ポップ",
      データ:"opacity",
      値:0,
      text:Message_Datas.看板
    },
    2:{
      1:{接触:"看板"},
      2:{フラグ:"睡眠回数",">":3},
      対象:"看板ポップ",
      データ:"opacity",
      値:0,
      text:Message_Datas.夢看板2
    },
    3:{
      1:{接触:"看板"},
      2:{フラグ:"睡眠回数",">":0},
      対象:"看板ポップ",
      データ:"opacity",
      値:0,
      text:Message_Datas.夢看板
    },
    4:{
      1:{接触:"看板"},
      2:{フラグ:"既読",">":0},
      対象:"看板ポップ",
      データ:"opacity",
      値:0,
      text:Message_Datas.看板2
    }
  },
  移動データ:{右:"部屋",右x:700}
};
Stage_Datas.部屋 = {
  設定:{BGM:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/音/BGM/逆転姉妹.wav",BGMED:10.390},
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/2016/03/1455796171918.jpg"},
    百円:{width:221,height:120,x:40,y:693},
    ベッド:{width:680,height:320,x:531,y:418},
    人:{width:290,height:450,x:0,y:height-450},
    "？":{width:300,height:300,x:0,y:360,src:"image/？.png",opacity:0},
    調べる:{width:450,height:450,x:650,y:0,src:"image/調べる.png",opacity:0},
  },
  接触:{
    1:{
      接触:"百円",
      対象:"？",
      データ:"opacity",
      フラグ:"所持金",
      "フラグ=":0,
      真値:1,
      偽値:0
    },
    2:{
      接触:"ベッド",
      対象:"調べる",
      データ:"opacity",
      真値:1,
      偽値:0
    },
  },
  cキー:{
    1:{
      1:{接触:"百円"},
      2:{フラグ:"所持金","<":100},
      対象:"？",
      データ:"opacity",
      値:0,
      text:Message_Datas.百円
    },
    2:{
      1:{接触:"ベッド"},
      対象:"調べる",
      データ:"opacity",
      値:0,
      text:Message_Datas.ベッド
    }
  },
  人:Nizinizi,
  移動データ:{右:"玄関"}
};
Stage_Datas.玄関 = {
  設定:{地面:40},
  接触: {
    1:{接触: '階段0', 対象: '人', データ: '地面', 真値: 40},
    2:{接触: '階段1', 対象: '人', データ: '地面', 真値: 115},
    3:{接触: '階段2', 対象: '人', データ: '地面', 真値: 180},
    4:{接触: '階段3', 対象: '人', データ: '地面', 真値: 240}
  },
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/2016/07/iehaikei049.jpg"},
    人:{width:290,height:450,x:0,y:height-450},
    階段0:{width:1,height:height,x:180+290,y:0},
    階段1:{width:1,height:height,x:145,y:0},
    階段2:{width:1,height:height,x:45,y:0},
    階段3:{width:1,height:height,x:-75,y:0},
    階段:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/階段.png"}
  },
  人:Nizinizi,
  移動データ:{右:"家",右x:600,左:"部屋"}
};
Stage_Datas.家 = {
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/家01.png"},
    入口:{width:400,height:400,x:600,y:400},
    入口ポップ:{width:450,height:450,x:650,y:0,src:"image/入る.png",opacity:0},
    人:{width:290,height:450,x:0,y:height-450}
  },
  人:Nizinizi,
  接触:{
    1:{
      接触:"入口",
      対象:"入口ポップ",
      データ:"opacity",
      真値:1,
      偽値:0
    },
  },
  上キー:{
    1:{
      1:{接触:"入口"},
      対象:"入口ポップ",
      データ:"opacity",
      値:0,
      ステージ移動:"玄関",
      x:1600-295,
      向き:"左"
    }
  },
  移動データ:{右:"道",左:"森1"}
};
Stage_Datas.道 = {
  人:Nizinizi,
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/道01.png"},
    人:{width:290,height:450,x:0,y:height-450}
  },
  移動データ:{左:"家",右:"学校入口"}
};
Stage_Datas.学校入口 = {
  人:Nizinizi,
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/学校背景002.png"},
    学校名前:{width:60,height:280,x:1370,y:415},
    学校入口:{width:510,height:360,x:640,y:455},
    学校ポップ:{width:450,height:450,x:width-450,y:0,src:"image/読む.png",opacity:0},
    入口ポップ:{width:450,height:450,x:650,y:0,src:"image/入る.png",opacity:0},
    人:{width:290,height:450,x:0,y:height-450}
  },
  接触:{
    1:{
      接触:"学校入口",
      対象:"入口ポップ",
      データ:"opacity",
      真値:1,
      偽値:0
    },
    2:{
      接触:"学校名前",
      対象:"学校ポップ",
      データ:"opacity",
      真値:1,
      偽値:0
    },
  },
  上キー:{
    1:{
      1:{接触:"学校入口"},
      対象:"学校ポップ",
      データ:"opacity",
      値:0,
      ステージ移動:"学校中庭",
      x:0,
      向き:"右"
    }
  },
  cキー:{
    1:{
      1:{接触:"学校名前"},
      対象:"学校ポップ",
      データ:"opacity",
      値:0,
      text:Message_Datas.表札
    }
  },
  移動データ:{左:"道",右:"森3"}
};
Stage_Datas.学校中庭 = {
  人:Nizinizi,
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/学校背景014.png"},
    人:{width:290,height:450,x:0,y:height-450}
  },
  移動データ:{左:"学校入口",左x:760,右:"学校玄関"}
};
Stage_Datas.学校玄関 = {
  人:Nizinizi,
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/学校背景009.png"},
    人:{width:290,height:450,x:0,y:height-450}
  },
  移動データ:{左:"学校中庭",右:"学校廊下"}
};
Stage_Datas.学校廊下 = {
  人:Nizinizi,
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/学校背景047.png"},
    人:{width:290,height:450,x:0,y:height-450}
  },
  移動データ:{左:"学校玄関",右:"学校教室"}
};
Stage_Datas.学校教室 = {
  人:Nizinizi,
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/教室.png"},
    ミミポップ:{width:450,height:450,x:width-450,y:0,src:"image/話す.png",opacity:0},
    ミミ:{width:373,height:420,x:width-373,y:height-420,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/キャラ/ミミ.png"},
    人:{width:290,height:450,x:0,y:height-450}
  },
  接触:{
    1:{
      接触:"ミミ",
      対象:"ミミポップ",
      データ:"opacity",
      真値:1,
      偽値:0
    },
  },
  cキー:{
    1:{
      1:{接触:"ミミ"},
      2:{フラグ:"カード","=":0},
      対象:"ミミポップ",
      データ:"opacity",
      値:0,
      x:880,
      向き:"右",
      text:Message_Datas.ミミ
    },
    2:{
      1:{接触:"ミミ"},
      2:{フラグ:"カード","<":40},
      対象:"ミミポップ",
      データ:"opacity",
      値:0,
      x:880,
      向き:"右",
      text:Message_Datas.ミミ2
    },
    3:{
      1:{接触:"ミミ"},
      2:{フラグ:"カード",">":39},
      対象:"ミミポップ",
      データ:"opacity",
      値:0,
      x:880,
      向き:"右",
      text:Message_Datas.ミミ3
    }
  },
  移動データ:{左:"学校廊下"}
};
Stage_Datas.氷河 = {
  人:Stick_figure,
  設定:{摩擦:0.05},
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/氷河.png"},
    人:{width:295/2,height:450/2,x:0,y:height-450/2}
  },
  移動データ:{右:"海底",左:"月"}
};
Stage_Datas.月 = {
  人:Stick_figure,
  設定:{重力:2,回転:30},
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/宇宙.png"},
    カード:{width:127,height:106,x:214,y:48},
    人:{width:295/2,height:450/2,x:0,y:450/2},
    "？":{width:300,height:300,x:214,y:48,src:"image/？.png",opacity:0}
  },
  接触:{
    1:{
      接触:"カード",
      対象:"？",
      データ:"opacity",
      真値:1,
      偽値:0
    },
  },
  cキー:{
    1:{
      1:{接触:"カード"},
      2:{フラグ:"カード拾い","=":1},
      対象:"？",
      データ:"opacity",
      値:0,
      text:Message_Datas.カード
    },
    2:{
      1:{接触:"カード"},
      2:{フラグ:"カード拾い","=":0},
      対象:"？",
      データ:"opacity",
      値:0,
      text:Message_Datas.カードない
    }
  },
  移動データ:{右:"氷河",左:"海底"}
};
Stage_Datas.森1 = {
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-17.jpg"},
    人:{width:290,height:450,x:0,y:height-450},
    草:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-6.png"},
  },
  移動データ:{右:"家",左:"森2"}
};
Stage_Datas.森2 = {
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-5-1.jpg"},
    人:{width:290,height:450,x:0,y:height-450},
    草:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-6.png"},
  },
  移動データ:{右:"森1",左:"森1"}
};
Stage_Datas.森3 = {
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-17.jpg"},
    人:{width:290,height:450,x:0,y:height-450},
    草:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-6.png"},
  },
  移動データ:{右:"森4",左:"学校入口"}
};
Stage_Datas.森4 = {
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-5-1.jpg"},
    人:{width:290,height:450,x:0,y:height-450},
    草:{width:width,height:height,x:0,y:0,src:"https://nijicollage.xyz/wp-content/uploads/mori01-6.png"},
  },
  移動データ:{右:"森3",左:"森3"}
};
Stage_Datas.海底 = {
  人:Stick_figure_sea,
  設定:{重力:6,ジャンプ:100},
  画像:{
    背景:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/海底.png"},
    看板:{width:450/2,height:450/2,x:760,y:height-450/2,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/アイテム/看板.png"},
    人:{width:295/2,height:450/2,x:0,y:height-450/2},
    水:{width:width,height:height,x:0,y:0,src:"https://raw.githubusercontent.com/compromise-satisfaction/Saved/master/画像/背景/水.png"},
    看板ポップ:{width:450/2,height:450/2,x:760,y:height-450,src:"image/読む.png",opacity:0}
  },
  接触:{
    1:{
      接触:"看板",
      対象:"看板ポップ",
      データ:"opacity",
      真値:1,
      偽値:0
    },
  },
  cキー:{
    1:{
      1:{接触:"看板"},
      対象:"看板ポップ",
      データ:"opacity",
      値:0,
      text:Message_Datas.海看板
    }
  },
  移動データ:{右:"月",左:"氷河",上:"最初",上x:0,上向き:"右"}
};
