// Smart AI Engine v2 — Comprehensive keyword-based health intelligence
// No API key required. Rich condition mappings across 20+ specialties.

const CONDITIONS = {
  eye: {
    keywords: ['eye', 'vision', 'blur', 'blurry', 'sight', 'glaucoma', 'cataract', 'retina', 'glasses', 'blind', 'pressure eye', 'optic', 'cornea', 'pupil', 'redness eye', 'itching eye', 'watery eye', 'dry eye', 'floater', 'double vision', 'squint', 'cross eye', 'color blind', 'night blind', 'photophobia', 'light sensitive', 'eye strain', 'aankh', 'nazar', 'eye pain', 'swollen eye', 'eye infection', 'stye', 'conjunctivitis', 'pink eye', 'macular', 'astigmatism', 'myopia', 'hyperopia', 'presbyopia', 'eye discharge', 'eye burning', 'eye twitch', 'lens', 'iop', 'vitreous', 'eye drop'],
    conditions: [
      { name: 'Refractive Error (Myopia/Hyperopia)', probability: 'High', description: 'Difficulty seeing objects at certain distances. Correctable with glasses or LASIK.' },
      { name: 'Conjunctivitis (Pink Eye)', probability: 'Moderate', description: 'Infection or inflammation of the conjunctiva causing redness and discharge.' },
      { name: 'Glaucoma (Suspect)', probability: 'Moderate', description: 'Increased eye pressure that can damage the optic nerve. Needs immediate attention.' },
      { name: 'Dry Eye Syndrome', probability: 'Moderate', description: 'Insufficient tear production causing discomfort, burning, and blurred vision.' },
      { name: 'Cataract (Early Stage)', probability: 'Low', description: 'Clouding of the eye lens, common with age. Surgery is highly effective.' },
      { name: 'Diabetic Retinopathy', probability: 'Low', description: 'Damage to retinal blood vessels due to diabetes. Regular screening essential.' }
    ],
    specialist: 'Ophthalmologist',
    urgency: 'medium',
    specialtyKey: 'eye'
  },
  heart: {
    keywords: ['chest pain', 'chest', 'heart', 'palpitation', 'breathless', 'shortness of breath', 'heartbeat', 'cardiac', 'blood pressure', 'hypertension', 'bp', 'angina', 'arrhythmia', 'tachycardia', 'bradycardia', 'heart attack', 'dil', 'seene me dard', 'cholesterol', 'stent', 'bypass', 'valve', 'murmur', 'edema', 'swollen feet', 'swollen ankle', 'dizzy standing', 'fainting', 'syncope', 'aorta', 'atherosclerosis', 'coronary', 'ecg', 'echo', 'stress test', 'troponin', 'heart failure', 'cardiomyopathy', 'irregular heartbeat', 'fast heart', 'slow heart', 'chest tightness', 'chest pressure'],
    conditions: [
      { name: 'Hypertension (High Blood Pressure)', probability: 'High', description: 'Persistently elevated BP damaging organs silently. Lifestyle + medication critical.' },
      { name: 'Coronary Artery Disease', probability: 'Moderate', description: 'Narrowing of heart arteries reducing blood flow. May need angioplasty or bypass.' },
      { name: 'Arrhythmia', probability: 'Moderate', description: 'Irregular heart rhythms — can be too fast, too slow, or erratic.' },
      { name: 'Heart Valve Disorder', probability: 'Low', description: 'Valves not opening/closing properly. May cause murmurs and fatigue.' },
      { name: 'Anxiety-Related Chest Pain', probability: 'Moderate', description: 'Panic attacks can mimic heart attacks. Rule out cardiac causes first.' },
      { name: 'Heart Failure (Evaluation)', probability: 'Low', description: 'Heart unable to pump effectively. Causes fluid buildup and breathlessness.' }
    ],
    specialist: 'Cardiologist',
    urgency: 'high',
    specialtyKey: 'heart'
  },
  skin: {
    keywords: ['skin', 'rash', 'itch', 'acne', 'pimple', 'spot', 'eczema', 'psoriasis', 'allergy', 'hive', 'boil', 'fungal', 'dermatitis', 'hair fall', 'hair loss', 'dandruff', 'scabies', 'ringworm', 'vitiligo', 'pigmentation', 'dark spot', 'mole', 'wart', 'herpes', 'shingles', 'urticaria', 'swelling skin', 'blister', 'dry skin', 'oily skin', 'blackhead', 'whitehead', 'cyst', 'keloid', 'scar', 'burn', 'sunburn', 'tanning', 'stretch mark', 'cellulitis', 'impetigo', 'skin tag', 'alopecia', 'bald', 'thinning hair', 'nail', 'nail fungus', 'skin peeling', 'flaky skin', 'red patches', 'khujli', 'chamdi', 'daad'],
    conditions: [
      { name: 'Allergic Dermatitis', probability: 'High', description: 'Skin inflammation triggered by allergens — cleaning agents, metals, or cosmetics.' },
      { name: 'Eczema / Atopic Dermatitis', probability: 'High', description: 'Chronic itchy, inflamed skin. Common in people with asthma or hay fever.' },
      { name: 'Acne Vulgaris', probability: 'High', description: 'Blocked hair follicles causing pimples, blackheads. Hormonal and bacterial factors.' },
      { name: 'Fungal Infection (Dermatophytosis)', probability: 'Moderate', description: 'Ringworm, athlete\'s foot, jock itch. Thrives in warm, moist areas.' },
      { name: 'Psoriasis', probability: 'Moderate', description: 'Autoimmune condition causing thick, scaly red patches. Chronic but manageable.' },
      { name: 'Alopecia / Hair Loss', probability: 'Moderate', description: 'Pattern baldness or patchy hair loss. Hormonal, genetic, or stress-related.' },
      { name: 'Vitiligo', probability: 'Low', description: 'Loss of skin color in patches. Autoimmune origin. Not contagious.' },
      { name: 'Urticaria (Hives)', probability: 'Low', description: 'Itchy welts triggered by food, stress, or medication allergies.' }
    ],
    specialist: 'Dermatologist',
    urgency: 'low',
    specialtyKey: 'skin'
  },
  brain: {
    keywords: ['headache', 'migraine', 'head pain', 'dizziness', 'vertigo', 'memory', 'seizure', 'numbness', 'paralysis', 'stroke', 'tremor', 'nerve', 'neuro', 'brain', 'tingling', 'sciatica', 'epilepsy', 'convulsion', 'fainting', 'blackout', 'confusion', 'dementia', 'alzheimer', 'parkinson', 'neuropathy', 'facial palsy', 'bell palsy', 'speech difficulty', 'slurred speech', 'weakness one side', 'walking difficulty', 'balance problem', 'sir dard', 'chakkar', 'brain fog', 'concentration', 'cervical', 'spinal cord', 'ms', 'multiple sclerosis', 'meningitis', 'encephalitis', 'brain tumor', 'sar me dard'],
    conditions: [
      { name: 'Tension Headache', probability: 'High', description: 'Most common headache type. Band-like pressure around the head. Stress-related.' },
      { name: 'Migraine', probability: 'High', description: 'Severe throbbing headache, often one-sided, with nausea and light sensitivity.' },
      { name: 'Cervical Spondylosis', probability: 'Moderate', description: 'Neck vertebrae wear causing pain radiating to head, arms, and shoulders.' },
      { name: 'Vertigo / BPPV', probability: 'Moderate', description: 'Inner ear crystals displacement causing spinning sensation. Very treatable.' },
      { name: 'Epilepsy / Seizure Disorder', probability: 'Low', description: 'Recurrent seizures due to abnormal brain electrical activity.' },
      { name: 'Peripheral Neuropathy', probability: 'Low', description: 'Nerve damage causing tingling, numbness, weakness — often in hands and feet.' },
      { name: 'Stroke (Evaluation Needed)', probability: 'Low', description: 'Sudden numbness, confusion, vision loss, severe headache. EMERGENCY.' }
    ],
    specialist: 'Neurologist',
    urgency: 'medium',
    specialtyKey: 'neuro'
  },
  bone: {
    keywords: ['joint', 'knee', 'back pain', 'spine', 'fracture', 'bone', 'arthritis', 'ortho', 'shoulder', 'hip', 'ligament', 'muscle pain', 'sports injury', 'slip disc', 'disc', 'scoliosis', 'osteoporosis', 'tendon', 'frozen shoulder', 'carpal tunnel', 'sprain', 'dislocation', 'ACL', 'meniscus', 'rotator cuff', 'tennis elbow', 'golfer elbow', 'sciatica', 'plantar fasciitis', 'heel pain', 'foot pain', 'ankle', 'wrist', 'elbow', 'kamar dard', 'ghutna', 'jodon me dard', 'haddi', 'flat foot', 'bunion', 'gout', 'rheumatoid', 'cervical', 'lumbar', 'neck pain', 'stiffness', 'cramp', 'muscle spasm'],
    conditions: [
      { name: 'Osteoarthritis', probability: 'High', description: 'Wear-and-tear joint degeneration. Common in knees, hips, and hands.' },
      { name: 'Lumbar Spondylosis (Lower Back)', probability: 'High', description: 'Spinal degeneration causing chronic low back pain. Very common after 40.' },
      { name: 'Cervical Spondylosis (Neck)', probability: 'Moderate', description: 'Neck vertebrae wear causing pain, stiffness, and radiating arm pain.' },
      { name: 'Disc Herniation / Slip Disc', probability: 'Moderate', description: 'Disc bulge pressing on nerves. Causes severe back/leg pain (sciatica).' },
      { name: 'Sports Injury (Ligament/Tendon)', probability: 'Moderate', description: 'ACL tears, meniscus injuries, sprains from physical activity.' },
      { name: 'Frozen Shoulder', probability: 'Low', description: 'Shoulder stiffness and pain limiting movement. Common in diabetes patients.' },
      { name: 'Osteoporosis', probability: 'Low', description: 'Bone density loss making fractures easy. Common in postmenopausal women.' },
      { name: 'Rheumatoid Arthritis', probability: 'Low', description: 'Autoimmune joint inflammation. Causes swelling, pain in small joints.' }
    ],
    specialist: 'Orthopedist',
    urgency: 'low',
    specialtyKey: 'ortho'
  },
  stomach: {
    keywords: ['stomach', 'abdomen', 'abdominal', 'digestion', 'acidity', 'gas', 'bloating', 'diarrhea', 'constipation', 'liver', 'nausea', 'vomiting', 'gastric', 'ibs', 'ulcer', 'gerd', 'acid reflux', 'heartburn', 'crohn', 'colitis', 'appendix', 'gallstone', 'gallbladder', 'hepatitis', 'jaundice', 'fatty liver', 'cirrhosis', 'pancreatitis', 'hernia', 'piles', 'hemorrhoid', 'fissure', 'rectal', 'blood stool', 'loose motion', 'pet dard', 'kabz', 'ulcerative', 'gastritis', 'food poisoning', 'indigestion', 'dyspepsia', 'celiac', 'gluten', 'lactose', 'appetite loss', 'weight loss unexplained'],
    conditions: [
      { name: 'Acid Reflux / GERD', probability: 'High', description: 'Stomach acid flows back into esophagus causing heartburn and chest discomfort.' },
      { name: 'Irritable Bowel Syndrome (IBS)', probability: 'High', description: 'Chronic condition with bloating, cramping, and altered bowel habits.' },
      { name: 'Gastritis', probability: 'Moderate', description: 'Stomach lining inflammation. Causes burning pain, nausea, and fullness.' },
      { name: 'Peptic Ulcer Disease', probability: 'Moderate', description: 'Open sores in stomach or upper intestine. H. pylori or NSAID related.' },
      { name: 'Fatty Liver Disease (NAFLD)', probability: 'Moderate', description: 'Fat accumulation in liver. Often silent but can progress to cirrhosis.' },
      { name: 'Gallstones', probability: 'Low', description: 'Hardened deposits in gallbladder causing sharp upper-right abdominal pain.' },
      { name: 'Inflammatory Bowel Disease', probability: 'Low', description: 'Crohn\'s or Ulcerative Colitis — chronic intestinal inflammation.' },
      { name: 'Hemorrhoids / Piles', probability: 'Low', description: 'Swollen veins in rectum/anus. Causes pain, itching, bleeding.' }
    ],
    specialist: 'Gastroenterologist',
    urgency: 'medium',
    specialtyKey: 'gastro'
  },
  diabetes: {
    keywords: ['sugar', 'diabetes', 'diabetic', 'insulin', 'glucose', 'thirst', 'frequent urination', 'fatigue', 'thyroid', 'hormone', 'weight gain', 'weight loss', 'endocrine', 'pcod', 'metabolic', 'hba1c', 'fasting sugar', 'prediabetes', 'insulin resistance', 'hypoglycemia', 'hyperglycemia', 'type 1', 'type 2', 'gestational diabetes', 'hypothyroid', 'hyperthyroid', 'goiter', 'adrenal', 'cushing', 'addison', 'growth hormone', 'pituitary', 'testosterone', 'estrogen', 'menopause hormone', 'sugar high', 'sugar low', 'feet numbness diabetes', 'slow healing', 'blurred vision diabetes'],
    conditions: [
      { name: 'Type 2 Diabetes Mellitus', probability: 'High', description: 'Body resists insulin or doesn\'t produce enough. Most common diabetes type.' },
      { name: 'Pre-Diabetes', probability: 'High', description: 'Blood sugar elevated but not yet diabetic. Lifestyle changes can reverse it.' },
      { name: 'Hypothyroidism', probability: 'Moderate', description: 'Underactive thyroid causing weight gain, fatigue, cold sensitivity, and depression.' },
      { name: 'Hyperthyroidism', probability: 'Low', description: 'Overactive thyroid causing weight loss, anxiety, tremors, and rapid heartbeat.' },
      { name: 'Metabolic Syndrome', probability: 'Moderate', description: 'Cluster of conditions: high BP, sugar, cholesterol, abdominal fat.' },
      { name: 'PCOD/PCOS (Hormonal)', probability: 'Low', description: 'Polycystic ovary syndrome — hormonal imbalance affecting metabolism and fertility.' },
      { name: 'Diabetic Neuropathy', probability: 'Low', description: 'Nerve damage from prolonged high blood sugar, especially in feet.' }
    ],
    specialist: 'Endocrinologist',
    urgency: 'medium',
    specialtyKey: 'diabetes'
  },
  child: {
    keywords: ['child', 'baby', 'infant', 'kid', 'fever child', 'pediatric', 'growth', 'vaccination', 'toddler', 'newborn', 'neonatal', 'breastfeeding', 'milestone', 'autism', 'adhd', 'developmental delay', 'childhood illness', 'measles', 'mumps', 'chickenpox', 'whooping cough', 'croup', 'hand foot mouth', 'diaper rash', 'colic', 'jaundice newborn', 'premature', 'low birth weight', 'child nutrition', 'underweight child', 'stunting', 'worm', 'deworming', 'child cough', 'child cold', 'child fever', 'ear infection child', 'tonsil child', 'asthma child', 'child vomiting', 'child diarrhea', 'baccha', 'bache ko bukhar'],
    conditions: [
      { name: 'Viral Fever', probability: 'High', description: 'Common childhood illness. Usually self-limiting with rest and fluids.' },
      { name: 'Upper Respiratory Infection', probability: 'High', description: 'Cold, cough, sore throat. Very common in children under 5.' },
      { name: 'Acute Gastroenteritis', probability: 'Moderate', description: 'Stomach bug causing vomiting and diarrhea. ORS is critical.' },
      { name: 'Ear Infection (Otitis Media)', probability: 'Moderate', description: 'Middle ear infection causing pain, fever, and irritability.' },
      { name: 'Developmental Delay Assessment', probability: 'Low', description: 'Speech, motor, or cognitive milestones not met on time. Early intervention key.' },
      { name: 'Childhood Asthma', probability: 'Low', description: 'Recurring wheezing, cough, and breathlessness. Inhaler therapy effective.' },
      { name: 'Nutritional Deficiency', probability: 'Moderate', description: 'Iron, vitamin D, or protein deficiency affecting growth and immunity.' }
    ],
    specialist: 'Pediatrician',
    urgency: 'medium',
    specialtyKey: 'child'
  },
  female: {
    keywords: ['period', 'menstrual', 'pregnancy', 'gynec', 'pcod', 'pcos', 'ovary', 'uterus', 'breast', 'vaginal', 'fertility', 'menopause', 'irregular period', 'heavy period', 'missed period', 'cramp', 'endometriosis', 'fibroid', 'cervical', 'pap smear', 'ivf', 'infertility', 'miscarriage', 'ectopic', 'prenatal', 'postnatal', 'c-section', 'cesarean', 'delivery', 'labor', 'breastfeeding', 'mastitis', 'discharge', 'uti women', 'yeast infection', 'hot flash', 'night sweat', 'mood swing', 'pelvic pain', 'pelvic floor', 'prolapse', 'ovarian cyst', 'mammogram', 'breast lump', 'mahavari', 'pet me dard', 'pregnancy test', 'morning sickness', 'gestational', 'preeclampsia', 'postpartum'],
    conditions: [
      { name: 'PCOD/PCOS', probability: 'High', description: 'Hormonal disorder causing irregular periods, acne, weight gain, and cysts.' },
      { name: 'Menstrual Irregularity', probability: 'High', description: 'Abnormal cycle length, heavy/light flow, or missed periods.' },
      { name: 'Urinary Tract Infection', probability: 'Moderate', description: 'Burning urination, frequent urge, pelvic pain. Very common in women.' },
      { name: 'Endometriosis', probability: 'Moderate', description: 'Uterine tissue growing outside uterus causing severe pain and infertility.' },
      { name: 'Uterine Fibroids', probability: 'Low', description: 'Non-cancerous growths in uterus causing heavy bleeding and pain.' },
      { name: 'Ovarian Cyst', probability: 'Low', description: 'Fluid-filled sacs on ovaries. Most resolve naturally, some need treatment.' },
      { name: 'Menopausal Symptoms', probability: 'Low', description: 'Hot flashes, night sweats, mood changes after menopause onset.' },
      { name: 'Pregnancy-Related Concern', probability: 'Low', description: 'Morning sickness, high BP, gestational diabetes, or labor signs.' }
    ],
    specialist: 'Gynecologist',
    urgency: 'medium',
    specialtyKey: 'gynec'
  },
  ent: {
    keywords: ['ear', 'nose', 'throat', 'sore throat', 'tonsil', 'sinus', 'sinusitis', 'hearing', 'deaf', 'hearing loss', 'tinnitus', 'ringing ear', 'nasal', 'nose block', 'nose bleed', 'snoring', 'sleep apnea', 'voice change', 'hoarseness', 'laryngitis', 'adenoid', 'deviated septum', 'polyp', 'ear wax', 'ear pain', 'ear discharge', 'vertigo ear', 'balance ear', 'kaan', 'naak', 'gala', 'gale me dard', 'swallowing difficulty', 'dysphagia', 'pharyngitis', 'strep throat', 'cold', 'cough chronic', 'postnasal drip', 'allergic rhinitis', 'hay fever'],
    conditions: [
      { name: 'Allergic Rhinitis', probability: 'High', description: 'Nasal allergy causing sneezing, runny/blocked nose, and itchy eyes.' },
      { name: 'Chronic Sinusitis', probability: 'High', description: 'Prolonged sinus inflammation causing congestion, facial pain, and headache.' },
      { name: 'Tonsillitis', probability: 'Moderate', description: 'Tonsil infection causing sore throat, fever, and difficulty swallowing.' },
      { name: 'Otitis Media (Ear Infection)', probability: 'Moderate', description: 'Middle ear infection causing pain, fever, and temporary hearing loss.' },
      { name: 'Tinnitus', probability: 'Low', description: 'Persistent ringing or buzzing in ears. Can indicate hearing damage.' },
      { name: 'Hearing Loss', probability: 'Low', description: 'Gradual or sudden loss of hearing. Age, noise, or infection related.' },
      { name: 'Obstructive Sleep Apnea', probability: 'Low', description: 'Breathing repeatedly stops during sleep. Causes loud snoring and daytime fatigue.' },
      { name: 'Deviated Nasal Septum', probability: 'Low', description: 'Crooked partition between nostrils causing chronic congestion.' }
    ],
    specialist: 'ENT Specialist',
    urgency: 'low',
    specialtyKey: 'ent'
  },
  dental: {
    keywords: ['tooth', 'teeth', 'dental', 'cavity', 'gum', 'toothache', 'root canal', 'braces', 'orthodontic', 'wisdom tooth', 'jaw', 'tmj', 'mouth ulcer', 'bleeding gum', 'gingivitis', 'periodontitis', 'bad breath', 'halitosis', 'dental implant', 'crown', 'bridge', 'denture', 'whitening', 'sensitivity', 'tooth decay', 'plaque', 'tartar', 'dant', 'masude', 'jaw pain', 'biting problem'],
    conditions: [
      { name: 'Dental Caries (Cavity)', probability: 'High', description: 'Tooth decay caused by bacteria. Needs filling or crown depending on severity.' },
      { name: 'Gingivitis', probability: 'High', description: 'Early gum disease causing redness, swelling, and bleeding while brushing.' },
      { name: 'Periodontitis', probability: 'Moderate', description: 'Advanced gum disease destroying bone around teeth. Major cause of tooth loss.' },
      { name: 'Tooth Sensitivity', probability: 'Moderate', description: 'Sharp pain with hot/cold food due to exposed dentin or worn enamel.' },
      { name: 'Impacted Wisdom Tooth', probability: 'Low', description: 'Third molars stuck under gum causing pain and infection. May need extraction.' },
      { name: 'TMJ Disorder', probability: 'Low', description: 'Jaw joint problems causing clicking, pain, and difficulty opening mouth.' }
    ],
    specialist: 'Dentist',
    urgency: 'low',
    specialtyKey: 'dental'
  },
  kidney: {
    keywords: ['kidney', 'renal', 'urine', 'urinary', 'uti', 'kidney stone', 'dialysis', 'creatinine', 'nephrology', 'blood urine', 'painful urination', 'frequent urination', 'protein urine', 'swelling face', 'edema', 'gfr', 'bun', 'kidney failure', 'ckd', 'chronic kidney', 'nephrotic', 'nephritis', 'peshab', 'gurde', 'pathri', 'kidney pain', 'flank pain', 'ureter', 'bladder', 'prostate', 'enlarged prostate', 'bph', 'incontinence', 'bed wetting'],
    conditions: [
      { name: 'Urinary Tract Infection', probability: 'High', description: 'Bacterial infection in bladder or urethra. Burning, frequency, urgency.' },
      { name: 'Kidney Stones', probability: 'High', description: 'Hard mineral deposits causing severe flank pain. May need lithotripsy.' },
      { name: 'Chronic Kidney Disease', probability: 'Moderate', description: 'Gradual kidney function loss. Common in diabetes and hypertension patients.' },
      { name: 'Benign Prostatic Hyperplasia', probability: 'Low', description: 'Enlarged prostate causing difficulty urinating. Common in men over 50.' },
      { name: 'Nephrotic Syndrome', probability: 'Low', description: 'Kidney damage leaking protein into urine causing swelling and fatigue.' }
    ],
    specialist: 'Nephrologist / Urologist',
    urgency: 'medium',
    specialtyKey: 'kidney'
  },
  lung: {
    keywords: ['breathing', 'breath', 'lung', 'asthma', 'wheeze', 'copd', 'bronchitis', 'pneumonia', 'tb', 'tuberculosis', 'cough blood', 'chronic cough', 'chest congestion', 'oxygen', 'inhaler', 'nebulizer', 'pulmonary', 'sputum', 'phlegm', 'mucus', 'respiratory', 'lung infection', 'pleurisy', 'emphysema', 'fibrosis', 'interstitial', 'sarcoidosis', 'sleep apnea lung', 'ards', 'ventilator', 'chest x-ray', 'ct chest', 'bronchoscopy', 'spirometry', 'phephda', 'saans', 'dam ghutna'],
    conditions: [
      { name: 'Bronchial Asthma', probability: 'High', description: 'Airways narrow and swell causing wheezing, coughing, and breathlessness.' },
      { name: 'Chronic Bronchitis', probability: 'Moderate', description: 'Long-term bronchial inflammation with persistent productive cough.' },
      { name: 'Pneumonia', probability: 'Moderate', description: 'Lung infection causing fever, cough, and difficulty breathing.' },
      { name: 'COPD', probability: 'Moderate', description: 'Chronic obstructive pulmonary disease. Usually from long-term smoking.' },
      { name: 'Tuberculosis (Screening)', probability: 'Low', description: 'Bacterial lung infection. India has high TB burden. Curable with DOTS.' },
      { name: 'Pulmonary Fibrosis', probability: 'Low', description: 'Lung scarring causing progressive breathlessness. Needs specialist care.' }
    ],
    specialist: 'Pulmonologist',
    urgency: 'medium',
    specialtyKey: 'lung'
  },
  mental: {
    keywords: ['anxiety', 'depression', 'stress', 'panic', 'panic attack', 'insomnia', 'sleep problem', 'sadness', 'mood', 'bipolar', 'schizophrenia', 'ocd', 'ptsd', 'phobia', 'suicidal', 'self harm', 'mental health', 'psychiatry', 'psychology', 'counseling', 'therapy', 'emotional', 'anger', 'irritable', 'lonely', 'hopeless', 'worthless', 'eating disorder', 'anorexia', 'bulimia', 'addiction', 'alcohol', 'substance', 'withdrawal', 'tension', 'neend nahi', 'udaasi', 'chinta', 'dar', 'overthinking', 'burnout', 'trauma', 'grief', 'relationship issue'],
    conditions: [
      { name: 'Generalized Anxiety Disorder', probability: 'High', description: 'Persistent excessive worry affecting daily life. Very treatable.' },
      { name: 'Major Depressive Disorder', probability: 'High', description: 'Persistent sadness, loss of interest, fatigue. Medication + therapy effective.' },
      { name: 'Insomnia', probability: 'High', description: 'Chronic difficulty falling or staying asleep. Affects health significantly.' },
      { name: 'Panic Disorder', probability: 'Moderate', description: 'Recurrent unexpected panic attacks with physical symptoms.' },
      { name: 'OCD (Obsessive-Compulsive)', probability: 'Low', description: 'Intrusive thoughts and repetitive behaviors. CBT + medication helps.' },
      { name: 'PTSD', probability: 'Low', description: 'Post-traumatic stress after disturbing events. Specialized therapy needed.' },
      { name: 'Substance Use Disorder', probability: 'Low', description: 'Alcohol or drug dependency. De-addiction programs available.' }
    ],
    specialist: 'Psychiatrist',
    urgency: 'medium',
    specialtyKey: 'mental'
  },
  cancer: {
    keywords: ['cancer', 'tumor', 'lump', 'oncology', 'chemo', 'chemotherapy', 'radiation', 'biopsy', 'malignant', 'benign', 'metastasis', 'carcinoma', 'sarcoma', 'lymphoma', 'leukemia', 'blood cancer', 'breast cancer', 'lung cancer', 'colon cancer', 'prostate cancer', 'cervical cancer', 'oral cancer', 'stomach cancer', 'cancer screening', 'pet scan', 'staging', 'remission', 'palliative', 'hospice', 'weight loss unexplained', 'night sweats cancer', 'painless lump'],
    conditions: [
      { name: 'Cancer Screening Recommended', probability: 'Moderate', description: 'Early detection saves lives. Appropriate screening based on symptoms and age.' },
      { name: 'Benign Tumor/Cyst', probability: 'Moderate', description: 'Non-cancerous growth. Most lumps are benign but should be evaluated.' },
      { name: 'Lymphoma (Evaluation)', probability: 'Low', description: 'Cancer of lymphatic system. Painless lymph node swelling, night sweats.' },
      { name: 'Referral to Oncologist', probability: 'High', description: 'Specialist evaluation needed for proper diagnosis and staging.' }
    ],
    specialist: 'Oncologist',
    urgency: 'high',
    specialtyKey: 'cancer'
  },
  general: {
    keywords: ['fever', 'cold', 'cough', 'flu', 'weakness', 'fatigue', 'tired', 'weight', 'general', 'body pain', 'infection', 'viral', 'seasonal', 'immunity', 'vitamin', 'anemia', 'iron', 'dehydration', 'weakness', 'malaise', 'feeling unwell', 'check up', 'health checkup', 'preventive', 'tabiyat', 'bukhar', 'kamzori', 'thakan', 'badan dard', 'sick', 'unwell', 'not feeling well', 'appetite', 'swollen glands', 'lymph node', 'general physician', 'family doctor', 'routine'],
    conditions: [
      { name: 'Viral Infection', probability: 'High', description: 'Common cold, flu, or seasonal virus causing fever, body ache, and fatigue.' },
      { name: 'Iron Deficiency Anemia', probability: 'Moderate', description: 'Low hemoglobin causing weakness, pallor, breathlessness. Very common in India.' },
      { name: 'Vitamin D Deficiency', probability: 'Moderate', description: 'Causes bone pain, fatigue, mood changes. Prevalent despite sunny climate.' },
      { name: 'General Debility', probability: 'Moderate', description: 'Overall weakness and fatigue from multiple causes — needs evaluation.' },
      { name: 'Dengue / Malaria (Seasonal)', probability: 'Low', description: 'Mosquito-borne infections. High fever, body ache, low platelets.' },
      { name: 'Nutritional Deficiency', probability: 'Moderate', description: 'B12, iron, zinc, or protein deficiency — common in vegetarian diets.' }
    ],
    specialist: 'General Physician',
    urgency: 'low',
    specialtyKey: 'general'
  }
};

const URGENCY_MAP = {
  low: { label: '🟢 Low Urgency', color: 'green', advice: 'Monitor your symptoms. Book a consultation within the next few days if they persist.' },
  medium: { label: '🟡 Medium Urgency', color: 'yellow', advice: 'Schedule a doctor visit within 24–48 hours. Avoid self-medication.' },
  high: { label: '🔴 High Urgency', color: 'red', advice: 'Seek medical attention TODAY. If symptoms worsen, visit the nearest emergency.' }
};

function detectCategory(symptomText) {
  const text = symptomText.toLowerCase();
  let best = null, bestScore = 0;
  for (const [cat, info] of Object.entries(CONDITIONS)) {
    const score = info.keywords.filter(kw => text.includes(kw)).length;
    if (score > bestScore) { bestScore = score; best = { cat, ...info }; }
  }
  return bestScore > 0 ? best : { cat: 'general', ...CONDITIONS.general };
}

function analyzeSymptoms(symptomText) {
  const match = detectCategory(symptomText);
  const urgency = URGENCY_MAP[match.urgency];
  
  // Pick top conditions based on keyword relevance
  const text = symptomText.toLowerCase();
  const rankedConditions = match.conditions.map(c => {
    const nameWords = c.name.toLowerCase().split(/[\s\/\(\)]+/);
    const descWords = c.description.toLowerCase().split(/\s+/);
    const relevance = [...nameWords, ...descWords].filter(w => text.includes(w) && w.length > 3).length;
    return { ...c, relevance };
  }).sort((a, b) => b.relevance - a.relevance);

  return {
    disclaimer: '⚠️ This is AI-assisted guidance only — NOT a medical diagnosis. Always consult a licensed physician.',
    detectedCategory: match.cat,
    specialtyKey: match.specialtyKey,
    possibleConditions: rankedConditions.slice(0, 4),
    allConditions: rankedConditions,
    recommendedSpecialist: match.specialist,
    urgency: { level: match.urgency, ...urgency },
    immediateActions: getImmediateActions(match.urgency, match.cat),
    followUp: `We recommend consulting a ${match.specialist} as soon as possible.`,
    relatedSpecialties: getRelatedSpecialties(match.cat)
  };
}

function getRelatedSpecialties(cat) {
  const map = {
    eye: ['General Physician', 'Endocrinologist (if diabetic)'],
    heart: ['General Physician', 'Pulmonologist'],
    skin: ['Allergist', 'General Physician'],
    brain: ['Orthopedist (for cervical)', 'Psychiatrist (for anxiety)'],
    bone: ['Physiotherapist', 'Rheumatologist'],
    stomach: ['General Surgeon', 'Hepatologist'],
    diabetes: ['Cardiologist', 'Ophthalmologist (screening)'],
    child: ['Pediatric Surgeon', 'Child Psychologist'],
    female: ['Endocrinologist', 'Fertility Specialist'],
    ent: ['Allergist', 'Sleep Specialist'],
    dental: ['Oral Surgeon', 'Orthodontist'],
    kidney: ['Urologist', 'Endocrinologist'],
    lung: ['Allergist', 'Thoracic Surgeon'],
    mental: ['Psychologist', 'Neurologist'],
    cancer: ['Surgical Oncologist', 'Radiation Oncologist'],
    general: ['Pulmonologist', 'Hematologist']
  };
  return map[cat] || [];
}

function getImmediateActions(urgency, cat) {
  const base = ['Stay hydrated — drink plenty of water', 'Rest adequately — avoid overexertion', 'Avoid self-medication without professional advice'];
  const extras = {
    heart: ['Avoid strenuous physical activity', 'Monitor blood pressure if possible', 'Call 108/112 emergency if pain radiates to arm/jaw/back', 'Take a low-dose aspirin ONLY if advised by a doctor'],
    eye: ['Avoid rubbing your eyes', 'Reduce screen time to under 2 hours', 'Use lubricating eye drops if available', 'Wear sunglasses outdoors'],
    brain: ['Rest in a quiet, dark room', 'Avoid bright screens and loud noises', 'Note the frequency and duration of symptoms', 'Apply a cold compress for headaches'],
    bone: ['Apply ice pack for 15-20 minutes every few hours', 'Avoid lifting heavy objects', 'Use supportive footwear', 'Gentle stretching if not in severe pain'],
    stomach: ['Eat small, frequent meals', 'Avoid spicy, oily, and acidic food', 'Take ORS if you have diarrhea', 'Elevate your head while sleeping for acid reflux'],
    skin: ['Avoid scratching affected areas', 'Keep skin moisturized with fragrance-free lotion', 'Wear loose, cotton clothing', 'Avoid known allergens'],
    diabetes: ['Monitor blood sugar if you have a glucometer', 'Avoid sugary foods and drinks', 'Walk for 15-20 minutes after meals', 'Take prescribed medications on time'],
    child: ['Monitor temperature every 2 hours', 'Give ORS for vomiting/diarrhea', 'Ensure adequate fluids', 'Do NOT give adult medications to children'],
    female: ['Track your symptoms and cycle dates', 'Use a warm compress for cramps', 'Avoid heavy lifting if in pain', 'Take folic acid if planning pregnancy'],
    lung: ['Sit upright to ease breathing', 'Use prescribed inhaler if available', 'Avoid dust, smoke, and pollutants', 'Practice pursed lip breathing'],
    mental: ['Practice deep breathing exercises', 'Reach out to a trusted person', 'Avoid alcohol and stimulants', 'Maintain a regular sleep schedule', 'Crisis helpline: iCall 9152987821']
  };
  const emergencyAdds = urgency === 'high' ? ['🚨 Seek emergency care if symptoms intensify', 'Do NOT drive yourself to the hospital — have someone accompany you', 'Call 108 (Ambulance) or 112 (Emergency)'] : [];
  return [...base, ...(extras[cat] || []), ...emergencyAdds];
}

function analyzeReport(reportType, keyValues) {
  const analyses = {
    blood: analyzeBloodReport(keyValues),
    eye: analyzeEyeReport(keyValues),
    mri: { summary: 'MRI report detected. Key structural findings should be evaluated by a radiologist and treating specialist.', findings: ['Requires radiologist interpretation', 'AI has extracted key markers for your reference', 'Share this with your doctor for clinical correlation'], severity: 'needs_attention' },
    general: { summary: 'Report analyzed. Some values may need clinical attention.', findings: ['Please compare highlighted values with normal ranges indicated', 'Consult your doctor for proper clinical correlation', 'Regular monitoring recommended'], severity: 'normal' }
  };
  return analyses[reportType] || analyses.general;
}

function analyzeBloodReport(values) {
  const findings = [];
  let severity = 'normal';
  if (values.hemoglobin && (parseFloat(values.hemoglobin) < 12)) { findings.push('⚠️ Hemoglobin is below normal (12-16 g/dL) — possible anemia. Iron and B12 supplementation may help.'); severity = 'needs_attention'; }
  if (values.glucose && parseFloat(values.glucose) > 126) { findings.push('⚠️ Fasting glucose is elevated (>126 mg/dL) — diabetes screening recommended. Get HbA1c tested.'); severity = 'needs_attention'; }
  if (values.glucose && parseFloat(values.glucose) > 200) { severity = 'critical'; findings.push('🔴 Glucose critically high. Immediate endocrinology consultation required.'); }
  if (values.cholesterol && parseFloat(values.cholesterol) > 200) { findings.push('⚠️ Total cholesterol is borderline high (>200 mg/dL). Dietary changes and possible statin therapy.'); severity = 'needs_attention'; }
  if (findings.length === 0) findings.push('✅ All checked values appear within normal reference ranges');
  return { summary: 'Complete Blood Report analysis. Key metabolic markers reviewed against standard ranges.', findings, severity };
}

function analyzeEyeReport(values) {
  const findings = [];
  let severity = 'normal';
  if (values.iop && parseFloat(values.iop) > 21) { findings.push('⚠️ Intraocular Pressure (IOP) is above 21 mmHg. This may indicate glaucoma risk. Request a visual field test and OCT.'); severity = 'needs_attention'; }
  if (values.vision && values.vision.includes('6/')) {
    const parts = values.vision.split('/'); if (parseInt(parts[1]) > 12) { findings.push('⚠️ Visual acuity is reduced (worse than 6/12). Refraction check and updated prescription needed.'); severity = 'needs_attention'; }
  }
  if (findings.length === 0) findings.push('✅ Eye parameters appear within normal limits');
  return { summary: 'Ophthalmic report analysis complete. IOP and visual acuity reviewed.', findings, severity };
}

function chatResponse(message, history = []) {
  const text = (message || '').toLowerCase();
  
  // Greetings
  if (text.match(/^(hello|hi|hey|namaste|namaskar|good morning|good evening)/)) {
    return { reply: 'Hello! 👋 I\'m your AI Health Guide. I can help you:\n\n• Understand symptoms\n• Explain medical reports\n• Find the right specialist\n• Compare Govt vs Private hospitals\n• Answer health questions\n\nWhat would you like to know?' };
  }
  
  // Emergency
  if (text.match(/chest pain|heart attack|stroke|seizure|unconscious|not breathing|severe bleeding|head injury|poisoning|overdose/)) {
    return { reply: '🚨 **EMERGENCY DETECTED**\n\nIf this is a real emergency:\n• Call **108** (Ambulance) or **112** (Emergency)\n• Go to the nearest hospital IMMEDIATELY\n• Do not drive yourself\n• If someone is unconscious, check breathing and start CPR if trained\n\nEvery second matters in cardiac and neurological emergencies.', urgent: true };
  }
  
  // Symptoms
  if (text.match(/symptom|feeling|pain|ache|hurt|problem|issue/)) {
    return { reply: 'I can help analyze your symptoms! Please use our **Symptom Checker** on the home page for a detailed AI analysis. It will:\n\n1. Identify possible conditions\n2. Rate urgency level\n3. Recommend the right specialist\n4. Suggest top Government & Private hospitals\n\nJust describe your symptoms in detail for the most accurate results.' };
  }
  
  // Reports
  if (text.match(/report|upload|lab|test result|blood test|x-ray|mri|scan|ct scan/)) {
    return { reply: '📄 You can upload your medical reports using the **Report Analysis** section. We support:\n\n• Blood reports (CBC, sugar, lipid profile)\n• Eye reports (IOP, vision)\n• MRI/CT scans\n• General lab reports\n\nOur AI will extract key values, compare them to normal ranges, and explain findings in simple language!' };
  }
  
  // Doctors
  if (text.match(/doctor|specialist|suggest doctor|find doctor|best doctor|recommendation/)) {
    return { reply: '👨‍⚕️ I can help you find the right specialist! Our database includes:\n\n• **100+ verified doctors** across 15+ specialties\n• Government & Private hospital doctors\n• Ratings, fees, and experience information\n\nUse the **Find Doctors** page to search and filter, or use the **Symptom Checker** to get AI-matched recommendations!' };
  }
  
  // Cost
  if (text.match(/cost|price|fee|expense|afford|budget|charge|kitna paisa|kharcha/)) {
    return { reply: '💰 Here\'s a general cost guide:\n\n**Government Hospitals:**\n• OPD: ₹10–₹50 (often free)\n• Surgery: ₹5,000–₹50,000\n• Ayushman Bharat: FREE up to ₹5 lakh/year\n\n**Private Hospitals:**\n• Consultation: ₹500–₹2,000+\n• Surgery: ₹50,000–₹10,00,000+\n\nUse our **Govt vs Private Comparison** tool for condition-specific cost breakdowns!' };
  }
  
  // Ayushman
  if (text.match(/ayushman|pmjay|pm-jay|free treatment|government scheme|sarkari|free hospital/)) {
    return { reply: '🏛️ **Ayushman Bharat (PM-JAY)** Details:\n\n• Provides **FREE** health coverage up to **₹5 lakh per family per year**\n• Covers 1,393 procedures including surgeries, diagnostics, medicines\n• Valid at all empaneled government & select private hospitals\n• **Eligibility**: Based on SECC 2011 data\n• **How to check**: Visit pmjay.gov.in or call 14555\n\nMany hospitals on our platform accept Ayushman cards. Look for the 🟢 Ayushman badge!' };
  }
  
  // Insurance
  if (text.match(/insurance|claim|cashless|tpa|mediclaim|health insurance/)) {
    return { reply: '🛡️ **Health Insurance Tips:**\n\n• Most private hospitals offer **cashless treatment** with major insurers\n• Always carry your insurance card during hospital visits\n• Pre-authorization is needed for planned surgeries\n• Government hospitals generally don\'t need insurance (treatment is very low cost)\n• Our doctor profiles show insurance acceptance status\n\nCheck the hospital detail page for specific insurance partnerships.' };
  }
  
  // Fever
  if (text.match(/fever|bukhar|temperature|hot body/)) {
    return { reply: '🌡️ **Fever Management:**\n\nAdults: Concerning if above 103°F (39.4°C)\nChildren: Seek help if above 100.4°F (38°C) in infants\n\n**What to do:**\n• Stay hydrated (water, ORS, coconut water)\n• Take Paracetamol (NOT aspirin for children)\n• Rest and wear light clothing\n• Sponge with lukewarm water\n\n**See a doctor if:**\n• Fever lasts >3 days\n• Accompanied by rash, severe headache, or stiff neck\n• In infants under 3 months' };
  }
  
  // Default
  const analysis = detectCategory(text);
  if (analysis && analysis.cat !== 'general') {
    return { reply: `Based on your message, this seems related to **${analysis.specialist}** care. I'd recommend:\n\n1. Use our **Symptom Checker** for a detailed analysis\n2. Browse **${analysis.specialist}** specialists in the Find Doctors section\n3. Compare Government vs Private hospital options\n\nWould you like to know more about ${analysis.conditions[0]?.name || 'this condition'}?` };
  }
  
  return { reply: `I understand you're asking about: "${message}"\n\nHere's how I can help:\n• **Symptom Checker** — Describe your symptoms for AI analysis\n• **Report Analyzer** — Upload medical reports for interpretation\n• **Find Doctors** — Browse 100+ verified specialists\n• **Compare Hospitals** — Govt vs Private cost comparison\n\nCan I help you with any of these?` };
}

module.exports = { analyzeSymptoms, analyzeReport, chatResponse, detectCategory };
