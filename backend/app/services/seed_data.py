from typing import Dict, List, Any

# Map stable enum identifiers to role definitions
PATH_TO_ROLE_MAP: Dict[str, str] = {
    "C": "C Systems Programming",
    "CPP": "C++ Systems & Applications",
    "FULL_STACK_JAVA": "Full Stack Java Roadmap",
    "FULL_STACK_PYTHON": "Full Stack Python Roadmap",
}

ROLE_TO_PATH_MAP: Dict[str, str] = {
    "C Systems Programming": "C",
    "C Programming": "C",
    "C": "C",
    "C++ Systems & Applications": "CPP",
    "C++": "CPP",
    "CPP": "CPP",
    "Full Stack Java Roadmap": "FULL_STACK_JAVA",
    "Java Backend Developer": "FULL_STACK_JAVA",
    "FULL_STACK_JAVA": "FULL_STACK_JAVA",
    "Full Stack Python Roadmap": "FULL_STACK_PYTHON",
    "Full-Stack Web Developer": "FULL_STACK_PYTHON",
    "FULL_STACK_PYTHON": "FULL_STACK_PYTHON",
    "AI & Data Science Engineer": "FULL_STACK_PYTHON",
}

TARGET_ROLES_DATABASE: Dict[str, Dict[str, Any]] = {
    "C Systems Programming": {
        "title": "C Systems Programming",
        "description": "Master low-level systems programming: Fundamentals, Control Flow, Functions, Arrays/Strings, Pointers, Structures, Dynamic Memory, File Handling, Data Structures, and Capstone Projects.",
        "skills": [
            {"skill_name": "C Fundamentals & Syntax", "category": "Core", "required_score": 90, "importance": "Critical", "prerequisites": []},
            {"skill_name": "Control Flow & Decision Making", "category": "Core", "required_score": 90, "importance": "Critical", "prerequisites": ["C Fundamentals & Syntax"]},
            {"skill_name": "C Functions & Modular Programming", "category": "Core", "required_score": 85, "importance": "Critical", "prerequisites": ["Control Flow & Decision Making"]},
            {"skill_name": "Arrays & Strings in C", "category": "Core", "required_score": 85, "importance": "Critical", "prerequisites": ["C Functions & Modular Programming"]},
            {"skill_name": "Pointers & Memory Allocation", "category": "Core", "required_score": 90, "importance": "Critical", "prerequisites": ["Arrays & Strings in C"]},
            {"skill_name": "Structures, Unions & Enums", "category": "Core", "required_score": 85, "importance": "Critical", "prerequisites": ["Pointers & Memory Allocation"]},
            {"skill_name": "Dynamic Memory Allocation (malloc/free)", "category": "Systems", "required_score": 85, "importance": "Critical", "prerequisites": ["Structures, Unions & Enums"]},
            {"skill_name": "File Handling & Streams in C", "category": "Systems", "required_score": 80, "importance": "Important", "prerequisites": ["Dynamic Memory Allocation (malloc/free)"]},
            {"skill_name": "Data Structures in C (Linked Lists, Trees)", "category": "Algorithms", "required_score": 85, "importance": "Critical", "prerequisites": ["File Handling & Streams in C"]},
            {"skill_name": "C Systems Projects & Capstone", "category": "Projects", "required_score": 80, "importance": "Important", "prerequisites": ["Data Structures in C (Linked Lists, Trees)"]}
        ]
    },
    "C++ Systems & Applications": {
        "title": "C++ Systems & Applications",
        "description": "Master modern C++ engineering: Fundamentals, OOP, STL, Advanced C++, Data Structures & Algorithms (DSA), and Capstone Projects.",
        "skills": [
            {"skill_name": "C++ Fundamentals & Types", "category": "Core", "required_score": 90, "importance": "Critical", "prerequisites": []},
            {"skill_name": "Object-Oriented Programming in C++", "category": "OOP", "required_score": 90, "importance": "Critical", "prerequisites": ["C++ Fundamentals & Types"]},
            {"skill_name": "Standard Template Library (STL) Containers & Iterators", "category": "STL", "required_score": 85, "importance": "Critical", "prerequisites": ["Object-Oriented Programming in C++"]},
            {"skill_name": "Advanced C++ (Templates & Smart Pointers)", "category": "Advanced", "required_score": 85, "importance": "Critical", "prerequisites": ["Standard Template Library (STL) Containers & Iterators"]},
            {"skill_name": "Data Structures & Algorithms (DSA in C++)", "category": "DSA", "required_score": 85, "importance": "Critical", "prerequisites": ["Advanced C++ (Templates & Smart Pointers)"]},
            {"skill_name": "Modern C++ Capstone Projects", "category": "Projects", "required_score": 80, "importance": "Important", "prerequisites": ["Data Structures & Algorithms (DSA in C++)"]}
        ]
    },
    "Full Stack Java Roadmap": {
        "title": "Full Stack Java Roadmap",
        "description": "Designs, develops, and maintains server-side web applications, REST microservices, and database systems using Java & Spring Ecosystem alongside Next.js.",
        "skills": [
            {"skill_name": "Programming Fundamentals", "category": "Core", "required_score": 90, "importance": "Critical", "prerequisites": []},
            {"skill_name": "Java Basics & OOP", "category": "Languages", "required_score": 85, "importance": "Critical", "prerequisites": ["Programming Fundamentals"]},
            {"skill_name": "Java Collections & Exception Handling", "category": "Languages", "required_score": 85, "importance": "Critical", "prerequisites": ["Java Basics & OOP"]},
            {"skill_name": "SQL & Relational Databases", "category": "Databases", "required_score": 80, "importance": "Critical", "prerequisites": []},
            {"skill_name": "JDBC & ORM Hibernate", "category": "Backend", "required_score": 75, "importance": "Important", "prerequisites": ["Java Collections & Exception Handling", "SQL & Relational Databases"]},
            {"skill_name": "Spring Framework & Core", "category": "Frameworks", "required_score": 80, "importance": "Critical", "prerequisites": ["JDBC & ORM Hibernate"]},
            {"skill_name": "Spring Boot & Dependency Injection", "category": "Frameworks", "required_score": 85, "importance": "Critical", "prerequisites": ["Spring Framework & Core"]},
            {"skill_name": "RESTful API Architecture", "category": "Architecture", "required_score": 85, "importance": "Critical", "prerequisites": ["Spring Boot & Dependency Injection"]},
            {"skill_name": "Security & JWT Authentication", "category": "Security", "required_score": 75, "importance": "Important", "prerequisites": ["RESTful API Architecture"]},
            {"skill_name": "Testing (JUnit & Mockito)", "category": "Quality", "required_score": 70, "importance": "Important", "prerequisites": ["Spring Boot & Dependency Injection"]},
            {"skill_name": "Git & Version Control", "category": "DevOps", "required_score": 75, "importance": "Important", "prerequisites": []},
            {"skill_name": "Docker & Microservices", "category": "Cloud/DevOps", "required_score": 70, "importance": "Helpful", "prerequisites": ["RESTful API Architecture", "Git & Version Control"]}
        ]
    },
    "Java Backend Developer": {
        "title": "Full Stack Java Roadmap",
        "description": "Designs, develops, and maintains server-side web applications, REST microservices, and database systems using Java & Spring Ecosystem.",
        "skills": [
            {"skill_name": "Programming Fundamentals", "category": "Core", "required_score": 90, "importance": "Critical", "prerequisites": []},
            {"skill_name": "Java Basics & OOP", "category": "Languages", "required_score": 85, "importance": "Critical", "prerequisites": ["Programming Fundamentals"]},
            {"skill_name": "Java Collections & Exception Handling", "category": "Languages", "required_score": 85, "importance": "Critical", "prerequisites": ["Java Basics & OOP"]},
            {"skill_name": "SQL & Relational Databases", "category": "Databases", "required_score": 80, "importance": "Critical", "prerequisites": []},
            {"skill_name": "JDBC & ORM Hibernate", "category": "Backend", "required_score": 75, "importance": "Important", "prerequisites": ["Java Collections & Exception Handling", "SQL & Relational Databases"]},
            {"skill_name": "Spring Framework & Core", "category": "Frameworks", "required_score": 80, "importance": "Critical", "prerequisites": ["JDBC & ORM Hibernate"]},
            {"skill_name": "Spring Boot & Dependency Injection", "category": "Frameworks", "required_score": 85, "importance": "Critical", "prerequisites": ["Spring Framework & Core"]},
            {"skill_name": "RESTful API Architecture", "category": "Architecture", "required_score": 85, "importance": "Critical", "prerequisites": ["Spring Boot & Dependency Injection"]},
            {"skill_name": "Security & JWT Authentication", "category": "Security", "required_score": 75, "importance": "Important", "prerequisites": ["RESTful API Architecture"]},
            {"skill_name": "Testing (JUnit & Mockito)", "category": "Quality", "required_score": 70, "importance": "Important", "prerequisites": ["Spring Boot & Dependency Injection"]},
            {"skill_name": "Git & Version Control", "category": "DevOps", "required_score": 75, "importance": "Important", "prerequisites": []},
            {"skill_name": "Docker & Microservices", "category": "Cloud/DevOps", "required_score": 70, "importance": "Helpful", "prerequisites": ["RESTful API Architecture", "Git & Version Control"]}
        ]
    },
    "Full Stack Python Roadmap": {
        "title": "Full Stack Python Roadmap",
        "description": "Master full stack Python development: Python → OOP → HTML/CSS → JavaScript → React → FastAPI → PostgreSQL → SQLAlchemy → JWT → Testing → Docker/Deployment → Projects.",
        "skills": [
            {"skill_name": "Python Programming Fundamentals", "category": "Languages", "required_score": 90, "importance": "Critical", "prerequisites": []},
            {"skill_name": "Python Object-Oriented Programming (OOP)", "category": "Languages", "required_score": 85, "importance": "Critical", "prerequisites": ["Python Programming Fundamentals"]},
            {"skill_name": "HTML5 & CSS3 Responsive Layouts", "category": "Frontend", "required_score": 85, "importance": "Critical", "prerequisites": ["Python Object-Oriented Programming (OOP)"]},
            {"skill_name": "JavaScript ES6+ Fundamentals", "category": "Frontend", "required_score": 85, "importance": "Critical", "prerequisites": ["HTML5 & CSS3 Responsive Layouts"]},
            {"skill_name": "React & Next.js Frontend Integration", "category": "Frontend", "required_score": 85, "importance": "Critical", "prerequisites": ["JavaScript ES6+ Fundamentals"]},
            {"skill_name": "FastAPI & Async Web Development", "category": "Frameworks", "required_score": 85, "importance": "Critical", "prerequisites": ["React & Next.js Frontend Integration"]},
            {"skill_name": "PostgreSQL Database Design & Queries", "category": "Databases", "required_score": 80, "importance": "Critical", "prerequisites": ["FastAPI & Async Web Development"]},
            {"skill_name": "SQLAlchemy ORM & Alembic Migrations", "category": "Backend", "required_score": 80, "importance": "Important", "prerequisites": ["PostgreSQL Database Design & Queries"]},
            {"skill_name": "JWT Authentication & Security in Python", "category": "Security", "required_score": 80, "importance": "Critical", "prerequisites": ["SQLAlchemy ORM & Alembic Migrations"]},
            {"skill_name": "Pytest & Backend Test Automation", "category": "Quality", "required_score": 75, "importance": "Important", "prerequisites": ["JWT Authentication & Security in Python"]},
            {"skill_name": "Docker Containerization & Cloud Deployment", "category": "DevOps", "required_score": 70, "importance": "Helpful", "prerequisites": ["Pytest & Backend Test Automation"]},
            {"skill_name": "Full Stack Python Capstone Projects", "category": "Projects", "required_score": 80, "importance": "Important", "prerequisites": ["Docker Containerization & Cloud Deployment"]}
        ]
    }
}

LEARNING_RESOURCES_DATABASE: List[Dict[str, Any]] = [
    # C Resources
    {
        "id": "res_c_1",
        "skill_name": "C Fundamentals & Syntax",
        "title": "C Programming Language Fundamentals & Compilers",
        "type": "Video & Hands-on Code",
        "url": "https://en.cppreference.com/w/c",
        "duration_hours": 5.0,
        "difficulty": "Beginner",
        "provider": "Harvard CS50 / CppReference",
        "description": "Master data types, loops, conditionals, functions, arrays, and standard libraries in C."
    },
    {
        "id": "res_c_2",
        "skill_name": "Pointers & Memory Allocation",
        "title": "Deep Dive into Pointers, Addresses, and Dynamic Memory (malloc/free)",
        "type": "Interactive Coding",
        "url": "https://www.learn-c.org/",
        "duration_hours": 8.0,
        "difficulty": "Intermediate",
        "provider": "MIT Systems Curriculum",
        "description": "Understand stack vs heap, pointer arithmetic, double pointers, and memory leaks prevention."
    },
    {
        "id": "res_c_3",
        "skill_name": "Structures, Unions & Enums",
        "title": "Custom Data Types & Memory Layout in C",
        "type": "Documentation & Hands-on Code",
        "url": "https://en.cppreference.com/w/c/language/struct",
        "duration_hours": 4.5,
        "difficulty": "Beginner to Intermediate",
        "provider": "TutorialsPoint / GeeksForGeeks",
        "description": "Learn memory alignment, padding, typedefs, bit fields, and struct pointers."
    },
    {
        "id": "res_c_4",
        "skill_name": "Data Structures in C (Linked Lists, Trees)",
        "title": "Implementing Core Data Structures from Scratch in C",
        "type": "Hands-on Project",
        "url": "https://github.com/the-algorithms/C",
        "duration_hours": 10.0,
        "difficulty": "Intermediate",
        "provider": "Open Data Structures in C",
        "description": "Build single/doubly linked lists, binary search trees, hash tables, and queues in pure C."
    },

    # C++ Resources
    {
        "id": "res_cpp_1",
        "skill_name": "C++ Fundamentals & Types",
        "title": "Modern C++ Primer & Syntax",
        "type": "Video & Code",
        "url": "https://en.cppreference.com/w/cpp",
        "duration_hours": 6.0,
        "difficulty": "Beginner",
        "provider": "LearnCpp.com",
        "description": "Core syntax, references vs pointers, const correctness, namespaces, and auto typing."
    },
    {
        "id": "res_cpp_2",
        "skill_name": "Object-Oriented Programming in C++",
        "title": "Classes, Polymorphism, Virtual Tables & Inheritance in C++",
        "type": "Interactive Coding",
        "url": "https://www.learncpp.com/cpp-tutorial/classes-and-class-members/",
        "duration_hours": 7.5,
        "difficulty": "Intermediate",
        "provider": "Bjarne Stroustrup Modern C++",
        "description": "Master encapsulation, constructors/destructors, virtual functions, and abstract interfaces."
    },
    {
        "id": "res_cpp_3",
        "skill_name": "RAII & Smart Pointers (unique_ptr, shared_ptr)",
        "title": "Resource Acquisition Is Initialization (RAII) & Smart Pointers",
        "type": "Hands-on Project",
        "url": "https://en.cppreference.com/w/cpp/memory",
        "duration_hours": 5.0,
        "difficulty": "Intermediate to Advanced",
        "provider": "CppCon Talks",
        "description": "Eliminate raw memory leaks with std::unique_ptr, std::shared_ptr, and custom deleters."
    },
    {
        "id": "res_cpp_4",
        "skill_name": "Standard Template Library (STL) Containers & Iterators",
        "title": "Mastering std::vector, std::map, std::unordered_map & Algorithms",
        "type": "Interactive Coding",
        "url": "https://en.cppreference.com/w/cpp/container",
        "duration_hours": 8.0,
        "difficulty": "Intermediate",
        "provider": "LeetCode STL Practice",
        "description": "Efficient utilization of C++ standard algorithms, iterators, lambdas, and container benchmarks."
    },

    # Java & Backend
    {
        "id": "res_java_1",
        "skill_name": "Java Basics & OOP",
        "title": "Java Programming Fundamentals & Object-Oriented Blueprint",
        "type": "Video & Hands-on Code",
        "url": "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/",
        "duration_hours": 6.5,
        "difficulty": "Beginner",
        "provider": "MIT OpenCourseWare & Coursera",
        "description": "Master variables, control flow, classes, inheritance, polymorphism, and encapsulation in modern Java."
    },
    {
        "id": "res_java_2",
        "skill_name": "Java Collections & Exception Handling",
        "title": "Mastering Java Collections Framework & Robust Error Handling",
        "type": "Interactive Coding",
        "url": "https://docs.oracle.com/javase/tutorial/collections/",
        "duration_hours": 5.0,
        "difficulty": "Intermediate",
        "provider": "Oracle Java Documentation & Exercism",
        "description": "Deep dive into ArrayList, HashMap, HashSet, Streams API, and try-with-resources error handling."
    },
    {
        "id": "res_sql_1",
        "skill_name": "SQL & Relational Databases",
        "title": "PostgreSQL & Relational Database Masterclass",
        "type": "Hands-on Project",
        "url": "https://www.postgresql.org/docs/",
        "duration_hours": 8.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "PostgreSQL Official Docs & LeetCode DB",
        "description": "Design relational schemas, write complex JOINs, indexes, aggregation, and subqueries."
    },
    {
        "id": "res_spring_1",
        "skill_name": "Spring Boot & Dependency Injection",
        "title": "Spring Boot 3 Enterprise Microservices Core",
        "type": "Hands-on Project",
        "url": "https://spring.io/guides/gs/spring-boot/",
        "duration_hours": 12.0,
        "difficulty": "Intermediate",
        "provider": "Spring Academy & Baeldung",
        "description": "Build production-grade Java microservices with Spring Boot DI, auto-configuration, and application properties."
    },
    {
        "id": "res_rest_1",
        "skill_name": "RESTful API Architecture",
        "title": "Building Production REST APIs with Spring MVC",
        "type": "Project & Documentation",
        "url": "https://restfulapi.net/",
        "duration_hours": 7.0,
        "difficulty": "Intermediate",
        "provider": "Baeldung REST Series",
        "description": "Design clean RESTful controllers, DTOs, HTTP status codes, Swagger documentation, and error handling."
    },
    {
        "id": "res_jwt_1",
        "skill_name": "Security & JWT Authentication",
        "title": "Spring Security 6 with OAuth2 & JWT Tokens",
        "type": "Hands-on Coding",
        "url": "https://spring.io/projects/spring-security",
        "duration_hours": 6.0,
        "difficulty": "Advanced",
        "provider": "Udemy Enterprise Security",
        "description": "Implement stateless JWT user authentication, password hashing, and role-based endpoints."
    },
    {
        "id": "res_docker_1",
        "skill_name": "Docker & Microservices",
        "title": "Containerizing Backend Services with Docker & Compose",
        "type": "Interactive Practice",
        "url": "https://docs.docker.com/get-started/",
        "duration_hours": 5.5,
        "difficulty": "Intermediate",
        "provider": "Docker Labs",
        "description": "Write multi-stage Dockerfiles and compose setups to deploy Java apps alongside PostgreSQL."
    },

    # Python Resources
    {
        "id": "res_py_1",
        "skill_name": "Python Programming Fundamentals",
        "title": "Python 3 Core Syntax, Data Structures & Best Practices",
        "type": "Video & Code",
        "url": "https://docs.python.org/3/tutorial/",
        "duration_hours": 6.0,
        "difficulty": "Beginner",
        "provider": "Python Official Tutorial",
        "description": "Lists, dicts, tuples, list comprehensions, generators, and exception handling in Python."
    },
    {
        "id": "res_py_2",
        "skill_name": "FastAPI & Async Web Development",
        "title": "Building High-Performance APIs with FastAPI & Pydantic",
        "type": "Hands-on Project",
        "url": "https://fastapi.tiangolo.com/",
        "duration_hours": 9.0,
        "difficulty": "Intermediate",
        "provider": "FastAPI Official Documentation",
        "description": "Async endpoints, dependency injection, automatic OpenAPI docs, and request validation."
    },
    {
        "id": "res_py_3",
        "skill_name": "SQLAlchemy ORM & Alembic Migrations",
        "title": "Relational Database Modelling with SQLAlchemy 2.0",
        "type": "Interactive Practice",
        "url": "https://docs.sqlalchemy.org/en/20/",
        "duration_hours": 7.0,
        "difficulty": "Intermediate",
        "provider": "SQLAlchemy Docs",
        "description": "Declarative base models, relationships, session management, and migrations with Alembic."
    },
    {
        "id": "res_py_4",
        "skill_name": "JWT Authentication & Security in Python",
        "title": "Securing FastAPI Endpoints with Passlib and Python-JOSE",
        "type": "Hands-on Code",
        "url": "https://fastapi.tiangolo.com/tutorial/security/",
        "duration_hours": 5.0,
        "difficulty": "Intermediate",
        "provider": "FastAPI Security Guide",
        "description": "OAuth2 password bearer flow, token verification, HttpOnly cookies, and hashing."
    }
]

ASSESSMENTS_DATABASE: Dict[str, Dict[str, Any]] = {
    "C Fundamentals & Syntax": {
        "id": "quiz_c_fundamentals",
        "skill_name": "C Fundamentals & Syntax",
        "title": "C Syntax & Data Types Assessment",
        "difficulty": "Beginner",
        "questions": [
            {
                "id": "cq1",
                "question": "What is the return type of the main function in standard C?",
                "options": ["void", "int", "char", "float"],
                "correct_option_index": 1,
                "explanation": "Standard C requires main() to return int representing exit status code."
            },
            {
                "id": "cq2",
                "question": "Which operator is used to get the memory address of a variable in C?",
                "options": ["*", "&", "->", "%"],
                "correct_option_index": 1,
                "explanation": "The & (ampersand) operator returns the address of a variable."
            }
        ]
    },
    "Pointers & Memory Allocation": {
        "id": "quiz_c_pointers",
        "skill_name": "Pointers & Memory Allocation",
        "title": "C Pointers and Dynamic Memory Assessment",
        "difficulty": "Intermediate",
        "questions": [
            {
                "id": "cpq1",
                "question": "What function in standard C frees dynamically allocated memory on the heap?",
                "options": ["delete()", "free()", "dealloc()", "release()"],
                "correct_option_index": 1,
                "explanation": "free() is the standard C function to release heap memory allocated via malloc or calloc."
            }
        ]
    },
    "C++ Fundamentals & Types": {
        "id": "quiz_cpp_fundamentals",
        "skill_name": "C++ Fundamentals & Types",
        "title": "Modern C++ Core Assessment",
        "difficulty": "Beginner",
        "questions": [
            {
                "id": "cppq1",
                "question": "Which keyword in C++11 enables automatic type deduction?",
                "options": ["var", "auto", "typeof", "dynamic"],
                "correct_option_index": 1,
                "explanation": "The 'auto' keyword instructs the compiler to deduce the variable type from its initialization expression."
            }
        ]
    },
    "Java Basics & OOP": {
        "id": "quiz_java_oop",
        "skill_name": "Java Basics & OOP",
        "title": "Java Object-Oriented Programming Assessment",
        "difficulty": "Intermediate",
        "questions": [
            {
                "id": "q1",
                "question": "Which OOP principle relies on hiding internal implementation details and exposing public interfaces?",
                "options": ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
                "correct_option_index": 1,
                "explanation": "Encapsulation keeps fields private and provides getter/setter methods to protect object state."
            },
            {
                "id": "q2",
                "question": "What happens if a Java class extends an abstract class without implementing all abstract methods?",
                "options": [
                    "The code compiles automatically with null defaults",
                    "The subclass must also be declared abstract or it fails to compile",
                    "A runtime Exception is thrown during object creation",
                    "Java converts the class into an interface"
                ],
                "correct_option_index": 1,
                "explanation": "Any concrete subclass extending an abstract class MUST implement all inherited abstract methods."
            }
        ]
    },
    "Spring Boot & Dependency Injection": {
        "id": "quiz_spring_boot",
        "skill_name": "Spring Boot & Dependency Injection",
        "title": "Spring Boot Architecture Assessment",
        "difficulty": "Intermediate",
        "questions": [
            {
                "id": "sq1",
                "question": "What annotation in Spring Boot combines @Configuration, @EnableAutoConfiguration, and @ComponentScan?",
                "options": ["@SpringBootApplication", "@Service", "@RestController", "@Bean"],
                "correct_option_index": 0,
                "explanation": "@SpringBootApplication is the primary composite annotation for bootstrapping Spring applications."
            }
        ]
    },
    "FastAPI & Async Web Development": {
        "id": "quiz_fastapi",
        "skill_name": "FastAPI & Async Web Development",
        "title": "FastAPI & Python Web Assessment",
        "difficulty": "Intermediate",
        "questions": [
            {
                "id": "fq1",
                "question": "Which library powers FastAPI's data validation and parsing?",
                "options": ["Marshmallow", "Pydantic", "Cerberus", "Schema"],
                "correct_option_index": 1,
                "explanation": "FastAPI uses Pydantic for data models, validation, and serialization."
            }
        ]
    }
}
