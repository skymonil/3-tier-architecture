export const colleges = [
    {
      collegeID: "COL001",
      collegeName: "National Tech University",
      address: "123 University Ave",
      globalFees: [
        { title: "Library Fee", amount: 1000 },
        { title: "Sports Fee", amount: 500 }
      ],
      courses: [
        {
          courseName: "B.Tech Computer Science",
          baseFee: 50000,
          eligibility: "Passed 12th with PCM",
          subject: [
            { subjectName: "Maths", marks: { min: 30, max: 100 } },
            { subjectName: "Physics", marks: { min: 30, max: 100 } }
          ]
        },
        {
          courseName: "B.Tech Information Technology",
          baseFee: 48000,
          eligibility: "Passed 12th with PCM",
          subject: [
            { subjectName: "Computer Science", marks: { min: 35, max: 100 } },
            { subjectName: "Statistics", marks: { min: 30, max: 100 } }
          ]
        }
      ]
    },
    {
      collegeID: "COL002",
      collegeName: "Green Valley College",
      address: "456 College Street",
      globalFees: [
        { title: "Examination Fee", amount: 1500 },
        { title: "Library Fee", amount: 800 }
      ],
      courses: [
        {
          courseName: "B.Sc Physics",
          baseFee: 40000,
          eligibility: "Passed 12th with Science",
          subject: [
            { subjectName: "Physics", marks: { min: 40, max: 100 } },
            { subjectName: "Mathematics", marks: { min: 35, max: 100 } }
          ]
        },
        {
          courseName: "B.Sc Chemistry",
          baseFee: 38000,
          eligibility: "Passed 12th with Science",
          subject: [
            { subjectName: "Chemistry", marks: { min: 40, max: 100 } },
            { subjectName: "Biology", marks: { min: 30, max: 100 } }
          ]
        }
      ]
    },
    {
      collegeID: "COL003",
      collegeName: "Summit Engineering Institute",
      address: "789 Summit Road",
      globalFees: [
        { title: "Lab Fee", amount: 2000 },
        { title: "Hostel Fee", amount: 25000 }
      ],
      courses: [
        {
          courseName: "B.Tech Mechanical Engineering",
          baseFee: 52000,
          eligibility: "Passed 12th with PCM",
          subject: [
            { subjectName: "Mechanics", marks: { min: 35, max: 100 } },
            { subjectName: "Thermodynamics", marks: { min: 30, max: 100 } }
          ]
        },
        {
          courseName: "B.Tech Civil Engineering",
          baseFee: 50000,
          eligibility: "Passed 12th with PCM",
          subject: [
            { subjectName: "Structural Engineering", marks: { min: 35, max: 100 } },
            { subjectName: "Geotechnical Engineering", marks: { min: 30, max: 100 } }
          ]
        }
      ]
    }
  ];