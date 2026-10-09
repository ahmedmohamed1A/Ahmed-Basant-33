export type TranslationKey =
  | 'nav_home'
  | 'nav_story'
  | 'nav_memories'
  | 'nav_letter'
  | 'nav_future'
  | 'lang_label'
  | 'hero_title'
  | 'hero_subtitle'
  | 'hero_date'
  | 'hero_tagline'
  | 'hero_cta'
  | 'loading_text'
  | 'intro_title'
  | 'story_title'
  | 'story_subtitle'
  | 'counter_title'
  | 'counter_days'
  | 'counter_hours'
  | 'counter_minutes'
  | 'counter_seconds'
  | 'counter_caption'
  | 'gallery_title'
  | 'gallery_subtitle'
  | 'gallery_add'
  | 'moments_title'
  | 'moments_subtitle'
  | 'moments_add'
  | 'letter_title'
  | 'letter_open'
  | 'letter_close'
  | 'letter_from'
  | 'night_title'
  | 'song_title'
  | 'song_subtitle'
  | 'song_upload'
  | 'song_no_song'
  | 'secret_title'
  | 'secret_close'
  | 'future_title'
  | 'future_subtitle'
  | 'dates_title'
  | 'dates_subtitle'
  | 'dates_add'
  | 'final_title'
  | 'final_since'
  | 'final_tagline'
  | 'final_back_to_top'
  | 'edit'
  | 'save'
  | 'cancel'
  | 'add'
  | 'delete'
  | 'upload_photo'
  | 'upload_audio'
  | 'date_label'
  | 'title_label'
  | 'description_label'
  | 'location_label'
  | 'caption_label'
  | 'photo_label'
  | 'artist_label'
  | 'future_locked'
  | 'anniversary_title'
  | 'anniversary_message'
  | 'countdown_title'
  | 'unlock_chapter'
  | 'edit_mode'
  | 'view_mode'
  | 'storage_local_only';

export const translations: Record<
  'ar' | 'en',
  Record<TranslationKey, string>
> = {
  ar: {
    nav_home: 'البداية',
    nav_story: 'حكايتنا',
    nav_memories: 'ذكرياتنا',
    nav_letter: 'الرسالة',
    nav_future: 'المستقبل',
    lang_label: 'English 🇬🇧',
    hero_title: 'أحمد ❤️ بسنت',
    hero_subtitle: 'حكايتنا',
    hero_date: '٢٦ أغسطس ٢٠٢٦',
    hero_tagline: 'اليوم اللي بدأت فيه حكايتنا ❤️',
    hero_cta: 'ابدأ حكايتنا ❤️',
    loading_text: 'بنجهز حكايتنا… ❤️',
    intro_title: 'إلى بسنت… ❤️',
    story_title: 'حكايتنا لسه بتبدأ… ❤️',
    story_subtitle: 'كل فصل في حكايتنا ليه ذكرى خاصة',
    counter_title: 'بقالنا قد إيه من يوم ما بدأت حكايتنا؟ ❤️',
    counter_days: 'يوم',
    counter_hours: 'ساعة',
    counter_minutes: 'دقيقة',
    counter_seconds: 'ثانية',
    counter_caption: 'كل يوم بيعدّي بيضيف ذكرى جديدة لحكايتنا ❤️',
    gallery_title: 'ذكرياتنا ❤️',
    gallery_subtitle: 'لحظات جمعتنا وحفظناها في صور',
    gallery_add: 'ضيف صورة',
    moments_title: 'لحظات مميزة ❤️',
    moments_subtitle: 'أيام مش هننساها',
    moments_add: 'ضيف لحظة',
    letter_title: 'رسالة من أحمد لبسنت ❤️',
    letter_open: 'افتح الرسالة',
    letter_close: 'اقفل',
    letter_from: 'أحمد',
    night_title: 'لو سألتني عن بداية حكايتنا… 🌙',
    song_title: 'أغنيتنا 🎵',
    song_subtitle: 'الأغنية اللي بتربطنا ببعض',
    song_upload: 'ارفع الأغنية',
    song_no_song: 'مفيش أغنية مرفوعة لسه — ارفع أغنيتك من هنا',
    secret_title: 'لقيت الرسالة السرية ❤️',
    secret_close: 'اقفل',
    future_title: 'الحكاية اللي لسه مستنيين نكتبها… ❤️',
    future_subtitle: 'أمنيات وفصول لسه مستنيانا',
    dates_title: 'تواريخ مهمة ❤️',
    dates_subtitle: 'أيام ليه معنى في حكايتنا',
    dates_add: 'ضيف تاريخ',
    final_title: 'أحمد ❤️ بسنت',
    final_since: 'من ٢٦ أغسطس ٢٠٢٦…',
    final_tagline: 'وحكايتنا لسه بتبدأ. ❤️',
    final_back_to_top: 'ارجع لبداية الحكاية ❤️',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    add: 'ضيف',
    delete: 'حذف',
    upload_photo: 'ارفع صورة',
    upload_audio: 'ارفع أغنية',
    date_label: 'التاريخ',
    title_label: 'العنوان',
    description_label: 'الوصف',
    location_label: 'المكان',
    caption_label: 'تعليق على الصورة',
    photo_label: 'الصورة',
    artist_label: 'اسم الفنان',
    future_locked: 'الفصل ده لسه مستني يومه… ❤️',
    anniversary_title: 'أول ذكرى سنوية 🎂',
    anniversary_message:
      'كل سنة وكل يوم بيعدّي بيخلي حكايتنا أحلى. كل سنة وإنتِ بخير يا بسنت ❤️',
    countdown_title: 'عد تنازلي لأول ذكرى سنوية',
    unlock_chapter: 'افتح الفصل',
    edit_mode: 'وضع التعديل',
    view_mode: 'وضع العرض',
    storage_local_only:
      'التعديلات بتتحفظ على جهازك بس. لو عايز تشاركها من أكتر من جهاز، محتاج تفعيل قاعدة بيانات.',
  },
  en: {
    nav_home: 'Home',
    nav_story: 'Our Story',
    nav_memories: 'Memories',
    nav_letter: 'Letter',
    nav_future: 'Future',
    lang_label: 'مصري 🇪🇬',
    hero_title: 'Ahmed ❤️ Basant',
    hero_subtitle: 'Our Story',
    hero_date: '26 August 2026',
    hero_tagline: 'The day our story began. ❤️',
    hero_cta: 'Start Our Story ❤️',
    loading_text: 'Preparing our story… ❤️',
    intro_title: 'To Basant… ❤️',
    story_title: 'Our story is just beginning… ❤️',
    story_subtitle: 'Every chapter holds a special memory',
    counter_title: 'How long since our story began? ❤️',
    counter_days: 'Days',
    counter_hours: 'Hours',
    counter_minutes: 'Minutes',
    counter_seconds: 'Seconds',
    counter_caption: 'Every passing day adds a new memory to our story ❤️',
    gallery_title: 'Our Memories ❤️',
    gallery_subtitle: 'Moments we shared and saved in photos',
    gallery_add: 'Add Photo',
    moments_title: 'Special Moments ❤️',
    moments_subtitle: 'Days we will never forget',
    moments_add: 'Add Moment',
    letter_title: 'A Letter from Ahmed to Basant ❤️',
    letter_open: 'Open Letter',
    letter_close: 'Close',
    letter_from: 'Ahmed',
    night_title: 'If you asked me about the beginning of our story… 🌙',
    song_title: 'Our Song 🎵',
    song_subtitle: 'The song that connects us',
    song_upload: 'Upload Song',
    song_no_song: 'No song uploaded yet — upload yours here',
    secret_title: 'You Found the Secret Message ❤️',
    secret_close: 'Close',
    future_title: 'The story we are still waiting to write… ❤️',
    future_subtitle: 'Hopes and chapters still ahead of us',
    dates_title: 'Important Dates ❤️',
    dates_subtitle: 'Days that mean something in our story',
    dates_add: 'Add Date',
    final_title: 'Ahmed ❤️ Basant',
    final_since: 'Since 26 August 2026…',
    final_tagline: 'Our story is just beginning. ❤️',
    final_back_to_top: 'Back to the beginning ❤️',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    add: 'Add',
    delete: 'Delete',
    upload_photo: 'Upload Photo',
    upload_audio: 'Upload Song',
    date_label: 'Date',
    title_label: 'Title',
    description_label: 'Description',
    location_label: 'Location',
    caption_label: 'Photo Caption',
    photo_label: 'Photo',
    artist_label: 'Artist',
    future_locked: 'This chapter is still waiting for its day… ❤️',
    anniversary_title: 'First Anniversary 🎂',
    anniversary_message:
      'Every year and every passing day makes our story more beautiful. Happy anniversary, Basant ❤️',
    countdown_title: 'Countdown to our first anniversary',
    unlock_chapter: 'Unlock Chapter',
    edit_mode: 'Edit Mode',
    view_mode: 'View Mode',
    storage_local_only:
      'Edits are saved on your device only. To share across devices, a database connection is needed.',
  },
};
