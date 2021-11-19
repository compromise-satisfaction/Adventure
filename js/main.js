enchant();

var Key_z = false;
var Key_x = false;
var Key_c = false;
var Key_s = false;
var Stage_X = 0;
var Stage_Y = 0;
var Character_X = 0;
var Character_Y = 0;
var Character_direction = "右";
var Flag = {};
var Flag_name = null;
var Chat = "最初";
var Stage = "最初";
var COOLTime = {c_key:0,s_key:0,run:0,down:0,right:0,left:0,up:0};
var Run = false;
var Change_Box = null;
var Move_box = null;
var Move_box_length = 0;

var SE1 = document.createElement("audio");
var SE2 = document.createElement("audio");
var BGM = document.createElement("audio");

BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id;
  BGM.play();
});

window.addEventListener("keydown",function(e){
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
    case "s":
      Key_s = true;
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
    case "s":
      Key_s = false;
      break;
  }
});

function Flag_judgement(Name,Condition){
  var Judge = null;
  if(Flag[Name]==undefined) Flag[Name] = 0;
  if(Condition["="]!=undefined){
    if(Flag[Name]==Condition["="]) Judge = true;
    else Judge = false;
  };
  if(Condition[">"]!=undefined){
    if(Flag[Name] > Condition[">"]) Judge = true;
    else Judge = false;
  };
  if(Condition["<"]!=undefined){
    if(Flag[Name] < Condition["<"]) Judge = true;
    else Judge = false;
  };
  return(Judge);
};

function Game_load(width,height){

  var game = new Game(width,height);
  game.fps = 20;
  game.onload = function(){

    var Map_Scene = function(Datas){

      var scene = new Scene();

      Map = [];

      for (var i = 0; i < 18; i++) {
        Map[i] = [];
        for (var j = 0; j < 21; j++) {
          Map[i][j] = 0;
        };
      };

      Map = Datas.マップ;

      var scene = new Scene();

      var Image = [];
      var Images_Data = [];
      var i = 0;

      function Images(Width,Height,X,Y,Src,Name){
        Image_count = Image.length;
        Image[Image_count] = new Sprite();
        Image[Image_count]._element = document.createElement("img");
        if(Src) Image[Image_count]._element.src = Src;
        else Image[Image_count]._element.src = "image/透明.png";
        Image[Image_count].width = Width;
        Image[Image_count].height = Height;
        Image[Image_count].x = X;
        Image[Image_count].y = Y;
        Image[Image_count].名前 = Name;
        Images_Data[Name] = Image_count;
        scene.addChild(Image[Image_count]);
        return;
      };

      var Map_X = null;
      var Map_Y = null;

      var Run = 5;
      var Move = 0;
      var Map_W = Map[0].length;
      var Map_H = Map.length;
      var Check_X = null;
      var Check_Y = null;
      var Human = {};
      var Touch = true;


      for(var I = 0; I < Object.keys(Datas.画像).length; I++){
        if(Object.keys(Datas.画像)[I]=="主人公"){
          Human.画像 = Stage_Datas[Datas.画像[Object.keys(Datas.画像)[I]]];
          Images(100,100,1600/2-50,900/2-50,false,"主人公");
          Human.向き = Character_direction;
          Human.上 = Human.画像.上;
          Human.下 = Human.画像.下;
          Human.左 = Human.画像.左;
          Human.右 = Human.画像.右;
          Human.歩上 = Human.画像.歩上;
          Human.歩下 = Human.画像.歩下;
          Human.歩左 = Human.画像.歩左;
          Human.歩右 = Human.画像.歩右;
          Human.走上 = Human.画像.走上;
          Human.走下 = Human.画像.走下;
          Human.走左 = Human.画像.走左;
          Human.走右 = Human.画像.走右;
          Human.Number = 0;
          Image[Images_Data["主人公"]]._element.src = Human[Character_direction][Human.Number];
        }
        else{
          Images(Map_W*100,Map_H*100,0,0,Datas.画像[Object.keys(Datas.画像)[I]],Object.keys(Datas.画像)[I]);
          Image[Images_Data[Object.keys(Datas.画像)[I]]].Mapx = 0;
          Image[Images_Data[Object.keys(Datas.画像)[I]]].Mapy = 0;
        };
      };

      var MAP_object = null;

      for(var I = 0; I < Map.length; I++){
        for(var J = 0; J < Map[I].length; J++){
          switch(Map[I][J]){
            case "□":
            case "動":
              Map[I][J] = "□";
              break;
            case "■":
              break;
            default:
              MAP_object = Stage_Datas[Map[I][J]];
              if(MAP_object.データタイプ=="NPC"){
                MAP_object = MAP_object.データ;
                Images(100,100,(J+8)*100-50,(I+4)*100,false,Map[I][J]);
                Image[Images_Data[Map[I][J]]].画像 = Stage_Datas[MAP_object.画像];
                Image[Images_Data[Map[I][J]]].Move = 0;
                Image[Images_Data[Map[I][J]]].Number = 0;
                Image[Images_Data[Map[I][J]]].向き = MAP_object.向き;
                Image[Images_Data[Map[I][J]]].上 = Image[Images_Data[Map[I][J]]].画像.上;
                Image[Images_Data[Map[I][J]]].下 = Image[Images_Data[Map[I][J]]].画像.下;
                Image[Images_Data[Map[I][J]]].左 = Image[Images_Data[Map[I][J]]].画像.左;
                Image[Images_Data[Map[I][J]]].右 = Image[Images_Data[Map[I][J]]].画像.右;
                Image[Images_Data[Map[I][J]]].歩上 = Image[Images_Data[Map[I][J]]].画像.歩上;
                Image[Images_Data[Map[I][J]]].歩下 = Image[Images_Data[Map[I][J]]].画像.歩下;
                Image[Images_Data[Map[I][J]]].歩左 = Image[Images_Data[Map[I][J]]].画像.歩左;
                Image[Images_Data[Map[I][J]]].歩右 = Image[Images_Data[Map[I][J]]].画像.歩右;
                if(MAP_object.動作){
                  Image[Images_Data[Map[I][J]]].moves_number = 0;
                  Image[Images_Data[Map[I][J]]].動作 = MAP_object.動作;
                  Image[Images_Data[Map[I][J]]].time = 0;
                  if(MAP_object.時間) Image[Images_Data[Map[I][J]]].times = MAP_object.時間;
                  else Image[Images_Data[Map[I][J]]].times = 10;
                };
                Image[Images_Data[Map[I][J]]].Mapx = J;
                Image[Images_Data[Map[I][J]]].Mapy = I;
                Image[Images_Data[Map[I][J]]]._element.src = Image[Images_Data[Map[I][J]]][Image[Images_Data[Map[I][J]]].向き][0];
              };
              break;
          };
        };
      };

      Map_X = Character_X;
      Map_Y = Character_Y;

      for(var i = 0; i < Image.length; i++){
        if(Image[i].名前!="主人公"){
          Image[i].x = (Image[i].Mapx + 8) * 100-50 - Map_X * 100;
          Image[i].y = (Image[i].Mapy + 4) * 100 - Map_Y * 100;
        };
      };

      var Blackout = new Sprite();
      Blackout._element = document.createElement("img");
      Blackout._element.src = "image/黒.png";
      Blackout.width = width;
      Blackout.height = height;
      Blackout.tl.fadeOut(10);
      scene.addChild(Blackout);

      scene.addEventListener("enterframe",function(){

        if(HTML=="スマホ") pad_keydown();

        if(Blackout.opacity==0){

          switch(Human.向き){
            case "上":
              Check_X = Map_X;
              Check_Y = Map_Y - 1;
              break;
            case "下":
              Check_X = Map_X;
              Check_Y = Map_Y + 1;
              break;
            case "左":
              Check_X = Map_X - 1;
              Check_Y = Map_Y;
              break;
            case "右":
              Check_X = Map_X + 1;
              Check_Y = Map_Y;
              break;
          };

          for(var i = 0; i < Image.length; i++){
            if(Image[i].name!="主人公"){
              switch(Human.向き){
                case "上":
                  Image[i].x = (Image[i].Mapx + 8) * 100-50 - Map_X * 100;
                  Image[i].y = (Image[i].Mapy + 4) * 100 - Map_Y * 100 - Move;
                  break;
                case "下":
                  Image[i].x = (Image[i].Mapx + 8) * 100-50 - Map_X * 100;
                  Image[i].y = (Image[i].Mapy + 4) * 100 - Map_Y * 100 + Move;
                  break;
                case "左":
                  Image[i].x = (Image[i].Mapx + 8) * 100-50 - Map_X * 100 - Move;
                  Image[i].y = (Image[i].Mapy + 4) * 100 - Map_Y * 100;
                  break;
                case "右":
                  Image[i].x = (Image[i].Mapx + 8) * 100-50 - Map_X * 100 + Move;
                  Image[i].y = (Image[i].Mapy + 4) * 100 - Map_Y * 100;
                  break;
              };
              if(Image[i].向き){
                switch(Image[i].向き){
                  case "上":
                    Image[i].y += Image[i].Move;
                    break;
                  case "下":
                    Image[i].y -= Image[i].Move;
                    break;
                  case "左":
                    Image[i].x += Image[i].Move;
                    break;
                  case "右":
                    Image[i].x -= Image[i].Move;
                    break;
                };
                Image[i].Number++;
                if(Image[i].Move){
                  if(Image[i].Number >= Image[i]["歩" + Image[i].向き].length) Image[i].Number = 0;
                  Image[i]._element.src = Image[i]["歩" + Image[i].向き][Image[i].Number];
                }
                else{
                  if(Image[i].Number >= Image[i][Image[i].向き].length) Image[i].Number = 0;
                  Image[i]._element.src = Image[i][Image[i].向き][Image[i].Number];
                };
              };
            };
          };

          if(!Move&&!Touch){
            if(Map[Map_Y][Map_X]!="□"){
              if(Stage_Datas[Map[Map_Y][Map_X]].データタイプ=="接触判定"){
                if(Stage_Datas[Map[Map_Y][Map_X]].フラグ判断){
                  for(var I = 0; I < Object.keys(Stage_Datas[Map[Map_Y][Map_X]].フラグ判断).length; I++){
                    Flag_name = Object.keys(Stage_Datas[Map[Map_Y][Map_X]].フラグ判断)[I];
                    Flag_name = Flag_judgement(Flag_name,Stage_Datas[Map[Map_Y][Map_X]].フラグ判断[Flag_name]);
                    if(!Flag_name) break;
                  };
                };
                Touch = true;
                if(I==Object.keys(Stage_Datas[Map[Map_Y][Map_X]].フラグ判断).length){
                  game.input.up = false;
                  game.input.down = false;
                  game.input.left = false;
                  game.input.right = false;
                  Scene_Check_Scene(Stage_Datas[Stage_Datas[Map[Map_Y][Map_X]].データ]);
                };
              };
            };
          };

          Human.Number++;
          if(Move){
            if(Key_z){
              if(Human.Number >= Human["走" + Human.向き].length) Human.Number = 0;
              Image[Images_Data["主人公"]]._element.src = Human["走" + Human.向き][Human.Number];
            }
            else{
              if(Human.Number >= Human["歩" + Human.向き].length) Human.Number = 0;
              Image[Images_Data["主人公"]]._element.src = Human["歩" + Human.向き][Human.Number];
            };
          }
          else{
            if(Human.Number >= Human[Human.向き].length) Human.Number = 0;
            Image[Images_Data["主人公"]]._element.src = Human[Human.向き][Human.Number];
          };

          if(Key_c){
            if(!Move){
              if(Check_X < Map[0].length && Check_Y < Map.length && Check_X >= 0 && Check_Y >= 0 ){
                if(Map[Check_Y][Check_X]!="■"&&Map[Check_Y][Check_X]!="□"&&Map[Check_Y][Check_X]!="動"){
                  MAP_object = Stage_Datas[Map[Check_Y][Check_X]];
                  switch(MAP_object.データタイプ){
                    case "NPC":
                      if(MAP_object.データ.会話&&!Image[Images_Data[Map[Check_Y][Check_X]]].Move&&!Image[Images_Data[Map[Check_Y][Check_X]]].stop){
                        switch(Human.向き){
                          case "上":
                            Image[Images_Data[Map[Check_Y][Check_X]]].向き = "下";
                            Image[Images_Data[Map[Check_Y][Check_X]]]._element.src = Image[Images_Data[Map[Check_Y][Check_X]]]["下"][0];
                            break;
                          case "下":
                            Image[Images_Data[Map[Check_Y][Check_X]]].向き = "上";
                            Image[Images_Data[Map[Check_Y][Check_X]]]._element.src = Image[Images_Data[Map[Check_Y][Check_X]]]["上"][0];
                            break;
                          case "左":
                            Image[Images_Data[Map[Check_Y][Check_X]]].向き = "右";
                            Image[Images_Data[Map[Check_Y][Check_X]]]._element.src = Image[Images_Data[Map[Check_Y][Check_X]]]["右"][0];
                            break;
                          case "右":
                            Image[Images_Data[Map[Check_Y][Check_X]]].向き = "左";
                            Image[Images_Data[Map[Check_Y][Check_X]]]._element.src = Image[Images_Data[Map[Check_Y][Check_X]]]["左"][0];
                            break;
                          };
                        Image[Images_Data[Map[Check_Y][Check_X]]].stop = 2;
                        Scene_Check_Scene(Stage_Datas[MAP_object.データ.会話]);
                      };
                      break;
                  };
                };
              }
              else console.log("マップ外");
            };
          };

          for(var i = 0; i < Image.length; i++){
            if(Image[i].Move){
              Image[i].Move -= 10;
              if(!Image[i].Move){
                Map[Image[i].Beforey][Image[i].Beforex] = "□";
              };
            };
          };

          if(Move){
            if(Key_z) Move -= 25;
            else Move -= 10;
            if(Move < 0) Move = 0;
          };

          if(Key_x){
            console.log(JSON.stringify(Map));
            if(Map[Map_Y][Map_X]!="■"){
              /*
              Images(100,100,(Map_X+8)*100-50,(Map_Y+4)*100,"image/配置.png","■");
              Image[Images_Data["■"]].Mapx = Map_X;
              Image[Images_Data["■"]].Mapy = Map_Y;
              Map[Map_Y][Map_X] = "■";
              */
            };
          };

          if(Move_box){
            for (var i = 0; i < Move_box.length; i++) {
              if(Move_box[i][0]=="人"){
                if(Move_human(Move_box[i][1],true)){
                  Move_box = null;
                  break;
                };
              };
            }
          }
          else{
            if(game.input.up&&!game.input.down&&!game.input.left&&!game.input.right) Move_human("上");
            if(!game.input.up&&game.input.down&&!game.input.left&&!game.input.right) Move_human("下");
            if(!game.input.up&&!game.input.down&&game.input.left&&!game.input.right) Move_human("左");
            if(!game.input.up&&!game.input.down&&!game.input.left&&game.input.right) Move_human("右");
          };

          for(var i = 0; i < Image.length; i++){
            if(Image[i].動作){
              Image[i].time++;
              if(Image[i].times==Image[i].time){
                Image[i].time = 0;
                Image[i].moves_number++;
                if(Image[i].moves_number >= Image[i].動作.length) Image[i].moves_number = 0;
                Move_Object(Image[i],Image[i].動作[Image[i].moves_number]);
              };
            };
          };
        };
      });

      function Move_human(Direction,Automatic){
        if(Move) return;
        if(!Touch&&Map[Map_Y][Map_X]!="□"){
          if(Stage_Datas[Map[Map_Y][Map_X]].データタイプ=="接触判定") return;
        };
        Move = 100;
        if(!Automatic){
          if(Human.向き!=Direction){
            Move = 0;
            Human.向き = Direction;
            Human.Number = 0;
            Image[Images_Data["主人公"]]._element.src = Human[Direction][Human.Number];
            return;
          };
          if(Map[Check_Y][Check_X]!="□"){
            if(Map[Check_Y][Check_X]=="動"||Map[Check_Y][Check_X]=="■"){
              Move = 0;
              return;
            }
            else if(Stage_Datas[Map[Check_Y][Check_X]].データタイプ!="接触判定"){
              Move = 0;
              return;
            };
          };
        }
        else{
          Human.向き = Direction;
          Move_box_length++;
        };
        Touch = false;
        switch(Direction){
          case "上":
            Map_Y--;
            break;
          case "下":
            Map_Y++;
            break;
          case "左":
            Map_X--;
            break;
          case "右":
            Map_X++;
            break;
        };
        if(Automatic) if(Move_box_length==Move_box.length) return(true);
        return(false);
      };

      function Move_Object(Object,Direction){
        if(Object.stop){
          Object.stop--;
          return;
        };
        if(Direction=="ランダム"){
          switch(Math.floor(Math.random()*8)){
            case 0:
              Direction = "上";
              break;
            case 1:
              Direction = "下";
              break;
            case 2:
              Direction = "左";
              break;
            case 3:
              Direction = "右";
              break;
            case 4:
              Direction = "上を向く";
              break;
            case 5:
              Direction = "下を向く";
              break;
            case 6:
              Direction = "左を向く";
              break;
            case 7:
              Direction = "右を向く";
              break;
          };
        };
        if(Direction=="ランダムに向く"){
          switch(Math.floor(Math.random()*4)){
            case 0:
              Direction = "上を向く";
              break;
            case 1:
              Direction = "下を向く";
              break;
            case 2:
              Direction = "左を向く";
              break;
            case 3:
              Direction = "右を向く";
              break;
          };
        };
        if(Direction=="ランダムに動く"){
          switch(Math.floor(Math.random()*4)){
            case 0:
              Direction = "上";
              break;
            case 1:
              Direction = "下";
              break;
            case 2:
              Direction = "左";
              break;
            case 3:
              Direction = "右";
              break;
          };
        };
        if(Direction=="近づく"){
          if(Map_X==Object.Check_X){
            if(Map_Y > Object.Check_Y) Direction = "下";
            else Direction = "上";
          }
          else{
            if(Map_X > Object.Check_X) Direction = "右";
            else Direction = "左";
          };

        };
        if(Object.Move) return;
        Object.Move = 100;
        if(Direction.substring(1)=="を向く"){
          Object.向き = Direction.substring(0,1);
          Object.Move = 0;
          Object.Number = 0;
          Object._element.src = Object[Direction.substring(0,1)][Object.Number];
          return;
        };
        Object.向き = Direction;
        switch(Direction){
          case "上":
            Object.Check_X = Object.Mapx;
            Object.Check_Y = Object.Mapy - 1;
            break;
          case "下":
            Object.Check_X = Object.Mapx;
            Object.Check_Y = Object.Mapy + 1;
            break;
          case "左":
            Object.Check_X = Object.Mapx - 1;
            Object.Check_Y = Object.Mapy;
            break;
          case "右":
            Object.Check_X = Object.Mapx + 1;
            Object.Check_Y = Object.Mapy;
            break;
        };
        if(Map[Object.Check_Y][Object.Check_X]!="□"||(Map_X==Object.Check_X&&Map_Y==Object.Check_Y)){
          Object.Move = 0;
          return;
        };

        Map[Object.Check_Y][Object.Check_X] = Map[Object.Mapy][Object.Mapx];
        Map[Object.Mapy][Object.Mapx] = "動";
        Object.Beforex = Object.Mapx;
        Object.Beforey = Object.Mapy;
        Object.Mapx = Object.Check_X;
        Object.Mapy = Object.Check_Y;

        return;
      };

      if(HTML=="スマホ"){

        Images(width,height/2,0,height/2,"image/白.png","白");

        var Pad1 = new Pad("image/pad.png",500);
        Pad1.y = height-500;
        scene.addChild(Pad1);

        var X_B = new Sprite();
        X_B._element = document.createElement("img");
        X_B.width = 250;
        X_B.height = 250;
        X_B.x = width - 250;
        X_B.y = height - 500;
        scene.addChild(X_B);

        var C_B = new Sprite();
        C_B._element = document.createElement("img");
        C_B.width = 250;
        C_B.height = 250;
        C_B.x = width - 250;
        C_B.y = height - 250;
        scene.addChild(C_B);

        var Z_B = new Sprite();
        Z_B._element = document.createElement("img");
        Z_B.width = 250;
        Z_B.height = 250;
        Z_B.x = width - 500;
        Z_B.y = height - 250;
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
          if(game.input.up&&!game.input.down&&!game.input.left&&!game.input.right){
            Pad1.rotation = 0;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(!game.input.up&&game.input.down&&!game.input.left&&!game.input.right){
            Pad1.rotation = 180;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(!game.input.up&&!game.input.down&&game.input.left&&!game.input.right){
            Pad1.rotation = 270;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(!game.input.up&&!game.input.down&&!game.input.left&&game.input.right){
            Pad1.rotation = 90;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(Key_z) Z_B._element.src = "image/z_down.png";
          else Z_B._element.src = "image/z.png";
          if(Key_x) X_B._element.src = "image/x_down.png";
          else X_B._element.src = "image/x.png";
          if(Key_c) C_B._element.src = "image/c_down.png";
          else C_B._element.src = "image/c.png";
          return;
        };

      };

      return scene;
    };
    var Chat_Scene = function(Datas){

      var scene = new Scene();

      if(!Datas) Datas = {text:"存在しないデータ。"};
      if(Change_Box){
      for (var i = 0; i < Change_Box.length; i++) {
          var Reg = new RegExp(Change_Box[i][0],"g");
          Datas = JSON.stringify(Datas);
          Datas = Datas.replace(Reg,Change_Box[i][1]);
          Datas = JSON.parse(Datas);
        };
      };

      var Image_count = null;
      var Image = [];
      var Images_Data = {};

      function Images(Width,Height,X,Y,Src,Name){
        Image_count = Image.length;
        Image[Image_count] = new Sprite();
        Image[Image_count]._element = document.createElement("img");
        if(Src) Image[Image_count]._element.src = Src;
        else Image[Image_count]._element.src = "image/透明.png";
        Image[Image_count].width = Width;
        Image[Image_count].height = Height;
        Image[Image_count].x = X;
        Image[Image_count].y = Y;
        Image[Image_count].名前 = Name;
        Images_Data[Name] = Image_count;
        scene.addChild(Image[Image_count]);
        return;
      };


      if(Datas.画像){
        var Image_keys = null;
        for(var I = 0; I < Object.keys(Datas.画像).length; I++){
          Image_keys = Object.keys(Datas.画像)[I];
          Images(width,height,0,0,false,Image_keys);
          if(Datas.画像[Image_keys].x) Image[Images_Data[Image_keys]].x = Datas.画像[Image_keys].x;
          if(Datas.画像[Image_keys].y) Image[Images_Data[Image_keys]].y = Datas.画像[Image_keys].y;
          if(Datas.画像[Image_keys].width) Image[Images_Data[Image_keys]].width = Datas.画像[Image_keys].width;
          if(Datas.画像[Image_keys].height) Image[Images_Data[Image_keys]].height = Datas.画像[Image_keys].height;
          if(Datas.画像[Image_keys].src) Image[Images_Data[Image_keys]]._element.src = Datas.画像[Image_keys].src;
        };
      };

      //Images(width,height,0,0,false,"背景");
      Images(width,400,0,480,"image/textbox.png","テキストボックス");
      Image[Images_Data.テキストボックス].opacity = 0.5;

      var Numbers = 430;
      var Row = 6;
      var One_column = 20;

      function Texts(){
        if(I%One_column==0) Numbers += 62;
        Text[I] = new Sprite();
        Text[I]._element = document.createElement("innerHTML");
        Text[I]._style.font  = "60px monospace";
        Text[I]._style.color = "white";
        Text[I].x = 62 * (I%One_column) + 180;
        Text[I].y = Numbers;
        scene.addChild(Text[I]);
      };

      var ChoiceText = [];

      function Choice(){
        ChoiceText[I] = new Sprite();
        ChoiceText[I]._element = document.createElement("innerHTML");
        ChoiceText[I]._style.font  = "60px monospace";
        ChoiceText[I]._style.color = "white";
        ChoiceText[I].x = 1000;
        ChoiceText[I].y = 400 - I * 90;
        ChoiceText[I].opacity = 0;
        Images(600,80,ChoiceText[I].x-20,ChoiceText[I].y-10,"image/textbox.png","選択肢"+I);
        Image[Images_Data["選択肢"+I]].opacity = 0;
        scene.addChild(ChoiceText[I]);
      };

      for(var I = 0; I < Row * One_column; I++) Texts();

      for(var I = 0; I < 5; I++) Choice();

      var Write = true;
      var Display_text = Datas.テキスト.match(/.{1,120}/g);
      var Display_name = Datas.名前;

      var Kaigyo = 0;
      var Kaigyo_S = 0;
      var Match = null;
      for (var K = 0; K < Display_text.length; K++){
        Match = Display_text[K].match(/●/g);
        if(Match){
          for(var I = 0; I < Match.length; I++){
            Kaigyo = Display_text[K].indexOf("●");
            Kaigyo = Kaigyo%20;
            Kaigyo = 20 - Kaigyo;
            Kaigyo_S = "";
            for(var J = 0; J < Kaigyo; J++) Kaigyo_S += " ";
            Display_text[K] = Display_text[K].replace(Match[I],Kaigyo_S);
          };
        };
      };

      if(Datas.音) SE1.src = Datas.音;

      I = 0;
      J = 0;

      scene.addEventListener("enterframe",function(){

        if(HTML=="スマホ") pad_keydown();

        if(Write){
          if(Key_z) while(Write) Text_write();
          else Text_write();
        }
        else{
          if(Key_c){
            J++;
            if(Display_text[J]){
              I = 0;
              Write = true;
              for(var K = 0; K < Row * One_column; K++){
                if(Display_name&&K==0) K = 20;
                Text[K]._element.textContent = "";
              };
            }
            else{
              game.popScene();
              if(Datas.次) Scene_Check_Scene(Stage_Datas[Datas.次]);
            };
          };
          if(Key_x){
            console.log(Flag);
            Image[Images_Data.テキストボックス].opacity = 0;
            for(var K = 0; K < Row * One_column; K++) Text[K].opacity = 0;
          }
          else{
            Image[Images_Data.テキストボックス].opacity = 0.5;
            for(var K = 0; K < Row * One_column; K++) Text[K].opacity = 1;
          };
        };
      });

      function Text_write(){
        if(I==0&&Display_name){
          for(var K = 0; K < Display_name.length; K++){
            Text[I]._element.textContent = Display_name[K];
            I++;
          };
          Text[I]._element.textContent =  ":";
          Display_text[J] = "                    " + Display_text[J];
          if(Display_text[J].substring(120,140)){
            Display_text[J+1] = Display_text[J].substring(120,140) + Display_text[J+1];
          };
          I = 20;
        };
        while(Display_text[J][I]==" ") I++;
        if(Display_text[J][I]&&I < Row * One_column){
          Text[I]._element.textContent = Display_text[J][I];
          if(Datas.音){
            if(SE1.paused) SE1.play();
            else SE1.currentTime = 0;
          };
          I++;
        }
        else Write = false;
        return;
      };

      /*

      var k = 1;
      if(Datas[k].音) SE1.src = Datas[k].音;
      if(Datas[k].フラグ){
        if(!Flag[Datas[k].フラグ]) Flag[Datas[k].フラグ] = 0;
        if(Datas[k].増加量!=undefined) Flag[Datas[k].フラグ] += Datas[k].増加量;
        if(Datas[k].固定値!=undefined) Flag[Datas[k].フラグ] = Datas[k].固定値;
      };
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
      };
      if(Datas[k].image){
        i = 1;
        while(Datas[k].image[i]){
          if(Datas[k].image[i].src){
            Image[Images_Data[Datas[k].image[i].name]]._element.src = Datas[k].image[i].src;
          }
          if(Datas[k].image[i].width){
            Image[Images_Data[Datas[k].image[i].name]].width = Datas[k].image[i].width;
          }
          if(Datas[k].image[i].height){
            Image[Images_Data[Datas[k].image[i].name]].height = Datas[k].image[i].height;
          }
          if(Datas[k].image[i].x){
            Image[Images_Data[Datas[k].image[i].name]].x = Datas[k].image[i].x;
          }
          if(Datas[k].image[i].y){
            Image[Images_Data[Datas[k].image[i].name]].y = Datas[k].image[i].y;
          }
          i++;
        }
      };
      if(Datas[k].text){
        if(Datas[k].text.indexOf(":")==-1) var Write = 1;
        else var Write = 2;
      }
      else Keydown_c();

      var Next = Datas[k].next;

      function Text_write(){
        while(Datas[k].text[i]==" ") i++;
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
        };
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
            Next = Datas[k].選択肢[Object.keys(Datas[k].選択肢)[j-1]].next;
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
                  Next = Datas[k].選択肢[C_N+1].next;
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
                  Next = Datas[k].選択肢[C_N+1].next;
                }
                COOLTime.up = 5;
              }
            }
          }
          if(Key_x){
            Image[Images_Data.テキストボックス].opacity = 0;
            for(var i = 0; i < 90; i++) Text[i].opacity = 0;
            if(Datas[k].選択肢){
              for(var j = 0; j < Object.keys(Datas[k].選択肢).length; j++){
                ChoiceText[j].opacity = 0;
                Image[Images_Data["選択肢"+j]].opacity = 0;
              };
            };
          }
          else{
            Image[Images_Data.テキストボックス].opacity = 0.5;
            for(var i = 0; i < 90; i++) Text[i].opacity = 1;
            if(Datas[k].選択肢){
              for(var j = 0; j < Object.keys(Datas[k].選択肢).length; j++){
                ChoiceText[j].opacity = 1;
                Image[Images_Data["選択肢"+j]].opacity = 0.5;
              };
            };
          };
          if(Key_c && COOLTime.c_key == 0 && Image[Images_Data.テキストボックス].opacity == 0.5){
            COOLTime.c_key = 5;
            for(var j = 0; j < 5; j++){
              ChoiceText[j].opacity = 0;
              Image[Images_Data["選択肢"+j]].opacity = 0;
            }
            Keydown_c();
          };
        };
      });

      function Keydown_c(){
        if(Datas[k+1]||Next){
          if(Next) k = Next;
          else k++;
          if(!Datas[k]) Datas[k] = {"text":"存在しないデータ。"};
          Next = Datas[k].next;
          if(Datas[k].音) SE1.src = Datas[k].音;
          if(Datas[k].image){
            i = 1;
            while(Datas[k].image[i]){
              if(Datas[k].image[i].src){
                Image[Images_Data[Datas[k].image[i].name]]._element.src = Datas[k].image[i].src;
              }
              if(Datas[k].image[i].width){
                Image[Images_Data[Datas[k].image[i].name]].width = Datas[k].image[i].width;
              }
              if(Datas[k].image[i].height){
                Image[Images_Data[Datas[k].image[i].name]].height = Datas[k].image[i].height;
              }
              if(Datas[k].image[i].x){
                Image[Images_Data[Datas[k].image[i].name]].x = Datas[k].image[i].x;
              }
              if(Datas[k].image[i].y){
                Image[Images_Data[Datas[k].image[i].name]].y = Datas[k].image[i].y;
              }
              i++;
            }
          };
          if(Datas[k].フラグ){
            if(!Flag[Datas[k].フラグ]) Flag[Datas[k].フラグ] = 0;
            if(Datas[k].増加量!=undefined) Flag[Datas[k].フラグ] += Datas[k].増加量;
            if(Datas[k].固定値!=undefined) Flag[Datas[k].フラグ] = Datas[k].固定値;
          };
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
          };
          if(Datas[k].セーブ){
            switch(Datas[k].セーブ){
              case "削除":
                window.localStorage.clear();
                break;
              default:
                window.localStorage.setItem("Flag",JSON.stringify(Flag));
                window.localStorage.setItem("Stage",JSON.stringify(Stage));
                window.localStorage.setItem("Stage_X",JSON.stringify(Stage_X));
                window.localStorage.setItem("Stage_Y",JSON.stringify(Stage_Y));
                window.localStorage.setItem("Character_X",JSON.stringify(Character_X));
                window.localStorage.setItem("Character_Y",JSON.stringify(Character_Y));
                window.localStorage.setItem("Character_direction",JSON.stringify(Character_direction));
                console.log("セーブ完了。");
                break;
            }
          };
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
            if(Datas[k].y) Character_Y = Datas[k].y;
            if(Datas[k].向き) Character_direction = Datas[k].向き;
            Stage = Datas[k].ステージ移動;
            Key_z = false;
            Key_x = false;
            Key_c = false;
            game.input.up = false;
            game.input.down = false;
            game.input.left = false;
            game.input.right = false;
            Scene_Check_Scene(Stage_Datas[Stage]);
          }
        }
        return;
      };

      for(var j = 0; j < 5; j++){
        Image[Images_Data["選択肢"+j]].addEventListener("touchend",function(e){
          if(this.opacity) Choice_Choice(this);
          return;
        });
        ChoiceText[j].addEventListener("touchend",function(e){
          if(this.opacity) Choice_Choice(Image[Images_Data["選択肢"+this.Number]]);
          return;
        });
      };

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
          Next = image.next;
          ChoiceText[image.Number].選択 = true;
          ChoiceText[image.Number]._element.textContent = "▶ " + image.text;
        }
      };

      */

      if(HTML=="スマホ"){

        Images(width,height/2,0,height/2,"image/白.png","白");

        var Pad1 = new Pad("image/pad.png",500);
        Pad1.y = height-500;
        scene.addChild(Pad1);

        var X_B = new Sprite();
        X_B._element = document.createElement("img");
        X_B.width = 250;
        X_B.height = 250;
        X_B.x = width - 250;
        X_B.y = height - 500;
        scene.addChild(X_B);

        var C_B = new Sprite();
        C_B._element = document.createElement("img");
        C_B.width = 250;
        C_B.height = 250;
        C_B.x = width - 250;
        C_B.y = height - 250;
        scene.addChild(C_B);

        var Z_B = new Sprite();
        Z_B._element = document.createElement("img");
        Z_B.width = 250;
        Z_B.height = 250;
        Z_B.x = width - 500;
        Z_B.y = height - 250;
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
          if(game.input.up&&!game.input.down&&!game.input.left&&!game.input.right){
            Pad1.rotation = 0;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(!game.input.up&&game.input.down&&!game.input.left&&!game.input.right){
            Pad1.rotation = 180;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(!game.input.up&&!game.input.down&&game.input.left&&!game.input.right){
            Pad1.rotation = 270;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(!game.input.up&&!game.input.down&&!game.input.left&&game.input.right){
            Pad1.rotation = 90;
            Pad1._element.src = "image/pad_keydown.png";
          };
          if(Key_z) Z_B._element.src = "image/z_down.png";
          else Z_B._element.src = "image/z.png";
          if(Key_x) X_B._element.src = "image/x_down.png";
          else X_B._element.src = "image/x.png";
          if(Key_c) C_B._element.src = "image/c_down.png";
          else C_B._element.src = "image/c.png";
          return;
        };

      };

      return scene;
    };
    var Blackout_Scene = function(Datas){
      var scene = new Scene();
      var Blackout = new Sprite();
      Blackout._element = document.createElement("img");
      Blackout._element.src = "image/黒.png";
      Blackout.width = width;
      Blackout.height = height;
      Blackout.opacity = 0;
      Blackout.tl.fadeIn(10);
      scene.addChild(Blackout);
      scene.addEventListener("enterframe",function(){
        if(Blackout.opacity==1){
          game.popScene();
          game.replaceScene(Map_Scene(Datas));
        };
      });
      return scene;
    };

    function Scene_Check_Scene(Datas){
      if(!Datas) Datas = {データタイプ:"会話",データ:{テキスト:"データが見つかりませんでした。"}};
      if(Datas.フラグ判断){
        for(var I = 0; I < Object.keys(Datas.フラグ判断).length; I++){
          //Flag_name = Object.keys(Datas.フラグ判断)[I];
          //Flag[Flag_name] = Datas.フラグ判断[Flag_name];
        };
      };
      if(Datas.move){
        Move_box = Datas.move;
        Move_box_length = 0;
      };
      switch(Datas.データタイプ){
        case "マップ":
          game.pushScene(Blackout_Scene(Datas.データ));
          break;
        case "メイン":
          game.replaceScene(Main_Scene(Datas.データ));
          break;
        case "会話":
          game.pushScene(Chat_Scene(Datas.データ));
          break;
        case "ジャンプ":
          if(Datas.データ){
            if(Datas.データ.x) Character_X = Datas.データ.x;
            if(Datas.データ.y) Character_Y = Datas.データ.y;
            if(Datas.データ.向き) Character_direction = Datas.データ.向き;
          };
          if(Datas.フラグ獲得){
            for(var I = 0; I < Object.keys(Datas.フラグ獲得).length; I++){
              Flag_name = Object.keys(Datas.フラグ獲得)[I];
              Flag[Flag_name] = Datas.フラグ獲得[Flag_name];
            };
          };
          if(Datas.次) Scene_Check_Scene(Stage_Datas[Datas.次]);
          break;
      };
      return;
    };

    if(window.localStorage.getItem("Flag")){
      Flag = window.localStorage.getItem("Flag");
      Flag = JSON.parse(Flag);
    };
    if(window.localStorage.getItem("Stage")){
      Stage = window.localStorage.getItem("Stage");
      Stage = JSON.parse(Stage);
    };
    if(window.localStorage.getItem("Stage_X")){
      Stage_X = window.localStorage.getItem("Stage_X");
      Stage_X = JSON.parse(Stage_X);
    };
    if(window.localStorage.getItem("Stage_Y")){
      Stage_Y = window.localStorage.getItem("Stage_Y");
      Stage_Y = JSON.parse(Stage_Y);
    };
    if(window.localStorage.getItem("Character_X")){
      Character_X = window.localStorage.getItem("Character_X");
      Character_X = JSON.parse(Character_X);
    };
    if(window.localStorage.getItem("Character_Y")){
      Character_Y = window.localStorage.getItem("Character_Y");
      Character_Y = JSON.parse(Character_Y);
    };
    if(window.localStorage.getItem("Character_direction")){
      Character_direction = window.localStorage.getItem("Character_direction");
      Character_direction = JSON.parse(Character_direction);
    };

    switch(HTML){
      case "管理者":
        var Body = "書き込み" + JSON.stringify(Stage_Datas);
        break;
      case "編集":
        if(window.localStorage.getItem("ローカルステージデータ")){
          Stage_Datas = window.localStorage.getItem("ローカルステージデータ");
          Stage_Datas = JSON.parse(Stage_Datas);
        }
        else Stage_Datas = {};
        var Body = "読み込み";
        break;
      default:
        Stage_Datas = {};
        var Body = "読み込み";
        break;
    };

    var URL = "https://script.google.com/macros/s/AKfycbw2Dx5NjCfQRv1TlpH0kSnvzvZrrLXoWI55JSpuda8XYxwEwbMd/exec";
    var Options = {
      method: "POST",
      body:JSON.stringify({Sheet_id:"13esnJ1oLnt2hvzpK6pQEJW_kVF8UkUV_u3P55zpouBM",Sheet_name:"ゲームデータ"})
    };

    fetch(URL,Options).then(res => res.json()).then(result => {
      for(var I = 0; I < result.length; I++){
        if(result[I].データ1){
          if(result[I].データ1.substring(0,1)!="{") result[I] = "{" + result[I].データ1 + "}";
          else  result[I] = result[I].データ1;
          result[I] = JSON.parse(result[I]);
          Stage_Datas[result[I].データ名] = result[I];
          delete Stage_Datas[result[I].データ名].データ名;
        }
        else break;
      };
      console.log(Stage_Datas);
      if(!Stage_Datas[Stage]) Stage = "最初";
      Scene_Check_Scene(Stage_Datas[Stage]);
      return;
  },);
};
game.start();
};
