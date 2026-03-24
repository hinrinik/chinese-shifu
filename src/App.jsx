import { useState, useEffect } from "react";

const BOOK_WORDS = [
  // === HEALTH & ILLNESS (Lesson: Getting Sick) ===
  { id: 1, hanzi: "生病", pinyin: "shēng bìng", english: "to get sick", category: "health & illness" },
  { id: 2, hanzi: "感冒", pinyin: "gǎnmào", english: "to have a cold", category: "health & illness" },
  { id: 3, hanzi: "身体", pinyin: "shēntǐ", english: "body, health", category: "health & illness" },
  { id: 4, hanzi: "痒", pinyin: "yǎng", english: "itchy", category: "health & illness" },
  { id: 5, hanzi: "过敏", pinyin: "guòmǐn", english: "to be allergic to", category: "health & illness" },
  { id: 6, hanzi: "药店", pinyin: "yàodiàn", english: "pharmacy", category: "health & illness" },
  { id: 7, hanzi: "健康", pinyin: "jiànkāng", english: "healthy; health", category: "health & illness" },
  { id: 8, hanzi: "保险", pinyin: "bǎoxiǎn", english: "insurance; secure", category: "health & illness" },
  { id: 9, hanzi: "赶快", pinyin: "gǎnkuài", english: "right away, quickly", category: "health & illness" },
  { id: 10, hanzi: "要不然", pinyin: "yàobùrán", english: "otherwise", category: "health & illness" },
  { id: 11, hanzi: "越来越", pinyin: "yuè lái yuè", english: "more and more", category: "health & illness" },
  { id: 12, hanzi: "上次", pinyin: "shàng cì", english: "last time", category: "health & illness" },
  { id: 13, hanzi: "休息", pinyin: "xiūxi", english: "to take a break, to rest", category: "health & illness" },
  { id: 14, hanzi: "懒", pinyin: "lǎn", english: "lazy", category: "health & illness" },
  { id: 15, hanzi: "再说", pinyin: "zàishuō", english: "moreover", category: "health & illness" },
  { id: 16, hanzi: "乱", pinyin: "luàn", english: "randomly, messily", category: "health & illness" },
  { id: 17, hanzi: "药", pinyin: "yào", english: "medicine", category: "health & illness" },
  { id: 18, hanzi: "片", pinyin: "piàn", english: "(measure word for tablets)", category: "health & illness" },
  { id: 19, hanzi: "遍", pinyin: "biàn", english: "(measure word for complete courses of action)", category: "health & illness" },
  { id: 20, hanzi: "最好", pinyin: "zuìhǎo", english: "had better", category: "health & illness" },
  { id: 21, hanzi: "小时", pinyin: "xiǎoshí", english: "hour", category: "health & illness" },
  { id: 22, hanzi: "办法", pinyin: "bànfǎ", english: "method, way", category: "health & illness" },

  // === SEEING A DOCTOR ===
  { id: 23, hanzi: "病人", pinyin: "bìngrén", english: "patient", category: "seeing a doctor" },
  { id: 24, hanzi: "病", pinyin: "bìng", english: "illness; to get sick", category: "seeing a doctor" },
  { id: 25, hanzi: "医院", pinyin: "yīyuàn", english: "hospital", category: "seeing a doctor" },
  { id: 26, hanzi: "看病", pinyin: "kàn bìng", english: "to see a doctor", category: "seeing a doctor" },
  { id: 27, hanzi: "肚子", pinyin: "dùzi", english: "belly, abdomen, stomach", category: "seeing a doctor" },
  { id: 28, hanzi: "疼死", pinyin: "téng sǐ", english: "really painful", category: "seeing a doctor" },
  { id: 29, hanzi: "疼", pinyin: "téng", english: "aching", category: "seeing a doctor" },
  { id: 30, hanzi: "死", pinyin: "sǐ", english: "to die; (extreme degree)", category: "seeing a doctor" },
  { id: 31, hanzi: "夜里", pinyin: "yè li", english: "at night", category: "seeing a doctor" },
  { id: 32, hanzi: "好几", pinyin: "hǎo jǐ", english: "quite a few", category: "seeing a doctor" },
  { id: 33, hanzi: "厕所", pinyin: "cèsuǒ", english: "restroom, toilet", category: "seeing a doctor" },
  { id: 34, hanzi: "把", pinyin: "bǎ", english: "(disposition/arrangement particle)", category: "seeing a doctor" },
  { id: 35, hanzi: "冰箱", pinyin: "bīngxiāng", english: "refrigerator", category: "seeing a doctor" },
  { id: 36, hanzi: "发烧", pinyin: "fā shāo", english: "to have a fever", category: "seeing a doctor" },
  { id: 37, hanzi: "躺下", pinyin: "tǎng xia", english: "to lie down", category: "seeing a doctor" },
  { id: 38, hanzi: "躺", pinyin: "tǎng", english: "to lie, to recline", category: "seeing a doctor" },
  { id: 39, hanzi: "检查", pinyin: "jiǎnchá", english: "to examine", category: "seeing a doctor" },
  { id: 40, hanzi: "吃坏", pinyin: "chī huài", english: "to get sick from bad food", category: "seeing a doctor" },
  { id: 41, hanzi: "坏", pinyin: "huài", english: "bad", category: "seeing a doctor" },
  { id: 42, hanzi: "打针", pinyin: "dǎ zhēn", english: "to get an injection", category: "seeing a doctor" },
  { id: 43, hanzi: "针", pinyin: "zhēn", english: "needle", category: "seeing a doctor" },

  // === APPEARANCE & DESCRIPTIONS ===
  { id: 44, hanzi: "钟头", pinyin: "zhōngtóu", english: "hour", category: "appearance" },
  { id: 45, hanzi: "以为", pinyin: "yǐwéi", english: "to assume erroneously", category: "appearance" },
  { id: 46, hanzi: "聪明", pinyin: "cōngming", english: "smart, bright, clever", category: "appearance" },
  { id: 47, hanzi: "用功", pinyin: "yònggōng", english: "hardworking, diligent", category: "appearance" },
  { id: 48, hanzi: "暑期", pinyin: "shǔqī", english: "summer term", category: "appearance" },
  { id: 49, hanzi: "班", pinyin: "bān", english: "class", category: "appearance" },
  { id: 50, hanzi: "长", pinyin: "zhǎng", english: "to grow, to appear", category: "appearance" },
  { id: 51, hanzi: "可爱", pinyin: "kě'ài", english: "cute, lovable", category: "appearance" },
  { id: 52, hanzi: "去年", pinyin: "qùnián", english: "last year", category: "appearance" },
  { id: 53, hanzi: "属", pinyin: "shǔ", english: "to belong to", category: "appearance" },
  { id: 54, hanzi: "狗", pinyin: "gǒu", english: "dog", category: "appearance" },
  { id: 55, hanzi: "脸", pinyin: "liǎn", english: "face", category: "appearance" },
  { id: 56, hanzi: "圆", pinyin: "yuán", english: "round", category: "appearance" },
  { id: 57, hanzi: "眼睛", pinyin: "yǎnjing", english: "eye", category: "appearance" },
  { id: 58, hanzi: "鼻子", pinyin: "bízi", english: "nose", category: "appearance" },
  { id: 59, hanzi: "嘴", pinyin: "zuǐ", english: "mouth", category: "appearance" },
  { id: 60, hanzi: "像", pinyin: "xiàng", english: "to be like, to look like", category: "appearance" },
  { id: 61, hanzi: "长大", pinyin: "zhǎng dà", english: "to grow up", category: "appearance" },
  { id: 62, hanzi: "一定", pinyin: "yídìng", english: "certain; certainly, definitely", category: "appearance" },
  { id: 63, hanzi: "蛋糕", pinyin: "dàngāo", english: "cake", category: "appearance" },
  { id: 64, hanzi: "最", pinyin: "zuì", english: "most, (superlative) -est", category: "appearance" },

  // === CELEBRATIONS & GIFTS ===
  { id: 65, hanzi: "过", pinyin: "guò", english: "to celebrate; to live (a life)", category: "celebrations" },
  { id: 66, hanzi: "舞会", pinyin: "wǔhuì", english: "dance party, ball", category: "celebrations" },
  { id: 67, hanzi: "表姐", pinyin: "biǎojiě", english: "older female cousin", category: "celebrations" },
  { id: 68, hanzi: "中学", pinyin: "zhōngxué", english: "middle school", category: "celebrations" },
  { id: 69, hanzi: "送", pinyin: "sòng", english: "to give as a gift", category: "celebrations" },
  { id: 70, hanzi: "礼物", pinyin: "lǐwù", english: "gift, present", category: "celebrations" },
  { id: 71, hanzi: "本", pinyin: "běn", english: "(measure word for books)", category: "celebrations" },
  { id: 72, hanzi: "饮料", pinyin: "yǐnliào", english: "beverage", category: "celebrations" },
  { id: 73, hanzi: "水果", pinyin: "shuǐguǒ", english: "fruit", category: "celebrations" },
  { id: 74, hanzi: "花", pinyin: "huā", english: "flower", category: "celebrations" },
  { id: 75, hanzi: "爱", pinyin: "ài", english: "to love, to like", category: "celebrations" },
  { id: 76, hanzi: "苹果", pinyin: "píngguǒ", english: "apple", category: "celebrations" },
  { id: 77, hanzi: "梨", pinyin: "lí", english: "pear", category: "celebrations" },
  { id: 78, hanzi: "西瓜", pinyin: "xīgua", english: "watermelon", category: "celebrations" },
  { id: 79, hanzi: "住", pinyin: "zhù", english: "to live (in a place)", category: "celebrations" },
  { id: 80, hanzi: "重", pinyin: "zhòng", english: "heavy, serious", category: "celebrations" },
  { id: 81, hanzi: "接", pinyin: "jiē", english: "to catch, to meet, to welcome", category: "celebrations" },
  { id: 82, hanzi: "楼", pinyin: "lóu", english: "building, floor", category: "celebrations" },

  // === DIRECTIONS & NAVIGATION ===
  { id: 83, hanzi: "中国城", pinyin: "Zhōngguóchéng", english: "Chinatown", category: "directions" },
  { id: 84, hanzi: "城", pinyin: "chéng", english: "town, city", category: "directions" },
  { id: 85, hanzi: "地图", pinyin: "dìtú", english: "map", category: "directions" },
  { id: 86, hanzi: "拿", pinyin: "ná", english: "to take, to get", category: "directions" },
  { id: 87, hanzi: "次", pinyin: "cì", english: "(measure word for frequency)", category: "directions" },
  { id: 88, hanzi: "从", pinyin: "cóng", english: "from", category: "directions" },
  { id: 89, hanzi: "一直", pinyin: "yìzhí", english: "straight, continuously", category: "directions" },
  { id: 90, hanzi: "往", pinyin: "wǎng", english: "towards", category: "directions" },
  { id: 91, hanzi: "南", pinyin: "nán", english: "south", category: "directions" },
  { id: 92, hanzi: "路口", pinyin: "lùkǒu", english: "intersection", category: "directions" },
  { id: 93, hanzi: "西", pinyin: "xī", english: "west", category: "directions" },
  { id: 94, hanzi: "拐", pinyin: "guǎi", english: "to turn", category: "directions" },
  { id: 95, hanzi: "哎", pinyin: "āi", english: "(exclamation of surprise)", category: "directions" },
  { id: 96, hanzi: "东", pinyin: "dōng", english: "east", category: "directions" },
  { id: 97, hanzi: "北", pinyin: "běi", english: "north", category: "directions" },
  { id: 98, hanzi: "前", pinyin: "qián", english: "forward, ahead", category: "directions" },
  { id: 99, hanzi: "红绿灯", pinyin: "hónglǜdēng", english: "traffic light", category: "directions" },
  { id: 100, hanzi: "灯", pinyin: "dēng", english: "light", category: "directions" },
  { id: 101, hanzi: "右", pinyin: "yòu", english: "right", category: "directions" },
  { id: 102, hanzi: "左", pinyin: "zuǒ", english: "left", category: "directions" },
  { id: 103, hanzi: "前面", pinyin: "qiánmiàn", english: "ahead, in front of", category: "directions" },

  // === CAMPUS & PLACES ===
  { id: 104, hanzi: "上", pinyin: "shàng", english: "to go (colloq.)", category: "campus & places" },
  { id: 105, hanzi: "中心", pinyin: "zhōngxīn", english: "center", category: "campus & places" },
  { id: 106, hanzi: "听说", pinyin: "tīngshuō", english: "to be told, to hear of", category: "campus & places" },
  { id: 107, hanzi: "运动", pinyin: "yùndòng", english: "sports", category: "campus & places" },
  { id: 108, hanzi: "场", pinyin: "chǎng", english: "field", category: "campus & places" },
  { id: 109, hanzi: "旁边", pinyin: "pángbiān", english: "side", category: "campus & places" },
  { id: 110, hanzi: "远", pinyin: "yuǎn", english: "far", category: "campus & places" },
  { id: 111, hanzi: "离", pinyin: "lí", english: "away from", category: "campus & places" },
  { id: 112, hanzi: "近", pinyin: "jìn", english: "near", category: "campus & places" },
  { id: 113, hanzi: "活动", pinyin: "huódòng", english: "activity", category: "campus & places" },
  { id: 114, hanzi: "中间", pinyin: "zhōngjiān", english: "middle", category: "campus & places" },
  { id: 115, hanzi: "书店", pinyin: "shūdiàn", english: "bookstore", category: "campus & places" },
  { id: 116, hanzi: "地方", pinyin: "dìfang", english: "place", category: "campus & places" },
  { id: 117, hanzi: "里边", pinyin: "lǐbian", english: "inside", category: "campus & places" },
  { id: 118, hanzi: "清楚", pinyin: "qīngchu", english: "clear", category: "campus & places" },
  { id: 119, hanzi: "没关系", pinyin: "méi guānxi", english: "it doesn't matter", category: "campus & places" },

  // === FOOD & COOKING ===
  { id: 120, hanzi: "师傅", pinyin: "shīfu", english: "master worker", category: "food & cooking" },
  { id: 121, hanzi: "好吃", pinyin: "hǎochī", english: "delicious", category: "food & cooking" },
  { id: 122, hanzi: "糖醋鱼", pinyin: "tángcùyú", english: "sweet-and-sour fish", category: "food & cooking" },
  { id: 123, hanzi: "糖", pinyin: "táng", english: "sugar", category: "food & cooking" },
  { id: 124, hanzi: "醋", pinyin: "cù", english: "vinegar", category: "food & cooking" },
  { id: 125, hanzi: "甜", pinyin: "tián", english: "sweet", category: "food & cooking" },
  { id: 126, hanzi: "酸", pinyin: "suān", english: "sour", category: "food & cooking" },
  { id: 127, hanzi: "极", pinyin: "jí", english: "extremely", category: "food & cooking" },
  { id: 128, hanzi: "红烧", pinyin: "hóngshāo", english: "to braise in soy sauce", category: "food & cooking" },
  { id: 129, hanzi: "牛肉", pinyin: "niúròu", english: "beef", category: "food & cooking" },
  { id: 130, hanzi: "牛", pinyin: "niú", english: "cow, ox", category: "food & cooking" },
  { id: 131, hanzi: "鱼", pinyin: "yú", english: "fish", category: "food & cooking" },
  { id: 132, hanzi: "凉拌", pinyin: "liángbàn", english: "cold tossed (food)", category: "food & cooking" },
  { id: 133, hanzi: "黄瓜", pinyin: "huánggua", english: "cucumber", category: "food & cooking" },
  { id: 134, hanzi: "米饭", pinyin: "mǐfàn", english: "cooked rice", category: "food & cooking" },
  { id: 135, hanzi: "忘", pinyin: "wàng", english: "to forget", category: "food & cooking" },
  { id: 136, hanzi: "带", pinyin: "dài", english: "to bring, to carry", category: "food & cooking" },
  { id: 137, hanzi: "饭卡", pinyin: "fànkǎ", english: "meal card", category: "food & cooking" },
  { id: 138, hanzi: "错", pinyin: "cuò", english: "wrong", category: "food & cooking" },
  { id: 139, hanzi: "卖完", pinyin: "mài wán", english: "to be sold out", category: "food & cooking" },
  { id: 140, hanzi: "完", pinyin: "wán", english: "finished", category: "food & cooking" },
  { id: 141, hanzi: "青菜", pinyin: "qīngcài", english: "green, leafy vegetable", category: "food & cooking" },
  { id: 142, hanzi: "冰茶", pinyin: "bīngchá", english: "iced tea", category: "food & cooking" },
  { id: 143, hanzi: "冰", pinyin: "bīng", english: "ice", category: "food & cooking" },
  { id: 144, hanzi: "渴", pinyin: "kě", english: "thirsty", category: "food & cooking" },
  { id: 145, hanzi: "些", pinyin: "xiē", english: "some (measure word)", category: "food & cooking" },
  { id: 146, hanzi: "够", pinyin: "gòu", english: "enough", category: "food & cooking" },
  { id: 147, hanzi: "饿", pinyin: "è", english: "hungry", category: "food & cooking" },
  { id: 148, hanzi: "上菜", pinyin: "shàng cài", english: "to serve food", category: "food & cooking" },

  // === RESTAURANT & DINING ===
  { id: 149, hanzi: "饭馆", pinyin: "fànguǎn", english: "restaurant", category: "restaurant" },
  { id: 150, hanzi: "好像", pinyin: "hǎoxiàng", english: "to seem, to be like", category: "restaurant" },
  { id: 151, hanzi: "位子", pinyin: "wèizi", english: "seat", category: "restaurant" },
  { id: 152, hanzi: "服务员", pinyin: "fúwùyuán", english: "waiter, attendant", category: "restaurant" },
  { id: 153, hanzi: "服务", pinyin: "fúwù", english: "to serve, to provide service", category: "restaurant" },
  { id: 154, hanzi: "桌子", pinyin: "zhuōzi", english: "table", category: "restaurant" },
  { id: 155, hanzi: "点菜", pinyin: "diǎn cài", english: "to order food", category: "restaurant" },
  { id: 156, hanzi: "盘", pinyin: "pán", english: "plate, dish", category: "restaurant" },
  { id: 157, hanzi: "饺子", pinyin: "jiǎozi", english: "dumplings", category: "restaurant" },
  { id: 158, hanzi: "素", pinyin: "sù", english: "vegetarian", category: "restaurant" },
  { id: 159, hanzi: "家常", pinyin: "jiācháng", english: "home-style", category: "restaurant" },
  { id: 160, hanzi: "豆腐", pinyin: "dòufu", english: "tofu, bean curd", category: "restaurant" },
  { id: 161, hanzi: "放", pinyin: "fàng", english: "to put, to place", category: "restaurant" },
  { id: 162, hanzi: "肉", pinyin: "ròu", english: "meat", category: "restaurant" },
  { id: 163, hanzi: "碗", pinyin: "wǎn", english: "bowl", category: "restaurant" },
  { id: 164, hanzi: "酸辣汤", pinyin: "suānlàtāng", english: "hot-and-sour soup", category: "restaurant" },
  { id: 165, hanzi: "辣", pinyin: "là", english: "spicy, hot", category: "restaurant" },
  { id: 166, hanzi: "汤", pinyin: "tāng", english: "soup", category: "restaurant" },
  { id: 167, hanzi: "味精", pinyin: "wèijīng", english: "MSG", category: "restaurant" },
  { id: 168, hanzi: "盐", pinyin: "yán", english: "salt", category: "restaurant" },
  { id: 169, hanzi: "小白菜", pinyin: "xiǎo báicài", english: "baby bok choy", category: "restaurant" },
  { id: 170, hanzi: "刚", pinyin: "gāng", english: "just", category: "restaurant" },

  // === WEATHER & SEASONS ===
  { id: 171, hanzi: "那么", pinyin: "nàme", english: "so, such", category: "weather & seasons" },
  { id: 172, hanzi: "好玩儿", pinyin: "hǎowánr", english: "fun, amusing", category: "weather & seasons" },
  { id: 173, hanzi: "非常", pinyin: "fēicháng", english: "very, extremely", category: "weather & seasons" },
  { id: 174, hanzi: "糟糕", pinyin: "zāogāo", english: "terrible, how terrible", category: "weather & seasons" },
  { id: 175, hanzi: "下雨", pinyin: "xià yǔ", english: "to rain", category: "weather & seasons" },
  { id: 176, hanzi: "又", pinyin: "yòu", english: "again", category: "weather & seasons" },
  { id: 177, hanzi: "面试", pinyin: "miànshì", english: "interview", category: "weather & seasons" },
  { id: 178, hanzi: "回去", pinyin: "huí qu", english: "to go back, to return", category: "weather & seasons" },
  { id: 179, hanzi: "冬天", pinyin: "dōngtiān", english: "winter", category: "weather & seasons" },
  { id: 180, hanzi: "夏天", pinyin: "xiàtiān", english: "summer", category: "weather & seasons" },
  { id: 181, hanzi: "热", pinyin: "rè", english: "hot", category: "weather & seasons" },
  { id: 182, hanzi: "春天", pinyin: "chūntiān", english: "spring", category: "weather & seasons" },
  { id: 183, hanzi: "秋天", pinyin: "qiūtiān", english: "autumn, fall", category: "weather & seasons" },
  { id: 184, hanzi: "舒服", pinyin: "shūfu", english: "comfortable", category: "weather & seasons" },
  { id: 185, hanzi: "天气", pinyin: "tiānqì", english: "weather", category: "weather & seasons" },
  { id: 186, hanzi: "比", pinyin: "bǐ", english: "compared with; to compare", category: "weather & seasons" },
  { id: 187, hanzi: "下雪", pinyin: "xià xuě", english: "to snow", category: "weather & seasons" },
  { id: 188, hanzi: "约", pinyin: "yuē", english: "to make an appointment", category: "weather & seasons" },
  { id: 189, hanzi: "公园", pinyin: "gōngyuán", english: "park", category: "weather & seasons" },
  { id: 190, hanzi: "滑冰", pinyin: "huá bīng", english: "to ice skate", category: "weather & seasons" },
  { id: 191, hanzi: "会", pinyin: "huì", english: "will", category: "weather & seasons" },
  { id: 192, hanzi: "冷", pinyin: "lěng", english: "cold", category: "weather & seasons" },
  { id: 193, hanzi: "刚才", pinyin: "gāngcái", english: "just now, a moment ago", category: "weather & seasons" },
  { id: 194, hanzi: "网上", pinyin: "wǎng shang", english: "on the Internet", category: "weather & seasons" },
  { id: 195, hanzi: "预报", pinyin: "yùbào", english: "to forecast; forecast", category: "weather & seasons" },
  { id: 196, hanzi: "更", pinyin: "gèng", english: "even more", category: "weather & seasons" },
  { id: 197, hanzi: "不但…而且…", pinyin: "búdàn…érqiě…", english: "not only…but also…", category: "weather & seasons" },
  { id: 198, hanzi: "暖和", pinyin: "nuǎnhuo", english: "warm", category: "weather & seasons" },
  { id: 199, hanzi: "办", pinyin: "bàn", english: "to handle, to do", category: "weather & seasons" },
];

const CATEGORIES = ["all","health & illness","seeing a doctor","appearance","celebrations","directions","campus & places","food & cooking","restaurant","weather & seasons"];
const CATEGORY_ICONS = {"health & illness":"🏥","seeing a doctor":"👨‍⚕️","appearance":"👤","celebrations":"🎉","directions":"🧭","campus & places":"🏫","food & cooking":"🍳","restaurant":"🍜","weather & seasons":"🌤️"};

function initSRS(words) {
  return words.map(w => ({ ...w, interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReviewed: null, correctCount: 0, incorrectCount: 0 }));
}

function sm2(card, quality) {
  let { interval, repetitions, easeFactor } = card;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else { repetitions = 0; interval = 0; }
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  return { interval, repetitions, easeFactor, nextReview: Date.now() + interval * 60 * 1000 };
}

function getDueCards(cards) {
  return cards.filter(c => c.nextReview <= Date.now()).sort((a, b) => a.nextReview - b.nextReview);
}

export default function MandarinTrainer() {
  const [cards, setCards] = useState(() => {
    try { const s = localStorage.getItem("mandarin_srs_v2"); if (s) { const p = JSON.parse(s); if (p.length > 30) return p; } } catch {} return initSRS(BOOK_WORDS);
  });
  const [view, setView] = useState("home");
  const [currentCard, setCurrentCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });
  const [showPinyin, setShowPinyin] = useState(false);
  const [animateCard, setAnimateCard] = useState("");
  const [newWord, setNewWord] = useState({ hanzi: "", pinyin: "", english: "", category: "health & illness" });
  const [searchTerm, setSearchTerm] = useState("");
  const [maxCards, setMaxCards] = useState(20);
  const [sessionQueue, setSessionQueue] = useState([]);

  useEffect(() => { try { localStorage.setItem("mandarin_srs_v2", JSON.stringify(cards)); } catch {} }, [cards]);

  const filteredCards = filter === "all" ? cards : cards.filter(c => c.category === filter);
  const dueCards = getDueCards(filteredCards);

  const startReview = () => {
    setSessionStats({ reviewed: 0, correct: 0 });
    const due = getDueCards(filter === "all" ? cards : cards.filter(c => c.category === filter));
    const queue = due.slice(0, maxCards);
    if (queue.length > 0) { setSessionQueue(queue); setCurrentCard(queue[0]); setFlipped(false); setShowPinyin(false); setView("review"); }
  };

  const handleRating = (quality) => {
    if (!currentCard) return;
    const isCorrect = quality >= 3;
    setAnimateCard(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      setAnimateCard("");
      const updated = sm2(currentCard, quality);
      setCards(prev => prev.map(c => c.id === currentCard.id ? { ...c, ...updated, lastReviewed: Date.now(), correctCount: c.correctCount + (isCorrect ? 1 : 0), incorrectCount: c.incorrectCount + (isCorrect ? 0 : 1) } : c));
      setSessionStats(s => ({ reviewed: s.reviewed + 1, correct: s.correct + (isCorrect ? 1 : 0) }));
      setSessionQueue(prev => {
        const remaining = prev.filter(c => c.id !== currentCard.id);
        if (!isCorrect) remaining.push(currentCard);
        if (remaining.length > 0) { setCurrentCard(remaining[0]); setFlipped(false); setShowPinyin(false); } else { setView("summary"); }
        return remaining;
      });
    }, 400);
  };

  const addWord = () => {
    if (!newWord.hanzi || !newWord.english) return;
    const id = Math.max(...cards.map(c => c.id), 0) + 1;
    setCards(prev => [...prev, { ...newWord, id, interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReviewed: null, correctCount: 0, incorrectCount: 0 }]);
    setNewWord({ hanzi: "", pinyin: "", english: "", category: newWord.category });
  };

  const resetProgress = () => { if (window.confirm("Reset all progress? Word list kept, SRS data cleared.")) { setCards(prev => prev.map(c => ({ ...c, interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), lastReviewed: null, correctCount: 0, incorrectCount: 0 }))); setView("home"); } };
  const resetAll = () => { if (window.confirm("Reset everything to original textbook words?")) { setCards(initSRS(BOOK_WORDS)); setView("home"); } };

  const masteredCount = cards.filter(c => c.repetitions >= 4).length;
  const learningCount = cards.filter(c => c.repetitions > 0 && c.repetitions < 4).length;
  const newCount = cards.filter(c => c.repetitions === 0).length;
  const totalReviews = cards.reduce((a, c) => a + c.correctCount + c.incorrectCount, 0);
  const totalCorrect = cards.reduce((a, c) => a + c.correctCount, 0);
  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;
  const searchedWords = searchTerm ? cards.filter(c => c.hanzi.includes(searchTerm) || c.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) || c.english.toLowerCase().includes(searchTerm.toLowerCase())) : filteredCards;

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cardCorrect{0%{transform:scale(1)}50%{transform:scale(1.04);box-shadow:0 0 40px rgba(72,187,120,0.4)}100%{transform:scale(1)}}
        @keyframes cardIncorrect{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        input::placeholder{color:#6b5f52}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(196,164,124,0.2);border-radius:3px}
      `}</style>
      <div style={S.bgD1}/><div style={S.bgD2}/>

      <header style={S.header}>
        <div style={S.headerLeft} onClick={()=>setView("home")}>
          <span style={S.logo}>墨</span>
          <div><h1 style={S.title}>MòXué</h1><p style={S.subtitle}>Integrated Chinese</p></div>
        </div>
        <nav style={S.nav}>
          {[{k:"home",l:"Study",i:"◉"},{k:"progress",l:"Stats",i:"◐"},{k:"words",l:"Words",i:"册"}].map(x=>(
            <button key={x.k} onClick={()=>setView(x.k)} style={{...S.navBtn,...(view===x.k?S.navBtnA:{})}}><span style={S.navI}>{x.i}</span>{x.l}</button>
          ))}
        </nav>
      </header>

      <main style={S.main}>
        {view==="home"&&(
          <div style={{animation:"fadeUp 0.4s ease both"}}>
            <div style={S.heroStats}>
              <div style={S.heroBox}><span style={S.heroNum}>{dueCards.length}</span><span style={S.heroLbl}>due now</span></div>
              <div style={S.heroDiv}/>
              <div style={S.heroBox}><span style={S.heroNum}>{cards.length}</span><span style={S.heroLbl}>total words</span></div>
              <div style={S.heroDiv}/>
              <div style={S.heroBox}><span style={S.heroNum}>{accuracy}%</span><span style={S.heroLbl}>accuracy</span></div>
            </div>
            <div style={S.pBars}>
              <div style={S.pLabel}>
                <span><span style={{color:"#e53e3e"}}>●</span> New {newCount}</span>
                <span><span style={{color:"#f6ad55"}}>●</span> Learning {learningCount}</span>
                <span><span style={{color:"#48bb78"}}>●</span> Mastered {masteredCount}</span>
              </div>
              <div style={S.pTrack}>
                <div style={{...S.pFill,width:`${(masteredCount/cards.length)*100}%`,background:"#48bb78"}}/>
                <div style={{...S.pFill,width:`${(learningCount/cards.length)*100}%`,background:"#f6ad55"}}/>
                <div style={{...S.pFill,width:`${(newCount/cards.length)*100}%`,background:"#e53e3e"}}/>
              </div>
            </div>
            <div style={{marginTop:20,marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:12,color:"#8a7e6e"}}>Session size:</span>
              {[10,20,30,50].map(n=><button key={n} onClick={()=>setMaxCards(n)} style={{...S.chip,...(maxCards===n?S.chipA:{}),padding:"4px 12px"}}>{n}</button>)}
            </div>
            <div style={S.filterRow}>
              {CATEGORIES.map(cat=>{
                const due=cat==="all"?dueCards.length:getDueCards(cards.filter(c=>c.category===cat)).length;
                return <button key={cat} onClick={()=>setFilter(cat)} style={{...S.chip,...(filter===cat?S.chipA:{})}}>
                  {cat!=="all"&&<span style={{marginRight:4}}>{CATEGORY_ICONS[cat]}</span>}
                  {cat==="all"?`All (${due} due)`:`${cat} (${due})`}
                </button>;
              })}
            </div>
            <button onClick={startReview} disabled={dueCards.length===0} style={{...S.startBtn,...(dueCards.length===0?S.startDis:{}),marginTop:20}}>
              {dueCards.length>0?`Study ${Math.min(dueCards.length,maxCards)} Card${Math.min(dueCards.length,maxCards)>1?"s":""}`:"All caught up! 🎉"}
            </button>
          </div>
        )}

        {view==="review"&&currentCard&&(
          <div style={{animation:"fadeUp 0.3s ease both"}}>
            <div style={S.revHead}>
              <span style={{fontSize:13,color:"#8a7e6e"}}>{sessionQueue.length} remaining</span>
              <button onClick={()=>setView("home")} style={S.exitBtn}>✕ Exit</button>
            </div>
            <div onClick={()=>!flipped&&setFlipped(true)} style={{...S.card,...(animateCard==="correct"?{animation:"cardCorrect 0.4s ease"}:animateCard==="incorrect"?{animation:"cardIncorrect 0.4s ease"}:{}),cursor:flipped?"default":"pointer"}}>
              <div style={S.cardCat}>{CATEGORY_ICONS[currentCard.category]} {currentCard.category}</div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <span style={S.hanzi}>{currentCard.hanzi}</span>
                {showPinyin&&<span style={S.pinyin}>{currentCard.pinyin}</span>}
                {!showPinyin&&!flipped&&<button onClick={e=>{e.stopPropagation();setShowPinyin(true)}} style={S.hintBtn}>Show pinyin</button>}
              </div>
              {!flipped&&<p style={{fontSize:12,color:"#5a5347",marginTop:20,letterSpacing:"0.05em"}}>Tap to reveal meaning</p>}
              {flipped&&<div style={{marginTop:16,display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"fadeUp 0.3s ease both"}}>
                <div style={{width:40,height:1,background:"rgba(196,164,124,0.3)",marginBottom:6}}/>
                <span style={S.pinyin}>{currentCard.pinyin}</span>
                <span style={{fontSize:22,fontWeight:700,color:"#e8e0d4"}}>{currentCard.english}</span>
              </div>}
            </div>
            {flipped&&<div style={S.ratingRow}>
              {[{q:1,l:"Again",i:"✕",s:S.rA},{q:3,l:"Hard",i:"◑",s:S.rH},{q:4,l:"Good",i:"◉",s:S.rG},{q:5,l:"Easy",i:"★",s:S.rE}].map(r=>
                <button key={r.q} onClick={()=>handleRating(r.q)} style={{...S.rateBtn,...r.s}}>
                  <span style={{fontSize:17}}>{r.i}</span>{r.l}
                </button>
              )}
            </div>}
          </div>
        )}

        {view==="summary"&&(
          <div style={{display:"flex",justifyContent:"center",paddingTop:32,animation:"fadeUp 0.4s ease both"}}>
            <div style={S.sumCard}>
              <span style={{fontSize:48,display:"block",marginBottom:12}}>🏆</span>
              <h2 style={{fontSize:22,fontWeight:700,color:"#e8e0d4",marginBottom:20}}>Session Complete!</h2>
              <div style={{display:"flex",justifyContent:"center",gap:28,marginBottom:28}}>
                {[{v:sessionStats.reviewed,l:"Reviewed"},{v:sessionStats.correct,l:"Correct",c:"#48bb78"},{v:sessionStats.reviewed-sessionStats.correct,l:"To review",c:"#e53e3e"}].map((s,i)=>
                  <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <span style={{fontSize:28,fontWeight:700,fontFamily:"'Noto Serif SC', serif",color:s.c||"#c4a47c"}}>{s.v}</span>
                    <span style={{fontSize:11,color:"#8a7e6e",marginTop:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.l}</span>
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                <button onClick={()=>setView("home")} style={S.startBtn}>Back to Home</button>
                {getDueCards(cards).length>0&&<button onClick={startReview} style={{...S.startBtn,background:"rgba(196,164,124,0.15)",color:"#c4a47c"}}>Study More</button>}
              </div>
            </div>
          </div>
        )}

        {view==="progress"&&(
          <div style={{animation:"fadeUp 0.4s ease both"}}>
            <h2 style={S.secTitle}>Your Progress</h2>
            <div style={S.statsGrid}>
              {[{l:"Total Words",v:cards.length,i:"册"},{l:"Mastered",v:masteredCount,i:"✓",c:"#48bb78"},{l:"Learning",v:learningCount,i:"◑",c:"#f6ad55"},{l:"New",v:newCount,i:"●",c:"#e53e3e"},{l:"Reviews",v:totalReviews,i:"⟳"},{l:"Accuracy",v:`${accuracy}%`,i:"◎"}].map((s,i)=>
                <div key={i} style={{...S.statCard,animationDelay:`${i*0.06}s`}}>
                  <span style={{fontSize:18,color:s.c||"#c4a47c"}}>{s.i}</span>
                  <span style={{fontSize:24,fontWeight:700,fontFamily:"'Noto Serif SC', serif",color:"#e8e0d4"}}>{s.v}</span>
                  <span style={{fontSize:10,color:"#8a7e6e",textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</span>
                </div>
              )}
            </div>
            <h3 style={{...S.secTitle,fontSize:16,marginTop:28}}>By Category</h3>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {CATEGORIES.filter(c=>c!=="all").map(cat=>{
                const cc=cards.filter(c=>c.category===cat);const m=cc.filter(c=>c.repetitions>=4).length;const pct=cc.length?Math.round((m/cc.length)*100):0;
                return <div key={cat} style={S.wordRow}>
                  <span style={{fontSize:18,width:30}}>{CATEGORY_ICONS[cat]}</span>
                  <span style={{flex:1,fontSize:13,color:"#e8e0d4",textTransform:"capitalize"}}>{cat}</span>
                  <div style={{width:80,height:6,borderRadius:3,background:"rgba(196,164,124,0.1)",overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:"#48bb78",borderRadius:3,transition:"width 0.6s"}}/></div>
                  <span style={{fontSize:11,color:"#8a7e6e",width:50,textAlign:"right"}}>{m}/{cc.length}</span>
                </div>;
              })}
            </div>
            <div style={{display:"flex",gap:10,marginTop:28}}>
              <button onClick={resetProgress} style={{...S.resetBtn,flex:1}}>Reset Progress</button>
              <button onClick={resetAll} style={{...S.resetBtn,flex:1,borderColor:"rgba(229,62,62,0.4)"}}>Reset All</button>
            </div>
          </div>
        )}

        {view==="words"&&(
          <div style={{animation:"fadeUp 0.4s ease both"}}>
            <h2 style={S.secTitle}>Word Library ({cards.length})</h2>
            <input placeholder="Search hanzi, pinyin, or English..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={{...S.input,marginBottom:12}}/>
            {!searchTerm&&<div style={{...S.filterRow,marginBottom:12}}>
              {CATEGORIES.map(cat=><button key={cat} onClick={()=>setFilter(cat)} style={{...S.chip,...(filter===cat?S.chipA:{}),fontSize:11,padding:"4px 10px"}}>
                {cat!=="all"&&<span style={{marginRight:3}}>{CATEGORY_ICONS[cat]}</span>}{cat==="all"?"All":cat}
              </button>)}
            </div>}
            <div style={S.wordList}>
              {searchedWords.map(c=>{
                const tot=c.correctCount+c.incorrectCount;const pct=tot?Math.round((c.correctCount/tot)*100):0;
                const st=c.repetitions>=4?"mastered":c.repetitions>0?"learning":"new";
                return <div key={c.id} style={S.wordRow}>
                  <span style={S.wordH}>{c.hanzi}</span><span style={S.wordP}>{c.pinyin}</span><span style={S.wordE}>{c.english}</span>
                  <span style={{...S.wordB,background:st==="mastered"?"#c6f6d520":st==="learning"?"#fefcbf20":"#fed7d720",color:st==="mastered"?"#48bb78":st==="learning"?"#d69e2e":"#e53e3e"}}>
                    {st==="mastered"?"✓":st==="learning"?"◑":"●"} {tot?`${pct}%`:"—"}
                  </span>
                </div>;
              })}
            </div>
            <div style={{marginTop:28,padding:16,background:"rgba(45,40,32,0.7)",border:"1px solid rgba(196,164,124,0.1)",borderRadius:14}}>
              <h3 style={{fontSize:14,color:"#c4a47c",marginBottom:12}}>+ Add Custom Word</h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <input placeholder="汉字 (Hanzi)" value={newWord.hanzi} onChange={e=>setNewWord(p=>({...p,hanzi:e.target.value}))} style={{...S.input,fontFamily:"'Noto Serif SC', serif",fontSize:18}}/>
                <input placeholder="Pīnyīn" value={newWord.pinyin} onChange={e=>setNewWord(p=>({...p,pinyin:e.target.value}))} style={S.input}/>
                <input placeholder="English meaning" value={newWord.english} onChange={e=>setNewWord(p=>({...p,english:e.target.value}))} style={S.input}/>
                <select value={newWord.category} onChange={e=>setNewWord(p=>({...p,category:e.target.value}))} style={{...S.input,color:"#e8e0d4"}}>
                  {CATEGORIES.filter(c=>c!=="all").map(c=><option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>)}
                </select>
                <button onClick={addWord} style={S.addBtn}>+ Add Word</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const S = {
  app:{fontFamily:"'DM Sans', sans-serif",minHeight:"100vh",background:"linear-gradient(165deg, #1a1714 0%, #2d2820 40%, #1f1c17 100%)",color:"#e8e0d4",position:"relative",overflow:"hidden"},
  bgD1:{position:"fixed",top:-200,right:-200,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(196,164,124,0.06) 0%, transparent 70%)",pointerEvents:"none"},
  bgD2:{position:"fixed",bottom:-150,left:-150,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle, rgba(196,164,124,0.04) 0%, transparent 70%)",pointerEvents:"none"},
  header:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:"1px solid rgba(196,164,124,0.12)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:10,background:"rgba(26,23,20,0.85)"},
  headerLeft:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},
  logo:{fontFamily:"'Noto Serif SC', serif",fontSize:28,fontWeight:900,color:"#c4a47c",lineHeight:1},
  title:{fontSize:18,fontWeight:700,letterSpacing:"0.02em",color:"#e8e0d4",lineHeight:1.2},
  subtitle:{fontSize:10,color:"#8a7e6e",letterSpacing:"0.1em",textTransform:"uppercase"},
  nav:{display:"flex",gap:2},
  navBtn:{background:"transparent",border:"none",color:"#8a7e6e",padding:"7px 12px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:500,fontFamily:"'DM Sans', sans-serif",display:"flex",alignItems:"center",gap:5,transition:"all 0.2s"},
  navBtnA:{background:"rgba(196,164,124,0.12)",color:"#c4a47c"},
  navI:{fontSize:13},
  main:{maxWidth:640,margin:"0 auto",padding:"20px 16px 60px"},
  heroStats:{display:"flex",justifyContent:"center",alignItems:"center",gap:24,marginBottom:20,padding:"20px 0"},
  heroBox:{display:"flex",flexDirection:"column",alignItems:"center"},
  heroNum:{fontSize:34,fontWeight:700,color:"#c4a47c",fontFamily:"'Noto Serif SC', serif",lineHeight:1},
  heroLbl:{fontSize:11,color:"#8a7e6e",marginTop:5,letterSpacing:"0.05em",textTransform:"uppercase"},
  heroDiv:{width:1,height:32,background:"rgba(196,164,124,0.2)"},
  filterRow:{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:8},
  chip:{background:"rgba(196,164,124,0.06)",border:"1px solid rgba(196,164,124,0.12)",borderRadius:20,padding:"5px 12px",fontSize:11,color:"#8a7e6e",cursor:"pointer",fontFamily:"'DM Sans', sans-serif",transition:"all 0.2s",textTransform:"capitalize",display:"flex",alignItems:"center"},
  chipA:{background:"rgba(196,164,124,0.18)",borderColor:"#c4a47c",color:"#c4a47c"},
  startBtn:{background:"linear-gradient(135deg, #c4a47c, #a8895f)",border:"none",borderRadius:12,padding:"14px 40px",fontSize:15,fontWeight:700,color:"#1a1714",cursor:"pointer",fontFamily:"'DM Sans', sans-serif",letterSpacing:"0.02em",transition:"all 0.2s",boxShadow:"0 4px 20px rgba(196,164,124,0.25)",display:"block",width:"100%",textAlign:"center"},
  startDis:{background:"rgba(196,164,124,0.15)",color:"#8a7e6e",cursor:"default",boxShadow:"none"},
  pBars:{marginBottom:4},
  pLabel:{display:"flex",alignItems:"center",gap:14,fontSize:11,color:"#8a7e6e",marginBottom:6},
  pTrack:{display:"flex",height:6,borderRadius:3,background:"rgba(196,164,124,0.08)",overflow:"hidden"},
  pFill:{height:"100%",transition:"width 0.6s ease"},
  revHead:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},
  exitBtn:{background:"transparent",border:"1px solid rgba(196,164,124,0.15)",borderRadius:8,padding:"5px 12px",fontSize:12,color:"#8a7e6e",cursor:"pointer",fontFamily:"'DM Sans', sans-serif"},
  card:{background:"linear-gradient(160deg, rgba(45,40,32,0.9), rgba(35,30,23,0.95))",border:"1px solid rgba(196,164,124,0.15)",borderRadius:20,padding:"36px 28px",textAlign:"center",minHeight:300,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position:"relative",boxShadow:"0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(196,164,124,0.08)"},
  cardCat:{position:"absolute",top:14,left:18,fontSize:11,color:"#8a7e6e",textTransform:"capitalize",letterSpacing:"0.05em"},
  hanzi:{fontFamily:"'Noto Serif SC', serif",fontSize:64,fontWeight:900,color:"#e8e0d4",lineHeight:1.1,animation:"float 4s ease-in-out infinite"},
  pinyin:{fontSize:17,color:"#c4a47c",fontStyle:"italic",letterSpacing:"0.05em"},
  hintBtn:{background:"rgba(196,164,124,0.08)",border:"1px solid rgba(196,164,124,0.15)",borderRadius:8,padding:"5px 14px",fontSize:12,color:"#8a7e6e",cursor:"pointer",fontFamily:"'DM Sans', sans-serif",marginTop:8},
  ratingRow:{display:"flex",gap:7,marginTop:20,justifyContent:"center",animation:"fadeUp 0.3s ease both"},
  rateBtn:{flex:1,padding:"12px 6px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'DM Sans', sans-serif",fontSize:12,fontWeight:600,display:"flex",flexDirection:"column",alignItems:"center",gap:3,transition:"all 0.2s"},
  rA:{background:"rgba(229,62,62,0.12)",color:"#e53e3e"},
  rH:{background:"rgba(214,158,46,0.12)",color:"#d69e2e"},
  rG:{background:"rgba(72,187,120,0.12)",color:"#48bb78"},
  rE:{background:"rgba(99,179,237,0.12)",color:"#63b3ed"},
  sumCard:{background:"rgba(45,40,32,0.9)",border:"1px solid rgba(196,164,124,0.15)",borderRadius:20,padding:"40px 32px",textAlign:"center",maxWidth:400,width:"100%"},
  secTitle:{fontSize:20,fontWeight:700,marginBottom:16,color:"#e8e0d4"},
  statsGrid:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:8},
  statCard:{background:"rgba(45,40,32,0.7)",border:"1px solid rgba(196,164,124,0.1)",borderRadius:12,padding:"16px 10px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:3,animation:"fadeUp 0.4s ease both"},
  wordList:{display:"flex",flexDirection:"column",gap:3,maxHeight:500,overflowY:"auto"},
  wordRow:{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:"rgba(45,40,32,0.5)",border:"1px solid rgba(196,164,124,0.06)"},
  wordH:{fontFamily:"'Noto Serif SC', serif",fontSize:18,fontWeight:700,color:"#e8e0d4",minWidth:52},
  wordP:{fontSize:12,color:"#c4a47c",fontStyle:"italic",minWidth:75},
  wordE:{fontSize:12,color:"#8a7e6e",flex:1},
  wordB:{fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:600,whiteSpace:"nowrap"},
  input:{background:"rgba(26,23,20,0.6)",border:"1px solid rgba(196,164,124,0.15)",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#e8e0d4",fontFamily:"'DM Sans', sans-serif",outline:"none",width:"100%"},
  addBtn:{background:"rgba(196,164,124,0.15)",border:"1px solid rgba(196,164,124,0.25)",borderRadius:10,padding:"10px",fontSize:13,fontWeight:600,color:"#c4a47c",cursor:"pointer",fontFamily:"'DM Sans', sans-serif"},
  resetBtn:{background:"transparent",border:"1px solid rgba(229,62,62,0.25)",borderRadius:10,padding:"10px 16px",fontSize:12,color:"#e53e3e",cursor:"pointer",fontFamily:"'DM Sans', sans-serif"},
};
