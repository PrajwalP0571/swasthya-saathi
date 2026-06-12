
import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

const STATE_DISTRICTS = {
  'Maharashtra': ['Ahmednagar','Akola','Amravati','Aurangabad','Beed','Bhandara','Buldhana','Chandrapur','Dhule','Gadchiroli','Gondia','Hingoli','Jalgaon','Jalna','Kolhapur','Latur','Mumbai City','Mumbai Suburban','Nagpur','Nanded','Nandurbar','Nashik','Osmanabad','Palghar','Parbhani','Pune','Raigad','Ratnagiri','Sangli','Satara','Sindhudurg','Solapur','Thane','Wardha','Washim','Yavatmal'],
  'Uttar Pradesh': ['Agra','Aligarh','Allahabad','Ambedkar Nagar','Amethi','Amroha','Auraiya','Azamgarh','Baghpat','Bahraich','Ballia','Balrampur','Banda','Barabanki','Bareilly','Basti','Bhadohi','Bijnor','Budaun','Bulandshahr','Chandauli','Chitrakoot','Deoria','Etah','Etawah','Faizabad','Farrukhabad','Fatehpur','Firozabad','Gautam Buddha Nagar','Ghaziabad','Ghazipur','Gonda','Gorakhpur','Hamirpur','Hapur','Hardoi','Hathras','Jalaun','Jaunpur','Jhansi','Kannauj','Kanpur Dehat','Kanpur Nagar','Kasganj','Kaushambi','Kushinagar','Lakhimpur Kheri','Lalitpur','Lucknow','Maharajganj','Mahoba','Mainpuri','Mathura','Mau','Meerut','Mirzapur','Moradabad','Muzaffarnagar','Pilibhit','Pratapgarh','Raebareli','Rampur','Saharanpur','Sambhal','Sant Kabir Nagar','Shahjahanpur','Shamli','Shravasti','Siddharthnagar','Sitapur','Sonbhadra','Sultanpur','Unnao','Varanasi'],
  'Bihar': ['Araria','Arwal','Aurangabad','Banka','Begusarai','Bhagalpur','Bhojpur','Buxar','Darbhanga','East Champaran','Gaya','Gopalganj','Jamui','Jehanabad','Kaimur','Katihar','Khagaria','Kishanganj','Lakhisarai','Madhepura','Madhubani','Munger','Muzaffarpur','Nalanda','Nawada','Patna','Purnia','Rohtas','Saharsa','Samastipur','Saran','Sheikhpura','Sheohar','Sitamarhi','Siwan','Supaul','Vaishali','West Champaran'],
  'Rajasthan': ['Ajmer','Alwar','Banswara','Baran','Barmer','Bharatpur','Bhilwara','Bikaner','Bundi','Chittorgarh','Churu','Dausa','Dholpur','Dungarpur','Hanumangarh','Jaipur','Jaisalmer','Jalore','Jhalawar','Jhunjhunu','Jodhpur','Karauli','Kota','Nagaur','Pali','Pratapgarh','Rajsamand','Sawai Madhopur','Sikar','Sirohi','Sri Ganganagar','Tonk','Udaipur'],
  'Madhya Pradesh': ['Agar Malwa','Alirajpur','Anuppur','Ashoknagar','Balaghat','Barwani','Betul','Bhind','Bhopal','Burhanpur','Chhatarpur','Chhindwara','Damoh','Datia','Dewas','Dhar','Dindori','Guna','Gwalior','Harda','Hoshangabad','Indore','Jabalpur','Jhabua','Katni','Khandwa','Khargone','Mandla','Mandsaur','Morena','Narsinghpur','Neemuch','Niwari','Panna','Raisen','Rajgarh','Ratlam','Rewa','Sagar','Satna','Sehore','Seoni','Shahdol','Shajapur','Sheopur','Shivpuri','Sidhi','Singrauli','Tikamgarh','Ujjain','Umaria','Vidisha'],
  'Gujarat': ['Ahmedabad','Amreli','Anand','Aravalli','Banaskantha','Bharuch','Bhavnagar','Botad','Chhota Udaipur','Dahod','Dang','Devbhoomi Dwarka','Gandhinagar','Gir Somnath','Jamnagar','Junagadh','Kheda','Kutch','Mahisagar','Mehsana','Morbi','Narmada','Navsari','Panchmahal','Patan','Porbandar','Rajkot','Sabarkantha','Surat','Surendranagar','Tapi','Vadodara','Valsad'],
  'Karnataka': ['Bagalkot','Ballari','Belagavi','Bengaluru Rural','Bengaluru Urban','Bidar','Chamarajanagar','Chikkaballapur','Chikkamagaluru','Chitradurga','Dakshina Kannada','Davanagere','Dharwad','Gadag','Hassan','Haveri','Kalaburagi','Kodagu','Kolar','Koppal','Mandya','Mysuru','Raichur','Ramanagara','Shivamogga','Tumakuru','Udupi','Uttara Kannada','Vijayapura','Yadgir'],
  'Tamil Nadu': ['Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri','Dindigul','Erode','Kallakurichi','Kancheepuram','Kanyakumari','Karur','Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Namakkal','Nilgiris','Perambalur','Pudukkottai','Ramanathapuram','Ranipet','Salem','Sivaganga','Tenkasi','Thanjavur','Theni','Thoothukudi','Tiruchirappalli','Tirunelveli','Tirupathur','Tiruppur','Tiruvallur','Tiruvannamalai','Tiruvarur','Vellore','Villupuram','Virudhunagar'],
  'Andhra Pradesh': ['Alluri Sitharama Raju','Anakapalli','Ananthapuramu','Annamayya','Bapatla','Chittoor','East Godavari','Eluru','Guntur','Kakinada','Konaseema','Krishna','Kurnool','Manyam','NTR','Nandyal','Nellore','Palnadu','Prakasam','Sri Potti Sriramulu Nellore','Srikakulam','Tirupati','Visakhapatnam','Vizianagaram','West Godavari','YSR Kadapa'],
  'Telangana': ['Adilabad','Bhadradri Kothagudem','Hyderabad','Jagtial','Jangaon','Jayashankar Bhupalpally','Jogulamba Gadwal','Kamareddy','Karimnagar','Khammam','Kumuram Bheem','Mahabubabad','Mahabubnagar','Mancherial','Medak','Medchal-Malkajgiri','Mulugu','Nagarkurnool','Nalgonda','Narayanpet','Nirmal','Nizamabad','Peddapalli','Rajanna Sircilla','Rangareddy','Sangareddy','Siddipet','Suryapet','Vikarabad','Wanaparthy','Warangal Rural','Warangal Urban','Yadadri Bhuvanagiri'],
  'Kerala': ['Alappuzha','Ernakulam','Idukki','Kannur','Kasaragod','Kollam','Kottayam','Kozhikode','Malappuram','Palakkad','Pathanamthitta','Thiruvananthapuram','Thrissur','Wayanad'],
  'West Bengal': ['Alipurduar','Bankura','Birbhum','Cooch Behar','Dakshin Dinajpur','Darjeeling','Hooghly','Howrah','Jalpaiguri','Jhargram','Kalimpong','Kolkata','Malda','Murshidabad','Nadia','North 24 Parganas','Paschim Bardhaman','Paschim Medinipur','Purba Bardhaman','Purba Medinipur','Purulia','South 24 Parganas','Uttar Dinajpur'],
  'Punjab': ['Amritsar','Barnala','Bathinda','Faridkot','Fatehgarh Sahib','Fazilka','Ferozepur','Gurdaspur','Hoshiarpur','Jalandhar','Kapurthala','Ludhiana','Mansa','Moga','Mohali','Muktsar','Nawanshahr','Pathankot','Patiala','Rupnagar','Sangrur','Tarn Taran'],
  'Haryana': ['Ambala','Bhiwani','Charkhi Dadri','Faridabad','Fatehabad','Gurugram','Hisar','Jhajjar','Jind','Kaithal','Karnal','Kurukshetra','Mahendragarh','Nuh','Palwal','Panchkula','Panipat','Rewari','Rohtak','Sirsa','Sonipat','Yamunanagar'],
  'Odisha': ['Angul','Balangir','Balasore','Bargarh','Bhadrak','Bolangir','Boudh','Cuttack','Deogarh','Dhenkanal','Gajapati','Ganjam','Jagatsinghpur','Jajpur','Jharsuguda','Kalahandi','Kandhamal','Kendrapara','Kendujhar','Khordha','Koraput','Malkangiri','Mayurbhanj','Nabarangpur','Nayagarh','Nuapada','Puri','Rayagada','Sambalpur','Subarnapur','Sundargarh'],
  'Jharkhand': ['Bokaro','Chatra','Deoghar','Dhanbad','Dumka','East Singhbhum','Garhwa','Giridih','Godda','Gumla','Hazaribagh','Jamtara','Khunti','Koderma','Latehar','Lohardaga','Pakur','Palamu','Ramgarh','Ranchi','Sahebganj','Seraikela Kharsawan','Simdega','West Singhbhum'],
  'Assam': ['Baksa','Barpeta','Biswanath','Bongaigaon','Cachar','Charaideo','Chirang','Darrang','Dhemaji','Dhubri','Dibrugarh','Dima Hasao','Goalpara','Golaghat','Hailakandi','Hojai','Jorhat','Kamrup','Kamrup Metropolitan','Karbi Anglong','Karimganj','Kokrajhar','Lakhimpur','Majuli','Morigaon','Nagaon','Nalbari','Sivasagar','Sonitpur','South Salmara-Mankachar','Tinsukia','Udalguri','West Karbi Anglong'],
  'Delhi': ['Central Delhi','East Delhi','New Delhi','North Delhi','North East Delhi','North West Delhi','Shahdara','South Delhi','South East Delhi','South West Delhi','West Delhi'],
  'Chhattisgarh': ['Balod','Baloda Bazar','Balrampur','Bastar','Bemetara','Bijapur','Bilaspur','Dantewada','Dhamtari','Durg','Gariaband','Gaurela-Pendra-Marwahi','Janjgir-Champa','Jashpur','Kabirdham','Kanker','Khairagarh','Kondagaon','Korba','Koriya','Mahasamund','Mungeli','Narayanpur','Raigarh','Raipur','Rajnandgaon','Sukma','Surajpur','Surguja'],
  'Himachal Pradesh': ['Bilaspur','Chamba','Hamirpur','Kangra','Kinnaur','Kullu','Lahaul and Spiti','Mandi','Shimla','Sirmaur','Solan','Una'],
  'Uttarakhand': ['Almora','Bageshwar','Chamoli','Champawat','Dehradun','Haridwar','Nainital','Pauri Garhwal','Pithoragarh','Rudraprayag','Tehri Garhwal','Udham Singh Nagar','Uttarkashi'],
  'Goa': ['North Goa','South Goa'],
  'Manipur': ['Bishnupur','Chandel','Churachandpur','Imphal East','Imphal West','Jiribam','Kakching','Kamjong','Kangpokpi','Noney','Pherzawl','Senapati','Tamenglong','Tengnoupal','Thoubal','Ukhrul'],
  'Meghalaya': ['East Garo Hills','East Jaintia Hills','East Khasi Hills','North Garo Hills','Ri Bhoi','South Garo Hills','South West Garo Hills','South West Khasi Hills','West Garo Hills','West Jaintia Hills','West Khasi Hills'],
  'Sikkim': ['East Sikkim','North Sikkim','South Sikkim','West Sikkim'],
  'Tripura': ['Dhalai','Gomati','Khowai','North Tripura','Sepahijala','South Tripura','Unokoti','West Tripura'],
  'Nagaland': ['Dimapur','Kiphire','Kohima','Longleng','Mokokchung','Mon','Peren','Phek','Tuensang','Wokha','Zunheboto'],
  'Mizoram': ['Aizawl','Champhai','Hnahthial','Khawzawl','Kolasib','Lawngtlai','Lunglei','Mamit','Saitual','Serchhip'],
  'Arunachal Pradesh': ['Anjaw','Changlang','Dibang Valley','East Kameng','East Siang','Kamle','Kra Daadi','Kurung Kumey','Lepa Rada','Lohit','Longding','Lower Dibang Valley','Lower Siang','Lower Subansiri','Namsai','Pakke-Kessang','Papum Pare','Shi Yomi','Siang','Tawang','Tirap','Upper Siang','Upper Subansiri','West Kameng','West Siang'],
}

const ALL_STATES = Object.keys(STATE_DISTRICTS).sort()

const INCOME_RANGES = ['Below ₹1 lakh','₹1 – 2.5 lakh','₹2.5 – 5 lakh','₹5 – 10 lakh','Above ₹10 lakh']
const OCCUPATIONS   = ['Farmer','Daily Wage Worker','Self Employed','Private Job','Government Job','Homemaker','Student','Other']

export default function ProfileScreen() {
  const { t, setProfile, navigate } = useApp()

  const [form, setForm] = useState({
    name: '', age: '', gender: '',
    state: '', district: '', city: '',
    income: '', occupation: '',
    hasAyushman: '',
  })
  const [error, setError] = useState(false)

  const update = (field, value) => {
    if (field === 'state') {
      setForm((prev) => ({ ...prev, state: value, district: '' }))
    } else {
      setForm((prev) => ({ ...prev, [field]: value }))
    }
    setError(false)
  }

  const handleSave = () => {
    const required = ['name', 'age', 'gender', 'state', 'income']
    if (required.some((f) => !form[f])) { setError(true); return }
    setProfile(form)
    navigate('dashboard')
  }

  const districts = form.state ? (STATE_DISTRICTS[form.state] || []) : []

  return (
    <div className="screen pb-10">
      <div className="screen-header">
        <div className="w-12 h-12 rounded-2xl bg-brand-green-pale flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1B7A48" strokeWidth="2" className="w-6 h-6">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h1 className="screen-title">{t.profile.title}</h1>
        <p className="screen-subtitle">{t.profile.subtitle}</p>
      </div>

      <div className="px-5 space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.name} <span className="text-red-400">*</span>
          </label>
          <input type="text" className="input-field" placeholder={t.profile.namePlaceholder}
            value={form.name} onChange={(e) => update('name', e.target.value)} />
        </div>

        {/* Age + Gender */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
              {t.profile.age} <span className="text-red-400">*</span>
            </label>
            <input type="number" className="input-field" placeholder={t.profile.agePlaceholder}
              value={form.age} onChange={(e) => update('age', e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
              {t.profile.gender} <span className="text-red-400">*</span>
            </label>
            <select className="input-field" value={form.gender} onChange={(e) => update('gender', e.target.value)}>
              <option value="">Select</option>
              <option value="male">{t.profile.male}</option>
              <option value="female">{t.profile.female}</option>
              <option value="other">{t.profile.other}</option>
            </select>
          </div>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.state} <span className="text-red-400">*</span>
          </label>
          <select className="input-field" value={form.state} onChange={(e) => update('state', e.target.value)}>
            <option value="">{t.profile.statePlaceholder}</option>
            {ALL_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* District — based on state */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.district}
          </label>
          <select className="input-field" value={form.district} onChange={(e) => update('district', e.target.value)}
            disabled={!form.state}>
            <option value="">{form.state ? 'Select district' : 'Select state first'}</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* City / Village */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            City / Village
          </label>
          <input type="text" className="input-field" placeholder="Enter your city or village"
            value={form.city} onChange={(e) => update('city', e.target.value)} />
        </div>

        {/* Income */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.income} <span className="text-red-400">*</span>
          </label>
          <select className="input-field" value={form.income} onChange={(e) => update('income', e.target.value)}>
            <option value="">{t.profile.incomePlaceholder}</option>
            {INCOME_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-1.5">
            {t.profile.occupation}
          </label>
          <select className="input-field" value={form.occupation} onChange={(e) => update('occupation', e.target.value)}>
            <option value="">{t.profile.occupationPlaceholder}</option>
            {OCCUPATIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Ayushman */}
        <div>
          <label className="block text-sm font-medium text-brand-text-primary mb-2">
            {t.profile.hasAyushman}
          </label>
          <div className="flex gap-3">
            {['yes', 'no'].map((val) => (
              <button key={val} onClick={() => update('hasAyushman', val)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-150
                  ${form.hasAyushman === val ? 'border-brand-green bg-brand-green-pale text-brand-green' : 'border-gray-200 text-brand-text-secondary'}`}>
                {val === 'yes' ? t.profile.yes : t.profile.no}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{t.profile.required}</p>}

        <div className="pt-2">
          <button onClick={handleSave} className="btn-primary">{t.profile.save}</button>
        </div>

      </div>
    </div>
  )
}
