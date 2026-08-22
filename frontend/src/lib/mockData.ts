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
          id: 'r1_v1',
          title: 'Java Tutorial for Beginners - Full Course',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
          duration_hours: 4.0,
          difficulty: 'Beginner',
          provider: 'Programming with Mosh',
          description: 'Step-by-step introduction to Java JDK installation, IntelliJ IDE, variables, control flow, methods, and debugging.',
          skill_name: 'Programming Fundamentals',
          thumbnail_url: 'https://img.youtube.com/vi/eIrMbAQSU34/hqdefault.jpg'
        },
        {
          id: 'r1_v2',
          title: 'Java Programming for Beginners Full Course',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=A74TOX803D0',
          duration_hours: 3.5,
          difficulty: 'Beginner',
          provider: 'freeCodeCamp.org',
          description: 'Comprehensive beginner course covering Java fundamentals, operators, conditional branching, loops, and methods.',
          skill_name: 'Programming Fundamentals',
          thumbnail_url: 'https://img.youtube.com/vi/A74TOX803D0/hqdefault.jpg'
        },
        {
          id: 'r1_d1',
          title: 'Oracle Java Language Basics & Syntax',
          type: 'Official Documentation',
          url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html',
          duration_hours: 3.5,
          difficulty: 'Beginner',
          provider: 'Oracle Java Documentation',
          description: 'Official Oracle guide covering Java variables, primitive data types, operators, expressions, control flow, and arrays.',
          skill_name: 'Programming Fundamentals'
        },
        {
          id: 'r1_d2',
          title: 'Oracle Java Control Flow Statements Guide',
          type: 'Official Documentation',
          url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html',
          duration_hours: 2.5,
          difficulty: 'Beginner',
          provider: 'Oracle Java Documentation',
          description: 'Official Oracle reference for if-then-else, switch, while, do-while, and for loop control statements in Java.',
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
          id: 'r2_doc',
          title: 'PostgreSQL SQL Language Official Tutorial',
          type: 'Official Documentation',
          url: 'https://www.postgresql.org/docs/current/tutorial-sql.html',
          duration_hours: 4.0,
          difficulty: 'Beginner to Intermediate',
          provider: 'PostgreSQL Official Documentation',
          description: 'Official tutorial on SQL commands: SELECT, INSERT, UPDATE, DELETE, multi-table JOINs, foreign keys, and transactions.',
          skill_name: 'SQL & Relational Databases'
        },
        {
          id: 'r2_vid',
          title: 'SQL & Database Design Full Course',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
          duration_hours: 4.0,
          difficulty: 'Beginner',
          provider: 'YouTube (freeCodeCamp)',
          description: 'Complete database course introducing relational database design, ER diagrams, SQL queries, indexes, and normalization.',
          skill_name: 'SQL & Relational Databases',
          thumbnail_url: 'https://img.youtube.com/vi/qw--VYLpxG4/hqdefault.jpg'
        },
        {
          id: 'r2_ext',
          title: 'W3Schools SQL Tutorial & Reference',
          type: 'Additional Resource',
          url: 'https://www.w3schools.com/sql/',
          duration_hours: 3.0,
          difficulty: 'Beginner',
          provider: 'W3Schools',
          description: 'Interactive SQL reference with live code editor covering query syntax, table constraints, aggregation functions, and subqueries.',
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
          id: 'r3_doc',
          title: 'Oracle Java Object-Oriented Programming Concepts',
          type: 'Official Documentation',
          url: 'https://docs.oracle.com/javase/tutorial/java/concepts/index.html',
          duration_hours: 4.0,
          difficulty: 'Beginner to Intermediate',
          provider: 'Oracle Java Documentation',
          description: 'Official Java documentation on classes, objects, interfaces, inheritance, polymorphism, encapsulation, and packages.',
          skill_name: 'Java Basics & OOP'
        },
        {
          id: 'r3_vid',
          title: 'Java Object Oriented Programming (OOP) - Full Course',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=grEKMHGYyns',
          duration_hours: 3.5,
          difficulty: 'Beginner to Intermediate',
          provider: 'YouTube (freeCodeCamp)',
          description: 'Master OOP in Java: constructors, method overloading vs overriding, abstract classes, interfaces, and access modifiers.',
          skill_name: 'Java Basics & OOP',
          thumbnail_url: 'https://img.youtube.com/vi/grEKMHGYyns/hqdefault.jpg'
        },
        {
          id: 'r3_ext',
          title: 'Dev.java Official OOP Tutorials',
          type: 'Additional Resource',
          url: 'https://dev.java/learn/oop/',
          duration_hours: 3.0,
          difficulty: 'Beginner to Intermediate',
          provider: 'Oracle Dev.java Portal',
          description: 'Modern tutorial from Oracle engineers covering class design, records, sealed classes, interfaces, and clean code principles.',
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
      resources: [
        {
          id: 'r4_doc',
          title: 'Oracle Java Collections Framework & Exceptions Trail',
          type: 'Official Documentation',
          url: 'https://docs.oracle.com/javase/tutorial/collections/index.html',
          duration_hours: 4.5,
          difficulty: 'Intermediate',
          provider: 'Oracle Java Documentation',
          description: 'Official documentation for List, Set, Map interfaces, ArrayList, HashMap, Streams API, try-catch-finally, and custom exceptions.',
          skill_name: 'Java Collections & Exception Handling'
        },
        {
          id: 'r4_vid',
          title: 'Java Collections Framework & Streams Tutorial',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=viTHc_4XfCA',
          duration_hours: 3.5,
          difficulty: 'Intermediate',
          provider: 'YouTube (Amigoscode)',
          description: 'In-depth visual walkthrough of Java collections data structures, lambda expressions, Streams API filter/map, and error handling.',
          skill_name: 'Java Collections & Exception Handling',
          thumbnail_url: 'https://img.youtube.com/vi/viTHc_4XfCA/hqdefault.jpg'
        },
        {
          id: 'r4_ext',
          title: 'Dev.java Collections & Streams Guide',
          type: 'Additional Resource',
          url: 'https://dev.java/learn/api/collections/',
          duration_hours: 3.0,
          difficulty: 'Intermediate',
          provider: 'Oracle Dev.java Portal',
          description: 'Comprehensive guide on picking optimal data structures, collection operations, functional programming, and try-with-resources.',
          skill_name: 'Java Collections & Exception Handling'
        }
      ]
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
      resources: [
        {
          id: 'r5_doc',
          title: 'Spring Boot Reference Documentation',
          type: 'Official Documentation',
          url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/',
          duration_hours: 5.0,
          difficulty: 'Intermediate',
          provider: 'Spring Official Documentation',
          description: 'Authoritative documentation for Spring Boot 3 auto-configuration, starters, application properties, actuators, and profile management.',
          skill_name: 'Spring Boot & Dependency Injection'
        },
        {
          id: 'r5_vid',
          title: 'Spring Boot 3 Full Course - Build Microservices',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=9SGDpanrc8U',
          duration_hours: 4.5,
          difficulty: 'Intermediate',
          provider: 'YouTube (Amigoscode)',
          description: 'Complete production tutorial building Spring Boot REST microservices from scratch with Spring Data JPA and PostgreSQL.',
          skill_name: 'Spring Boot & Dependency Injection',
          thumbnail_url: 'https://img.youtube.com/vi/9SGDpanrc8U/hqdefault.jpg'
        },
        {
          id: 'r5_ext',
          title: 'Spring.io Official Guide - Building an Application with Spring Boot',
          type: 'Additional Resource',
          url: 'https://spring.io/guides/gs/spring-boot/',
          duration_hours: 2.5,
          difficulty: 'Intermediate',
          provider: 'Spring.io Official Guides',
          description: 'Official getting started guide detailing Spring Initializr, executable JAR packaging, embedded Tomcat server, and REST endpoints.',
          skill_name: 'Spring Boot & Dependency Injection'
        }
      ]
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
      resources: [
        {
          id: 'r6_doc',
          title: 'Spring MVC REST Web Services Documentation',
          type: 'Official Documentation',
          url: 'https://docs.spring.io/spring-framework/reference/web/webmvc.html',
          duration_hours: 4.0,
          difficulty: 'Intermediate',
          provider: 'Spring Official Documentation',
          description: 'Official Spring Web MVC documentation covering @RestController, @GetMapping, @PostMapping, DTO serialization, and HTTP response codes.',
          skill_name: 'RESTful API Architecture'
        },
        {
          id: 'r6_vid',
          title: 'Building RESTful Web Services with Spring Boot',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=lsMQRaeKNDk',
          duration_hours: 3.5,
          difficulty: 'Intermediate',
          provider: 'YouTube (in28minutes)',
          description: 'Learn RESTful principles, URI design, Jackson JSON parsing, global exception handling (@ControllerAdvice), and Swagger OpenAPI docs.',
          skill_name: 'RESTful API Architecture',
          thumbnail_url: 'https://img.youtube.com/vi/lsMQRaeKNDk/hqdefault.jpg'
        },
        {
          id: 'r6_ext',
          title: 'Spring.io Official Guide - Building a RESTful Web Service',
          type: 'Additional Resource',
          url: 'https://spring.io/guides/gs/rest-service/',
          duration_hours: 2.5,
          difficulty: 'Intermediate',
          provider: 'Spring.io Official Guides',
          description: 'Official tutorial for exposing REST endpoints, managing HTTP request body/params, and configuring JSON representations.',
          skill_name: 'RESTful API Architecture'
        }
      ]
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
      resources: [
        {
          id: 'r7_doc',
          title: 'Spring Security Reference Documentation',
          type: 'Official Documentation',
          url: 'https://docs.spring.io/spring-security/reference/index.html',
          duration_hours: 4.5,
          difficulty: 'Advanced',
          provider: 'Spring Official Documentation',
          description: 'Official reference for Spring Security 6: SecurityFilterChain, UserDetailsService, BCrypt password hashing, and stateless JWT filters.',
          skill_name: 'Security & JWT Authentication'
        },
        {
          id: 'r7_vid',
          title: 'Spring Security 6 & JWT Token Authentication Tutorial',
          type: 'Video Resource',
          url: 'https://www.youtube.com/watch?v=HER3b2r1E5M',
          duration_hours: 4.0,
          difficulty: 'Advanced',
          provider: 'YouTube (Bouali Ali)',
          description: 'Full step-by-step implementation of JWT user registration, login, token generation, authorization headers, and protected routes.',
          skill_name: 'Security & JWT Authentication',
          thumbnail_url: 'https://img.youtube.com/vi/HER3b2r1E5M/hqdefault.jpg'
        },
        {
          id: 'r7_ext',
          title: 'Spring.io Official Guide - Securing a Web Application',
          type: 'Additional Resource',
          url: 'https://spring.io/guides/gs/securing-web/',
          duration_hours: 2.5,
          difficulty: 'Advanced',
          provider: 'Spring.io Official Guides',
          description: 'Official walkthrough configuring security rules, form login, logout handlers, and role-based endpoint permissions.',
          skill_name: 'Security & JWT Authentication'
        }
      ]
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
