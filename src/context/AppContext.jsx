import { createContext, useContext, useState } from 'react';

export const translations = {
  en: {
    appName: 'Swasthya Saathi',
    appTagline: 'Your Family Health Guide',
    welcome: {
      headline: 'Find the right health scheme for your family',
      sub: 'Government schemes, nearby hospitals, and medicines — in your language.',
      cta: 'Get Started',
    },
    language: {
      title: 'Choose Your Language',
      subtitle: 'The app will appear in your chosen language',
      continue: 'Continue',
    },
    profile: {
      title: 'Your Details',
      subtitle: 'We use this to find schemes you qualify for',
      name: 'Full Name', namePlaceholder: 'Enter your full name',
      age: 'Age', agePlaceholder: 'Your age',
      gender: 'Gender', male: 'Male', female: 'Female', other: 'Other',
      state: 'State', statePlaceholder: 'Select state',
      district: 'District', districtPlaceholder: 'Enter district',
      income: 'Annual Family Income', incomePlaceholder: 'Select range',
      occupation: 'Occupation', occupationPlaceholder: 'Select occupation',
      hasAyushman: 'Do you have an Ayushman Card?', yes: 'Yes', no: 'No',
      save: 'Save & Continue', required: 'Please fill all required fields',
    },
    dashboard: {
      greeting: 'Namaste',
      subtitle: 'What do you need help with today?',
      schemes: 'Find Schemes', schemesDesc: 'Government health benefits',
      nearbyCare: 'Nearby Care', nearbyCareDesc: 'Hospitals & clinics',
      medicines: 'Medicines', medicinesDesc: 'Jan Aushadhi stores',
      awareness: 'Health Info', awarenessDesc: 'Tips & guides',
      familyTitle: 'Family Members', addMember: '+ Add Member',
    },
    schemeFinder: {
      title: 'Find Your Scheme',
      subtitle: 'What health need do you have?',
      pregnancy: 'Pregnancy & Maternity', child: 'Child & Newborn Care',
      accident: 'Accident / Emergency', chronic: 'Chronic Disease',
      surgery: 'Surgery / Hospitalisation', cancer: 'Cancer Care',
      tb: 'TB / Lung Disease', diabetes: 'Diabetes & BP',
      elder: 'Elder Care', insurance: 'Health Insurance', general: 'General Schemes',
    },
    questions: {
      title: 'A Few Questions',
      subtitle: 'To find the best schemes for you',
      whichMember: 'Who needs help?', myself: 'Myself',
      agentThinking: 'Finding the best schemes for you…',
      next: 'Next', back: 'Back', submit: 'Find Schemes',
    },
    results: {
      title: 'Schemes Found',
      eligible: 'You may be eligible',
      benefit: 'Benefit', howToApply: 'How to Apply', source: 'Source',
      save: 'Save Scheme', findHospital: 'Find Nearby Hospital',
      backToHome: 'Back to Home',
      noResults: 'No schemes found. Try a different category.',
      poweredBy: 'Powered by Foundry IQ · Grounded & Cited',
    },
    nearby: {
      title: 'Nearby Care', subtitle: 'Find care close to you',
      hospital: 'Find Hospital', hospitalDesc: 'Government & PMJAY hospitals',
      pmjay: 'PMJAY Empanelled', pmjayDesc: 'Cashless treatment hospitals',
      emergency: 'Emergency Care', emergencyDesc: '108 Ambulance · ER units',
      searchPlaceholder: 'Enter PIN code or district',
      search: 'Search', call: 'Call', directions: 'Directions', distance: 'km away',
    },
  },

  hi: {
    appName: 'स्वास्थ्य साथी',
    appTagline: 'आपका परिवारिक स्वास्थ्य मार्गदर्शक',
    welcome: {
      headline: 'अपने परिवार के लिए सही स्वास्थ्य योजना खोजें',
      sub: 'सरकारी योजनाएं, नज़दीकी अस्पताल और दवाइयां — आपकी भाषा में।',
      cta: 'शुरू करें',
    },
    language: {
      title: 'अपनी भाषा चुनें',
      subtitle: 'ऐप आपकी चुनी हुई भाषा में दिखेगा',
      continue: 'जारी रखें',
    },
    profile: {
      title: 'आपकी जानकारी',
      subtitle: 'हम इसका उपयोग आपके लिए योजनाएं खोजने के लिए करते हैं',
      name: 'पूरा नाम', namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      age: 'उम्र', agePlaceholder: 'आपकी उम्र',
      gender: 'लिंग', male: 'पुरुष', female: 'महिला', other: 'अन्य',
      state: 'राज्य', statePlaceholder: 'राज्य चुनें',
      district: 'जिला', districtPlaceholder: 'जिला दर्ज करें',
      income: 'वार्षिक पारिवारिक आय', incomePlaceholder: 'सीमा चुनें',
      occupation: 'पेशा', occupationPlaceholder: 'पेशा चुनें',
      hasAyushman: 'क्या आपके पास आयुष्मान कार्ड है?', yes: 'हाँ', no: 'नहीं',
      save: 'सहेजें और जारी रखें', required: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    },
    dashboard: {
      greeting: 'नमस्ते',
      subtitle: 'आज आपको किसमें मदद चाहिए?',
      schemes: 'योजनाएं खोजें', schemesDesc: 'सरकारी स्वास्थ्य लाभ',
      nearbyCare: 'नज़दीकी देखभाल', nearbyCareDesc: 'अस्पताल और क्लीनिक',
      medicines: 'दवाइयां', medicinesDesc: 'जन औषधि केंद्र',
      awareness: 'स्वास्थ्य जानकारी', awarenessDesc: 'सुझाव और मार्गदर्शन',
      familyTitle: 'परिवार के सदस्य', addMember: '+ सदस्य जोड़ें',
    },
    schemeFinder: {
      title: 'अपनी योजना खोजें',
      subtitle: 'आपकी क्या स्वास्थ्य ज़रूरत है?',
      pregnancy: 'गर्भावस्था और प्रसव', child: 'बच्चे की देखभाल',
      accident: 'दुर्घटना / आपातकाल', chronic: 'दीर्घकालिक बीमारी',
      surgery: 'ऑपरेशन / अस्पताल भर्ती', cancer: 'कैंसर देखभाल',
      tb: 'टीबी / फेफड़े की बीमारी', diabetes: 'मधुमेह और बीपी',
      elder: 'बुजुर्ग देखभाल', insurance: 'स्वास्थ्य बीमा', general: 'सामान्य योजनाएं',
    },
    questions: {
      title: 'कुछ सवाल',
      subtitle: 'आपके लिए सबसे अच्छी योजनाएं खोजने के लिए',
      whichMember: 'किसे मदद चाहिए?', myself: 'मैं स्वयं',
      agentThinking: 'आपके लिए सबसे अच्छी योजनाएं खोजी जा रही हैं…',
      next: 'अगला', back: 'वापस', submit: 'योजनाएं खोजें',
    },
    results: {
      title: 'योजनाएं मिलीं',
      eligible: 'आप पात्र हो सकते हैं',
      benefit: 'लाभ', howToApply: 'कैसे आवेदन करें', source: 'स्रोत',
      save: 'योजना सहेजें', findHospital: 'नज़दीकी अस्पताल खोजें',
      backToHome: 'होम पर वापस जाएं',
      noResults: 'इस प्रोफ़ाइल के लिए कोई योजना नहीं मिली।',
      poweredBy: 'Foundry IQ द्वारा संचालित · प्रमाणित उत्तर',
    },
    nearby: {
      title: 'नज़दीकी देखभाल', subtitle: 'अपने पास देखभाल खोजें',
      hospital: 'अस्पताल खोजें', hospitalDesc: 'सरकारी और PMJAY अस्पताल',
      pmjay: 'PMJAY सूचीबद्ध', pmjayDesc: 'कैशलेस उपचार अस्पताल',
      emergency: 'आपातकालीन देखभाल', emergencyDesc: '108 एम्बुलेंस',
      searchPlaceholder: 'PIN कोड या जिला दर्ज करें',
      search: 'खोजें', call: 'कॉल करें', directions: 'दिशा-निर्देश', distance: 'किमी दूर',
    },
  },

  mr: {
    appName: 'स्वास्थ्य साथी',
    appTagline: 'तुमचा कौटुंबिक आरोग्य मार्गदर्शक',
    welcome: {
      headline: 'तुमच्या कुटुंबासाठी योग्य आरोग्य योजना शोधा',
      sub: 'सरकारी योजना, जवळचे रुग्णालय आणि औषधे — तुमच्या भाषेत.',
      cta: 'सुरू करा',
    },
    language: {
      title: 'तुमची भाषा निवडा',
      subtitle: 'अॅप तुमच्या निवडलेल्या भाषेत दिसेल',
      continue: 'पुढे जा',
    },
    profile: {
      title: 'तुमची माहिती',
      subtitle: 'आम्ही हे तुमच्यासाठी योजना शोधण्यासाठी वापरतो',
      name: 'पूर्ण नाव', namePlaceholder: 'तुमचे पूर्ण नाव टाका',
      age: 'वय', agePlaceholder: 'तुमचे वय',
      gender: 'लिंग', male: 'पुरुष', female: 'स्त्री', other: 'इतर',
      state: 'राज्य', statePlaceholder: 'राज्य निवडा',
      district: 'जिल्हा', districtPlaceholder: 'जिल्हा टाका',
      income: 'वार्षिक कौटुंबिक उत्पन्न', incomePlaceholder: 'श्रेणी निवडा',
      occupation: 'व्यवसाय', occupationPlaceholder: 'व्यवसाय निवडा',
      hasAyushman: 'तुमच्याकडे आयुष्मान कार्ड आहे का?', yes: 'होय', no: 'नाही',
      save: 'जतन करा आणि पुढे जा', required: 'कृपया सर्व आवश्यक फील्ड भरा',
    },
    dashboard: {
      greeting: 'नमस्कार',
      subtitle: 'आज तुम्हाला कशात मदत हवी आहे?',
      schemes: 'योजना शोधा', schemesDesc: 'सरकारी आरोग्य लाभ',
      nearbyCare: 'जवळची काळजी', nearbyCareDesc: 'रुग्णालये आणि दवाखाने',
      medicines: 'औषधे', medicinesDesc: 'जन औषधी केंद्र',
      awareness: 'आरोग्य माहिती', awarenessDesc: 'टिप्स आणि मार्गदर्शन',
      familyTitle: 'कुटुंब सदस्य', addMember: '+ सदस्य जोडा',
    },
    schemeFinder: {
      title: 'तुमची योजना शोधा',
      subtitle: 'तुमची आरोग्य गरज काय आहे?',
      pregnancy: 'गर्भधारणा आणि प्रसूती', child: 'बालक आणि नवजात काळजी',
      accident: 'अपघात / आणीबाणी', chronic: 'दीर्घकालीन आजार',
      surgery: 'शस्त्रक्रिया / रुग्णालयात भरती', cancer: 'कर्करोग काळजी',
      tb: 'क्षयरोग / फुफ्फुसाचा आजार', diabetes: 'मधुमेह आणि बीपी',
      elder: 'वृद्ध काळजी', insurance: 'आरोग्य विमा', general: 'सामान्य योजना',
    },
    questions: {
      title: 'काही प्रश्न',
      subtitle: 'तुमच्यासाठी सर्वोत्तम योजना शोधण्यासाठी',
      whichMember: 'कोणाला मदत हवी आहे?', myself: 'मी स्वतः',
      agentThinking: 'तुमच्यासाठी सर्वोत्तम योजना शोधल्या जात आहेत…',
      next: 'पुढे', back: 'मागे', submit: 'योजना शोधा',
    },
    results: {
      title: 'योजना सापडल्या',
      eligible: 'तुम्ही पात्र असू शकता',
      benefit: 'फायदा', howToApply: 'अर्ज कसा करावा', source: 'स्रोत',
      save: 'योजना जतन करा', findHospital: 'जवळचे रुग्णालय शोधा',
      backToHome: 'होमवर परत जा',
      noResults: 'या प्रोफाइलसाठी कोणतीही योजना सापडली नाही.',
      poweredBy: 'Foundry IQ द्वारे समर्थित · प्रमाणित उत्तरे',
    },
    nearby: {
      title: 'जवळची काळजी', subtitle: 'तुमच्या जवळ काळजी शोधा',
      hospital: 'रुग्णालय शोधा', hospitalDesc: 'सरकारी आणि PMJAY रुग्णालये',
      pmjay: 'PMJAY सूचीबद्ध', pmjayDesc: 'कॅशलेस उपचार रुग्णालये',
      emergency: 'आणीबाणी काळजी', emergencyDesc: '108 रुग्णवाहिका',
      searchPlaceholder: 'PIN कोड किंवा जिल्हा टाका',
      search: 'शोधा', call: 'कॉल करा', directions: 'दिशानिर्देश', distance: 'किमी दूर',
    },
  },
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('welcome');
  const [profile, setProfile] = useState(null);
  const [family, setFamily] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [schemeResults, setSchemeResults] = useState([]);
  const [selectedEditMember, setSelectedEditMember] = useState(null);

  const t = translations[lang];
  const navigate = (s) => setScreen(s);

  return (
    <AppContext.Provider value={{
      lang, setLang, t,
      screen, navigate,
      profile, setProfile,
      family, setFamily,
      selectedMember, setSelectedMember,
      selectedNeed, setSelectedNeed,
      schemeResults, setSchemeResults,
      selectedEditMember, setSelectedEditMember,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
