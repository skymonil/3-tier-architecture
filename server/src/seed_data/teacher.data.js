export const teachers = [
    {
        username: "john_math",
        password: "$2b$10$EXAMPLEHASHEDPASSWORD1", // Hashed version of "math123"
        subjectId: ["SUB001", "SUB012"], // Maths, Economics
        comment: "Head of Mathematics Department"
    },
    {
        username: "sarah_science",
        password: "$2b$10$EXAMPLEHASHEDPASSWORD2", // Hashed "science123"
        subjectId: ["SUB002", "SUB003"], // Physics, Chemistry
        comment: "Lab coordinator"
    },
    {
        username: "david_cs",
        password: "$2b$10$EXAMPLEHASHEDPASSWORD3", // Hashed "cs123"
        subjectId: ["SUB004", "SUB008"], // Computer Science, Database Systems
        comment: "IT Department Head"
    },
    {
        username: "emma_eng",
        password: "$2b$10$EXAMPLEHASHEDPASSWORD4", // Hashed "eng123"
        subjectId: ["SUB005"], // English Literature
        comment: ""
    },
    {
        username: "michael_mech",
        password: "$2b$10$EXAMPLEHASHEDPASSWORD5", // Hashed "mech123"
        subjectId: ["SUB006", "SUB011"], // Mechanical Eng, Structural Analysis
        comment: "Senior Professor"
    },
    {
        username: "lisa_bio",
        password: "$2b$10$EXAMPLEHASHEDPASSWORD6", // Hashed "bio123"
        subjectId: ["SUB006", "SUB012"], // Biology, Biotechnology
        comment: "Research specialist"
    }
];