enchant()

var Key_z = false;
var Key_x = false;
var Key_c = false;
var Character = -1;
var Character_X = 0;
var Flag = {};
var Stage = "最初";
var COOLTime = {c_key:0,run:0,down:0,right:0,left:0,up:0};
var Run = false;
var Pad_opacity = 1;

var SE = document.createElement("audio");
var SE2 = document.createElement("audio");

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

      var S_Input = new Entity();
      S_Input.moveTo(width/4*3,height/10);
      S_Input.width = width/4;
      S_Input.height = height/10;
      S_Input._element = document.createElement('input');
      S_Input._element.type = "text";
      S_Input._element.name = "myText";
      S_Input._element.value = "";
      S_Input._element.placeholder = "";
      scene.addChild(S_Input);

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
      var scene = new Scene();

      var i = 0;
      var Image = [];
      var Images_Data = {};

      function Images(){
        Image[i] = new Sprite();
        Image[i]._element = document.createElement("img");
        Image[i]._element.src = Datas.画像[Object.keys(Datas.画像)[i]].src;
        Image[i].width = Datas.画像[Object.keys(Datas.画像)[i]].width;
        Image[i].height = Datas.画像[Object.keys(Datas.画像)[i]].height;
        Image[i].x = Datas.画像[Object.keys(Datas.画像)[i]].x;
        Image[i].y = Datas.画像[Object.keys(Datas.画像)[i]].y;
        if(Datas.画像[Object.keys(Datas.画像)[i]].opacity!=undefined) Image[i].opacity = Datas.画像[Object.keys(Datas.画像)[i]].opacity;
        Images_Data[Object.keys(Datas.画像)[i]] = i;
        scene.addChild(Image[i]);
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
      }

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
      }
      Image[Images_Data.人].Number = "地上";
      Image[Images_Data.人].scaleX = Character;
      Image[Images_Data.人].x = Character_X;
      Image[Images_Data.人].acceleration = 0;

      var Ui_Button = [];

      function Buttons(x,y,a,i){
        Ui_Button[i] = new Button(a,"light",width/4,height/10);
        if(i==0)Ui_Button[i].moveTo(x,y);
        else{
          Ui_Button[i].moveTo(x+width,y+height);
          Ui_Button[i].opacity = 0.8;
        }
        Ui_Button[i]._style["font-size"] = height/20;
        scene.addChild(Ui_Button[i]);
        Ui_Button[i].addEventListener("touchstart",function(e){

        });
        Ui_Button[i].addEventListener("touchend",function(e){

        });
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
              Character = Value[Object.keys(Value)[i]].向き;
              Image[Images_Data.人].scaleX = Character;
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
              Character = Image[Images_Data.人].scaleX;
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

      var Z_Run = false;
      var Pe_S = 0;
      var Gravity = 9.8;
      var Jump_s = 1;
      var Friction = 10;
      if(Datas.物理){
        if(Datas.物理.重力) Gravity = Datas.物理.重力;
        if(Datas.物理.摩擦) Friction = Datas.物理.摩擦;
        if(Datas.物理.ジャンプ) Jump_s = Datas.物理.ジャンプ;
        if(Datas.物理.ジャンプ音) SE2.src = Datas.物理.ジャンプ音;
      }
      var Jump = Jump_s;
      var E_X = 0;
      var E_Y = 0;
      var E_E = null;

      scene.addEventListener("touchstart",function(e){
        Pad_opacity = 1;
        E_X = Math.floor(e.x);
        E_Y = Math.floor(e.y);
      });

      scene.addEventListener("touchend",function(e){
        E_E = ':{width:'+(Math.floor(e.x)-E_X)+',height:'+(Math.floor(e.y)-E_Y)+',x:'+E_X+',y:'+E_Y+',src:""},';
        console.log(E_E);
      });

      scene.addEventListener("enterframe",function(){
        X_B.opacity = Pad_opacity;
        C_B.opacity = Pad_opacity;
        Z_B.opacity = Pad_opacity;
        Pad1.opacity = Pad_opacity;
        for(var i = 0; i < Object.keys(COOLTime).length; i++){
          if(COOLTime[Object.keys(COOLTime)[i]] > 0) COOLTime[Object.keys(COOLTime)[i]]--;
        }
        if(Datas.接触){
          for(var i = 0; i < Object.keys(Datas.接触).length; i++){
            Touch(Image[Images_Data.人],Datas.接触[Object.keys(Datas.接触)[i]]);
          }
        }
        if(Key_c && COOLTime.c_key == 0){
          COOLTime.c_key = 5;
          if(Datas.cキー) keydown(Datas.cキー);
        }
        if(Key_x){
          if(Jump){
            Image[Images_Data.人].Number = "空中";
            if(Pe_S >= 0){
              if(SE2.src){
                if(SE2.paused) SE2.play();
                else SE2.currentTime = 0;
              }
              Jump--;
              Pe_S -= 50;
            }
          }
        }
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
              if(Datas.移動データ.上向き) Character = Datas.移動データ.上向き;
              if(Datas.移動データ.上x!=undefined) Character_X = Datas.移動データ.上x;
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

        switch(Image[Images_Data.人].Number){
          default:
            Image[Images_Data.人]._element.src = "image/pe1.png";
            break;
          case "空中":
            Image[Images_Data.人]._element.src = "image/pe4.png";
            break;
        }
        Z_Run = Key_z;
        Image[Images_Data.人].x += Image[Images_Data.人].acceleration;
        if(game.input.left == game.input.right){
          Run = false;
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
        }
        Image[Images_Data.人].y += Pe_S;
        if(Image[Images_Data.人].y < height - Image[Images_Data.人].height){
          Pe_S += Gravity;
        }
        else{
          Jump = Jump_s;
          Pe_S = 0;
          Image[Images_Data.人].y = height - Image[Images_Data.人].height;
          if(Image[Images_Data.人].Number == "空中") Image[Images_Data.人].Number = "地上";
        }
        if(game.input.down){
          if(COOLTime.down==0) console.log(Flag);
          COOLTime.down = 5;
        }
        if(game.input.up && COOLTime.up == 0){
          COOLTime.up = 5;
          if(Datas.上キー) keydown(Datas.上キー);
        }
        if(game.input.left && !game.input.right){
          switch(Image[Images_Data.人].Number){
            case "地上":
              Image[Images_Data.人].Number = 2;
              Image[Images_Data.人]._element.src = "image/pe2.png";
              break;
            case 2:
              Image[Images_Data.人].Number = "地上";
              Image[Images_Data.人]._element.src = "image/pe3.png";
              break;
          }
          Character = 1;
          Image[Images_Data.人].scaleX = 1;
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
        }
        if(game.input.right && !game.input.left){
          switch(Image[Images_Data.人].Number){
            case "地上":
              Image[Images_Data.人].Number = 2;
              Image[Images_Data.人]._element.src = "image/pe2.png";
              break;
            case 2:
              Image[Images_Data.人].Number = "地上";
              Image[Images_Data.人]._element.src = "image/pe3.png";
              break;
          }
          Character = -1;
          Image[Images_Data.人].scaleX = -1;
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
        }
        pad_keydown();
      });

      var Pad1 = new Pad("image/pad.png",500);
      Pad1.y = height-500;
      Pad1.opacity = Pad_opacity;
      scene.addChild(Pad1);

      var X_B = new Sprite();
      X_B._element = document.createElement("img");
      X_B._element.src = "image/x.png";
      X_B.width = 250;
      X_B.height = 250;
      X_B.x = width - 250;
      X_B.y = height - 500;
      X_B.opacity = Pad_opacity;
      scene.addChild(X_B);

      var C_B = new Sprite();
      C_B._element = document.createElement("img");
      C_B._element.src = "image/c.png";
      C_B.width = 250;
      C_B.height = 250;
      C_B.x = width - 250;
      C_B.y = height - 250;
      C_B.opacity = Pad_opacity;
      scene.addChild(C_B);

      var Z_B = new Sprite();
      Z_B._element = document.createElement("img");
      Z_B._element.src = "image/z.png";
      Z_B.width = 250;
      Z_B.height = 250;
      Z_B.x = width - 500;
      Z_B.y = height - 250;
      Z_B.opacity = Pad_opacity;
      scene.addChild(Z_B);

      X_B.addEventListener("touchstart",function(){
        Key_x = true;
        return;
      });

      X_B.addEventListener("touchend",function(){
        Key_x = false;
        return;
      });

      C_B.addEventListener("touchstart",function(){
        Key_c = true;
        return;
      });

      C_B.addEventListener("touchend",function(){
        Key_c = false;
        return;
      });

      Z_B.addEventListener("touchstart",function(){
        Key_z = true;
        return;
      });

      Z_B.addEventListener("touchend",function(){
        Key_z = false;
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

      Images(width,height,0,0,"image/textbox.png","背景");
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
      if(Datas[k].音) SE.src = Datas[k].音;
      if(Datas[k].フラグ){
        if(!Flag[Datas[k].フラグ]) Flag[Datas[k].フラグ] = 0;
        if(Datas[k].増加量!=undefined) Flag[Datas[k].フラグ] += Datas[k].増加量;
        if(Datas[k].固定値!=undefined) Flag[Datas[k].フラグ] = Datas[k].固定値;
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
        if(SE.src){
          if(SE.paused) SE.play();
          else SE.currentTime = 0;
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
            Key_c = false;
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
            Key_c = false;
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
          if(Datas[k].音) SE.src = Datas[k].音;
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
          if(Datas[k].セーブ){
            switch(Datas[k].セーブ){
              case "削除":
                window.localStorage.clear();
                break;
              default:
                window.localStorage.setItem("Flag",JSON.stringify(Flag));
                window.localStorage.setItem("Stage",JSON.stringify(Stage));
                window.localStorage.setItem("Character",JSON.stringify(Character));
                window.localStorage.setItem("Character_X",JSON.stringify(Character_X));
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
            if(Datas[k].向き) Character = Datas[k].向き;
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
        Image[Images_Data["選択肢"+j]].addEventListener("touchstart",function(e){
          if(this.opacity) Choice_Choice(this);
          return;
        });
        ChoiceText[j].addEventListener("touchstart",function(e){
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

      Image[Images_Data.背景].addEventListener("touchstart",function(e){
        if(!Datas[k].選択肢) Key_c = true;
        return;
      });

      Image[Images_Data.背景].addEventListener("touchend",function(e){
        Key_c = false;
        return;
      });

      return scene;
    };

    switch (HTML) {
      case "管理者":
        var Body = "書き込み" + JSON.stringify(Stage_Datas);
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
      if(window.localStorage.getItem("Flag")){
        Flag = window.localStorage.getItem("Flag");
        Flag = JSON.parse(Flag);
      }
      if(window.localStorage.getItem("Stage")){
        Stage = window.localStorage.getItem("Stage");
        Stage = JSON.parse(Stage);
      }
      if(window.localStorage.getItem("Character")){
        Character = window.localStorage.getItem("Character");
        Character = JSON.parse(Character);
      }
      if(window.localStorage.getItem("Character_X")){
        Character_X = window.localStorage.getItem("Character_X");
        Character_X = JSON.parse(Character_X);
      }
      if(!Stage_Datas[Stage]) Stage = "最初";
      game.replaceScene(Main_Scene(Stage_Datas[Stage]));
      return;
    },);
  }
  game.start();
}
