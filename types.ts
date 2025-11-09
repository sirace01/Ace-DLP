
export interface LessonPlan {
  school: string;
  gradeLevel: string;
  nameOfTeacher: string;
  learningArea: string;
  teachingDatesAndTime: string;
  quarter: string;
  curriculumContent: {
    contentStandard: string;
    performanceStandards: string;
    learningCompetency: string;
    learningObjectives: {
      cognitive: string;
      psychomotor: string;
      affective: string;
    };
    idfFeatures: string[]; // Instructional Design Framework features
  };
  twentyFirstCenturySkills: string[];
  content: string; // User input lesson title
  integration: {
    references: string[];
    otherLearningResources: string[];
  };
  teachingAndLearningProcedures: {
    activatingPriorKnowledge: string;
    lessonPurposeIntention: string;
    lessonLanguagePractice: string;
    readingKeyIdeaStem: string;
    developingUnderstanding: string;
    deepeningUnderstanding: string;
    makingGeneralizationsAbstractions: string;
  };
  evaluatingLearning: string;
  additionalActivities: string;
  remarks: string;
  reflection: {
    understandThat: string;
    realizeThat: string;
    needToLearnMoreAbout: string;
  };
  submittedBy: string;
  checkedBy: string;
  notedBy: string;
}

export interface CurriculumGoal {
  learningArea: string;
  goal: string;
}

export interface SkillDefinition {
  skill: string;
  description: string;
  examples: string[];
}

export interface IDFComponent {
  name: string;
  description: string;
}

export interface PedagogicalApproach {
  learningArea: string;
  approaches: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'gemini';
  loading?: boolean;
}

export interface GeminiImageData {
  prompt: string;
  imageUrl: string;
}

export interface DisplayItem {
  name: string;
  description?: string;
}
