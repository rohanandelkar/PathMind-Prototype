import { LearnerProfile, PersonalizedRoadmap, DashboardMetrics, Assessment } from './types';

export const MOCK_PROFILE: LearnerProfile = {
  user_id: 'usr_demo_101',
  name: 'Alex Mercer',
  experience_level: 'Beginner',
  target_role: 'Java Backend Developer',
  timeline_months: 6,
  hours_per_week: 14.0,
  learning_style: 'Hands-on Projects',
  existing_skills: [
    { skill_name: 'HTML5 & CSS3 Responsive Design', category: 'Frontend', level: 'Beginner', score: 40 },
    { skill_name: 'SQL & Relational Databases', category: 'Databases', level: 'Intermediate', score: 65 }
  ],
  skill_gaps: [
    { skill_name: 'Java Basics & OOP', category: 'Languages', current_score: 0, required_score: 85, gap_score: 85, status: 'Missing', priority: 1, prerequisites: ['Programming Fundamentals'] },
    { skill_name: 'Java Collections & Exception Handling', category: 'Languages', current_score: 0, required_score: 85, gap_score: 85, status: 'Missing', priority: 1, prerequisites: ['Java Basics & OOP'] },
    { skill_name: 'JDBC & ORM Hibernate', category: 'Backend', current_score: 0, required_score: 75, gap_score: 75, status: 'Missing', priority: 2, prerequisites: ['Java Collections & Exception Handling', 'SQL & Relational Databases'] },
    { skill_name: 'Spring Boot & Dependency Injection', category: 'Frameworks', current_score: 0, required_score: 85, gap_score: 85, status: 'Missing', priority: 1, prerequisites: ['Spring Framework & Core'] },
    { skill_name: 'RESTful API Architecture', category: 'Architecture', current_score: 0, required_score: 85, gap_score: 85, status: 'Missing', priority: 1, prerequisites: ['Spring Boot & Dependency Injection'] },
    { skill_name: 'Security & JWT Authentication', category: 'Security', current_score: 0, required_score: 75, gap_score: 75, status: 'Missing', priority: 2, prerequisites: ['RESTful API Architecture'] }
  ],
  created_at: new Date().toISOString()
};

export const MOCK_ROADMAP: PersonalizedRoadmap = {
  roadmap_id: 'roadmap_demo_101',
  user_id: 'usr_demo_101',
  target_role: 'Java Backend Developer',
  overall_progress: 35.0,
  total_phases: 7,
  current_phase_index: 3,
  generated_at: new Date().toISOString(),
  roadmap_items: [
    {
      id: 'item_1',
      phase_number: 1,
      phase_title: 'Phase 1: Programming Fundamentals & Logic',
      skill_name: 'Programming Fundamentals',
      description: 'Master variables, algorithmic flow, and data structures.',
      status: 'Completed',
      estimated_days: 5,
      prerequisites: [],
      explanation: 'Foundational phase: Programming fundamentals is recommended first for all engineering paths.',
      completion_criteria: 'Score > 80% on fundamentals assessment.',
      resources: [
        {
          id: 'r1',
          title: 'Algorithmic Problem Solving in Java',
          type: 'Video Tutorial',
          url: 'https://coursera.org',
          duration_hours: 4.5,
          difficulty: 'Beginner',
          provider: 'HCLTech Learning Hub',
          description: 'Core logic building blocks in Java.',
          skill_name: 'Programming Fundamentals'
        }
      ]
    },
    {
      id: 'item_2',
      phase_number: 2,
      phase_title: 'Phase 2: SQL & Database Integration',
      skill_name: 'SQL & Relational Databases',
      description: 'Design schemas, write queries, and handle relational data.',
      status: 'Completed',
      estimated_days: 4,
      prerequisites: [],
      explanation: 'Shortened duration because you already have baseline SQL experience.',
      completion_criteria: 'Write multi-table JOINs and indexed queries.',
      resources: [
        {
          id: 'r2',
          title: 'PostgreSQL Relational Schema Design',
          type: 'Hands-on Project',
          url: 'https://postgresql.org',
          duration_hours: 6.0,
          difficulty: 'Intermediate',
          provider: 'PostgreSQL Docs',
          description: 'Database schema design and indexing.',
          skill_name: 'SQL & Relational Databases'
        }
      ]
    },
    {
      id: 'item_3',
      phase_number: 3,
      phase_title: 'Phase 3: Java Basics & OOP Principles',
      skill_name: 'Java Basics & OOP',
      description: 'Master classes, inheritance, polymorphism, and encapsulation.',
      status: 'In-Progress',
      estimated_days: 7,
      prerequisites: ['Programming Fundamentals'],
      explanation: 'Recommended Java Basics & OOP because it is required for building backend services and Spring components.',
      completion_criteria: 'Build an object-oriented Java console application.',
      assessment_id: 'quiz_java_oop',
      project_prompt: 'Create a Java Banking Console System implementing Inheritance and Encapsulation.',
      resources: [
        {
          id: 'r3',
          title: 'Java Programming Masterclass 2026',
          type: 'Hands-on Code',
          url: 'https://oracle.com',
          duration_hours: 8.0,
          difficulty: 'Beginner to Intermediate',
          provider: 'Oracle University',
          description: 'OOP design patterns and memory model.',
          skill_name: 'Java Basics & OOP'
        }
      ]
    },
    {
      id: 'item_4',
      phase_number: 4,
      phase_title: 'Phase 4: Java Collections & Exception Handling',
      skill_name: 'Java Collections & Exception Handling',
      description: 'Master Lists, Maps, Sets, Streams API, and try-catch architecture.',
      status: 'Locked',
      estimated_days: 6,
      prerequisites: ['Java Basics & OOP'],
      explanation: 'Prerequisite requirement: Must master OOP principles before Java Collections.',
      completion_criteria: 'Score > 75% in Collections quiz.',
      resources: []
    },
    {
      id: 'item_5',
      phase_number: 5,
      phase_title: 'Phase 5: Spring Boot Microservices Core',
      skill_name: 'Spring Boot & Dependency Injection',
      description: 'Enterprise backend development with Spring Boot 3.',
      status: 'Locked',
      estimated_days: 10,
      prerequisites: ['Java Collections & Exception Handling', 'SQL & Relational Databases'],
      explanation: 'Core framework goal: Spring Boot connects Java language to database APIs.',
      completion_criteria: 'Deploy a Spring Boot microservice.',
      assessment_id: 'quiz_spring_boot',
      resources: []
    },
    {
      id: 'item_6',
      phase_number: 6,
      phase_title: 'Phase 6: RESTful API Architecture',
      skill_name: 'RESTful API Architecture',
      description: 'Build production REST controllers, DTOs, and Swagger documentation.',
      status: 'Locked',
      estimated_days: 8,
      prerequisites: ['Spring Boot & Dependency Injection'],
      explanation: 'Essential for Java Backend Developer target role.',
      completion_criteria: 'Pass REST API benchmark assessment.',
      resources: []
    },
    {
      id: 'item_7',
      phase_number: 7,
      phase_title: 'Phase 7: Security & JWT Authentication',
      skill_name: 'Security & JWT Authentication',
      description: 'Implement stateless JWT token auth and role-based endpoint security.',
      status: 'Locked',
      estimated_days: 7,
      prerequisites: ['RESTful API Architecture'],
      explanation: 'Secures REST endpoints built in Phase 6.',
      completion_criteria: 'Implement JWT Spring Security middleware.',
      resources: []
    }
  ]
};

export const MOCK_DASHBOARD: DashboardMetrics = {
  user_name: 'Alex Mercer',
  target_role: 'Java Backend Developer',
  overall_progress: 35.0,
  learning_streak_days: 1,
  total_hours_learned: 0.1,
  milestone_summary: {
    total: 7,
    completed: 2,
    in_progress: 1,
    locked: 4
  },
  next_recommended_action: {
    title: 'Focus on Java Basics & OOP',
    description: 'Recommended Java Basics & OOP because it is required for building backend services and Spring components.',
    skill_name: 'Java Basics & OOP',
    estimated_duration: '45 mins today'
  },
  skills_visualization: [
    { skill: 'Programming Logic', current: 90, required: 90, gap: 0 },
    { skill: 'SQL & Relational', current: 65, required: 80, gap: 15 },
    { skill: 'Java Basics & OOP', current: 40, required: 85, gap: 45 },
    { skill: 'Java Collections', current: 10, required: 85, gap: 75 },
    { skill: 'Spring Boot DI', current: 0, required: 85, gap: 85 },
    { skill: 'REST API Design', current: 0, required: 85, gap: 85 },
    { skill: 'JWT Security', current: 0, required: 75, gap: 75 }
  ],
  skill_gaps_summary: [
    { skill: 'Java Basics & OOP', priority: 1, status: 'Inadequate', gap: 45 },
    { skill: 'Java Collections', priority: 1, status: 'Missing', gap: 75 },
    { skill: 'Spring Boot DI', priority: 1, status: 'Missing', gap: 85 },
    { skill: 'REST API Design', priority: 1, status: 'Missing', gap: 85 },
    { skill: 'JWT Security', priority: 2, status: 'Missing', gap: 75 }
  ]
};

export const MOCK_ASSESSMENT: Assessment = {
  id: 'quiz_java_oop',
  skill_name: 'Java Basics & OOP',
  title: 'Java Object-Oriented Programming Assessment',
  difficulty: 'Intermediate',
  questions: [
    {
      id: 'q1',
      question: 'Which OOP principle relies on hiding internal implementation details and exposing public interfaces?',
      options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'],
      correct_option_index: 1,
      explanation: 'Encapsulation keeps fields private and provides getter/setter methods to protect object state.'
    },
    {
      id: 'q2',
      question: 'What happens if a Java class extends an abstract class without implementing all abstract methods?',
      options: [
        'The code compiles automatically with null defaults',
        'The subclass must also be declared abstract or it fails to compile',
        'A runtime Exception is thrown during object creation',
        'Java converts the class into an interface'
      ],
      correct_option_index: 1,
      explanation: 'Any concrete subclass extending an abstract class MUST implement all inherited abstract methods.'
    },
    {
      id: 'q3',
      question: 'What is the difference between Method Overloading and Method Overriding?',
      options: [
        'Overloading happens at compile-time with different parameter signatures; Overriding happens at runtime in subclasses',
        'Overriding requires static methods; Overloading requires final methods',
        'They are identical concepts in Java',
        'Overloading can only occur in child classes'
      ],
      correct_option_index: 0,
      explanation: 'Method Overloading is compile-time polymorphism within the same class; Overriding is runtime polymorphism across class hierarchies.'
    }
  ]
};
