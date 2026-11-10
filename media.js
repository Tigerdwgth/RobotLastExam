// All 37 challenges have real video examples. Metadata checked with YouTube oEmbed on 2026-10-16.
const youtube=(id,title,publisher)=>({kind:'video',id,title,publisher,url:`https://www.youtube.com/watch?v=${id}`,thumbnail:`./assets/thumbnails/${id}.jpg`});
export const media={
 construction:[youtube('d7e6IOdKfVw','从地基到完工','Essential Craftsman')],
 whipple:[youtube('KwkMCucV9Xc','腹腔镜 Whipple 手术现场','Mayo Clinic')],
 home:[youtube('Rn-nRqcuAwg','重度脏乱住宅深度清洁','Aurikatariina')],
 cooking:[youtube('zDtVGvK7ChY','Joon 餐厅后厨出餐','Eater')],
 watch:[youtube('CZsp3UawND8','Spring Drive 机芯手工装配','Grand Seiko USA')],
 forming:[youtube('LHzuEmxsmyU','Pino Signoretto 玻璃塑形','Corning Museum of Glass')],
 basketball:[youtube('itDmpH_QCQQ','库里 · 2022 总决赛 G4','Golden State Warriors')],
 volleyball:[youtube('X2iy7d_89tI','波兰 × 法国 · 2024 VNL','Volleyball World')],
 football:[youtube('zhEWqfP6V_w','阿根廷 × 法国 · 2022 世界杯决赛','FIFA')],
 'table-tennis':[youtube('QJiaKe2Kggo','马龙 × 樊振东 · 2019 总决赛','World Table Tennis')],
 driving:[youtube('7gv6AdJateE','瑞典冰雪赛段 · 驾驶舱实录','FIA World Rally Championship')]
};

Object.assign(media,{
 "textile":[youtube("qE5alpJ-bVo","Dior 高级定制手工刺绣","Christian Dior")],
 "restoration":[youtube("OLxDD1xsjHw","开裂木板油画修复","Baumgartner Restoration")],
 "music":[youtube("JJ25kOkpCdc","王羽佳 × 柏林爱乐 · 普罗科菲耶夫第三协奏曲","Berliner Philharmoniker")],
 "racket":[youtube("f8YEiCAPAbg","费德勒 × 纳达尔 · 2008 温网决赛","Wimbledon")],
 "baseball":[youtube("rlshprVLaLw","大谷翔平 × 特劳特 · 2023 WBC 决胜对决","MLB")],
 "climbing":[youtube("NAZycE9agy4","2021 攀岩世锦赛 · 女子抱石决赛","World Climbing")],
 "flight":[youtube("EMIMkR7VhEI","波音 777 · 风雪夜间着陆驾驶舱实录","High Pressure Aviation Films")],
 "microsurgery":[youtube("89DsEIf_h_M","显微血管端侧吻合","SciTeMed Publishing Group")],
 "catheter":[youtube("iEyqdQ_Iddc","ERCP 内镜取石","Olympus Corporation")],
 "dentistry":[youtube("LsnL-qXCe-w","显微镜下根管治疗","Smile Influencers")],
 "care":[youtube("pAJmtKqoKJc","床与轮椅之间的照护转移 · 真人演示","SingHealth")],
 "hair":[youtube("eloiyuiVY1Q","精细波波头剪裁","Sanja Carica Karasman")],
 "lab":[youtube("9YzBK8apzgU","单细胞显微注射","EuroCARE IVF Center Cyprus")],
 "electronics":[youtube("lJv3rzT1z90","iPad 电路板微焊维修","iPad Rehab Microsoldering & Data Recovery")],
 "mechanic":[youtube("dALX_16YIe4","推土机柴油发动机拆修","Amazing Things Official")],
 "cables":[youtube("TTebZ3qU9sQ","线束手工装配","Assembly Solutions")],
 "welding":[youtube("cGoybWZjSis","6G 全位置管道焊接","weldingtipsandtricks")],
 "agriculture":[youtube("7A5Jg2_OZ0M","果树嫁接与成活记录","Graft & Grow")],
 "logistics":[youtube("c5olpIAToX0","包裹分拣与装车实录","Go Four Yourself")],
 "rescue":[youtube("HzjEFxEQBtg","建筑坍塌搜救演练","West Metro Fire Rescue")],
 "extreme":[youtube("RYPk8fz_SbE","空间站舱外维修","NASA")],
 "marine-crane":[youtube("kCfnUJuv2iY","港口双机协同重载吊装","Liebherr")]
});

media.neurosurgery=[youtube("45J6cPkAiUs","清醒开颅胶质瘤切除 · 病例演示","Johns Hopkins Medicine")];

// Added real care examples, metadata verified 2026-11-10.
media["infant-care"]=[youtube("0GfOv7XvKYM","新生儿沐浴护理 · 医院示范","SingHealth")];
media["animal-care"]=[youtube("goCAdbCUlLg","犬只洗护与毛发修整","Girl With The Dogs 2")];
media["farriery"]=[youtube("BmT-I-pzcaI","重型马修蹄与热钉马掌","Robert Piessens")];
