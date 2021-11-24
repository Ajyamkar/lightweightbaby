import crunches from "../Images/Abs/crunches.jpg";
import crunchesWithLegsUp from "../Images/Abs/crunches-with-legs-up.gif";
import crunchesOnMachine from "../Images/Abs/crunchesOnMachine.jfif";
import plank from "../Images/Abs/plank.png";
import neagativeCrunches from "../Images/Abs/neagativeCrunches.gif";
import legRaisesLying from "../Images/Abs/legRaisesLying.png";
import sideLegRaises from "../Images/Abs/sideLegRaises.jpg";
const exerciseList = [
    {
        id: 1,
        bodyPart: "Abs",
        level: {
            Beginner: [
                {
                    exerciseName: "Crunches", imgSrc: crunches,
                    howToDo: ["Lie down on the floor, on your back.",
                        "Bend your knees resting your feet on the floor, shoulder-width.",
                        "Put both of your hands behind the head supporting your head and neck.This will prevent your neck to get fatigue and cramp, this will also let you focus on stressing your abs.",
                        "Now, lift up your shoulder blades along with your hands, neck, and head altogether, using your core, while exhaling and crunch your abs. hold up for 1-2 seconds. Then come back towards the starting position while inhaling. Don’t take rest in the starting position and repeat.",
                        "(Never bend your head. Keep your head resting on your hands, taking a gap between the chin and upper chest). As shown in the image.",
                        "Perform 15-25 reps. if free weight crunches don’t put stress on your abs, you can do it with weights also or on decline position or hanging position."
                    ]
                },
                {
                    exerciseName: "Crunches With Legs Up", imgSrc: crunchesWithLegsUp,
                    howToDo: ["Place your hands folded behind your neck.",
                        "Bring your legs up, extending them perpendicular to the floor with knees slightly bent. Keep your lower spine flat on the floor.",
                        "Contract your abs in preparation for the lift.",
                        "Begin by slowly curling your upper body, lifting your shoulder blades off of the floor. Exhale on the upward motion. Keep your legs straight and pointed upward; don't let them sway or list to one side.",
                        "Continue curling your body upward using your core muscles. Don't lead with the head by pulling on the neck, and keep your chin up.",
                        "When your shoulder blades are off of the floor, pause and hold the position a moment or two.",
                        "Begin lowering the upper body by uncurling slowly. Inhale on the downward motion. Don't allow your legs to sway, and don't let them crash back to the floor. This should be a slow and controlled descent.",
                        "Keep your legs in the fixed starting position.",
                        "Do 3 sets of 12 to 16 reps."
                    ]
                },
                {
                    exerciseName: "Crunches on Machine", imgSrc: crunchesOnMachine,
                    howToDo: ["Sit in the abdominal machine with your back pressed against the back rest.",
                        "Keep your back pressed firmly against the back rest. Don’t let it hunch.",
                        "Keep your neck neutral.",
                        "Grasp the handles by the sides of your head.",
                        "Don’t pull down with your arms; keep them rigid. All of the movement should be produced by the flexion of your abdomen and pelvis.",
                        "Exhale as you flex your abdomen and pelvis to pull the handles down and the foot levers up so that your body assumes a crunch.",
                        "Inhale as you relax your abdomen and pelvis to return to the starting position.",
                        "Repeat."]
                },
                {
                    exerciseName: "Plank", imgSrc: plank,
                    howToDo: ["Begin in the plank position, face down with your forearms and toes on the floor. Your elbows are directly under your shoulders and your forearms are facing forward. Your head is relaxed and you should be looking at the floor.",
                        "Engage your abdominal muscles, drawing your navel toward your spine. Keep your torso straight and rigid and your body in a straight line from your ears to your toes with no sagging or bending. This is the neutral spine position. Ensure your shoulders are down, not creeping up toward your ears. Your heels should be over the balls of your feet.",
                        "Hold this position for 10 seconds. Release to floor.",
                        "Over time work up to 30, 45, or 60 seconds."
                    ]
                },
                {
                    exerciseName: "Negative Crunches", imgSrc: neagativeCrunches,
                    howToDo: ["Sit yourself on the decline bench and fix your legs. ",
                        " Cross your arms over the chest and bring with a rolling movement your upper body up, go now without a pause and with a slow movement down again.",
                        "Don't let your head move during the exercise."
                    ]
                },
                {
                    exerciseName: "Leg Raises,Lying", imgSrc: legRaisesLying,
                    howToDo: ["Start by lying down on the floor or a mat. Unfortunately, it gets tougher from here.",
                        " Lay flat with your arms at your sides and legs stretched out next to each other, then raise those legs.",
                        "Even if you can’t hold them perfectly rigid, keep your legs as straight as possible, and lift them until they are pointing at the ceiling, or as near as you can get. Make sure your toes are pointed.",
                        "Then lower them back down, being careful to keep your movements measured.",
                        "The return journey should be at the same pace at which you raised your legs.",
                        "Lower them until they’re hovering just above the ground, and then raise them again. Shoot for three sets of 10 reps, or simply do as many raises as you can – keeping the pace steady – in a set time as part of a circuit."
                    ]
                },
                {
                    exerciseName: "Side Leg Raises", imgSrc: sideLegRaises,
                    howToDo: ["Stand adjacent to a chair, keeping your back straight and holding onto the chair as a support. Lift one leg and keep the other rooted to the floor. It is your initial position.",
                        "Keep the leg straight, and extend it to the side as far as you can and hold it in that position for 5-10 seconds. Then lower the leg back to the original position, crossing the other leg.",
                        "Repeat the motion 5-10 times, and increase the range over time.",
                        "Perform the exercise with the other leg."
                    ]
                }
            ],
            Moderate: [
                { exerciseName: "Side Crunch", imgSrc: "", howToDo: [] },
                { exerciseName: "Side Plank", imgSrc: "", howToDo: [] },
                { exerciseName: "Scissors", imgSrc: "", howToDo: [] },
                { exerciseName: "L Hold", imgSrc: "", howToDo: [] },
                { exerciseName: "Trunk Rotation With Cable", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseName: "Hanging leg Raises", imgSrc: "", howToDo: [] },
                { exerciseName: "Hanging Side Raises", imgSrc: "", howToDo: [] },
                { exerciseName: "Russian Twists", imgSrc: "", howToDo: [] },
            ]
        },
    },
    {
        id: 2,
        bodyPart: "Legs",
        level: {
            Beginner: [
                { exerciseName: "Skipping", imgSrc: "", howToDo: [] },
                { exerciseName: "Barbell Back Squats", imgSrc: "", howToDo: [] },
                { exerciseName: "Barbell Front Squats", imgSrc: "", howToDo: [] },
                { exerciseName: "Goblet Squat", imgSrc: "", howToDo: [] },
                { exerciseName: "Dumbbell Step-up", imgSrc: "", howToDo: [] },
                { exerciseName: "Glute Bridge", imgSrc: "", howToDo: [] },
                { exerciseName: "Calf Raises", imgSrc: "", howToDo: [] },
                { exerciseName: "Leg Curl", imgSrc: "", howToDo: [] },
                { exerciseName: "Leg Extension", imgSrc: "", howToDo: [] },
                { exerciseName: "Leg Press", imgSrc: "", howToDo: [] },
                { exerciseName: "Wall Sit", imgSrc: "", howToDo: [] },
                { exerciseName: "Squat Jump", imgSrc: "", howToDo: [] },
            ],
            Moderate: [
                { exerciseName: "Hex bar deadlift", imgSrc: "", howToDo: [] },
                { exerciseName: "Walking lunge with dumbbells", imgSrc: "", howToDo: [] },
                { exerciseName: "Single-leg Romanian deadlift", imgSrc: "", howToDo: [] },
                { exerciseName: "Calf Press Using Leg Press Machine", imgSrc: "", howToDo: [] },
                { exerciseName: "Kettlebell swing", imgSrc: "", howToDo: [] },
                { exerciseName: "Sumo deadlift", imgSrc: "", howToDo: [] },
                { exerciseName: "Farmer’s walk", imgSrc: "", howToDo: [] },
                { exerciseName: "Single-leg glute bridge", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseName: "Overhead squat", imgSrc: "", howToDo: [] },
                { exerciseName: "Bulgarian split squat", imgSrc: "", howToDo: [] },
                { exerciseName: "Hang clean", imgSrc: "", howToDo: [] },
                { exerciseName: "Thruster", imgSrc: "", howToDo: [] },
                { exerciseName: "Deadlift", imgSrc: "", howToDo: [] },
            ]
        }
    },
    {
        id: 3,
        bodyPart: "Back",
        level: {
            Beginner: [
                { exerciseName: "Pull up", imgSrc: "", howToDo: [] },
                { exerciseName: "chin up", imgSrc: "", howToDo: [] },
                { exerciseName: "Lat Pull Down (Leaning Back)", imgSrc: "", howToDo: [] },
                { exerciseName: "Lat Pull Down (Straight Back)", imgSrc: "", howToDo: [] },
                { exerciseName: "Leverage Machine Iso Row", imgSrc: "", howToDo: [] },
                { exerciseName: "Hip Raise Lying", imgSrc: "", howToDo: [] },
                { exerciseName: "Long-Pulley rowing", imgSrc: "", howToDo: [] },
            ],
            Moderate: [
                { exerciseName: "Hyperextensions", imgSrc: "", howToDo: [] },
                { exerciseName: "Bent Over Barbell Rowing", imgSrc: "", howToDo: [] },
                { exerciseName: "Bent Over Dumbbell Rowing", imgSrc: "", howToDo: [] },
                { exerciseName: "Incline Dumbbell Row", imgSrc: "", howToDo: [] },
                { exerciseName: "Rack Deadlift", imgSrc: "", howToDo: [] },
                { exerciseName: "Straight-arm Pull Down(bar Attachment)", imgSrc: "", howToDo: [] },
                { exerciseName: "Straight-arm Pull Down(rope Attachment)", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseName: "Muscle up", imgSrc: "", howToDo: [] },
                { exerciseName: "Deadlift", imgSrc: "", howToDo: [] },
            ]
        }
    },
    {
        id: 4,
        bodyPart: "Arms",
        level: {
            Beginner: [
                { exerciseName: "Biceps Curl Dumbbell", imgSrc: "", howToDo: [] },
                { exerciseName: "Biceps Curl Cable", imgSrc: "", howToDo: [] },
                { exerciseName: "Biceps Curl Barbell", imgSrc: "", howToDo: [] },
                { exerciseName: "Biceps Curls With SZ-bar", imgSrc: "", howToDo: [] },
                { exerciseName: "Dips between Two Benches", imgSrc: "", howToDo: [] },
                { exerciseName: "Cable Tricep Extension with rope", imgSrc: "", howToDo: [] },
                { exerciseName: "Cable Tricep Extension with bar", imgSrc: "", howToDo: [] },
                { exerciseName: "Dumbbell Tricep Extension", imgSrc: "", howToDo: [] },
            ],
            Moderate: [
                { exerciseName: "Hammercurls", imgSrc: "", howToDo: [] },
                { exerciseName: "Hammercurls on Cable", imgSrc: "", howToDo: [] },
                { exerciseName: "Dumbbell Concentration Curl", imgSrc: "", howToDo: [] },
                { exerciseName: "Preacher Curls", imgSrc: "", howToDo: [] },
                { exerciseName: "Reverse SZ-Bar Curl", imgSrc: "", howToDo: [] },
                { exerciseName: "Reverse Barbell Curl", imgSrc: "", howToDo: [] },
                { exerciseName: "Pike Push Ups", imgSrc: "", howToDo: [] },
                { exerciseName: "Skullcrusher Dumbbells", imgSrc: "", howToDo: [] },
                { exerciseName: "Skullcrusher SZ-bar", imgSrc: "", howToDo: [] },
                { exerciseName: "Bench Press Narrow Grip", imgSrc: "", howToDo: [] },
                { exerciseName: "Tricep Dumbbell Kickback", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseName: "Dips", imgSrc: "", howToDo: [] },
                { exerciseName: "Overhead Tricep Cable Extension with bar", imgSrc: "", howToDo: [] },
                { exerciseName: "Overhead Tricep Cable Extension with rope", imgSrc: "", howToDo: [] },
            ]
        },
    },
    {
        id: 5,
        bodyPart: "Chest",
        level: {
            Beginner: [
                { exerciseName: "Push up with support of knee", imgSrc: "", howToDo: [] },
                { exerciseName: "Clean Push up", imgSrc: "", howToDo: [] },
                { exerciseName: "flat Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseName: "incline Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseName: "decline Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseName: "Flat machine bench press", imgSrc: "", howToDo: [] },
                { exerciseName: "Cable chest fly", imgSrc: "", howToDo: [] },
                { exerciseName: "Pec dec", imgSrc: "", howToDo: [] },
            ],
            Moderate: [
                { exerciseName: "Incline barbell bench press", imgSrc: "", howToDo: [] },
                { exerciseName: "Flat barbell bench press", imgSrc: "", howToDo: [] },
                { exerciseName: "Decline barbell bench press", imgSrc: "", howToDo: [] },
                { exerciseName: "Dip machine", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseName: "Burpee", imgSrc: "", howToDo: [] },
                { exerciseName: "Weighted dips", imgSrc: "", howToDo: [] },
                { exerciseName: "Weighted pushups", imgSrc: "", howToDo: [] },
                { exerciseName: "Clap press-up", imgSrc: "", howToDo: [] },
                { exerciseName: "Landmine press", imgSrc: "", howToDo: [] },
                { exerciseName: "Guillotine press", imgSrc: "", howToDo: [] },
            ]
        },
    },
    {
        id: 6,
        bodyPart: "Shoulders",
        level: {
            Beginner: [
                { exerciseName: "Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseName: "Front raises", imgSrc: "", howToDo: [] },
                { exerciseName: "Lateral Raises", imgSrc: "", howToDo: [] },
                { exerciseName: "Facepull", imgSrc: "", howToDo: [] },
                { exerciseName: "Shoulder Press Machine", imgSrc: "", howToDo: [] },
                { exerciseName: "Shrugs Barbells", imgSrc: "", howToDo: [] },
                { exerciseName: "Shrugs Dumbbells", imgSrc: "", howToDo: [] },
            ],
            Moderate: [
                { exerciseName: "Arnold Shoulder Press", imgSrc: "", howToDo: [] },
                { exerciseName: "Military Press", imgSrc: "", howToDo: [] },
                { exerciseName: "Upright Row Dumbbells", imgSrc: "", howToDo: [] },
                { exerciseName: "Upright Row SZ-bar", imgSrc: "", howToDo: [] },
                { exerciseName: "Lateral Raises on Cable,One Armed", imgSrc: "", howToDo: [] },
                { exerciseName: "Bent High Pulls", imgSrc: "", howToDo: [] },
                { exerciseName: "Rear Delt Raises", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseName: "Frog stand", imgSrc: "", howToDo: [] },
                { exerciseName: "Wall Handstand", imgSrc: "", howToDo: [] },
                { exerciseName: "Handstand", imgSrc: "", howToDo: [] },
                { exerciseName: "Snach", imgSrc: "", howToDo: [] },
            ]
        },
    },


];

export default exerciseList;