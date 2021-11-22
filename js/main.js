enchant();

var Key_z = false;
var Key_x = false;
var Key_c = false;
var Key_s = false;
var Stage_X = 0;
var Stage_Y = 0;
var Create_Map = null;
var Character_X = 0;
var Character_Y = 0;
var Arrangement = {};
var Load_Arrangement = null;
var Object_moves = {};
var Load_Object_moves = null;
var Character_direction = "右";
var Flag = {};
var Flag_name = null;
var Chat = "最初";
var Stage = "最初";
var COOLTime = {c_key:0,s_key:0,down:0,right:0,left:0,up:0};
var Change_Box = null;
var Move_box = null;

var SE1 = document.createElement("audio");
var SE2 = document.createElement("audio");
var BGM = document.createElement("audio");

BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id;
  BGM.play();
});

if(HTML!="スマホ"){
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
};

function Flag_judgement(Name,Condition){
  var Judge = null;
  if(Flag[Name]==undefined) Flag[Name] = 0;
  if(Condition["!="]!=undefined){
    if(Flag[Name]!=Condition["!="]) Judge = true;
    else Judge = false;
  };
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

    var Map_Scene = function(Datas,Stage_name){

      console.log(Stage_name);

      var scene = new Scene();

      Map = Datas.マップ;

      Create_Map = Datas.マップ;

      if(Create_Map.作成中){
        Map = [];
        for (var i = 0; i < Create_Map.作成中[1]; i++) {
          Map[i] = [];
          for (var j = 0; j < Create_Map.作成中[0]; j++) {
            Map[i][j] = "□";
          };
        };
      };

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

      var Move = 0;
      var Map_W = Map[0].length;
      var Map_H = Map.length;
      var Check_X = null;
      var Check_Y = null;
      var Human = {};
      var Touch_data = false;
      var MAP_object_X = null;
      var MAP_object_Y = null;
      var Arrangement_point = null;
      var Arrangement_write = false;


      var MAP_object = null;

      if(Load_Arrangement){
        Arrangement[Stage_name] = Load_Arrangement[Stage_name];
        Load_Arrangement = null;
      };

      if(Load_Object_moves){
        Object_moves[Stage_name] = Load_Object_moves[Stage_name];
        Load_Object_moves = null;
      };

      if(Arrangement[Stage_name]){
        for(var I = 0; I < Object.keys(Arrangement[Stage_name]).length; I++){
          switch(Arrangement[Stage_name][Object.keys(Arrangement[Stage_name])[I]]){
            case "動":
            case "主人公":
              delete Arrangement[Stage_name][Object.keys(Arrangement[Stage_name])[I]];
              break;
          };
        };
      }
      else{
        Arrangement[Stage_name] = {};
        Arrangement_write = true;
      };

      if(!Object_moves[Stage_name]) Object_moves[Stage_name] = {};

      for(var I = 0; I < Object.keys(Datas.画像).length; I++){
        switch(Object.keys(Datas.画像)[I]){
          case "主人公":
            if(!Flag.主人公) Flag.主人公 = Datas.画像[Object.keys(Datas.画像)[I]];
            Human.画像 = Stage_Datas[Flag.主人公];
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
            break;
          default:
            if(Datas.画像[Object.keys(Datas.画像)[I]].座標){
              MAP_object = Datas.画像[Object.keys(Datas.画像)[I]];
              MAP_object_X = MAP_object.座標[0];
              MAP_object_Y = MAP_object.座標[1];
              MAP_object = Stage_Datas[MAP_object.データ];
              if(MAP_object.フラグ判断){
                for(var K = 0; K < Object.keys(MAP_object.フラグ判断).length; K++){
                  Flag_name = Object.keys(MAP_object.フラグ判断)[K];
                  Flag_name = Flag_judgement(Flag_name,MAP_object.フラグ判断[Flag_name]);
                  if(!Flag_name) break;
                };
                if(K!=Object.keys(MAP_object.フラグ判断).length){
                  if(!Arrangement_write){
                    for(var J = 0; J < Object.keys(Arrangement[Stage_name]).length; J++){
                      if(Object.keys(Datas.画像)[I]==Arrangement[Stage_name][Object.keys(Arrangement[Stage_name])[J]]){
                        delete Arrangement[Stage_name][Object.keys(Arrangement[Stage_name])[J]];
                        if(Object_moves[Stage_name][[Object.keys(Datas.画像)[I]]]){
                          delete Object_moves[Stage_name][[Object.keys(Datas.画像)[I]]];
                        };
                        break;
                      };
                    };
                  };
                  continue;
                };
              };
              switch(MAP_object.データタイプ){
                case "調べる":
                case "接触判定":
                  Image_count = Image.length;
                  Image[Image_count] = {};
                  Image[Image_count].名前 = Object.keys(Datas.画像)[I];
                  Image[Image_count].データ名 = MAP_object.データ名;
                  Images_Data[Object.keys(Datas.画像)[I]] = Image_count;
                  if(Arrangement_write){
                    Image[Image_count].Mapx = MAP_object_X;
                    Image[Image_count].Mapy = MAP_object_Y;
                    Arrangement[Stage_name]["X_" + MAP_object_X + " Y_" + MAP_object_Y] = Object.keys(Datas.画像)[I];
                  }
                  else{
                    for(var J = 0; J < Object.keys(Arrangement[Stage_name]).length; J++){
                      if(Image[Image_count].名前==Arrangement[Stage_name][Object.keys(Arrangement[Stage_name])[J]]){
                        Image[Image_count].Mapx = Object.keys(Arrangement[Stage_name])[J].match(/X_(\d{1,})/)[1]*1;
                        Image[Image_count].Mapy = Object.keys(Arrangement[Stage_name])[J].match(/Y_(\d{1,})/)[1]*1;
                        break;
                      };
                    };
                    if(J==Object.keys(Arrangement[Stage_name]).length){
                      Image[Image_count].Mapx = MAP_object_X;
                      Image[Image_count].Mapy = MAP_object_Y;
                      Arrangement[Stage_name]["X_" + MAP_object_X + " Y_" + MAP_object_Y] = Object.keys(Datas.画像)[I];
                    };
                  };
                  break;
                case "NPC":
                  Images(100,100,(MAP_object_X+8)*100-50,(MAP_object_Y+4)*100,false,Object.keys(Datas.画像)[I]);
                  Object_image = Image[Images_Data[Object.keys(Datas.画像)[I]]];
                  Object_image.データ名 = MAP_object.データ名;
                  MAP_object = MAP_object.データ;
                  Object_image.画像 = Stage_Datas[MAP_object.画像];
                  Object_image.Move = 0;
                  Object_image.Number = 0;
                  Object_image.向き = MAP_object.向き;
                  Object_image.上 = Object_image.画像.上;
                  Object_image.下 = Object_image.画像.下;
                  Object_image.左 = Object_image.画像.左;
                  Object_image.右 = Object_image.画像.右;
                  Object_image.歩上 = Object_image.画像.歩上;
                  Object_image.歩下 = Object_image.画像.歩下;
                  Object_image.歩左 = Object_image.画像.歩左;
                  Object_image.歩右 = Object_image.画像.歩右;
                  if(MAP_object.動作){
                    Object_image.time = 0;
                    if(Object_moves[Stage_name][[Object.keys(Datas.画像)[I]]]){
                      if(Object_moves[Stage_name][[Object.keys(Datas.画像)[I]]].向き){
                        Object_image.向き = Object_moves[Stage_name][[Object.keys(Datas.画像)[I]]].向き;
                      };
                    }
                    else Object_moves[Stage_name][[Object.keys(Datas.画像)[I]]] = {動作:MAP_object.動作,数:0};
                    if(MAP_object.時間) Object_image.times = MAP_object.時間;
                    else Object_image.times = 10;
                  };
                  Object_image._element.src = Object_image[Object_image.向き][0];
                  if(Arrangement_write){
                    Object_image.Mapx = MAP_object_X;
                    Object_image.Mapy = MAP_object_Y;
                    Arrangement[Stage_name]["X_" + MAP_object_X + " Y_" + MAP_object_Y] = Object.keys(Datas.画像)[I];
                  }
                  else{
                    for(var J = 0; J < Object.keys(Arrangement[Stage_name]).length; J++){
                      if(Object_image.名前==Arrangement[Stage_name][Object.keys(Arrangement[Stage_name])[J]]){
                        Object_image.Mapx = Object.keys(Arrangement[Stage_name])[J].match(/X_(\d{1,})/)[1]*1;
                        Object_image.Mapy = Object.keys(Arrangement[Stage_name])[J].match(/Y_(\d{1,})/)[1]*1;
                        break;
                      };
                    };
                    if(J==Object.keys(Arrangement[Stage_name]).length){
                      Object_image.Mapx = MAP_object_X;
                      Object_image.Mapy = MAP_object_Y;
                      Arrangement[Stage_name]["X_" + MAP_object_X + " Y_" + MAP_object_Y] = Object.keys(Datas.画像)[I];
                    };
                  };
                  break;
              };
            }
            else{
              Images(Map_W*100,Map_H*100,0,0,Datas.画像[Object.keys(Datas.画像)[I]],Object.keys(Datas.画像)[I]);
              Image[Images_Data[Object.keys(Datas.画像)[I]]].Mapx = 0;
              Image[Images_Data[Object.keys(Datas.画像)[I]]].Mapy = 0;
            };
            break;
        };
      };

      Map_X = Character_X;
      Map_Y = Character_Y;

      if(!Arrangement[Stage_name]["X_" + Map_X + " Y_" + Map_Y]){
        Arrangement[Stage_name]["X_" + Map_X + " Y_" + Map_Y] = "主人公";
      };

      for(var I = 0; I < Image.length; I++){
        if(Image[I].名前!="主人公"){
          Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100;
          Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100;
        };
      };

      var Blackout = new Sprite();
      Blackout._element = document.createElement("img");
      Blackout._element.src = "image/黒.png";
      Blackout.width = width;
      Blackout.height = height;
      Blackout.tl.fadeOut(10);
      scene.addChild(Blackout);

      var Wait = false;

      scene.addEventListener("enterframe",function(){

        var Move_instruction = null;

        if(Move_box){
          if(!Wait){
            for(var I = 0; I < Move_box[Move_box_length].length; I++){
              Move_instruction = Move_box[Move_box_length][I].match(/(.+):(.+)/)
              Auto_map_action(Move_instruction[1],Move_instruction[2]);
            };
            Move_box_length++;
            if(Move_box_length == Move_box.length) Move_box = null;
          }
          else{
            Human.Number++;
            if(Move){
              if(Human.Number >= Human["歩" + Human.向き].length) Human.Number = 0;
              Image[Images_Data["主人公"]]._element.src = Human["歩" + Human.向き][Human.Number];
              Move -= 10;
              if(Move < 0) Move = 0;
              if(Move==0&&Arrangement[Stage_name]["X_" + Human.Beforex + " Y_" + Human.Beforey]=="動"){
                delete Arrangement[Stage_name]["X_" + Human.Beforex + " Y_" + Human.Beforey];
              };
              Wait = true;
            }
            else Wait = false;
            for(var I = 0; I < Image.length; I++){
              switch(Human.向き){
                  case "上":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100 - Move;
                    break;
                  case "下":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100 + Move;
                    break;
                  case "左":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100 - Move;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100;
                    break;
                  case "右":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100 + Move;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100;
                    break;
              };
              if(Image[I].向き){
                switch(Image[I].向き){
                  case "上":
                    Image[I].y += Image[I].Move;
                    break;
                  case "下":
                    Image[I].y -= Image[I].Move;
                    break;
                  case "左":
                    Image[I].x += Image[I].Move;
                    break;
                  case "右":
                    Image[I].x -= Image[I].Move;
                    break;
                };
                Image[I].Number++;
                if(Image[I].Move){
                  if(Image[I].Number >= Image[I]["歩" + Image[I].向き].length) Image[I].Number = 0;
                  Image[I]._element.src = Image[I]["歩" + Image[I].向き][Image[I].Number];
                  Wait = true;
                }
                else{
                  if(Image[I].Number >= Image[I][Image[I].向き].length) Image[I].Number = 0;
                  Image[I]._element.src = Image[I][Image[I].向き][Image[I].Number];
                };
              };
            };
          };
        }
        else{

          for(var K = 0; K < Object.keys(COOLTime).length; K++){
            if(COOLTime[Object.keys(COOLTime)[K]] > 0) COOLTime[Object.keys(COOLTime)[K]]--;
          };

          Character_direction = Human.向き;

          var Key_s_data = {テキスト:"セーブしますか？"};
          Key_s_data.選択肢 = {最初から:"最初から",セーブ削除:"セーブ削除",いいえ:false,はい:"セーブ"};
          if(Key_s){
            if(HTML!="編集"){
              delete Key_s_data.選択肢.最初から;
              delete Key_s_data.選択肢.セーブ削除;
            };
            game.pushScene(Chat_Scene(Key_s_data));
          };

          if(HTML=="スマホ"||HTML=="編集") pad_keydown();

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

            for(var I = 0; I < Image.length; I++){
              switch(Human.向き){
                  case "上":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100 - Move;
                    break;
                  case "下":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100 + Move;
                    break;
                  case "左":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100 - Move;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100;
                    break;
                  case "右":
                    Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100 + Move;
                    Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100;
                    break;
          };
              if(Image[I].向き){
                switch(Image[I].向き){
                  case "上":
                    Image[I].y += Image[I].Move;
                    break;
                  case "下":
                    Image[I].y -= Image[I].Move;
                    break;
                  case "左":
                    Image[I].x += Image[I].Move;
                    break;
                  case "右":
                    Image[I].x -= Image[I].Move;
                    break;
                };
                Image[I].Number++;
                if(Image[I].Move){
                  if(Image[I].Number >= Image[I]["歩" + Image[I].向き].length) Image[I].Number = 0;
                  Image[I]._element.src = Image[I]["歩" + Image[I].向き][Image[I].Number];
                }
                else{
                  if(Image[I].Number >= Image[I][Image[I].向き].length) Image[I].Number = 0;
                  Image[I]._element.src = Image[I][Image[I].向き][Image[I].Number];
                };
              };
            };

            if(!Move&&Touch_data){
              game.input.up = false;
              game.input.down = false;
              game.input.left = false;
              game.input.right = false;
              Scene_Check_Scene(Stage_Datas[Touch_data]);
              Touch_data = false;
            };

            Human.Number++;
            if(Move){
              if(Key_z){
                if(Human.Number >= Human["走" + Human.向き].length) Human.Number = 0;
                Image[Images_Data["主人公"]]._element.src = Human["走" + Human.向き][Human.Number];
                Move -= 25;
              }
              else{
                if(Human.Number >= Human["歩" + Human.向き].length) Human.Number = 0;
                Image[Images_Data["主人公"]]._element.src = Human["歩" + Human.向き][Human.Number];
                Move -= 10;
              };
              if(Move < 0) Move = 0;
              if(Move==0&&Arrangement[Stage_name]["X_" + Human.Beforex + " Y_" + Human.Beforey]=="動"){
                delete Arrangement[Stage_name]["X_" + Human.Beforex + " Y_" + Human.Beforey];
              };
            }
            else{
              if(Human.Number >= Human[Human.向き].length) Human.Number = 0;
              Image[Images_Data["主人公"]]._element.src = Human[Human.向き][Human.Number];
            };

            if(Key_c&&!COOLTime.c_key){
              if(!Move){
                if(Check_X < Map[0].length && Check_Y < Map.length && Check_X >= 0 && Check_Y >= 0 ){
                  Arrangement_point = Arrangement[Stage_name]["X_" + Check_X + " Y_" + Check_Y];
                  if(Arrangement_point&&Arrangement_point!="動"){
                    console.log(Arrangement_point);
                    Object_image = Image[Images_Data[Arrangement_point]];
                    MAP_object = Stage_Datas[Object_image.データ名];
                    switch(MAP_object.データタイプ){
                      case "NPC":
                        if(MAP_object.データ.会話&&!Object_image.Move){
                          switch(Human.向き){
                            case "上":
                              Object_image.向き = "下";
                              Object_image._element.src = Object_image["下"][0];
                              break;
                            case "下":
                              Object_image.向き = "上";
                              Object_image._element.src = Object_image["上"][0];
                              break;
                            case "左":
                              Object_image.向き = "右";
                              Object_image._element.src = Object_image["右"][0];
                              break;
                            case "右":
                              Object_image.向き = "左";
                              Object_image._element.src = Object_image["左"][0];
                              break;
                            };
                            Scene_Check_Scene(Stage_Datas[MAP_object.データ.会話]);
                            return;
                        };
                        break;
                      case "調べる":
                        Scene_Check_Scene(Stage_Datas[MAP_object.データ]);
                        break;
                    };
                  }
                  else console.log(Check_X,Check_Y);
                }
                else console.log("マップ外");
              };
            };

            for(var I = 0; I < Image.length; I++){
              if(Image[I].Move){
                Image[I].Move -= 10;
                if(!Image[I].Move){
                  delete Arrangement[Stage_name]["X_" + Image[I].Beforex + " Y_" + Image[I].Beforey];
                };
              };
            };

            if(Key_x){
              if(Map[Map_Y][Map_X]!="■"&&HTML=="編集"){
                Images(100,100,(Map_X+8)*100-50,(Map_Y+4)*100,"image/配置.png","■");
                Image[Images_Data["■"]].Mapx = Map_X;
                Image[Images_Data["■"]].Mapy = Map_Y;
                Map[Map_Y][Map_X] = "■";
                console.log(JSON.stringify(Map).replace(/],/g,"],\n"));
              };
              console.log(Arrangement[Stage_name]);
            };

            if(game.input.up&&!game.input.down&&!game.input.left&&!game.input.right) Move_human("上");
            if(!game.input.up&&game.input.down&&!game.input.left&&!game.input.right) Move_human("下");
            if(!game.input.up&&!game.input.down&&game.input.left&&!game.input.right) Move_human("左");
            if(!game.input.up&&!game.input.down&&!game.input.left&&game.input.right) Move_human("右");
          };

          var Object_move = null;
          var Object_image = null;

          for(var I = 0; I < Object.keys(Object_moves[Stage_name]).length; I++){
            Object_image = Object.keys(Object_moves[Stage_name])[I];
            Object_move = Object_moves[Stage_name][Object_image];
            Object_image = Image[Images_Data[Object_image]];
            if(Object_image){
              Object_image.time++;
              if(Object_image.times==Object_image.time){
                Object_image.time = 0;
                if(Object_move.数 >= Object_move.動作.length) Object_move.数 = 0;
                if(Move_Object(Object_image,Object_move.動作[Object_move.数])) Object_move.数++;
              };
              Object_move.向き = Object_image.向き;
            };
          };

          for(var I = 0; I < Image.length; I++){
            if(Image[I].動作){
              Image[I].time++;
              if(Image[I].times==Image[I].time){
                Image[I].time = 0;
                Image[I].moves_number++;
                if(Image[I].moves_number >= Image[I].動作.length) Image[I].moves_number = 0;
                Move_Object(Image[I],Image[I].動作[Image[I].moves_number]);
              };
            };
          };
        };

      });

      function Auto_map_action(a,b){
        for(var K = 0; K < Image.length; K++){
          if(Image[K].名前==a) break;
        };
        switch(b){
          case "移動":
            Scene_Check_Scene(Stage_Datas[a]);
            return;
            break;
          case "上":
          case "下":
          case "左":
          case "右":
            if(Image[K].名前=="主人公") Move_human(b,true);
            else Move_Object(a,b);
            Wait = true;
            break;
          case "待機":
            var Now = new Date().getTime();
            var Time_wait = Now + a*1;
            while(Time_wait > new Date().getTime());
            break;
          case "上を向く":
            Image[K].向き = "上";
            Image[K].Number = 0;
            Image[K]._element.src = Image[K][Image[K].向き][Image[K].Number];
            break;
          case "下を向く":
            Image[K].向き = "下";
            Image[K].Number = 0;
            Image[K]._element.src = Image[K][Image[K].向き][Image[K].Number];
            break;
          case "左を向く":
            Image[K].向き = "左";
            Image[K].Number = 0;
            Image[K]._element.src = Image[K][Image[K].向き][Image[K].Number];
            break;
          case "右を向く":
            Image[K].向き = "右";
            Image[K].Number = 0;
            Image[K]._element.src = Image[K][Image[K].向き][Image[K].Number];
            break;
          case "消滅":
            delete Arrangement[Stage_name]["X_" + Image[K].Mapx + " Y_" + Image[K].Mapy];
            scene.removeChild(Image[K]);
            Image[K] = {};
            break;
        };
        return;
      };

      function Move_human(Direction,Automatic){
        if(Move||Touch_data) return;
        Move = 100;
        if(!Automatic){
          if(Human.向き!=Direction){
            Move = 0;
            Human.向き = Direction;
            Human.Number = 0;
            Image[Images_Data["主人公"]]._element.src = Human[Direction][Human.Number];
            return;
          };
          if(Check_X < Map[0].length && Check_Y < Map.length && Check_X >= 0 && Check_Y >= 0){
            if(Map[Check_Y][Check_X]=="■"){
              Move = 0;
              return;
            };
            if(Arrangement[Stage_name]["X_" + Check_X + " Y_" + Check_Y]){
              Object_image = Image[Images_Data[Arrangement[Stage_name]["X_" + Check_X + " Y_" + Check_Y]]];
              if(Object_image) MAP_object = Stage_Datas[Object_image.データ名];
              else MAP_object = false;
              if(MAP_object){
                switch(MAP_object.データタイプ){
                  case "接触判定":
                    Touch_data = MAP_object.データ;
                    break;
                  case "NPC":
                    Move = 0;
                    for(var I = 0; I < Image.length; I++){
                      switch(Human.向き){
                          case "上":
                            Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100;
                            Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100 - Move;
                            break;
                          case "下":
                            Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100;
                            Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100 + Move;
                            break;
                          case "左":
                            Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100 - Move;
                            Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100;
                            break;
                          case "右":
                            Image[I].x = (Image[I].Mapx + 8) * 100-50 - Map_X * 100 + Move;
                            Image[I].y = (Image[I].Mapy + 4) * 100 - Map_Y * 100;
                            break;
                      };
                      if(Image[I].向き){
                        switch(Image[I].向き){
                          case "上":
                            Image[I].y += Image[I].Move;
                            break;
                          case "下":
                            Image[I].y -= Image[I].Move;
                            break;
                          case "左":
                            Image[I].x += Image[I].Move;
                            break;
                          case "右":
                            Image[I].x -= Image[I].Move;
                            break;
                        };
                        Image[I].Number++;
                        if(Image[I].Move){
                          if(Image[I].Number >= Image[I]["歩" + Image[I].向き].length) Image[I].Number = 0;
                          Image[I]._element.src = Image[I]["歩" + Image[I].向き][Image[I].Number];
                          Wait = true;
                        }
                        else{
                          if(Image[I].Number >= Image[I][Image[I].向き].length) Image[I].Number = 0;
                          Image[I]._element.src = Image[I][Image[I].向き][Image[I].Number];
                        };
                      };
                    };
                    if(MAP_object.データ.接触) Scene_Check_Scene(Stage_Datas[MAP_object.データ.接触]);
                    return;
                    break;
                  default:
                    Move = 0;
                    return;
                    break;
                };
              }
              else{
                Move = 0;
                return;
              };
            };
          }
          else{
            console.log("マップ外");
            Move = 0;
            return;
          };
        }
        else Human.向き = Direction;
        Human.Beforex = Map_X;
        Human.Beforey = Map_Y;
        Arrangement_point = Arrangement[Stage_name]["X_" + Map_X + " Y_" + Map_Y];
        if(Arrangement_point=="主人公") Arrangement[Stage_name]["X_" + Map_X + " Y_" + Map_Y] = "動";
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
        Character_X = Map_X;
        Character_Y = Map_Y;
        Arrangement_point = Arrangement[Stage_name]["X_" + Map_X + " Y_" + Map_Y];
        if(!Arrangement_point) Arrangement[Stage_name]["X_" + Map_X + " Y_" + Map_Y] = "主人公";
        return;
      };

      function Move_Object(Object,Direction){
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
        if(Direction=="縦近づく"){
          if(Map_Y == Object.Check_Y){
            if(Map_X > Object.Check_X) Direction = "右を向く";
            else Direction = "左を向く";
          }
          else{
            if(Map_Y > Object.Check_Y) Direction = "下";
            else Direction = "上";
          };
        };
        if(Direction=="横近づく"){
          if(Map_X == Object.Check_X){
            if(Map_Y > Object.Check_Y) Direction = "下を向く";
            else Direction = "上を向く";
          }
          else{
            if(Map_X > Object.Check_X) Direction = "右";
            else Direction = "左";
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
        if(Object.Move) return(false);
        Object.Move = 100;
        if(Direction.substring(1)=="を向く"){
          Object.向き = Direction.substring(0,1);
          Object.Move = 0;
          Object.Number = 0;
          Object._element.src = Object[Direction.substring(0,1)][Object.Number];
          return(true);
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

        Arrangement_point = Arrangement[Stage_name]["X_" + Object.Check_X + " Y_" + Object.Check_Y];

        if(Map[Object.Check_Y][Object.Check_X]!="□"||Arrangement_point){
          Object.Move = 0;
          return(false);
        };

        Object.Beforex = Object.Mapx;
        Object.Beforey = Object.Mapy;
        Arrangement[Stage_name]["X_" + Object.Mapx + " Y_" + Object.Mapy] = "動";
        Object.Mapx = Object.Check_X;
        Object.Mapy = Object.Check_Y;
        Arrangement[Stage_name]["X_" + Object.Mapx + " Y_" + Object.Mapy] = Object.名前;

        return(true);
      };

      if(HTML=="スマホ"||HTML=="編集"){

        var Pad1 = new Pad("image/pad.png",800);
        Pad1.y = height - 800;
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
          Images(width,900,0,0,false,Image_keys);
          if(Datas.画像[Image_keys].x) Image[Images_Data[Image_keys]].x = Datas.画像[Image_keys].x;
          if(Datas.画像[Image_keys].y) Image[Images_Data[Image_keys]].y = Datas.画像[Image_keys].y;
          if(Datas.画像[Image_keys].width) Image[Images_Data[Image_keys]].width = Datas.画像[Image_keys].width;
          if(Datas.画像[Image_keys].height) Image[Images_Data[Image_keys]].height = Datas.画像[Image_keys].height;
          if(Datas.画像[Image_keys].src) Image[Images_Data[Image_keys]]._element.src = Datas.画像[Image_keys].src;
          if(Datas.画像[Image_keys].fadeIn){
            Image[Images_Data[Image_keys]].opacity = 0;
            Image[Images_Data[Image_keys]].tl.fadeIn(Datas.画像[Image_keys].fadeIn);
          };
        };
      };

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
      var Choice_Number = null;

      function Choice(){
        ChoiceText[I] = new Sprite();
        ChoiceText[I]._element = document.createElement("innerHTML");
        ChoiceText[I]._style.font  = "60px monospace";
        ChoiceText[I]._style.color = "white";
        ChoiceText[I].x = 1000;
        ChoiceText[I].y = 400 - I * 90;
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

        for(var K = 0; K < Object.keys(COOLTime).length; K++){
          if(COOLTime[Object.keys(COOLTime)[K]] > 0) COOLTime[Object.keys(COOLTime)[K]]--;
        };

        if(HTML=="スマホ"||HTML=="編集") pad_keydown();

        if(Write){
          if(Key_z) while(Write) Text_write();
          else Text_write();
        }
        else{
          if(Key_x){
            console.log(Flag);
            Image[Images_Data.テキストボックス].opacity = 0;
            for(var K = 0; K < Row * One_column; K++) Text[K].opacity = 0;
            for(var K = 0; K < 5; K++){
              ChoiceText[K].opacity = 0;
              Image[Images_Data["選択肢"+K]].opacity = 0;
            };
          }
          else{
            Image[Images_Data.テキストボックス].opacity = 0.5;
            for(var K = 0; K < Row * One_column; K++) Text[K].opacity = 1;
            if(!Display_text[J+1]){
              if(Datas.選択肢){
                for(var K = 0; K < Object.keys(Datas.選択肢).length; K++){
                  ChoiceText[K].opacity = 1;
                  Image[Images_Data["選択肢"+K]].opacity = 0.5;
                };
              };
            };
          };
          if(Datas.選択肢&&!Display_text[J+1]){
            if(!game.input.up&&game.input.down&&!game.input.left&&!game.input.right&&!COOLTime.down){
              COOLTime.down = 5;
              for(var K = 0; K < Object.keys(Datas.選択肢).length; K++){
                ChoiceText[K]._element.textContent = Object.keys(Datas.選択肢)[K];
              };
              Choice_Number--;
              if(Choice_Number < 0) Choice_Number = Object.keys(Datas.選択肢).length - 1;
              Datas.次 = Datas.選択肢[Object.keys(Datas.選択肢)[Choice_Number]];
              ChoiceText[Choice_Number]._element.textContent = "▶ " + Object.keys(Datas.選択肢)[Choice_Number];
            };
            if(game.input.up&&!game.input.down&&!game.input.left&&!game.input.right&&!COOLTime.up){
              COOLTime.up = 5;
              for(var K = 0; K < Object.keys(Datas.選択肢).length; K++){
                ChoiceText[K]._element.textContent = Object.keys(Datas.選択肢)[K];
              };
              Choice_Number++;
              if(Choice_Number == Object.keys(Datas.選択肢).length) Choice_Number = 0;
              Datas.次 = Datas.選択肢[Object.keys(Datas.選択肢)[Choice_Number]];
              ChoiceText[Choice_Number]._element.textContent = "▶ " + Object.keys(Datas.選択肢)[Choice_Number];
            };
          };
          if(Key_c&&!Key_x&&!COOLTime.c_key){
            COOLTime.c_key = 5;
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
              if(Datas.次){
                switch(Datas.次){
                  case "セーブ":
                    window.localStorage.setItem("Flag",JSON.stringify(Flag));
                    window.localStorage.setItem("Stage",JSON.stringify(Stage));
                    window.localStorage.setItem("Stage_X",JSON.stringify(Stage_X));
                    window.localStorage.setItem("Stage_Y",JSON.stringify(Stage_Y));
                    window.localStorage.setItem("Arrangement",JSON.stringify(Arrangement));
                    window.localStorage.setItem("Character_X",JSON.stringify(Character_X));
                    window.localStorage.setItem("Character_Y",JSON.stringify(Character_Y));
                    window.localStorage.setItem("Object_moves",JSON.stringify(Object_moves));
                    window.localStorage.setItem("Character_direction",JSON.stringify(Character_direction));
                    console.log("セーブ完了。");
                    game.pushScene(Chat_Scene({テキスト:"セーブしました。"}));
                    return;
                    break;
                  case "セーブ削除":
                    window.localStorage.clear();
                    game.pushScene(Chat_Scene({テキスト:"既存セーブを削除しました。●ゲームは続けることができます。"}));
                    return;
                    break;
                  case "最初から":
                    Scene_Check_Scene(Stage_Datas["最初"]);
                    return;
                    break;
                };
                Scene_Check_Scene(Stage_Datas[Datas.次]);
              };
            };
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
        else{
          Write = false;
          if(!Display_text[J+1]){
            if(Datas.選択肢){
              for(var K = 0; K < Object.keys(Datas.選択肢).length; K++){
                ChoiceText[K]._element.textContent = Object.keys(Datas.選択肢)[K];
              };
              Choice_Number = K - 1;
              Datas.次 = Datas.選択肢[Object.keys(Datas.選択肢)[Choice_Number]];
              ChoiceText[Choice_Number]._element.textContent = "▶ " + Object.keys(Datas.選択肢)[Choice_Number];
            };
          };
        };
        return;
      };

      if(HTML=="スマホ"||HTML=="編集"){

        var Pad1 = new Pad("image/pad.png",800);
        Pad1.y = height - 800;
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
    var Blackout_Scene = function(Datas,Stage_name){
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
          game.replaceScene(Map_Scene(Datas,Stage_name));
        };
      });
      return scene;
    };

    function Scene_Check_Scene(Datas){
      Key_c = false;
      if(!Datas) Datas = {データタイプ:"会話",データ:{テキスト:"データが見つかりませんでした。"}};
      if(Datas.フラグ判断){
        for(var I = 0; I < Object.keys(Datas.フラグ判断).length; I++){
          Flag_name = Object.keys(Datas.フラグ判断)[I];
          Flag_name = Flag_judgement(Flag_name,Datas.フラグ判断[Flag_name]);
          if(!Flag_name) break;
        };
        if(I!=Object.keys(Datas.フラグ判断).length){
          if(Datas.フラグ無し) Scene_Check_Scene(Stage_Datas[Datas.フラグ無し]);
          return;
        };
      };
      if(Datas.マップ処理){
        Move_box = Datas.マップ処理;
        Move_box_length = 0;
      };
      switch(Datas.データタイプ){
        case "マップ":
          Stage = Datas.データ名;
          game.pushScene(Blackout_Scene(Datas.データ,Stage));
          break;
        case "メイン":
          game.replaceScene(Main_Scene(Datas.データ));
          break;
        case "会話":
          game.pushScene(Chat_Scene(Datas.データ));
          break;
        case "ジャンプ":
          if(Datas.データ){
            if(Datas.データ.x!=undefined) Character_X = Datas.データ.x;
            if(Datas.データ.y!=undefined) Character_Y = Datas.データ.y;
            if(Datas.データ.向き) Character_direction = Datas.データ.向き;
          };
          if(Datas.フラグ獲得){
            for(var I = 0; I < Object.keys(Datas.フラグ獲得).length; I++){
              Flag_name = Object.keys(Datas.フラグ獲得)[I];
              switch(Datas.フラグ獲得[Flag_name].substring(0,1)){
                case "+":
                  if(Flag[Flag_name]) Flag[Flag_name] += Datas.フラグ獲得[Flag_name]*1;
                  else Flag[Flag_name] = Datas.フラグ獲得[Flag_name].substring(1)*1;
                  break;
                case "-":
                  if(Flag[Flag_name]) Flag[Flag_name] += Datas.フラグ獲得[Flag_name]*1;
                  else Flag[Flag_name] = Datas.フラグ獲得[Flag_name]*1;
                  break;
                default:
                  if(Datas.フラグ獲得[Flag_name].match([/\D/])) Flag[Flag_name] = Datas.フラグ獲得[Flag_name];
                  else Flag[Flag_name] = Datas.フラグ獲得[Flag_name]*1;
                  break;
              };
            };
          };
          if(Datas.次){
            if(Datas.次=="暗転") Scene_Check_Scene(Stage_Datas[Stage]);
            else Scene_Check_Scene(Stage_Datas[Datas.次]);
          };
          break;
      };
      return;
    };

    if(window.localStorage.getItem("Arrangement")){
      Load_Arrangement = window.localStorage.getItem("Arrangement");
      Load_Arrangement = JSON.parse(Load_Arrangement);
    };
    if(window.localStorage.getItem("Object_moves")){
      Load_Object_moves = window.localStorage.getItem("Object_moves");
      Load_Object_moves = JSON.parse(Load_Object_moves);
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
        var Data_number = "データ1";
        var Body = "書き込み" + JSON.stringify(Stage_Datas);
        break;
      case "編集":
        if(window.localStorage.getItem("ローカルステージデータ")){
          Stage_Datas = window.localStorage.getItem("ローカルステージデータ");
          Stage_Datas = JSON.parse(Stage_Datas);
        }
        else Stage_Datas = {};
        var Data_number = "データ1";
        var Body = "読み込み";
        break;
      default:
        Stage_Datas = {};
        var Data_number = "データ1";
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
        if(result[I][Data_number]){
          if(result[I][Data_number].substring(0,1)!="{") result[I] = "{" + result[I][Data_number] + "}";
          else  result[I] = result[I][Data_number];
          result[I] = JSON.parse(result[I]);
          Stage_Datas[result[I].データ名] = result[I];
        }
        else break;
      };
      if(!Stage_Datas[Stage]) Stage = "最初";
      Scene_Check_Scene(Stage_Datas[Stage]);
      return;
  },);
};
game.start();
};
