enchant();

var Cursor = {};
var Stage_X = 0;
var Stage_Y = 0;
var Create_Map = null;
var Character_X = 0;
var Character_Y = 0;
var Arrangement = {};
var Load_Arrangement = null;
var Object_moves = {};
var Load_Object_moves = null;
var Setting_key = null;
var Character_direction = "右";
var Effect_time = {};
var Flag = {};
var Key_settings = {
  決定キー:"c",加速キー:"z",停止キー:"x",メニューキー:"s",
  上キー:"↑",下キー:"↓",左キー:"←",右キー:"→"
};
var Flag_name = null;
var Flag_item_name = null;
var Chat = "最初";
var Stage = "最初";
var Key_config = {
  決定:{キー:Key_settings.決定キー,プッシュ:false,タイム:0},
  加速:{キー:Key_settings.加速キー,プッシュ:false,タイム:0},
  停止:{キー:Key_settings.停止キー,プッシュ:false,タイム:0},
  メニュー:{キー:Key_settings.メニューキー,プッシュ:false,タイム:0},
  上:{キー:Key_settings.上キー,プッシュ:false,タイム:0},
  下:{キー:Key_settings.下キー,プッシュ:false,タイム:0},
  左:{キー:Key_settings.左キー,プッシュ:false,タイム:0},
  右:{キー:Key_settings.右キー,プッシュ:false,タイム:0}
};
var Move_box = null;
var Button_size = 400;
var This_object = null;
var Key_config_setting = false;
var Key_config_setting_write = null;
var Use_Item = null;

var SE1 = document.createElement("audio");
var SE2 = document.createElement("audio");
var BGM = document.createElement("audio");

BGM.addEventListener("ended",function(e){
  BGM.currentTime = BGM.id;
  BGM.play();
});

if(HTML!="スマホ"){
  window.addEventListener("keydown",function(e){

    if(Key_config_setting&&!Key_config_setting_write){
      Key_config_setting = false;
      switch(Setting_key){
        case "↑":
          Key_settings.上キー = e.key;
          break;
        case "↓":
          Key_settings.下キー = e.key;
          break;
        case "←":
          Key_settings.左キー = e.key;
          break;
        case "→":
          Key_settings.右キー = e.key;
          break;
        case "c":
          Key_settings.決定キー = e.key;
          break;
        case "z":
          Key_settings.加速キー = e.key;
          break;
        case "x":
          Key_settings.停止キー = e.key;
          break;
        case "s":
          Key_settings.メニューキー = e.key;
          break;
      };
      Key_config.決定.キー = Key_settings.決定キー;
      Key_config.加速.キー = Key_settings.加速キー;
      Key_config.停止.キー = Key_settings.停止キー;
      Key_config.メニュー.キー = Key_settings.メニューキー;
      Key_config.上.キー = Key_settings.上キー;
      Key_config.下.キー = Key_settings.下キー;
      Key_config.左.キー = Key_settings.左キー;
      Key_config.右.キー = Key_settings.右キー;
      return;
    }
    else{
      switch(e.key){
      case Key_config.上.キー:
        Key_config.上.プッシュ = true;
        break;
      case Key_config.下.キー:
        Key_config.下.プッシュ = true;
        break;
      case Key_config.左.キー:
        Key_config.左.プッシュ = true;
        break;
      case Key_config.右.キー:
        Key_config.右.プッシュ = true;
        break;
      case Key_config.決定.キー:
        Key_config.決定.プッシュ = true;
        break;
      case Key_config.加速.キー:
        Key_config.加速.プッシュ = true;
        break;
      case Key_config.停止.キー:
        Key_config.停止.プッシュ = true;
        break;
      case Key_config.メニュー.キー:
        Key_config.メニュー.プッシュ = true;
        break;
    };
    };

  });
  window.addEventListener("keyup",function(e){
    switch(e.key){
      case Key_config.上.キー:
        Key_config.上.プッシュ = false;
        break;
      case Key_config.下.キー:
        Key_config.下.プッシュ = false;
        break;
      case Key_config.左.キー:
        Key_config.左.プッシュ = false;
        break;
      case Key_config.右.キー:
        Key_config.右.プッシュ = false;
        break;
      case Key_config.決定.キー:
        Key_config.決定.プッシュ = false;
        break;
      case Key_config.加速.キー:
        Key_config.加速.プッシュ = false;
        break;
      case Key_config.停止.キー:
        Key_config.停止.プッシュ = false;
        break;
      case Key_config.メニュー.キー:
        Key_config.メニュー.プッシュ = false;
        break;
    };
  });
};

function Time(Time,Data){
  var Text = JSON.stringify(Time);
  if(Text.match(/.*(\d{4}).(\d{2}).(\d{2})[^T]+(\d{2}).(\d{2}).(\d{2}).*/)){
    Time = Text.replace(/.*(\d{4}).(\d{2}).(\d{2})[^T]+(\d{2}).(\d{2}).(\d{2}).*/,"$1/$2/$3 $4:$5:$6");
  };
  Time = new Date(Time);
  if(!Data) Data = {タイプ:"漢字",全:true};
  if(!Data.タイプ) Data.タイプ = "日付";
  var Year = Time.getFullYear();
  var Month = Time.getMonth()+1;
  var Dates = Time.getDate();
  var Hour = Time.getHours();
  var Minute = Time.getMinutes();
  var Seconds = Time.getSeconds();
  var Day = Time.getDay();
  if(Month<10) Month = "0" + Month;
  if(Dates<10) Dates = "0" + Dates;
  if(Hour<10) Hour = "0" + Hour;
  if(Minute<10) Minute = "0" + Minute;
  if(Seconds<10) Seconds = "0" + Seconds;
  Day = "日月火水木金土"[Day];
  Time = "";
  if(Data.月日){
    Data.月 = true;
    Data.日 = true;
  };
  if(Data.日付){
    Data.年 = true;
    Data.月 = true;
    Data.日 = true;
  };
  if(Data.時分){
    Data.時 = true;
    Data.分 = true;
  };
  if(Data.時間){
    Data.時 = true;
    Data.分 = true;
    Data.秒 = true;
  };
  if(Data.全){
    Data.年 = true;
    Data.月 = true;
    Data.日 = true;
    Data.曜 = true;
    Data.時 = true;
    Data.分 = true;
    Data.秒 = true;
  };
  switch(Data.タイプ){
    case "漢字":
      if(Data.年) Time += Year + "年";
      if(Data.月) Time += Month + "月";
      if(Data.日) Time += Dates + "日";
      if(Data.曜){
        if(Time) Time += " ";
        Time += "(" + Day + ")";
      }
      if(Data.時){
        if(Time) Time += " ";
        Time += Hour + "時";
      }
      if(Data.分) Time += Minute + "分";
      if(Data.秒) Time += Seconds + "秒";
      break;
    case "数字":
      if(Data.年) Time += Year;
      if(Data.月) Time += Month;
      if(Data.日) Time += Dates;
      if(Data.時) Time += Hour;
      if(Data.分) Time += Minute;
      if(Data.秒) Time += Seconds;
      break;
    case "日付":
      if(Data.年) Time += Year;
      if(Data.月){
        if(Time) Time += "/";
        Time += Month;
      }
      if(Data.日){
        if(Time) Time += "/";
        Time += Dates;
      }
      if(Data.時){
        if(Time) Time += " ";
        Time += Hour;
      }
      if(Data.分){
        if(Time) Time += ":";
        Time += Minute;
      }
      if(Data.秒){
        if(Time) Time += ":";
        Time += Seconds;
      }
      break
  };
  if(Year+""=="NaN"){
    Time = "2000/01/01";
  };
  return(Time);
};

function Flag_judgement(Name,Condition){
  var Judge = true;
  if(Flag[Name]) Name = Flag[Name];
  else Name = 0;
  if(Name.数!=undefined) Name = Name.数;
  if(Condition["!="]!=undefined){
    if(Array.isArray(Condition["!="])){
      for(var I = 0; I < Condition["!="].length; I++){
        if(Name==Condition["!="][I]){
          Judge = false;
          break;
        };
      };
    }
    else if(Name == Condition["!="]) Judge = false;
  };
  if(Condition["=="]!=undefined) if(Name != Condition["=="]) Judge = false;
  if(Condition[">"]!=undefined) if(Name <= Condition[">"]) Judge = false;
  if(Condition["<"]!=undefined) if(Name >= Condition["<"]) Judge = false;
  return(Judge);
};

function Game_load(width,height){

  var game = new Game(width,height);
  game.fps = 20;
  game.onload = function(){

    var Map_Scene = function(Datas,Stage_name){

      console.log(Stage_name);

      var scene = new Scene();

      var Black = new Sprite();
      Black._element = document.createElement("img");
      Black._element.src = "image/黒.png";
      Black.width = width;
      Black.height = height;
      scene.addChild(Black);

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
      var Move_distance = 0;
      var Map_W = Map[0].length;
      var Map_H = Map.length;
      var Check_X = null;
      var Check_Y = null;
      var Human = {};
      var Head_data = false;
      var Touch_data = false;
      var MAP_object_X = null;
      var MAP_object_Y = null;
      var Arrangement_point = null;
      var Arrangement_write = false;

      var MAP_object = null;

      if(Load_Arrangement) Arrangement[Stage_name] = Load_Arrangement[Stage_name];

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
            Human.画像 = Stage_Datas[Flag.主人公].データ;
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
              if(MAP_object.フラグ判断&&Stage!="テストルーム"){
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
                      if(Load_Arrangement){
                        scene.removeChild(Image[Image_count]);
                        Image[Image_count] = {};
                      }
                      else{
                        Image[Image_count].Mapx = MAP_object_X;
                        Image[Image_count].Mapy = MAP_object_Y;
                        Arrangement[Stage_name]["X_" + MAP_object_X + " Y_" + MAP_object_Y] = Object.keys(Datas.画像)[I];
                      };
                    };
                  };
                  break;
                case "NPC":
                  Images(100,100,(MAP_object_X+8)*100-50,(MAP_object_Y+4)*100,false,Object.keys(Datas.画像)[I]);
                  Object_image = Image[Images_Data[Object.keys(Datas.画像)[I]]];
                  Object_image.データ名 = MAP_object.データ名;
                  MAP_object = MAP_object.データ;
                  Object_image.画像 = Stage_Datas[MAP_object.画像].データ;
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
                      if(Load_Arrangement){
                        scene.removeChild(Object_image);
                        Object_image = {};
                      }
                      else{
                        Object_image.Mapx = MAP_object_X;
                        Object_image.Mapy = MAP_object_Y;
                        Arrangement[Stage_name]["X_" + MAP_object_X + " Y_" + MAP_object_Y] = Object.keys(Datas.画像)[I];
                      };
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

      if(Datas.フィルタ){
        for(var I = 0; I < Object.keys(Datas.フィルタ).length; I++){
          Images(width,height,0,0,Datas.フィルタ[Object.keys(Datas.フィルタ)[I]],Object.keys(Datas.フィルタ)[I]);
        };
      };


      if(Datas.フィルタ出現条件){
        var Options_texts_one = null;
        for(var I = 0; I < Object.keys(Datas.フィルタ出現条件).length;I++){
          Options_texts_one = Datas.フィルタ出現条件[Object.keys(Datas.フィルタ出現条件)[I]];
          for(var J = 0; J < Object.keys(Options_texts_one).length; J++){
            Flag_name = Object.keys(Options_texts_one)[J];
            if(Flag_name=="ランダム") Flag_name = !Math.floor(Math.random()*Options_texts_one[Flag_name]);
            else Flag_name = Flag_judgement(Flag_name,Options_texts_one[Flag_name]);
            if(!Flag_name) scene.removeChild(Image[Images_Data[Object.keys(Datas.フィルタ出現条件)[I]]]);
          };
        };
      };

      Load_Arrangement = null;

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

      if(HTML=="スマホ"||HTML=="編集"){
        Black.height /= 2;
        Blackout.height /= 2;
        var White = new Sprite();
        White._element = document.createElement("img");
        White._element.src = "image/白.png";
        White.y = height/2;
        White.width = width;
        White.height = height/2;
        scene.addChild(White);
      };

      var Now = null;
      var Wait = false;
      var Timeout = null;
      var Previous = new Date().getSeconds();

      var Time_text = null;
      var Time_texts = [];
      var Time_texts_Number = 0;

      for(var I = 0; I < 13; I++){
        Time_texts[I] = new Sprite();
        Time_texts[I]._element = document.createElement("innerHTML");
        Time_texts[I]._style.font  = "60px monospace";
        Time_texts[I]._style.color = "yellow";
        Time_texts[I]._backgroundColor = "black";
        Time_texts[I].x = 60;
        Time_texts[I].y = 60 + I * 60;
        scene.addChild(Time_texts[I]);
      };


      scene.addEventListener("enterframe",function(){

        if(Use_Item){
          if(Check_X < Map[0].length && Check_Y < Map.length && Check_X >= 0 && Check_Y >= 0){
            Arrangement_point = Arrangement[Stage_name]["X_" + Check_X + " Y_" + Check_Y];
            if(Arrangement_point&&Arrangement_point!="動"){
              Object_image = Image[Images_Data[Arrangement_point]];
              MAP_object = Stage_Datas[Object_image.データ名];
              if(MAP_object.データ.道具使用){
                MAP_object = MAP_object.データ.道具使用;
                for(var I = 0; I < Object.keys(MAP_object).length; I++){
                  if(Object.keys(MAP_object)[I]==Use_Item.効果){
                    Scene_Check_Scene(Stage_Datas[MAP_object[Object.keys(MAP_object)[I]]]);
                    Use_Item = null;
                    return;
                  };
                };
              };
            };
          }
          else console.log("マップ外");
          Scene_Check_Scene(Stage_Datas[Use_Item.効果無し]);
          Use_Item = null;
          return;
        }
        else{
          if(Move_box){
            if(!Wait){
              Auto_map_action(Move_box[Move_box_length]);
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
                    Image[I].Move -= 10;
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

            Now = new Date().getSeconds();

            if(Now!=Previous){
              for(var L = 0; L < Object.keys(Flag).length; L++){
                Timeout = Object.keys(Flag)[L];
                if(!Flag[Timeout + "表示"]) continue;
                Time_texts_Number = 0;
                while(Time_texts[Time_texts_Number]._element.textContent){
                  if(Time_texts[Time_texts_Number].name==Timeout) break;
                  Time_texts_Number++;
                };
                Time_text = Time_texts[Time_texts_Number];
                Time_text.name = Timeout;
                if(Flag[Timeout].時刻) Time_text._element.textContent = Timeout + " " + Flag[Timeout].時刻;
                else Time_text._element.textContent = Timeout + " " + Flag[Timeout];
                console.log(Time_text._element.textContent);
              };
              for(var L = 0; L < Object.keys(Effect_time).length; L++){
                Timeout = Object.keys(Effect_time)[L];
                Effect_time[Timeout]--;
                switch(Timeout){
                  default:
                    Time_texts_Number = 0;
                    while(Time_texts[Time_texts_Number]._element.textContent){
                      if(Time_texts[Time_texts_Number].name==Timeout) break;
                      Time_texts_Number++;
                    };
                    Time_text = Time_texts[Time_texts_Number];
                    Time_text.name = Timeout;
                    Time_text.TextMinutes = Effect_time[Timeout]*1;
                    Time_text.TextMinutes = Time_text.TextMinutes - Time_text.TextMinutes % 60;
                    Time_text.TextMinutes = (Time_text.TextMinutes / 60) % 60;
                    Time_text.TextSeconds = Effect_time[Timeout]%60;
                    if(Time_text.TextMinutes < 10) Time_text.TextMinutes = "0" + Time_text.TextMinutes;
                    if(Time_text.TextSeconds < 10) Time_text.TextSeconds = "0" + Time_text.TextSeconds;
                    Time_text._element.textContent = Timeout;
                    Time_text._element.textContent += " " + Time_text.TextMinutes;
                    Time_text._element.textContent += ":" + Time_text.TextSeconds;
                    if(!Flag[Timeout + "タイム表示"]) Time_text._element.textContent = null;
                    break;
                };
                if(!Effect_time[Timeout]){
                  switch(Timeout){
                    case "スピードアップ":
                      delete Flag.スピードアップ;
                      break;
                  };
                  delete Effect_time[Timeout];
                  Scene_Check_Scene(Stage_Datas[Timeout + "タイムアップ"]);
                  Time_text._element.textContent = null;
                };
              };
              Previous = Now;
            };

            for(var L = 0; L < Object.keys(Key_config).length; L++){
              if(Key_config[Object.keys(Key_config)[L]].タイム){
                Key_config[Object.keys(Key_config)[L]].タイム--;
              };
            };

            Character_direction = Human.向き;

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

              if(!Move&&!Key_config.決定.タイム&&Key_config.決定.プッシュ){
                Key_config.決定.タイム = 5;
                if(Check_X < Map[0].length && Check_Y < Map.length && Check_X >= 0 && Check_Y >= 0){
                  Arrangement_point = Arrangement[Stage_name]["X_" + Check_X + " Y_" + Check_Y];
                  if(Arrangement_point&&Arrangement_point!="動"){
                    console.log(Arrangement_point);
                    Object_image = Image[Images_Data[Arrangement_point]];
                    MAP_object = Stage_Datas[Object_image.データ名];
                    switch(MAP_object.データタイプ){
                      case "NPC":
                      if(!Object_image.Move){
                        if(MAP_object.データ.会話){
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
                        if(MAP_object.データ.調べる){
                          Scene_Check_Scene(Stage_Datas[MAP_object.データ.調べる]);
                          return;
                        };
                      };
                      break;
                      case "調べる":
                      Scene_Check_Scene(Stage_Datas[MAP_object.データ.ロード]);
                      return;
                      break;
                    };
                  }
                  else console.log(Check_X,Check_Y);
                }
                else console.log("マップ外");
              };
              if(!Move&&Key_config.メニュー.プッシュ){
                var Menu_data = {テキスト:" ",名前:"メニュー"};
                Menu_data.選択肢 = {テストルーム:"テストルーム",閉じる:false,キー設定:"キー設定",セーブ:"セーブ",持ち物:"持ち物"};
                if(HTML!="編集"){
                  delete Menu_data.選択肢.最初から;
                  delete Menu_data.選択肢.セーブ削除;
                  delete Menu_data.選択肢.テストルーム;
                };
                console.log(Arrangement[Stage_name]);
                game.pushScene(Chat_Scene(Menu_data));
                return;
              };
              if(Key_config.停止.プッシュ){
                if(Map[Map_Y][Map_X]!="■"&&HTML=="編集"){
                  Images(100,100,(Map_X+8)*100-50,(Map_Y+4)*100,"image/配置.png","■");
                  Image[Images_Data["■"]].Mapx = Map_X;
                  Image[Images_Data["■"]].Mapy = Map_Y;
                  Map[Map_Y][Map_X] = "■";
                };
                console.log(JSON.stringify(Map).replace(/],/g,"],\n"));
              };

              if(Head_data){
                if(Head_data.フラグ獲得) Flag_get(Head_data.フラグ獲得);
                Scene_Check_Scene(Stage_Datas[Head_data.データ.向かう]);
                Head_data = false;
                return;
              };

              if(!Move&&Touch_data){
                game.input.up = false;
                game.input.down = false;
                game.input.left = false;
                game.input.right = false;
                if(Touch_data.フラグ獲得) Flag_get(Touch_data.フラグ獲得);
                Scene_Check_Scene(Stage_Datas[Touch_data.データ.ロード]);
                Touch_data = false;
                return;
              };

              Human.Number++;
              if(Move){
                Move_distance = 10;
                if(Flag.スピードアップ){
                  if(Flag.スピードアップ > 5) Flag.スピードアップ = 5;
                  Move_distance *= Flag.スピードアップ;
                };
                if(Key_config.加速.プッシュ){
                  Move_distance *= 3;
                  if(Human.Number >= Human["走" + Human.向き].length) Human.Number = 0;
                  Image[Images_Data["主人公"]]._element.src = Human["走" + Human.向き][Human.Number];
                }
                else{
                  if(Human.Number >= Human["歩" + Human.向き].length) Human.Number = 0;
                  Image[Images_Data["主人公"]]._element.src = Human["歩" + Human.向き][Human.Number];
                };
                Move -= Move_distance;
                if(Move < 0) Move = 0;
                if(Move==0&&Arrangement[Stage_name]["X_" + Human.Beforex + " Y_" + Human.Beforey]=="動"){
                  delete Arrangement[Stage_name]["X_" + Human.Beforex + " Y_" + Human.Beforey];
                };
              }
              else{
                if(Human.Number >= Human[Human.向き].length) Human.Number = 0;
                Image[Images_Data["主人公"]]._element.src = Human[Human.向き][Human.Number];
              };

              for(var I = 0; I < Image.length; I++){
                if(Image[I].Move){
                  Image[I].Move -= 10;
                  if(!Image[I].Move){
                    delete Arrangement[Stage_name]["X_" + Image[I].Beforex + " Y_" + Image[I].Beforey];
                  };
                };
              };

              if(Key_config.上.キー != "↑") game.input.up = Key_config.上.プッシュ;
              if(Key_config.下.キー != "↓") game.input.down = Key_config.下.プッシュ;
              if(Key_config.左.キー != "←") game.input.left = Key_config.左.プッシュ;
              if(Key_config.右.キー != "→") game.input.right = Key_config.右.プッシュ;

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
        };


      });

      function Auto_map_action(Instruction){

        var Direction = null;

        for(var I = 0; I < 4; I++){
          switch(I){
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
          if(Instruction[Direction]){
            for(var J = 0; J < Instruction[Direction].length; J++){
              if(Instruction[Direction][J]=="主人公") Move_human(Direction,true);
              else{
                if(Instruction[Direction][J]=="自分") Move_Object(This_object,Direction);
                else{
                  for(var K = 0; K < Image.length; K++) if(Image[K].名前==Instruction[Direction][J]) break;
                  Move_Object(Image[K],Direction);
                };
              };
            };
            Wait = true;
          };
          if(Instruction[Direction + "を向く"]){
            for(var J = 0; J < Instruction[Direction + "を向く"].length; J++){
              if(Instruction[Direction + "を向く"][J]=="自分"){
                This_object.向き = Direction;
                This_object.Number = 0;
                This_object._element.src = This_object[This_object.向き][This_object.Number];
              }
              else{
                for(var K = 0; K < Image.length; K++) if(Image[K].名前==Instruction[Direction + "を向く"][J]) break;
                Image[K].向き = Direction;
                Image[K].Number = 0;
                Image[K]._element.src = Image[K][Image[K].向き][Image[K].Number];
              };
            };
            Wait = true;
          };
        };

        if(Instruction.待機){
          var Now = new Date().getTime();
          var Time_wait = Now + Instruction.待機;
          while(Time_wait > new Date().getTime());
        };

        if(Instruction.消滅){
          console.log("消滅");
          for(var J = 0; J < Instruction.消滅.length; J++){
            if(Instruction.消滅[J]=="自分"){
              delete Arrangement[Stage_name]["X_" + This_object.Mapx + " Y_" + This_object.Mapy];
              scene.removeChild(This_object);
              This_object = {};
            }
            else{
              for(var K = 0; K < Image.length; K++) if(Image[K].名前==Instruction.消滅[J]) break;
              delete Arrangement[Stage_name]["X_" + Image[K].Mapx + " Y_" + Image[K].Mapy];
              scene.removeChild(Image[K]);
              Image[K] = {};
            };
          };
        };

        if(Instruction.フラグ獲得) Flag_get(Instruction.フラグ獲得);
        if(Instruction.移動) Scene_Check_Scene(Stage_Datas[Instruction.移動]);

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
                    Touch_data = MAP_object;
                    break;
                  case "NPC":
                    if(MAP_object.データ.接触){
                      This_object = Object_image;
                      Touch_data = {データ:{ロード:MAP_object.データ.接触}};
                      break;
                    }
                    else{
                      Move = 0;
                      if(MAP_object.データ.向かう){
                        This_object = Object_image;
                        Head_data = MAP_object;
                      }
                      return;
                    };
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

        if(Stage=="テストルーム"){
          Object.Move = 0;
          return(false);
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

        var Pad1 = new Pad("image/pad.png",Button_size*2);
        Pad1.y = height - Button_size*2;
        scene.addChild(Pad1);

        var Ui_Button = [];
        var Ui_Button_count = null;

        function Buttons(X,Y,W,H,V){
          Ui_Button_count = Ui_Button.length;
          Ui_Button[Ui_Button_count] = new Button(V,"light",W,H);
          Ui_Button[Ui_Button_count].moveTo(X,Y);
          Ui_Button[Ui_Button_count].original_Y = Y;
          Ui_Button[Ui_Button_count]._style["font-size"] = H/2.2;
          Ui_Button[Ui_Button_count].addEventListener("touchstart",function(e){
            switch(V){
              case Key_config.決定.キー:
                Key_config.決定.プッシュ = true;
                break;
              case Key_config.加速.キー:
                Key_config.加速.プッシュ = true;
                break;
              case Key_config.停止.キー:
                Key_config.停止.プッシュ = true;
                break;
              case Key_config.メニュー.キー:
                Key_config.メニュー.プッシュ = true;
                break;
            };
            return;
          });
          Ui_Button[Ui_Button_count].addEventListener("touchend",function(e){
            switch(V){
              case Key_config.決定.キー:
                Key_config.決定.プッシュ = false;
                break;
              case Key_config.加速.キー:
                Key_config.加速.プッシュ = false;
                break;
              case Key_config.停止.キー:
                Key_config.停止.プッシュ = false;
                break;
              case Key_config.メニュー.キー:
                Key_config.メニュー.プッシュ = false;
                break;
            };
            return;
          });
          switch(V){
            case Key_config.決定.キー:
              Ui_Button[Ui_Button_count].key = "決定";
              break;
            case Key_config.加速.キー:
              Ui_Button[Ui_Button_count].key = "加速";
              break;
            case Key_config.停止.キー:
              Ui_Button[Ui_Button_count].key = "停止";
              break;
            case Key_config.メニュー.キー:
              Ui_Button[Ui_Button_count].key = "メニュー";
              break;
            };
          scene.addChild(Ui_Button[Ui_Button_count]);
        };

        Buttons(width-Button_size,height-Button_size,Button_size,Button_size,Key_config.決定.キー);
        Buttons(width-Button_size*2,height-Button_size,Button_size,Button_size,Key_config.加速.キー);
        Buttons(width-Button_size,height-Button_size*2,Button_size,Button_size,Key_config.停止.キー);
        Buttons(width-Button_size*2,height-Button_size*2,Button_size,Button_size,Key_config.メニュー.キー);

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
          for(var I = 0; I < Ui_Button.length; I++){
          if(Key_config[Ui_Button[I].key].プッシュ){
            Ui_Button[I]._applyTheme(Ui_Button[I].theme.active);
            Ui_Button[I].pressed = true;
            Ui_Button[I].y = Ui_Button[I].original_Y + 1;
            Ui_Button[I]._text = Key_config[Ui_Button[I].key].キー;
          }
          else{
            Ui_Button[I]._applyTheme(Ui_Button[I].theme.normal);
            Ui_Button[I].pressed = false;
            Ui_Button[I].y = Ui_Button[I].original_Y - 1;
            Ui_Button[I]._text = Key_config[Ui_Button[I].key].キー;
          };
        };
          return;
        };
      };

      return scene;
    };
    var Chat_Scene = function(Datas){

      var scene = new Scene();

      if(!Datas) Datas = {テキスト:"存在しないデータ。"};

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

      var Text_text = Datas.テキスト.substring(0);
      var Match_text = Text_text.match(/\(フラグ:.+?:フラグ\)/g);

      if(Match_text){
        for(var I = 0; I < Match_text.length; I++){
          Match_text[I] = Match_text[I].substring(5,Match_text[I].length-5);
          if(Flag[Match_text[I]]){
            if(Flag[Match_text[I]].数!=undefined){
              Text_text = Text_text.replace(/\(フラグ:(.+?):フラグ\)/,Flag[Match_text[I]].数);
              continue;
            };
            if(Flag[Match_text[I]].時刻!=undefined){
              Text_text = Text_text.replace(/\(フラグ:(.+?):フラグ\)/,Flag[Match_text[I]].時刻);
              continue;
            };
          }
          else{
            Text_text = Text_text.replace(/\(フラグ:(.+?):フラグ\)/,0);
            continue;
          };
          Text_text = Text_text.replace(/\(フラグ:(.+?):フラグ\)/,Flag[Match_text[I]]);
        };
      };

      var Write = true;
      var Display_text = Text_text.match(/.{1,120}/g);
      var Display_name = Datas.名前;

      if(Display_name) Match_text = Display_name.match(/\(フラグ:.+?:フラグ\)/g);
      else Match_text = false;

      if(Match_text){
        for(var I = 0; I < Match_text.length; I++){
          Match_text[I] = Match_text[I].substring(5,Match_text[I].length-5);
          if(!Flag[Match_text[I]]) Flag[Match_text[I]] = 0;
          Display_name = Display_name.replace(/\(フラグ:(.+?):フラグ\)/,Flag[Match_text[I]]);
        };
      };

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

      var Options_text = JSON.stringify(Datas.選択肢);
      if(Options_text) Options_text = JSON.parse(Options_text);

      if(Datas.選択肢出現条件){
        var Options_texts_one = null;
        for(var I = 0; I < Object.keys(Datas.選択肢出現条件).length;I++){
          Options_texts_one = Datas.選択肢出現条件[Object.keys(Datas.選択肢出現条件)[I]];
          for(var J = 0; J < Object.keys(Options_texts_one).length; J++){
            Flag_name = Object.keys(Options_texts_one)[J];
            if(Flag_name=="ランダム") Flag_name = !Math.floor(Math.random()*Options_texts_one[Flag_name]);
            else Flag_name = Flag_judgement(Flag_name,Options_texts_one[Flag_name]);
            if(!Flag_name) delete Options_text[Object.keys(Datas.選択肢出現条件)[I]];
          };
        };
      };

      I = 0;
      J = 0;

      scene.addEventListener("enterframe",function(){

        for(var L = 0; L < Object.keys(Key_config).length; L++){
          if(Key_config[Object.keys(Key_config)[L]].タイム){
            Key_config[Object.keys(Key_config)[L]].タイム--;
          };
        };

        if(HTML=="スマホ"||HTML=="編集") pad_keydown();

        if(Write){
          if(Key_config.加速.プッシュ) while(Write) Text_write();
          else Text_write();
        }
        else{
          if(Key_config.停止.プッシュ){
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
              if(Options_text){
                for(var K = 0; K < Object.keys(Options_text).length; K++){
                  ChoiceText[K].opacity = 1;
                  Image[Images_Data["選択肢"+K]].opacity = 0.5;
                };
              };
            };
          };
          if(Options_text&&!Display_text[J+1]){
            if(!game.input.up&&game.input.down&&!game.input.left&&!game.input.right&&!Key_config.下.タイム){
              Key_config.下.タイム = 5;
              for(var K = 0; K < Object.keys(Options_text).length; K++){
                ChoiceText[K]._element.textContent = Object.keys(Options_text)[K];
              };
              Choice_Number--;
              if(Choice_Number < 0) Choice_Number = Object.keys(Options_text).length - 1;
              Datas.次 = Options_text[Object.keys(Options_text)[Choice_Number]];
              ChoiceText[Choice_Number]._element.textContent = "► " + Object.keys(Options_text)[Choice_Number];
            };
            if(game.input.up&&!game.input.down&&!game.input.left&&!game.input.right&&!Key_config.上.タイム){
              Key_config.上.タイム = 5;
              for(var K = 0; K < Object.keys(Options_text).length; K++){
                ChoiceText[K]._element.textContent = Object.keys(Options_text)[K];
              };
              Choice_Number++;
              if(Choice_Number == Object.keys(Options_text).length) Choice_Number = 0;
              Datas.次 = Options_text[Object.keys(Options_text)[Choice_Number]];
              ChoiceText[Choice_Number]._element.textContent = "► " + Object.keys(Options_text)[Choice_Number];
            };
          };
          if(!Key_config.停止.プッシュ&&!Key_config.決定.タイム&&Key_config.決定.プッシュ){
            Key_config.決定.タイム = 5;
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
                    window.localStorage.setItem("Effect_time",JSON.stringify(Effect_time));
                    window.localStorage.setItem("Arrangement",JSON.stringify(Arrangement));
                    window.localStorage.setItem("Character_X",JSON.stringify(Character_X));
                    window.localStorage.setItem("Character_Y",JSON.stringify(Character_Y));
                    window.localStorage.setItem("Object_moves",JSON.stringify(Object_moves));
                    window.localStorage.setItem("Character_direction",JSON.stringify(Character_direction));
                    console.log("セーブ完了。");
                    game.pushScene(Chat_Scene({テキスト:"セーブしました。"}));
                    return;
                    break;
                  case "キー設定c":
                  case "キー設定z":
                  case "キー設定x":
                  case "キー設定s":
                  case "キー設定↑":
                  case "キー設定↓":
                  case "キー設定←":
                  case "キー設定→":
                    Setting_key = Datas.次.substring(4);
                    game.pushScene(Key_setting_Scene());
                    return;
                    break;
                  case "矢印キー設定":
                    Menu_data = {テキスト:" ",名前:"どのキーを設定しますか？"};
                    Menu_data.選択肢 = {他のキー:"キー設定","→":"キー設定→","←":"キー設定←","↓":"キー設定↓","↑":"キー設定↑"};
                    game.pushScene(Chat_Scene(Menu_data));
                    return;
                    break;
                  case "キー設定":
                    Menu_data = {テキスト:" ",名前:"どのキーを設定しますか？"};
                    Menu_data.選択肢 = {矢印キー:"矢印キー設定",s:"キー設定s",x:"キー設定x",z:"キー設定z",c:"キー設定c"};
                    game.pushScene(Chat_Scene(Menu_data));
                    return;
                    break;
                  case "セーブ削除":
                    window.localStorage.clear();
                    game.pushScene(Chat_Scene({テキスト:"既存セーブを削除しました。●ゲームは続けることができます。"}));
                    return;
                    break;
                  case "最初から":
                    Stage_X = 0;
                    Stage_Y = 0;
                    Create_Map = null;
                    Character_X = 0;
                    Character_Y = 0;
                    Arrangement = {};
                    Load_Arrangement = null;
                    Object_moves = {};
                    Load_Object_moves = null;
                    Character_direction = "右";
                    Flag = {};
                    Key_settings = {
                      決定キー:"c",加速キー:"z",停止キー:"x",メニューキー:"s",
                      上キー:"↑",下キー:"↓",左キー:"←",右キー:"→"
                    };
                    Flag_name = null;
                    Flag_item_name = null;
                    Chat = "最初";
                    Stage = "最初";
                    Key_config = {
                      決定:{キー:Key_settings.決定キー,プッシュ:false,タイム:0},
                      加速:{キー:Key_settings.加速キー,プッシュ:false,タイム:0},
                      停止:{キー:Key_settings.停止キー,プッシュ:false,タイム:0},
                      メニュー:{キー:Key_settings.メニューキー,プッシュ:false,タイム:0},
                      上:{キー:Key_settings.上キー,プッシュ:false,タイム:0},
                      下:{キー:Key_settings.下キー,プッシュ:false,タイム:0},
                      左:{キー:Key_settings.左キー,プッシュ:false,タイム:0},
                      右:{キー:Key_settings.右キー,プッシュ:false,タイム:0}
                    };
                    Move_box = null;
                    Button_size = 400;
                    This_object = null;
                    Scene_Check_Scene(Stage_Datas["最初"]);
                    return;
                    break;
                  case "テストルーム":
                    Character_X = 0;
                    Character_Y = 0;
                    break;
                };
                Scene_Check_Scene(Stage_Datas[Datas.次]);
              };
            };
          };
        };
        return;
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
            if(Options_text){
              for(var K = 0; K < Object.keys(Options_text).length; K++){
                ChoiceText[K]._element.textContent = Object.keys(Options_text)[K];
              };
              Choice_Number = K - 1;
              Datas.次 = Options_text[Object.keys(Options_text)[Choice_Number]];
              ChoiceText[Choice_Number]._element.textContent = "► " + Object.keys(Options_text)[Choice_Number];
            };
          };
        };
        return;
      };

      if(HTML=="スマホ"||HTML=="編集"){

        var Pad1 = new Pad("image/pad.png",Button_size*2);
        Pad1.y = height - Button_size*2;
        scene.addChild(Pad1);

        var Ui_Button = [];
        var Ui_Button_count = null;

        function Buttons(X,Y,W,H,V){
          Ui_Button_count = Ui_Button.length;
          Ui_Button[Ui_Button_count] = new Button(V,"light",W,H);
          Ui_Button[Ui_Button_count].moveTo(X,Y);
          Ui_Button[Ui_Button_count].original_Y = Y;
          Ui_Button[Ui_Button_count]._style["font-size"] = H/2.2;
          Ui_Button[Ui_Button_count].addEventListener("touchstart",function(e){
            switch(V){
              case Key_config.決定.キー:
                Key_config.決定.プッシュ = true;
                break;
              case Key_config.加速.キー:
                Key_config.加速.プッシュ = true;
                break;
              case Key_config.停止.キー:
                Key_config.停止.プッシュ = true;
                break;
              case Key_config.メニュー.キー:
                Key_config.メニュー.プッシュ = true;
                break;
            };
            return;
          });
          Ui_Button[Ui_Button_count].addEventListener("touchend",function(e){
            switch(V){
              case Key_config.決定.キー:
                Key_config.決定.プッシュ = false;
                break;
              case Key_config.加速.キー:
                Key_config.加速.プッシュ = false;
                break;
              case Key_config.停止.キー:
                Key_config.停止.プッシュ = false;
                break;
              case Key_config.メニュー.キー:
                Key_config.メニュー.プッシュ = false;
                break;
            };
            return;
          });
          switch(V){
            case Key_config.決定.キー:
              Ui_Button[Ui_Button_count].key = "決定";
              break;
            case Key_config.加速.キー:
              Ui_Button[Ui_Button_count].key = "加速";
              break;
            case Key_config.停止.キー:
              Ui_Button[Ui_Button_count].key = "停止";
              break;
            case Key_config.メニュー.キー:
              Ui_Button[Ui_Button_count].key = "メニュー";
              break;
            };
          scene.addChild(Ui_Button[Ui_Button_count]);
        };

        Buttons(width-Button_size,height-Button_size,Button_size,Button_size,Key_config.決定.キー);
        Buttons(width-Button_size*2,height-Button_size,Button_size,Button_size,Key_config.加速.キー);
        Buttons(width-Button_size,height-Button_size*2,Button_size,Button_size,Key_config.停止.キー);
        Buttons(width-Button_size*2,height-Button_size*2,Button_size,Button_size,Key_config.メニュー.キー);

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
          for(var I = 0; I < Ui_Button.length; I++){
          if(Key_config[Ui_Button[I].key].プッシュ){
            Ui_Button[I]._applyTheme(Ui_Button[I].theme.active);
            Ui_Button[I].pressed = true;
            Ui_Button[I].y = Ui_Button[I].original_Y + 1;
          }
          else{
            Ui_Button[I]._applyTheme(Ui_Button[I].theme.normal);
            Ui_Button[I].pressed = false;
            Ui_Button[I].y = Ui_Button[I].original_Y - 1;
          };
        };
          return;
        };
      };

      return scene;
    };
    var Item_Scene = function(Datas){

      var Item_Cursor = 0;
      if(Cursor[Datas]) Item_Cursor = Cursor[Datas];

      var scene = new Scene();

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

      Images(width,height,0,0,"image/textbox.png","テキストボックス");
      Image[Images_Data.テキストボックス].opacity = 0.5;
      if(HTML=="スマホ"||HTML=="編集") Image[Images_Data.テキストボックス].height /= 2;

      var ChoiceText = [];
      var Choice_Number = 0;
      var Item_box_Number = 0;

      function Choice(text){
        ChoiceText[I] = new Sprite();
        ChoiceText[I]._element = document.createElement("innerHTML");
        ChoiceText[I]._style.font  = "60px monospace";
        ChoiceText[I]._style.color = "white";
        ChoiceText[I].x = 200;
        ChoiceText[I].y = 50 + I * 90;
        scene.addChild(ChoiceText[I]);
      };

      for(var I = 0; I < 9; I++) Choice();

      var Items = [];

      for(var I = 0; I < Object.keys(Flag).length; I++){
        if(Flag[Object.keys(Flag)[I]].タイプ==Datas){
          Items[Items.length] = [];
          Items[Items.length-1][0] = Object.keys(Flag)[I];
          Items[Items.length-1][1] = Flag[Object.keys(Flag)[I]].説明;
          if(Flag[Object.keys(Flag)[I]].数) Items[Items.length-1][0] += " ×" + Flag[Object.keys(Flag)[I]].数;
       };
      };
      Items[Items.length] = ["戻る",false];

      while(Item_Cursor){
        if(Items[Choice_Number+Item_box_Number][1]){
          if(Choice_Number!=8) Choice_Number++;
          else Item_box_Number++;
        };
        Item_Cursor--;
      };

      scene.addEventListener("enterframe",function(){

        for(var L = 0; L < Object.keys(Key_config).length; L++){
          if(Key_config[Object.keys(Key_config)[L]].タイム){
            Key_config[Object.keys(Key_config)[L]].タイム--;
          };
        };

        if(game.input.up&&!game.input.down&&!game.input.left&&!game.input.right&&!Key_config.上.タイム){
          Key_config.上.タイム = 5;
          if(Choice_Number) Choice_Number--;
          else if(Item_box_Number) Item_box_Number--;
        };
        if(!game.input.up&&game.input.down&&!game.input.left&&!game.input.right&&!Key_config.下.タイム){
          Key_config.下.タイム = 5;
          if(Items[Choice_Number+Item_box_Number][1]){
            if(Choice_Number!=8) Choice_Number++;
            else Item_box_Number++;
          };
        };

        for(var I = 0; I < 9; I++){
          if(Items[I+Item_box_Number]) ChoiceText[I]._element.textContent = Items[I+Item_box_Number][0];
          else break;
        };

        ChoiceText[Choice_Number]._element.textContent = ChoiceText[Choice_Number]._element.textContent + " ◄";

        Cursor[Datas] = Choice_Number + Item_box_Number;

        if(!Key_config.決定.タイム&&Key_config.決定.プッシュ){
          Key_config.決定.タイム = 5;
          game.popScene();
          if(Items[Choice_Number+Item_box_Number][1]){
            Scene_Check_Scene(Stage_Datas[Items[Choice_Number+Item_box_Number][1]]);
          }
          else{
            delete Cursor[Datas];
            Scene_Check_Scene(Stage_Datas["持ち物"]);
          };
          return;
        };

        if(HTML=="スマホ"||HTML=="編集") pad_keydown();

        return;
      });

      if(HTML=="スマホ"||HTML=="編集"){

        var Pad1 = new Pad("image/pad.png",Button_size*2);
        Pad1.y = height - Button_size*2;
        scene.addChild(Pad1);

        var Ui_Button = [];
        var Ui_Button_count = null;

        function Buttons(X,Y,W,H,V){
          Ui_Button_count = Ui_Button.length;
          Ui_Button[Ui_Button_count] = new Button(V,"light",W,H);
          Ui_Button[Ui_Button_count].moveTo(X,Y);
          Ui_Button[Ui_Button_count].original_Y = Y;
          Ui_Button[Ui_Button_count]._style["font-size"] = H/2.2;
          Ui_Button[Ui_Button_count].addEventListener("touchstart",function(e){
            switch(V){
              case Key_config.決定.キー:
                Key_config.決定.プッシュ = true;
                break;
              case Key_config.加速.キー:
                Key_config.加速.プッシュ = true;
                break;
              case Key_config.停止.キー:
                Key_config.停止.プッシュ = true;
                break;
              case Key_config.メニュー.キー:
                Key_config.メニュー.プッシュ = true;
                break;
            };
            return;
          });
          Ui_Button[Ui_Button_count].addEventListener("touchend",function(e){
            switch(V){
              case Key_config.決定.キー:
                Key_config.決定.プッシュ = false;
                break;
              case Key_config.加速.キー:
                Key_config.加速.プッシュ = false;
                break;
              case Key_config.停止.キー:
                Key_config.停止.プッシュ = false;
                break;
              case Key_config.メニュー.キー:
                Key_config.メニュー.プッシュ = false;
                break;
            };
            return;
          });
          switch(V){
            case Key_config.決定.キー:
              Ui_Button[Ui_Button_count].key = "決定";
              break;
            case Key_config.加速.キー:
              Ui_Button[Ui_Button_count].key = "加速";
              break;
            case Key_config.停止.キー:
              Ui_Button[Ui_Button_count].key = "停止";
              break;
            case Key_config.メニュー.キー:
              Ui_Button[Ui_Button_count].key = "メニュー";
              break;
            };
          scene.addChild(Ui_Button[Ui_Button_count]);
        };

        Buttons(width-Button_size,height-Button_size,Button_size,Button_size,Key_config.決定.キー);
        Buttons(width-Button_size*2,height-Button_size,Button_size,Button_size,Key_config.加速.キー);
        Buttons(width-Button_size,height-Button_size*2,Button_size,Button_size,Key_config.停止.キー);
        Buttons(width-Button_size*2,height-Button_size*2,Button_size,Button_size,Key_config.メニュー.キー);

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
          for(var I = 0; I < Ui_Button.length; I++){
          if(Key_config[Ui_Button[I].key].プッシュ){
            Ui_Button[I]._applyTheme(Ui_Button[I].theme.active);
            Ui_Button[I].pressed = true;
            Ui_Button[I].y = Ui_Button[I].original_Y + 1;
          }
          else{
            Ui_Button[I]._applyTheme(Ui_Button[I].theme.normal);
            Ui_Button[I].pressed = false;
            Ui_Button[I].y = Ui_Button[I].original_Y - 1;
          };
        };
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
      if(HTML=="スマホ"||HTML=="編集") Blackout.height /= 2;
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
    var Key_setting_Scene = function(){
      var scene = new Scene();

      Key_config_setting = true;
      Key_config_setting_write = true;

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

      var Numbers = 430;
      var Row = 6;
      var One_column = 20;
      var I = 0;

      function Texts(a){
        if(!a){
          Key_config_setting_write = false;
          return;
        }
        if(I%One_column==0) Numbers += 62;
        Text[I] = new Sprite();
        Text[I]._element = document.createElement("innerHTML");
        Text[I]._style.font  = "60px monospace";
        Text[I]._element.textContent = a;
        Text[I]._style.color = "white";
        Text[I].x = 62 * (I%One_column) + 180;
        Text[I].y = Numbers;
        scene.addChild(Text[I]);
        I++;
        return;
      };

      Images(width,400,0,480,"image/textbox.png","テキストボックス");
      Image[Images_Data.テキストボックス].opacity = 0.5;

      var Key_text = "設定したいキーを押してください。";

      function key_set_input(Key){
        switch(Setting_key){
          case "↑":
            Key_settings.上キー = Key;
            break;
          case "↓":
            Key_settings.下キー = Key;
            break;
          case "←":
            Key_settings.左キー = Key;
            break;
          case "→":
            Key_settings.右キー = Key;
            break;
          case "c":
            Key_settings.決定キー = Key;
            break;
          case "z":
            Key_settings.加速キー = Key;
            break;
          case "x":
            Key_settings.停止キー = Key;
            break;
          case "s":
            Key_settings.メニューキー = Key;
            break;
        };
        Key_config_setting = false;
        Key_config.決定.キー = Key_settings.決定キー;
        Key_config.加速.キー = Key_settings.加速キー;
        Key_config.停止.キー = Key_settings.停止キー;
        Key_config.メニュー.キー = Key_settings.メニューキー;
        Key_config.上.キー = Key_settings.上キー;
        Key_config.下.キー = Key_settings.下キー;
        Key_config.左.キー = Key_settings.左キー;
        Key_config.右.キー = Key_settings.右キー;
        return;
      };

      scene.addEventListener("enterframe",function(){
        if(Key_config_setting_write) Texts(Key_text[I]);
        else{
          if(game.input.up) key_set_input("↑");
          if(game.input.down) key_set_input("↓");
          if(game.input.left) key_set_input("←");
          if(game.input.right) key_set_input("→");
          if(!Key_config_setting){
            game.replaceScene(Chat_Scene({テキスト:"設定しました。"}));
          };
        };
      });

      return scene;
    };

    function Flag_get(Datas){
      for(var I = 0; I < Object.keys(Datas).length; I++){
        Flag_name = Object.keys(Datas)[I];
        if(Flag_name.substring(Flag_name.length-3,Flag_name.length)=="タイム"){
          Effect_time[Flag_name.substring(0,Flag_name.length-3)] = Datas[Flag_name];
        }
        else{
          switch(Flag_name){
            case "x":
            Character_X = Datas[Flag_name];
            break;
            case "y":
            Character_Y = Datas[Flag_name];
            break;
            case "向き":
            Character_direction = Datas[Flag_name];
            break;
            default:
            if(Datas[Flag_name].数){
              switch((Datas[Flag_name].数+"").substring(0,1)){
                case "+":
                if(Flag[Flag_name]) Flag[Flag_name].数 += Datas[Flag_name].数*1;
                else{
                  Flag[Flag_name] = JSON.stringify(Datas[Flag_name]);
                  Flag[Flag_name] = JSON.parse(Flag[Flag_name]);
                  Flag[Flag_name].数 = Flag[Flag_name].数.substring(1)*1;
                };
                break;
                case "-":
                if(Flag[Flag_name]) Flag[Flag_name].数 += Datas[Flag_name].数*1;
                else{
                  Flag[Flag_name] = JSON.stringify(Datas[Flag_name]);
                  Flag[Flag_name] = JSON.parse(Flag[Flag_name]);
                  Flag[Flag_name].数 = Flag[Flag_name]*1;
                };
                if(!Flag[Flag_name].数) delete Flag[Flag_name];
                break;
                default:
                Flag[Flag_name] = JSON.stringify(Datas[Flag_name]);
                Flag[Flag_name] = JSON.parse(Flag[Flag_name]);
                break;
              };
            }
            else{
              switch((Datas[Flag_name]+"").substring(0,1)){
                case "+":
                if(Flag[Flag_name]) Flag[Flag_name] += Datas[Flag_name]*1;
                else Flag[Flag_name] = Datas[Flag_name].substring(1)*1;
                break;
                case "-":
                if(Flag[Flag_name]) Flag[Flag_name] += Datas[Flag_name]*1;
                else Flag[Flag_name] = Datas[Flag_name]*1;
                break;
                default:
                switch(Datas[Flag_name]){
                  case 0:
                  case "0":
                  case "消去":
                  case "消滅":
                  case "削除":
                  case "delete":
                  case "Delete":
                  case "デリート":
                  delete Flag[Flag_name];
                  break;
                  case "時刻":
                    Flag[Flag_name] = {時刻:Time(new Date(),{タイプ:"日付",日付:true,時分:true})};
                    break;
                  default:
                    if(Flag[Flag_name]){
                      if(Flag[Flag_name].時刻){
                        Flag[Flag_name].時刻 = new Date(Flag[Flag_name].時刻);
                        Flag[Flag_name].時刻.setMinutes(Flag[Flag_name].時刻.getMinutes()+Datas[Flag_name]);
                        Flag[Flag_name].時刻 = Time(new Date(Flag[Flag_name].時刻),{タイプ:"日付",日付:true,時分:true});
                      }
                      else Flag[Flag_name] = Datas[Flag_name];
                    }
                    else Flag[Flag_name] = Datas[Flag_name];
                    break;
                };
                break;
              };
            };
            break;
          };
        };
      };
      console.log(Flag);
      console.log(Effect_time);
      return;
    };

    function Scene_Check_Scene(Datas){
      if(!Datas) Datas = {データタイプ:"会話",データ:{テキスト:"データが見つかりませんでした。"}};
      if(Datas.フラグ判断){
        for(var I = 0; I < Object.keys(Datas.フラグ判断).length; I++){
          Flag_name = Object.keys(Datas.フラグ判断)[I];
          if(Flag_name=="ランダム") Flag_name = !Math.floor(Math.random()*Datas.フラグ判断[Flag_name]);
          else Flag_name = Flag_judgement(Flag_name,Datas.フラグ判断[Flag_name]);
          if(!Flag_name) break;
        };
        if(I!=Object.keys(Datas.フラグ判断).length){
          if(Datas.フラグ無し) Scene_Check_Scene(Stage_Datas[Datas.フラグ無し]);
          return;
        };
      };
      if(Datas.フラグ獲得) Flag_get(Datas.フラグ獲得);
      switch(Datas.データタイプ){
        case "マップ":
          Stage = Datas.データ名;
          game.pushScene(Blackout_Scene(Datas.データ,Stage));
          break;
        case "マップ処理":
          Move_box = Datas.データ;
          Move_box_length = 0;
          break;
        case "メイン":
          game.replaceScene(Main_Scene(Datas.データ));
          break;
        case "道具使用":
          Use_Item = Datas.データ;
          console.log(Use_Item);
          break;
        case "会話":
          game.pushScene(Chat_Scene(Datas.データ));
          break;
        case "持ち物":
          game.pushScene(Item_Scene(Datas.データ名));
          break;
        default:
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
    if(window.localStorage.getItem("Effect_time")){
      Effect_time = window.localStorage.getItem("Effect_time");
      Effect_time = JSON.parse(Effect_time);
    };
    if(window.localStorage.getItem("Flag")){
      Flag = window.localStorage.getItem("Flag");
      Flag = JSON.parse(Flag);
      if(!Key_settings.決定キー) Key_settings.決定キー = "c";
      if(!Key_settings.加速キー) Key_settings.加速キー = "z";
      if(!Key_settings.停止キー) Key_settings.停止キー = "x";
      if(!Key_settings.メニューキー) Key_settings.メニューキー = "s";
      if(!Key_settings.上キー) Key_settings.上キー = "↑";
      if(!Key_settings.下キー) Key_settings.下キー = "↓";
      if(!Key_settings.左キー) Key_settings.左キー = "←";
      if(!Key_settings.右キー) Key_settings.右キー = "→";
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
        try{
          result[I] = JSON.parse(result[I]);
        }
        catch(e){
          console.log(result[I]);
          break;
        }
        if(result[I].データタイプ=="変換"){
          var Converting_data = result[I].データ;
        }
        else Stage_Datas[result[I].データ名] = result[I];
      }
      else break;
    };

    if(Converting_data){
      var Converting1 = null;
      var Converting2 = null;
      for(var I = 0; I < Object.keys(Stage_Datas).length; I++){
        Converting1 = Stage_Datas[Object.keys(Stage_Datas)[I]];
        Converting1 = JSON.stringify(Converting1);
        for(var J = 0; J < Object.keys(Converting_data).length; J++){
          Converting2 = Object.keys(Converting_data)[J];
          while(Converting1.match(Converting2)){
            Converting1 = Converting1.replace(Converting2,Converting_data[Converting2]);
          };
          Stage_Datas[Object.keys(Stage_Datas)[I]] = JSON.parse(Converting1);
        };
      };
    };

    if(Stage_Datas.テストルーム) Stage_Datas.テストルーム = {フラグ獲得:Stage_Datas.テストルーム.フラグ獲得};
    else Stage_Datas.テストルーム = {};

    Stage_Datas.テストルーム.データ名 = "テストルーム";
    Stage_Datas.テストルーム.データタイプ = "マップ";
    Stage_Datas.テストルーム.データ = {画像:{背景:"image/白.png"}};

    var Test_NPC = 1;

    for(var I = 0; I < Object.keys(Stage_Datas).length; I++){
      if(Stage_Datas[Object.keys(Stage_Datas)[I]].データタイプ=="NPC"){
        Stage_Datas.テストルーム.データ.画像["キャラ"+Test_NPC] = {座標:[Test_NPC,Test_NPC],データ:Object.keys(Stage_Datas)[I]};
        Test_NPC++;
      };
    };
    Test_NPC++;

    Stage_Datas.テストルーム.データ.画像.主人公 = true;
    Stage_Datas.テストルーム.データ.マップ = {作成中:[Test_NPC,Test_NPC]};

    if(!Stage_Datas[Stage]) Stage = "最初";
    Scene_Check_Scene(Stage_Datas[Stage]);
    return;
  },);
};
game.start();
};
