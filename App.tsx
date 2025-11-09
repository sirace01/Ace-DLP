
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { LessonPlan, IDFComponent, SkillDefinition, DisplayItem } from './types'; // Corrected import source for interfaces
// Corrected typo: IDF_INSTRUCTIONAL_PRINCIPES -> IDF_INSTRUCTIONAL_PRINCIPLES
import { IDF_INSTRUCTIONAL_PRINCIPLES, IDF_KEY_ASPECTS, IDF_ESSENTIAL_FACETS, TWENTY_FIRST_CENTURY_SKILLS, initialLessonPlan, SYSTEM_INSTRUCTION_BASE, getIDFContext, get21stCenturySkillsContext, getPedagogicalApproachesContext, getCurriculumGoalContext } from './constants';
import { generateContentPro, generateImage, extractTextFromPdf } from './services/geminiService';
import LessonPlanSection from './components/LessonPlanSection';
import LoadingSpinner from './components/LoadingSpinner';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(initialLessonPlan);
  const [lessonTitle, setLessonTitle] = useState<string>('');
  const [learningArea, setLearningArea] = useState<string>('Mathematics'); // Default or user can select
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [pdfTextContent, setPdfTextContent] = useState<string | null>(null);
  const [isPdfProcessing, setIsPdfProcessing] = useState<boolean>(false);

  // API Key State for client-side
  const [userApiKey, setUserApiKey] = useState<string>(() => localStorage.getItem('gemini_api_key') || '');
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  useEffect(() => {
    // Make the API key available globally for services
    (window as any).MATATAG_GEMINI_API_KEY = userApiKey;
    if (userApiKey) {
      setApiKeyError(null);
    }
  }, [userApiKey]);


  const allIDFComponents = useMemo(() => ([
    // Corrected typo: IDF_INSTRUCTIONAL_PRINCIPES -> IDF_INSTRUCTIONAL_PRINCIPLES
    ...IDF_INSTRUCTIONAL_PRINCIPLES,
    ...IDF_KEY_ASPECTS,
    ...IDF_ESSENTIAL_FACETS,
  ]), []);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdfFile(file);
      setIsPdfProcessing(true);
      setError(null);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const text = await extractTextFromPdf(arrayBuffer);
        setPdfTextContent(text);
      } catch (err: any) {
        console.error('Failed to extract text from PDF:', err);
        setError(`Failed to process PDF: ${err.message || 'An unknown error occurred.'}`);
        setPdfTextContent(null);
        setSelectedPdfFile(null);
      } finally {
        setIsPdfProcessing(false);
      }
    } else {
      setSelectedPdfFile(null);
      setPdfTextContent(null);
      setError('Please upload a valid PDF file.');
    }
  }, []);

  const clearPdfFile = useCallback(() => {
    setSelectedPdfFile(null);
    setPdfTextContent(null);
    setError(null);
    // Clear the file input visually
    const fileInput = document.getElementById('pdfUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }, []);

  const handleSaveApiKey = useCallback(() => {
    if (userApiKey.trim()) {
      localStorage.setItem('gemini_api_key', userApiKey.trim());
      setApiKeyError(null);
      alert('API Key saved successfully!');
    } else {
      setApiKeyError('API Key cannot be empty.');
    }
  }, [userApiKey]);

  const handleGenerateLessonPlan = useCallback(async () => {
    if (!userApiKey.trim()) {
      setApiKeyError('Please enter and save your Gemini API Key first.');
      return;
    }
    if (!lessonTitle.trim()) {
      setError('Please enter a lesson title.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null); // Clear previous image
    setApiKeyError(null); // Clear any API key error

    const currentLessonPlan: LessonPlan = {
      ...initialLessonPlan,
      content: lessonTitle.trim(),
      learningArea: learningArea,
    };

    const pdfContext = pdfTextContent ? `\n\nRefer to the following document content for context:\n\`\`\`\n${pdfTextContent}\n\`\`\`\n` : '';

    try {
      // 1. Generate Objectives (Cognitive, Psychomotor, Affective)
      const objectivePrompt = `${SYSTEM_INSTRUCTION_BASE}
      ${pdfContext}
      Generate one student-centered cognitive, one psychomotor, and one affective learning objective for a lesson titled "${lessonTitle}" in ${learningArea}. The lesson duration is 45 minutes.
      Ensure numeracy is incorporated into at least one objective where relevant for ${learningArea}.
      Provide the output in a structured JSON format:
      \`\`\`json
      {
        "cognitive": "...",
        "psychomotor": "...",
        "affective": "..."
      }
      \`\`\`
      `;
      const objectivesJson = await generateContentPro(objectivePrompt, { responseMimeType: "application/json" });
      const objectives = JSON.parse(objectivesJson);
      currentLessonPlan.curriculumContent.learningObjectives = objectives;

      // 2. Generate Content Standard, Performance Standards, Learning Competency
      const standardsPrompt = `${SYSTEM_INSTRUCTION_BASE}
      ${pdfContext}
      For a lesson titled "${lessonTitle}" in ${learningArea}, with the following objectives:
      - Cognitive: ${objectives.cognitive}
      - Psychomotor: ${objectives.psychomotor}
      - Affective: ${objectives.affective}
      ${getCurriculumGoalContext(learningArea)}
      Generate the Content Standard, Performance Standards, and Learning Competency. Focus on student-centered outcomes and numeracy where applicable. The lesson duration is 45 minutes.
      Provide the output in a structured JSON format:
      \`\`\`json
      {
        "contentStandard": "...",
        "performanceStandards": "...",
        "learningCompetency": "..."
      }
      \`\`\`
      `;
      const standardsJson = await generateContentPro(standardsPrompt, { responseMimeType: "application/json" });
      const standards = JSON.parse(standardsJson);
      currentLessonPlan.curriculumContent.contentStandard = standards.contentStandard;
      currentLessonPlan.curriculumContent.performanceStandards = standards.performanceStandards;
      currentLessonPlan.curriculumContent.learningCompetency = standards.learningCompetency;

      // 3. Select IDF Features, 21st Century Skills
      const idfSkillsPrompt = `${SYSTEM_INSTRUCTION_BASE}
      ${pdfContext}
      Considering a lesson titled "${lessonTitle}" in ${learningArea} with the following objectives:
      - Cognitive: ${objectives.cognitive}
      - Psychomotor: ${objectives.psychomotor}
      - Affective: ${objectives.affective}
      The lesson duration is 45 minutes.
      Select 3-5 most appropriate Instructional Design Framework (IDF) features (from Principles, Key Aspects, or Essential Facets) and 3-5 most appropriate 21st Century Skills. Ensure they are student-centered and align with the lesson and objectives.
      
      Available IDF components:\n${allIDFComponents.map(c => `- ${c.name}: ${c.description}`).join('\n')}
      
      Available 21st Century Skills:\n${TWENTY_FIRST_CENTURY_SKILLS.map(s => `- ${s.skill}: ${s.description}`).join('\n')}

      Provide the output in a structured JSON format with only the names of the selected features and skills:
      \`\`\`json
      {
        "idfFeatures": ["IDF Feature 1 Name", "IDF Feature 2 Name"],
        "twentyFirstCenturySkills": ["21st Skill 1 Name", "21st Skill 2 Name"]
      }
      \`\`\`
      `;
      const idfSkillsJson = await generateContentPro(idfSkillsPrompt, { responseMimeType: "application/json" });
      const idfSkills = JSON.parse(idfSkillsJson);
      currentLessonPlan.curriculumContent.idfFeatures = idfSkills.idfFeatures || [];
      currentLessonPlan.twentyFirstCenturySkills = idfSkills.twentyFirstCenturySkills || [];

      // 4. Generate Integration (References, Other Learning Resources)
      const integrationPrompt = `${SYSTEM_INSTRUCTION_BASE}
      ${pdfContext}
      For a lesson titled "${lessonTitle}" in ${learningArea}, with the following objectives:
      - Cognitive: ${objectives.cognitive}
      - Psychomotor: ${objectives.psychomotor}
      - Affective: ${objectives.affective}
      The lesson duration is 45 minutes.
      Suggest 2-3 generic types of references (e.g., textbooks, curriculum guides) and 2-3 other learning resources (e.g., online videos, manipulatives) that would be suitable for this lesson, incorporating numeracy if relevant.
      Provide the output in a structured JSON format:
      \`\`\`json
      {
        "references": ["...", "..."],
        "otherLearningResources": ["...", "..."]
      }
      \`\`\`
      `;
      const integrationJson = await generateContentPro(integrationPrompt, { responseMimeType: "application/json" });
      const integration = JSON.parse(integrationJson);
      currentLessonPlan.integration = integration;

      // 5. Generate Teaching and Learning Procedures
      const proceduresContext = `
      Lesson Title: ${lessonTitle}
      Learning Area: ${learningArea}
      Objectives:
      - Cognitive: ${objectives.cognitive}
      - Psychomotor: ${objectives.psychomotor}
      - Affective: ${objectives.affective}
      IDF Features: ${currentLessonPlan.curriculumContent.idfFeatures.join(', ')}
      21st Century Skills: ${currentLessonPlan.twentyFirstCenturySkills.join(', ')}
      ${getPedagogicalApproachesContext(learningArea)}
      `;

      const proceduresPrompt = `${SYSTEM_INSTRUCTION_BASE}
      ${pdfContext}
      Using the context below, generate detailed, student-centered, and numeracy-integrated content for the "IV. TEACHING AND LEARNING PROCEDURES" sections.
      Ensure the procedures align with the objectives, IDF features, and 21st-century skills. The entire procedure should fit within a 45-minute lesson. Be specific about time allocation or pacing for each sub-section to reinforce the 45-minute constraint.
      ${proceduresContext}
      
      Provide the output in a structured JSON format:
      \`\`\`json
      {
        "activatingPriorKnowledge": "...",
        "lessonPurposeIntention": "...",
        "lessonLanguagePractice": "...",
        "readingKeyIdeaStem": "...",
        "developingUnderstanding": "...",
        "deepeningUnderstanding": "...",
        "makingGeneralizationsAbstractions": "..."
      }
      \`\`\`
      `;
      const proceduresJson = await generateContentPro(proceduresPrompt, { responseMimeType: "application/json" });
      const procedures = JSON.parse(proceduresJson);
      currentLessonPlan.teachingAndLearningProcedures = procedures;

      // 6. Generate Evaluation, Additional Activities, and Reflection prompts
      const finalSectionsPrompt = `${SYSTEM_INSTRUCTION_BASE}
      ${pdfContext}
      For a lesson titled "${lessonTitle}" in ${learningArea}, with the following objectives:
      - Cognitive: ${objectives.cognitive}
      - Psychomotor: ${objectives.psychomotor}
      - Affective: ${objectives.affective}
      The lesson duration is 45 minutes.
      Generate appropriate content for "Evaluating Learning", "Additional Activities for Application or Remediation", and fill the reflection prompts ("I understand that...", "I realize that...", "I need to learn more about...").
      Ensure numeracy is evident where applicable.
      Provide the output in a structured JSON format:
      \`\`\`json
      {
        "evaluatingLearning": "...",
        "additionalActivities": "...",
        "reflection": {
          "understandThat": "Students understand...",
          "realizeThat": "Students realize...",
          "needToLearnMoreAbout": "Students need to learn more about..."
        }
      }
      \`\`\`
      `;
      const finalSectionsJson = await generateContentPro(finalSectionsPrompt, { responseMimeType: "application/json" });
      const finalSections = JSON.parse(finalSectionsJson);
      currentLessonPlan.evaluatingLearning = finalSections.evaluatingLearning;
      currentLessonPlan.additionalActivities = finalSections.additionalActivities;
      currentLessonPlan.reflection = finalSections.reflection;
      currentLessonPlan.remarks = 'Lesson plan generated successfully by AI.'; // Add a default remark.

      setLessonPlan(currentLessonPlan);
    } catch (err: any) {
      console.error('Failed to generate lesson plan:', err);
      setError(`Failed to generate lesson plan: ${err.message || 'An unknown error occurred.'}`);
      setLessonPlan(initialLessonPlan); // Reset if error
    } finally {
      setIsLoading(false);
    }
  }, [lessonTitle, learningArea, allIDFComponents, pdfTextContent, userApiKey]);

  const handleGenerateImage = useCallback(async () => {
    if (!userApiKey.trim()) {
      setApiKeyError('Please enter and save your Gemini API Key first.');
      return;
    }
    if (!lessonTitle.trim()) {
      setError('Please enter a lesson title first to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setApiKeyError(null); // Clear any API key error
    try {
      const imagePrompt = `A visually engaging, educational illustration representing the core concept of a lesson on "${lessonTitle}" in a classroom setting, suitable for elementary or middle school students. Incorporate elements of numeracy subtly if possible, with a vibrant, modern style.`;
      const imageUrl = await generateImage(imagePrompt);
      setGeneratedImageUrl(imageUrl);
    } catch (err: any) {
      console.error('Failed to generate image:', err);
      setError(`Failed to generate image: ${err.message || 'An unknown error occurred.'}`);
    } finally {
      setIsLoading(false);
    }
  }, [lessonTitle, userApiKey]);

  const combinedLoading = isLoading || isPdfProcessing;

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl my-8 relative">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Matatag Lesson Plan Generator
        </span>
      </h1>

      {/* API Key Input Section for GitHub Pages */}
      <div className="mb-8 p-6 bg-yellow-50 rounded-lg shadow-inner border border-yellow-200">
        <p className="text-yellow-800 text-sm mb-4">
          <strong className="font-bold">Important:</strong> For this application to work on GitHub Pages, you need to provide your Gemini API Key. It will be stored locally in your browser and not shared.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="password" // Use password type for sensitivity
            className="flex-1 shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            value={userApiKey}
            onChange={(e) => setUserApiKey(e.target.value)}
            placeholder="Enter your Gemini API Key here (e.g., AIza...)"
          />
          <button
            onClick={handleSaveApiKey}
            className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={combinedLoading}
          >
            Save API Key
          </button>
        </div>
        {apiKeyError && <p className="text-red-600 text-center mt-2">{apiKeyError}</p>}
      </div>

      <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-inner border border-blue-200">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <div className="flex-1 w-full">
            <label htmlFor="lessonTitle" className="block text-blue-700 text-sm font-bold mb-2">
              Lesson Title:
            </label>
            <input
              type="text"
              id="lessonTitle"
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="e.g., Understanding Fractions"
              disabled={combinedLoading || !userApiKey.trim()}
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="learningArea" className="block text-blue-700 text-sm font-bold mb-2">
              Learning Area:
            </label>
            <select
              id="learningArea"
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={learningArea}
              onChange={(e) => setLearningArea(e.target.value)}
              disabled={combinedLoading || !userApiKey.trim()}
            >
              {[
                'Mathematics',
                'English',
                'Science',
                'Filipino',
                'Araling Panlipunan',
                'Edukasyong Pantahanan at Pangkabuhayan (EPP)/Technology and Livelihood Education (TLE)',
                'Music, Arts, Physical Education and Health (MAPEH)',
                'Good Manners and Right Conduct (GMRC)/Values Education (VE)'
              ].map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>

        {/* PDF Upload Section */}
        <div className="mb-6 p-4 bg-white rounded-md border border-gray-300">
          <label htmlFor="pdfUpload" className="block text-blue-700 text-sm font-bold mb-2">
            Upload PDF for Context (Optional):
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="pdfUpload"
              accept="application/pdf"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              onChange={handleFileChange}
              disabled={combinedLoading || !userApiKey.trim()}
            />
            {selectedPdfFile && (
              <button
                onClick={clearPdfFile}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={combinedLoading}
              >
                Clear
              </button>
            )}
          </div>
          {selectedPdfFile && (
            <p className="mt-2 text-sm text-gray-600">Selected: <span className="font-medium">{selectedPdfFile.name}</span></p>
          )}
          {isPdfProcessing && (
            <div className="flex items-center mt-2 text-blue-600">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing PDF...
            </div>
          )}
        </div>
        {/* End PDF Upload Section */}


        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGenerateLessonPlan}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={combinedLoading || !lessonTitle.trim() || !userApiKey.trim()}
          >
            Generate Lesson Plan
          </button>
          <button
            onClick={handleGenerateImage}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={combinedLoading || !lessonTitle.trim() || !userApiKey.trim()}
          >
            Generate Image for Lesson
          </button>
        </div>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        {combinedLoading && <LoadingSpinner />}
      </div>

      {generatedImageUrl && (
        <div className="my-8 text-center p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Visual Aid:</h2>
          <img src={generatedImageUrl} alt="Generated Lesson Visual" className="max-w-full h-auto mx-auto rounded-lg shadow-lg" />
          <p className="text-sm text-gray-500 mt-2">This image can be used as a visual aid for your lesson.</p>
        </div>
      )}

      {lessonPlan.content && !combinedLoading && (
        <div className="lesson-plan-output border border-gray-300 rounded-lg p-6 bg-white shadow-xl">
          <div className="text-center mb-8">
            {/* Using a placeholder image for DepEd logo. Replace with actual logo URL if available. */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Department_of_Education_seal.svg/1200px-Department_of_Education_seal.svg.png" alt="DepEd Logo" className="mx-auto h-24 w-24 mb-2" />
            <p className="text-xs text-gray-500">Republic of the Philippines</p>
            <p className="text-sm font-semibold text-gray-700">Department of Education</p>
            <p className="text-lg font-bold text-blue-800">BUREAU OF CURRICULUM DEVELOPMENT</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-32">School:</span>
              <span className="text-gray-600 flex-1 border-b border-gray-300 px-2">{lessonPlan.school}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-32">Grade Level:</span>
              <span className="text-gray-600 flex-1 border-b border-gray-300 px-2">{lessonPlan.gradeLevel}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-32">Name of Teacher:</span>
              <span className="text-gray-600 flex-1 border-b border-gray-300 px-2">{lessonPlan.nameOfTeacher}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-32">Learning Area:</span>
              <span className="text-gray-600 flex-1 border-b border-gray-300 px-2">{lessonPlan.learningArea}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-32">Teaching Dates & Time:</span>
              <span className="text-gray-600 flex-1 border-b border-gray-300 px-2">{lessonPlan.teachingDatesAndTime}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-32">Quarter:</span>
              <span className="text-gray-600 flex-1 border-b border-gray-300 px-2">{lessonPlan.quarter}</span>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">
            I. CURRICULUM CONTENT, STANDARDS, AND LESSON COMPETENCIES
          </h2>
          <LessonPlanSection title="A. Content Standard" content={lessonPlan.curriculumContent.contentStandard} />
          <LessonPlanSection title="B. Performance Standards" content={lessonPlan.curriculumContent.performanceStandards} />
          <LessonPlanSection title="C. Learning Competency" content={lessonPlan.curriculumContent.learningCompetency} />
          <div className="mb-4 p-2 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-1">D. Learning Objectives</h3>
            <ul className="list-disc ml-5 text-gray-600">
              <li><span className="font-semibold">Cognitive:</span> {lessonPlan.curriculumContent.learningObjectives.cognitive}</li>
              <li><span className="font-semibold">Psychomotor:</span> {lessonPlan.curriculumContent.learningObjectives.psychomotor}</li>
              <li><span className="font-semibold">Affective:</span> {lessonPlan.curriculumContent.learningObjectives.affective}</li>
            </ul>
          </div>
          {lessonPlan.curriculumContent.idfFeatures.length > 0 && (
            <LessonPlanSection
              title="E. Instructional Design Framework (IDF) features"
              content={lessonPlan.curriculumContent.idfFeatures.map(name => {
                const idf = allIDFComponents.find(c => c.name === name);
                return idf ? { name: idf.name, description: idf.description } as DisplayItem : { name: name } as DisplayItem;
              })}
            />
          )}
          {lessonPlan.twentyFirstCenturySkills.length > 0 && (
            <LessonPlanSection
              title="F. 21st Century Skills"
              content={lessonPlan.twentyFirstCenturySkills.map(name => {
                const skill = TWENTY_FIRST_CENTURY_SKILLS.find(s => s.skill === name);
                return skill ? { name: skill.skill, description: skill.description } as DisplayItem : { name: name } as DisplayItem;
              })}
            />
          )}

          <h2 className="text-xl font-extrabold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">
            II. CONTENT
          </h2>
          <LessonPlanSection title="Lesson Title" content={lessonPlan.content} />

          <h2 className="text-xl font-extrabold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">
            III. INTEGRATION
          </h2>
          {lessonPlan.integration.references.length > 0 && (
            <LessonPlanSection title="A. References" content={lessonPlan.integration.references} isSubSection />
          )}
          {lessonPlan.integration.otherLearningResources.length > 0 && (
            <LessonPlanSection title="B. Other Learning Resources" content={lessonPlan.integration.otherLearningResources} isSubSection />
          )}

          <h2 className="text-xl font-extrabold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">
            IV. TEACHING AND LEARNING PROCEDURES
          </h2>
          <div className="pl-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Before/Pre-Lesson Proper</h3>
            <LessonPlanSection title="Activating Prior Knowledge" content={lessonPlan.teachingAndLearningProcedures.activatingPriorKnowledge} isSubSection />
            <LessonPlanSection title="Lesson Purpose/Intention" content={lessonPlan.teachingAndLearningProcedures.lessonPurposeIntention} isSubSection />
            <LessonPlanSection title="Lesson Language Practice" content={lessonPlan.teachingAndLearningProcedures.lessonLanguagePractice} isSubSection />

            <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">During Lesson</h3>
            <LessonPlanSection title="Reading the Key Idea/Stem" content={lessonPlan.teachingAndLearningProcedures.readingKeyIdeaStem} isSubSection />
            <LessonPlanSection title="Developing Understanding of the Key Idea/Stem" content={lessonPlan.teachingAndLearningProcedures.developingUnderstanding} isSubSection />
            <LessonPlanSection title="Deepening Understanding of the Key Idea/Stem" content={lessonPlan.teachingAndLearningProcedures.deepeningUnderstanding} isSubSection />

            <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">After/Post-Lesson Proper</h3>
            <LessonPlanSection title="Making Generalizations and Abstractions" content={lessonPlan.teachingAndLearningProcedures.makingGeneralizationsAbstractions} isSubSection />
          </div>

          <LessonPlanSection title="Evaluating Learning" content={lessonPlan.evaluatingLearning} />
          <LessonPlanSection title="Additional Activities for Application or Remediation (if applicable)" content={lessonPlan.additionalActivities} />
          <LessonPlanSection title="Remarks" content={lessonPlan.remarks} />

          <div className="mb-4 p-2 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Reflection</h3>
            <p className="text-gray-600 mt-1"><span className="font-semibold">I understand that:</span> {lessonPlan.reflection.understandThat}</p>
            <p className="text-gray-600 mt-1"><span className="font-semibold">I realize that:</span> {lessonPlan.reflection.realizeThat}</p>
            <p className="text-gray-600 mt-1"><span className="font-semibold">I need to learn more about:</span> {lessonPlan.reflection.needToLearnMoreAbout}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-center text-sm">
            <div>
              <p className="font-semibold text-gray-700">Submitted by:</p>
              <pre className="text-gray-600 whitespace-pre-wrap">{lessonPlan.submittedBy}</pre>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Checked by:</p>
              <pre className="text-gray-600 whitespace-pre-wrap">{lessonPlan.checkedBy}</pre>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Noted:</p>
              <pre className="text-gray-600 whitespace-pre-wrap">{lessonPlan.notedBy}</pre>
            </div>
          </div>
        </div>
      )}
      <Chatbot isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
    </div>
  );
};

export default App;
