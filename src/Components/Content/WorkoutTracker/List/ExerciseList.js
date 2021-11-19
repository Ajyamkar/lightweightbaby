const exerciseList = [
    {
        id:1,
        bodyPart: "Legs",
        level: {
            Beginner: ["Skipping","Barbell back squats","Barbell front squats",
            "Goblet squat","Dumbbell step-up","Glute bridge","Calf raise",
            "Leg curl","Leg extension","Leg press","Wall sit","Squat jump"
            ],
            Moderate: ["Hex bar deadlift","Walking lunge with dumbbells",
            "Single-leg Romanian deadlift","Kettlebell swing","Sumo deadlift",
            "Farmer’s walk","Single-leg glute bridge"],
            Advance: ["Overhead squat","Bulgarian split squat","Hang clean",
            "Thruster","Deadlift"]
        }
    },
    {
        id:2,
        bodyPart: "Back",
        level: {
            Beginner: ["Pull up","chin up",],
            Moderate: [],
            Advance: []
        }
    },
    {
        id:3,
        bodyPart: "Chest",
        level: {
            Beginner: ["Push up with support of knee","Clean Push up","flat dumbell press",
            "incline dumbell press","decline dumbell press","Flat machine bench press",
            "Cable chest fly","Pec dec"],
            Moderate: ["Incline barbell bench press","Flat barbell bench press",
            "Decline barbell bench press","Dip machine"],
            Advance: ["Burpee","Weighted dips","Weighted pushups","Clap press-up",
            "Landmine press","Guillotine press"]
        },
    }
];

export default exerciseList;