export const categories = [["medical","生命与医疗"],["daily","日常与照护"],["precision","精密与创造"],["civil","土木与建筑"],["industry","制造与装配"],["field","野外与现场"],["sport","运动与对抗"],["mobility","驾驶与操纵"]];
export const challenges = [
  {
    "id": "whipple",
    "category": "medical",
    "title": "Whipple 手术",
    "goal": "独立完成复杂 Whipple 手术：切除、止血、多器官吻合与消化道重建。",
    "difficulty": "解剖变异 · 软组织 · 不可逆损伤",
    "abilities": [
      "精密定位",
      "力与触觉",
      "柔性材料",
      "长程执行",
      "陌生与恢复"
    ],
    "type": "precision"
  },
  {
    "id": "microsurgery",
    "category": "medical",
    "title": "显微血管吻合",
    "goal": "在持续运动的组织上，完成微小血管吻合与神经修复。",
    "difficulty": "微小尺度 · 运动补偿",
    "abilities": [
      "精密定位",
      "力与触觉",
      "柔性材料",
      "动态预测"
    ],
    "type": "precision"
  },
  {
    "id": "catheter",
    "category": "medical",
    "title": "腔道介入",
    "goal": "操纵导丝、导管和内镜穿过复杂人体腔道，完成深部病灶处理。",
    "difficulty": "柔性器械 · 隐藏路径",
    "abilities": [
      "精密定位",
      "力与触觉",
      "柔性材料",
      "陌生与恢复"
    ],
    "type": "precision"
  },
  {
    "id": "dentistry",
    "category": "medical",
    "title": "牙科精密修复",
    "goal": "在狭窄口腔中完成复杂根管治疗与牙体修复，精确恢复形态和咬合。",
    "difficulty": "受限视野 · 精密切削",
    "abilities": [
      "精密定位",
      "力与触觉",
      "动态预测"
    ],
    "type": "precision"
  },
  {
    "id": "home",
    "category": "daily",
    "title": "全屋家务",
    "goal": "接管一个真实家庭的全部家务：做饭、洗衣、套被、清洁、收纳、维修，随时处理意外。",
    "difficulty": "对象混杂 · 长流程 · 打断恢复",
    "abilities": [
      "柔性材料",
      "长程执行",
      "陌生与恢复",
      "力与触觉"
    ],
    "type": "combined"
  },
  {
    "id": "cooking",
    "category": "daily",
    "title": "高峰厨房出餐",
    "goal": "独立承担繁忙餐厅后厨，从精细刀工、面点到多锅炒制，连续完成高质量出餐。",
    "difficulty": "柔性食材 · 火候 · 多任务",
    "abilities": [
      "力与触觉",
      "柔性材料",
      "动态预测",
      "长程执行"
    ],
    "type": "combined"
  },
  {
    "id": "care",
    "category": "daily",
    "title": "穿衣与转移照护",
    "goal": "照护行动不便的人：穿衣、洗浴、喂食、起身、转移，跟随身体与意图变化。",
    "difficulty": "人体接触 · 负载变化",
    "abilities": [
      "力与触觉",
      "全身协调",
      "协作对抗",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "hair",
    "category": "daily",
    "title": "精细理发",
    "goal": "完成高级剪发、编发和精细造型，适应不同发质与人的自然移动。",
    "difficulty": "非刚性对象 · 贴肤操作",
    "abilities": [
      "精密定位",
      "力与触觉",
      "动态预测",
      "协作对抗"
    ],
    "type": "combined"
  },
  {
    "id": "watch",
    "category": "precision",
    "title": "机械表维修",
    "goal": "修复复杂机械表：排查故障、拆装微小齿轮与游丝、复装校准，恢复精准走时。",
    "difficulty": "微小零件 · 弹性结构",
    "abilities": [
      "精密定位",
      "力与触觉",
      "长程执行",
      "陌生与恢复"
    ],
    "type": "precision"
  },
  {
    "id": "electronics",
    "category": "precision",
    "title": "电路板微焊维修",
    "goal": "修好未知故障的精密电子设备：芯片级诊断、微焊返修与整机恢复。",
    "difficulty": "微焊 · 隐藏故障 · 热损伤",
    "abilities": [
      "精密定位",
      "力与触觉",
      "长程执行",
      "陌生与恢复"
    ],
    "type": "precision"
  },
  {
    "id": "lab",
    "category": "precision",
    "title": "微量样品实验",
    "goal": "完成微量移液、单细胞操作与复杂样品处理，在微小尺度保持准确、洁净与可重复。",
    "difficulty": "微量液体 · 污染控制",
    "abilities": [
      "精密定位",
      "柔性材料",
      "长程执行",
      "陌生与恢复"
    ],
    "type": "precision"
  },
  {
    "id": "textile",
    "category": "precision",
    "title": "成衣制作",
    "goal": "从裁剪到成衣，处理丝绸、弹性面料与复杂曲面，完成高级定制服装。",
    "difficulty": "布料形变 · 曲面拼接",
    "abilities": [
      "精密定位",
      "柔性材料",
      "力与触觉",
      "长程执行"
    ],
    "type": "precision"
  },
  {
    "id": "restoration",
    "category": "precision",
    "title": "脆弱器物修复",
    "goal": "修复破碎、老化的珍贵器物：清理、拼合、精细补全，最大程度保留原物。",
    "difficulty": "碎片匹配 · 材料保护",
    "abilities": [
      "精密定位",
      "力与触觉",
      "陌生与恢复",
      "长程执行"
    ],
    "type": "precision"
  },
  {
    "id": "music",
    "category": "precision",
    "title": "乐曲现场合奏",
    "goal": "以音乐家水准演奏高难曲目，与乐队实时合奏，并应对即兴变化。",
    "difficulty": "独立指法 · 时序协同",
    "abilities": [
      "精密定位",
      "动态预测",
      "协作对抗",
      "全身协调"
    ],
    "type": "precision"
  },
  {
    "id": "mechanic",
    "category": "industry",
    "title": "设备现场维修",
    "goal": "在真实现场修复复杂机械：找出复合故障，完成狭窄空间拆装、精密配合与调试。",
    "difficulty": "隐蔽连接 · 力控装配",
    "abilities": [
      "力与触觉",
      "精密定位",
      "长程执行",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "cables",
    "category": "industry",
    "title": "线束装配",
    "goal": "完成复杂设备的线束布设、穿引、压接和盲插，解决缠绕、卡滞与隐藏错接。",
    "difficulty": "线缆缠绕 · 接触可靠性",
    "abilities": [
      "柔性材料",
      "力与触觉",
      "精密定位",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "construction",
    "category": "civil",
    "title": "盖一栋房子",
    "goal": "从地基、主体结构、屋顶，到水电、装修，建成可入住的房子。",
    "difficulty": "多工种协作 · 大件操控 · 精密施工",
    "abilities": [
      "精密定位",
      "力与触觉",
      "全身协调",
      "协作对抗"
    ],
    "type": "combined"
  },
  {
    "id": "welding",
    "category": "industry",
    "title": "空间焊接",
    "goal": "完成高质量复杂空间焊接，实时跟随熔池、接缝变化和热变形。",
    "difficulty": "熔池控制 · 热变形",
    "abilities": [
      "精密定位",
      "动态预测",
      "力与触觉",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "forming",
    "category": "industry",
    "title": "薄壁材料成形",
    "goal": "像顶尖工匠一样拉坯、吹制玻璃，控制不断流动的材料，做出薄壁异形结构。",
    "difficulty": "材料流变 · 实时修形",
    "abilities": [
      "柔性材料",
      "力与触觉",
      "动态预测",
      "全身协调"
    ],
    "type": "combined"
  },
  {
    "id": "agriculture",
    "category": "field",
    "title": "遮挡果实采摘",
    "goal": "在风动枝叶中无损采摘成熟果实，并完成精细嫁接、疏果与修剪。",
    "difficulty": "风动目标 · 易损材料",
    "abilities": [
      "力与触觉",
      "柔性材料",
      "动态预测",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "logistics",
    "category": "field",
    "title": "混杂货物动态分拣",
    "goal": "高速处理混杂货流：抓取软包、异形件和易碎品，连续分拣、交接与稳定装箱。",
    "difficulty": "运动目标 · 未知物性",
    "abilities": [
      "动态预测",
      "力与触觉",
      "全身协调",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "rescue",
    "category": "field",
    "title": "低可见度救援",
    "goal": "在烟尘、废墟与复杂地形中搜索、破障、操作工具，并协同转移伤员。",
    "difficulty": "复杂地形 · 协作负载",
    "abilities": [
      "全身协调",
      "力与触觉",
      "协作对抗",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "extreme",
    "category": "field",
    "title": "水下／航天维修",
    "goal": "在水下或太空完成精密维修：控制漂移、工具反作用力与厚手套下的精细操作。",
    "difficulty": "反作用力 · 受限触觉",
    "abilities": [
      "全身协调",
      "力与触觉",
      "精密定位",
      "陌生与恢复"
    ],
    "type": "combined"
  },
  {
    "id": "basketball",
    "category": "sport",
    "title": "篮球",
    "goal": "与顶尖职业球员同场对抗：突破、传切、投篮、抢篮板，完成高强度攻防。",
    "difficulty": "身体对抗 · 持续控球",
    "abilities": [
      "动态预测",
      "全身协调",
      "协作对抗",
      "力与触觉"
    ],
    "type": "dynamic"
  },
  {
    "id": "volleyball",
    "category": "sport",
    "title": "排球",
    "goal": "参与顶尖水平排球比赛：接发球、二传、扣杀、拦网、救球，连续组织攻防。",
    "difficulty": "短时触球 · 多人配合",
    "abilities": [
      "动态预测",
      "全身协调",
      "协作对抗",
      "精密定位"
    ],
    "type": "dynamic"
  },
  {
    "id": "football",
    "category": "sport",
    "title": "足球",
    "goal": "在顶尖职业比赛中完成停球、盘带、传射、逼抢与攻防转换。",
    "difficulty": "脚部控球 · 空间对抗",
    "abilities": [
      "动态预测",
      "全身协调",
      "协作对抗",
      "力与触觉"
    ],
    "type": "dynamic"
  },
  {
    "id": "table-tennis",
    "category": "sport",
    "title": "乒乓球",
    "goal": "对抗世界级乒乓球选手，处理高速旋转、落点变化、假动作和连续攻防。",
    "difficulty": "高速接触 · 旋转判断",
    "abilities": [
      "精密定位",
      "动态预测",
      "协作对抗",
      "陌生与恢复"
    ],
    "type": "dynamic"
  },
  {
    "id": "racket",
    "category": "sport",
    "title": "网球／羽毛球",
    "goal": "在职业级网球或羽毛球比赛中，完成高速跑动、极限救球、精准击球与战术对抗。",
    "difficulty": "大范围移动 · 高速击球",
    "abilities": [
      "动态预测",
      "全身协调",
      "协作对抗",
      "精密定位"
    ],
    "type": "dynamic"
  },
  {
    "id": "baseball",
    "category": "sport",
    "title": "棒球／垒球",
    "goal": "击中顶级投手的变化球，完成高速移动接杀与精准传接配合。",
    "difficulty": "轨迹预测 · 短时窗口",
    "abilities": [
      "动态预测",
      "全身协调",
      "精密定位",
      "协作对抗"
    ],
    "type": "dynamic"
  },
  {
    "id": "climbing",
    "category": "sport",
    "title": "动态攀岩",
    "goal": "完成高难度未知攀岩路线：微小抓点、动态跳跃、重心转换与滑移恢复。",
    "difficulty": "接触切换 · 全身平衡",
    "abilities": [
      "力与触觉",
      "全身协调",
      "动态预测",
      "陌生与恢复"
    ],
    "type": "dynamic"
  },
  {
    "id": "driving",
    "category": "mobility",
    "title": "道路驾驶",
    "goal": "像顶尖驾驶员一样应对复杂城市混行、恶劣天气、极限避险和高速操控。",
    "difficulty": "交通协商 · 长尾事件",
    "abilities": [
      "动态预测",
      "协作对抗",
      "陌生与恢复",
      "长程执行"
    ],
    "type": "dynamic"
  },
  {
    "id": "flight",
    "category": "mobility",
    "title": "异常条件飞行",
    "goal": "在侧风、湍流、低能见度与设备故障中稳定操纵飞机，完成精确进近和着陆。",
    "difficulty": "高速系统 · 故障恢复",
    "abilities": [
      "动态预测",
      "精密定位",
      "长程执行",
      "陌生与恢复"
    ],
    "type": "dynamic"
  },
  {
    "id": "marine-crane",
    "category": "mobility",
    "title": "船舶靠泊／动态吊装",
    "goal": "在风浪与摆动中精确靠泊、吊装，把巨大惯性的船舶和重物准确送到目标位置。",
    "difficulty": "大惯性 · 运动负载",
    "abilities": [
      "动态预测",
      "力与触觉",
      "精密定位",
      "协作对抗"
    ],
    "type": "dynamic"
  },
  {
    "id": "neurosurgery",
    "category": "medical",
    "title": "神经外科手术",
    "goal": "完成脑肿瘤切除等神经外科操作，保护周围神经、血管和脑功能区。",
    "difficulty": "脆弱组织 · 精细分离 · 功能保护",
    "abilities": [
      "精密定位",
      "力与触觉",
      "长程执行",
      "陌生与恢复"
    ],
    "type": "precision"
  },
  {
    "id": "infant-care",
    "category": "daily",
    "title": "婴幼儿照护",
    "goal": "新生儿沐浴护理 · 医院示范",
    "difficulty": "活体接触 · 力控协调",
    "abilities": [
      "力与触觉",
      "精密定位",
      "动态预测",
      "全身协调"
    ],
    "type": "combined"
  },
  {
    "id": "animal-care",
    "category": "daily",
    "title": "动物护理",
    "goal": "犬只洗护与毛发修整",
    "difficulty": "活体接触 · 力控协调",
    "abilities": [
      "力与触觉",
      "精密定位",
      "动态预测",
      "全身协调"
    ],
    "type": "combined"
  },
  {
    "id": "farriery",
    "category": "field",
    "title": "修蹄钉马掌",
    "goal": "重型马修蹄与热钉马掌",
    "difficulty": "活体接触 · 力控协调",
    "abilities": [
      "力与触觉",
      "精密定位",
      "动态预测",
      "全身协调"
    ],
    "type": "combined"
  }
];
