import React from 'react';
import { BookOpen, Award, CheckCircle2, HeartHandshake, Shield, Sparkles } from 'lucide-react';

export const BookDetailsSection: React.FC = () => {
  const highlights = [
    {
      title: 'बजट प्रबंधन व बचत की आदत',
      subtitle: 'Household Budgeting & Daily Savings',
      desc: 'महीने के खर्चों का आसान हिसाब और पैसे बचाने की व्यावहारिक पद्धतियाँ।',
    },
    {
      title: 'निवेश के स्मार्ट विकल्प',
      subtitle: 'Smart Investment Options',
      desc: 'FD, RD, म्यूचुअल फंड, गोल्ड और महिलाओं के लिए सुरक्षित निवेश माध्यम।',
    },
    {
      title: 'आधुनिक डिजिटल बैंकिंग',
      subtitle: 'Safe Digital Banking & UPI',
      desc: 'गूगल पे, फोनपे, नेटबैंकिंग और ऑनलाइन फ्रॉड से बचने के सुरक्षा नियम।',
    },
    {
      title: 'सुरक्षा बीमा (Insurance) की समझ',
      subtitle: 'Life & Health Insurance',
      desc: 'जीवन और स्वास्थ्य बीमा क्यों जरूरी है और सही पॉलिसी कैसे चुनें।',
    },
    {
      title: 'ऋण (Loans) व क्रेडिट स्कोर',
      subtitle: 'Loans & Credit Awareness',
      desc: 'होम लोन, पर्सनल लोन, बिजनेस लोन और कम ब्याज दर प्राप्त करने के नुस्खे।',
    },
    {
      title: 'महिलाओं हेतु विशेष सरकारी योजनाएँ',
      subtitle: 'Government Schemes for Women',
      desc: 'मुद्रा योजना, महिला सम्मान बचत पत्र, सुकन्या समृद्धि व स्वरोजगार सब्सिडी।',
    },
  ];

  return (
    <section className="mt-12 space-y-12">
      {/* Book Synopsis & Highlights */}
      <div className="bg-white rounded-2xl border border-rose-100 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-rose-600" />
          <span>About the Book · पुस्तक के बारे में</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-devanagari">
          हर महिला के आर्थिक रूप से आत्मनिर्भर बनने की व्यावहारिक मार्गदर्शिका
        </h2>

        <p className="mt-4 text-slate-700 leading-relaxed text-base sm:text-lg font-devanagari">
          <strong>“Fin सखी”</strong> केवल एक पुस्तक नहीं, बल्कि हर महिला के आर्थिक रूप से आत्मनिर्भर और सशक्त बनने के लिए व्यावहारिक मार्गदर्शिका है।
          आज के दौर में महिलाओं के लिए वित्तीय साक्षरता (Financial Literacy) अत्यंत आवश्यक है। यह पुस्तक बेहद सरल और सुबोध भाषा में बजट प्रबंधन, बचत की आदत, निवेश के स्मार्ट विकल्प, आधुनिक डिजिटल बैंकिंग, सुरक्षा बीमा, ऋण (Loans) और महिलाओं के लिए विशेष सरकारी योजनाओं की संपूर्ण जानकारी देती है।
        </p>

        <p className="mt-3 text-slate-700 leading-relaxed text-base sm:text-lg font-devanagari">
          चाहे आप कामकाजी महिला हों या गृहणी, यह पुस्तक आपको बिना किसी संकोच के सही और स्वतंत्र वित्तीय निर्णय लेने में सक्षम बनाती है ताकि आप अपना और अपने परिवार का भविष्य सुरक्षित कर सकें।
        </p>

        {/* 6 Key pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-6 border-t border-rose-100">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-rose-50/40 rounded-xl p-4 border border-rose-100/70 hover:bg-rose-50 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm font-devanagari">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-medium text-rose-700/80 mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 font-devanagari">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Author Section */}
      <div id="about-author" className="bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 rounded-2xl border border-rose-100 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs uppercase tracking-wider mb-2">
          <Award className="w-4 h-4 text-rose-600" />
          <span>लेखिका परिचय | About the Author</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start mt-4">
          {/* Author Badge & Portrait */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col items-center text-center bg-white p-5 rounded-2xl border border-rose-100 shadow-2xs">
            <div className="relative w-48 sm:w-56 rounded-2xl overflow-hidden shadow-md border-2 border-amber-200/90 bg-white group hover:shadow-lg transition-shadow">
              <img
                src="/assets/aistudio/InShot_20261023_164921614_7e029d08.jpg"
                alt="लेखिका प्रतिमा (Author Pratima)"
                className="w-full h-auto object-contain"
              />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-3.5 font-devanagari">
              प्रतिमा (Pratima)
            </h3>
            <p className="text-xs font-semibold text-rose-700">Banker & Bestselling Author</p>
            <p className="text-xs text-slate-500 mt-1">अधिकारी, प्रतिष्ठित सरकारी बैंक</p>

            <div className="mt-4 pt-3 border-t border-slate-100 w-full flex flex-col gap-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>ISBN:</span>
                <span className="font-mono font-medium text-slate-900">978-93-5915-918-8</span>
              </div>
              <div className="flex items-center justify-between">
                <span>भाषा (Language):</span>
                <span className="font-medium text-slate-900">हिंदी (Hindi)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>संस्करण:</span>
                <span className="font-medium text-slate-900">प्रथम संस्करण (Paperback)</span>
              </div>
            </div>
          </div>

          {/* Author Narrative */}
          <div className="flex-1 space-y-3.5 text-slate-700 font-devanagari text-base sm:text-lg leading-relaxed">
            <p>
              <strong>प्रतिमा</strong> एक लेखिका एवं कवयित्री हैं, जो वर्तमान में एक प्रतिष्ठित सरकारी बैंक में अधिकारी के पद पर कार्यरत हैं। पेशे से बैंकर होने के कारण वित्तीय मामलों पर उनकी गहरी पकड़ है।
            </p>
            <p className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60 text-slate-800 text-sm sm:text-base">
              कैंसर जैसी गंभीर और चुनौतीपूर्ण बीमारी से जूझने के बाद भी उन्होंने कभी हार नहीं मानी और अपने लेखन के प्रति अटूट जज्बे को जीवित रखा। उनकी प्रेरणादायी जीवन-यात्रा और अदम्य साहस का ही परिणाम है कि वे लगातार समाज को जागरूक करने वाली रचनाएँ दे रही हैं।
            </p>
            <p>
              <strong>“अस्तित्व की पहचान”</strong>, <strong>“कैंसर: काश से आस का सफ़र”</strong> और <strong>“हम बैंकर”</strong> जैसी नेशनल बेस्टसेलर पुस्तकों के बाद, महिलाओं को आर्थिक रूप से सशक्त बनाने की दिशा में यह उनकी एक और बेहतरीन और अमूल्य प्रस्तुति है।
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-rose-200 rounded-lg text-xs font-medium text-rose-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> National Bestselling Author
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-rose-200 rounded-lg text-xs font-medium text-rose-800">
                <Shield className="w-3.5 h-3.5 text-rose-600" /> Public Sector Bank Officer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-rose-200 rounded-lg text-xs font-medium text-rose-800">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" /> Cancer Survivor & Inspiration
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
