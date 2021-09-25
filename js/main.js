enchant()

var Key_z = false;
var Key_x = false;
var Key_c = false;
var Character_X = 0;
var Character_direction = "右";
var Flag = {};
var Stage = "最初";
var COOLTime = {c_key:0,run:0,down:0,right:0,left:0,up:0};
var Run = false;
var Pad_opacity = 0;

var SE1 = document.createElement("audio");
var SE2 = document.createElement("audio");
var BGM = document.createElement("audio");

BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id;
  BGM.play();
});

window.addEventListener("keydown",function(e){
  Pad_opacity = 0;
  switch(e.key){
    case "z":
      Key_z = true;
      break;
    case "x":
      Key_x = true;
      break;
    case "c":
      Key_c = true;
      break;
  }
});

window.addEventListener("keyup",function(e){
  switch(e.key){
    case "z":
      Key_z = false;
      break;
    case "x":
      Key_x = false;
      break;
    case "c":
      Key_c = false;
      break;
  }
});

function Flag_judgement(a,b,c){
  if(Flag[a]==undefined) Flag[a] = 0;
  var Judge = null;
  switch(b){
    case "=":
      if(Flag[a]==c) Judge = true;
      else Judge = false;
      break;
    case "<":
      if(Flag[a]<c) Judge = true;
      else Judge = false;
      break;
    case ">":
      if(Flag[a]>c) Judge = true;
      else Judge = false;
      break;
  }
  return(Judge);
}

function Game_load(width,height){

  var game = new Game(width,height);
  game.fps = 20;
  game.onload = function(){

    var Start_Scene = function(){
      var scene = new Scene();

      var URL = "https://script.google.com/macros/s/AKfycbzQm1rsU9qHfmOCRgPguLLifPIPc4Ip6NMbei5rX0EGu8-XfJj8/exec";
      var Options = {
        method: "POST",
        body:"text"
      };

      fetch(URL,Options).then(res => res.json()).then(result => {
        return;
      },);

      return scene;
    };
    var Main_Scene = function(Datas){

      if(!Datas){
        Datas = {画像:{}};
      }
      console.log(Datas);

      var scene = new Scene();

      var i = 0;
      var Image = [];
      var Images_Data = {};
      var Z_Run = false;
      var Pe_S = 0;
      var Rotate = 0;
      var Ground = 0;
      if(HTML=="編集") var Ground = 900;
      else var Ground = 0;
      var Gravity = 9.8;
      var Jump_s = 1;
      var Jump_power = 50;
      var Friction = 10;
      var Jump = Jump_s;
      var E_X = 0;
      var E_Y = 0;
      var E_E = null;
      if(Datas.設定){
        if(Datas.設定.BGM){
          BGM.name1 = Datas.設定.BGM;
          if(BGM.name1 != BGM.name2){
            BGM.src = BGM.name1;
            BGM.name2 = BGM.name1;
            if(BGM.src){
              if(BGM.paused) BGM.play();
              else BGM.currentTime = 0;
              if(Datas.設定.BGMED) BGM.id = Datas.設定.BGMED;
              else BGM.id = 0;
            }
          }
        }
        if(Datas.設定.地面) Ground += Datas.設定.地面;
        if(Datas.設定.回転) Rotate = Datas.設定.回転;
        if(Datas.設定.重力) Gravity = Datas.設定.重力;
        if(Datas.設定.摩擦) Friction = Datas.設定.摩擦;
        if(Datas.設定.ジャンプ) Jump_s = Datas.設定.ジャンプ;
        if(Datas.設定.ジャンプ音) SE2.src = Datas.設定.ジャンプ音;
        if(Datas.設定.ジャンプ力) Jump_power = Datas.設定.ジャンプ力;
      }

      function Images(){
        Image[i] = new Sprite();
        Image[i]._element = document.createElement("img");
        if(Object.keys(Datas.画像)[i]=="人"){
          if(Datas.人){
            if(Datas.人.左 || Datas.人.右){
              if(Datas.人.右) Image[i]._element.src = Datas.人.右[1];
              if(Datas.人.左) Image[i]._element.src = Datas.人.左[1];
            }
            else Image[i]._element.src = "image/model1.png";
          }
          else Image[i]._element.src = "image/model1.png";
        }
        else Image[i]._element.src = Datas.画像[Object.keys(Datas.画像)[i]].src;
        Image[i].width = Datas.画像[Object.keys(Datas.画像)[i]].width;
        Image[i].height = Datas.画像[Object.keys(Datas.画像)[i]].height;
        Image[i].x = Datas.画像[Object.keys(Datas.画像)[i]].x;
        Image[i].y = Datas.画像[Object.keys(Datas.画像)[i]].y;
        Image[i].name = Object.keys(Datas.画像)[i];
        if(Datas.画像[Object.keys(Datas.画像)[i]].opacity!=undefined) Image[i].opacity = Datas.画像[Object.keys(Datas.画像)[i]].opacity;
        Images_Data[Image[i].name] = i;
        scene.addChild(Image[i]);
        return;
      };

      function Character_direction_decision(){
        switch(Image[Images_Data.人].状態){
          case "空中":
            if(Character_direction == "右"){
              if(Image[Images_Data.人].空中右) Image[Images_Data.人].scaleX = 1;
              else Image[Images_Data.人].scaleX = -1;
            }
            else{
              if(Image[Images_Data.人].空中左) Image[Images_Data.人].scaleX = 1;
              else Image[Images_Data.人].scaleX = -1;
            }
            break;
          case "停止":
            if(Character_direction == "右"){
              if(Image[Images_Data.人].右) Image[Images_Data.人].scaleX = 1;
              else Image[Images_Data.人].scaleX = -1;
            }
            else{
              if(Image[Images_Data.人].左) Image[Images_Data.人].scaleX = 1;
              else Image[Images_Data.人].scaleX = -1;
            }
            break;
          default:
            if(Run||Z_Run){
              if(Character_direction == "右"){
                if(Image[Images_Data.人].走右) Image[Images_Data.人].scaleX = 1;
                else Image[Images_Data.人].scaleX = -1;
              }
              else{
                if(Image[Images_Data.人].走左) Image[Images_Data.人].scaleX = 1;
                else Image[Images_Data.人].scaleX = -1;
              }
            }
            else{
              if(Character_direction == "右"){
                if(Image[Images_Data.人].歩右) Image[Images_Data.人].scaleX = 1;
                else Image[Images_Data.人].scaleX = -1;
              }
              else{
                if(Image[Images_Data.人].歩左) Image[Images_Data.人].scaleX = 1;
                else Image[Images_Data.人].scaleX = -1;
              }
            }
            break;
        }
        return;
      }

      var Frame_wait = 0;
      var Frame_status = null;
      var Frame_wait_Number = null;

      function Frame_advance(){
        var Direction = Character_direction;
        if(Image[Images_Data.人].状態!="停止"){
          if(Image[Images_Data.人].状態=="空中"){
            Direction = "空中" + Direction;
          }
          else{
            if(Run||Z_Run) Direction = "走" + Direction;
            else Direction = "歩" + Direction;
          }
        }
        if(!Image[Images_Data.人][Direction]){
          Direction = Direction.replace(/右/g,"左");
        }
        if(!Image[Images_Data.人][Direction]){
          Direction = Direction.replace(/左/g,"右");
        }
        if(Image[Images_Data.人][Direction]){
          for(var i = 1; i < Object.keys(Image[Images_Data.人][Direction]).length + 1; i++){
            if(Frame_wait){
              if(Frame_wait==1) Image[Images_Data.人].Number = Frame_wait_Number + 2;
              Frame_wait--;
              if(Frame_wait){
                Image[Images_Data.人].Number = Frame_wait_Number;
                Image[Images_Data.人]._element.src = Image[Images_Data.人][Direction][Frame_wait_Number];
                Character_direction_decision();
                return;
              }
            }
            if(i >= Object.keys(Image[Images_Data.人][Direction]).length){
              Image[Images_Data.人].Number = 1;
              Image[Images_Data.人]._element.src = Image[Images_Data.人][Direction][1];
              Character_direction_decision();
              break;
            }
            if(Image[Images_Data.人].Number == i){
              if(Object.keys(Image[Images_Data.人][Direction]).length == i) i = 1;
              else i++;
              if(Frame_wait==0){
                if(JSON.stringify((Image[Images_Data.人][Direction][i])).match(/^\d/)){
                  Frame_wait_Number = i - 1;
                  Frame_wait = Image[Images_Data.人][Direction][i];
                }
                else{
                  Image[Images_Data.人].Number = i;
                  Image[Images_Data.人]._element.src = Image[Images_Data.人][Direction][i];
                  Character_direction_decision();
                }
              }
              break;
            }
          }
        }
        return;
      };

      function State_change(a){
        if(Frame_status!=a){
          Frame_status = a;
          Image[Images_Data.人].状態 = a;
          Frame_wait = 0;
          Image[Images_Data.人].Number = 1;
          switch(a){
            case "空中":
              if(Character_direction=="右") console.log("空中で右を向いている。");
              else console.log("空中で左を向いている。");
              break;
            case "動":
              if(Character_direction=="右") console.log("右に歩いている。");
              else console.log("左に歩いている。");
              break;
            case "走":
              if(Character_direction=="右") console.log("右に走っている。");
              else console.log("左に走っている。");
              break;
            case "停止":
              if(Character_direction=="右") console.log("右を向いている。");
              else console.log("左を向いている。");
              break;
            default:
              console.log("キャラ不明。");
              break;
          }
        }
        return;
      }

      function Touch(a,b){
        var c = Image[Images_Data[b.対象]];
        var d = true;
        if(b.フラグ){
          if(b["="]!=undefined){
            d = Flag_judgement(b.フラグ,"=",b["="]);
          }
          if(b["<"]!=undefined){
            d = Flag_judgement(b.フラグ,"<",b["<"]);
          }
          if(b[">"]!=undefined){
            d = Flag_judgement(b.フラグ,">",b[">"]);
          }
        }
        if(a.intersect(Image[Images_Data[b.接触]]) && d){
          c[b.データ] = b.真値;
        }
        else{
          c[b.データ] = b.偽値;
        }
        return;
      };

      for(var i = 0; i < Object.keys(Datas.画像).length; i++){
          if(Datas.画像[Object.keys(Datas.画像)[i]].フラグ){
            if(Datas.画像[Object.keys(Datas.画像)[i]]["="]!=undefined){
              if(Flag_judgement(Datas.画像[Object.keys(Datas.画像)[i]].フラグ,"=",Datas.画像[Object.keys(Datas.画像)[i]]["="])){
                Images();
              }
            }
            if(Datas.画像[Object.keys(Datas.画像)[i]]["<"]!=undefined){
              if(Flag_judgement(Datas.画像[Object.keys(Datas.画像)[i]].フラグ,"<",Datas.画像[Object.keys(Datas.画像)[i]]["<"])){
                Images();
              }
            }
            if(Datas.画像[Object.keys(Datas.画像)[i]][">"]!=undefined){
              if(Flag_judgement(Datas.画像[Object.keys(Datas.画像)[i]].フラグ,">",Datas.画像[Object.keys(Datas.画像)[i]][">"])){
                Images();
              }
            }
          }
          else Images();
      };

      if(Datas.画像.人){
        if(Datas.人){
          if(Datas.人.右) Image[Images_Data.人].右 = Datas.人.右;
          else Image[Images_Data.人].右 = false;
          if(Datas.人.左) Image[Images_Data.人].左 = Datas.人.左;
          else Image[Images_Data.人].左 = false;
          if(Datas.人.歩右) Image[Images_Data.人].歩右 = Datas.人.歩右;
          else Image[Images_Data.人].右 = false;
          if(Datas.人.歩左) Image[Images_Data.人].歩左 = Datas.人.歩左;
          else Image[Images_Data.人].右 = false;
          if(Datas.人.走右) Image[Images_Data.人].走右 = Datas.人.走右;
          else Image[Images_Data.人].右 = false;
          if(Datas.人.走左) Image[Images_Data.人].走左 = Datas.人.走左;
          else Image[Images_Data.人].右 = false;
          if(Datas.人.空中右) Image[Images_Data.人].空中右 = Datas.人.空中右;
          else Image[Images_Data.人].空中右 = false;
          if(Datas.人.空中左) Image[Images_Data.人].空中左 = Datas.人.空中左;
          else Image[Images_Data.人].空中左 = false;
        }
        if(!Image[Images_Data.人].左&&!Image[Images_Data.人].右){
          Image[Images_Data.人].左 = {1:"image/model1.png"};
        }
        if(!Image[Images_Data.人].歩左&&!Image[Images_Data.人].歩右){
          Image[Images_Data.人].歩左 = {
            1:"image/model2.png",
            2:"image/model3.png",
            3:"image/model4.png",
            4:"image/model5.png",
            5:"image/model6.png",
            6:"image/model7.png",
            7:"image/model8.png",
            8:"image/model7.png",
            9:"image/model6.png",
            10:"image/model5.png",
            11:"image/model4.png",
            12:"image/model3.png"
          };
        }
        if(!Image[Images_Data.人].走左&&!Image[Images_Data.人].走右){
          Image[Images_Data.人].走左 = {1:"image/model2.png",2:"image/model8.png"};
        }
        if(!Image[Images_Data.人].空中左&&!Image[Images_Data.人].空中右){
          Image[Images_Data.人].空中左 = {1:"image/model9.png"};
        }

        if(Image[Images_Data.人].y < height - Image[Images_Data.人].height - Ground){
          State_change("空中");
          Jump = Jump_s - 1;
        }
        else State_change("停止");

        Image[Images_Data.人].Number = 1;
        Image[Images_Data.人].x = Character_X;
        Image[Images_Data.人].acceleration = 0;
        Character_direction_decision();
      }

      function keydown(Value){
        var k = 1;
        var Execution = true;
        for(var i = 0; i < Object.keys(Value).length; i++){
          while(Value[Object.keys(Value)[i]][k]){
            if(Value[Object.keys(Value)[i]][k]["接触"]){
              if(!Image[Images_Data.人].intersect(Image[Images_Data[Value[Object.keys(Value)[i]][k]["接触"]]])){
                Execution = false;
                break;
              }
            }
            if(Value[Object.keys(Value)[i]][k]["フラグ"]){
              if(Value[Object.keys(Value)[i]][k]["="]!=undefined){
                Execution = Flag_judgement(Value[Object.keys(Value)[i]][k]["フラグ"],"=",Value[Object.keys(Value)[i]][k]["="]);
              }
              if(Value[Object.keys(Value)[i]][k]["<"]!=undefined){
                Execution = Flag_judgement(Value[Object.keys(Value)[i]][k]["フラグ"],"<",Value[Object.keys(Value)[i]][k]["<"]);
              }
              if(Value[Object.keys(Value)[i]][k][">"]!=undefined){
                Execution = Flag_judgement(Value[Object.keys(Value)[i]][k]["フラグ"],">",Value[Object.keys(Value)[i]][k][">"]);
              }
              if(!Execution) break;
            }
            k++;
          }
          if(Execution){
            if(Value[Object.keys(Value)[i]].対象){
              Image[Images_Data[Value[Object.keys(Value)[i]].対象]][Value[Object.keys(Value)[i]].データ] = Value[Object.keys(Value)[i]].値;
            }
            if(Value[Object.keys(Value)[i]].x!=undefined){
              Character_X = Value[Object.keys(Value)[i]].x;
              Image[Images_Data.人].x = Character_X;
            }
            if(Value[Object.keys(Value)[i]].向き){
              Character_direction = Value[Object.keys(Value)[i]].向き;
              Character_direction_decision();
            }
            if(Value[Object.keys(Value)[i]].ステージ移動){
              Stage = Value[Object.keys(Value)[i]].ステージ移動;
              Key_z = false;
              Key_x = false;
              Key_c = false;
              game.input.up = false;
              game.input.down = false;
              game.input.left = false;
              game.input.right = false;
              game.replaceScene(Main_Scene(Stage_Datas[Stage]));
              return;
            }
            if(Value[Object.keys(Value)[i]].text){
              Character_X = Image[Images_Data.人].x;
              X_B.opacity = 0;
              C_B.opacity = 0;
              Z_B.opacity = 0;
              Pad1.opacity = 0;
              Key_z = false;
              Key_x = false;
              Key_c = false;
              game.input.up = false;
              game.input.down = false;
              game.input.left = false;
              game.input.right = false;
              game.pushScene(Chat_Scene(Value[Object.keys(Value)[i]].text));
              break;
            }
          }
          k = 1;
          Execution = true;
        }
        return;
      };

      var Object_mood = false;
      var Change_object = false;

      scene.addEventListener("touchstart",function(e){
        if(Hensyu_mood){
          if(Haiti_mood){
            if(e.y > 900) return;
            Haiti_image_x = Math.floor(e.x);
            Haiti_image_y = Math.floor(e.y);
          }
        }
        else{
          Pad_opacity = 1;
          E_X = Math.floor(e.x);
          E_Y = Math.floor(e.y);
        }
      });

      scene.addEventListener("touchend",function(e){
        if(Object_mood){
          if(Change_object != Pull_down._element.value){
            Change_object = Pull_down._element.value;
            Inputs[10]._element.value = Image[Images_Data[Change_object]]._element.src;
            Inputs[11]._element.value = Image[Images_Data[Change_object]].x;
            Inputs[12]._element.value = Image[Images_Data[Change_object]].y;
            Inputs[13]._element.value = Image[Images_Data[Change_object]].width;
            Inputs[14]._element.value = Image[Images_Data[Change_object]].height;
            Inputs[15]._element.value = Image[Images_Data[Change_object]].opacity;
          }
        }
        else{
          if(Hensyu_mood){
            if(Haiti_mood&&Haiti_image_x){
              Datas.画像[Inputs[0]._element.value] = {
                width:(Math.floor(e.x)-Haiti_image_x),
                height:(Math.floor(e.y)-Haiti_image_y),
                x:Haiti_image_x,
                y:Haiti_image_y,
                src:Inputs[1]._element.value
              }
              Stage_Datas[Stage] = Datas;
              game.replaceScene(Main_Scene(Stage_Datas[Stage]));
              return;
            }
          }
          else{
            E_E = ':{width:'+(Math.floor(e.x)-E_X)+',height:'+(Math.floor(e.y)-E_Y)+',x:'+E_X+',y:'+E_Y+',src:"image/透明.png"},';
            console.log(E_E);
          }
        }
      });

      scene.addEventListener("enterframe",function(){
        if(!Hensyu_mood){
          X_B.opacity = Pad_opacity;
          C_B.opacity = Pad_opacity;
          Z_B.opacity = Pad_opacity;
          Pad1.opacity = Pad_opacity;
          for(var i = 0; i < Object.keys(COOLTime).length; i++){
            if(COOLTime[Object.keys(COOLTime)[i]] > 0) COOLTime[Object.keys(COOLTime)[i]]--;
          }
          if(Key_c && COOLTime.c_key == 0){
            COOLTime.c_key = 5;
            if(Datas.cキー) keydown(Datas.cキー);
          }
          if(Image[Images_Data.人]){
            if(Datas.接触){
              for(var i = 0; i < Object.keys(Datas.接触).length; i++){
                Touch(Image[Images_Data.人],Datas.接触[Object.keys(Datas.接触)[i]]);
              }
            }
            if(Key_x){
              if(Jump){
                State_change("空中");
                if(Pe_S >= 0){
                  if(SE2.src){
                    if(SE2.paused) SE2.play();
                    else SE2.currentTime = 0;
                  }
                  Jump--;
                  Pe_S -= Jump_power;
                }
              }
            }
            Z_Run = Key_z;
            Image[Images_Data.人].x += Image[Images_Data.人].acceleration;
            Image[Images_Data.人].y += Pe_S;
            if(Image[Images_Data.人].y < height - Image[Images_Data.人].height - Ground){
              Pe_S += Gravity;
              Image[Images_Data.人].rotation += Rotate;
            }
            else{
              Jump = Jump_s;
              Pe_S = 0;
              Image[Images_Data.人].y = height - Image[Images_Data.人].height - Ground;
              if(Image[Images_Data.人].状態 == "空中"){
                State_change("停止");
                Image[Images_Data.人].rotation = 0;
              }
            }
            if(game.input.up && COOLTime.up == 0){
              COOLTime.up = 5;
              if(Datas.上キー) keydown(Datas.上キー);
            };
            if(game.input.down){
              if(COOLTime.down==0) console.log(Flag);
              COOLTime.down = 5;
            };
            if(game.input.left == game.input.right){
              Run = false;
              Z_Run = false;
              if(Image[Images_Data.人].acceleration != 0){
                if(Image[Images_Data.人].acceleration > 0){
                  Image[Images_Data.人].acceleration -= Friction;
                  if(Image[Images_Data.人].acceleration < 0) Image[Images_Data.人].acceleration = 0;
                }
                else if(Image[Images_Data.人].acceleration < 0){
                  Image[Images_Data.人].acceleration += Friction;
                  if(Image[Images_Data.人].acceleration > 0) Image[Images_Data.人].acceleration = 0;
                }
              }
              if(Image[Images_Data.人].状態 != "空中") State_change("停止");
            };
            if(game.input.left && !game.input.right){
              if(Image[Images_Data.人].状態 != "空中") State_change("動");
              if(Datas.設定) {
                if(Datas.設定.回転) Rotate = - Datas.設定.回転;
              }
              Character_direction = "左";
              if(COOLTime.left > 0 && COOLTime.left != 4) Run = true;
              COOLTime.left = 5;
              COOLTime.right = 0;
              if(Run||Z_Run){
                Image[Images_Data.人].acceleration -= Friction * 4;
                if(Image[Images_Data.人].acceleration < -40) Image[Images_Data.人].acceleration = -40;
              }
              else{
                if(Image[Images_Data.人].acceleration > -20) Image[Images_Data.人].acceleration -= Friction;
                if(Image[Images_Data.人].acceleration < -20) Image[Images_Data.人].acceleration += Friction;
              }
            };
            if(game.input.right && !game.input.left){
              if(Image[Images_Data.人].状態 != "空中") State_change("動");
              if(Datas.設定) {
                if(Datas.設定.回転) Rotate = Datas.設定.回転;
              }
              Character_direction = "右";
              if(COOLTime.right > 0 && COOLTime.right != 4) Run = true;
              COOLTime.left = 0;
              COOLTime.right = 5;
              if(Run||Z_Run){
                Image[Images_Data.人].acceleration += Friction * 4;
                if(Image[Images_Data.人].acceleration > 40) Image[Images_Data.人].acceleration = 40;
              }
              else{
                if(Image[Images_Data.人].acceleration < 20) Image[Images_Data.人].acceleration += Friction;
                if(Image[Images_Data.人].acceleration > 20) Image[Images_Data.人].acceleration -= Friction;
              }
            };
            Frame_advance();
            if(Datas.移動データ){
              if(Datas.移動データ.右){
                if(Image[Images_Data.人].x >= 1600){
                  if(Datas.移動データ.右x) Character_X = Datas.移動データ.右x;
                  else Character_X = 0;
                  Stage = Datas.移動データ.右;
                  Key_z = false;
                  Key_x = false;
                  Key_c = false;
                  game.input.up = false;
                  game.input.down = false;
                  game.input.left = false;
                  game.input.right = false;
                  game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                }
              }
              else{
                if(Image[Images_Data.人].x > 1600 - Image[Images_Data.人].width){
                  Image[Images_Data.人].x = 1600 - Image[Images_Data.人].width;
                }
              }
              if(Datas.移動データ.左){
                if(Image[Images_Data.人].x <= -Image[Images_Data.人].width){
                  if(Datas.移動データ.左x) Character_X = Datas.移動データ.左x;
                  else Character_X = 1600-Image[Images_Data.人].width;
                  Stage = Datas.移動データ.左;
                  Key_z = false;
                  Key_x = false;
                  Key_c = false;
                  game.input.up = false;
                  game.input.down = false;
                  game.input.left = false;
                  game.input.right = false;
                  game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                }
              }
              else{
                if(Image[Images_Data.人].x < 0){
                  Image[Images_Data.人].x = 0;
                }
              }
              if(Datas.移動データ.上){
                if(Image[Images_Data.人].y <= -Image[Images_Data.人].height){
                  if(Datas.移動データ.上x!=undefined) Character_X = Datas.移動データ.上x;
                  if(Datas.移動データ.上向き) Character_direction = Datas.移動データ.上向き;
                  Stage = Datas.移動データ.上;
                  Key_z = false;
                  Key_x = false;
                  Key_c = false;
                  game.input.up = false;
                  game.input.down = false;
                  game.input.left = false;
                  game.input.right = false;
                  game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                }
              }
            }
            else{
              if(Image[Images_Data.人].x < 0){
                Image[Images_Data.人].x = 0;
              }
              if(Image[Images_Data.人].x > 1600 - Image[Images_Data.人].width){
                Image[Images_Data.人].x = 1600 - Image[Images_Data.人].width;
              }
            }
          }
          pad_keydown();
        }
      });

      var Pad1 = new Pad("image/pad.png",500);
      if(HTML == "編集") Pad1.y = height/2-500;
      else Pad1.y = height-500;
      Pad1.opacity = Pad_opacity;
      scene.addChild(Pad1);

      var X_B = new Sprite();
      X_B._element = document.createElement("img");
      X_B._element.src = "image/x.png";
      X_B.width = 250;
      X_B.height = 250;
      X_B.x = width - 250;
      X_B.y = height - 500;
      if(HTML == "編集") X_B.y = height/2-500;
      else X_B.y = height-500;
      X_B.opacity = Pad_opacity;
      scene.addChild(X_B);

      var C_B = new Sprite();
      C_B._element = document.createElement("img");
      C_B._element.src = "image/c.png";
      C_B.width = 250;
      C_B.height = 250;
      C_B.x = width - 250;
      if(HTML == "編集") C_B.y = height/2 - 250;
      else C_B.y = height - 250;
      C_B.opacity = Pad_opacity;
      scene.addChild(C_B);

      var Z_B = new Sprite();
      Z_B._element = document.createElement("img");
      Z_B._element.src = "image/z.png";
      Z_B.width = 250;
      Z_B.height = 250;
      Z_B.x = width - 500;
      if(HTML == "編集") Z_B.y = height/2 - 250;
      else Z_B.y = height - 250;
      Z_B.opacity = Pad_opacity;
      scene.addChild(Z_B);

      X_B.addEventListener("touchstart",function(){
        Key_x = true;
        X_B._element.src = "image/x_down.png";
        return;
      });

      X_B.addEventListener("touchend",function(){
        Key_x = false;
        X_B._element.src = "image/x.png";
        return;
      });

      C_B.addEventListener("touchstart",function(){
        Key_c = true;
        C_B._element.src = "image/c_down.png";
        return;
      });

      C_B.addEventListener("touchend",function(){
        Key_c = false;
        C_B._element.src = "image/c.png";
        return;
      });

      Z_B.addEventListener("touchstart",function(){
        Key_z = true;
        Z_B._element.src = "image/z_down.png";
        return;
      });

      Z_B.addEventListener("touchend",function(){
        Key_z = false;
        Z_B._element.src = "image/z.png";
        return;
      });

      function pad_keydown(){
        Pad1._element.src = "image/pad.png";
        if(game.input.up){
          Pad1.rotation = 0;
          Pad1._element.src = "image/pad_keydown.png";
        }
        if(game.input.down){
          Pad1.rotation = 180;
          Pad1._element.src = "image/pad_keydown.png";
        }
        if(game.input.right){
          Pad1.rotation = 90;
          Pad1._element.src = "image/pad_keydown.png";
        }
        if(game.input.left){
          Pad1.rotation = 270;
          Pad1._element.src = "image/pad_keydown.png";
        }
        return;
      };

      if(HTML == "編集"){

        var Ui_Button = [];
        var Haiti_mood = false;
        var Hensyu_mood = false;
        var Haiti_image_x;
        var Haiti_image_y;
        var Inputs = [];

        function Input(x,y,w,h,v,p){
          Inputs[Inputs.length] = new Entity();
          Inputs[Inputs.length-1].moveTo(x,y+900);
          Inputs[Inputs.length-1].width = w;
          Inputs[Inputs.length-1].height = h;
          Inputs[Inputs.length-1]._element = document.createElement("textarea");
          Inputs[Inputs.length-1]._style["font-size"] = 60;
          Inputs[Inputs.length-1]._element.value = v;
          Inputs[Inputs.length-1]._element.placeholder = p;
        };

        Input(width/4*0,height/10*0,width/4,height/10,"人","配置オブジェクトの名称");
        Input(width/4*1,height/10*0,width/4,height/10,"image/配置.png","配置オブジェクトの画像URL");
        Input(width/4*0,height/10*0,width/4,height/10,"","人の停止左画像");
        Input(width/4*0,height/10*1,width/4,height/10,"","人の歩き左画像");
        Input(width/4*0,height/10*2,width/4,height/10,"","人の走り左画像");
        Input(width/4*0,height/10*3,width/4,height/10,"","人の空中左画像");
        Input(width/4*1,height/10*0,width/4,height/10,"","人の停止右画像");
        Input(width/4*1,height/10*1,width/4,height/10,"","人の歩き右画像");
        Input(width/4*1,height/10*2,width/4,height/10,"","人の走り右画像");
        Input(width/4*1,height/10*3,width/4,height/10,"","人の空中右画像");
        Input(width/4*0,height/10*0,width/4,height/10,"","変更後の画像URL");
        Input(width/4*1,height/10*0,width/4,height/10,"","変更後のx座標");
        Input(width/4*1,height/10*1,width/4,height/10,"","変更後のy座標");
        Input(width/4*1,height/10*2,width/4,height/10,"","変更後の幅");
        Input(width/4*1,height/10*3,width/4,height/10,"","変更後の高さ");
        Input(width/4*1,height/10*4,width/4,height/10,"","変更後の初期透明度");
        Input(width/4*0,height/10*1,width/4,height/10,"","左への移動");
        Input(width/4*1,height/10*1,width/4,height/10,"","右への移動");
        Input(width/4*2,height/10*1,width/4,height/10,"","上への移動");
        Input(width/4*0,height/10*2,width/4,height/10,"","左への移動後のx");
        Input(width/4*1,height/10*2,width/4,height/10,"","右への移動後のx");
        Input(width/4*2,height/10*2,width/4,height/10,"","上への移動後のx");
        Input(width/4*0,height/10*3,width/4,height/10,"","左への移動後の向き");
        Input(width/4*1,height/10*3,width/4,height/10,"","右への移動後の向き");
        Input(width/4*2,height/10*3,width/4,height/10,"","上への移動後の向き");
        Input(width/4*0,height/10*1,width/4,height/10,"","BGMのURL");
        Input(width/4*1,height/10*1,width/4,height/10,"","BGMのループ開始箇所");
        Input(width/4*0,height/10*2,width/4,height/10,"","重力");
        Input(width/4*1,height/10*2,width/4,height/10,"","摩擦");
        Input(width/4*2,height/10*2,width/4,height/10,"","地面の高さ");
        Input(width/4*0,height/10*3,width/4,height/10,"","ジャンプ力");
        Input(width/4*1,height/10*3,width/4,height/10,"","ジャンプ回数");
        Input(width/4*2,height/10*3,width/4,height/10,"","ジャンプ音のURL");
        Input(width/4*3,height/10*3,width/4,height/10,"","ジャンプ時の回転角度");

        var Pull_down = new Entity();
        Pull_down.moveTo(0,height/10*1+900);
        Pull_down.width = width/4;
        Pull_down.height = height/10;
        Pull_down._element = document.createElement("select");
        Pull_down._style["font-size"] = 60;
        var Option = [];
        for (var k = 0; k < Image.length; k++){
          Option[k] = document.createElement("option");
          Option[k].text =  Image[k].name;
          Option[k].value = Image[k].name;
          Pull_down._element.appendChild(Option[k]);
        }

        function Buttons(x,y,a,i){
          Ui_Button[i] = new Button(a,"light",width/4,height/10);
          Ui_Button[i].moveTo(x,y);
          Ui_Button[i]._style["font-size"] = height/20;
          scene.addChild(Ui_Button[i]);
          Ui_Button[i].addEventListener("touchstart",function(e){
            Pad_opacity = 0;
            Hensyu_mood = true;
          });
          Ui_Button[i].addEventListener("touchstart",function(e){
            switch(this.text){
              case "物体":
                Object_mood = true;
                Ui_Button[0].opacity = 0;
                Ui_Button[1].opacity = 0;
                Ui_Button[4].opacity = 0;
                Ui_Button[0].text = "";
                Ui_Button[1].text = "";
                Ui_Button[2].text = "削除する";
                Ui_Button[3].text = "変更する";
                Ui_Button[4].text = "";
                scene.addChild(Pull_down);
                Inputs[10]._element.value = Image[Images_Data[Pull_down._element.value]]._element.src;
                scene.addChild(Inputs[10]);
                Inputs[11]._element.value = Image[Images_Data[Pull_down._element.value]].x;
                scene.addChild(Inputs[11]);
                Inputs[12]._element.value = Image[Images_Data[Pull_down._element.value]].y;
                scene.addChild(Inputs[12]);
                Inputs[13]._element.value = Image[Images_Data[Pull_down._element.value]].width;
                scene.addChild(Inputs[13]);
                Inputs[14]._element.value = Image[Images_Data[Pull_down._element.value]].height;
                scene.addChild(Inputs[14]);
                Inputs[15]._element.value = Image[Images_Data[Pull_down._element.value]].opacity;
                scene.addChild(Inputs[15]);
                break;
              case "配置":
                Haiti_mood = true;
                Ui_Button[0].opacity = 0;
                Ui_Button[1].opacity = 0;
                Ui_Button[2].opacity = 0;
                Ui_Button[3].opacity = 0;
                Ui_Button[4].opacity = 0;
                Ui_Button[0].text = "";
                Ui_Button[1].text = "";
                Ui_Button[2].text = "";
                Ui_Button[3].text = "";
                Ui_Button[4].text = "";
                scene.addChild(Inputs[0]);
                scene.addChild(Inputs[1]);
                break;
              case "保存":
                window.localStorage.setItem("ローカルステージデータ",JSON.stringify(Stage_Datas));
                var URL = "https://script.google.com/macros/s/AKfycbzQm1rsU9qHfmOCRgPguLLifPIPc4Ip6NMbei5rX0EGu8-XfJj8/exec";
                var Options = {
                  method: "POST",
                  body:"編集" + JSON.stringify(Stage_Datas)
                };
                fetch(URL,Options).then(res => res.json()).then(result => {
                  game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                  return;
                },);
                break;
              case "読み込み":
                if(window.localStorage.getItem("ローカルステージデータ")){
                  Stage_Datas = window.localStorage.getItem("ローカルステージデータ");
                  Stage_Datas = JSON.parse(Stage_Datas);
                }
                else{
                  Stage_Datas = {};
                  Stage = "最初";
                }
                game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                return;
                break;
              case "設定":
                Ui_Button[0].text = "人";
                Ui_Button[1].text = "物体";
                Ui_Button[2].text = "物理";
                Ui_Button[3].text = "戻る";
                Ui_Button[4].text = "移動";
                Ui_Button[4].opacity = 1;
                break;
              case "物理":
                Ui_Button[0].opacity = 0;
                Ui_Button[1].opacity = 0;
                Ui_Button[2].opacity = 0;
                Ui_Button[3].opacity = 1;
                Ui_Button[4].opacity = 0;
                Ui_Button[0].text = "";
                Ui_Button[1].text = "";
                Ui_Button[2].text = "";
                Ui_Button[3].text = "物理設定";
                Ui_Button[4].text = "";
                if(Datas.設定){
                  if(Datas.設定.BGM) Inputs[25]._element.value = Datas.設定.BGM;
                  if(Datas.設定.BGMED) Inputs[26]._element.value = Datas.設定.BGMED;
                  if(Datas.設定.重力) Inputs[27]._element.value = Datas.設定.重力;
                  if(Datas.設定.摩擦) Inputs[28]._element.value = Datas.設定.摩擦;
                  if(Datas.設定.地面) Inputs[29]._element.value = Datas.設定.地面;
                  if(Datas.設定.ジャンプ力) Inputs[30]._element.value = Datas.設定.ジャンプ力;
                  if(Datas.設定.ジャンプ) Inputs[31]._element.value = Datas.設定.ジャンプ;
                  if(Datas.設定.ジャンプ音) Inputs[32]._element.value = Datas.設定.ジャンプ音;
                  if(Datas.設定.回転) Inputs[33]._element.value = Datas.設定.回転;
                }
                scene.addChild(Inputs[25]);
                scene.addChild(Inputs[26]);
                scene.addChild(Inputs[27]);
                scene.addChild(Inputs[28]);
                scene.addChild(Inputs[29]);
                scene.addChild(Inputs[30]);
                scene.addChild(Inputs[31]);
                scene.addChild(Inputs[32]);
                scene.addChild(Inputs[33]);
                break;
              case "物理設定":
                Datas.設定 = {
                  BGM:Inputs[25]._element.value,
                  BGMED:Inputs[26]._element.value*1,
                  重力:Inputs[27]._element.value*1,
                  摩擦:Inputs[28]._element.value*1,
                  地面:Inputs[29]._element.value*1,
                  ジャンプ力:Inputs[30]._element.value*1,
                  ジャンプ:Inputs[31]._element.value*1,
                  ジャンプ音:Inputs[32]._element.value,
                  回転:Inputs[33]._element.value*1
                };
                if(Datas.移動データ.BGM=="") delete Datas.移動データ.BGM;
                if(Datas.移動データ.BGMED=="") delete Datas.移動データ.BGMED;
                if(Datas.移動データ.重力=="") delete Datas.移動データ.重力;
                if(Datas.移動データ.摩擦=="") delete Datas.移動データ.摩擦;
                if(Datas.移動データ.地面=="") delete Datas.移動データ.地面;
                if(Datas.移動データ.ジャンプ力="") delete Datas.移動データ.ジャンプ力;
                if(Datas.移動データ.ジャンプ=="") delete Datas.移動データ.ジャンプ;
                if(Datas.移動データ.ジャンプ音=="") delete Datas.移動データ.ジャンプ音;
                if(Datas.移動データ.回転=="") delete Datas.移動データ.回転;
                Stage_Datas[Stage] = Datas;
                game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                break;
              case "移動設定":
                Datas.移動データ = {
                  左:Inputs[16]._element.value,
                  右:Inputs[17]._element.value,
                  上:Inputs[18]._element.value,
                  左x:Inputs[19]._element.value*1,
                  右x:Inputs[20]._element.value*1,
                  上x:Inputs[21]._element.value*1,
                  左向き:Inputs[22]._element.value,
                  右向き:Inputs[23]._element.value,
                  上向き:Inputs[24]._element.value
                };
                if(Datas.移動データ.左=="") delete Datas.移動データ.左;
                if(Datas.移動データ.右=="") delete Datas.移動データ.右;
                if(Datas.移動データ.上=="") delete Datas.移動データ.上;
                if(Datas.移動データ.左x=="") delete Datas.移動データ.左x;
                if(Datas.移動データ.右x=="") delete Datas.移動データ.右x;
                if(Datas.移動データ.上x=="") delete Datas.移動データ.上x;
                if(Datas.移動データ.左向き=="") delete Datas.移動データ.左向き;
                if(Datas.移動データ.右向き=="") delete Datas.移動データ.右向き;
                if(Datas.移動データ.上向き=="") delete Datas.移動データ.上向き;
                Stage_Datas[Stage] = Datas;
                game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                break;
              case "移動":
                Ui_Button[0].opacity = 0;
                Ui_Button[1].opacity = 0;
                Ui_Button[2].opacity = 0;
                Ui_Button[3].opacity = 1;
                Ui_Button[4].opacity = 0;
                Ui_Button[0].text = "";
                Ui_Button[1].text = "";
                Ui_Button[2].text = "";
                Ui_Button[3].text = "移動設定";
                Ui_Button[4].text = "";
                scene.addChild(Inputs[16]);
                scene.addChild(Inputs[17]);
                scene.addChild(Inputs[18]);
                scene.addChild(Inputs[19]);
                scene.addChild(Inputs[20]);
                scene.addChild(Inputs[21]);
                scene.addChild(Inputs[22]);
                scene.addChild(Inputs[23]);
                scene.addChild(Inputs[24]);
                break;
              case "戻る":
                Ui_Button[0].text = "配置";
                Ui_Button[1].text = "保存";
                Ui_Button[2].text = "読み込み";
                Ui_Button[3].text = "設定";
                Ui_Button[4].text = "";
                Ui_Button[4].opacity = 0;
                break;
              case "人":
                Ui_Button[0].opacity = 0;
                Ui_Button[1].opacity = 0;
                Ui_Button[2].opacity = 0;
                Ui_Button[0].text = "";
                Ui_Button[1].text = "";
                Ui_Button[2].text = "";
                Ui_Button[3].text = "決定";
                scene.addChild(Inputs[2]);
                scene.addChild(Inputs[3]);
                scene.addChild(Inputs[4]);
                scene.addChild(Inputs[5]);
                scene.addChild(Inputs[6]);
                scene.addChild(Inputs[7]);
                scene.addChild(Inputs[8]);
                scene.addChild(Inputs[9]);
                break;
              case "決定":
                Datas.人 = {
                  左:{1:Inputs[2]._element.value},
                  歩左:{1:Inputs[3]._element.value},
                  走左:{1:Inputs[4]._element.value},
                  空中左:{1:Inputs[5]._element.value},
                  右:{1:Inputs[6]._element.value},
                  歩右:{1:Inputs[7]._element.value},
                  走右:{1:Inputs[8]._element.value},
                  空中右:{1:Inputs[9]._element.value}
                };
                Stage_Datas[Stage] = Datas;
                game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                return;
                break;
              case "変更する":
                if(Change_object){
                  Datas.画像[Change_object].src = Inputs[10]._element.value;
                  Datas.画像[Change_object].x = Inputs[11]._element.value*1;
                  Datas.画像[Change_object].y = Inputs[12]._element.value*1;
                  Datas.画像[Change_object].width = Inputs[13]._element.value*1;
                  Datas.画像[Change_object].height = Inputs[14]._element.value*1;
                  if(Inputs[15]._element.value != ""){
                    if(Inputs[15]._element.value != 1) Datas.画像[Change_object].opacity = Inputs[15]._element.value*1;
                    else delete Datas.画像[Change_object].opacity;
                  }
                  else delete Datas.画像[Change_object].opacity;
                  Stage_Datas[Stage] = Datas;
                  game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                  return;
                }
                break;
              case "削除する":
                if(Change_object){
                  delete Datas.画像[Change_object];
                  Stage_Datas[Stage] = Datas;
                  game.replaceScene(Main_Scene(Stage_Datas[Stage]));
                  return;
                }
                break;
            }
          });
        };

        Buttons(width/4*0,height/10*0 + 900,"配置",0);
        Buttons(width/4*1,height/10*0 + 900,"保存",1);
        Buttons(width/4*2,height/10*0 + 900,"読み込み",2);
        Buttons(width/4*3,height/10*0 + 900,"設定",3);
        Buttons(width/4*0,height/10*1 + 900,"",4);
        Ui_Button[4].opacity = 0;
      }

      return scene;
    };
    var Chat_Scene = function(Datas){
      var scene = new Scene();

      var i = 0;
      var Image = [];
      var Images_Data = {};
      var Cut = true;

      function Images(w,h,x,y,a,b){
        Image[i] = new Sprite();
        Image[i]._element = document.createElement("img");
        Image[i]._element.src = a;
        Image[i].width = w;
        Image[i].height = h;
        Image[i].x = x;
        Image[i].y = y;
        Image[i].name = b;
        Images_Data[b] = i;
        scene.addChild(Image[i]);
        i++;
        return;
      }

      if(Datas.image){
        while(Datas.image[i]){
          Images(Datas.image[i].width,Datas.image[i].height,Datas.image[i].x,Datas.image[i].y,Datas.image[i].src,Datas.image[i].name);
          i++;
        }
      }

      if(HTML == "編集") Images(width,height/2,0,0,"image/textbox.png","背景");
      else Images(width,height,0,0,"image/textbox.png","背景");
      Image[Images_Data.背景].opacity = 0.5;

      var Numbers = 450;

      function Texts(){
        if(i%18==0) Numbers += 62;
        Text[i] = new Sprite();
        Text[i]._element = document.createElement("innerHTML");
        Text[i]._style.font  = "60px monospace";
        Text[i]._style.color = "white";
        Text[i].x = 62 * (i%18) + 180;
        Text[i].y = Numbers;
        scene.addChild(Text[i]);
      }

      var ChoiceText = [];

      function Choice(Number){
        ChoiceText[Number] = new Sprite();
        ChoiceText[Number]._element = document.createElement("innerHTML");
        ChoiceText[Number]._style.font  = "60px monospace";
        ChoiceText[Number]._style.color = "white";
        ChoiceText[Number].x = 1000;
        ChoiceText[Number].y = 400 - Number * 90;
        ChoiceText[Number].opacity = 0;
        Images(600,80,ChoiceText[Number].x-20,ChoiceText[Number].y-10,"image/choicebox.png","選択肢"+Number);
        scene.addChild(ChoiceText[Number]);
        Image[Images_Data["選択肢"+Number]].opacity = 0;
      }

      for(var i = 0; i < 90; i++) Texts();

      for(var j = 0; j < 5; j++) Choice(j);

      var k = 1;
      if(Datas[k].音) SE1.src = Datas[k].音;
      if(Datas[k].フラグ){
        if(!Flag[Datas[k].フラグ]) Flag[Datas[k].フラグ] = 0;
        if(Datas[k].増加量!=undefined) Flag[Datas[k].フラグ] += Datas[k].増加量;
        if(Datas[k].固定値!=undefined) Flag[Datas[k].フラグ] = Datas[k].固定値;
      }
      if(Datas[k].BGM){
        BGM.name1 = Datas[k].BGM;
        if(BGM.name1 != BGM.name2){
          BGM.src = BGM.name1;
          BGM.name2 = BGM.name1;
          if(BGM.src){
            if(BGM.paused) BGM.play();
            else BGM.currentTime = 0;
            if(Datas[k].BGMED) BGM.id = Datas[k].BGMED;
            else BGM.id = 0;
          }
        }
      }
      if(Datas[k].text){
        if(Datas[k].text.indexOf(":")==-1) var Write = 1;
        else var Write = 2;
      }
      else Keydown_c();

      function Text_write(){
        while(Datas[k].text[i]=="φ") i++;
        if(Datas[k].text[i]==":") Write = 1;
        Text[i]._element.textContent = Datas[k].text[i];
        i++;
        if(Datas[k].text[i]==undefined){
          if(Datas[k].選択肢) Write = "選択肢";
          else Write = false;
          COOLTime.c_key = 5;
        }
        if(Write==2) Text_write();
        if(SE1.src){
          if(SE1.paused) SE1.play();
          else SE1.currentTime = 0;
        }
        return;
      }

      i = 0;
      var C_N = null;

      scene.addEventListener("enterframe",function(){
        for(var c = 0; c < Object.keys(COOLTime).length; c++){
          if(COOLTime[Object.keys(COOLTime)[c]] > 0) COOLTime[Object.keys(COOLTime)[c]]--;
        }
        if(Write){
          if(Write=="選択肢"){
            Key_c = false;
            i = Image.length;
            for(var j = 0; j < Object.keys(Datas[k].選択肢).length; j++){
              ChoiceText[j]._element.textContent = Datas[k].選択肢[Object.keys(Datas[k].選択肢)[j]].text;
              ChoiceText[j].Number = j;
              ChoiceText[j].opacity = 1;
              ChoiceText[j].選択 = false;
              Image[Images_Data["選択肢"+j]].Number = j;
              Image[Images_Data["選択肢"+j]].next = Datas[k].選択肢[Object.keys(Datas[k].選択肢)[j]].next;
              Image[Images_Data["選択肢"+j]].text = ChoiceText[j]._element.textContent;
              Image[Images_Data["選択肢"+j]].opacity = 0.5;
            }
            ChoiceText[j-1].選択 = true;
            ChoiceText[j-1]._element.textContent = "▶ " + ChoiceText[j-1]._element.textContent;
            Datas[k].next = Datas[k].選択肢[Object.keys(Datas[k].選択肢)[j-1]].next;
            C_N = j-1;
            Write = false;
          }
          else Text_write();
          if(Key_c && COOLTime.c_key == 0){
            COOLTime.c_key = 5;
            Write = 2;
          }
        }
        else{
          if(Datas[k].選択肢){
            if(game.input.down){
              if(COOLTime.down==0){
                if(C_N){
                  ChoiceText[C_N].選択 = false;
                  ChoiceText[C_N]._element.textContent = ChoiceText[C_N]._element.textContent.substring(2);
                  C_N--;
                  ChoiceText[C_N].選択 = true;
                  ChoiceText[C_N]._element.textContent = "▶ " + ChoiceText[C_N]._element.textContent;
                  Datas[k].next = Datas[k].選択肢[C_N+1].next;
                }
                COOLTime.down = 5;
              }
            }
            if(game.input.up){
              if(COOLTime.up==0){
                if(C_N < Object.keys(Datas[k].選択肢).length-1){
                  ChoiceText[C_N].選択 = false;
                  ChoiceText[C_N]._element.textContent = ChoiceText[C_N]._element.textContent.substring(2);
                  C_N++;
                  ChoiceText[C_N].選択 = true;
                  ChoiceText[C_N]._element.textContent = "▶ " + ChoiceText[C_N]._element.textContent;
                  Datas[k].next = Datas[k].選択肢[C_N+1].next;
                }
                COOLTime.up = 5;
              }
            }
          }
          if(Key_c && COOLTime.c_key == 0){
            COOLTime.c_key = 5;
            for(var j = 0; j < 5; j++){
              ChoiceText[j].opacity = 0;
              Image[Images_Data["選択肢"+j]].opacity = 0;
            }
            Keydown_c();
          };
        }
      });

      function Keydown_c(){
        if(Datas[k+1]||Datas[k].next){
          if(Datas[k].next) k = Datas[k].next;
          else k++;
          i = 0;
          if(Datas[k].音) SE1.src = Datas[k].音;
          if(Datas[k].image){
            while(Datas[k].image[i]){
              Image[Images_Data[Datas[k].image[i].name]]._element.src = Datas[k].image[i].src;
              i++;
            }
          }
          if(Datas[k].フラグ){
            if(!Flag[Datas[k].フラグ]) Flag[Datas[k].フラグ] = 0;
            if(Datas[k].増加量!=undefined) Flag[Datas[k].フラグ] += Datas[k].増加量;
            if(Datas[k].固定値!=undefined) Flag[Datas[k].フラグ] = Datas[k].固定値;
          }
          if(Datas[k].BGM){
            BGM.name1 = Datas[k].BGM;
            if(BGM.name1 != BGM.name2){
              BGM.src = BGM.name1;
              BGM.name2 = BGM.name1;
              if(BGM.src){
                if(BGM.paused) BGM.play();
                else BGM.currentTime = 0;
                if(Datas[k].BGMED) BGM.id = Datas[k].BGMED;
                else BGM.id = 0;
              }
            }
          }
          if(Datas[k].セーブ){
            switch(Datas[k].セーブ){
              case "削除":
                window.localStorage.clear();
                break;
              default:
                window.localStorage.setItem("Flag",JSON.stringify(Flag));
                window.localStorage.setItem("Stage",JSON.stringify(Stage));
                window.localStorage.setItem("Character_X",JSON.stringify(Character_X));
                window.localStorage.setItem("Character_direction",JSON.stringify(Character_direction));
                break;
            }
          }
          i = 0;
          for(var a = 0; a < 90; a++){
            Text[a]._element.textContent = "";
          }
          if(Datas[k].text){
            if(Datas[k].text.indexOf(":")==-1) Write = 1;
            else Write = 2;
            Text_write();
          }
          else Keydown_c();
        }
        else{
          Key_z = false;
          Key_x = false;
          Key_c = false;
          game.popScene();
          if(Datas[k].ステージ移動){
            if(Datas[k].x) Character_X = Datas[k].x;
            if(Datas[k].向き) Character_direction = Datas[k].向き;
            Stage = Datas[k].ステージ移動;
            Key_z = false;
            Key_x = false;
            Key_c = false;
            game.input.up = false;
            game.input.down = false;
            game.input.left = false;
            game.input.right = false;
            game.replaceScene(Main_Scene(Stage_Datas[Stage]));
          }
        }
        return;
      }

      for(var j = 0; j < 5; j++){
        Image[Images_Data["選択肢"+j]].addEventListener("touchend",function(e){
          if(this.opacity) Choice_Choice(this);
          return;
        });
        ChoiceText[j].addEventListener("touchend",function(e){
          if(this.opacity) Choice_Choice(Image[Images_Data["選択肢"+this.Number]]);
          return;
        });
      }

      function Choice_Choice(image){
        if(ChoiceText[image.Number].選択){
          for(var a = 0; a < 5; a++){
            ChoiceText[a].opacity = 0;
            Image[Images_Data["選択肢"+a]].opacity = 0;
          }
          Keydown_c();
        }
        else{
          for(var a = 0; a < 5; a++){
            ChoiceText[a].選択 = false;
            ChoiceText[a]._element.textContent = Image[Images_Data["選択肢"+a]].text;
          }
          C_N = image.Number;
          Datas[k].next = image.next;
          ChoiceText[image.Number].選択 = true;
          ChoiceText[image.Number]._element.textContent = "▶ " + image.text;
        }
      }

      scene.addEventListener("touchstart",function(e){
        if(!Datas[k].選択肢) Key_c = true;
        return;
      });

      scene.addEventListener("touchend",function(e){
        Key_c = false;
        return;
      });

      return scene;
    };

    if(window.localStorage.getItem("Flag")){
      Flag = window.localStorage.getItem("Flag");
      Flag = JSON.parse(Flag);
    }
    if(window.localStorage.getItem("Stage")){
      Stage = window.localStorage.getItem("Stage");
      Stage = JSON.parse(Stage);
    }
    if(window.localStorage.getItem("Character_X")){
      Character_X = window.localStorage.getItem("Character_X");
      Character_X = JSON.parse(Character_X);
    }
    if(window.localStorage.getItem("Character_direction")){
      Character_direction = window.localStorage.getItem("Character_direction");
      Character_direction = JSON.parse(Character_direction);
    }

    switch (HTML) {
      case "管理者":
        var Body = "書き込み" + JSON.stringify(Stage_Datas);
        break;
      case "編集":
        if(window.localStorage.getItem("ローカルステージデータ")){
          Stage_Datas = window.localStorage.getItem("ローカルステージデータ");
          Stage_Datas = JSON.parse(Stage_Datas);
          var Body = "編集" + JSON.stringify(Stage_Datas);
        }
        else{
          Stage_Datas = {};
          var Body = "読み込み";
        }
        break;
      default:
        Stage_Datas = {};
        var Body = "読み込み";
        break;
    }

    var URL = "https://script.google.com/macros/s/AKfycbzQm1rsU9qHfmOCRgPguLLifPIPc4Ip6NMbei5rX0EGu8-XfJj8/exec";
    var Options = {
      method: "POST",
      body:Body
    };

    fetch(URL,Options).then(res => res.json()).then(result => {
      for (var i = 0; i < result.length; i++) {
        Stage_Datas[result[i].名前] = JSON.parse(result[i].ステージ);
      }
      if(!Stage_Datas[Stage]) Stage = "最初";
      game.replaceScene(Main_Scene(Stage_Datas[Stage]));
      return;
    },);
  }
  game.start();
}
