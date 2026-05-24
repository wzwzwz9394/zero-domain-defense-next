const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

const COLS = 20;
const ROWS = 14;
const TILE = 48;
const MAPS = [
  {
    id: "plain",
    name: "零域平原",
    badge: "经典",
    difficulty: "均衡",
    description: "右侧核心、三路入口和零散岩障，适合练习自由造路。",
    core: { x: 19, y: 7 },
    entries: [
      { x: 0, y: 3, name: "西北入口" },
      { x: 0, y: 10, name: "西南入口" },
      { x: 7, y: 0, name: "北侧裂口" },
    ],
    blocks: [
      [5, 2],
      [6, 2],
      [13, 2],
      [14, 2],
      [3, 5],
      [4, 5],
      [9, 5],
      [10, 5],
      [15, 5],
      [6, 8],
      [7, 8],
      [12, 8],
      [3, 11],
      [14, 11],
      [15, 11],
    ],
    background: ["#111b1d", "#1b1713"],
    blockColor: "#263032",
  },
  {
    id: "canyon",
    name: "折线峡谷",
    badge: "长廊",
    difficulty: "直线",
    description: "多道纵向岩壁制造天然长廊，激光塔和穿甲塔更容易发挥。",
    core: { x: 19, y: 6 },
    entries: [
      { x: 0, y: 2, name: "峡谷上口" },
      { x: 0, y: 11, name: "峡谷下口" },
      { x: 10, y: 0, name: "北桥落点" },
    ],
    blocks: [
      [4, 1],
      [4, 2],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 10],
      [8, 11],
      [12, 1],
      [12, 2],
      [12, 3],
      [12, 5],
      [12, 6],
      [12, 7],
      [12, 8],
      [16, 4],
      [16, 5],
      [16, 7],
      [16, 8],
      [16, 9],
      [16, 10],
      [16, 11],
    ],
    background: ["#15191f", "#221812"],
    blockColor: "#343238",
  },
  {
    id: "ruins",
    name: "环形废墟",
    badge: "包围",
    difficulty: "多向",
    description: "核心在地图中央，敌人从两侧夹击，炮塔阵地需要更紧凑。",
    core: { x: 10, y: 7 },
    entries: [
      { x: 0, y: 6, name: "西侧塌口" },
      { x: 19, y: 3, name: "东北断墙" },
      { x: 19, y: 11, name: "东南断墙" },
    ],
    blocks: [
      [8, 4],
      [9, 4],
      [10, 4],
      [11, 4],
      [12, 4],
      [8, 10],
      [9, 10],
      [10, 10],
      [11, 10],
      [12, 10],
      [7, 5],
      [7, 6],
      [7, 8],
      [7, 9],
      [13, 5],
      [13, 6],
      [13, 8],
      [13, 9],
      [3, 2],
      [4, 2],
      [15, 2],
      [16, 2],
      [3, 11],
      [4, 11],
      [15, 12],
      [16, 12],
    ],
    background: ["#12191a", "#161b23"],
    blockColor: "#2c3436",
  },
  {
    id: "bridges",
    name: "裂桥冻原",
    badge: "高压",
    difficulty: "分层",
    description: "横向断桥把战线切成三层，冲击波塔和冰霜塔很适合守桥口。",
    core: { x: 18, y: 12 },
    entries: [
      { x: 0, y: 1, name: "冻原北线" },
      { x: 0, y: 12, name: "冻原南线" },
      { x: 12, y: 0, name: "上层裂口" },
    ],
    blocks: [
      [2, 3],
      [3, 3],
      [4, 3],
      [6, 3],
      [7, 3],
      [8, 3],
      [9, 3],
      [10, 3],
      [12, 3],
      [13, 3],
      [14, 3],
      [15, 3],
      [17, 3],
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
      [5, 7],
      [6, 7],
      [7, 7],
      [8, 7],
      [9, 7],
      [11, 7],
      [12, 7],
      [13, 7],
      [5, 10],
      [6, 10],
      [8, 10],
      [9, 10],
      [10, 10],
      [11, 10],
      [12, 10],
      [14, 10],
      [15, 10],
      [16, 10],
      [17, 10],
      [19, 10],
    ],
    background: ["#101820", "#141c1d"],
    blockColor: "#273840",
  },
  {
    id: "delta",
    name: "三角洲泵站",
    badge: "分流",
    difficulty: "开阔",
    description: "岛状障碍把三路敌人分散成多段小弯，适合练习火力覆盖交叠。",
    core: { x: 17, y: 7 },
    entries: [
      { x: 0, y: 2, name: "上游水闸" },
      { x: 0, y: 11, name: "下游水闸" },
      { x: 9, y: 0, name: "北侧泵井" },
    ],
    blocks: [
      [4, 1],
      [5, 1],
      [6, 1],
      [9, 2],
      [9, 3],
      [3, 4],
      [4, 4],
      [7, 4],
      [8, 4],
      [9, 5],
      [11, 4],
      [12, 4],
      [5, 6],
      [6, 6],
      [10, 6],
      [13, 6],
      [14, 6],
      [2, 8],
      [3, 8],
      [7, 8],
      [8, 8],
      [11, 9],
      [12, 9],
      [5, 11],
      [6, 11],
      [14, 11],
      [15, 11],
    ],
    background: ["#0f1b1f", "#172016"],
    blockColor: "#263a38",
  },
  {
    id: "mirror",
    name: "镜像回廊",
    badge: "对称",
    difficulty: "长线",
    description: "三道竖墙交错留口，天然形成长距离走廊，直线塔更容易找到角度。",
    core: { x: 19, y: 7 },
    entries: [
      { x: 0, y: 2, name: "镜面上廊" },
      { x: 0, y: 11, name: "镜面下廊" },
      { x: 10, y: 13, name: "南侧回声口" },
    ],
    blocks: [
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 8],
      [5, 9],
      [5, 10],
      [5, 11],
      [5, 12],
      [7, 6],
      [8, 6],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 5],
      [10, 8],
      [10, 9],
      [10, 10],
      [10, 11],
      [12, 7],
      [13, 7],
      [15, 1],
      [15, 2],
      [15, 3],
      [15, 4],
      [15, 5],
      [15, 8],
      [15, 9],
      [15, 10],
      [15, 11],
      [15, 12],
    ],
    background: ["#111a22", "#18171e"],
    blockColor: "#303745",
  },
  {
    id: "crossmine",
    name: "十字矿井",
    badge: "交汇",
    difficulty: "中心",
    description: "核心附近有十字形矿柱，左右两线会在中心火力区前后错位。",
    core: { x: 10, y: 7 },
    entries: [
      { x: 0, y: 7, name: "西侧矿轨" },
      { x: 19, y: 7, name: "东侧矿轨" },
      { x: 10, y: 0, name: "竖井坠口" },
    ],
    blocks: [
      [4, 4],
      [4, 5],
      [4, 9],
      [4, 10],
      [6, 7],
      [7, 5],
      [8, 5],
      [7, 9],
      [8, 9],
      [9, 3],
      [10, 3],
      [11, 3],
      [9, 11],
      [10, 11],
      [11, 11],
      [12, 5],
      [13, 5],
      [12, 9],
      [13, 9],
      [14, 7],
      [16, 4],
      [16, 5],
      [16, 9],
      [16, 10],
    ],
    background: ["#171715", "#111c1b"],
    blockColor: "#38342c",
  },
  {
    id: "fogharbor",
    name: "雾港码头",
    badge: "码头",
    difficulty: "折返",
    description: "横向栈桥迫使敌人多次改向，重炮和冲击波守桥口会很舒服。",
    core: { x: 18, y: 3 },
    entries: [
      { x: 0, y: 12, name: "西南泊位" },
      { x: 0, y: 5, name: "雾港闸口" },
      { x: 10, y: 13, name: "南侧货梯" },
    ],
    blocks: [
      [2, 2],
      [3, 2],
      [4, 2],
      [6, 2],
      [7, 2],
      [8, 2],
      [10, 2],
      [10, 3],
      [10, 4],
      [11, 5],
      [12, 5],
      [13, 5],
      [14, 5],
      [16, 5],
      [3, 8],
      [4, 8],
      [5, 8],
      [7, 8],
      [8, 8],
      [9, 8],
      [10, 8],
      [13, 10],
      [14, 10],
      [15, 10],
      [16, 10],
      [5, 11],
      [6, 11],
      [7, 11],
    ],
    background: ["#101b20", "#171b19"],
    blockColor: "#253840",
  },
  {
    id: "spiral",
    name: "螺旋沙场",
    badge: "螺旋",
    difficulty: "绕行",
    description: "外圈和内圈墙体制造螺旋感，路线长但建塔点需要精打细算。",
    core: { x: 15, y: 7 },
    entries: [
      { x: 0, y: 7, name: "西侧沙门" },
      { x: 19, y: 1, name: "东北沙门" },
      { x: 19, y: 13, name: "东南沙门" },
    ],
    blocks: [
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
      [8, 2],
      [9, 2],
      [10, 2],
      [11, 2],
      [12, 2],
      [13, 2],
      [14, 2],
      [15, 2],
      [16, 2],
      [3, 3],
      [16, 3],
      [3, 4],
      [16, 4],
      [3, 5],
      [7, 5],
      [8, 5],
      [9, 5],
      [10, 5],
      [11, 5],
      [12, 5],
      [16, 5],
      [3, 6],
      [7, 6],
      [12, 6],
      [16, 6],
      [7, 8],
      [12, 8],
      [16, 8],
      [3, 8],
      [3, 9],
      [7, 9],
      [8, 9],
      [9, 9],
      [10, 9],
      [11, 9],
      [12, 9],
      [16, 9],
      [3, 10],
      [16, 10],
      [3, 11],
      [16, 11],
      [3, 12],
      [4, 12],
      [5, 12],
      [6, 12],
      [7, 12],
      [8, 12],
      [9, 12],
      [10, 12],
      [11, 12],
      [12, 12],
      [13, 12],
      [14, 12],
      [15, 12],
      [16, 12],
    ],
    background: ["#1b1811", "#141b1a"],
    blockColor: "#3b3324",
  },
  {
    id: "faultline",
    name: "双核断层",
    badge: "断层",
    difficulty: "错位",
    description: "斜向断层把上下路线切开，敌人会在核心前重新汇合。",
    core: { x: 18, y: 6 },
    entries: [
      { x: 0, y: 2, name: "上层裂缝" },
      { x: 0, y: 11, name: "下层裂缝" },
      { x: 9, y: 13, name: "南部断井" },
    ],
    blocks: [
      [4, 1],
      [4, 2],
      [4, 3],
      [5, 4],
      [5, 5],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [13, 3],
      [14, 3],
      [16, 2],
      [16, 3],
      [16, 4],
      [12, 7],
      [12, 8],
      [12, 9],
      [12, 10],
      [12, 11],
      [16, 8],
      [16, 9],
      [16, 10],
      [3, 9],
      [4, 9],
      [5, 9],
      [9, 10],
      [10, 10],
      [11, 10],
    ],
    background: ["#171719", "#211612"],
    blockColor: "#342f35",
  },
  {
    id: "furnace",
    name: "北境熔炉",
    badge: "横阵",
    difficulty: "分层",
    description: "多层横向炉墙把地图切成阶梯，适合在缺口处做集中控场。",
    core: { x: 10, y: 13 },
    entries: [
      { x: 0, y: 1, name: "西北风口" },
      { x: 19, y: 1, name: "东北风口" },
      { x: 10, y: 0, name: "炉顶落口" },
    ],
    blocks: [
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3],
      [7, 3],
      [13, 3],
      [14, 3],
      [15, 3],
      [16, 3],
      [17, 3],
      [1, 6],
      [2, 6],
      [3, 6],
      [4, 6],
      [8, 6],
      [9, 6],
      [10, 6],
      [11, 6],
      [15, 6],
      [16, 6],
      [17, 6],
      [18, 6],
      [3, 9],
      [4, 9],
      [5, 9],
      [6, 9],
      [7, 9],
      [12, 9],
      [13, 9],
      [14, 9],
      [15, 9],
      [16, 9],
      [6, 11],
      [7, 11],
      [13, 11],
      [14, 11],
    ],
    background: ["#15191b", "#22150f"],
    blockColor: "#3a2f2a",
  },
  {
    id: "frostridge",
    name: "霜脊岔路",
    badge: "斜岭",
    difficulty: "切割",
    description: "斜向冰脊切开前半场，入口之间距离近但汇合点很靠后。",
    core: { x: 19, y: 10 },
    entries: [
      { x: 0, y: 2, name: "西北雪口" },
      { x: 0, y: 7, name: "西侧冰洞" },
      { x: 4, y: 13, name: "南部雪径" },
    ],
    blocks: [
      [6, 1],
      [7, 1],
      [8, 2],
      [9, 2],
      [3, 3],
      [4, 3],
      [11, 3],
      [12, 3],
      [5, 4],
      [6, 4],
      [14, 4],
      [15, 4],
      [7, 5],
      [8, 5],
      [16, 5],
      [17, 5],
      [9, 6],
      [10, 6],
      [11, 7],
      [12, 7],
      [13, 8],
      [14, 8],
      [15, 9],
      [16, 9],
      [5, 10],
      [6, 10],
      [7, 10],
      [9, 11],
      [10, 11],
      [11, 11],
      [13, 12],
      [14, 12],
    ],
    background: ["#0f1a22", "#14201c"],
    blockColor: "#29414a",
  },
  {
    id: "tidal",
    name: "潮汐电站",
    badge: "棋格",
    difficulty: "疏密",
    description: "点阵式机组让路线有大量微调空间，适合玩自由造路和光环阵地。",
    core: { x: 18, y: 7 },
    entries: [
      { x: 0, y: 6, name: "西侧闸门" },
      { x: 9, y: 0, name: "北部潮孔" },
      { x: 9, y: 13, name: "南部潮孔" },
    ],
    blocks: [
      [4, 2],
      [5, 2],
      [7, 2],
      [8, 2],
      [12, 2],
      [13, 2],
      [3, 4],
      [6, 4],
      [9, 4],
      [12, 4],
      [15, 4],
      [4, 6],
      [5, 6],
      [7, 6],
      [8, 6],
      [11, 6],
      [12, 6],
      [3, 8],
      [6, 8],
      [9, 8],
      [13, 8],
      [16, 8],
      [4, 10],
      [5, 10],
      [8, 10],
      [11, 10],
      [12, 10],
      [15, 10],
      [7, 12],
      [8, 12],
      [12, 12],
      [13, 12],
    ],
    background: ["#101c1f", "#141822"],
    blockColor: "#253743",
  },
  {
    id: "courtyard",
    name: "回声庭院",
    badge: "环庭",
    difficulty: "包夹",
    description: "中心庭院留出四个缺口，敌人会从角落和侧翼同时压进来。",
    core: { x: 10, y: 7 },
    entries: [
      { x: 0, y: 0, name: "西北庭门" },
      { x: 0, y: 13, name: "西南庭门" },
      { x: 19, y: 7, name: "东侧正门" },
    ],
    blocks: [
      [3, 2],
      [4, 2],
      [5, 2],
      [15, 2],
      [16, 2],
      [17, 2],
      [7, 4],
      [8, 4],
      [9, 4],
      [11, 4],
      [12, 4],
      [13, 4],
      [6, 5],
      [14, 5],
      [6, 6],
      [14, 6],
      [6, 8],
      [14, 8],
      [6, 9],
      [14, 9],
      [7, 10],
      [8, 10],
      [9, 10],
      [11, 10],
      [12, 10],
      [13, 10],
      [3, 12],
      [4, 12],
      [5, 12],
      [15, 12],
      [16, 12],
      [17, 12],
    ],
    background: ["#141a18", "#171620"],
    blockColor: "#313a36",
  },
  {
    id: "skybridge",
    name: "裂谷天桥",
    badge: "桥口",
    difficulty: "桥战",
    description: "两条横向裂谷只留少数桥口，冲击波和冰霜塔能卡出漂亮节奏。",
    core: { x: 19, y: 2 },
    entries: [
      { x: 0, y: 12, name: "西南谷底" },
      { x: 0, y: 6, name: "西侧桥头" },
      { x: 12, y: 13, name: "南桥升降台" },
    ],
    blocks: [
      [6, 1],
      [7, 1],
      [8, 1],
      [15, 1],
      [16, 1],
      [11, 2],
      [12, 2],
      [13, 2],
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 4],
      [7, 4],
      [8, 4],
      [9, 4],
      [10, 4],
      [12, 4],
      [13, 4],
      [14, 4],
      [15, 4],
      [17, 4],
      [3, 8],
      [4, 8],
      [5, 8],
      [6, 8],
      [8, 8],
      [9, 8],
      [10, 8],
      [11, 8],
      [13, 8],
      [14, 8],
      [15, 8],
      [16, 8],
      [18, 8],
      [6, 11],
      [7, 11],
      [8, 11],
      [15, 11],
      [16, 11],
    ],
    background: ["#101820", "#201814"],
    blockColor: "#2b343c",
  },
  {
    id: "station",
    name: "黑匣车站",
    badge: "站台",
    difficulty: "平台",
    description: "多排站台将路线切成短直线，穿甲塔和激光塔都能找到发挥点。",
    core: { x: 18, y: 11 },
    entries: [
      { x: 0, y: 1, name: "北站入口" },
      { x: 0, y: 12, name: "南站入口" },
      { x: 19, y: 4, name: "东侧货线" },
    ],
    blocks: [
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [10, 2],
      [11, 2],
      [12, 2],
      [13, 2],
      [2, 5],
      [3, 5],
      [4, 5],
      [8, 5],
      [9, 5],
      [10, 5],
      [14, 5],
      [15, 5],
      [16, 5],
      [5, 8],
      [6, 8],
      [7, 8],
      [11, 8],
      [12, 8],
      [13, 8],
      [17, 8],
      [18, 8],
      [2, 10],
      [3, 10],
      [7, 10],
      [8, 10],
      [12, 10],
      [13, 10],
      [16, 10],
      [5, 12],
      [6, 12],
      [10, 12],
      [11, 12],
    ],
    background: ["#12171c", "#141516"],
    blockColor: "#30353a",
  },
  {
    id: "redring",
    name: "赤环盆地",
    badge: "反向",
    difficulty: "内守",
    description: "核心偏左，敌人从右侧和顶部压入，常规建塔习惯会被反过来考验。",
    core: { x: 5, y: 7 },
    entries: [
      { x: 19, y: 2, name: "东北赤门" },
      { x: 19, y: 12, name: "东南赤门" },
      { x: 10, y: 0, name: "北侧天坑" },
    ],
    blocks: [
      [3, 2],
      [4, 2],
      [5, 2],
      [7, 3],
      [8, 3],
      [9, 3],
      [10, 3],
      [11, 3],
      [12, 3],
      [6, 4],
      [13, 4],
      [6, 5],
      [13, 5],
      [6, 6],
      [13, 6],
      [15, 6],
      [16, 6],
      [6, 8],
      [13, 8],
      [15, 8],
      [16, 8],
      [6, 9],
      [13, 9],
      [6, 10],
      [13, 10],
      [7, 11],
      [8, 11],
      [9, 11],
      [10, 11],
      [11, 11],
      [12, 11],
      [3, 12],
      [4, 12],
      [5, 12],
    ],
    background: ["#201411", "#151a18"],
    blockColor: "#3b2d2a",
  },
  {
    id: "hourglass",
    name: "沙漏矩阵",
    badge: "沙漏",
    difficulty: "压缩",
    description: "斜向障碍把战场压成沙漏形，中线交汇处是最关键的火力点。",
    core: { x: 10, y: 7 },
    entries: [
      { x: 0, y: 3, name: "西北通道" },
      { x: 0, y: 10, name: "西南通道" },
      { x: 19, y: 7, name: "东侧高门" },
    ],
    blocks: [
      [5, 1],
      [14, 1],
      [6, 2],
      [13, 2],
      [7, 3],
      [12, 3],
      [8, 4],
      [11, 4],
      [9, 5],
      [10, 5],
      [4, 6],
      [5, 6],
      [6, 6],
      [15, 6],
      [16, 6],
      [3, 8],
      [4, 8],
      [14, 8],
      [15, 8],
      [16, 8],
      [9, 9],
      [10, 9],
      [8, 10],
      [11, 10],
      [7, 11],
      [12, 11],
      [6, 12],
      [13, 12],
      [5, 13],
      [14, 13],
    ],
    background: ["#1c1712", "#111b1d"],
    blockColor: "#3a332b",
  },
  {
    id: "stargate",
    name: "星门走廊",
    badge: "纵廊",
    difficulty: "长廊",
    description: "四道纵向门墙连续错位，强迫敌人走出多段长直线。",
    core: { x: 19, y: 7 },
    entries: [
      { x: 0, y: 1, name: "西北星门" },
      { x: 0, y: 13, name: "西南星门" },
      { x: 10, y: 0, name: "北部星井" },
    ],
    blocks: [
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 9],
      [4, 10],
      [4, 11],
      [4, 12],
      [6, 6],
      [6, 12],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 7],
      [8, 8],
      [8, 9],
      [8, 10],
      [8, 11],
      [10, 6],
      [10, 12],
      [12, 2],
      [12, 3],
      [12, 4],
      [12, 5],
      [12, 9],
      [12, 10],
      [12, 11],
      [12, 12],
      [14, 6],
      [16, 1],
      [16, 2],
      [16, 3],
      [16, 4],
      [16, 8],
      [16, 9],
      [16, 10],
      [16, 11],
    ],
    background: ["#111722", "#16171b"],
    blockColor: "#2c3446",
  },
  {
    id: "terminal",
    name: "终端迷城",
    badge: "终端",
    difficulty: "复杂",
    description: "密集但不封死的终端街区，考验路线预览、塔位选择和升级节奏。",
    core: { x: 18, y: 7 },
    entries: [
      { x: 0, y: 2, name: "西北终端" },
      { x: 0, y: 11, name: "西南终端" },
      { x: 10, y: 13, name: "南侧终端" },
    ],
    blocks: [
      [3, 1],
      [4, 1],
      [5, 1],
      [9, 1],
      [10, 1],
      [11, 1],
      [15, 1],
      [16, 1],
      [2, 4],
      [3, 4],
      [6, 4],
      [7, 4],
      [8, 4],
      [12, 4],
      [13, 4],
      [16, 4],
      [17, 4],
      [18, 4],
      [5, 6],
      [6, 6],
      [10, 6],
      [11, 6],
      [14, 6],
      [15, 6],
      [2, 8],
      [3, 8],
      [7, 8],
      [8, 8],
      [11, 8],
      [12, 8],
      [16, 8],
      [17, 8],
      [4, 10],
      [5, 10],
      [8, 10],
      [9, 10],
      [13, 10],
      [14, 10],
      [18, 10],
      [6, 12],
      [7, 12],
      [12, 12],
      [13, 12],
      [15, 12],
    ],
    background: ["#111617", "#1a1519"],
    blockColor: "#30353b",
  },
];

let CORE = { ...MAPS[0].core };
let ENTRIES = MAPS[0].entries.map((entry) => ({ ...entry }));
let STATIC_BLOCKS = blockSet(MAPS[0].blocks);
let ACTIVE_MAP = MAPS[0];

const TOWER_TYPES = {
  gun: {
    name: "速射塔",
    cost: 45,
    range: 118,
    damage: 11,
    fireRate: 4.2,
    color: "#6bd39a",
    text: "便宜、射速快，适合拉长路线后持续削血。",
  },
  cannon: {
    name: "重炮塔",
    cost: 80,
    range: 128,
    damage: 38,
    fireRate: 0.85,
    splash: 46,
    color: "#efc75e",
    text: "范围爆炸，适合打密集弯道。",
  },
  ice: {
    name: "冰霜塔",
    cost: 65,
    range: 112,
    damage: 5,
    fireRate: 1.3,
    frostRadius: 46,
    slow: 0.48,
    slowTime: 1.7,
    color: "#62c8dc",
    text: "输出很低，但能把死亡走廊变成真正的陷阱。",
  },
  pierce: {
    name: "穿甲塔",
    cost: 95,
    range: 150,
    damage: 44,
    fireRate: 1.05,
    pierce: true,
    color: "#f07f62",
    text: "单发高伤，克制装甲怪和指挥怪。",
  },
  laser: {
    name: "激光塔",
    cost: 105,
    range: 118,
    damage: 24,
    fireRate: 1.05,
    rayLength: 258,
    beamWidth: 15,
    laser: true,
    color: "#f472b6",
    text: "索敌范围不大，但会沿目标方向打出射线，适合清理直线队列。",
  },
  shock: {
    name: "冲击波塔",
    cost: 90,
    range: 112,
    damage: 20,
    fireRate: 0.46,
    stunChance: 0.36,
    stunTime: 0.75,
    shockwave: true,
    color: "#b8f06a",
    text: "周期性释放冲击波，造成范围伤害并有概率眩晕敌人。",
  },
  aura: {
    name: "光环塔",
    cost: 115,
    range: 106,
    damage: 0,
    fireRate: 0,
    aura: true,
    color: "#c4b5fd",
    text: "不直接攻击，按塔种为范围内炮塔提供射程、射速或伤害增益。",
  },
};

const TOWER_ORDER = ["gun", "cannon", "ice", "pierce", "laser", "shock", "aura"];

const TOWER_GUIDES = {
  gun: {
    role: "持续单体输出",
    upgrade: "射程、伤害和射速同步成长，吃光环后清杂能力很稳定。",
    tactic: "适合铺在长路旁边，也适合吃光环塔的频率增益。",
  },
  cannon: {
    role: "范围爆破",
    upgrade: "升级提高射程、伤害和爆炸半径，满级更适合守弯道。",
    tactic: "放在敌人聚集或转弯处，比放在直道尽头更划算。",
  },
  ice: {
    role: "减速控场",
    upgrade: "升级会提高减速百分比，并扩大冰爆半径。",
    tactic: "和重炮、激光、冲击波放在同一区域，可以把敌人留在火力区。",
  },
  pierce: {
    role: "高伤穿甲",
    upgrade: "升级提高射程和单发伤害，光环下可以承担精英处理。",
    tactic: "适合打装甲怪和 Boss，放在能覆盖长路线的位置。",
  },
  laser: {
    role: "直线群伤",
    upgrade: "升级提升索敌范围、射线长度、光束宽度和伤害。",
    tactic: "适合玩家主动造出长直线走廊，让一束光穿过一整队敌人。",
  },
  shock: {
    role: "周期控制",
    upgrade: "升级提升范围、伤害、眩晕概率和眩晕时长。",
    tactic: "放在敌人必经的密集区，和冰霜塔叠在一起能显著拖慢节奏。",
  },
  aura: {
    role: "阵地增益",
    upgrade: "升级扩大光环范围，提高主增益；满级会附带第二项小增益。",
    tactic: "它本身不攻击，最好放在多座输出塔之间，避免只覆盖一座塔。",
  },
};

const TOWER_LEVEL_SCALING = {
  range: 0.14,
  damage: 0.48,
  fireRate: 0.22,
  splash: 0.1,
  frostRadius: 0.12,
  slowPercent: 0.1,
  rayLength: 0.16,
  beamWidth: 0.18,
  stunChance: 0.28,
  stunTime: 0.18,
};

const ENEMY_TYPES = {
  grunt: {
    name: "普通虫群",
    hp: 68,
    speed: 37,
    reward: 7,
    color: "#75d88f",
    className: "",
  },
  fast: {
    name: "高速怪",
    hp: 48,
    speed: 68,
    reward: 8,
    color: "#69d6ee",
    className: "fast",
  },
  armor: {
    name: "装甲怪",
    hp: 158,
    speed: 25,
    reward: 15,
    armor: 0.45,
    color: "#df8749",
    className: "armor",
  },
  split: {
    name: "分裂怪",
    hp: 96,
    speed: 34,
    reward: 12,
    split: true,
    color: "#a78bfa",
    className: "split",
  },
  boss: {
    name: "指挥核心",
    hp: 560,
    speed: 19,
    reward: 70,
    armor: 0.25,
    color: "#f45f5a",
    className: "armor",
  },
};

const ENEMY_ORDER = ["grunt", "fast", "armor", "split", "boss"];

const ENEMY_GUIDES = {
  grunt: {
    role: "基础单位",
    trait: "数量稳定，速度和血量都比较平均。",
    counter: "速射塔、重炮塔和激光塔都能高效处理。",
  },
  fast: {
    role: "高速突破",
    trait: "血量低，但移动速度很高，容易从薄弱边路漏过去。",
    counter: "冰霜塔和冲击波塔能降低它的突破威胁。",
  },
  armor: {
    role: "装甲压迫",
    trait: "护甲会削弱非穿甲伤害，推进速度慢但很耐打。",
    counter: "穿甲塔优先级最高，激光和光环增伤也能帮助破甲。",
  },
  split: {
    role: "分裂单位",
    trait: "死亡后分裂成高速小怪，容易制造后排压力。",
    counter: "重炮塔、冲击波塔和冰霜塔适合处理分裂后的密集单位。",
  },
  boss: {
    role: "最终核心",
    trait: "高血量并带护甲，抵达核心会造成更高损伤。",
    counter: "穿甲塔、激光直线走廊、满级光环阵地是主要解法。",
  },
};

const WAVES = [
  { name: "探路虫群", packs: [{ type: "grunt", count: 12, gap: 0.62, entry: 0 }] },
  { name: "双入口试探", packs: [{ type: "grunt", count: 10, gap: 0.56, entry: 0 }, { type: "grunt", count: 9, gap: 0.58, entry: 1 }] },
  { name: "高速切线", packs: [{ type: "fast", count: 12, gap: 0.48, entry: 1 }, { type: "grunt", count: 8, gap: 0.6, entry: 0 }] },
  { name: "装甲压迫", packs: [{ type: "armor", count: 6, gap: 0.9, entry: 0 }, { type: "grunt", count: 12, gap: 0.48, entry: 1 }] },
  { name: "北侧裂口", packs: [{ type: "fast", count: 10, gap: 0.42, entry: 2 }, { type: "grunt", count: 14, gap: 0.5, entry: 0 }] },
  { name: "分裂潮", packs: [{ type: "split", count: 8, gap: 0.78, entry: 1 }, { type: "grunt", count: 12, gap: 0.46, entry: 2 }] },
  { name: "铁壳纵队", packs: [{ type: "armor", count: 9, gap: 0.82, entry: 0 }, { type: "fast", count: 10, gap: 0.42, entry: 1 }] },
  { name: "三线并进", packs: [{ type: "grunt", count: 10, gap: 0.42, entry: 0 }, { type: "fast", count: 10, gap: 0.42, entry: 1 }, { type: "split", count: 5, gap: 0.8, entry: 2 }] },
  { name: "护甲与速度", packs: [{ type: "armor", count: 10, gap: 0.72, entry: 2 }, { type: "fast", count: 16, gap: 0.34, entry: 0 }] },
  { name: "裂变长队", packs: [{ type: "split", count: 12, gap: 0.62, entry: 1 }, { type: "grunt", count: 18, gap: 0.36, entry: 2 }] },
  { name: "最后校准", packs: [{ type: "armor", count: 8, gap: 0.7, entry: 0 }, { type: "split", count: 8, gap: 0.66, entry: 1 }, { type: "fast", count: 18, gap: 0.34, entry: 2 }] },
  { name: "指挥核心", packs: [{ type: "boss", count: 1, gap: 1, entry: 0 }, { type: "armor", count: 8, gap: 0.72, entry: 1 }, { type: "fast", count: 20, gap: 0.3, entry: 2 }] },
];

const LEVELS = [
  {
    id: "tutorial",
    name: "教学演练",
    badge: "可跳过",
    difficulty: "轻量",
    description: "少量敌人和更宽松的资金，用来熟悉造路、升级和冰霜控场。",
    money: 230,
    lives: 24,
    enemyHpScale: 0.85,
    enemySpeedScale: 0.92,
    waves: WAVES.slice(0, 5),
  },
  {
    id: "standard",
    name: "标准防线",
    badge: "推荐",
    difficulty: "标准",
    description: "完整十二波节奏，包含高速、装甲、分裂和最终指挥核心。",
    money: 180,
    lives: 20,
    enemyHpScale: 1,
    enemySpeedScale: 1,
    waves: WAVES,
  },
  {
    id: "assault",
    name: "强袭关",
    badge: "进阶",
    difficulty: "高压",
    description: "敌人更多、间隔更短、核心耐久更少，适合检验路线设计。",
    money: 165,
    lives: 15,
    enemyHpScale: 1.12,
    enemySpeedScale: 1.06,
    waves: WAVES.map((wave, index) => ({
      name: `${wave.name}${index >= 8 ? "·强袭" : ""}`,
      packs: wave.packs.map((pack) => ({
        ...pack,
        count: Math.ceil(pack.count * (index < 3 ? 1.08 : 1.22)),
        gap: Math.max(0.24, Number((pack.gap * 0.84).toFixed(2))),
      })),
    })),
  },
];

const state = {
  screen: "levelSelect",
  entryStep: "difficulty",
  levelId: "standard",
  mapId: "plain",
  lives: 20,
  money: 180,
  wave: 0,
  activeWave: false,
  spawnQueue: [],
  spawnTimer: 0,
  enemies: [],
  towers: [],
  projectiles: [],
  particles: [],
  effects: [],
  selectedTowerType: "gun",
  selectedTowerId: null,
  hoverCell: null,
  codexOpen: false,
  codexTab: "towers",
  codexView: "summary",
  codexWasPaused: false,
  quickMenu: {
    towerId: null,
    x: 0,
    y: 0,
  },
  paused: false,
  speed: 1,
  soundEnabled: true,
  lastSoundToggleAt: 0,
  shake: {
    time: 0,
    duration: 0,
    strength: 0,
    x: 0,
    y: 0,
  },
  message: "欢迎来到零域方阵。先用炮塔制造弯路，别把路完全封死。",
  gameOver: false,
  won: false,
  kills: 0,
  leaks: 0,
  startedAt: performance.now(),
  endedAt: null,
  lastTime: performance.now(),
  logs: [],
};

const ui = {
  levelSubtitle: document.querySelector("#levelSubtitle"),
  life: document.querySelector("#lifeText"),
  money: document.querySelector("#moneyText"),
  wave: document.querySelector("#waveText"),
  enemy: document.querySelector("#enemyText"),
  speed: document.querySelector("#speedText"),
  selected: document.querySelector("#selectedCard"),
  preview: document.querySelector("#wavePreview"),
  log: document.querySelector("#logList"),
  toast: document.querySelector("#toast"),
  start: document.querySelector("#startWaveButton"),
  pause: document.querySelector("#pauseButton"),
  speedButton: document.querySelector("#speedButton"),
  soundButton: document.querySelector("#soundButton"),
  codexButton: document.querySelector("#codexButton"),
  levelSelectButton: document.querySelector("#levelSelectButton"),
  reset: document.querySelector("#resetButton"),
  levelSelect: document.querySelector("#levelSelectOverlay"),
  levelCards: document.querySelector("#levelCards"),
  mapCards: document.querySelector("#mapCards"),
  difficultyStep: document.querySelector("#difficultyStep"),
  mapStep: document.querySelector("#mapStep"),
  confirmStep: document.querySelector("#confirmStep"),
  entryBack: document.querySelector("#entryBackButton"),
  entryNext: document.querySelector("#entryNextButton"),
  entryStepButtons: document.querySelectorAll("[data-entry-step]"),
  startSelected: document.querySelector("#startSelectedButton"),
  selectedLoadout: document.querySelector("#selectedLoadout"),
  selectedMapPreview: document.querySelector("#selectedMapPreview"),
  mapSpotlight: document.querySelector("#mapSpotlight"),
  skipTutorial: document.querySelector("#skipTutorialButton"),
  levelSound: document.querySelector("#levelSoundButton"),
  levelCodex: document.querySelector("#levelCodexButton"),
  resumeLevel: document.querySelector("#resumeLevelButton"),
  settlement: document.querySelector("#settlementOverlay"),
  settlementBadge: document.querySelector("#settlementBadge"),
  settlementTitle: document.querySelector("#settlementTitle"),
  settlementSummary: document.querySelector("#settlementSummary"),
  settlementStats: document.querySelector("#settlementStats"),
  settlementRetry: document.querySelector("#settlementRetryButton"),
  settlementNext: document.querySelector("#settlementNextButton"),
  settlementSelect: document.querySelector("#settlementSelectButton"),
  codex: document.querySelector("#codexOverlay"),
  codexContent: document.querySelector("#codexContent"),
  codexClose: document.querySelector("#codexCloseButton"),
  codexTabs: document.querySelectorAll("[data-codex-tab]"),
  codexViewControls: document.querySelector("#codexViewControls"),
  codexViewButtons: document.querySelectorAll("[data-codex-view]"),
  canvasWrap: document.querySelector(".canvas-wrap"),
};

ui.quickMenu = document.createElement("div");
ui.quickMenu.className = "quick-menu hidden";
document.body.appendChild(ui.quickMenu);

const uiCache = {
  selected: "",
  preview: "",
  log: "",
  quickMenu: "",
  levelSelect: "",
  settlement: "",
  codex: "",
};

let audioContext = null;
let masterGain = null;
const soundCooldowns = new Map();

function key(x, y) {
  return `${x},${y}`;
}

function blockSet(blocks) {
  return new Set(blocks.map(([x, y]) => key(x, y)));
}

function center(cell) {
  return { x: cell.x * TILE + TILE / 2, y: cell.y * TILE + TILE / 2 };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function enemyRadius(enemy) {
  return enemy.type === "boss" ? 18 : enemy.type === "armor" ? 13 : 11;
}

function levelById(id) {
  return LEVELS.find((level) => level.id === id) || LEVELS[1];
}

function mapById(id) {
  return MAPS.find((map) => map.id === id) || MAPS[0];
}

function applyMap(mapId) {
  const map = mapById(mapId);
  ACTIVE_MAP = map;
  CORE = { ...map.core };
  ENTRIES = map.entries.map((entry) => ({ ...entry }));
  STATIC_BLOCKS = blockSet(map.blocks);
}

function currentLevel() {
  return levelById(state.levelId);
}

function currentMap() {
  return ACTIVE_MAP;
}

function currentWaves() {
  return currentLevel().waves;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function previewPathFor(map, entry) {
  const blocks = blockSet(map.blocks);
  const target = map.core;
  const startKey = key(entry.x, entry.y);
  const targetKey = key(target.x, target.y);
  const queue = [{ x: entry.x, y: entry.y }];
  const cameFrom = new Map([[startKey, null]]);
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length) {
    const current = queue.shift();
    if (current.x === target.x && current.y === target.y) break;
    for (const [dx, dy] of dirs) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      const nextKey = key(nx, ny);
      if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS || cameFrom.has(nextKey)) continue;
      if (blocks.has(nextKey) && nextKey !== targetKey) continue;
      cameFrom.set(nextKey, key(current.x, current.y));
      queue.push({ x: nx, y: ny });
    }
  }

  if (!cameFrom.has(targetKey)) return [entry, target];
  const path = [];
  let cursor = targetKey;
  while (cursor) {
    const [x, y] = cursor.split(",").map(Number);
    path.push({ x, y });
    cursor = cameFrom.get(cursor);
  }
  return path.reverse();
}

function mapPreviewSvg(map, size = "large") {
  const unit = 10;
  const width = COLS * unit;
  const height = ROWS * unit;
  const pathColors = ["#6bd39a", "#62c8dc", "#efc75e"];
  const backgroundA = map.background?.[0] || "#101719";
  const backgroundB = map.background?.[1] || "#151b1d";
  const paths = map.entries
    .map((entry, index) => {
      const points = previewPathFor(map, entry)
        .map((cell) => `${cell.x * unit + unit / 2},${cell.y * unit + unit / 2}`)
        .join(" ");
      return `<polyline points="${points}" fill="none" stroke="${pathColors[index % pathColors.length]}" stroke-width="${size === "small" ? 2.4 : 3.2}" stroke-linecap="round" stroke-linejoin="round" opacity="0.72" />`;
    })
    .join("");
  const blocks = map.blocks
    .map(([x, y]) => `<rect x="${x * unit + 1}" y="${y * unit + 1}" width="${unit - 2}" height="${unit - 2}" rx="1.5" fill="${map.blockColor}" opacity="0.94" />`)
    .join("");
  const entries = map.entries
    .map((entry, index) => `<circle cx="${entry.x * unit + unit / 2}" cy="${entry.y * unit + unit / 2}" r="${size === "small" ? 3.4 : 4.4}" fill="${pathColors[index % pathColors.length]}" stroke="#071011" stroke-width="1.2" />`)
    .join("");
  const coreX = map.core.x * unit + unit / 2;
  const coreY = map.core.y * unit + unit / 2;
  return `
    <svg class="map-preview-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(map.name)}地图缩略图">
      <rect width="${width}" height="${height}" fill="${backgroundA}" />
      <path d="M0 0L${width} ${height}V0Z" fill="${backgroundB}" opacity="0.72" />
      <path d="M0 35H${width}M0 70H${width}M0 105H${width}M50 0V${height}M100 0V${height}M150 0V${height}" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1" />
      ${paths}
      ${blocks}
      <rect x="${coreX - 6}" y="${coreY - 6}" width="12" height="12" rx="2" fill="#f1fff8" stroke="#6bd39a" stroke-width="2" />
      ${entries}
    </svg>
  `;
}

function nextLevelId() {
  const index = LEVELS.findIndex((level) => level.id === state.levelId);
  return LEVELS[index + 1]?.id || null;
}

function resetUiCache() {
  uiCache.selected = "";
  uiCache.preview = "";
  uiCache.log = "";
  uiCache.quickMenu = "";
  uiCache.levelSelect = "";
  uiCache.settlement = "";
  uiCache.codex = "";
}

function clearBattleForMapPreview() {
  const level = currentLevel();
  Object.assign(state, {
    lives: level.lives,
    money: level.money,
    wave: 0,
    activeWave: false,
    spawnQueue: [],
    spawnTimer: 0,
    enemies: [],
    towers: [],
    projectiles: [],
    particles: [],
    effects: [],
    selectedTowerId: null,
    hoverCell: null,
    paused: false,
    speed: 1,
    gameOver: false,
    won: false,
    kills: 0,
    leaks: 0,
    endedAt: null,
    logs: [],
  });
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function addLog(text) {
  state.logs.unshift({
    wave: state.wave,
    text,
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
  });
  state.logs = state.logs.slice(0, 9);
}

function showToast(text) {
  ui.toast.textContent = text;
  ui.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => ui.toast.classList.remove("is-visible"), 1800);
}

function ensureAudio() {
  if (!state.soundEnabled) return null;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  if (!audioContext) {
    audioContext = new AudioCtor();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.2;
    masterGain.connect(audioContext.destination);
  }
  if (masterGain) masterGain.gain.setTargetAtTime(0.2, audioContext.currentTime, 0.015);
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function canPlaySound(name, cooldown = 0) {
  const now = performance.now();
  const last = soundCooldowns.get(name) || 0;
  if (now - last < cooldown) return false;
  soundCooldowns.set(name, now);
  return true;
}

function playTone(frequency, duration, options = {}) {
  const audio = ensureAudio();
  if (!audio || !masterGain) return;
  const start = audio.currentTime + (options.delay || 0);
  const end = start + duration;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = options.type || "sine";
  osc.frequency.setValueAtTime(frequency, start);
  if (options.endFrequency) {
    osc.frequency.linearRampToValueAtTime(options.endFrequency, end);
  }
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(options.volume || 0.05, start + (options.attack || 0.01));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(start);
  osc.stop(end + 0.02);
}

function playNoise(duration, options = {}) {
  const audio = ensureAudio();
  if (!audio || !masterGain) return;
  const buffer = audio.createBuffer(1, Math.max(1, Math.floor(audio.sampleRate * duration)), audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    const envelope = 1 - i / data.length;
    data[i] = (Math.random() * 2 - 1) * envelope;
  }
  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = options.filterType || "lowpass";
  filter.frequency.value = options.frequency || 700;
  gain.gain.value = options.volume || 0.04;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start(audio.currentTime + (options.delay || 0));
}

function playSound(name) {
  if (!state.soundEnabled) return;
  const cooldowns = {
    gun: 42,
    pierce: 95,
    cannon: 170,
    ice: 120,
    laser: 180,
    shock: 240,
    coreHit: 140,
    blast: 120,
    invalid: 180,
  };
  if (!canPlaySound(name, cooldowns[name] || 0)) return;

  if (name === "select") playTone(360, 0.045, { type: "triangle", volume: 0.025 });
  if (name === "build") {
    playTone(220, 0.07, { type: "square", volume: 0.035 });
    playTone(520, 0.09, { type: "sine", volume: 0.04, delay: 0.035 });
  }
  if (name === "upgrade") {
    playTone(440, 0.06, { type: "triangle", volume: 0.035 });
    playTone(660, 0.07, { type: "triangle", volume: 0.035, delay: 0.055 });
    playTone(880, 0.09, { type: "sine", volume: 0.03, delay: 0.11 });
  }
  if (name === "sell") playTone(420, 0.14, { type: "sawtooth", endFrequency: 190, volume: 0.04 });
  if (name === "invalid") playTone(120, 0.12, { type: "sawtooth", endFrequency: 75, volume: 0.035 });
  if (name === "wave") {
    playTone(150, 0.09, { type: "sine", volume: 0.04 });
    playTone(225, 0.09, { type: "sine", volume: 0.04, delay: 0.08 });
    playTone(320, 0.13, { type: "triangle", volume: 0.04, delay: 0.16 });
  }
  if (name === "gun") playTone(680, 0.025, { type: "square", volume: 0.014 });
  if (name === "pierce") playTone(300, 0.055, { type: "sawtooth", endFrequency: 500, volume: 0.03 });
  if (name === "cannon") {
    playTone(105, 0.085, { type: "triangle", endFrequency: 72, volume: 0.05 });
    playNoise(0.08, { frequency: 420, volume: 0.035 });
  }
  if (name === "ice") playTone(920, 0.1, { type: "triangle", endFrequency: 1220, volume: 0.03 });
  if (name === "laser") playTone(880, 0.13, { type: "sawtooth", endFrequency: 1480, volume: 0.04 });
  if (name === "shock") {
    playTone(96, 0.18, { type: "sine", endFrequency: 54, volume: 0.06 });
    playNoise(0.12, { frequency: 260, volume: 0.03 });
  }
  if (name === "blast") playNoise(0.1, { frequency: 360, volume: 0.035 });
  if (name === "coreHit") {
    playTone(82, 0.16, { type: "sawtooth", endFrequency: 52, volume: 0.065 });
    playNoise(0.12, { frequency: 280, volume: 0.045 });
  }
  if (name === "victory") {
    playTone(523, 0.11, { type: "triangle", volume: 0.04 });
    playTone(659, 0.12, { type: "triangle", volume: 0.04, delay: 0.1 });
    playTone(784, 0.18, { type: "sine", volume: 0.04, delay: 0.2 });
  }
  if (name === "defeat") {
    playTone(220, 0.18, { type: "sawtooth", endFrequency: 155, volume: 0.045 });
    playTone(110, 0.24, { type: "sine", endFrequency: 78, volume: 0.05, delay: 0.12 });
  }
}

function playTowerFireSound(type) {
  if (type === "gun") playSound("gun");
  if (type === "pierce") playSound("pierce");
  if (type === "cannon") playSound("cannon");
  if (type === "ice") playSound("ice");
}

function toggleSound() {
  const now = performance.now();
  if (now - state.lastSoundToggleAt < 140) return;
  state.lastSoundToggleAt = now;
  state.soundEnabled = !state.soundEnabled;
  if (!state.soundEnabled && audioContext && masterGain) {
    masterGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.015);
  }
  if (state.soundEnabled) {
    ensureAudio();
    playSound("select");
  }
}

function shakeScreen(strength, duration) {
  state.shake.duration = Math.max(state.shake.duration, duration);
  state.shake.time = Math.max(state.shake.time, duration);
  state.shake.strength = Math.max(state.shake.strength, strength);
}

function updateShake(dt) {
  if (state.shake.time <= 0) {
    state.shake.x = 0;
    state.shake.y = 0;
    state.shake.strength = 0;
    return;
  }
  state.shake.time = Math.max(0, state.shake.time - dt);
  const progress = state.shake.duration ? state.shake.time / state.shake.duration : 0;
  const power = state.shake.strength * progress * progress;
  state.shake.x = (Math.random() * 2 - 1) * power;
  state.shake.y = (Math.random() * 2 - 1) * power;
}

function pulseBoard(kind) {
  if (!ui.canvasWrap) return;
  const className = kind === "danger" ? "is-danger" : "is-build";
  ui.canvasWrap.classList.remove("is-build", "is-danger");
  void ui.canvasWrap.offsetWidth;
  ui.canvasWrap.classList.add(className);
  clearTimeout(pulseBoard.timer);
  pulseBoard.timer = setTimeout(() => ui.canvasWrap.classList.remove(className), 320);
}

function isEntryCell(x, y) {
  return ENTRIES.some((entry) => entry.x === x && entry.y === y);
}

function isCoreCell(x, y) {
  return CORE.x === x && CORE.y === y;
}

function isInside(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS;
}

function towerAt(x, y) {
  return state.towers.find((tower) => tower.x === x && tower.y === y);
}

function isBlocked(x, y, extraBlock = null) {
  if (!isInside(x, y)) return true;
  if (isCoreCell(x, y)) return false;
  if (isEntryCell(x, y)) return false;
  if (STATIC_BLOCKS.has(key(x, y))) return true;
  if (extraBlock && extraBlock.x === x && extraBlock.y === y) return true;
  return Boolean(towerAt(x, y));
}

function buildThreatMap() {
  const map = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  for (const tower of state.towers) {
    const def = TOWER_TYPES[tower.type];
    const range = towerRange(tower);
    const power = towerDamage(tower) * (def.splash ? 1.45 : 1);
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        const c = center({ x, y });
        const towerCenter = center(tower);
        if (dist(c, towerCenter) <= range) map[y][x] += power / 72;
      }
    }
  }
  return map;
}

function findPath(start, target = CORE, options = {}) {
  const extraBlock = options.extraBlock || null;
  const adaptive = options.adaptive || false;
  const threat = adaptive ? buildThreatMap() : null;
  const startKey = key(start.x, start.y);
  const targetKey = key(target.x, target.y);
  const costs = new Map([[startKey, 0]]);
  const prev = new Map();
  const open = [{ x: start.x, y: start.y, cost: 0 }];
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (open.length) {
    open.sort((a, b) => a.cost - b.cost);
    const current = open.shift();
    const currentKey = key(current.x, current.y);
    if (currentKey === targetKey) break;
    if (current.cost !== costs.get(currentKey)) continue;

    for (const [dx, dy] of dirs) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      if (!isInside(nx, ny)) continue;
      const nextKey = key(nx, ny);
      const isStart = nx === start.x && ny === start.y;
      const isTarget = nx === target.x && ny === target.y;
      if (!isStart && !isTarget && isBlocked(nx, ny, extraBlock)) continue;
      const threatCost = adaptive && threat ? threat[ny][nx] : 0;
      const edgeCost = 1 + threatCost;
      const newCost = current.cost + edgeCost;
      if (!costs.has(nextKey) || newCost < costs.get(nextKey)) {
        costs.set(nextKey, newCost);
        prev.set(nextKey, currentKey);
        open.push({ x: nx, y: ny, cost: newCost });
      }
    }
  }

  if (!costs.has(targetKey)) return null;
  const path = [];
  let walk = targetKey;
  while (walk) {
    const [x, y] = walk.split(",").map(Number);
    path.unshift({ x, y });
    if (walk === startKey) break;
    walk = prev.get(walk);
  }
  return path.length ? path : null;
}

function canPlaceTower(x, y) {
  if (!isInside(x, y)) return { ok: false, reason: "不在地图内" };
  if (isCoreCell(x, y)) return { ok: false, reason: "不能建在核心上" };
  if (isEntryCell(x, y)) return { ok: false, reason: "不能堵住入口格" };
  if (STATIC_BLOCKS.has(key(x, y))) return { ok: false, reason: "岩障不能建造" };
  if (towerAt(x, y)) return { ok: false, reason: "这里已有炮塔" };
  const def = TOWER_TYPES[state.selectedTowerType];
  if (state.money < def.cost) return { ok: false, reason: "资金不足" };
  for (const entry of ENTRIES) {
    if (!findPath(entry, CORE, { extraBlock: { x, y } })) {
      return { ok: false, reason: "不能完全堵死路线" };
    }
  }
  return { ok: true };
}

function placeTower(x, y) {
  const check = canPlaceTower(x, y);
  if (!check.ok) {
    playSound("invalid");
    pulseBoard("danger");
    showToast(check.reason);
    return;
  }
  const def = TOWER_TYPES[state.selectedTowerType];
  state.money -= def.cost;
  state.towers.push({
    id: crypto.randomUUID(),
    type: state.selectedTowerType,
    x,
    y,
    level: 1,
    angle: 0,
    cooldown: 0,
    targetId: null,
  });
  state.selectedTowerId = state.towers[state.towers.length - 1].id;
  recalcEnemyPaths();
  addLog(`建造${def.name}，坐标 ${x + 1}-${y + 1}。`);
  playSound("build");
  pulseBoard("build");
  showToast(`已建造：${def.name}`);
}

function selectedTower() {
  return state.towers.find((tower) => tower.id === state.selectedTowerId) || null;
}

function upgradeTower() {
  const tower = selectedTower();
  if (!tower) return;
  if (tower.level >= 3) {
    playSound("invalid");
    showToast("这座炮塔已满级");
    return;
  }
  const cost = upgradeCost(tower);
  if (state.money < cost) {
    playSound("invalid");
    showToast("资金不足，无法升级");
    return;
  }
  state.money -= cost;
  tower.level += 1;
  uiCache.quickMenu = "";
  addLog(`${TOWER_TYPES[tower.type].name}升级到 ${tower.level} 级。`);
  playSound("upgrade");
  pulseBoard("build");
  showToast("炮塔已升级");
}

function sellTower() {
  const tower = selectedTower();
  if (!tower) return;
  const refund = towerSellValue(tower);
  state.money += refund;
  state.towers = state.towers.filter((item) => item.id !== tower.id);
  state.selectedTowerId = null;
  closeQuickMenu();
  recalcEnemyPaths();
  addLog(`出售炮塔，回收 ¥${refund}。`);
  playSound("sell");
  showToast(`回收 ¥${refund}`);
}

function upgradeCost(tower) {
  return Math.floor(TOWER_TYPES[tower.type].cost * (0.7 + tower.level * 0.45));
}

function towerSellValue(tower) {
  return Math.floor(TOWER_TYPES[tower.type].cost * (0.55 + tower.level * 0.12));
}

function towerLevelMultiplier(tower, stat) {
  return 1 + (tower.level - 1) * (TOWER_LEVEL_SCALING[stat] || 0);
}

function baseTowerRange(tower) {
  return TOWER_TYPES[tower.type].range * towerLevelMultiplier(tower, "range");
}

function auraBuffFor(towerType, auraLevel) {
  const primary = 0.12 + (auraLevel - 1) * 0.07;
  const secondary = auraLevel >= 3 ? 0.1 : 0;
  const empty = { range: 1, damage: 1, fireRate: 1 };
  const plans = {
    gun: { fireRate: 1 + primary, damage: 1 + secondary },
    cannon: { damage: 1 + primary, range: 1 + secondary },
    ice: { range: 1 + primary, fireRate: 1 + secondary },
    pierce: { range: 1 + primary, damage: 1 + secondary },
    laser: { damage: 1 + primary, range: 1 + secondary },
    shock: { fireRate: 1 + primary, range: 1 + secondary },
  };
  return { ...empty, ...(plans[towerType] || {}) };
}

function towerBoost(tower) {
  if (!tower.id || tower.type === "aura") return { range: 1, damage: 1, fireRate: 1, sourceId: null };
  const towerCenter = center(tower);
  const boost = { range: 1, damage: 1, fireRate: 1, sourceId: null };
  for (const aura of state.towers) {
    if (aura.type !== "aura" || aura.id === tower.id) continue;
    if (dist(towerCenter, center(aura)) > baseTowerRange(aura)) continue;
    const auraBoost = auraBuffFor(tower.type, aura.level);
    let improved = false;
    for (const stat of ["range", "damage", "fireRate"]) {
      if (auraBoost[stat] > boost[stat]) {
        boost[stat] = auraBoost[stat];
        improved = true;
      }
    }
    if (improved) boost.sourceId = aura.id;
  }
  return boost;
}

function auraTargets(aura) {
  if (!aura || aura.type !== "aura") return [];
  const auraCenter = center(aura);
  return state.towers
    .filter((tower) => tower.type !== "aura" && tower.id !== aura.id)
    .map((tower) => ({
      tower,
      boost: auraBuffFor(tower.type, aura.level),
      active: towerBoost(tower).sourceId === aura.id,
      distance: dist(auraCenter, center(tower)),
    }))
    .filter((item) => item.distance <= baseTowerRange(aura))
    .sort((a, b) => a.distance - b.distance);
}

function towerRange(tower) {
  return baseTowerRange(tower) * towerBoost(tower).range;
}

function towerVisionRange(tower) {
  return towerRange(tower) * 1.22 + 24;
}

function towerDamage(tower) {
  return TOWER_TYPES[tower.type].damage * towerLevelMultiplier(tower, "damage") * towerBoost(tower).damage;
}

function towerFireRate(tower) {
  return TOWER_TYPES[tower.type].fireRate * towerLevelMultiplier(tower, "fireRate") * towerBoost(tower).fireRate;
}

function towerSplash(tower) {
  const splash = TOWER_TYPES[tower.type].splash || 0;
  return splash * towerLevelMultiplier(tower, "splash");
}

function towerFrostRadius(tower) {
  const radius = TOWER_TYPES[tower.type].frostRadius || 0;
  return radius * towerLevelMultiplier(tower, "frostRadius");
}

function towerRayLength(tower) {
  const length = TOWER_TYPES[tower.type].rayLength || 0;
  return length * towerLevelMultiplier(tower, "rayLength") * towerBoost(tower).range;
}

function towerBeamWidth(tower) {
  const width = TOWER_TYPES[tower.type].beamWidth || 0;
  return width * towerLevelMultiplier(tower, "beamWidth");
}

function towerStunChance(tower) {
  const chance = TOWER_TYPES[tower.type].stunChance || 0;
  return clamp(chance * towerLevelMultiplier(tower, "stunChance"), 0, 0.72);
}

function towerStunTime(tower) {
  const time = TOWER_TYPES[tower.type].stunTime || 0;
  return time * towerLevelMultiplier(tower, "stunTime");
}

function towerSlowFactor(tower) {
  const base = TOWER_TYPES[tower.type].slow;
  if (!base) return null;
  return clamp(base - (tower.level - 1) * TOWER_LEVEL_SCALING.slowPercent, 0.24, base);
}

function towerSlowPercent(tower) {
  const slow = towerSlowFactor(tower);
  return slow ? Math.round((1 - slow) * 100) : 0;
}

function prepareSpawnQueue(wave) {
  const queue = [];
  for (const pack of wave.packs) {
    for (let i = 0; i < pack.count; i += 1) {
      queue.push({
        type: pack.type,
        entry: pack.entry,
        delay: i * pack.gap,
      });
    }
  }
  queue.sort((a, b) => a.delay - b.delay);
  return queue;
}

function startWave() {
  if (state.screen !== "playing") return;
  if (state.gameOver || state.won) return;
  if (state.activeWave) {
    playSound("invalid");
    showToast("当前波次还没结束");
    return;
  }
  const waves = currentWaves();
  if (state.wave >= waves.length) return;
  state.wave += 1;
  state.activeWave = true;
  state.spawnQueue = prepareSpawnQueue(waves[state.wave - 1]);
  state.spawnTimer = 0;
  addLog(`第 ${state.wave} 波开始：${waves[state.wave - 1].name}。`);
  playSound("wave");
  showToast(`第 ${state.wave} 波：${waves[state.wave - 1].name}`);
}

function spawnEnemy(item) {
  const entry = ENTRIES[item.entry];
  const def = ENEMY_TYPES[item.type];
  const level = currentLevel();
  const start = { x: entry.x, y: entry.y };
  const adaptive = state.wave >= 5 && item.type !== "boss";
  const path = findPath(start, CORE, { adaptive }) || findPath(start, CORE);
  const pos = center(start);
  const waveScale = 1 + Math.max(0, state.wave - 1) * 0.075;
  const maxHp = def.hp * waveScale * level.enemyHpScale;
  state.enemies.push({
    id: crypto.randomUUID(),
    type: item.type,
    x: pos.x,
    y: pos.y,
    hp: maxHp,
    maxHp,
    speed: def.speed * level.enemySpeedScale,
    reward: def.reward,
    path: path || [start, CORE],
    pathIndex: 1,
    slowTimer: 0,
    slowFactor: 1,
    stunTimer: 0,
    reached: false,
  });
}

function recalcEnemyPaths() {
  for (const enemy of state.enemies) {
    const cell = {
      x: clamp(Math.floor(enemy.x / TILE), 0, COLS - 1),
      y: clamp(Math.floor(enemy.y / TILE), 0, ROWS - 1),
    };
    const path = findPath(cell, CORE, { adaptive: state.wave >= 5 }) || findPath(cell, CORE);
    if (path) {
      enemy.path = path;
      enemy.pathIndex = Math.min(1, path.length - 1);
    }
  }
}

function update(dt) {
  if (state.screen !== "playing") return;
  if (state.paused || state.gameOver || state.won) return;
  const step = dt * state.speed;
  updateSpawns(step);
  updateEnemies(step);
  updateTowers(step);
  updateProjectiles(step);
  updateEffects(step);
  updateParticles(step);
  checkWaveEnd();
}

function updateSpawns(dt) {
  if (!state.activeWave) return;
  state.spawnTimer += dt;
  while (state.spawnQueue.length && state.spawnQueue[0].delay <= state.spawnTimer) {
    spawnEnemy(state.spawnQueue.shift());
  }
}

function updateEnemies(dt) {
  for (const enemy of state.enemies) {
    if (enemy.slowTimer > 0) {
      enemy.slowTimer -= dt;
      if (enemy.slowTimer <= 0) enemy.slowFactor = 1;
    }
    if (enemy.stunTimer > 0) {
      enemy.stunTimer -= dt;
      continue;
    }
    const nextCell = enemy.path[enemy.pathIndex];
    if (!nextCell) {
      enemy.reached = true;
      continue;
    }
    const target = center(nextCell);
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const move = enemy.speed * enemy.slowFactor * dt;
    if (move >= length) {
      enemy.x = target.x;
      enemy.y = target.y;
      enemy.pathIndex += 1;
      if (nextCell.x === CORE.x && nextCell.y === CORE.y) enemy.reached = true;
    } else {
      enemy.x += (dx / length) * move;
      enemy.y += (dy / length) * move;
    }
  }

  const reached = state.enemies.filter((enemy) => enemy.reached);
  for (const enemy of reached) {
    state.lives -= enemy.type === "boss" ? 5 : 1;
    state.leaks += 1;
    makeParticles(enemy.x, enemy.y, "#df5c57", 12);
  }
  if (reached.length) {
    playSound("coreHit");
    shakeScreen(7 + Math.min(8, reached.length * 2), 0.26);
    pulseBoard("danger");
  }
  state.enemies = state.enemies.filter((enemy) => !enemy.reached && enemy.hp > 0);
  if (state.lives <= 0) {
    state.lives = 0;
    addLog("核心被击穿，防线失守。");
    showToast("防线失守");
    finishLevel(false);
  }
}

function updateTowers(dt) {
  for (const tower of state.towers) {
    const def = TOWER_TYPES[tower.type];
    if (def.aura) {
      tower.targetId = null;
      tower.cooldown = 0;
      continue;
    }

    tower.cooldown -= dt;
    const towerCenter = center(tower);
    if (def.shockwave) {
      const target = chooseTarget(towerCenter, towerRange(tower));
      tower.targetId = target?.id || null;
      if (target) tower.angle = Math.atan2(target.y - towerCenter.y, target.x - towerCenter.x);
      if (!target || tower.cooldown > 0) continue;
      tower.cooldown = 1 / towerFireRate(tower);
      fireShockwave(tower);
      continue;
    }

    const visionTarget =
      tower.type === "ice" || tower.type === "laser"
        ? chooseTarget(towerCenter, towerRange(tower))
        : chooseTarget(towerCenter, towerVisionRange(tower));
    if (!visionTarget) {
      tower.targetId = null;
      continue;
    }
    tower.targetId = visionTarget.id;
    if (tower.type !== "ice") {
      tower.angle = Math.atan2(visionTarget.y - towerCenter.y, visionTarget.x - towerCenter.x);
    }
    if (dist(towerCenter, visionTarget) > towerRange(tower)) continue;
    if (tower.cooldown > 0) continue;
    tower.cooldown = 1 / towerFireRate(tower);
    fireTower(tower, visionTarget);
  }
}

function chooseTarget(origin, range) {
  const candidates = state.enemies
    .filter((enemy) => dist(origin, enemy) <= range)
    .sort((a, b) => pathProgress(b) - pathProgress(a));
  return candidates[0] || null;
}

function pathProgress(enemy) {
  return enemy.pathIndex + (enemy.x + enemy.y) / 10000;
}

function fireTower(tower, enemy) {
  const def = TOWER_TYPES[tower.type];
  if (def.laser) {
    fireLaser(tower, enemy);
    return;
  }
  const towerCenter = center(tower);
  const slowFactor = towerSlowFactor(tower);
  state.projectiles.push({
    x: towerCenter.x,
    y: towerCenter.y,
    targetId: enemy.id,
    towerType: tower.type,
    damage: towerDamage(tower),
    splash: towerSplash(tower),
    frostRadius: towerFrostRadius(tower),
    slow: slowFactor,
    slowTime: def.slowTime || 0,
    pierce: Boolean(def.pierce),
    color: def.color,
    speed: tower.type === "cannon" ? 360 : 560,
  });
  playTowerFireSound(tower.type);
}

function fireLaser(tower, target) {
  const origin = center(tower);
  const angle = tower.angle || Math.atan2(target.y - origin.y, target.x - origin.x);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const length = towerRayLength(tower);
  const width = towerBeamWidth(tower);
  const affected = [];
  for (const enemy of state.enemies) {
    const dx = enemy.x - origin.x;
    const dy = enemy.y - origin.y;
    const projection = dx * cos + dy * sin;
    if (projection < 0 || projection > length) continue;
    const perpendicular = Math.abs(-sin * dx + cos * dy);
    if (perpendicular > width / 2 + enemyRadius(enemy) * 0.65) continue;
    const falloff = 1 - (projection / length) * 0.18;
    damageEnemy(enemy, towerDamage(tower) * falloff, { pierce: false });
    affected.push(enemy.id);
  }
  addAreaEffect({
    type: "laser",
    x: origin.x,
    y: origin.y,
    angle,
    length,
    width,
    color: TOWER_TYPES.laser.color,
    affected,
  });
  playSound("laser");
  makeParticles(target.x, target.y, TOWER_TYPES.laser.color, 8);
}

function fireShockwave(tower) {
  const origin = center(tower);
  const radius = towerRange(tower);
  const affected = [];
  const stunned = [];
  for (const enemy of state.enemies) {
    if (dist(origin, enemy) > radius + enemyRadius(enemy) * 0.5) continue;
    damageEnemy(enemy, towerDamage(tower), { pierce: false });
    affected.push(enemy.id);
    if (Math.random() < towerStunChance(tower)) {
      applyStun(enemy, towerStunTime(tower));
      stunned.push(enemy.id);
    }
  }
  addAreaEffect({
    type: "shock",
    x: origin.x,
    y: origin.y,
    radius,
    color: TOWER_TYPES.shock.color,
    affected,
    stunned,
  });
  playSound("shock");
  shakeScreen(3.6, 0.18);
  makeParticles(origin.x, origin.y, TOWER_TYPES.shock.color, 24);
}

function updateProjectiles(dt) {
  for (const projectile of state.projectiles) {
    const target = state.enemies.find((enemy) => enemy.id === projectile.targetId);
    if (!target) {
      projectile.dead = true;
      continue;
    }
    const dx = target.x - projectile.x;
    const dy = target.y - projectile.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const move = projectile.speed * dt;
    if (move >= length) {
      projectile.x = target.x;
      projectile.y = target.y;
      hitEnemy(projectile, target);
      projectile.dead = true;
    } else {
      projectile.x += (dx / length) * move;
      projectile.y += (dy / length) * move;
    }
  }
  state.projectiles = state.projectiles.filter((projectile) => !projectile.dead);
}

function hitEnemy(projectile, target) {
  if (projectile.splash || projectile.frostRadius) {
    const radius = projectile.splash || projectile.frostRadius;
    const affected = [];
    for (const enemy of state.enemies) {
      if (dist(projectile, enemy) <= radius) {
        damageEnemy(enemy, projectile.damage, projectile);
        affected.push(enemy.id);
      }
    }
    addAreaEffect({
      type: projectile.frostRadius ? "frost" : "blast",
      x: projectile.x,
      y: projectile.y,
      radius,
      color: projectile.color,
      affected,
    });
    if (projectile.splash) {
      playSound("blast");
      shakeScreen(4.4, 0.16);
    }
    makeParticles(projectile.x, projectile.y, projectile.color, projectile.frostRadius ? 22 : 18);
  } else {
    damageEnemy(target, projectile.damage, projectile);
    makeParticles(projectile.x, projectile.y, projectile.color, 6);
  }
}

function damageEnemy(enemy, damage, projectile) {
  const def = ENEMY_TYPES[enemy.type];
  let actual = damage;
  if (def.armor && !projectile.pierce) actual *= 1 - def.armor;
  enemy.hp -= actual;
  if (projectile.slow) {
    enemy.slowFactor = Math.min(enemy.slowFactor, projectile.slow);
    enemy.slowTimer = Math.max(enemy.slowTimer, projectile.slowTime);
  }
  if (enemy.hp <= 0 && !enemy.deadRewarded) {
    enemy.deadRewarded = true;
    state.kills += 1;
    state.money += enemy.reward;
    if (def.split) spawnSplit(enemy);
  }
}

function applyStun(enemy, duration) {
  const multiplier = enemy.type === "boss" ? 0.38 : enemy.type === "armor" ? 0.72 : 1;
  enemy.stunTimer = Math.max(enemy.stunTimer || 0, duration * multiplier);
}

function addAreaEffect(effect) {
  const lifetimes = {
    laser: 0.22,
    shock: 0.9,
    frost: 1.05,
    blast: 0.82,
  };
  const life = effect.life || lifetimes[effect.type] || 0.82;
  state.effects.push({
    ...effect,
    life,
    maxLife: life,
  });
}

function spawnSplit(parent) {
  const level = currentLevel();
  for (let i = 0; i < 2; i += 1) {
    const cell = {
      x: clamp(Math.floor(parent.x / TILE), 0, COLS - 1),
      y: clamp(Math.floor(parent.y / TILE), 0, ROWS - 1),
    };
    const path = findPath(cell, CORE, { adaptive: true }) || findPath(cell, CORE);
    const maxHp = (30 + state.wave * 3) * level.enemyHpScale;
    state.enemies.push({
      id: crypto.randomUUID(),
      type: "fast",
      x: parent.x + (i === 0 ? -5 : 5),
      y: parent.y,
      hp: maxHp,
      maxHp,
      speed: 62 * level.enemySpeedScale,
      reward: 3,
      path: path || [cell, CORE],
      pathIndex: 1,
      slowTimer: 0,
      slowFactor: 1,
      stunTimer: 0,
      reached: false,
    });
  }
}

function updateParticles(dt) {
  for (const particle of state.particles) {
    particle.life -= dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
  }
  state.particles = state.particles.filter((particle) => particle.life > 0);
}

function updateEffects(dt) {
  for (const effect of state.effects) {
    effect.life -= dt;
  }
  state.effects = state.effects.filter((effect) => effect.life > 0);
}

function makeParticles(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 25 + Math.random() * 90;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      life: 0.25 + Math.random() * 0.35,
    });
  }
}

function checkWaveEnd() {
  if (!state.activeWave) return;
  if (state.spawnQueue.length === 0 && state.enemies.length === 0) {
    state.activeWave = false;
    const bonus = 22 + state.wave * 7;
    state.money += bonus;
    addLog(`第 ${state.wave} 波结束，回收战场资源 ¥${bonus}。`);
    if (state.wave >= currentWaves().length) {
      addLog("全部波次清除，零域核心稳定。");
      showToast("胜利：核心稳定");
      finishLevel(true);
    } else {
      showToast(`第 ${state.wave} 波结束，奖励 ¥${bonus}`);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(state.shake.x, state.shake.y);
  drawBackground();
  drawPaths();
  drawPlacementPreviewPaths();
  drawGrid();
  drawBlocks();
  drawCoreAndEntries();
  drawPlacementRangePreview();
  drawTowers();
  drawEnemies();
  drawAreaEffects();
  drawProjectiles();
  drawParticles();
  drawHover();
  ctx.restore();
  drawOverlayMessage();
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  const background = currentMap().background || ["#111b1d", "#1b1713"];
  gradient.addColorStop(0, background[0]);
  gradient.addColorStop(1, background[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  ctx.strokeStyle = "rgba(123, 148, 151, 0.22)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS; x += 1) {
    ctx.beginPath();
    ctx.moveTo(x * TILE + 0.5, 0);
    ctx.lineTo(x * TILE + 0.5, ROWS * TILE);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y += 1) {
    ctx.beginPath();
    ctx.moveTo(0, y * TILE + 0.5);
    ctx.lineTo(COLS * TILE, y * TILE + 0.5);
    ctx.stroke();
  }
}

function drawPaths() {
  const pathColors = ["rgba(107, 211, 154, 0.14)", "rgba(98, 200, 220, 0.13)", "rgba(239, 199, 94, 0.12)"];
  ENTRIES.forEach((entry, index) => {
    const path = findPath(entry, CORE, { adaptive: state.wave >= 5 });
    if (!path) return;
    ctx.strokeStyle = pathColors[index];
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.beginPath();
    path.forEach((cell, pointIndex) => {
      const c = center(cell);
      if (pointIndex === 0) ctx.moveTo(c.x, c.y);
      else ctx.lineTo(c.x, c.y);
    });
    ctx.stroke();
  });
  ctx.lineCap = "butt";
}

function drawPlacementPreviewPaths() {
  if (state.screen !== "playing" || !state.hoverCell || state.activeWave || state.gameOver || state.won) return;
  const { x, y } = state.hoverCell;
  if (towerAt(x, y)) return;
  const check = canPlaceTower(x, y);
  if (!check.ok) return;

  const previewColors = ["#8cffb8", "#87eaff", "#ffe187"];
  ctx.save();
  ctx.setLineDash([13, 8]);
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(255,255,255,0.35)";
  ctx.shadowBlur = 8;

  ENTRIES.forEach((entry, index) => {
    const path = findPath(entry, CORE, {
      extraBlock: { x, y },
      adaptive: state.wave >= 5,
    });
    if (!path) return;
    ctx.strokeStyle = previewColors[index];
    ctx.beginPath();
    path.forEach((cell, pointIndex) => {
      const c = center(cell);
      if (pointIndex === 0) ctx.moveTo(c.x, c.y);
      else ctx.lineTo(c.x, c.y);
    });
    ctx.stroke();
  });

  ctx.restore();
  drawPlacementPreviewLabel(x, y);
}

function drawPlacementPreviewLabel(x, y) {
  const px = clamp(x * TILE - 52, 8, canvas.width - 210);
  const py = clamp(y * TILE - 40, 8, canvas.height - 48);
  ctx.fillStyle = "rgba(7, 13, 14, 0.86)";
  ctx.strokeStyle = "rgba(140, 255, 184, 0.8)";
  ctx.lineWidth = 1;
  ctx.fillRect(px, py, 202, 36);
  ctx.strokeRect(px + 0.5, py + 0.5, 201, 35);
  ctx.fillStyle = "#dffff0";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("部署后路线预览", px + 10, py + 15);
  ctx.fillStyle = "#9db0ad";
  ctx.font = "12px sans-serif";
  ctx.fillText("虚线为敌人将改走的新路线", px + 10, py + 29);
}

function drawPlacementRangePreview() {
  if (state.screen !== "playing" || !state.hoverCell || state.gameOver || state.won) return;
  const { x, y } = state.hoverCell;
  if (!isInside(x, y) || towerAt(x, y)) return;
  const check = canPlaceTower(x, y);
  if (!check.ok) return;

  const tower = {
    type: state.selectedTowerType,
    level: 1,
    x,
    y,
  };
  const def = TOWER_TYPES[tower.type];
  const c = center(tower);
  const range = towerRange(tower);

  ctx.save();
  ctx.fillStyle = def.color;
  ctx.globalAlpha = def.aura ? 0.12 : 0.08;
  ctx.beginPath();
  ctx.arc(c.x, c.y, range, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.78;
  ctx.strokeStyle = def.color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(c.x, c.y, range, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  if (def.splash) drawPlacementImpactRadius(c, towerSplash(tower), def.color, 0.18);
  if (def.frostRadius) drawPlacementImpactRadius(c, towerFrostRadius(tower), def.color, 0.2);
  if (def.laser) drawPlacementLaserPreview(c, tower, def.color);
  if (def.shockwave) drawPlacementShockPulse(c, range, def.color);
  if (def.aura) drawPlacementAuraPreview(c, range, def.color);

  drawPlacementRangeBadge(tower, c);
}

function drawPlacementImpactRadius(c, radius, color, alpha) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(c.x, c.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPlacementLaserPreview(c, tower, color) {
  const core = center(CORE);
  const angle = Math.atan2(core.y - c.y, core.x - c.x);
  const length = towerRayLength(tower);
  const width = towerBeamWidth(tower);
  const endX = c.x + Math.cos(angle) * length;
  const endY = c.y + Math.sin(angle) * length;

  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(c.x, c.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = "#ffeefa";
  ctx.globalAlpha = 0.76;
  ctx.lineWidth = Math.max(3, width * 0.36);
  ctx.beginPath();
  ctx.moveTo(c.x, c.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawPlacementShockPulse(c, range, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.48;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(c.x, c.y, range * 0.72, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(c.x, c.y, range * 0.42, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPlacementAuraPreview(c, range, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.48;
  ctx.lineWidth = 1.8;
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, range * (0.52 + i * 0.16), 0.08 * Math.PI, 1.82 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

function placementRangeText(tower) {
  const def = TOWER_TYPES[tower.type];
  const mainLabel = def.aura ? "光环" : def.laser ? "索敌" : def.shockwave ? "冲击" : "射程";
  const parts = [`${mainLabel} ${Math.round(towerRange(tower))}`];
  if (def.splash) parts.push(`爆炸 ${Math.round(towerSplash(tower))}`);
  if (def.frostRadius) parts.push(`冰爆 ${Math.round(towerFrostRadius(tower))}`);
  if (def.rayLength) parts.push(`射线 ${Math.round(towerRayLength(tower))}`);
  return parts.join(" / ");
}

function drawPlacementRangeBadge(tower, c) {
  const def = TOWER_TYPES[tower.type];
  const text = placementRangeText(tower);
  ctx.save();
  ctx.font = "bold 12px sans-serif";
  const width = clamp(ctx.measureText(text).width + 22, 112, 238);
  const px = clamp(c.x - width / 2, 8, canvas.width - width - 8);
  const py = clamp(c.y + TILE * 0.58, 8, canvas.height - 30);
  ctx.fillStyle = "rgba(7, 13, 14, 0.9)";
  ctx.strokeStyle = def.color;
  ctx.lineWidth = 1;
  ctx.fillRect(px, py, width, 24);
  ctx.strokeRect(px + 0.5, py + 0.5, width - 1, 23);
  ctx.fillStyle = "#eafff6";
  ctx.fillText(text, px + 11, py + 16);
  ctx.restore();
}

function drawBlocks() {
  for (const block of STATIC_BLOCKS) {
    const [x, y] = block.split(",").map(Number);
    const px = x * TILE;
    const py = y * TILE;
    ctx.fillStyle = currentMap().blockColor || "#263032";
    ctx.fillRect(px + 5, py + 5, TILE - 10, TILE - 10);
    ctx.strokeStyle = "#56656a";
    ctx.strokeRect(px + 7, py + 7, TILE - 14, TILE - 14);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(px + 10, py + 10, TILE - 26, 4);
  }
}

function drawCoreAndEntries() {
  const nextEntries = nextWaveEntryIndexes();
  ENTRIES.forEach((entry, index) => {
    const c = center(entry);
    if (nextEntries.has(index)) drawNextWaveEntryWarning(entry, index);
    ctx.fillStyle = ["#6bd39a", "#62c8dc", "#efc75e"][index];
    ctx.beginPath();
    ctx.moveTo(c.x - 18, c.y);
    ctx.lineTo(c.x + 10, c.y - 15);
    ctx.lineTo(c.x + 10, c.y + 15);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#09100f";
    ctx.font = "12px sans-serif";
    ctx.fillText(String(index + 1), c.x - 3, c.y + 4);
  });

  const core = center(CORE);
  ctx.fillStyle = "#182422";
  ctx.beginPath();
  ctx.arc(core.x, core.y, 21, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6bd39a";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.strokeStyle = "rgba(107,211,154,0.35)";
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.arc(core.x, core.y, 28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 1;
}

function nextWaveEntryIndexes() {
  const indexes = new Set();
  if (state.screen !== "playing" || state.activeWave || state.gameOver || state.won) return indexes;
  const next = currentWaves()[state.wave];
  if (!next) return indexes;
  next.packs.forEach((pack) => indexes.add(pack.entry));
  return indexes;
}

function nextWaveEntrySummary(entryIndex) {
  const next = currentWaves()[state.wave];
  if (!next) return "";
  return next.packs
    .filter((pack) => pack.entry === entryIndex)
    .map((pack) => `${ENEMY_TYPES[pack.type].name}×${pack.count}`)
    .join(" / ");
}

function drawNextWaveEntryWarning(entry, index) {
  const c = center(entry);
  const pulse = 0.5 + Math.sin(performance.now() / 160) * 0.5;
  ctx.save();
  ctx.strokeStyle = `rgba(255, 116, 82, ${0.55 + pulse * 0.35})`;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(c.x, c.y, 27 + pulse * 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = `rgba(255, 116, 82, ${0.16 + pulse * 0.16})`;
  ctx.beginPath();
  ctx.arc(c.x, c.y, 34 + pulse * 10, 0, Math.PI * 2);
  ctx.fill();

  const labelWidth = 172;
  const labelX = entry.x === 0 ? c.x + 20 : clamp(c.x - labelWidth / 2, 8, canvas.width - labelWidth - 8);
  const labelY = entry.y === 0 ? c.y + 24 : clamp(c.y - 44, 8, canvas.height - 50);
  ctx.fillStyle = "rgba(35, 18, 15, 0.92)";
  ctx.strokeStyle = "rgba(255, 175, 102, 0.88)";
  ctx.lineWidth = 1;
  ctx.fillRect(labelX, labelY, labelWidth, 42);
  ctx.strokeRect(labelX + 0.5, labelY + 0.5, labelWidth - 1, 41);
  ctx.fillStyle = "#ffe1b0";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(`下一波入口 ${index + 1}`, labelX + 9, labelY + 16);
  ctx.fillStyle = "#ffd0bd";
  ctx.font = "12px sans-serif";
  ctx.fillText(nextWaveEntrySummary(index), labelX + 9, labelY + 31);
  ctx.restore();
}

function drawTowers() {
  drawAuraFields();
  for (const tower of state.towers) {
    const def = TOWER_TYPES[tower.type];
    const c = center(tower);
    const selected = tower.id === state.selectedTowerId;
    const range = towerRange(tower);
    if (selected) {
      if (tower.type === "aura") {
        ctx.fillStyle = "rgba(196, 181, 253, 0.09)";
        ctx.beginPath();
        ctx.arc(c.x, c.y, range, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = tower.type === "aura" ? "rgba(196,181,253,0.55)" : "rgba(255,255,255,0.16)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(c.x, c.y, range, 0, Math.PI * 2);
      ctx.stroke();
    }
    drawAuraBoostMark(tower, c);
    drawTowerShell(c, def, tower.level, selected);
    drawTowerShape(c, tower, def);
    ctx.fillStyle = "#08110f";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(tower.level), c.x, c.y + 5);
    ctx.textAlign = "left";
    ctx.lineWidth = 1;
  }
}

function drawAuraFields() {
  for (const aura of state.towers) {
    if (aura.type !== "aura") continue;
    const c = center(aura);
    const selected = aura.id === state.selectedTowerId;
    const pulse = 0.5 + Math.sin(performance.now() / 420 + aura.x) * 0.5;
    ctx.save();
    ctx.strokeStyle = `rgba(196, 181, 253, ${selected ? 0.48 : 0.18 + pulse * 0.12})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 23 + pulse * 3, 0, Math.PI * 2);
    ctx.stroke();
    if (selected) {
      for (const item of auraTargets(aura)) {
        drawAuraTargetLink(c, item);
      }
    }
    ctx.restore();
  }
}

function drawAuraTargetLink(origin, item) {
  const target = center(item.tower);
  const def = TOWER_TYPES[item.tower.type];
  ctx.save();
  ctx.strokeStyle = item.active ? "rgba(196,181,253,0.62)" : "rgba(157,176,173,0.28)";
  ctx.lineWidth = item.active ? 3 : 2;
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();

  ctx.fillStyle = item.active ? "rgba(41, 32, 68, 0.92)" : "rgba(17, 24, 25, 0.86)";
  ctx.strokeStyle = item.active ? "rgba(196,181,253,0.86)" : "rgba(95,117,110,0.72)";
  const label = `${def.name} ${formatBoost(item.boost)}`;
  const width = clamp(label.length * 12, 110, 224);
  const labelX = clamp(target.x + 16, 8, canvas.width - width - 8);
  const labelY = clamp(target.y - 34, 8, canvas.height - 28);
  ctx.fillRect(labelX, labelY, width, 26);
  ctx.strokeRect(labelX + 0.5, labelY + 0.5, width - 1, 25);
  ctx.fillStyle = item.active ? "#eee8ff" : "#c9d4d1";
  ctx.font = "bold 12px sans-serif";
  ctx.fillText(label, labelX + 8, labelY + 17);
  ctx.restore();
}

function drawAuraBoostMark(tower, c) {
  const boost = towerBoost(tower);
  if (!boost.sourceId) return;
  ctx.save();
  const selectedAura = state.selectedTowerId === boost.sourceId;
  ctx.strokeStyle = selectedAura ? "rgba(238,232,255,0.95)" : "rgba(196,181,253,0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(c.x, c.y, selectedAura ? 28 : 25, 0, Math.PI * 2);
  ctx.stroke();
  const aura = state.towers.find((item) => item.id === boost.sourceId);
  if (aura && tower.id === state.selectedTowerId) {
    const a = center(aura);
    ctx.strokeStyle = "rgba(196,181,253,0.34)";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(c.x, c.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTowerShell(c, def, level, selected) {
  const half = 15 + level;
  ctx.fillStyle = "#101719";
  ctx.fillRect(c.x - half, c.y - half, half * 2, half * 2);
  ctx.strokeStyle = selected ? "#ffffff" : def.color;
  ctx.lineWidth = selected ? 3 : 2;
  ctx.strokeRect(c.x - half, c.y - half, half * 2, half * 2);

  if (level >= 2) {
    ctx.strokeStyle = def.color;
    ctx.globalAlpha = 0.62;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  if (level >= 3) {
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.arc(c.x, c.y, 22, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawTowerShape(c, tower, def) {
  ctx.save();
  ctx.translate(c.x, c.y);
  if (tower.type !== "ice" && tower.type !== "aura") ctx.rotate(tower.angle || 0);
  ctx.fillStyle = def.color;
  ctx.strokeStyle = def.color;
  ctx.lineWidth = 3;
  if (tower.type === "gun") drawGunTower(tower.level);
  if (tower.type === "cannon") drawCannonTower(tower.level);
  if (tower.type === "ice") drawIceTower(tower.level);
  if (tower.type === "pierce") drawPierceTower(tower.level);
  if (tower.type === "laser") drawLaserTower(tower.level);
  if (tower.type === "shock") drawShockTower(tower.level);
  if (tower.type === "aura") drawAuraTower(tower.level);
  ctx.restore();
}

function drawGunTower(level) {
  ctx.save();
  ctx.fillStyle = "rgba(7, 17, 14, 0.95)";
  ctx.fillRect(-13, -11, 20, 22);
  ctx.strokeStyle = TOWER_TYPES.gun.color;
  ctx.strokeRect(-13, -11, 20, 22);

  ctx.fillStyle = TOWER_TYPES.gun.color;
  ctx.beginPath();
  ctx.arc(-6, 0, 7 + level, 0, Math.PI * 2);
  ctx.fill();

  const barrels = level + 1;
  for (let i = 0; i < barrels; i += 1) {
    const offset = (i - (barrels - 1) / 2) * 5;
    ctx.fillRect(2, offset - 1.5, 18 + level * 3, 3);
    ctx.fillStyle = "rgba(230,255,238,0.95)";
    ctx.fillRect(17 + level * 3, offset - 1, 5, 2);
    ctx.fillStyle = TOWER_TYPES.gun.color;
  }

  ctx.fillStyle = "#101719";
  ctx.beginPath();
  ctx.arc(-12, -10, 4 + level, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = TOWER_TYPES.gun.color;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = "rgba(190,255,210,0.65)";
  ctx.beginPath();
  ctx.moveTo(-11, 12);
  ctx.lineTo(4, 16);
  ctx.lineTo(18, 12);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 4 + level, 0, Math.PI * 2);
  ctx.stroke();
  if (level >= 3) {
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.arc(-6, 0, 16, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCannonTower(level) {
  drawPolygon([
    [-12, -8],
    [-3, -14],
    [10, -10],
    [13, 0],
    [8, 11],
    [-8, 12],
    [-14, 2],
  ]);
  ctx.fillRect(2, -5 - level, 22 + level * 3, 10 + level * 2);
  ctx.fillStyle = "#101719";
  ctx.beginPath();
  ctx.arc(0, 0, 5 + level, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = TOWER_TYPES.cannon.color;
  if (level >= 2) ctx.fillRect(-12, -14, 6, 6);
  if (level >= 3) ctx.fillRect(-12, 8, 6, 6);
}

function drawIceTower(level) {
  ctx.save();
  ctx.strokeStyle = "rgba(190,245,255,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 17 + level * 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "rgba(20, 42, 49, 0.95)";
  drawPolygon([
    [-15, 8],
    [-8, -10],
    [8, -10],
    [15, 8],
    [0, 16],
  ]);

  ctx.fillStyle = TOWER_TYPES.ice.color;
  drawPolygon([
    [0, -18 - level],
    [9 + level, -4],
    [5 + level, 14 + level],
    [-5 - level, 14 + level],
    [-9 - level, -4],
  ]);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  drawPolygon([
    [0, -11],
    [5, -2],
    [2, 9],
    [-2, 9],
    [-5, -2],
  ]);

  ctx.strokeStyle = TOWER_TYPES.ice.color;
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 9, Math.sin(angle) * 9);
    ctx.lineTo(Math.cos(angle) * (17 + level * 2), Math.sin(angle) * (17 + level * 2));
    ctx.stroke();
  }

  for (let i = 0; i < level; i += 1) {
    const angle = (Math.PI * 2 * i) / level - Math.PI / 2;
    const sx = Math.cos(angle) * (20 + level);
    const sy = Math.sin(angle) * (20 + level);
    ctx.fillStyle = "rgba(220, 252, 255, 0.9)";
    drawPolygon([
      [sx, sy - 4],
      [sx + 4, sy],
      [sx, sy + 4],
      [sx - 4, sy],
    ]);
  }
  ctx.restore();
}

function drawPierceTower(level) {
  ctx.fillRect(-13, -8, 26, 16);
  ctx.fillStyle = "#101719";
  ctx.fillRect(-8, -3, 16, 6);
  ctx.strokeStyle = TOWER_TYPES.pierce.color;
  for (let i = 0; i < level; i += 1) {
    const offset = (i - (level - 1) / 2) * 6;
    ctx.beginPath();
    ctx.moveTo(-12, offset);
    ctx.lineTo(18 + level * 2, offset);
    ctx.stroke();
  }
  ctx.fillStyle = TOWER_TYPES.pierce.color;
  drawPolygon([
    [17 + level * 2, -8],
    [28 + level * 2, 0],
    [17 + level * 2, 8],
  ]);
}

function drawLaserTower(level) {
  ctx.save();
  ctx.fillStyle = "rgba(35, 16, 34, 0.95)";
  drawPolygon([
    [-14, -12],
    [6, -15],
    [14, 0],
    [6, 15],
    [-14, 12],
    [-8, 0],
  ]);
  ctx.strokeStyle = TOWER_TYPES.laser.color;
  ctx.stroke();

  ctx.fillStyle = TOWER_TYPES.laser.color;
  ctx.fillRect(0, -3 - level, 23 + level * 4, 6 + level * 2);
  ctx.fillStyle = "rgba(255, 238, 250, 0.92)";
  ctx.beginPath();
  ctx.arc(4, 0, 6 + level, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.62)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(6, -11);
  ctx.lineTo(21 + level * 3, -8);
  ctx.moveTo(6, 11);
  ctx.lineTo(21 + level * 3, 8);
  ctx.stroke();

  if (level >= 2) {
    ctx.strokeStyle = "rgba(244,114,182,0.7)";
    ctx.beginPath();
    ctx.arc(-5, 0, 13, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (level >= 3) {
    ctx.fillStyle = "#fce7f3";
    ctx.fillRect(24 + level * 3, -2, 7, 4);
  }
  ctx.restore();
}

function drawShockTower(level) {
  ctx.save();
  ctx.fillStyle = "rgba(24, 42, 16, 0.96)";
  ctx.beginPath();
  ctx.arc(0, 0, 15 + level, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = TOWER_TYPES.shock.color;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = TOWER_TYPES.shock.color;
  ctx.beginPath();
  ctx.arc(0, 0, 6 + level, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(235,255,209,0.76)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 4 + level; i += 1) {
    const angle = (Math.PI * 2 * i) / (4 + level);
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 9, Math.sin(angle) * 9);
    ctx.lineTo(Math.cos(angle) * (18 + level * 2), Math.sin(angle) * (18 + level * 2));
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(184,240,106,0.78)";
  ctx.fillRect(2, -4, 18 + level * 2, 8);
  ctx.fillStyle = "#101719";
  ctx.fillRect(9, -2, 8 + level, 4);
  ctx.restore();
}

function drawAuraTower(level) {
  ctx.save();
  ctx.fillStyle = "rgba(32, 25, 54, 0.96)";
  drawPolygon([
    [0, -18],
    [15, -7],
    [11, 14],
    [-11, 14],
    [-15, -7],
  ]);
  ctx.strokeStyle = TOWER_TYPES.aura.color;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = TOWER_TYPES.aura.color;
  ctx.beginPath();
  ctx.arc(0, -2, 7 + level, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(237,233,254,0.72)";
  for (let i = 0; i < level + 1; i += 1) {
    ctx.beginPath();
    ctx.arc(0, -2, 12 + i * 4, 0.12 * Math.PI, 1.72 * Math.PI);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(237,233,254,0.9)";
  ctx.fillRect(-4, 10, 8, 7);
  ctx.restore();
}

function drawPolygon(points) {
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
}

function drawEnemies() {
  for (const enemy of state.enemies) {
    const def = ENEMY_TYPES[enemy.type];
    const radius = enemyRadius(enemy);
    ctx.fillStyle = def.color;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (enemy.stunTimer > 0) {
      ctx.strokeStyle = "#f5ffe9";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, radius + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#f5ffe9";
      ctx.fillRect(enemy.x - 8, enemy.y - radius - 21, 16, 4);
      ctx.fillRect(enemy.x - 2, enemy.y - radius - 27, 4, 16);
    }
    if (enemy.slowTimer > 0) {
      ctx.strokeStyle = "#a4efff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, radius + 4, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (enemy.type === "armor" || enemy.type === "boss") {
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, radius - 4, 0, Math.PI * 1.5);
      ctx.stroke();
    }
    const hpWidth = 32;
    const hpRatio = clamp(enemy.hp / enemy.maxHp, 0, 1);
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(enemy.x - hpWidth / 2, enemy.y - radius - 12, hpWidth, 5);
    ctx.fillStyle = hpRatio > 0.45 ? "#6bd39a" : "#df5c57";
    ctx.fillRect(enemy.x - hpWidth / 2, enemy.y - radius - 12, hpWidth * hpRatio, 5);
  }
}

function drawProjectiles() {
  for (const projectile of state.projectiles) {
    ctx.save();
    if (projectile.towerType === "ice") {
      ctx.strokeStyle = "rgba(190, 245, 255, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, 7, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = projectile.color;
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.towerType === "cannon" ? 5 : 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawAreaEffects() {
  for (const effect of state.effects) {
    const progress = 1 - effect.life / effect.maxLife;
    const alpha = clamp(effect.life / effect.maxLife, 0, 1);
    ctx.save();
    if (effect.type === "laser") {
      drawLaserEffect(effect, alpha);
    } else if (effect.type === "shock") {
      drawShockEffect(effect, progress, alpha);
    } else if (effect.type === "frost") {
      const radius = effect.radius * (0.72 + progress * 0.34);
      ctx.fillStyle = `rgba(98, 200, 220, ${0.24 * alpha})`;
      ctx.strokeStyle = `rgba(180, 245, 255, ${0.8 * alpha})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = `rgba(230, 255, 255, ${0.55 * alpha})`;
      for (let i = 0; i < 8; i += 1) {
        const angle = (Math.PI * 2 * i) / 8;
        ctx.beginPath();
        ctx.moveTo(effect.x, effect.y);
        ctx.lineTo(effect.x + Math.cos(angle) * radius, effect.y + Math.sin(angle) * radius);
        ctx.stroke();
      }
    } else {
      const radius = effect.radius * (0.72 + progress * 0.34);
      ctx.fillStyle = `rgba(239, 199, 94, ${0.22 * alpha})`;
      ctx.strokeStyle = `rgba(255, 225, 134, ${0.9 * alpha})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = `rgba(255, 122, 69, ${0.65 * alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, radius * 0.55, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (const id of effect.affected) {
      const enemy = state.enemies.find((item) => item.id === id);
      if (!enemy) continue;
      ctx.strokeStyle =
        effect.type === "frost"
          ? `rgba(190, 245, 255, ${alpha})`
          : effect.type === "laser"
            ? `rgba(255, 205, 235, ${alpha})`
            : effect.type === "shock"
              ? `rgba(232, 255, 178, ${alpha})`
              : `rgba(255, 236, 159, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, 18, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawLaserEffect(effect, alpha) {
  const cos = Math.cos(effect.angle);
  const sin = Math.sin(effect.angle);
  const endX = effect.x + cos * effect.length;
  const endY = effect.y + sin * effect.length;
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgba(244, 114, 182, ${0.22 * alpha})`;
  ctx.lineWidth = effect.width * 1.8;
  ctx.beginPath();
  ctx.moveTo(effect.x, effect.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = `rgba(255, 238, 250, ${0.9 * alpha})`;
  ctx.lineWidth = Math.max(3, effect.width * 0.42);
  ctx.beginPath();
  ctx.moveTo(effect.x, effect.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.72 * alpha})`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(effect.x - sin * effect.width * 0.42, effect.y + cos * effect.width * 0.42);
  ctx.lineTo(endX - sin * effect.width * 0.42, endY + cos * effect.width * 0.42);
  ctx.moveTo(effect.x + sin * effect.width * 0.42, effect.y - cos * effect.width * 0.42);
  ctx.lineTo(endX + sin * effect.width * 0.42, endY - cos * effect.width * 0.42);
  ctx.stroke();
  ctx.lineCap = "butt";
}

function drawShockEffect(effect, progress, alpha) {
  const radius = effect.radius * (0.24 + progress * 0.86);
  ctx.fillStyle = `rgba(184, 240, 106, ${0.08 * alpha})`;
  ctx.strokeStyle = `rgba(232, 255, 178, ${0.86 * alpha})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = `rgba(184, 240, 106, ${0.52 * alpha})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(effect.x, effect.y, Math.max(8, radius * 0.62), 0, Math.PI * 2);
  ctx.stroke();
  for (const id of effect.stunned || []) {
    const enemy = state.enemies.find((item) => item.id === id);
    if (!enemy) continue;
    ctx.strokeStyle = `rgba(245, 255, 233, ${alpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemyRadius(enemy) + 10, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawParticles() {
  for (const particle of state.particles) {
    ctx.globalAlpha = clamp(particle.life * 2.5, 0, 1);
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
    ctx.globalAlpha = 1;
  }
}

function drawHover() {
  if (state.screen !== "playing") return;
  if (!state.hoverCell) return;
  const { x, y } = state.hoverCell;
  if (!isInside(x, y)) return;
  const check = canPlaceTower(x, y);
  const selectedExisting = towerAt(x, y);
  ctx.fillStyle = selectedExisting
    ? "rgba(255,255,255,0.11)"
    : check.ok
      ? "rgba(107,211,154,0.18)"
      : "rgba(223,92,87,0.18)";
  ctx.fillRect(x * TILE + 2, y * TILE + 2, TILE - 4, TILE - 4);
  ctx.strokeStyle = selectedExisting ? "#ffffff" : check.ok ? "#6bd39a" : "#df5c57";
  ctx.lineWidth = 2;
  ctx.strokeRect(x * TILE + 4, y * TILE + 4, TILE - 8, TILE - 8);
  ctx.lineWidth = 1;
}

function drawOverlayMessage() {
  if (!state.gameOver && !state.won && !state.paused) return;
  const title = state.won ? "防线稳定" : state.gameOver ? "防线失守" : "已暂停";
  const sub = state.won
    ? "全部波次清除，零域核心仍在运转。"
    : state.gameOver
      ? "核心耐久归零。调整迷宫后再试一局。"
      : "按空格或点击暂停按钮继续。";
  ctx.fillStyle = "rgba(7, 10, 11, 0.72)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#e9fff5";
  ctx.font = "bold 42px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 18);
  ctx.fillStyle = "#9db0ad";
  ctx.font = "18px sans-serif";
  ctx.fillText(sub, canvas.width / 2, canvas.height / 2 + 22);
  ctx.textAlign = "left";
}

function renderUi() {
  const level = currentLevel();
  const map = currentMap();
  const waves = currentWaves();
  document.body.classList.toggle("is-level-select", state.screen === "levelSelect");
  ui.levelSubtitle.textContent =
    state.screen === "levelSelect"
      ? `选择关卡和地图：${map.name}`
      : `${level.name} / ${map.name} / ${level.difficulty}`;
  ui.life.textContent = state.lives;
  ui.money.textContent = `¥${state.money}`;
  ui.wave.textContent = `${state.wave} / ${waves.length}`;
  ui.enemy.textContent = String(state.enemies.length + state.spawnQueue.length);
  ui.speed.textContent = `${state.speed}x`;
  ui.pause.textContent = state.paused ? "继续" : "暂停";
  ui.soundButton.textContent = state.soundEnabled ? "音效：开" : "音效：关";
  ui.soundButton.classList.toggle("is-muted", !state.soundEnabled);
  ui.levelSound.textContent = state.soundEnabled ? "音效：开" : "音效：关";
  ui.levelSound.classList.toggle("is-muted", !state.soundEnabled);
  ui.start.disabled = state.screen !== "playing" || state.activeWave || state.gameOver || state.won;
  ui.pause.disabled = state.screen !== "playing" || state.gameOver || state.won;
  ui.speedButton.disabled = state.screen !== "playing";

  document.querySelectorAll(".tower-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tower === state.selectedTowerType);
    button.disabled = state.screen !== "playing";
  });

  renderLevelSelect();
  renderSettlement();
  renderCodex();
  renderSelectedCard();
  renderWavePreview();
  renderLog();
  renderQuickMenu();
}

function renderLevelSelect() {
  const keyValue = `${state.screen}:${state.entryStep}:${state.levelId}:${state.mapId}:${state.wave}:${state.towers.length}:${state.gameOver}:${state.won}`;
  if (uiCache.levelSelect === keyValue) return;
  uiCache.levelSelect = keyValue;

  ui.levelSelect.classList.toggle("hidden", state.screen !== "levelSelect");
  ui.levelSelect.dataset.entryStep = state.entryStep;
  const canResume =
    state.screen === "levelSelect" &&
    (state.towers.length > 0 || state.wave > 0 || state.activeWave) &&
    !state.gameOver &&
    !state.won;
  ui.resumeLevel.classList.toggle("hidden", !canResume);

  const steps = ["difficulty", "map", "confirm"];
  const stepIndex = steps.indexOf(state.entryStep);
  ui.difficultyStep.classList.toggle("hidden", state.entryStep !== "difficulty");
  ui.mapStep.classList.toggle("hidden", state.entryStep !== "map");
  ui.confirmStep.classList.toggle("hidden", state.entryStep !== "confirm");
  ui.entryBack.classList.toggle("hidden", state.entryStep === "difficulty");
  ui.entryNext.classList.toggle("hidden", state.entryStep === "confirm");
  ui.startSelected.classList.toggle("hidden", state.entryStep !== "confirm");
  ui.entryNext.textContent = state.entryStep === "difficulty" ? "下一步：选择地图" : "下一步：确认配置";
  ui.entryStepButtons.forEach((button) => {
    const index = steps.indexOf(button.dataset.entryStep);
    button.classList.toggle("is-current", button.dataset.entryStep === state.entryStep);
    button.classList.toggle("is-done", index >= 0 && index < stepIndex);
  });

  const selectedLevel = currentLevel();
  const selectedMap = currentMap();
  ui.startSelected.textContent = selectedLevel.id === "tutorial" ? "开始教学演练" : "开始作战";
  ui.selectedLoadout.innerHTML = `
    <span>难度 <strong>${escapeHtml(selectedLevel.name)}</strong></span>
    <span>波次 <strong>${selectedLevel.waves.length}</strong></span>
    <span>核心 <strong>${selectedLevel.lives}</strong></span>
    <span>资金 <strong>¥${selectedLevel.money}</strong></span>
    <span>地图 <strong>${escapeHtml(selectedMap.name)}</strong></span>
    <span>入口 <strong>${selectedMap.entries.length}</strong></span>
  `;
  ui.selectedMapPreview.innerHTML = `
    <div class="preview-title">
      <strong>${escapeHtml(selectedMap.name)}</strong>
      <span>${escapeHtml(selectedMap.badge)} / ${escapeHtml(selectedMap.difficulty)}</span>
    </div>
    ${mapPreviewSvg(selectedMap)}
  `;
  ui.mapSpotlight.innerHTML = `
    ${mapPreviewSvg(selectedMap)}
    <div>
      <span class="screen-kicker">${escapeHtml(selectedMap.badge)}</span>
      <h4>${escapeHtml(selectedMap.name)}</h4>
    </div>
    <p>${escapeHtml(selectedMap.description)}</p>
    <div class="level-meta">
      <span>${selectedMap.entries.length} 入口</span>
      <span>核心 ${selectedMap.core.x + 1}-${selectedMap.core.y + 1}</span>
      <span>${escapeHtml(selectedMap.difficulty)}</span>
    </div>
  `;

  ui.levelCards.innerHTML = LEVELS.map((level) => {
    const isCurrent = level.id === state.levelId;
    return `
      <button class="level-choice${isCurrent ? " is-current" : ""}" data-level="${level.id}">
        <span class="screen-kicker">${escapeHtml(level.badge)}</span>
        <strong>${escapeHtml(level.name)}</strong>
        <p>${escapeHtml(level.description)}</p>
        <div class="level-meta">
          <span>${level.waves.length} 波</span>
          <span>核心 ${level.lives}</span>
          <span>资金 ¥${level.money}</span>
          <span>${escapeHtml(level.difficulty)}</span>
        </div>
      </button>
    `;
  }).join("");

  document.querySelectorAll(".level-choice").forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.level));
  });

  ui.mapCards.innerHTML = MAPS.map((map) => {
    const isCurrent = map.id === state.mapId;
    return `
      <button class="map-choice${isCurrent ? " is-current" : ""}" data-map="${map.id}">
        <span class="map-card-preview">${mapPreviewSvg(map, "small")}</span>
        <span class="screen-kicker">${escapeHtml(map.badge)}</span>
        <strong>${escapeHtml(map.name)}</strong>
        <p>${escapeHtml(map.description)}</p>
        <div class="level-meta">
          <span>${map.entries.length} 入口</span>
          <span>核心 ${map.core.x + 1}-${map.core.y + 1}</span>
          <span>${escapeHtml(map.difficulty)}</span>
        </div>
      </button>
    `;
  }).join("");

  document.querySelectorAll(".map-choice").forEach((button) => {
    button.addEventListener("click", () => selectMap(button.dataset.map));
  });
}

function renderSettlement() {
  ui.settlement.classList.toggle("hidden", state.screen !== "settlement");
  if (state.screen !== "settlement") {
    uiCache.settlement = "";
    return;
  }

  const keyValue = `${state.levelId}:${state.won}:${state.wave}:${state.lives}:${state.money}:${state.kills}:${state.leaks}`;
  if (uiCache.settlement === keyValue) return;
  uiCache.settlement = keyValue;

  const level = currentLevel();
  const waves = currentWaves();
  const elapsed = formatDuration((state.endedAt || performance.now()) - state.startedAt);
  const score = Math.max(
    0,
    Math.round(state.wave * 120 + state.kills * 18 + state.lives * 45 + state.money + (state.won ? 520 : 0) - state.leaks * 35),
  );
  const next = nextLevelId();
  ui.settlementBadge.textContent = state.won ? "结算 / 胜利" : "结算 / 失守";
  ui.settlementTitle.textContent = state.won ? "防线稳定" : "防线失守";
  ui.settlementSummary.textContent = state.won
    ? `${level.name} / ${currentMap().name} 已清除。核心仍在运转，可以继续挑战下一关。`
    : `${level.name} / ${currentMap().name} 推进到第 ${state.wave} 波。调整路线和升级节奏后再试一次。`;
  ui.settlementStats.innerHTML = `
    <div><span>关卡</span><strong>${level.name}</strong></div>
    <div><span>地图</span><strong>${currentMap().name}</strong></div>
    <div><span>波次</span><strong>${state.wave} / ${waves.length}</strong></div>
    <div><span>评分</span><strong>${score}</strong></div>
    <div><span>核心</span><strong>${state.lives}</strong></div>
    <div><span>击破</span><strong>${state.kills}</strong></div>
    <div><span>漏怪</span><strong>${state.leaks}</strong></div>
    <div><span>资金</span><strong>¥${state.money}</strong></div>
    <div><span>炮塔</span><strong>${state.towers.length}</strong></div>
    <div><span>用时</span><strong>${elapsed}</strong></div>
  `;
  ui.settlementNext.disabled = !state.won || !next;
  ui.settlementNext.textContent = next
    ? state.won
      ? `下一关：${levelById(next).name}`
      : "通关后进入下一关"
    : "没有下一关";
}

function renderCodex() {
  ui.codex.classList.toggle("hidden", !state.codexOpen);
  if (!state.codexOpen) {
    uiCache.codex = "";
    return;
  }

  ui.codexTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.codexTab === state.codexTab);
  });
  ui.codexViewControls.classList.toggle("hidden", state.codexTab !== "towers");
  ui.codexViewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.codexView === state.codexView);
  });
  ui.codexContent.classList.toggle("is-detail", state.codexTab === "towers" && state.codexView === "detail");

  const keyValue = `codex:${state.codexTab}:${state.codexView}`;
  if (uiCache.codex === keyValue) return;
  uiCache.codex = keyValue;
  ui.codexContent.innerHTML = state.codexTab === "towers" ? renderTowerCodex() : renderEnemyCodex();
}

function towerCodexIcon(type) {
  const def = TOWER_TYPES[type];
  return `<span class="codex-icon codex-tower-icon" style="--icon-color:${def.color}" aria-hidden="true">${towerCodexSvg(type)}</span>`;
}

function enemyCodexIcon(type) {
  const def = ENEMY_TYPES[type];
  return `<span class="codex-icon codex-enemy-icon" style="--icon-color:${def.color}" aria-hidden="true">${enemyCodexSvg(type)}</span>`;
}

function towerCodexSvg(type) {
  const icons = {
    gun: `
      <svg viewBox="0 0 44 44" focusable="false">
        <rect class="icon-dark icon-outline" x="9" y="10" width="20" height="24" rx="3" />
        <circle class="icon-fill" cx="17" cy="22" r="8" />
        <path class="icon-stroke" d="M23 16.5h13M23 22h15M23 27.5h13" />
        <path class="icon-light-stroke" d="M11 35l10 3 11-3" />
        <circle class="icon-dark icon-outline" cx="12" cy="12" r="4" />
      </svg>
    `,
    cannon: `
      <svg viewBox="0 0 44 44" focusable="false">
        <path class="icon-fill" d="M8 17l8-8 14 4 5 10-6 11H13L7 25z" />
        <rect class="icon-fill" x="23" y="17" width="17" height="10" rx="2" />
        <circle class="icon-dark" cx="20" cy="23" r="6" />
        <rect class="icon-light" x="10" y="10" width="6" height="6" rx="1" />
        <rect class="icon-light" x="10" y="29" width="6" height="6" rx="1" />
      </svg>
    `,
    ice: `
      <svg viewBox="0 0 44 44" focusable="false">
        <path class="icon-dark icon-outline" d="M8 30l8-20h12l8 20-14 7z" />
        <path class="icon-fill" d="M22 5l10 15-4 18H16l-4-18z" />
        <path class="icon-light" d="M22 12l5 9-2 11h-6l-2-11z" />
        <path class="icon-light-stroke" d="M22 4v36M9 22h26M13 11l18 22M31 11L13 33" />
      </svg>
    `,
    pierce: `
      <svg viewBox="0 0 44 44" focusable="false">
        <rect class="icon-fill" x="8" y="15" width="23" height="14" rx="2" />
        <rect class="icon-dark" x="13" y="19" width="14" height="6" rx="1" />
        <path class="icon-stroke" d="M10 17l23 10M10 22h24M10 27l23-10" />
        <path class="icon-fill" d="M30 12l11 10-11 10z" />
      </svg>
    `,
    laser: `
      <svg viewBox="0 0 44 44" focusable="false">
        <path class="icon-dark icon-outline" d="M7 12l18-3 11 13-11 13-18-3 6-10z" />
        <rect class="icon-fill" x="23" y="18" width="18" height="8" rx="2" />
        <circle class="icon-light" cx="25" cy="22" r="6" />
        <path class="icon-light-stroke" d="M27 13l11 3M27 31l11-3" />
        <path class="icon-stroke" d="M9 22h12" />
      </svg>
    `,
    shock: `
      <svg viewBox="0 0 44 44" focusable="false">
        <circle class="icon-dark icon-outline" cx="21" cy="22" r="15" />
        <circle class="icon-fill" cx="21" cy="22" r="8" />
        <path class="icon-light-stroke" d="M21 3v9M21 32v9M2 22h9M31 22h9M7 8l7 7M30 29l7 7M36 8l-7 7M14 29l-7 7" />
        <path class="icon-fill" d="M24 18h15v8H24z" />
        <rect class="icon-dark" x="31" y="20" width="6" height="4" rx="1" />
      </svg>
    `,
    aura: `
      <svg viewBox="0 0 44 44" focusable="false">
        <path class="icon-dark icon-outline" d="M22 4l14 10-5 22H13L8 14z" />
        <circle class="icon-fill" cx="22" cy="21" r="8" />
        <path class="icon-light-stroke" d="M9 22c5-10 21-10 26 0M13 29c4 5 14 5 18 0M15 14c4-5 10-5 14 0" />
        <rect class="icon-light" x="18" y="32" width="8" height="6" rx="1" />
      </svg>
    `,
  };
  return icons[type] || "";
}

function enemyCodexSvg(type) {
  const icons = {
    grunt: `
      <svg viewBox="0 0 44 44" focusable="false">
        <circle class="icon-fill" cx="22" cy="23" r="11" />
        <circle class="icon-dark" cx="18" cy="20" r="2" />
        <circle class="icon-dark" cx="26" cy="20" r="2" />
        <path class="icon-stroke" d="M14 31l-5 5M22 34v6M30 31l5 5M13 16L8 12M31 16l5-4" />
      </svg>
    `,
    fast: `
      <svg viewBox="0 0 44 44" focusable="false">
        <path class="icon-fill" d="M28 5l11 17-11 17-13-7-6-10 6-10z" />
        <path class="icon-light" d="M27 12l6 10-6 10-7-4-4-6 4-6z" />
        <path class="icon-light-stroke" d="M4 16h10M2 22h12M5 28h9" />
      </svg>
    `,
    armor: `
      <svg viewBox="0 0 44 44" focusable="false">
        <circle class="icon-fill" cx="22" cy="23" r="13" />
        <path class="icon-dark" d="M13 19l9-7 9 7-2 12-7 5-7-5z" />
        <path class="icon-light-stroke" d="M14 16c8-7 20-1 19 10M14 29c3 5 11 7 17 2" />
        <rect class="icon-light" x="18" y="21" width="8" height="4" rx="1" />
      </svg>
    `,
    split: `
      <svg viewBox="0 0 44 44" focusable="false">
        <circle class="icon-fill" cx="20" cy="24" r="11" />
        <circle class="icon-fill" cx="30" cy="17" r="7" />
        <circle class="icon-fill" cx="30" cy="32" r="6" />
        <circle class="icon-dark" cx="17" cy="22" r="2" />
        <circle class="icon-dark" cx="23" cy="25" r="2" />
        <path class="icon-light-stroke" d="M10 33c4 5 13 6 18 0M27 12l8-5M34 33l6 4" />
      </svg>
    `,
    boss: `
      <svg viewBox="0 0 44 44" focusable="false">
        <path class="icon-fill" d="M6 19l8-11h16l8 11-4 16H10z" />
        <circle class="icon-dark" cx="22" cy="23" r="10" />
        <circle class="icon-fill" cx="22" cy="23" r="5" />
        <path class="icon-light-stroke" d="M9 18H2M42 18h-7M11 34l-5 6M33 34l5 6M15 9L10 3M29 9l5-6" />
        <path class="icon-light-stroke" d="M15 16c5-5 13-5 18 0M14 29c5 5 12 6 18 0" />
      </svg>
    `,
  };
  return icons[type] || "";
}

function renderTowerCodex() {
  if (state.codexView === "detail") return renderTowerCodexDetail();
  return renderTowerCodexSummary();
}

function renderTowerCodexSummary() {
  return TOWER_ORDER.map((type) => {
    const def = TOWER_TYPES[type];
    const guide = TOWER_GUIDES[type];
    const preview = { type, level: 1 };
    const stats = [
      `价格 ¥${def.cost}`,
      def.aura ? `光环 ${Math.round(def.range)}` : `${def.laser ? "索敌" : "射程"} ${Math.round(def.range)}`,
      def.aura ? "" : `伤害 ${def.damage}`,
      def.aura ? "" : `射速 ${def.fireRate}/秒`,
      def.splash ? `爆炸 ${Math.round(def.splash)}` : "",
      def.frostRadius ? `冰爆 ${Math.round(def.frostRadius)}` : "",
      def.slow ? `减速 ${towerSlowPercent(preview)}%` : "",
      def.rayLength ? `射线 ${Math.round(def.rayLength)}` : "",
      def.stunChance ? `眩晕 ${Math.round(def.stunChance * 100)}%` : "",
      def.aura ? auraSummary(1) : "",
    ].filter(Boolean);
    return `
      <article class="codex-card">
        <header>
          ${towerCodexIcon(type)}
          <div>
            <h3>${def.name}</h3>
            <p>${guide.role}</p>
          </div>
        </header>
        <div class="codex-stats">
          ${stats.map((item) => `<span>${item}</span>`).join("")}
        </div>
        <p>${def.text}</p>
        <p class="codex-note">${guide.upgrade}</p>
        <p>${guide.tactic}</p>
      </article>
    `;
  }).join("");
}

function renderTowerCodexDetail() {
  return TOWER_ORDER.map((type) => (type === "aura" ? renderAuraCodexDetail() : renderTowerLevelCodex(type))).join("");
}

function renderTowerLevelCodex(type) {
  const def = TOWER_TYPES[type];
  const guide = TOWER_GUIDES[type];
  return `
    <article class="codex-card codex-card-detail">
      <header>
        ${towerCodexIcon(type)}
        <div>
          <h3>${def.name}</h3>
          <p>${guide.role}</p>
        </div>
      </header>
      <p>${def.text}</p>
      <div class="codex-table-wrap">
        ${renderTowerLevelTable(type)}
      </div>
      <p class="codex-note">${guide.upgrade}</p>
      <p>${guide.tactic}</p>
    </article>
  `;
}

function renderTowerLevelTable(type) {
  const def = TOWER_TYPES[type];
  const rangeLabel = def.laser ? "索敌" : "射程";
  const rows = [1, 2, 3].map((level) => {
    const tower = { type, level };
    return `
      <tr>
        <td>${level}级</td>
        <td>${towerLevelCostLabel(type, level)}</td>
        <td>${Math.round(towerRange(tower))}</td>
        <td>${Math.round(towerVisionRange(tower))}</td>
        <td>${formatCodexNumber(towerDamage(tower), 1)}</td>
        <td>${formatCodexNumber(towerFireRate(tower), 2)}/秒</td>
        <td>${towerLevelSpecialSummary(tower)}</td>
      </tr>
    `;
  }).join("");
  return `
    <table class="codex-table">
      <thead>
        <tr>
          <th>等级</th>
          <th>费用</th>
          <th>${rangeLabel}</th>
          <th>视野</th>
          <th>伤害</th>
          <th>射速</th>
          <th>特殊数据</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderAuraCodexDetail() {
  const def = TOWER_TYPES.aura;
  const guide = TOWER_GUIDES.aura;
  return `
    <article class="codex-card codex-card-detail">
      <header>
        ${towerCodexIcon("aura")}
        <div>
          <h3>${def.name}</h3>
          <p>${guide.role}</p>
        </div>
      </header>
      <p>${def.text}</p>
      <div class="codex-table-wrap">
        ${renderAuraLevelTable()}
      </div>
      <div class="codex-table-wrap">
        ${renderAuraBuffMatrix()}
      </div>
      <p class="codex-note">光环只影响范围内的非光环塔；同一座塔被多个光环覆盖时，取当前最强的一组加成。</p>
      <p>${guide.tactic}</p>
    </article>
  `;
}

function renderAuraLevelTable() {
  const rows = [1, 2, 3].map((level) => {
    const tower = { type: "aura", level };
    return `
      <tr>
        <td>${level}级</td>
        <td>${towerLevelCostLabel("aura", level)}</td>
        <td>${Math.round(baseTowerRange(tower))}</td>
        <td>${formatPercent(0.12 + (level - 1) * 0.07)}</td>
        <td>${level >= 3 ? formatPercent(0.1) : "-"}</td>
      </tr>
    `;
  }).join("");
  return `
    <table class="codex-table">
      <thead>
        <tr>
          <th>等级</th>
          <th>费用</th>
          <th>光环范围</th>
          <th>主增益</th>
          <th>附加增益</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderAuraBuffMatrix() {
  const rows = TOWER_ORDER.filter((type) => type !== "aura")
    .map((type) => {
      const def = TOWER_TYPES[type];
      return `
        <tr>
          <td>${def.name}</td>
          <td>${formatAuraBoostForCodex(type, 1)}</td>
          <td>${formatAuraBoostForCodex(type, 2)}</td>
          <td>${formatAuraBoostForCodex(type, 3)}</td>
        </tr>
      `;
    })
    .join("");
  return `
    <table class="codex-table aura-matrix">
      <thead>
        <tr>
          <th>受益塔</th>
          <th>光环1级</th>
          <th>光环2级</th>
          <th>光环3级</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function formatAuraBoostForCodex(towerType, auraLevel) {
  const boost = auraBuffFor(towerType, auraLevel);
  const labels = {
    range: "射程",
    damage: "伤害",
    fireRate: "频率",
  };
  const orderByTower = {
    gun: ["fireRate", "damage"],
    cannon: ["damage", "range"],
    ice: ["range", "fireRate"],
    pierce: ["range", "damage"],
    laser: ["damage", "range"],
    shock: ["fireRate", "range"],
  };
  return (orderByTower[towerType] || ["range", "damage", "fireRate"])
    .filter((stat) => boost[stat] > 1)
    .map((stat) => `${labels[stat]}+${Math.round((boost[stat] - 1) * 100)}%`)
    .join(" / ");
}

function towerLevelCostLabel(type, level) {
  const def = TOWER_TYPES[type];
  if (level === 1) return `建造 ¥${def.cost}`;
  return `升级 ¥${upgradeCost({ type, level: level - 1 })}`;
}

function towerLevelSpecialSummary(tower) {
  const def = TOWER_TYPES[tower.type];
  const parts = [];
  if (def.splash) parts.push(`爆炸 ${Math.round(towerSplash(tower))}`);
  if (def.frostRadius) parts.push(`冰爆 ${Math.round(towerFrostRadius(tower))}`);
  if (def.slow) parts.push(`减速 ${towerSlowPercent(tower)}% / ${formatCodexNumber(def.slowTime, 1)}秒`);
  if (def.pierce) parts.push("穿甲");
  if (def.rayLength) parts.push(`射线 ${Math.round(towerRayLength(tower))}`);
  if (def.beamWidth) parts.push(`光束 ${Math.round(towerBeamWidth(tower))}`);
  if (def.stunChance) parts.push(`眩晕 ${Math.round(towerStunChance(tower) * 100)}% / ${formatCodexNumber(towerStunTime(tower), 1)}秒`);
  return parts.length ? parts.join(" / ") : "持续单体";
}

function formatCodexNumber(value, digits = 0) {
  return Number(value)
    .toFixed(digits)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*[1-9])0+$/, "$1");
}

function formatPercent(value) {
  return `+${Math.round(value * 100)}%`;
}

function renderEnemyCodex() {
  return ENEMY_ORDER.map((type) => {
    const def = ENEMY_TYPES[type];
    const guide = ENEMY_GUIDES[type];
    const stats = [
      `血量 ${def.hp}`,
      `速度 ${def.speed}`,
      `奖励 ¥${def.reward}`,
      def.armor ? `护甲 ${Math.round(def.armor * 100)}%` : "",
      def.split ? "死亡分裂" : "",
      type === "boss" ? "抵达伤害 5" : "抵达伤害 1",
    ].filter(Boolean);
    return `
      <article class="codex-card">
        <header>
          ${enemyCodexIcon(type)}
          <div>
            <h3>${def.name}</h3>
            <p>${guide.role}</p>
          </div>
        </header>
        <div class="codex-stats">
          ${stats.map((item) => `<span>${item}</span>`).join("")}
        </div>
        <p>${guide.trait}</p>
        <p class="codex-note">${guide.counter}</p>
      </article>
    `;
  }).join("");
}

function renderQuickMenu() {
  if (!state.quickMenu.towerId) {
    ui.quickMenu.classList.add("hidden");
    uiCache.quickMenu = "";
    return;
  }

  const tower = state.towers.find((item) => item.id === state.quickMenu.towerId);
  if (!tower) {
    closeQuickMenu();
    return;
  }

  const def = TOWER_TYPES[tower.type];
  const cost = upgradeCost(tower);
  const canUpgrade = tower.level < 3 && state.money >= cost;
  const upgradeText = tower.level >= 3 ? "已满级" : `升级 ¥${cost}`;
  const refund = towerSellValue(tower);
  const keyValue = `${tower.id}:${tower.level}:${state.money}:${state.quickMenu.x}:${state.quickMenu.y}`;

  if (uiCache.quickMenu !== keyValue) {
    ui.quickMenu.innerHTML = `
      <div class="quick-menu-title">${def.name} Lv.${tower.level}</div>
      <button id="quickUpgradeButton" ${canUpgrade ? "" : "disabled"}>${upgradeText}</button>
      <button id="quickSellButton">出售 ¥${refund}</button>
    `;
    ui.quickMenu.style.left = `${state.quickMenu.x}px`;
    ui.quickMenu.style.top = `${state.quickMenu.y}px`;
    ui.quickMenu.classList.remove("hidden");
    uiCache.quickMenu = keyValue;
    document.querySelector("#quickUpgradeButton")?.addEventListener("click", () => {
      upgradeTower();
      renderQuickMenu();
    });
    document.querySelector("#quickSellButton")?.addEventListener("click", sellTower);
  }
}

function openTowerQuickMenu(tower, event) {
  state.selectedTowerId = tower.id;
  state.quickMenu.towerId = tower.id;
  state.quickMenu.x = clamp(event.clientX, 8, window.innerWidth - 178);
  state.quickMenu.y = clamp(event.clientY, 8, window.innerHeight - 116);
  uiCache.quickMenu = "";
  renderQuickMenu();
}

function closeQuickMenu() {
  state.quickMenu.towerId = null;
  ui.quickMenu.classList.add("hidden");
  uiCache.quickMenu = "";
}

function formatBoost(boost) {
  const parts = [];
  if (boost.range > 1) parts.push(`射程+${Math.round((boost.range - 1) * 100)}%`);
  if (boost.damage > 1) parts.push(`伤害+${Math.round((boost.damage - 1) * 100)}%`);
  if (boost.fireRate > 1) parts.push(`频率+${Math.round((boost.fireRate - 1) * 100)}%`);
  return parts.join(" / ");
}

function towerGridLabel(tower) {
  return `${tower.x + 1}-${tower.y + 1}`;
}

function auraSummary(level) {
  const primary = Math.round((0.12 + (level - 1) * 0.07) * 100);
  return level >= 3 ? `主增益+${primary}% / 附加+10%` : `主增益+${primary}%`;
}

function selectedTowerSpecialLines(tower) {
  const def = TOWER_TYPES[tower.type];
  if (def.aura) {
    const nextAura =
      tower.level >= 3 ? "满级" : `${auraSummary(tower.level + 1)}`;
    return `
      <span>当前增益 <strong>${auraSummary(tower.level)}</strong></span>
      <span>下级增益 <strong>${nextAura}</strong></span>
    `;
  }
  if (def.laser) {
    return `
      <span>射线 <strong>${Math.round(towerRayLength(tower))}</strong></span>
      <span>光束宽度 <strong>${Math.round(towerBeamWidth(tower))}</strong></span>
    `;
  }
  if (def.shockwave) {
    return `
      <span>眩晕概率 <strong>${Math.round(towerStunChance(tower) * 100)}%</strong></span>
      <span>眩晕时长 <strong>${towerStunTime(tower).toFixed(1)}秒</strong></span>
    `;
  }
  if (tower.type === "ice") {
    return `
      <span>冰爆半径 <strong>${Math.round(towerFrostRadius(tower))}</strong></span>
      <span>减速 <strong>${towerSlowPercent(tower)}%</strong></span>
      <span>下级减速 <strong>${
        tower.level >= 3 ? "满级" : `${towerSlowPercent({ ...tower, level: tower.level + 1 })}%`
      }</strong></span>
    `;
  }
  return `<span>视野 <strong>${Math.round(towerVisionRange(tower))}</strong></span>`;
}

function renderAuraTargetList(aura) {
  const targets = auraTargets(aura);
  if (!targets.length) {
    return `
      <div class="aura-target-list">
        <p>当前光环范围内还没有其他炮塔。</p>
      </div>
    `;
  }
  return `
    <div class="aura-target-list">
      <p>正在覆盖 ${targets.length} 座炮塔，亮色连线表示当前生效。</p>
      ${targets
        .map((item) => {
          const def = TOWER_TYPES[item.tower.type];
          return `<span>${item.active ? "生效" : "覆盖"}：${def.name} ${towerGridLabel(item.tower)} / ${formatBoost(item.boost)}</span>`;
        })
        .join("")}
    </div>
  `;
}

function renderSelectedCard() {
  const tower = selectedTower();
  if (tower) {
    const def = TOWER_TYPES[tower.type];
    const cost = upgradeCost(tower);
    const range = Math.round(towerRange(tower));
    const rangeLabel = def.aura ? "光环" : def.laser ? "索敌" : "射程";
    const boost = towerBoost(tower);
    const specialLines = selectedTowerSpecialLines(tower);
    const damage = Math.round(towerDamage(tower));
    const fireRate = towerFireRate(tower).toFixed(2);
    const nextRange =
      tower.level >= 3 ? "满级" : Math.round(towerRange({ ...tower, level: tower.level + 1 }));
    const combatLines = def.aura
      ? ""
      : `
        <span>伤害 <strong>${damage}</strong></span>
        <span>射速 <strong>${fireRate}/秒</strong></span>
      `;
    const sourceAura = boost.sourceId ? state.towers.find((item) => item.id === boost.sourceId) : null;
    const boostLine = sourceAura
      ? `<span>光环加成 <strong>${formatBoost(boost)}</strong></span>
        <span>加成来源 <strong>${TOWER_TYPES[sourceAura.type].name} ${towerGridLabel(sourceAura)}</strong></span>`
      : "";
    const auraList = def.aura ? renderAuraTargetList(tower) : "";
    const keyValue = `tower:${tower.id}:${tower.level}:${state.money}:${boost.range}:${boost.damage}:${boost.fireRate}:${auraTargets(tower).map((item) => `${item.tower.id}:${item.active}`).join(",")}`;
    const html = `
      <h2>已选炮塔</h2>
      <p><span class="tower-name">${def.name}</span>，等级 ${tower.level}。${def.text}</p>
      <div class="tower-stats">
        <span>${rangeLabel} <strong>${range}</strong></span>
        <span>下级${rangeLabel} <strong>${nextRange}</strong></span>
        ${combatLines}
        ${specialLines}
        ${boostLine}
        <span>升级 <strong>${tower.level >= 3 ? "满级" : `¥${cost}`}</strong></span>
      </div>
      <div class="tower-actions">
        <button id="upgradeTowerButton"${tower.level >= 3 ? " disabled" : ""}>升级</button>
        <button id="sellTowerButton">出售</button>
      </div>
      ${auraList}
    `;
    if (uiCache.selected !== keyValue) {
      ui.selected.innerHTML = html;
      uiCache.selected = keyValue;
      document.querySelector("#upgradeTowerButton")?.addEventListener("click", upgradeTower);
      document.querySelector("#sellTowerButton")?.addEventListener("click", sellTower);
    }
    return;
  }

  const def = TOWER_TYPES[state.selectedTowerType];
  const previewTower = { type: state.selectedTowerType, level: 1 };
  const rangeLabel = def.aura ? "光环" : def.laser ? "索敌" : "射程";
  const buildCombatLines = def.aura
    ? ""
    : `
      <span>伤害 <strong>${def.damage}</strong></span>
      <span>射速 <strong>${def.fireRate}/秒</strong></span>
    `;
  const buildSpecialLines = selectedTowerSpecialLines(previewTower);
  const growthText = def.aura
    ? "升级会扩大光环并提高增益。"
    : def.laser
      ? "升级会提升索敌、射线长度和伤害。"
      : def.shockwave
        ? "升级会提升范围、伤害和眩晕能力。"
        : "升级会提升射程和火力。";
  const keyValue = `build:${state.selectedTowerType}`;
  const html = `
    <h2>当前选择</h2>
    <p><span class="tower-name">${def.name}</span>：${def.text} ${growthText}</p>
    <div class="tower-stats">
      <span>价格 <strong>¥${def.cost}</strong></span>
      <span>${rangeLabel} <strong>${Math.round(def.range)}</strong></span>
      ${buildCombatLines}
      ${buildSpecialLines}
    </div>
  `;
  if (uiCache.selected !== keyValue) {
    ui.selected.innerHTML = html;
    uiCache.selected = keyValue;
  }
}

function renderWavePreview() {
  const next = currentWaves()[state.wave];
  const keyValue = `preview:${state.levelId}:${state.mapId}:${state.wave}`;
  if (uiCache.preview === keyValue) return;
  uiCache.preview = keyValue;
  if (!next) {
    ui.preview.innerHTML = `<p class="small">所有波次已清除。</p>`;
    return;
  }
  ui.preview.innerHTML = next.packs
    .map((pack) => {
      const enemy = ENEMY_TYPES[pack.type];
      const entry = ENTRIES[pack.entry];
      return `
        <article class="wave-line">
          <i class="enemy-dot ${enemy.className}"></i>
          <div>
            <strong>${enemy.name} × ${pack.count}</strong>
            <span>${entry.name}</span>
          </div>
          <span>${pack.gap.toFixed(1)}s</span>
        </article>
      `;
    })
    .join("");
}

function renderLog() {
  const keyValue = state.logs.map((entry) => `${entry.wave}:${entry.time}:${entry.text}`).join("|");
  if (uiCache.log === keyValue) return;
  uiCache.log = keyValue;
  if (!state.logs.length) {
    ui.log.innerHTML = `<article><time>系统</time>建造炮塔来改变路线。系统会阻止你完全堵死道路。</article>`;
    return;
  }
  ui.log.innerHTML = state.logs
    .map(
      (entry) => `
        <article>
          <time>${entry.time} / 波次 ${entry.wave}</time>
          ${entry.text}
        </article>
      `,
    )
    .join("");
}

function openCodex(tab = "towers") {
  if (!state.codexOpen) {
    state.codexWasPaused = state.paused;
  }
  state.codexOpen = true;
  state.codexTab = tab;
  if (state.screen === "playing") state.paused = true;
  closeQuickMenu();
  uiCache.codex = "";
  playSound("select");
  renderCodex();
}

function closeCodex() {
  if (!state.codexOpen) return;
  state.codexOpen = false;
  if (state.screen === "playing") state.paused = state.codexWasPaused;
  ui.codex.classList.add("hidden");
  uiCache.codex = "";
  playSound("select");
}

function cellFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = Math.floor(((event.clientX - rect.left) * scaleX) / TILE);
  const y = Math.floor(((event.clientY - rect.top) * scaleY) / TILE);
  return { x, y };
}

canvas.addEventListener("mousemove", (event) => {
  if (state.screen !== "playing") return;
  state.hoverCell = cellFromEvent(event);
});

canvas.addEventListener("mouseleave", () => {
  state.hoverCell = null;
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  if (state.screen !== "playing") return;
  const cell = cellFromEvent(event);
  const existing = towerAt(cell.x, cell.y);
  if (existing) {
    openTowerQuickMenu(existing, event);
    return;
  }
  state.selectedTowerId = null;
  closeQuickMenu();
});

canvas.addEventListener("click", (event) => {
  if (state.screen !== "playing") return;
  if (state.gameOver || state.won) return;
  closeQuickMenu();
  const cell = cellFromEvent(event);
  const existing = towerAt(cell.x, cell.y);
  if (existing) {
    state.selectedTowerId = existing.id;
    return;
  }
  state.selectedTowerId = null;
  placeTower(cell.x, cell.y);
});

document.querySelectorAll(".tower-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (state.screen !== "playing") return;
    state.selectedTowerType = button.dataset.tower;
    state.selectedTowerId = null;
    closeQuickMenu();
    playSound("select");
    showToast(`已选择：${TOWER_TYPES[state.selectedTowerType].name}`);
  });
});

ui.start.addEventListener("click", startWave);
ui.pause.addEventListener("click", () => {
  if (state.screen !== "playing" || state.gameOver || state.won) return;
  state.paused = !state.paused;
  playSound("select");
});
ui.speedButton.addEventListener("click", () => {
  if (state.screen !== "playing") return;
  state.speed = state.speed === 1 ? 2 : state.speed === 2 ? 3 : 1;
  playSound("select");
  showToast(`速度：${state.speed}x`);
});
ui.soundButton.addEventListener("click", toggleSound);
ui.codexButton.addEventListener("click", () => openCodex("towers"));
ui.levelSelectButton.addEventListener("click", openLevelSelect);
ui.reset.addEventListener("click", resetGame);
ui.startSelected.addEventListener("click", () => startLevel(state.levelId));
ui.entryBack.addEventListener("click", () => stepEntry(-1));
ui.entryNext.addEventListener("click", () => stepEntry(1));
ui.entryStepButtons.forEach((button) => {
  button.addEventListener("click", () => setEntryStep(button.dataset.entryStep));
});
ui.skipTutorial.addEventListener("click", () => {
  state.levelId = "standard";
  clearBattleForMapPreview();
  setEntryStep("map");
  playSound("select");
  showToast("已选择标准防线");
});
ui.levelSound.addEventListener("click", toggleSound);
ui.levelCodex.addEventListener("click", () => openCodex("towers"));
ui.resumeLevel.addEventListener("click", resumeCurrentLevel);
ui.settlementRetry.addEventListener("click", () => startLevel(state.levelId));
ui.settlementNext.addEventListener("click", () => {
  const next = nextLevelId();
  if (next) startLevel(next);
});
ui.settlementSelect.addEventListener("click", openLevelSelect);
ui.codexClose.addEventListener("click", closeCodex);
ui.codexTabs.forEach((button) => {
  button.addEventListener("click", () => {
    state.codexTab = button.dataset.codexTab;
    uiCache.codex = "";
    renderCodex();
  });
});
ui.codexViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.codexView = button.dataset.codexView;
    uiCache.codex = "";
    renderCodex();
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.codexOpen) {
    closeCodex();
    return;
  }
  if (state.screen !== "playing") return;
  const towerIndex = Number(event.key) - 1;
  if (towerIndex >= 0 && towerIndex < TOWER_ORDER.length) {
    const type = TOWER_ORDER[towerIndex];
    state.selectedTowerType = type;
    state.selectedTowerId = null;
    closeQuickMenu();
    playSound("select");
  }
  if (event.code === "Space") {
    event.preventDefault();
    state.paused = !state.paused;
    playSound("select");
  }
  if (event.key === "Escape") {
    state.selectedTowerId = null;
    closeQuickMenu();
  }
});

function openLevelSelect() {
  closeCodex();
  state.screen = "levelSelect";
  state.entryStep = "difficulty";
  state.hoverCell = null;
  closeQuickMenu();
  ui.settlement.classList.add("hidden");
  uiCache.levelSelect = "";
  renderLevelSelect();
}

function setEntryStep(step) {
  const steps = ["difficulty", "map", "confirm"];
  if (!steps.includes(step)) return;
  state.entryStep = step;
  uiCache.levelSelect = "";
  renderLevelSelect();
  if (state.screen === "levelSelect") {
    requestAnimationFrame(() => ui.levelSelect.scrollTo({ top: 0, behavior: "smooth" }));
  }
}

function stepEntry(direction) {
  const steps = ["difficulty", "map", "confirm"];
  const index = steps.indexOf(state.entryStep);
  const next = steps[clamp(index + direction, 0, steps.length - 1)];
  setEntryStep(next);
  playSound("select");
}

function selectLevel(levelId) {
  const level = levelById(levelId);
  if (state.levelId === level.id) return;
  state.levelId = level.id;
  clearBattleForMapPreview();
  closeQuickMenu();
  resetUiCache();
  playSound("select");
  showToast(`已选择关卡：${level.name}`);
  renderLevelSelect();
}

function selectMap(mapId) {
  if (state.mapId === mapId) return;
  state.mapId = mapId;
  applyMap(mapId);
  clearBattleForMapPreview();
  closeQuickMenu();
  resetUiCache();
  playSound("select");
  showToast(`已选择地图：${currentMap().name}`);
  renderLevelSelect();
}

function resumeCurrentLevel() {
  if (state.gameOver || state.won) return;
  state.screen = "playing";
  ui.levelSelect.classList.add("hidden");
  uiCache.levelSelect = "";
  showToast("继续战局");
}

function startLevel(levelId, options = {}) {
  const level = levelById(levelId);
  applyMap(state.mapId);
  Object.assign(state, {
    screen: "playing",
    levelId: level.id,
    mapId: currentMap().id,
    lives: level.lives,
    money: level.money,
    wave: 0,
    activeWave: false,
    spawnQueue: [],
    spawnTimer: 0,
    enemies: [],
    towers: [],
    projectiles: [],
    particles: [],
    effects: [],
    selectedTowerType: "gun",
    selectedTowerId: null,
    codexOpen: false,
    codexTab: "towers",
    codexView: state.codexView,
    codexWasPaused: false,
    quickMenu: {
      towerId: null,
      x: 0,
      y: 0,
    },
    hoverCell: null,
    paused: false,
    speed: 1,
    shake: {
      time: 0,
      duration: 0,
      strength: 0,
      x: 0,
      y: 0,
    },
    message: "欢迎来到零域方阵。先用炮塔制造弯路，别把路完全封死。",
    gameOver: false,
    won: false,
    kills: 0,
    leaks: 0,
    startedAt: performance.now(),
    endedAt: null,
    lastTime: performance.now(),
    logs: [],
  });
  resetUiCache();
  closeQuickMenu();
  ui.levelSelect.classList.add("hidden");
  ui.settlement.classList.add("hidden");
  ui.codex.classList.add("hidden");
  addLog(options.restart ? `${level.name} / ${currentMap().name} 重新开始。` : `${level.name} / ${currentMap().name} 开始。`);
  if (level.id === "tutorial") addLog("教学演练不是必经流程，可以从关卡选择直接跳过。");
  playSound(options.restart ? "select" : "wave");
  showToast(options.restart ? "重新开始" : `进入：${level.name}`);
  renderUi();
}

function finishLevel(won) {
  if (state.screen === "settlement") return;
  state.won = won;
  state.gameOver = !won;
  state.activeWave = false;
  state.spawnQueue = [];
  state.screen = "settlement";
  state.endedAt = performance.now();
  closeQuickMenu();
  uiCache.settlement = "";
  playSound(won ? "victory" : "defeat");
  shakeScreen(won ? 2.5 : 8, won ? 0.18 : 0.38);
  renderSettlement();
}

function resetGame() {
  startLevel(state.levelId, { restart: true });
}

function loop(now) {
  const rawDt = Math.min(0.05, (now - state.lastTime) / 1000);
  state.lastTime = now;
  updateShake(rawDt);
  update(rawDt);
  draw();
  renderUi();
  requestAnimationFrame(loop);
}

addLog("系统上线。建议先在入口和核心之间做弯道，再开始第一波。");
requestAnimationFrame(loop);
