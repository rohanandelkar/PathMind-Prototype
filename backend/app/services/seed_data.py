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
    # ==========================================
    # 1. C PROGRAMMING ROADMAP (10 TOPICS)
    # ==========================================
    # Topic 1: C Fundamentals & Syntax
    {
        "id": "res_c_1_v1",
        "skill_name": "C Fundamentals & Syntax",
        "title": "C Programming Full Course for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=KJgsSFOSQv0",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "freeCodeCamp.org",
        "description": "Learn C programming basics, compiler setup, variables, printf/scanf functions, operators, and basic logic flow.",
        "thumbnail_url": "https://img.youtube.com/vi/KJgsSFOSQv0/hqdefault.jpg"
    },
    {
        "id": "res_c_1_v2",
        "skill_name": "C Fundamentals & Syntax",
        "title": "C Language Tutorial for Beginners (with Notes)",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=irqbmMNs2Bo",
        "duration_hours": 3.5,
        "difficulty": "Beginner",
        "provider": "CodeWithHarry",
        "description": "Comprehensive visual introduction to C syntax, structure, data types, tokens, constants, and compilation stages.",
        "thumbnail_url": "https://img.youtube.com/vi/irqbmMNs2Bo/hqdefault.jpg"
    },
    {
        "id": "res_c_1_d1",
        "skill_name": "C Fundamentals & Syntax",
        "title": "C Basic Concepts & Program Structure",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/basic_concepts",
        "duration_hours": 3.0,
        "difficulty": "Beginner",
        "provider": "C Language Reference (cppreference)",
        "description": "Official reference on standard C basic concepts, scope, translation units, main function signature, and keywords."
    },
    {
        "id": "res_c_1_d2",
        "skill_name": "C Fundamentals & Syntax",
        "title": "C Fundamental Data Types & Identifiers",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/types",
        "duration_hours": 2.5,
        "difficulty": "Beginner",
        "provider": "C Language Reference (cppreference)",
        "description": "Official reference covering signed/unsigned integer types, floating point representation, char types, and type specifiers."
    },

    # Topic 2: Control Flow & Decision Making
    {
        "id": "res_c_2_v1",
        "skill_name": "Control Flow & Decision Making",
        "title": "C Control Flow & Branching Statements Masterclass",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=87SH2Cn0s9A",
        "duration_hours": 2.5,
        "difficulty": "Beginner",
        "provider": "Neso Academy",
        "description": "Visual breakdown of if, if-else, nested conditionals, switch-case, and break/continue jump statements in C.",
        "thumbnail_url": "https://img.youtube.com/vi/87SH2Cn0s9A/hqdefault.jpg"
    },
    {
        "id": "res_c_2_v2",
        "skill_name": "Control Flow & Decision Making",
        "title": "Loops in C Programming - For, While, Do-While",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=1uR4tL-Zjg0",
        "duration_hours": 2.5,
        "difficulty": "Beginner",
        "provider": "Jenny's Lectures CS IT",
        "description": "In-depth guide on entry-controlled vs exit-controlled loops, infinite loops, and counter-driven iteration.",
        "thumbnail_url": "https://img.youtube.com/vi/1uR4tL-Zjg0/hqdefault.jpg"
    },
    {
        "id": "res_c_2_d1",
        "skill_name": "Control Flow & Decision Making",
        "title": "C Statements & Control Flow Reference",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/statements",
        "duration_hours": 3.0,
        "difficulty": "Beginner",
        "provider": "C Language Reference (cppreference)",
        "description": "Official specification of selection statements (if, switch) and iteration statements (for, while, do-while)."
    },
    {
        "id": "res_c_2_d2",
        "skill_name": "Control Flow & Decision Making",
        "title": "C Switch Statement Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/switch",
        "duration_hours": 2.0,
        "difficulty": "Beginner",
        "provider": "C Language Reference (cppreference)",
        "description": "Official documentation for C switch-case jump tables, case labels, fallthrough behavior, and default handlers."
    },

    # Topic 3: C Functions & Modular Programming
    {
        "id": "res_c_3_v1",
        "skill_name": "C Functions & Modular Programming",
        "title": "Functions & Header Files in C Programming",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=NpoJv2f2aLg",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Neso Academy",
        "description": "Comprehensive guide on modular code organization, function prototypes, header files (.h), and variable scopes.",
        "thumbnail_url": "https://img.youtube.com/vi/NpoJv2f2aLg/hqdefault.jpg"
    },
    {
        "id": "res_c_3_v2",
        "skill_name": "C Functions & Modular Programming",
        "title": "Recursion & Function Call Stack in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=m1F-qbgX_0g",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "mycodeschool",
        "description": "Visual explanation of stack frames, base cases, recursive function execution, and stack overflow prevention.",
        "thumbnail_url": "https://img.youtube.com/vi/m1F-qbgX_0g/hqdefault.jpg"
    },
    {
        "id": "res_c_3_d1",
        "skill_name": "C Functions & Modular Programming",
        "title": "C Function Declarations & Definitions",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/functions",
        "duration_hours": 3.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official specification for function prototypes, parameter lists, return types, and storage class specifiers."
    },
    {
        "id": "res_c_3_d2",
        "skill_name": "C Functions & Modular Programming",
        "title": "C Function Call & Argument Passing Reference",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/eval_order",
        "duration_hours": 2.0,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official documentation on evaluation order of function arguments, sequence points, and pass-by-value mechanisms."
    },

    # Topic 4: Arrays & Strings in C
    {
        "id": "res_c_4_v1",
        "skill_name": "Arrays & Strings in C",
        "title": "C Arrays & String Manipulation Complete Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=1uR4tL-Zjg0",
        "duration_hours": 3.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "Jenny's Lectures CS IT",
        "description": "Learn 1D and 2D array memory allocation, null-terminated character arrays, and string library functions.",
        "thumbnail_url": "https://img.youtube.com/vi/1uR4tL-Zjg0/hqdefault.jpg"
    },
    {
        "id": "res_c_4_v2",
        "skill_name": "Arrays & Strings in C",
        "title": "Strings in C Programming Explained",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=v2d2f70t0yE",
        "duration_hours": 2.5,
        "difficulty": "Beginner",
        "provider": "Neso Academy",
        "description": "Detailed video tutorial on string initialization, puts/gets, strlen, strcpy, strcmp, and memory safety.",
        "thumbnail_url": "https://img.youtube.com/vi/v2d2f70t0yE/hqdefault.jpg"
    },
    {
        "id": "res_c_4_d1",
        "skill_name": "Arrays & Strings in C",
        "title": "C Array Declarations & Memory Layout",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/array",
        "duration_hours": 3.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official standard documentation for single and multi-dimensional array types, element access, and pointer decay."
    },
    {
        "id": "res_c_4_d2",
        "skill_name": "Arrays & Strings in C",
        "title": "C Null-Terminated Byte String Library",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/string/byte",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official documentation for <string.h> functions: strlen, strcpy, strncpy, strcat, strcmp, and strchr."
    },

    # Topic 5: Pointers & Memory Allocation
    {
        "id": "res_c_5_v1",
        "skill_name": "Pointers & Memory Allocation",
        "title": "Pointers in C / C++ Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=zuegQmMdy8M",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "mycodeschool",
        "description": "World-class visual guide to memory addresses, dereference operator (*), pointer arithmetic, and double pointers.",
        "thumbnail_url": "https://img.youtube.com/vi/zuegQmMdy8M/hqdefault.jpg"
    },
    {
        "id": "res_c_5_v2",
        "skill_name": "Pointers & Memory Allocation",
        "title": "Pointers and Function Arguments in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=LW8Rfh6TzGg",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Neso Academy",
        "description": "Practical guide on passing pointers to functions (call-by-reference), function pointers, and void pointers.",
        "thumbnail_url": "https://img.youtube.com/vi/LW8Rfh6TzGg/hqdefault.jpg"
    },
    {
        "id": "res_c_5_d1",
        "skill_name": "Pointers & Memory Allocation",
        "title": "C Pointer Declarations & Indirection",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/pointer",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official specification of pointer types, address-of operator (&), dereference (*), and pointer compatibility rules."
    },
    {
        "id": "res_c_5_d2",
        "skill_name": "Pointers & Memory Allocation",
        "title": "C Pointer Arithmetic & Indexing Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/operator_arithmetic",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official specification of pointer addition, subtraction, pointer difference (ptrdiff_t), and array subscription."
    },

    # Topic 6: Structures, Unions & Enums
    {
        "id": "res_c_6_v1",
        "skill_name": "Structures, Unions & Enums",
        "title": "C Structures, Unions & Typedef Tutorial",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=o5X_Z2b8z0k",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Neso Academy",
        "description": "Detailed video tutorial covering struct initialization, nested structures, arrow operator (->), typedef, and bit fields.",
        "thumbnail_url": "https://img.youtube.com/vi/o5X_Z2b8z0k/hqdefault.jpg"
    },
    {
        "id": "res_c_6_v2",
        "skill_name": "Structures, Unions & Enums",
        "title": "Unions & Enumerations (enum) in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=7uVAKDbd8-g",
        "duration_hours": 2.0,
        "difficulty": "Intermediate",
        "provider": "Jenny's Lectures CS IT",
        "description": "Learn overlapping memory layout in unions, enum constants, and memory efficiency techniques.",
        "thumbnail_url": "https://img.youtube.com/vi/7uVAKDbd8-g/hqdefault.jpg"
    },
    {
        "id": "res_c_6_d1",
        "skill_name": "Structures, Unions & Enums",
        "title": "C Struct & Member Alignment Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/struct",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official documentation for defining user structures, memory alignment, padding bytes, and struct pointers."
    },
    {
        "id": "res_c_6_d2",
        "skill_name": "Structures, Unions & Enums",
        "title": "C Union Declaration & Memory Sharing",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/union",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official specification of union type declarations, active member access, and type punning guidelines."
    },

    # Topic 7: Dynamic Memory Allocation (malloc/free)
    {
        "id": "res_c_7_v1",
        "skill_name": "Dynamic Memory Allocation (malloc/free)",
        "title": "Dynamic Memory Allocation in C (malloc, calloc, realloc, free)",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=xa4ugmD_iK4",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "mycodeschool",
        "description": "Deep dive into heap memory allocation, memory leak detection, dangling pointers, and dynamic 2D arrays.",
        "thumbnail_url": "https://img.youtube.com/vi/xa4ugmD_iK4/hqdefault.jpg"
    },
    {
        "id": "res_c_7_v2",
        "skill_name": "Dynamic Memory Allocation (malloc/free)",
        "title": "Heap Memory vs Stack Memory in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=_8-ht2AKyH4",
        "duration_hours": 2.0,
        "difficulty": "Intermediate",
        "provider": "Neso Academy",
        "description": "Visual representation of OS memory layout, stack frames vs heap allocations, and free list managers.",
        "thumbnail_url": "https://img.youtube.com/vi/_8-ht2AKyH4/hqdefault.jpg"
    },
    {
        "id": "res_c_7_d1",
        "skill_name": "Dynamic Memory Allocation (malloc/free)",
        "title": "C Standard Dynamic Memory Functions",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/memory",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official standard specifications for stdlib memory functions: malloc, calloc, realloc, free, and memory safety rules."
    },
    {
        "id": "res_c_7_d2",
        "skill_name": "Dynamic Memory Allocation (malloc/free)",
        "title": "C malloc() Function Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/memory/malloc",
        "duration_hours": 2.0,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official reference for malloc parameter size_t, alignment guarantees, return pointer verification, and NULL handling."
    },

    # Topic 8: File Handling & Streams in C
    {
        "id": "res_c_8_v1",
        "skill_name": "File Handling & Streams in C",
        "title": "File I/O in C - Reading and Writing Files",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=b4b8k8p4k1k",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Neso Academy",
        "description": "Comprehensive tutorial on text vs binary files, file modes (r, w, a, r+), buffer management, and error handling.",
        "thumbnail_url": "https://img.youtube.com/vi/b4b8k8p4k1k/hqdefault.jpg"
    },
    {
        "id": "res_c_8_v2",
        "skill_name": "File Handling & Streams in C",
        "title": "Binary File Operations (fread, fwrite, fseek) in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=E-bBh-65tE0",
        "duration_hours": 2.0,
        "difficulty": "Intermediate",
        "provider": "Jenny's Lectures CS IT",
        "description": "Master reading/writing binary structures to disk, random access with fseek, ftell, and rewind.",
        "thumbnail_url": "https://img.youtube.com/vi/E-bBh-65tE0/hqdefault.jpg"
    },
    {
        "id": "res_c_8_d1",
        "skill_name": "File Handling & Streams in C",
        "title": "C Standard File Input/Output Library (<stdio.h>)",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/io",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official standard I/O library documentation for FILE*, fopen, fclose, fread, fwrite, fprintf, and fseek."
    },
    {
        "id": "res_c_8_d2",
        "skill_name": "File Handling & Streams in C",
        "title": "C fopen() File Opening Stream Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/io/fopen",
        "duration_hours": 2.0,
        "difficulty": "Intermediate",
        "provider": "C Language Reference (cppreference)",
        "description": "Official specification of file access modes (r, w, a, rb, wb, ab, r+), stream positioning, and errno error codes."
    },

    # Topic 9: Data Structures in C (Linked Lists, Trees)
    {
        "id": "res_c_9_v1",
        "skill_name": "Data Structures in C (Linked Lists, Trees)",
        "title": "Data Structures Easy to Advanced - Linked Lists & Trees in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=R9PTBwOzceo",
        "duration_hours": 5.0,
        "difficulty": "Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Full course implementing singly/doubly linked lists, stacks, queues, binary search trees, and heaps in pure C.",
        "thumbnail_url": "https://img.youtube.com/vi/R9PTBwOzceo/hqdefault.jpg"
    },
    {
        "id": "res_c_9_v2",
        "skill_name": "Data Structures in C (Linked Lists, Trees)",
        "title": "Linked List Implementation in C from Scratch",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=NobHlGUjV3g",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "mycodeschool",
        "description": "Step-by-step visual tutorial building dynamic nodes, head pointer management, node insertion, deletion, and reversal.",
        "thumbnail_url": "https://img.youtube.com/vi/NobHlGUjV3g/hqdefault.jpg"
    },
    {
        "id": "res_c_9_d1",
        "skill_name": "Data Structures in C (Linked Lists, Trees)",
        "title": "C Self-Referential Structures & Node Allocation",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/language/struct",
        "duration_hours": 3.5,
        "difficulty": "Intermediate to Advanced",
        "provider": "C Language Reference (cppreference)",
        "description": "Standard documentation for building self-referential struct node pointers for linked data structures in C."
    },
    {
        "id": "res_c_9_d2",
        "skill_name": "Data Structures in C (Linked Lists, Trees)",
        "title": "GNU C Data Structures & Algorithms Reference",
        "type": "Official Documentation",
        "url": "https://www.gnu.org/software/libc/manual/html_node/Searching-and-Sorting.html",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "GNU Project Documentation",
        "description": "Official GNU C library manual for standard search trees (tsearch, tfind, tdelete) and dynamic array sorting (qsort)."
    },

    # Topic 10: C Systems Projects & Capstone
    {
        "id": "res_c_10_v1",
        "skill_name": "C Systems Projects & Capstone",
        "title": "Build a Simple Shell in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=U3aXWizDbQ4",
        "duration_hours": 4.0,
        "difficulty": "Advanced",
        "provider": "Low Level Learning",
        "description": "Hands-on video walkthrough building a POSIX system shell, process management (fork, exec, wait), and CLI interface.",
        "thumbnail_url": "https://img.youtube.com/vi/U3aXWizDbQ4/hqdefault.jpg"
    },
    {
        "id": "res_c_10_v2",
        "skill_name": "C Systems Projects & Capstone",
        "title": "Writing a HTTP Web Server from Scratch in C",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=esXw4bMUkXU",
        "duration_hours": 3.5,
        "difficulty": "Advanced",
        "provider": "Jacob Sorber",
        "description": "Learn network socket programming, bind/listen/accept calls, parsing HTTP request headers, and sending responses in C.",
        "thumbnail_url": "https://img.youtube.com/vi/esXw4bMUkXU/hqdefault.jpg"
    },
    {
        "id": "res_c_10_d1",
        "skill_name": "C Systems Projects & Capstone",
        "title": "POSIX System Interfaces & Operating System Calling Conventions",
        "type": "Official Documentation",
        "url": "https://www.gnu.org/software/libc/manual/",
        "duration_hours": 4.0,
        "difficulty": "Advanced",
        "provider": "GNU C Library Reference Manual",
        "description": "Authoritative manual for POSIX low-level system calls, memory allocation internals, socket programming, and processes."
    },
    {
        "id": "res_c_10_d2",
        "skill_name": "C Systems Projects & Capstone",
        "title": "C Process Termination & Environment Reference",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/c/program",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "C Language Reference (cppreference)",
        "description": "Official documentation for program execution environment, system signals (<signal.h>), exit codes, and environment variables."
    },


    # ==========================================
    # 2. C++ SYSTEMS & APPLICATIONS (6 TOPICS)
    # ==========================================
    # Topic 1: C++ Fundamentals & Types
    {
        "id": "res_cpp_1_v1",
        "skill_name": "C++ Fundamentals & Types",
        "title": "C++ Tutorial for Beginners - Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=vLnPwxZdW4w",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "freeCodeCamp.org",
        "description": "Complete beginner course covering modern C++ setup, std::cout, variables, data types, strings, and functions.",
        "thumbnail_url": "https://img.youtube.com/vi/vLnPwxZdW4w/hqdefault.jpg"
    },
    {
        "id": "res_cpp_1_v2",
        "skill_name": "C++ Fundamentals & Types",
        "title": "C++ Programming Course for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=ZzaPdXTrSb8",
        "duration_hours": 3.5,
        "difficulty": "Beginner",
        "provider": "Programming with Mosh",
        "description": "Step-by-step introduction to C++ syntax, namespaces, auto type deduction, references vs pointers, and const correctness.",
        "thumbnail_url": "https://img.youtube.com/vi/ZzaPdXTrSb8/hqdefault.jpg"
    },
    {
        "id": "res_cpp_1_d1",
        "skill_name": "C++ Fundamentals & Types",
        "title": "C++ Fundamental Types Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/language/types",
        "duration_hours": 3.0,
        "difficulty": "Beginner",
        "provider": "C++ Reference (cppreference)",
        "description": "Official standard documentation for C++ fundamental types, integer types, floating point, boolean, and character types."
    },
    {
        "id": "res_cpp_1_d2",
        "skill_name": "C++ Fundamentals & Types",
        "title": "C++ References & Const Declarations",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/language/reference",
        "duration_hours": 2.5,
        "difficulty": "Beginner",
        "provider": "C++ Reference (cppreference)",
        "description": "Official reference on lvalue references (&), rvalue references (&&), const references, and reference initialization."
    },

    # Topic 2: Object-Oriented Programming in C++
    {
        "id": "res_cpp_2_v1",
        "skill_name": "Object-Oriented Programming in C++",
        "title": "Object Oriented Programming in C++ Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=wN0x9eZLup4",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "In-depth guide to encapsulation, abstraction, inheritance, polymorphism, and virtual function tables in modern C++.",
        "thumbnail_url": "https://img.youtube.com/vi/wN0x9eZLup4/hqdefault.jpg"
    },
    {
        "id": "res_cpp_2_v2",
        "skill_name": "Object-Oriented Programming in C++",
        "title": "C++ OOPs Tutorial - Classes, Constructors & Destructors",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=mlIUKyZIUUU",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Apna College",
        "description": "Complete breakdown of class member functions, access modifiers (public/private/protected), copy constructors, and vtables.",
        "thumbnail_url": "https://img.youtube.com/vi/mlIUKyZIUUU/hqdefault.jpg"
    },
    {
        "id": "res_cpp_2_d1",
        "skill_name": "Object-Oriented Programming in C++",
        "title": "C++ Classes & Object Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/language/classes",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "C++ Reference (cppreference)",
        "description": "Official C++ documentation on class syntax, access specifiers, constructors, destructors, virtual functions, and inheritance."
    },
    {
        "id": "res_cpp_2_d2",
        "skill_name": "Object-Oriented Programming in C++",
        "title": "C++ Derived Classes & Virtual Functions",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/language/derived_class",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "C++ Reference (cppreference)",
        "description": "Official specification of class inheritance, virtual function specifiers, override, final keywords, and abstract interfaces."
    },

    # Topic 3: Standard Template Library (STL) Containers & Iterators
    {
        "id": "res_cpp_3_v1",
        "skill_name": "Standard Template Library (STL) Containers & Iterators",
        "title": "C++ STL Complete Guide & Benchmarks",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=g-1cn3u3O44",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Luv",
        "description": "Comprehensive tutorial covering vector memory allocation, map vs unordered_map complexity, iterators, and STL algorithms.",
        "thumbnail_url": "https://img.youtube.com/vi/g-1cn3u3O44/hqdefault.jpg"
    },
    {
        "id": "res_cpp_3_v2",
        "skill_name": "Standard Template Library (STL) Containers & Iterators",
        "title": "C++ STL Tutorial - Vectors, Maps, Sets & Iterators",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=okhdtEk1iKk",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "take U forward",
        "description": "Learn standard container usage, time complexities, iterator mechanics, and common competitive programming STL patterns.",
        "thumbnail_url": "https://img.youtube.com/vi/okhdtEk1iKk/hqdefault.jpg"
    },
    {
        "id": "res_cpp_3_d1",
        "skill_name": "Standard Template Library (STL) Containers & Iterators",
        "title": "C++ Containers Library Documentation",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/container",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "C++ Reference (cppreference)",
        "description": "Authoritative documentation for std::vector, std::array, std::map, std::unordered_map, std::set, and STL iterators."
    },
    {
        "id": "res_cpp_3_d2",
        "skill_name": "Standard Template Library (STL) Containers & Iterators",
        "title": "C++ std::vector Container Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/container/vector",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "C++ Reference (cppreference)",
        "description": "Official documentation for std::vector capacity, reserve, push_back, emplace_back, element access, and iterator validity."
    },

    # Topic 4: Advanced C++ (Templates & Smart Pointers)
    {
        "id": "res_cpp_4_v1",
        "skill_name": "Advanced C++ (Templates & Smart Pointers)",
        "title": "Smart Pointers & RAII in C++ (unique_ptr, shared_ptr)",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=UOB7-B2M0vh",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "The Cherno",
        "description": "Mastering modern C++ memory management, RAII paradigm, move semantics, and preventing raw memory leaks.",
        "thumbnail_url": "https://img.youtube.com/vi/UOB7-B2M0vh/hqdefault.jpg"
    },
    {
        "id": "res_cpp_4_v2",
        "skill_name": "Advanced C++ (Templates & Smart Pointers)",
        "title": "C++ Templates Explained - Function & Class Templates",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=I-hZkUa9mIs",
        "duration_hours": 2.5,
        "difficulty": "Advanced",
        "provider": "The Cherno",
        "description": "Detailed guide on generic programming in C++, template specialization, typename keyword, and compile-time evaluation.",
        "thumbnail_url": "https://img.youtube.com/vi/I-hZkUa9mIs/hqdefault.jpg"
    },
    {
        "id": "res_cpp_4_d1",
        "skill_name": "Advanced C++ (Templates & Smart Pointers)",
        "title": "C++ Memory Management & Smart Pointers Reference",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/memory",
        "duration_hours": 3.5,
        "difficulty": "Advanced",
        "provider": "C++ Reference (cppreference)",
        "description": "Official documentation for std::unique_ptr, std::shared_ptr, std::weak_ptr, std::make_unique, and custom deleters."
    },
    {
        "id": "res_cpp_4_d2",
        "skill_name": "Advanced C++ (Templates & Smart Pointers)",
        "title": "C++ Template Metaprogramming Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/language/templates",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "C++ Reference (cppreference)",
        "description": "Official documentation for class templates, function templates, template parameter deduction, concepts, and variadic templates."
    },

    # Topic 5: Data Structures & Algorithms (DSA in C++)
    {
        "id": "res_cpp_5_v1",
        "skill_name": "Data Structures & Algorithms (DSA in C++)",
        "title": "Data Structures & Algorithms in C++ Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=8hly31xKLI0",
        "duration_hours": 5.0,
        "difficulty": "Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Comprehensive course implementing graphs, trees, dynamic programming, backtracking, and sorting algorithms in C++.",
        "thumbnail_url": "https://img.youtube.com/vi/8hly31xKLI0/hqdefault.jpg"
    },
    {
        "id": "res_cpp_5_v2",
        "skill_name": "Data Structures & Algorithms (DSA in C++)",
        "title": "DSA in C++ Complete Placement Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=WQoB2z67hvY",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Apna College",
        "description": "Learn big-O complexity analysis, array algorithms, matrix manipulation, recursion, trees, and dynamic programming.",
        "thumbnail_url": "https://img.youtube.com/vi/WQoB2z67hvY/hqdefault.jpg"
    },
    {
        "id": "res_cpp_5_d1",
        "skill_name": "Data Structures & Algorithms (DSA in C++)",
        "title": "C++ Standard Algorithms Library Specification",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/algorithm",
        "duration_hours": 3.5,
        "difficulty": "Intermediate to Advanced",
        "provider": "C++ Reference (cppreference)",
        "description": "Complete specification for C++ standard algorithms, sorting, binary search, heap operations, and execution policies."
    },
    {
        "id": "res_cpp_5_d2",
        "skill_name": "Data Structures & Algorithms (DSA in C++)",
        "title": "C++ std::sort Algorithm & Execution Specs",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/algorithm/sort",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "C++ Reference (cppreference)",
        "description": "Official documentation for std::sort introsort algorithm, comparator functions, time complexity, and parallel execution."
    },

    # Topic 6: Modern C++ Capstone Projects
    {
        "id": "res_cpp_6_v1",
        "skill_name": "Modern C++ Capstone Projects",
        "title": "Building a C++ Game Engine / System Application",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=18c3MTX0PK0",
        "duration_hours": 4.5,
        "difficulty": "Advanced",
        "provider": "The Cherno",
        "description": "Walkthrough on building real-world architecture in modern C++, modular build systems (CMake), and high-performance design.",
        "thumbnail_url": "https://img.youtube.com/vi/18c3MTX0PK0/hqdefault.jpg"
    },
    {
        "id": "res_cpp_6_v2",
        "skill_name": "Modern C++ Capstone Projects",
        "title": "C++ Multithreading & Concurrent Programming",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=TPVH_coGAQs",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "Low Level Learning",
        "description": "Master std::thread, std::mutex, lock_guard, condition_variable, and asynchronous tasks with std::future.",
        "thumbnail_url": "https://img.youtube.com/vi/TPVH_coGAQs/hqdefault.jpg"
    },
    {
        "id": "res_cpp_6_d1",
        "skill_name": "Modern C++ Capstone Projects",
        "title": "Standard C++ Foundation & Modern Guidelines",
        "type": "Official Documentation",
        "url": "https://isocpp.org/get-started",
        "duration_hours": 4.0,
        "difficulty": "Advanced",
        "provider": "Standard C++ Foundation (isocpp.org)",
        "description": "Official Standard C++ Foundation guide for modern C++ standards (C++17/C++20/C++23) core guidelines and architecture."
    },
    {
        "id": "res_cpp_6_d2",
        "skill_name": "Modern C++ Capstone Projects",
        "title": "C++ Thread Support Library Documentation",
        "type": "Official Documentation",
        "url": "https://en.cppreference.com/w/cpp/thread",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "C++ Reference (cppreference)",
        "description": "Official reference for std::thread, std::mutex, atomic operations, and parallel algorithms in standard C++."
    },


    # ==========================================
    # 3. FULL STACK JAVA ROADMAP (12 TOPICS)
    # ==========================================
    # Topic 1: Programming Fundamentals
    {
        "id": "res_java_1_v1",
        "skill_name": "Programming Fundamentals",
        "title": "Java Tutorial for Beginners - Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=eIrMbAQSU34",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "Programming with Mosh",
        "description": "Step-by-step introduction to Java JDK installation, IntelliJ IDE, variables, control flow, methods, and debugging.",
        "thumbnail_url": "https://img.youtube.com/vi/eIrMbAQSU34/hqdefault.jpg"
    },
    {
        "id": "res_java_1_v2",
        "skill_name": "Programming Fundamentals",
        "title": "Java Programming for Beginners Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=A74TOX803D0",
        "duration_hours": 3.5,
        "difficulty": "Beginner",
        "provider": "freeCodeCamp.org",
        "description": "Comprehensive beginner course covering Java fundamentals, operators, conditional branching, loops, and methods.",
        "thumbnail_url": "https://img.youtube.com/vi/A74TOX803D0/hqdefault.jpg"
    },
    {
        "id": "res_java_1_d1",
        "skill_name": "Programming Fundamentals",
        "title": "Oracle Java Language Basics & Syntax",
        "type": "Official Documentation",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html",
        "duration_hours": 3.5,
        "difficulty": "Beginner",
        "provider": "Oracle Java Documentation",
        "description": "Official Oracle guide covering Java variables, primitive data types, operators, expressions, control flow, and arrays."
    },
    {
        "id": "res_java_1_d2",
        "skill_name": "Programming Fundamentals",
        "title": "Oracle Java Control Flow Statements Guide",
        "type": "Official Documentation",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html",
        "duration_hours": 2.5,
        "difficulty": "Beginner",
        "provider": "Oracle Java Documentation",
        "description": "Official Oracle reference for if-then-else, switch, while, do-while, and for loop control statements in Java."
    },

    # Topic 2: Java Basics & OOP
    {
        "id": "res_java_2_v1",
        "skill_name": "Java Basics & OOP",
        "title": "Java Object Oriented Programming (OOP) - Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=grEKMHGYyns",
        "duration_hours": 3.5,
        "difficulty": "Beginner to Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Master OOP in Java: constructors, method overloading vs overriding, abstract classes, interfaces, and access modifiers.",
        "thumbnail_url": "https://img.youtube.com/vi/grEKMHGYyns/hqdefault.jpg"
    },
    {
        "id": "res_java_2_v2",
        "skill_name": "Java Basics & OOP",
        "title": "Java OOPs in One Shot | Object Oriented Programming",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=bSrm9RXwBaI",
        "duration_hours": 3.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "Apna College",
        "description": "Detailed video tutorial covering 4 pillars of OOP in Java: Encapsulation, Abstraction, Inheritance, and Polymorphism.",
        "thumbnail_url": "https://img.youtube.com/vi/bSrm9RXwBaI/hqdefault.jpg"
    },
    {
        "id": "res_java_2_d1",
        "skill_name": "Java Basics & OOP",
        "title": "Oracle Java Object-Oriented Programming Concepts",
        "type": "Official Documentation",
        "url": "https://docs.oracle.com/javase/tutorial/java/concepts/index.html",
        "duration_hours": 4.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "Oracle Java Documentation",
        "description": "Official Java documentation on classes, objects, interfaces, inheritance, polymorphism, encapsulation, and packages."
    },
    {
        "id": "res_java_2_d2",
        "skill_name": "Java Basics & OOP",
        "title": "Dev.java Official OOP & Interfaces Guide",
        "type": "Official Documentation",
        "url": "https://dev.java/learn/oop/",
        "duration_hours": 3.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "Oracle Dev.java Portal",
        "description": "Modern tutorial from Oracle engineers covering class design, records, sealed classes, interfaces, and clean OOP principles."
    },

    # Topic 3: Java Collections & Exception Handling
    {
        "id": "res_java_3_v1",
        "skill_name": "Java Collections & Exception Handling",
        "title": "Java Collections Framework & Streams Tutorial",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=viTHc_4XfCA",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Amigoscode",
        "description": "In-depth visual walkthrough of Java collections data structures, lambda expressions, Streams API filter/map, and error handling.",
        "thumbnail_url": "https://img.youtube.com/vi/viTHc_4XfCA/hqdefault.jpg"
    },
    {
        "id": "res_java_3_v2",
        "skill_name": "Java Collections & Exception Handling",
        "title": "Master Exceptions in Java: Try, Catch, Finally & Custom Exceptions",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=IZu5rZTN7PI",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Telusko",
        "description": "Learn checked vs unchecked exceptions, try-with-resources, custom exception classes, and robust backend error handling.",
        "thumbnail_url": "https://img.youtube.com/vi/IZu5rZTN7PI/hqdefault.jpg"
    },
    {
        "id": "res_java_3_d1",
        "skill_name": "Java Collections & Exception Handling",
        "title": "Oracle Java Collections Framework Trail",
        "type": "Official Documentation",
        "url": "https://docs.oracle.com/javase/tutorial/collections/index.html",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Oracle Java Documentation",
        "description": "Official documentation for List, Set, Map interfaces, ArrayList, HashMap, Collections algorithms, and Streams API."
    },
    {
        "id": "res_java_3_d2",
        "skill_name": "Java Collections & Exception Handling",
        "title": "Oracle Java Catching and Handling Exceptions",
        "type": "Official Documentation",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Oracle Java Documentation",
        "description": "Official specification of try-catch-finally blocks, throw/throws keywords, Exception hierarchy, and try-with-resources."
    },

    # Topic 4: SQL & Relational Databases
    {
        "id": "res_java_4_v1",
        "skill_name": "SQL & Relational Databases",
        "title": "SQL & Database Design Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=qw--VYLpxG4",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "freeCodeCamp.org",
        "description": "Complete database course introducing relational database design, ER diagrams, SQL queries, indexes, and normalization.",
        "thumbnail_url": "https://img.youtube.com/vi/qw--VYLpxG4/hqdefault.jpg"
    },
    {
        "id": "res_java_4_v2",
        "skill_name": "SQL & Relational Databases",
        "title": "SQL Tutorial for Beginners - Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        "duration_hours": 3.5,
        "difficulty": "Beginner",
        "provider": "Programming with Mosh",
        "description": "Learn multi-table JOINs, subqueries, group by aggregation, primary/foreign keys, and transaction isolation levels.",
        "thumbnail_url": "https://img.youtube.com/vi/HXV3zeQKqGY/hqdefault.jpg"
    },
    {
        "id": "res_java_4_d1",
        "skill_name": "SQL & Relational Databases",
        "title": "PostgreSQL SQL Language Official Tutorial",
        "type": "Official Documentation",
        "url": "https://www.postgresql.org/docs/current/tutorial-sql.html",
        "duration_hours": 4.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "PostgreSQL Official Documentation",
        "description": "Official tutorial on SQL commands: SELECT, INSERT, UPDATE, DELETE, multi-table JOINs, foreign keys, and transactions."
    },
    {
        "id": "res_java_4_d2",
        "skill_name": "SQL & Relational Databases",
        "title": "PostgreSQL Data Definition & Table Constraints",
        "type": "Official Documentation",
        "url": "https://www.postgresql.org/docs/current/ddl.html",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "PostgreSQL Official Documentation",
        "description": "Official guide for schema creation, table constraints (FOREIGN KEY, UNIQUE, CHECK), and database normalization."
    },

    # Topic 5: JDBC & ORM Hibernate
    {
        "id": "res_java_5_v1",
        "skill_name": "JDBC & ORM Hibernate",
        "title": "Hibernate & JPA Full Course for Java Developers",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=3n0p_8a9a4k",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Telusko",
        "description": "Practical video guide covering JPA annotations (@Entity, @Table, @Id), relationship mappings (@OneToMany, @ManyToMany), and HQL.",
        "thumbnail_url": "https://img.youtube.com/vi/3n0p_8a9a4k/hqdefault.jpg"
    },
    {
        "id": "res_java_5_v2",
        "skill_name": "JDBC & ORM Hibernate",
        "title": "JDBC Tutorial - Connecting Java to Database",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=2i4t-SL1MkU",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Java Brains",
        "description": "Step-by-step connection setup with DriverManager, Connection, PreparedStatement, ResultSet, and connection pooling.",
        "thumbnail_url": "https://img.youtube.com/vi/2i4t-SL1MkU/hqdefault.jpg"
    },
    {
        "id": "res_java_5_d1",
        "skill_name": "JDBC & ORM Hibernate",
        "title": "Oracle JDBC Basics Official Guide",
        "type": "Official Documentation",
        "url": "https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Oracle Java Documentation",
        "description": "Official documentation for connecting Java applications to databases with JDBC drivers and SQL execution."
    },
    {
        "id": "res_java_5_d2",
        "skill_name": "JDBC & ORM Hibernate",
        "title": "Hibernate ORM User Guide & Entity Mapping",
        "type": "Official Documentation",
        "url": "https://hibernate.org/orm/documentation/6.6/",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Hibernate.org Official",
        "description": "Authoritative documentation for Hibernate 6: persistence context, dirty checking, entity states, lazy loading, and HQL."
    },

    # Topic 6: Spring Framework & Core
    {
        "id": "res_java_6_v1",
        "skill_name": "Spring Framework & Core",
        "title": "Spring Framework Tutorial for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=If1Lw4pLLEo",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Java Techie",
        "description": "Comprehensive tutorial explaining Spring IoC, @Component, @Autowired, @Bean vs @Component, and bean life cycle.",
        "thumbnail_url": "https://img.youtube.com/vi/If1Lw4pLLEo/hqdefault.jpg"
    },
    {
        "id": "res_java_6_v2",
        "skill_name": "Spring Framework & Core",
        "title": "Spring Core & Dependency Injection Deep Dive",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=GB8k2-EgfvU",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Java Brains",
        "description": "Understand how Spring manages application objects, inversion of control, bean scopes, and XML/Annotation configurations.",
        "thumbnail_url": "https://img.youtube.com/vi/GB8k2-EgfvU/hqdefault.jpg"
    },
    {
        "id": "res_java_6_d1",
        "skill_name": "Spring Framework & Core",
        "title": "Spring Framework Core Official Documentation",
        "type": "Official Documentation",
        "url": "https://docs.spring.io/spring-framework/reference/core.html",
        "duration_hours": 4.5,
        "difficulty": "Intermediate",
        "provider": "Spring Official Documentation",
        "description": "Official reference documentation for Spring IoC Container, Dependency Injection, Bean Definitions, ApplicationContext, and AOP."
    },
    {
        "id": "res_java_6_d2",
        "skill_name": "Spring Framework & Core",
        "title": "Spring Official Guide - Handling Form Submission",
        "type": "Official Documentation",
        "url": "https://spring.io/guides/gs/handling-form-submission/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Spring.io Official Guides",
        "description": "Step-by-step official guide building a web application with Spring MVC controllers, templates, and core bean management."
    },

    # Topic 7: Spring Boot & Dependency Injection
    {
        "id": "res_java_7_v1",
        "skill_name": "Spring Boot & Dependency Injection",
        "title": "Spring Boot 3 Full Course - Build Microservices",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=9SGDpanrc8U",
        "duration_hours": 4.5,
        "difficulty": "Intermediate",
        "provider": "Amigoscode",
        "description": "Complete production tutorial building Spring Boot REST microservices from scratch with Spring Data JPA and PostgreSQL.",
        "thumbnail_url": "https://img.youtube.com/vi/9SGDpanrc8U/hqdefault.jpg"
    },
    {
        "id": "res_java_7_v2",
        "skill_name": "Spring Boot & Dependency Injection",
        "title": "Spring Boot Tutorial for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=vtPkZShrvXQ",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Programming with Mosh",
        "description": "Learn Spring Boot auto-configuration, application.properties, REST controller endpoints, and Spring Initializr.",
        "thumbnail_url": "https://img.youtube.com/vi/vtPkZShrvXQ/hqdefault.jpg"
    },
    {
        "id": "res_java_7_d1",
        "skill_name": "Spring Boot & Dependency Injection",
        "title": "Spring Boot Official Reference Documentation",
        "type": "Official Documentation",
        "url": "https://docs.spring.io/spring-boot/docs/current/reference/html/",
        "duration_hours": 5.0,
        "difficulty": "Intermediate",
        "provider": "Spring Official Documentation",
        "description": "Authoritative documentation for Spring Boot 3 auto-configuration, starters, application properties, actuators, and profiles."
    },
    {
        "id": "res_java_7_d2",
        "skill_name": "Spring Boot & Dependency Injection",
        "title": "Spring.io Official Guide - Building an Application with Spring Boot",
        "type": "Official Documentation",
        "url": "https://spring.io/guides/gs/spring-boot/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Spring.io Official Guides",
        "description": "Official getting started guide detailing Spring Initializr, executable JAR packaging, embedded Tomcat server, and REST endpoints."
    },

    # Topic 8: RESTful API Architecture
    {
        "id": "res_java_8_v1",
        "skill_name": "RESTful API Architecture",
        "title": "Building RESTful Web Services with Spring Boot",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=lsMQRaeKNDk",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "in28minutes",
        "description": "Learn RESTful principles, URI design, Jackson JSON parsing, global exception handling (@ControllerAdvice), and Swagger OpenAPI docs.",
        "thumbnail_url": "https://img.youtube.com/vi/lsMQRaeKNDk/hqdefault.jpg"
    },
    {
        "id": "res_java_8_v2",
        "skill_name": "RESTful API Architecture",
        "title": "REST API Crash Course in Java & Spring MVC",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=SLauY6PpjW4",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Java Brains",
        "description": "Design REST APIs with correct HTTP methods (GET, POST, PUT, DELETE), status codes, DTOs, and ResponseEntity.",
        "thumbnail_url": "https://img.youtube.com/vi/SLauY6PpjW4/hqdefault.jpg"
    },
    {
        "id": "res_java_8_d1",
        "skill_name": "RESTful API Architecture",
        "title": "Spring MVC REST Web Services Documentation",
        "type": "Official Documentation",
        "url": "https://docs.spring.io/spring-framework/reference/web/webmvc.html",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Spring Official Documentation",
        "description": "Official Spring Web MVC documentation covering @RestController, @GetMapping, @PostMapping, DTO serialization, and HTTP response codes."
    },
    {
        "id": "res_java_8_d2",
        "skill_name": "RESTful API Architecture",
        "title": "Spring.io Official Guide - Building a RESTful Web Service",
        "type": "Official Documentation",
        "url": "https://spring.io/guides/gs/rest-service/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Spring.io Official Guides",
        "description": "Official tutorial for exposing REST endpoints, managing HTTP request body/params, and configuring JSON representations."
    },

    # Topic 9: Security & JWT Authentication
    {
        "id": "res_java_9_v1",
        "skill_name": "Security & JWT Authentication",
        "title": "Spring Security 6 & JWT Token Authentication Tutorial",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=HER3b2r1E5M",
        "duration_hours": 4.0,
        "difficulty": "Advanced",
        "provider": "Bouali Ali",
        "description": "Full step-by-step implementation of JWT user registration, login, token generation, authorization headers, and protected routes.",
        "thumbnail_url": "https://img.youtube.com/vi/HER3b2r1E5M/hqdefault.jpg"
    },
    {
        "id": "res_java_9_v2",
        "skill_name": "Security & JWT Authentication",
        "title": "Spring Security 6 Crash Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=c9qxE5M3j4M",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "Amigoscode",
        "description": "Understand SecurityFilterChain, UserDetailsService, BCryptPasswordEncoder, and stateless token filters.",
        "thumbnail_url": "https://img.youtube.com/vi/c9qxE5M3j4M/hqdefault.jpg"
    },
    {
        "id": "res_java_9_d1",
        "skill_name": "Security & JWT Authentication",
        "title": "Spring Security Reference Documentation",
        "type": "Official Documentation",
        "url": "https://docs.spring.io/spring-security/reference/index.html",
        "duration_hours": 4.5,
        "difficulty": "Advanced",
        "provider": "Spring Official Documentation",
        "description": "Official reference for Spring Security 6: SecurityFilterChain, UserDetailsService, BCrypt password hashing, and stateless JWT filters."
    },
    {
        "id": "res_java_9_d2",
        "skill_name": "Security & JWT Authentication",
        "title": "Spring.io Official Guide - Securing a Web Application",
        "type": "Official Documentation",
        "url": "https://spring.io/guides/gs/securing-web/",
        "duration_hours": 2.5,
        "difficulty": "Advanced",
        "provider": "Spring.io Official Guides",
        "description": "Official walkthrough configuring security rules, form login, logout handlers, and role-based endpoint permissions."
    },

    # Topic 10: Testing (JUnit & Mockito)
    {
        "id": "res_java_10_v1",
        "skill_name": "Testing (JUnit & Mockito)",
        "title": "JUnit 5 & Mockito Crash Course for Spring Boot",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=vZm0lHciFsQ",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Amigoscode",
        "description": "Hands-on guide testing Spring Boot service layers and REST controllers using @ExtendWith(MockitoExtension.class) and MockMvc.",
        "thumbnail_url": "https://img.youtube.com/vi/vZm0lHciFsQ/hqdefault.jpg"
    },
    {
        "id": "res_java_10_v2",
        "skill_name": "Testing (JUnit & Mockito)",
        "title": "Java Testing with JUnit 5 & Mockito Full Tutorial",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=pD44Z5a5fK0",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "in28minutes",
        "description": "Learn unit test structure (Given-When-Then), @Test assertions, Mockito when-thenReturn stubbing, and verify calls.",
        "thumbnail_url": "https://img.youtube.com/vi/pD44Z5a5fK0/hqdefault.jpg"
    },
    {
        "id": "res_java_10_d1",
        "skill_name": "Testing (JUnit & Mockito)",
        "title": "JUnit 5 User Guide & Official Documentation",
        "type": "Official Documentation",
        "url": "https://junit.org/junit5/docs/current/user-guide/",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "JUnit 5 Official Documentation",
        "description": "Official documentation for writing unit tests with JUnit 5 Jupiter assertions, parameterized tests, and test lifecycle hooks."
    },
    {
        "id": "res_java_10_d2",
        "skill_name": "Testing (JUnit & Mockito)",
        "title": "Mockito Framework Official Documentation",
        "type": "Official Documentation",
        "url": "https://site.mockito.org/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Mockito.org Official",
        "description": "Official site detailing mock creation, when-thenAnswer stubbing, verify method calls, ArgumentCaptors, and BDDMockito."
    },

    # Topic 11: Git & Version Control
    {
        "id": "res_java_11_v1",
        "skill_name": "Git & Version Control",
        "title": "Git and GitHub Tutorial for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=RGOj5yH7evE",
        "duration_hours": 3.0,
        "difficulty": "Beginner",
        "provider": "freeCodeCamp.org",
        "description": "Complete beginner tutorial covering Git CLI commands, GitHub repository setup, branching workflows, pull requests, and merges.",
        "thumbnail_url": "https://img.youtube.com/vi/RGOj5yH7evE/hqdefault.jpg"
    },
    {
        "id": "res_java_11_v2",
        "skill_name": "Git & Version Control",
        "title": "Git Complete Course - From Zero to Hero",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=apGV9Kg7ics",
        "duration_hours": 2.5,
        "difficulty": "Beginner to Intermediate",
        "provider": "Apna College",
        "description": "Learn git init, add, commit, push, pull, branch creation, merge conflict resolution, and stash.",
        "thumbnail_url": "https://img.youtube.com/vi/apGV9Kg7ics/hqdefault.jpg"
    },
    {
        "id": "res_java_11_d1",
        "skill_name": "Git & Version Control",
        "title": "Git Official Documentation & Pro Git Book",
        "type": "Official Documentation",
        "url": "https://git-scm.com/doc",
        "duration_hours": 3.5,
        "difficulty": "Beginner to Intermediate",
        "provider": "Git Official Documentation",
        "description": "Authoritative Git reference manual covering git init, commit, branch, merge, rebase, cherry-pick, remote origin, and conflicts."
    },
    {
        "id": "res_java_11_d2",
        "skill_name": "Git & Version Control",
        "title": "GitHub Documentation & Collaboration Guides",
        "type": "Official Documentation",
        "url": "https://docs.github.com/en/get-started",
        "duration_hours": 2.0,
        "difficulty": "Beginner",
        "provider": "GitHub Official Docs",
        "description": "Official GitHub guide detailing repository collaboration, SSH keys, feature branch workflows, and code review practices."
    },

    # Topic 12: Docker & Microservices
    {
        "id": "res_java_12_v1",
        "skill_name": "Docker & Microservices",
        "title": "Docker Tutorial for Beginners - Containerize Java & Spring Boot",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "TechWorld with Nana",
        "description": "Visual guide explaining container isolation, building Docker images, docker-compose.yml configuration, and networking.",
        "thumbnail_url": "https://img.youtube.com/vi/fqMOX6JJhGo/hqdefault.jpg"
    },
    {
        "id": "res_java_12_v2",
        "skill_name": "Docker & Microservices",
        "title": "Docker & Docker Compose Crash Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=3c-iBn73dDE",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Traversy Media",
        "description": "Hands-on tutorial writing multi-stage Dockerfiles, Docker compose services, port mappings, and environment variables.",
        "thumbnail_url": "https://img.youtube.com/vi/3c-iBn73dDE/hqdefault.jpg"
    },
    {
        "id": "res_java_12_d1",
        "skill_name": "Docker & Microservices",
        "title": "Docker Official Documentation & Getting Started",
        "type": "Official Documentation",
        "url": "https://docs.docker.com/get-started/",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Docker Official Documentation",
        "description": "Official Docker documentation on containers, images, multi-stage Dockerfiles, networks, volumes, and Docker Compose."
    },
    {
        "id": "res_java_12_d2",
        "skill_name": "Docker & Microservices",
        "title": "Docker Compose Specification Reference",
        "type": "Official Documentation",
        "url": "https://docs.docker.com/compose/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Docker Official Documentation",
        "description": "Official reference for orchestrating multi-container applications (Spring Boot + PostgreSQL + React) locally with Docker Compose."
    },


    # ==========================================
    # 4. FULL STACK PYTHON ROADMAP (12 TOPICS)
    # ==========================================
    # Topic 1: Python Programming Fundamentals
    {
        "id": "res_py_1_v1",
        "skill_name": "Python Programming Fundamentals",
        "title": "Python Tutorial for Beginners - Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=rfscVS0vtbw",
        "duration_hours": 4.5,
        "difficulty": "Beginner",
        "provider": "freeCodeCamp.org",
        "description": "Comprehensive video course covering Python installation, variables, strings, math operations, list comprehensions, and functions.",
        "thumbnail_url": "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg"
    },
    {
        "id": "res_py_1_v2",
        "skill_name": "Python Programming Fundamentals",
        "title": "Python for Beginners - Learn Python in 1 Hour",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=kqtD5dpn9C8",
        "duration_hours": 2.5,
        "difficulty": "Beginner",
        "provider": "Programming with Mosh",
        "description": "Step-by-step introduction to Python 3 syntax, control flow, lists, tuples, dictionaries, and built-in methods.",
        "thumbnail_url": "https://img.youtube.com/vi/kqtD5dpn9C8/hqdefault.jpg"
    },
    {
        "id": "res_py_1_d1",
        "skill_name": "Python Programming Fundamentals",
        "title": "Python 3 Official Language Tutorial",
        "type": "Official Documentation",
        "url": "https://docs.python.org/3/tutorial/index.html",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "Python Software Foundation",
        "description": "Official Python 3 tutorial introducing basic types, control flow (if/for/while), functions, lists, dictionaries, and modules."
    },
    {
        "id": "res_py_1_d2",
        "skill_name": "Python Programming Fundamentals",
        "title": "Python Built-in Functions & Standard Types",
        "type": "Official Documentation",
        "url": "https://docs.python.org/3/library/functions.html",
        "duration_hours": 3.0,
        "difficulty": "Beginner",
        "provider": "Python Software Foundation",
        "description": "Official documentation for Python built-in functions: len(), range(), enumerate(), zip(), map(), filter(), and sorted()."
    },

    # Topic 2: Python Object-Oriented Programming (OOP)
    {
        "id": "res_py_2_v1",
        "skill_name": "Python Object-Oriented Programming (OOP)",
        "title": "Python OOP Tutorials - Working with Classes",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=JeznW_7DlB0",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Corey Schafer",
        "description": "Industry standard video series covering class variables, instance variables, classmethods, staticmethods, dunder methods, and property decorators.",
        "thumbnail_url": "https://img.youtube.com/vi/JeznW_7DlB0/hqdefault.jpg"
    },
    {
        "id": "res_py_2_v2",
        "skill_name": "Python Object-Oriented Programming (OOP)",
        "title": "Object Oriented Programming (OOP) in Python",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=Ej_02ICOIgs",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Learn class constructors (__init__), self parameter, encapsulation, inheritance, polymorphism, and magic methods.",
        "thumbnail_url": "https://img.youtube.com/vi/Ej_02ICOIgs/hqdefault.jpg"
    },
    {
        "id": "res_py_2_d1",
        "skill_name": "Python Object-Oriented Programming (OOP)",
        "title": "Python Official Documentation on Classes",
        "type": "Official Documentation",
        "url": "https://docs.python.org/3/tutorial/classes.html",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Python Software Foundation",
        "description": "Official reference for Python classes, __init__, self, inheritance, multiple inheritance, scope rules, and private variables."
    },
    {
        "id": "res_py_2_d2",
        "skill_name": "Python Object-Oriented Programming (OOP)",
        "title": "Python Data Model & Special Method Names",
        "type": "Official Documentation",
        "url": "https://docs.python.org/3/reference/datamodel.html",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Python Software Foundation",
        "description": "Official specification of Python dunder methods (__str__, __repr__, __len__, __getitem__), attribute access, and descriptors."
    },

    # Topic 3: HTML5 & CSS3 Responsive Layouts
    {
        "id": "res_py_3_v1",
        "skill_name": "HTML5 & CSS3 Responsive Layouts",
        "title": "HTML & CSS Full Course - Beginner to Pro",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=mU6anWqZJcc",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "SuperSimpleDev",
        "description": "Hands-on video course building responsive web pages from scratch using modern CSS Flexbox and Grid layouts.",
        "thumbnail_url": "https://img.youtube.com/vi/mU6anWqZJcc/hqdefault.jpg"
    },
    {
        "id": "res_py_3_v2",
        "skill_name": "HTML5 & CSS3 Responsive Layouts",
        "title": "HTML5 and CSS3 Course for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=G3e-cpL7ofc",
        "duration_hours": 3.0,
        "difficulty": "Beginner",
        "provider": "freeCodeCamp.org",
        "description": "Learn semantic HTML tags, CSS box model, positioning, media queries, mobile-first design, and web accessibility.",
        "thumbnail_url": "https://img.youtube.com/vi/G3e-cpL7ofc/hqdefault.jpg"
    },
    {
        "id": "res_py_3_d1",
        "skill_name": "HTML5 & CSS3 Responsive Layouts",
        "title": "MDN Web Docs - HTML Elements Reference",
        "type": "Official Documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "MDN Web Docs",
        "description": "Official web documentation for semantic HTML5 elements, form controls, media tags, accessibility (ARIA), and DOM structure."
    },
    {
        "id": "res_py_3_d2",
        "skill_name": "HTML5 & CSS3 Responsive Layouts",
        "title": "MDN CSS Layouts, Flexbox & Grid Guide",
        "type": "Official Documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/CSS",
        "duration_hours": 3.0,
        "difficulty": "Beginner",
        "provider": "MDN Web Docs",
        "description": "In-depth MDN reference covering CSS selectors, specificity, CSS Flexbox, Grid, custom properties (CSS variables), and media queries."
    },

    # Topic 4: JavaScript ES6+ Fundamentals
    {
        "id": "res_py_4_v1",
        "skill_name": "JavaScript ES6+ Fundamentals",
        "title": "JavaScript Tutorial for Beginners - Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=hdI2bqOjy3c",
        "duration_hours": 4.0,
        "difficulty": "Beginner",
        "provider": "Programming with Mosh",
        "description": "Complete beginner to advanced JavaScript tutorial covering DOM manipulation, event handling, async code, and ES6 modern features.",
        "thumbnail_url": "https://img.youtube.com/vi/hdI2bqOjy3c/hqdefault.jpg"
    },
    {
        "id": "res_py_4_v2",
        "skill_name": "JavaScript ES6+ Fundamentals",
        "title": "JavaScript ES6+ Course - Modern Frontend JS",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=NCwa_xi0Uuc",
        "duration_hours": 3.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "Traversy Media",
        "description": "Learn arrow functions, template literals, destructuring, promises, async/await, modules, and Fetch API.",
        "thumbnail_url": "https://img.youtube.com/vi/NCwa_xi0Uuc/hqdefault.jpg"
    },
    {
        "id": "res_py_4_d1",
        "skill_name": "JavaScript ES6+ Fundamentals",
        "title": "MDN JavaScript Language Guide",
        "type": "Official Documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        "duration_hours": 4.5,
        "difficulty": "Beginner to Intermediate",
        "provider": "MDN Web Docs",
        "description": "Official JavaScript documentation covering ES6+ syntax, arrow functions, destructuring, promises, async/await, modules, and fetch."
    },
    {
        "id": "res_py_4_d2",
        "skill_name": "JavaScript ES6+ Fundamentals",
        "title": "MDN Asynchronous JavaScript (Promises & Async/Await)",
        "type": "Official Documentation",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "MDN Web Docs",
        "description": "Official MDN guide explaining asynchronous programming in JS, Promise chaining, try-catch error handling, and the Event Loop."
    },

    # Topic 5: React & Next.js Frontend Integration
    {
        "id": "res_py_5_v1",
        "skill_name": "React & Next.js Frontend Integration",
        "title": "React Course 2026 - Beginner to Advanced",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=bMknfKXIFA8",
        "duration_hours": 4.5,
        "difficulty": "Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Hands-on project-based React tutorial covering state management, custom hooks, API integration, and component lifecycle.",
        "thumbnail_url": "https://img.youtube.com/vi/bMknfKXIFA8/hqdefault.jpg"
    },
    {
        "id": "res_py_5_v2",
        "skill_name": "React & Next.js Frontend Integration",
        "title": "Next.js App Router Full Course",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=wm5gMKuwSYk",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Traversy Media",
        "description": "Master Next.js App Router, Server Components vs Client Components, page routing, dynamic routes, and backend API integration.",
        "thumbnail_url": "https://img.youtube.com/vi/wm5gMKuwSYk/hqdefault.jpg"
    },
    {
        "id": "res_py_5_d1",
        "skill_name": "React & Next.js Frontend Integration",
        "title": "React Official Documentation (react.dev)",
        "type": "Official Documentation",
        "url": "https://react.dev/learn",
        "duration_hours": 4.5,
        "difficulty": "Intermediate",
        "provider": "React Official Documentation",
        "description": "Official React interactive tutorial covering components, JSX, props, state management (useState, useEffect), and hooks."
    },
    {
        "id": "res_py_5_d2",
        "skill_name": "React & Next.js Frontend Integration",
        "title": "Next.js Official Documentation & App Router Guide",
        "type": "Official Documentation",
        "url": "https://nextjs.org/docs",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Next.js Official Docs",
        "description": "Official documentation for Next.js App Router, server/client components, page routing, dynamic routes, and API fetching."
    },

    # Topic 6: FastAPI & Async Web Development
    {
        "id": "res_py_6_v1",
        "skill_name": "FastAPI & Async Web Development",
        "title": "FastAPI Course - Build High-Performance Python Web APIs",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=7t2alSnE2-I",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Full production FastAPI course building async Python backends with Pydantic validation, CORS middleware, and automatic Swagger docs.",
        "thumbnail_url": "https://img.youtube.com/vi/7t2alSnE2-I/hqdefault.jpg"
    },
    {
        "id": "res_py_6_v2",
        "skill_name": "FastAPI & Async Web Development",
        "title": "FastAPI Tutorial for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Patrick Loeber",
        "description": "Learn path/query parameters, Pydantic BaseModel, HTTP status codes, dependency injection, and async def endpoint handlers.",
        "thumbnail_url": "https://img.youtube.com/vi/0sOvCWFmrtA/hqdefault.jpg"
    },
    {
        "id": "res_py_6_d1",
        "skill_name": "FastAPI & Async Web Development",
        "title": "FastAPI Official Documentation & User Guide",
        "type": "Official Documentation",
        "url": "https://fastapi.tiangolo.com/tutorial/",
        "duration_hours": 4.5,
        "difficulty": "Intermediate",
        "provider": "FastAPI Official Documentation",
        "description": "Official documentation for FastAPI: async endpoints, path/query parameters, Pydantic schemas, dependency injection, and OpenAPI."
    },
    {
        "id": "res_py_6_d2",
        "skill_name": "FastAPI & Async Web Development",
        "title": "FastAPI Dependencies & OpenAPI Integration",
        "type": "Official Documentation",
        "url": "https://fastapi.tiangolo.com/tutorial/dependencies/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "FastAPI Official Documentation",
        "description": "Official guide on FastAPI Dependency Injection system (Depends), sub-dependencies, security schemes, and Swagger UI."
    },

    # Topic 7: PostgreSQL Database Design & Queries
    {
        "id": "res_py_7_v1",
        "skill_name": "PostgreSQL Database Design & Queries",
        "title": "PostgreSQL Tutorial for Beginners",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=qw--VYLpxG4",
        "duration_hours": 4.0,
        "difficulty": "Beginner to Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Complete video guide on PostgreSQL database administration, writing complex SELECT queries, JOINs, foreign keys, and indexes.",
        "thumbnail_url": "https://img.youtube.com/vi/qw--VYLpxG4/hqdefault.jpg"
    },
    {
        "id": "res_py_7_v2",
        "skill_name": "PostgreSQL Database Design & Queries",
        "title": "PostgreSQL Database Design & Indexing",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Programming with Mosh",
        "description": "Learn relational schema design, primary/foreign keys, B-tree indexes, transactions, and SQL query optimization.",
        "thumbnail_url": "https://img.youtube.com/vi/HXV3zeQKqGY/hqdefault.jpg"
    },
    {
        "id": "res_py_7_d1",
        "skill_name": "PostgreSQL Database Design & Queries",
        "title": "PostgreSQL Official Documentation Suite",
        "type": "Official Documentation",
        "url": "https://www.postgresql.org/docs/current/index.html",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "PostgreSQL Official Documentation",
        "description": "Official PostgreSQL documentation covering relational schema design, indexes, data types, query execution plans, and transactions."
    },
    {
        "id": "res_py_7_d2",
        "skill_name": "PostgreSQL Database Design & Queries",
        "title": "PostgreSQL SQL Commands & Syntax Reference",
        "type": "Official Documentation",
        "url": "https://www.postgresql.org/docs/current/sql-commands.html",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "PostgreSQL Official Documentation",
        "description": "Official reference for all PostgreSQL SQL statements: SELECT, INSERT, UPDATE, DELETE, ALTER TABLE, and CREATE INDEX."
    },

    # Topic 8: SQLAlchemy ORM & Alembic Migrations
    {
        "id": "res_py_8_v1",
        "skill_name": "SQLAlchemy ORM & Alembic Migrations",
        "title": "SQLAlchemy 2.0 & Alembic Migrations Tutorial",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=AKQ3XnE7m_I",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Amigoscode",
        "description": "Hands-on tutorial creating database models, session context managers, and running schema version migrations with Alembic.",
        "thumbnail_url": "https://img.youtube.com/vi/AKQ3XnE7m_I/hqdefault.jpg"
    },
    {
        "id": "res_py_8_v2",
        "skill_name": "SQLAlchemy ORM & Alembic Migrations",
        "title": "SQLAlchemy 2.0 Crash Course for FastAPI",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=1d32g82Mv_s",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Patrick Loeber",
        "description": "Learn Declarative Base models, mapped_column, relationship(), Session management, and async database drivers.",
        "thumbnail_url": "https://img.youtube.com/vi/1d32g82Mv_s/hqdefault.jpg"
    },
    {
        "id": "res_py_8_d1",
        "skill_name": "SQLAlchemy ORM & Alembic Migrations",
        "title": "SQLAlchemy 2.0 Unified Tutorial & Documentation",
        "type": "Official Documentation",
        "url": "https://docs.sqlalchemy.org/en/20/orm/",
        "duration_hours": 4.5,
        "difficulty": "Intermediate to Advanced",
        "provider": "SQLAlchemy Official Documentation",
        "description": "Official documentation for SQLAlchemy 2.0 ORM: Declarative Base, mapped_column, relationship mappings, sessions, and async engines."
    },
    {
        "id": "res_py_8_d2",
        "skill_name": "SQLAlchemy ORM & Alembic Migrations",
        "title": "Alembic Official Migration Documentation",
        "type": "Official Documentation",
        "url": "https://alembic.sqlalchemy.org/en/latest/",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Alembic Official Docs",
        "description": "Official guide detailing alembic init, autogenerate database revision scripts, upgrade/downgrade execution, and production deployment."
    },

    # Topic 9: JWT Authentication & Security in Python
    {
        "id": "res_py_9_v1",
        "skill_name": "JWT Authentication & Security in Python",
        "title": "FastAPI Authentication & JWT Tokens Tutorial",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=6htrQqgZzfs",
        "duration_hours": 3.5,
        "difficulty": "Advanced",
        "provider": "Sanjit Kulkarni",
        "description": "Complete implementation of user registration, bcrypt password hashing, JWT token creation, decode verification, and dependency security.",
        "thumbnail_url": "https://img.youtube.com/vi/6htrQqgZzfs/hqdefault.jpg"
    },
    {
        "id": "res_py_9_v2",
        "skill_name": "JWT Authentication & Security in Python",
        "title": "FastAPI JWT Auth & Role Based Authorization",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=7wS5n_96c-E",
        "duration_hours": 2.5,
        "difficulty": "Advanced",
        "provider": "Patrick Loeber",
        "description": "Secure FastAPI backend endpoints with OAuth2PasswordBearer flow, passlib password hashing, and PyJWT token validation.",
        "thumbnail_url": "https://img.youtube.com/vi/7wS5n_96c-E/hqdefault.jpg"
    },
    {
        "id": "res_py_9_d1",
        "skill_name": "JWT Authentication & Security in Python",
        "title": "FastAPI Security & OAuth2 JWT Guide",
        "type": "Official Documentation",
        "url": "https://fastapi.tiangolo.com/tutorial/security/",
        "duration_hours": 4.0,
        "difficulty": "Advanced",
        "provider": "FastAPI Official Documentation",
        "description": "Official step-by-step documentation for building OAuth2 password flow with OAuth2PasswordBearer, password hashing, and JWT tokens."
    },
    {
        "id": "res_py_9_d2",
        "skill_name": "JWT Authentication & Security in Python",
        "title": "PyJWT Official Documentation & Verification",
        "type": "Official Documentation",
        "url": "https://pyjwt.readthedocs.io/",
        "duration_hours": 2.5,
        "difficulty": "Advanced",
        "provider": "PyJWT Docs",
        "description": "Official specification for encoding, decoding, signing algorithms (HS256/RS256), token expiration claims, and header validation in Python."
    },

    # Topic 10: Pytest & Backend Test Automation
    {
        "id": "res_py_10_v1",
        "skill_name": "Pytest & Backend Test Automation",
        "title": "Pytest Tutorial for Beginners - Python Testing",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=cHYq1IkFfkt",
        "duration_hours": 3.0,
        "difficulty": "Intermediate",
        "provider": "Corey Schafer",
        "description": "Visual guide writing unit tests for Python functions, mocking external dependencies, using fixtures, and testing FastAPI endpoints with TestClient.",
        "thumbnail_url": "https://img.youtube.com/vi/cHYq1IkFfkt/hqdefault.jpg"
    },
    {
        "id": "res_py_10_v2",
        "skill_name": "Pytest & Backend Test Automation",
        "title": "Testing FastAPI Apps with Pytest",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "freeCodeCamp.org",
        "description": "Learn test fixtures, monkeypatching, mock database sessions, and running pytest coverage reports.",
        "thumbnail_url": "https://img.youtube.com/vi/0sOvCWFmrtA/hqdefault.jpg"
    },
    {
        "id": "res_py_10_d1",
        "skill_name": "Pytest & Backend Test Automation",
        "title": "Pytest Official Documentation & Test Framework",
        "type": "Official Documentation",
        "url": "https://docs.pytest.org/en/stable/",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Pytest Official Documentation",
        "description": "Authoritative guide for writing unit tests, assertion introspections, test fixtures (@pytest.fixture), parametrization, and coverage reports."
    },
    {
        "id": "res_py_10_d2",
        "skill_name": "Pytest & Backend Test Automation",
        "title": "FastAPI Official Testing & TestClient Guide",
        "type": "Official Documentation",
        "url": "https://fastapi.tiangolo.com/tutorial/testing/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "FastAPI Official Documentation",
        "description": "Official guide using Starlette TestClient (httpx) with Pytest to test HTTP status codes, JSON response bodies, and database isolation."
    },

    # Topic 11: Docker Containerization & Cloud Deployment
    {
        "id": "res_py_11_v1",
        "skill_name": "Docker Containerization & Cloud Deployment",
        "title": "Dockerize Python FastAPI & PostgreSQL with Docker Compose",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=gAkwW2tuIqE",
        "duration_hours": 3.5,
        "difficulty": "Intermediate",
        "provider": "Patrick Loeber",
        "description": "Complete tutorial containerizing a FastAPI backend, PostgreSQL database, and Next.js frontend into orchestrating docker-compose services.",
        "thumbnail_url": "https://img.youtube.com/vi/gAkwW2tuIqE/hqdefault.jpg"
    },
    {
        "id": "res_py_11_v2",
        "skill_name": "Docker Containerization & Cloud Deployment",
        "title": "Docker for Python Developers",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=0TFWtfBCasE",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "TechWorld with Nana",
        "description": "Master writing lightweight Python Dockerfiles, caching pip requirements, setting environment variables, and running containers.",
        "thumbnail_url": "https://img.youtube.com/vi/0TFWtfBCasE/hqdefault.jpg"
    },
    {
        "id": "res_py_11_d1",
        "skill_name": "Docker Containerization & Cloud Deployment",
        "title": "Docker Reference Documentation & Dockerfile Builder",
        "type": "Official Documentation",
        "url": "https://docs.docker.com/engine/reference/builder/",
        "duration_hours": 4.0,
        "difficulty": "Intermediate",
        "provider": "Docker Official Documentation",
        "description": "Official Docker builder reference for FROM, WORKDIR, COPY, RUN, EXPOSE, and multi-stage builds for Python & Node.js apps."
    },
    {
        "id": "res_py_11_d2",
        "skill_name": "Docker Containerization & Cloud Deployment",
        "title": "Docker Official Getting Started Overview",
        "type": "Official Documentation",
        "url": "https://docs.docker.com/get-started/",
        "duration_hours": 2.5,
        "difficulty": "Intermediate",
        "provider": "Docker Official Documentation",
        "description": "Official getting started guide covering container lifecycle, network bridge creation, persistent volume mounts, and environment configuration."
    },

    # Topic 12: Full Stack Python Capstone Projects
    {
        "id": "res_py_12_v1",
        "skill_name": "Full Stack Python Capstone Projects",
        "title": "Build and Deploy a Full Stack Web Application (FastAPI + React)",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        "duration_hours": 5.0,
        "difficulty": "Advanced",
        "provider": "freeCodeCamp.org",
        "description": "End-to-end full stack project building REST APIs in Python, PostgreSQL database, React user interface, JWT auth, and deployment.",
        "thumbnail_url": "https://img.youtube.com/vi/0sOvCWFmrtA/hqdefault.jpg"
    },
    {
        "id": "res_py_12_v2",
        "skill_name": "Full Stack Python Capstone Projects",
        "title": "Full Stack Web App Development with FastAPI and Next.js",
        "type": "Video Resource",
        "url": "https://www.youtube.com/watch?v=7t2alSnE2-I",
        "duration_hours": 4.0,
        "difficulty": "Advanced",
        "provider": "Coding with Patrick",
        "description": "Build production web architectures connecting FastAPI REST endpoints, SQLAlchemy ORM, and Next.js App Router.",
        "thumbnail_url": "https://img.youtube.com/vi/7t2alSnE2-I/hqdefault.jpg"
    },
    {
        "id": "res_py_12_d1",
        "skill_name": "Full Stack Python Capstone Projects",
        "title": "Python Standard Library & Production Architecture",
        "type": "Official Documentation",
        "url": "https://docs.python.org/3/",
        "duration_hours": 4.5,
        "difficulty": "Advanced",
        "provider": "Python Software Foundation",
        "description": "Complete Python 3 documentation suite for standard library modules, async IO concurrency, logging, typing, and production deployment."
    },
    {
        "id": "res_py_12_d2",
        "skill_name": "Full Stack Python Capstone Projects",
        "title": "FastAPI Production Deployment & Best Practices",
        "type": "Official Documentation",
        "url": "https://fastapi.tiangolo.com/deployment/",
        "duration_hours": 3.0,
        "difficulty": "Advanced",
        "provider": "FastAPI Official Documentation",
        "description": "Official guide for deploying FastAPI apps with Uvicorn/Gunicorn ASGI servers, HTTPS SSL configuration, and Docker containers."
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
