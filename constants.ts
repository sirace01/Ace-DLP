
import { CurriculumGoal, IDFComponent, PedagogicalApproach, SkillDefinition } from './types';

export const MATATAG_CURRICULUM_GOALS: CurriculumGoal[] = [
  {
    learningArea: 'Kindergarten',
    goal: 'The redesigned Kindergarten curriculum aims to produce active young Filipino learners who are holistically developed and equipped with 21st century skills.',
  },
  {
    learningArea: 'Filipino',
    goal: "Tunguhin ng Filipino na malinang sa mga mag-aaral ang kasanayan sa literasi, kakayahang komunikatibo, mapanuring pag-unawa sa iba't ibang uri ng teksto, at pagbuo ng multimodal na may lubos na pagpapahalaga sa wikang Filipino at ibang wika sa bansa, kultura, at mga teksto o mga babasahin na magiging daan sa kanyang pagkatuto at paglinang ng ika-21 siglong kasanayan para sa kapaki-pakinabang na pagganap bilang makabansa at global na mamamayan.",
  },
  {
    learningArea: 'English',
    goal: 'Learners demonstrate proficiency in using English in multiple modes to communicate effectively in a wide range of situations, with diverse audiences, and in various contexts. They use their language skills to facilitate and enhance learning across different content areas. They critically analyze, appreciate, and respond to a wide array of literary and informational texts, utilizing these resources to broaden their understanding, perspectives, and creativity. Learners also actively engage in activities and discussions that encourage a deep appreciation and understanding of their cultural heritage, instilling a sense of pride and identity that fosters cultural literacy and promote mutual respect and understanding in diverse social and educational environments.',
  },
  {
    learningArea: 'Language',
    goal: 'Learners demonstrate oracy in L1; use oral and visual language in interacting with others, developing and expressing ideas; engage with and respond to various texts based on real-life experiences; use high frequency and content-specific words; and understand how languages and culture are related.',
  },
  {
    learningArea: 'Reading and Literacy',
    goal: 'Learners demonstrate basic literacy in their first language; decode high frequency and basic content-specific words to develop language for learning; understand how words are used in simple sentences to get and express meaning; and comprehend, respond to, and create narrative and informational texts based on real-life experiences.',
  },
  {
    learningArea: 'Good Manners and Right Conduct (GMRC)/Values Education (VE)',
    goal: 'The Good Manners and Right Conduct/Values Education subject aims to produce Filipino youth who decide with responsibility and accountability, act with right conduct and the inclination to do good, and live their daily lives with love for God, people, environment, country, and the world, habitually mindful of the common good.',
  },
  {
    learningArea: 'Mathematics',
    goal: 'The main goal of the curriculum is for Filipino learners to become mathematically proficient and critical problem solvers. The curriculum intends to develop among the learners the proficiency in solving mathematical problems critically, grounded on a strong conceptual knowledge, strategic use of mathematical skills and processes, desirable values and a proper disposition in mathematics, thus enabling them to become productive and successful 21st century citizens.',
  },
  {
    learningArea: 'Science',
    goal: 'The overall goal of the Science Curriculum is the achievement of scientific, environmental and technology and engineering literacy of all learners. On achieving the outcomes of the curriculum, learners will be ready to actively participate in local, national, and global contexts and make meaningful contributions to a dynamic and culturally diverse and expanding world. By successfully completing the Science Curriculum, Filipino learners will demonstrate capabilities as put forth in the Basic Education Development Plan (BEDP) 2030.',
  },
  {
    learningArea: 'Araling Panlipunan',
    goal: 'Araling Panlipunan is a distinct learning area in the K to 12 Curriculum which intends to develop among Filipino learners the socio-civic competencies i.e. cultural tolerance, respect for diversity, upholding human dignity and rights among others which are significant in developing patriotic, nationalistic, and global-oriented Filipinos who are capable and committed in serving the nation. It likewise seeks to engender among Filipino learners critical understanding on historical, geographical, socio-political, and economic issues of the Philippines, taking into account the international and global contexts, allowing them to become productive citizens of the country and of the world.',
  },
  {
    learningArea: 'Makabansa',
    goal: 'Ang Makabansa ay isang transdisiplinaryong kurikulum na naglalayong makahubog ng isang aktibong mag-aaral sa pamamagitan ng paglinang ng mahahalagang kasanayang hango sa Malalim na Kaisipan (Big Ideas) ng Sibika, Sining at Kultura, Kasaysayan, at Kagalingang Pangkalusugan na nagpapamalas ng pagkakakilanlan, pagkamalikhain, pagkamalusog at pakikipag-ugnayan sa kapwa at sa iba pang aspekto ng lipunan tungo sa pagiging holistikong Pilipinong taglay ang ika-21 siglong kasanayan.',
  },
  {
    learningArea: 'Edukasyong Pantahanan at Pangkabuhayan (EPP)/Technology and Livelihood Education (TLE)',
    goal: 'The rationalized EPP/TLE/TVL envisions learners to apply life skills that are adaptable in their family/community, become ready for the world of work, engage in entrepreneurial activities and improve their livelihood, generate a business relative to their chosen field of specialization, and further explore higher education.',
  },
  {
    learningArea: 'Music, Arts, Physical Education and Health (MAPEH)',
    goal: 'The recalibrated Music and Arts Education curriculum aims to develop the learners\' multicultural literacy, artistic and creative expression, and holistic national identity as Filipinos through engaging in, creating, and producing different art forms and creative and innovative expressions. The recalibrated Physical Education and Health curriculum is geared towards the development and attainment of physical and health literacy as well as 21st century skills that contribute to the well-being of the individual, family, and community, improve the quality of life in society, and motivate the learners to take responsibility for their lifelong holistic health and well-being in a varied and rapidly changing society.',
  },
];

export const TWENTY_FIRST_CENTURY_SKILLS: SkillDefinition[] = [
  {
    skill: 'Visual Literacy',
    description: 'Ability to examine, interpret, and communicate understanding of diverse visual texts.',
    examples: [
      'Recognize meanings in pictures and symbols',
      'Describe physical features of a location (e.g., terrain, biomes)',
      'Interpret traffic signs for road safety',
      'Explain processes from infographics',
    ],
  },
  {
    skill: 'Information Literacy',
    description: 'Integrated abilities encompassing the inquisitive, analytical, and reflective process of acquiring, organizing, evaluating, sharing, and producing information.',
    examples: [
      'Identify realities and make-beliefs in narratives',
      'Gather relevant information from valid sources',
      'Differentiate facts and opinion in reports',
      'Evaluate the accuracy of sources and information',
    ],
  },
  {
    skill: 'Media Literacy',
    description: 'Understanding various media contents and their uses, accessing information efficiently and effectively, and using a broad range of media to express ideas.',
    examples: [
      'Explain the topic through effective multimedia presentation',
      'Recognize the issues and laws related to media and information (e.g., copyright)',
      'Examine data presented in weather reports',
      'Compare and contrast ways in which media cover the same event',
    ],
  },
  {
    skill: 'Technology Literacy',
    description: 'Effective incorporation of information, communication, and their applications through technology.',
    examples: [
      'Use audiobooks in listening to stories',
      'Annotate key details and information in e-books',
      'Perform numerical data computations using calculators',
      'Set-up an audio-visual presentation during classroom discussions',
    ],
  },
  {
    skill: 'Digital Literacy',
    description: 'Ability to define, access, manage, integrate, communicate, evaluate, and create information safely and appropriately through a wide range of digital technologies.',
    examples: [
      'Identify and use appropriate digital applications for collaborative online activities',
      'Explain issues pertaining to information privacy and data protection',
      'Use online forum, chat room, or email following protocols',
      'Practice netiquette in online tasks',
    ],
  },
  {
    skill: 'Creativity',
    description: 'Ability to think and work creatively and innovatively using a variety of techniques or methods.',
    examples: [
      'Create new and worthwhile ideas',
      'Elaborate, refine, analyze, and evaluate their own ideas',
      'Demonstrate originality and inventiveness',
      'Provide best alternatives or options if familiar/common solutions no longer work',
    ],
  },
  {
    skill: 'Openness',
    description: 'Willingness to engage in new ideas, situations, and experiences.',
    examples: [
      'Identify new connections between different concepts and ideas',
      'Examine things from others\' perspectives',
      'Approach new things with curiosity',
      'Change position/decision/action in light of new information',
    ],
  },
  {
    skill: 'Critical Thinking',
    description: 'Ability to analyze evidence, patterns, relationships, making inferences using reasoning, judging, evaluating, and making decisions or solving problems.',
    examples: [
      'Establish/detect patterns, connections, and relationships among given variables',
      'Analyze and interpret data and information gathered from relevant and credible sources',
      'Synthesize voluminous data and information',
      'Develop criteria to judge the veracity/accuracy of a given claim',
    ],
  },
  {
    skill: 'Problem Solving',
    description: 'Ability to engage in cognitive processing to understand and resolve problem situations where a method of solution is not immediately obvious.',
    examples: [
      'Recognize existing problems, impending threats, and future difficulties',
      'Provide logical explanations on a given problem or difficulty',
      'Formulate relevant recommendations, solutions, and alternatives',
      'Solve different kinds of non-familiar problems in both conventional and innovative ways',
    ],
  },
  {
    skill: 'Reflective Thinking',
    description: 'Ability to reflect critically on one\'s experiences, decisions, and processes to create meaning and justify actions.',
    examples: [
      'Take time to review their own behavior to think about failures and successes',
      'Think of the past as opposed to their plans',
      'Examine the broader context of things',
      'Temper radical and risky ideas',
    ],
  },
  {
    skill: 'Teamwork',
    description: 'Working with others to attain common goals under the direction or instruction of a leader.',
    examples: [
      'Take actions based on the leader\'s instructions',
      'Recognize other members\' participation and contributions',
      'Perform well-defined role/task toward the attainment of a shared goal',
    ],
  },
  {
    skill: 'Collaboration',
    description: 'Capacity of an individual to effectively participate in interactions between at least two co-equal parties voluntarily engaged in shared decision-making.',
    examples: [
      'Share information/resources with other members',
      'Perform tasks requiring interdependence and role flexibility',
      'Negotiate with other members for roles or consideration of ideas/proposals',
    ],
  },
  {
    skill: 'Interpersonal Skills',
    description: 'Ability to communicate and read emotion, motivation, and behaviors in a social context.',
    examples: [
      'Approach other learners to start or join in a conversation',
      'Ask specific information and make follow-up comments',
      'Introduce additional information or related topics',
    ],
  },
  {
    skill: 'Intrapersonal Skills',
    description: 'Internal dialogue one has with himself or herself to manage emotions effectively, set goals, self-motivate.',
    examples: [
      'Think of possible consequences of a behavior before acting it out',
      'Examine their own behaviors and how these affect them',
      'Plan how to address behaviors that usually produce unsatisfying consequences',
    ],
  },
  {
    skill: 'Interactive Communication',
    description: 'Focuses on building oracy skills including listening and speaking, and diverse communication methods.',
    examples: [
      'Ask for or provide information of interest to other learners',
      'Actively engage in a discourse expressing feelings, insights, opinions',
      'Use digital technologies and applications to extend communication',
    ],
  },
  {
    skill: 'Non-Verbal Communication',
    description: 'Includes facial expressions, gestures displayed through body language (kinesics) and physical distance (proxemics).',
    examples: [
      'Recognize and respond to eye and hand movements, facial expressions',
      'Utilize body language (kinesics) and touch (haptics)',
      'Use cool colors to project an image of friendliness or poise',
    ],
  },
  {
    skill: 'Communicating in Diverse Environments',
    description: 'Ensures individuals from varied backgrounds share strong rapport and do not face problems working together.',
    examples: [
      'Use simple words and sentences when talking to children',
      'Use appropriate language register depending on the context',
      'Employ gender-sensitive words in conversations and discourses',
    ],
  },
  {
    skill: 'Informed Decision-Making',
    description: 'Ability to make decisions based on facts or information focusing on the risks and benefits involved.',
    examples: [
      'Research relevant data to make decisions for class projects',
      'Ask for expert opinions and interviews',
      'Conduct cost-benefit analysis',
    ],
  },
  {
    skill: 'Adaptive Leadership',
    description: 'Ability to organize people proactively where they are motivated to achieve tasks effectively.',
    examples: [
      'Make opportunities to develop the talents of others',
      'Set good examples for classmates and peers',
      'Help classmates review for paper and pen tests and performance tasks',
    ],
  },
  {
    skill: 'Intercultural Understanding',
    description: 'Involves learners seeking their own culture to understand local and global issues, and engaging in diverse cultures and identities.',
    examples: [
      'Participate in cultural activities in school',
      'Listen to the opinions of people from other cultures',
      'Respect religious beliefs and traditions',
    ],
  },
  {
    skill: 'Self-Discipline',
    description: 'Ability to set goals with tangible and intangible success criteria, managing workload efficiently by controlling impulses.',
    examples: [
      'Choose to eat healthy food',
      'Organize their time to exercise punctuality',
      'Set academic goals and persevere',
      'Work on their assignments diligently',
    ],
  },
  {
    skill: 'Future Orientation',
    description: 'Ability to consider future developments and consequences when thinking, making decisions, and acting, directed towards a more sustainable future.',
    examples: [
      'Join tree-planting activities',
      'Consider the possible consequences before clicking in an online platform',
      'Participate in student elections',
    ],
  },
  {
    skill: 'Resilience and Adversity Management',
    description: 'Process of constructively moving forward or advancing despite adversity or challenges that are not within one\'s control.',
    examples: [
      'Go to school despite difficulties',
      'Exhibit honesty especially with teachers when they do not understand instructions',
      'Find ways to complete assignments in spite of possible power failure',
    ],
  },
];

export const IDF_INSTRUCTIONAL_PRINCIPLES: IDFComponent[] = [
  { name: 'Inclusive', description: 'Emphasizes creating accessible and meaningful learning experiences for all learners, regardless of their backgrounds or abilities. It entails developing culturally responsive materials, providing various modalities for content access, accommodating learners with special needs, and adjusting the learning environment to allow multiple learning pathways.' },
  { name: 'Ideational', description: 'Involves fostering a creative thought process and idea generation without judgment or criticism. It aims to expose learners to a variety of potential solutions and discover unexpected idea connections.' },
  { name: 'Integrative', description: 'Involves combining different elements into a unified whole, building on learners’ prior knowledge, utilizing real-life situations, and encouraging connections between different concepts and ideas. This principle aids learners in relating the content to their lives and deepening their topic understanding.' },
  { name: 'Innovative', description: 'Explores creative ways of designing and delivering instruction. It includes the use of emerging technologies, varied teaching methods, and innovative assessment strategies to ensure a motivating and engaging learning experience for learners.' },
];

export const IDF_KEY_ASPECTS: IDFComponent[] = [
  { name: 'Context', description: 'Refers to the background or setting that impacts how learners understand information. By relating teaching materials to learners’ daily life experiences, context enhances learners’ motivation to participate actively in learning activities.' },
  { name: 'Connection', description: 'Involves fostering understanding and the development of transferable knowledge. It aims for students to build robust, flexible knowledge that can be applied to new problems and contexts.' },
  { name: 'Collaboration', description: 'Is the cooperative process where students work together to achieve a common goal. It recognizes students’ individual skills and holds them equally accountable for outcomes or knowledge sharing, preparing them for lifelong interaction with others.' },
  { name: 'Creativity', description: 'Encourages learners to use their imagination and critical thinking to create meaningful expressions of their learning. It promotes the generation of new ideas and the transformation of existing solutions into more innovative and sustainable ones.' },
];

export const IDF_ESSENTIAL_FACETS: IDFComponent[] = [
  { name: 'Engage', description: 'Aims to capture learners’ attention and stimulate interest by using various strategies and techniques that promote active participation. By creating an emotional connection, it enhances learners’ motivation and willingness to learn.' },
  { name: 'Explore', description: 'Encourages learners to independently discover new concepts and ideas. It includes opportunities for learners to experiment, solve problems, or pose questions, fostering active learning and problem-solving skills.' },
  { name: 'Experience', description: 'Allows learners to apply their acquired knowledge, skills, abilities, and attitudes in real-world contexts. Simulations, case studies, and other practical activities facilitate the transfer of learning to real-life situations.' },
  { name: 'Empathize', description: 'Encourages learners to understand and connect with the material they are learning, and to identify their own needs. This component supports socio-emotional learning and helps learners form bonds, improve communication, and resolve conflicts.' },
];

export const PEDAGOGICAL_APPROACHES: PedagogicalApproach[] = [
  { learningArea: 'Kindergarten', approaches: ['Constructivist', 'Integrative', 'Thematic', 'Collaborative', 'Reflective', 'Play-based Approach'] },
  { learningArea: 'Filipino', approaches: ['Cooperative Learning', 'Discovery Learning', 'Hierarchical Learning', 'Interactive/Integrated Learning'] },
  { learningArea: 'English', approaches: ['Integration', 'Learner-centeredness', 'Contextualization', 'Construction/Constructivist'] },
  { learningArea: 'Reading and Literacy', approaches: ['Shared Reading', 'Guided Reading', 'Phonics', 'Vocabulary Building', 'Comprehension Strategies', 'Interactive Read-Aloud activities'] },
  { learningArea: 'Language', approaches: ['Oral proficiency in the student\'s first language (L1) through play activities or socialization, idea exchange, and phonemic awareness; organized discourses and verbal performances'] },
  { learningArea: 'Good Manners and Right Conduct (GMRC)/Values Education (VE)', approaches: ['Ethical Decision Making', 'Social and Emotional Learning', 'Career Guidance', 'Virtue Ethics Theory', 'Value Ethics Theory', 'Interactive', 'Experiential', 'Constructivism', 'Career Development Theory'] },
  { learningArea: 'Mathematics', approaches: ['Discovery and Inquiry-based Learning', 'Experiential and Situated Learning', 'Reflective Learning', 'Cooperative Learning', 'Constructivism'] },
  { learningArea: 'Science', approaches: ['Inquiry-based Approach', 'Problem-based Learning', 'Science-Technology-Society Approach / Contextual Learning', 'Multi/Interdisciplinary Approach', 'Constructivism', 'Social Cognition Learning', 'Learning Style/Differentiated Instruction', 'Brain-based Learning'] },
  { learningArea: 'Araling Panlipunan', approaches: ['Thematic-Chronological Approach', 'Integrative', 'Conceptual', 'Research-based Approach', 'Interdisciplinary and Multidisciplinary Approach'] },
  { learningArea: 'Makabansa', approaches: ['Thematic-Chronological Approach', 'Integrative', 'Conceptual', 'Research-based Approach', 'Interdisciplinary and Multidisciplinary Approach'] },
  { learningArea: 'Edukasyong Pantahanan at Pangkabuhayan (EPP)/Technology and Livelihood Education (TLE)', approaches: ['Entrepreneurial Learning', 'Authentic Learning', 'Constructivism', 'Contextualization', 'Integrative', 'Experiential Learning'] },
  { learningArea: 'Music, Arts, Physical Education and Health (MAPEH)', approaches: ['Music: Multicultural, Integrative', 'Arts: Child-centered, Hands-on', 'PE: Activity-based, Developmentally Appropriate, Standard-based, Integrative, Inclusive', 'Health: Culture-responsive, Epidemiological, Health and Life-skills based, Holistic, Learner-centered, Preventive, Rights-based, Standards and Outcomes-based, Values-based'] },
];

export const LESSON_PLAN_TEMPLATE_DETAILS = {
  submittedBy: "CERILLE JOSEPH M. REYES\nMaster Teacher I",
  checkedBy: "MELANI R. SANTOS\nHead Teacher VI",
  notedBy: "JOSEHPINE M. MANIGAS, PhD\nPrincipal IV"
};

// Generic prompts for Gemini to get started, can be refined.
export const SYSTEM_INSTRUCTION_BASE = `You are an expert educational curriculum developer for the Philippine Department of Education (DepEd), specifically for the MATATAG K to 10 Curriculum. 
Your task is to generate content for a Weekly Lesson Log. The lesson must be student-centered, incorporate numeracy where possible, and align with the MATATAG curriculum goals, 21st Century Skills, Instructional Design Framework (IDF) features, and pedagogical approaches.
Utilize the provided context about the MATATAG curriculum to inform your responses.
When generating content, always prioritize clarity, educational relevance, and a focus on measurable student outcomes.`;

export const getIDFContext = (selectedIDFNames: string[]) => {
  const allIDFComponents = [
    ...IDF_INSTRUCTIONAL_PRINCIPLES,
    ...IDF_KEY_ASPECTS,
    ...IDF_ESSENTIAL_FACETS,
  ];
  const selectedContext = allIDFComponents
    .filter((idf) => selectedIDFNames.includes(idf.name))
    .map((idf) => `- ${idf.name}: ${idf.description}`)
    .join('\n');

  return selectedContext ? `\n\nSelected Instructional Design Framework (IDF) Features:\n${selectedContext}` : '';
};

export const get21stCenturySkillsContext = (selectedSkills: string[]) => {
  const filteredSkills = TWENTY_FIRST_CENTURY_SKILLS.filter(s => selectedSkills.includes(s.skill));
  if (filteredSkills.length === 0) return '';
  return `\n\nRelevant 21st Century Skills:\n${filteredSkills.map(s => `- ${s.skill}: ${s.description}`).join('\n')}`;
};

export const getPedagogicalApproachesContext = (learningArea: string) => {
  const approaches = PEDAGOGICAL_APPROACHES.find(pa => pa.learningArea === learningArea);
  if (!approaches) return '';
  return `\n\nRecommended Pedagogical Approaches for ${learningArea}:\n${approaches.approaches.map(a => `- ${a}`).join('\n')}`;
};

export const getCurriculumGoalContext = (learningArea: string) => {
  const goal = MATATAG_CURRICULUM_GOALS.find(cg => cg.learningArea === learningArea);
  return goal ? `\n\nCurriculum Goal for ${learningArea}:\n${goal.goal}` : '';
};

export const initialLessonPlan = {
  school: 'RAMON MAGSAYSAY (CUBAO) HIGH SCHOOL',
  gradeLevel: 'Grade 7',
  nameOfTeacher: 'Juan Dela Cruz',
  learningArea: 'Mathematics',
  teachingDatesAndTime: 'August 1-5, 2024',
  quarter: 'Quarter 1',
  curriculumContent: {
    contentStandard: '',
    performanceStandards: '',
    learningCompetency: '',
    learningObjectives: {
      cognitive: '',
      psychomotor: '',
      affective: '',
    },
    idfFeatures: [],
  },
  twentyFirstCenturySkills: [],
  content: '',
  integration: {
    references: [],
    otherLearningResources: [],
  },
  teachingAndLearningProcedures: {
    activatingPriorKnowledge: '',
    lessonPurposeIntention: '',
    lessonLanguagePractice: '',
    readingKeyIdeaStem: '',
    developingUnderstanding: '',
    deepeningUnderstanding: '',
    makingGeneralizationsAbstractions: '',
  },
  evaluatingLearning: '',
  additionalActivities: '',
  remarks: '',
  reflection: {
    understandThat: '',
    realizeThat: '',
    needToLearnMoreAbout: '',
  },
  submittedBy: LESSON_PLAN_TEMPLATE_DETAILS.submittedBy,
  checkedBy: LESSON_PLAN_TEMPLATE_DETAILS.checkedBy,
  notedBy: LESSON_PLAN_TEMPLATE_DETAILS.notedBy,
};
