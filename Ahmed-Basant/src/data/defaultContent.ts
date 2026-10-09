export interface TimelineChapter {
  id: string;
  number: number;
  icon: string;
  dateAr: string;
  dateEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  locationAr: string;
  locationEn: string;
  photo: string | null;
  isFuture: boolean;
  isLocked: boolean;
  conversations?: ConversationEntry[];
}

export interface ConversationEntry {
  id: string;
  labelAr: string;
  labelEn: string;
  textAr: string;
  textEn: string;
  photo: string | null;
}

export interface GalleryPhoto {
  id: string;
  photo: string | null;
  date: string;
  captionAr: string;
  captionEn: string;
  locationAr: string;
  locationEn: string;
  descAr: string;
  descEn: string;
}

export interface SpecialMoment {
  id: string;
  date: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  photo: string | null;
}

export interface ImportantDate {
  id: string;
  date: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  photo: string | null;
}

export interface FutureCard {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface SiteContent {
  introAr: string;
  introEn: string;
  letterAr: string;
  letterEn: string;
  secretMessageAr: string;
  secretMessageEn: string;
  nightAr: string;
  nightEn: string;
  songTitle: string;
  songArtist: string;
  songFile: string | null;
  songCover: string | null;
  timeline: TimelineChapter[];
  gallery: GalleryPhoto[];
  moments: SpecialMoment[];
  dates: ImportantDate[];
  futureCards: FutureCard[];
  imageSlots: Record<string, string | null>;
}

export const defaultContent: SiteContent = {
  introAr:
    'يمكن يوم ٢٦ أغسطس ٢٠٢٦ بالنسبة لناس كتير يوم عادي، بس بالنسبالي هو يوم ليه معنى مختلف. يوم اتقابلنا فيه وبدأنا نتعرف على بعض. من يومها وأنا حاسس إن حاجة حلوة بدأت، حاجة نفسي تكبر وتكبر مع الأيام. ما عرفش إيه اللي جاي، بس اللي عارفه إن إن شاء الله كل يوم هيبقى أحلى من اللي قبله، وربنا يكتب لنا الخير.',
  introEn:
    'To many, 26 August 2026 might be an ordinary day. But to me, it holds a different meaning. It is the day we met and started getting to know each other. Since that day, I have felt that something beautiful has begun — something I hope grows with time. I do not know what the future holds, but I know that, God willing, each day will be more beautiful than the last.',

  letterAr:
    'بسنت العزيزة،\n\nمش عارف أوصل لك إزاي يوم ٢٦ أغسطس غيّر حاجة جوايا. يوم ما اتقابلنا حسيت إن في حاجة بدأت، حاجة مش هقدر أصفها بس حاسس بيها. من وقت ما عرفتك، بقيت استنى كل يوم بحماس عشان أتكلم معاكي وأعرف أكتر عنكي.\n\nأنا مبسوط إن ربنا خلاني أعرفك، ومبسوط بكل لحظة عشناها سوا لحد دلوقتي. كل كلمة قلناها لبعض، وكل ضحكة، وكل لحظة حلوة، دي حاجات بفكر فيها وأنا مبسوط.\n\nنفسي نكمل ونعمل ذكريات أكتر، ونفضل نتعرف على بعض أكتر. ولو ربنا كتب لنا الخير ونكمل سوا، يبقى ده أحلى حاجة ممكن تحصللي. ولو لا، أنا شاكر إن ربنا خلاني أعرفك، إنك كانت جزء من حكايتي.\n\nربنا يكتب لنا اللي فيه الخير دايماً.\n\nأحمد ❤️',
  letterEn:
    'Dear Basant,\n\nI do not know how to tell you how 26 August changed something inside me. The day we met, I felt that something had begun — something I cannot describe but can feel. Since I met you, I look forward to every day, to talking with you and learning more about you.\n\nI am happy that God let me know you, and happy with every moment we have shared so far. Every word we exchanged, every laugh, every beautiful moment — these are things I think about with joy.\n\nI hope we continue and create more memories, and keep getting to know each other. And if God wills for us to continue together, that would be the most beautiful thing. And if not, I am grateful that I knew you, that you were part of my story.\n\nMay God always write what is best for us.\n\nAhmed ❤️',

  secretMessageAr:
    'بسنت… أنتي أجمل حاجة حصلتلي من يوم ٢٦ أغسطس. كل ما أفتكر يوم ما اتقابلنا، بابتسم. نفسي حكايتنا تكمل وتبقى أحلى مع كل يوم. إنتي بس خلي بجانبي، وإن شاء الله الباقي يجيب سوا. ❤️',
  secretMessageEn:
    'Basant… you are the most beautiful thing that has happened to me since 26 August. Every time I remember the day we met, I smile. I hope our story continues and grows more beautiful with each day. Just stay by my side, and God willing, the rest will come together. ❤️',

  nightAr:
    'لو سألتني عن بداية حكايتنا، هقولك إنها بدأت يوم ٢٦ أغسطس ٢٠٢٦. يوم ممكن يكون عادي لغيرنا، بس بالنسبالي هو اليوم اللي غير حياتي. من يومها بدأت أفتكر كل تفصيلة، كل كلمة، وكل لحظة. ولسه أجمل فصول الحكاية جاية، إن شاء الله.',
  nightEn:
    'If you asked me about the beginning of our story, I would tell you it started on 26 August 2026. A day that might be ordinary to others, but to me, it is the day that changed my life. Since then, I remember every detail, every word, every moment. And the most beautiful chapters are still ahead, God willing.',

  songTitle: '',
  songArtist: '',
  songFile: null,
  songCover: null,

  timeline: [
    {
      id: 'ch1',
      number: 1,
      icon: 'Heart',
      dateAr: '٢٦ أغسطس ٢٠٢٦',
      dateEn: '26 August 2026',
      titleAr: 'البداية',
      titleEn: 'The Beginning',
      descAr:
        'اليوم اللي اتقابلنا فيه وبدأنا نتعرف على بعض، واليوم اللي بقى ليه مكان مميز في حكايتنا.',
      descEn:
        'The day we met and started getting to know each other — a day that holds a special place in our story.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: false,
      isLocked: false,
    },
    {
      id: 'ch2',
      number: 2,
      icon: 'MessageCircle',
      dateAr: '',
      dateEn: '',
      titleAr: 'أول كلام بينا',
      titleEn: 'Our First Conversations',
      descAr:
        'أول مرة اتكلمنا فيها، أول كلمة قلناها لبعض، وأول مرة حسينا إن في حاجة بتربطنا.',
      descEn:
        'The first time we talked, the first words we exchanged, and the first time we felt a connection.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: false,
      isLocked: false,
      conversations: [
        {
          id: 'conv1',
          labelAr: 'أول كلام',
          labelEn: 'First Conversation',
          textAr: '',
          textEn: '',
          photo: null,
        },
        {
          id: 'conv2',
          labelAr: 'أول انطباع',
          labelEn: 'First Impression',
          textAr: '',
          textEn: '',
          photo: null,
        },
        {
          id: 'conv3',
          labelAr: 'لحظات تضحك',
          labelEn: 'Funny Moments',
          textAr: '',
          textEn: '',
          photo: null,
        },
        {
          id: 'conv4',
          labelAr: 'رسايل مفضلة',
          labelEn: 'Favorite Messages',
          textAr: '',
          textEn: '',
          photo: null,
        },
      ],
    },
    {
      id: 'ch3',
      number: 3,
      icon: 'Sparkles',
      dateAr: '',
      dateEn: '',
      titleAr: 'بقينا أقرب',
      titleEn: 'Growing Closer',
      descAr:
        'كل يوم كنا بنتعرف على بعض أكتر، وبقينا أقرب. كل كلمة وكل لحظة خلت الرابط بيننا أقوى.',
      descEn:
        'With each day we got to know each other more, and grew closer. Every word and every moment made our bond stronger.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: false,
      isLocked: false,
    },
    {
      id: 'ch4',
      number: 4,
      icon: 'Camera',
      dateAr: '',
      dateEn: '',
      titleAr: 'ذكرياتنا الحلوة',
      titleEn: 'Our Sweet Memories',
      descAr:
        'لحظات جمعتنا وذاكرناها، صور وأيام ليه معنى خاص في حكايتنا.',
      descEn:
        'Moments that brought us together and that we remember — photos and days with special meaning in our story.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: false,
      isLocked: false,
    },
    {
      id: 'ch5',
      number: 5,
      icon: 'Cake',
      dateAr: '٢٦ أغسطس ٢٠٢٧',
      dateEn: '26 August 2027',
      titleAr: 'أول ذكرى سنوية',
      titleEn: 'First Anniversary',
      descAr:
        'سنة كاملة من يوم ما بدأت حكايتنا. كل سنة والحكاية بتكبر وتحلى.',
      descEn:
        'A full year since our story began. Every year the story grows and becomes sweeter.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: true,
      isLocked: false,
    },
    {
      id: 'ch6',
      number: 6,
      icon: 'Mail',
      dateAr: '',
      dateEn: '',
      titleAr: 'يوم مميز في حكايتنا',
      titleEn: 'A Special Day in Our Story',
      descAr:
        'يوم ليه معنى خاص في حكايتنا، هنكتب تفاصيله لما ييجي وقته.',
      descEn:
        'A day with special meaning in our story — we will write its details when the time comes.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: true,
      isLocked: false,
    },
    {
      id: 'ch7',
      number: 7,
      icon: 'Gem',
      dateAr: '',
      dateEn: '',
      titleAr: 'الخطوبة',
      titleEn: 'The Engagement',
      descAr: 'الفصل ده لسه مستني يومه… ❤️',
      descEn: 'This chapter is still waiting for its day… ❤️',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: true,
      isLocked: true,
    },
    {
      id: 'ch8',
      number: 8,
      icon: 'Heart',
      dateAr: '',
      dateEn: '',
      titleAr: 'فرحنا',
      titleEn: 'Our Wedding',
      descAr:
        'ولو ربنا كتب لنا نكمل سوا، يمكن ييجي يوم ونكتب الفصل ده بجد.',
      descEn:
        'And if God wills for us to continue together, perhaps a day will come when we write this chapter for real.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: true,
      isLocked: true,
    },
    {
      id: 'ch9',
      number: 9,
      icon: 'Infinity',
      dateAr: '',
      dateEn: '',
      titleAr: 'حكايتنا مكملة',
      titleEn: 'Our Story Continues',
      descAr:
        'لسه في ذكريات كتير مستنيانا، ولسه حكايتنا فيها فصول متكتبتش.',
      descEn:
        'There are still many memories waiting for us, and our story still has unwritten chapters.',
      locationAr: '',
      locationEn: '',
      photo: null,
      isFuture: true,
      isLocked: false,
    },
  ],

  gallery: [],
  moments: [],
  dates: [
    {
      id: 'date1',
      date: '2026-08-26',
      titleAr: 'يوم ما بدأت حكايتنا',
      titleEn: 'The Day Our Story Began',
      descAr:
        '٢٦ أغسطس ٢٠٢٦ — اليوم اللي اتقابلنا فيه وبدأت حكايتنا.',
      descEn:
        '26 August 2026 — the day we met and our story began.',
      photo: null,
    },
  ],
  futureCards: [
    {
      id: 'fc1',
      icon: 'Mail',
      titleAr: 'ذكريات جاية',
      titleEn: 'Memories Ahead',
      descAr: 'لسه في لحظات كتير حلوة ممكن نعيشها ونفتكرها بعدين.',
      descEn:
        'There are still many beautiful moments we could live and remember later.',
    },
    {
      id: 'fc2',
      icon: 'Gem',
      titleAr: 'الخطوبة',
      titleEn: 'The Engagement',
      descAr:
        'لو ربنا كتب لنا الخير ونصيبنا نكمل سوا، يبقى ده فصل جديد في حكايتنا.',
      descEn:
        'If God wills what is good for us and we continue together, this would be a new chapter in our story.',
    },
    {
      id: 'fc3',
      icon: 'Home',
      titleAr: 'مستقبلنا',
      titleEn: 'Our Future',
      descAr:
        'أجمل حاجة إننا نسيب الأيام تكتب لنا اللي فيه الخير، ونفضل نفتكر بداية حكايتنا.',
      descEn:
        'The most beautiful thing is to let the days write what is best for us, and keep remembering the beginning of our story.',
    },
  ],
  imageSlots: {
    main: null,
    firstMeeting: null,
    firstConversation: null,
    favoriteMemory: null,
    specialDate: null,
    firstAnniversary: null,
    futureMilestone: null,
    engagement: null,
    wedding: null,
    futureMemories: null,
  },
};

export const STORY_START_DATE = '2026-08-26T00:00:00';
export const FIRST_ANNIVERSARY = '2027-08-26T00:00:00';
