import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, Home, BookOpen, Trophy, RotateCcw } from 'lucide-react';

// Import des questions
import questionsPartie1 from './data/questions-partie-1.json';
import questionsPartie2 from './data/questions-partie-2.json';
import questionsPartie3 from './data/questions-partie-3.json';
import questionsPartie4 from './data/questions-partie-4.json';
import questionsPartie5 from './data/questions-partie-5.json';

// Combiner toutes les questions
const allQuestionsBase = [
  ...questionsPartie1.map(q => ({ ...q, partie: 1 })),
  ...questionsPartie2.map(q => ({ ...q, partie: 2 })),
  ...questionsPartie3.map(q => ({ ...q, partie: 3 })),
  ...questionsPartie4.map(q => ({ ...q, partie: 4 })),
  ...questionsPartie5.map(q => ({ ...q, partie: 5 }))
];

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const infoPages = [
  {
    id: 'intro',
    title: `Qu'est-ce que le RITMO${'\u00AE'} ?`,
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-indigo-900 mb-4">RITMO{'\u00AE'} : Retraitement de l'Information Traumatique par les Mouvements Oculaires</h3>
          <p className="text-gray-700 leading-relaxed">
            Le RITMO{'\u00AE'} est une technique innovante qui combine l'EMDR (Eye Movement Desensitization and Reprocessing), l'hypnose éricksonienne et la PNL pour accompagner les personnes et libérer les blocages émotionnels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h4 className="font-bold text-lg text-blue-900 mb-3">🎯 Comment ça fonctionne ?</h4>
            <p className="text-gray-700">
              Le RITMO{'\u00AE'} utilise des stimulations bilatérales (visuelles, auditives ou kinesthésiques) pour activer les zones du cerveau impliquées dans le retraitement des souvenirs. Ce processus permet de "digérer" l'événement en le séparant de l'émotion ressentie.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h4 className="font-bold text-lg text-green-900 mb-3">✨ Une approche brève</h4>
            <p className="text-gray-700">
              Une à quelques séances suffisent dans la majorité des cas. Le RITMO{'\u00AE'} est reconnu par l'OMS et fait appel à notre capacité naturelle d'auto-guérison grâce à la plasticité du cerveau.
            </p>
          </div>
        </div>

        <div className="bg-indigo-900 text-white p-6 rounded-lg">
          <h4 className="font-bold text-xl mb-4">Applications du RITMO{'\u00AE'}</h4>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Événements ponctuels (accidents, annonces difficiles, deuil)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Situations complexes (harcèlement, relations difficiles)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Blocages émotionnels et peurs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Manque de confiance en soi</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Comportements répétitifs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Amélioration des compétences (sportifs, artistes)</span>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'protocole',
    title: `Les 8 Étapes du Protocole RITMO${'\u00AE'}`,
    content: (
      <div className="space-y-4">
        {[
          {
            num: 1,
            title: 'Anamnèse (Identification de la Cible)',
            content: 'Isoler l\'information à traiter : identifier l\'image la plus perturbante (instant figé, non un film). Point de focalisation pour la désensibilisation.'
          },
          {
            num: 2,
            title: 'Préparation (Ressources Hypnotiques)',
            content: 'Installation du Lieu Sûr via hypnose éricksonienne. Ancrage permettant de revenir à un état de calme immédiat. Création d\'un "Contenant" pour ranger temporairement l\'émotion.'
          },
          {
            num: 3,
            title: 'Évaluation (Mesures Initiales)',
            content: 'Mesure de la Détresse Subjective (SUDs 0-10), identification de la Cognition Négative et Positive, évaluation de leur Validité (VoC 1-7).'
          },
          {
            num: 4,
            title: 'Désensibilisation (Retraitement Bilatéral)',
            content: 'Séries de stimulations bilatérales (SBA) pendant que le client se concentre sur l\'image cible. Répéter jusqu\'à SUDs = 0 ou 1. Question clé : "Qu\'est-ce qui vient maintenant ?"'
          },
          {
            num: 5,
            title: 'Installation (Réencodage Cognitif)',
            content: 'Renforcement de la Cognition Positive avec nouvelles séries de SBA. Continuer jusqu\'à VoC = 7 (totalement vrai).'
          },
          {
            num: 6,
            title: 'Scanner Corporel (Vérification Somatique)',
            content: 'Balayage mental du corps pour vérifier l\'absence de tensions résiduelles. Mini-séries de SBA sur les sensations persistantes.'
          },
          {
            num: 7,
            title: 'Clôture (Sécurité et Futurisation)',
            content: 'Ancrage du sentiment de sécurité, intégration de la CP dans des scénarios futurs. Si retraitement incomplet : ranger la Cible dans le Contenant.'
          },
          {
            num: 8,
            title: 'Réévaluation (Suivi)',
            content: 'Vérification lors de la séance suivante : SUDs doit rester bas, VoC à 7. Reprise courte si nécessaire.'
          }
        ].map((step, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                {step.num}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-indigo-900 mb-2">{step.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{step.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
];

// Fiches de révision ENRICHIES
const revisionCards = [
  {
    type: 'saviez-vous',
    icon: '💡',
    title: 'Le saviez-vous ?',
    content: `Le RITMO${'\u00AE'} combine trois approches complémentaires : l'EMDR pour le retraitement, l'hypnose éricksonienne pour les ressources internes, et la PNL pour le recadrage cognitif.`,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'rappel',
    icon: '📌',
    title: 'Pour rappel',
    content: 'Les SUDs mesurent la détresse subjective de 0 à 10. L\'objectif est d\'atteindre 0 ou 1 après désensibilisation.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'aide-memoire',
    icon: '🎯',
    title: 'Aide-mémoire',
    content: 'La VoC (Validity of Cognition) évalue la croyance en la pensée positive sur une échelle de 1 à 7. Le but est d\'atteindre 7 (totalement vrai).',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'cle',
    icon: '⚡',
    title: 'Point clé',
    content: 'La cible doit être une image fixe (instant figé) et non un film. C\'est le moment le plus perturbant de l\'événement.',
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'retenir',
    icon: '✨',
    title: 'À retenir',
    content: 'Le Lieu Sûr est un ancrage essentiel installé en phase de préparation. Il permet de retrouver un état de calme à tout moment.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    type: 'saviez-vous',
    icon: '💡',
    title: 'Le saviez-vous ?',
    content: 'Les stimulations bilatérales alternées (SBA) peuvent être visuelles (mouvements oculaires), auditives ou kinesthésiques (tapotements).',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'rappel',
    icon: '📌',
    title: 'Pour rappel',
    content: 'Il existe 3 types principaux : Type I (événement unique), Type II (complexe/répété), Type III (multiples/envahissants).',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'aide-memoire',
    icon: '🎯',
    title: 'Aide-mémoire',
    content: 'Les 4 critères du SSPT : Reviviscence, Évitement, Hypervigilance, Altération des émotions et pensées.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'cle',
    icon: '⚡',
    title: 'Point clé',
    content: 'La question centrale pendant la désensibilisation : "Qu\'est-ce qui vient maintenant ?" Elle permet au processus de se dérouler naturellement.',
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'retenir',
    icon: '✨',
    title: 'À retenir',
    content: 'Le "Contenant" est un outil hypnotique pour ranger temporairement les émotions trop intenses en fin de séance incomplète.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    type: 'saviez-vous',
    icon: '💡',
    title: 'Le saviez-vous ?',
    content: 'La phase de scanner corporel permet de détecter les tensions résiduelles dans le corps après le retraitement cognitif.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'rappel',
    icon: '📌',
    title: 'Pour rappel',
    content: 'Une séquence de désensibilisation dure environ 30 allers-retours de stimulations bilatérales, adaptés selon la réaction émotionnelle.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'aide-memoire',
    icon: '🎯',
    title: 'Aide-mémoire',
    content: 'La pensée négative est une croyance irrationnelle sur soi liée à l\'événement : "je suis nul(le)", "je ne mérite pas", "je suis en danger"...',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'cle',
    icon: '⚡',
    title: 'Point clé',
    content: `L'amygdale (émotions) peut inhiber l'hippocampe (logique). Le RITMO${'\u00AE'} aide à restaurer l'équilibre entre ces zones cérébrales.`,
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'retenir',
    icon: '✨',
    title: 'À retenir',
    content: 'Un accompagnant exposé aux récits difficiles peut être impacté. La supervision est essentielle pour prendre soin de soi.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    type: 'saviez-vous',
    icon: '💡',
    title: 'Le saviez-vous ?',
    content: 'La futurisation (étape 7) permet d\'ancrer la cognition positive dans des scénarios futurs pour renforcer le changement.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'rappel',
    icon: '📌',
    title: 'Pour rappel',
    content: 'La réévaluation (étape 8) se fait lors de la séance suivante pour vérifier que les SUDs restent bas et la VoC à 7.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'aide-memoire',
    icon: '🎯',
    title: 'Aide-mémoire',
    content: 'Respecter le rythme : ne pas forcer, ne pas interpréter entre deux séquences, laisser le processus se dérouler.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'cle',
    icon: '⚡',
    title: 'Point clé',
    content: 'Toujours demander l\'autorisation avant de toucher. En cas de situation sensible, privilégier les stimulations visuelles.',
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'retenir',
    icon: '✨',
    title: 'À retenir',
    content: 'L\'approche humaniste : confiance dans la capacité d\'auto-restauration, importance de l\'histoire personnelle.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    type: 'saviez-vous',
    icon: '💡',
    title: 'Le saviez-vous ?',
    content: 'Les somatisations (colopathie, fibromyalgie, douleurs chroniques) sont souvent liées à des événements non traités.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'rappel',
    icon: '📌',
    title: 'Pour rappel',
    content: 'Attention à la dissociation excessive (alcool, médicaments) qui peut bloquer le processus.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'aide-memoire',
    icon: '🎯',
    title: 'Aide-mémoire',
    content: 'Les 5 outils d\'intégration : imagerie mentale, formulation claire, focalisation émotionnelle, liens pensées-émotions, projection future.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'cle',
    icon: '⚡',
    title: 'Point clé',
    content: 'La mémoire peut être fragmentée, malléable et mouvante. Les souvenirs peuvent réapparaître quand la personne se sent prête.',
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'retenir',
    icon: '✨',
    title: 'À retenir',
    content: 'Dans les situations d\'exposition continue (type 4), la priorité absolue est la sécurité et l\'extraction avant tout retraitement.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    type: 'saviez-vous',
    icon: '💡',
    title: 'Le saviez-vous ?',
    content: 'L\'expérience de Harlow (années 1950) a prouvé que le besoin de contact et de sécurité est plus fondamental que la nourriture chez les mammifères.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'rappel',
    icon: '📌',
    title: 'Pour rappel',
    content: 'La fenêtre de tolérance émotionnelle : chaque personne fonctionne dans un espace émotionnel optimal. Sortir de cette fenêtre (hyperactivation ou hypoactivation) empêche un bon accompagnement.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'aide-memoire',
    icon: '🎯',
    title: 'Aide-mémoire',
    content: 'Le questionnement circulaire : "Qu\'est-ce que l\'autre personne pense de ce que vous venez d\'exprimer ?" Cette question brise le schéma de la plainte.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'cle',
    icon: '⚡',
    title: 'Point clé',
    content: 'La pensée circulaire vs linéaire : "Comment en est-on arrivé là ?" plutôt que "C\'est de ta faute". La responsabilité est partagée, la solution peut être co-construite.',
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'retenir',
    icon: '✨',
    title: 'À retenir',
    content: 'Un attachement insécure peut être transformé en attachement sécure. Ce processus prend 2-3 ans via une relation sécure ou un accompagnement adapté.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    type: 'saviez-vous',
    icon: '💡',
    title: 'Le saviez-vous ?',
    content: 'L\'ocytocine, hormone de l\'attachement, est transmise non seulement par le lait maternel mais surtout par le contact peau à peau.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'rappel',
    icon: '📌',
    title: 'Pour rappel',
    content: 'Il y a deux hiérarchies familiales : verticale (parents) et horizontale (fratrie). Les événements difficiles peuvent perturber ces hiérarchies.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'aide-memoire',
    icon: '🎯',
    title: 'Aide-mémoire',
    content: 'Le "butterfly hug" (étreinte du papillon) : croiser les bras sur la poitrine et se tapoter les épaules pour s\'auto-réconforter.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'cle',
    icon: '⚡',
    title: 'Point clé',
    content: 'En accompagnement familial (rythmo groupal), chacun travaille sur sa propre problématique mais ensemble. L\'écoute mutuelle brise l\'isolement.',
    color: 'from-orange-500 to-red-500'
  },
  {
    type: 'retenir',
    icon: '✨',
    title: 'À retenir',
    content: 'Ne jamais laisser repartir quelqu\'un "en vrac". Utiliser des techniques d\'apaisement si l\'émotion est encore haute en fin de séance.',
    color: 'from-indigo-500 to-purple-500'
  }
];

function QuizApp() {
  const QUESTIONS_PER_BLOCK = 10;
  
  const [currentView, setCurrentView] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentRevisionCard, setCurrentRevisionCard] = useState(null);
  
  // Pool de questions pour la session
  const [questionPool, setQuestionPool] = useState([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [currentBlockQuestions, setCurrentBlockQuestions] = useState([]);
  const [blockNumber, setBlockNumber] = useState(1);

  // Initialiser un nouveau bloc de questions
  const initializeNewBlock = () => {
    let questionsToUse = [];
    
    // Priorité aux questions incorrectes
    if (incorrectQuestions.length > 0) {
      questionsToUse = [...incorrectQuestions];
      setIncorrectQuestions([]);
    }
    
    // Compléter avec des nouvelles questions si nécessaire
    if (questionsToUse.length < QUESTIONS_PER_BLOCK && questionPool.length > 0) {
      const needed = QUESTIONS_PER_BLOCK - questionsToUse.length;
      const newQuestions = questionPool.slice(0, needed);
      questionsToUse = [...questionsToUse, ...newQuestions];
      setQuestionPool(questionPool.slice(needed));
    }
    
    // Si le pool est vide, le remplir avec toutes les questions mélangées
    if (questionsToUse.length < QUESTIONS_PER_BLOCK) {
      const shuffled = shuffleArray(allQuestionsBase);
      const needed = QUESTIONS_PER_BLOCK - questionsToUse.length;
      questionsToUse = [...questionsToUse, ...shuffled.slice(0, needed)];
      setQuestionPool(shuffled.slice(needed));
    }
    
    setCurrentBlockQuestions(questionsToUse);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  // Obtenir une carte de révision aléatoire
  const getRandomRevisionCard = () => {
    const randomIndex = Math.floor(Math.random() * revisionCards.length);
    return revisionCards[randomIndex];
  };

  const handleTransition = (callback) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 300);
  };

  const handleAnswerClick = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      setShowExplanation(true);
      
      const question = currentBlockQuestions[currentQuestion];
      const isVraisFaux = question.type === 'vf';
      let correct;
      
      if (isVraisFaux) {
        correct = (index === 0 && question.correctAnswer === true) || 
                  (index === 1 && question.correctAnswer === false);
      } else {
        correct = index === question.correctAnswer;
      }
      
      if (correct) {
        setScore(score + 1);
      } else {
        // Ajouter la question au pool des questions incorrectes
        setIncorrectQuestions(prev => [...prev, question]);
      }
      
      const options = isVraisFaux ? ['VRAI', 'FAUX'] : question.options;
      const correctIndex = isVraisFaux 
        ? (question.correctAnswer === true ? 0 : 1)
        : question.correctAnswer;
      
      setAnsweredQuestions([...answeredQuestions, {
        question: question.question,
        correct,
        userAnswer: options[index],
        correctAnswer: options[correctIndex]
      }]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentBlockQuestions.length - 1) {
      handleTransition(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      });
    } else {
      // Fin du bloc - afficher les résultats
      handleTransition(() => {
        setCurrentView('blockResults');
      });
    }
  };

  const handleStartQuiz = () => {
    // Mélanger toutes les questions au démarrage
    const shuffled = shuffleArray(allQuestionsBase);
    setQuestionPool(shuffled);
    setIncorrectQuestions([]);
    setBlockNumber(1);
    initializeNewBlock();
    handleTransition(() => setCurrentView('quiz'));
  };

  const handleContinueToNextBlock = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    const card = getRandomRevisionCard();
    setCurrentRevisionCard(card);
    
    handleTransition(() => {
      setCurrentView('revisionCard');
    });
  };

  const handleStartNewBlockAfterRevision = () => {
    setBlockNumber(blockNumber + 1);
    initializeNewBlock();
    handleTransition(() => setCurrentView('quiz'));
  };

  const renderHome = () => (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4 animate-fade-in">
          Quiz RITMO{'\u00AE'}
        </h1>
        <p className="text-xl text-gray-600">Formation Psychotrauma et SSPT</p>
      </div>

      {infoPages[0].content}

      <div className="mt-8 text-center">
        <button
          onClick={handleStartQuiz}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
        >
          Commencer le Quiz
          <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const question = currentBlockQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentBlockQuestions.length) * 100;
    const isVraisFaux = question.type === 'vf';
    const options = isVraisFaux ? ['VRAI', 'FAUX'] : question.options;

    return (
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} sur {currentBlockQuestions.length} (Bloc {blockNumber})
            </span>
            <span className="text-sm font-medium text-indigo-600">
              Score: {score}/{answeredQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {question.question}
          </h3>

          <div className="space-y-3">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              let isCorrect;
              
              if (isVraisFaux) {
                isCorrect = (index === 0 && question.correctAnswer === true) || 
                           (index === 1 && question.correctAnswer === false);
              } else {
                isCorrect = index === question.correctAnswer;
              }
              
              const showResult = showExplanation;

              let buttonClass = 'w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ';
              
              if (!showResult) {
                buttonClass += 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 ';
              } else if (isCorrect) {
                buttonClass += 'border-green-500 bg-green-50 ';
              } else if (isSelected && !isCorrect) {
                buttonClass += 'border-red-500 bg-red-50 ';
              } else {
                buttonClass += 'border-gray-300 opacity-50 ';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && isCorrect && <CheckCircle className="text-green-600" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6 animate-fade-in">
            <h4 className="font-bold text-blue-900 mb-2">💡 Explication</h4>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
            >
              {currentQuestion < currentBlockQuestions.length - 1 ? 'Question Suivante' : 'Voir les Résultats'}
              <ArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderBlockResults = () => {
    const percentage = Math.round((score / currentBlockQuestions.length) * 100);
    const hasIncorrectQuestions = incorrectQuestions.length > 0;

    return (
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center mb-8">
          <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-4xl font-bold text-indigo-900 mb-2">Bloc {blockNumber} Terminé !</h2>
          <p className="text-xl text-gray-600">Résultats de ce bloc de questions</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-lg mb-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Votre Score</h3>
          <div className="text-6xl font-bold mb-2">{percentage}%</div>
          <p className="text-xl">{score} bonnes réponses sur {currentBlockQuestions.length}</p>
        </div>

        {hasIncorrectQuestions && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
            <h4 className="font-bold text-orange-900 mb-2">📚 Questions à revoir</h4>
            <p className="text-gray-700">
              Vous avez {incorrectQuestions.length} question(s) incorrecte(s). 
              Elles seront incluses dans votre prochain bloc pour vous permettre de vous améliorer !
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Récapitulatif</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {answeredQuestions.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg ${item.correct ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
                <div className="flex items-start">
                  {item.correct ? <CheckCircle className="text-green-600 mt-1 mr-2 flex-shrink-0" /> : <XCircle className="text-red-600 mt-1 mr-2 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.question}</p>
                    {!item.correct && (
                      <p className="text-sm text-gray-600 mt-1">
                        Votre réponse: {item.userAnswer} <br />
                        Bonne réponse: {item.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleContinueToNextBlock}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
          >
            <RotateCcw className="mr-2" />
            Nouveau Bloc de Questions
          </button>
          
          <button
            onClick={() => {
              handleTransition(() => {
                setCurrentView('home');
                setQuestionPool([]);
                setIncorrectQuestions([]);
                setBlockNumber(1);
              });
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
          >
            <Home className="mr-2" />
            Retour à l'Accueil
          </button>
        </div>
      </div>
    );
  };

  const renderRevisionCard = () => {
    if (!currentRevisionCard) return null;

    return (
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">{currentRevisionCard.icon}</div>
          <h2 className="text-4xl font-bold text-indigo-900 mb-2">Pause Révision</h2>
          <p className="text-xl text-gray-600">Avant de continuer, un petit rappel...</p>
        </div>

        <div className={`bg-gradient-to-br ${currentRevisionCard.color} p-1 rounded-2xl shadow-2xl mb-8 transform hover:scale-105 transition-all duration-300`}>
          <div className="bg-white p-8 rounded-xl">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">{currentRevisionCard.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900">{currentRevisionCard.title}</h3>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-xl text-gray-800 leading-relaxed">
                {currentRevisionCard.content}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                ✓ Information enregistrée !
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-lg mb-8">
          <p className="text-center text-indigo-900 font-medium">
            💪 Prêt(e) à continuer votre apprentissage avec le bloc {blockNumber + 1} ?
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={handleStartNewBlockAfterRevision}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center mx-auto"
          >
            Continuer l'Entraînement
            <ArrowRight className="ml-3" size={28} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {currentView === 'home' && renderHome()}
        {currentView === 'quiz' && renderQuiz()}
        {currentView === 'blockResults' && renderBlockResults()}
        {currentView === 'revisionCard' && renderRevisionCard()}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default QuizApp;