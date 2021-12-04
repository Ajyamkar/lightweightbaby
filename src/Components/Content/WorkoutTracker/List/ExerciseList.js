import crunches from "../Images/Abs/crunches.jpg";
import crunchesWithLegsUp from "../Images/Abs/crunches-with-legs-up.gif";
import crunchesOnMachine from "../Images/Abs/crunchesOnMachine.jfif";
import plank from "../Images/Abs/plank.png";
import russianTwists from "../Images/Abs/russianTwists.png";
import neagativeCrunches from "../Images/Abs/neagativeCrunches.gif";
import legRaisesLying from "../Images/Abs/legRaisesLying.png";
import sideLegRaises from "../Images/Abs/sideLegRaises.jpg";
import sideCrunch from "../Images/Abs/standingSideCrunch.gif";
import sideObliqueCrunch from "../Images/Abs/sideObliqueCrunch.gif";
import standingObliqueCrunch from "../Images/Abs/standingObliqueCrunch.gif";
import sidePlank from "../Images/Abs/sidePlank.jpg";
import scissors from "../Images/Abs/scissors.jpg";
import cableTorsoRotation from "../Images/Abs/cableTorsoRotation.jpg";
import hangingLegRaises from "../Images/Abs/hangingLegRaises.jpg";
import hangingKneeRaises from "../Images/Abs/hangingKneeRaise.jpg";
import hangingLegRaiseWithTwist from "../Images/Abs/hangingLegRaiseWithTwist.jpg";

// exerciseId nomenclature:-
// 1st digit=> is bodypart id 
// 2nd digit=> represents whether is a beginner||intermediate||Advance level and 
//             digits will be 1||2||3;
// futher digits=> will serial order no of exercise of that particular level

const exerciseList = [
    {
        id: 1,
        bodyPart: "Abs",
        level: {
            Beginner: [
                {
                    exerciseId: 111,
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
                    exerciseId: 112,
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
                    exerciseId: 113,
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
                    exerciseId: 114,
                    exerciseName: "Plank", imgSrc: plank,
                    howToDo: ["Begin in the plank position, face down with your forearms and toes on the floor. Your elbows are directly under your shoulders and your forearms are facing forward. Your head is relaxed and you should be looking at the floor.",
                        "Engage your abdominal muscles, drawing your navel toward your spine. Keep your torso straight and rigid and your body in a straight line from your ears to your toes with no sagging or bending. This is the neutral spine position. Ensure your shoulders are down, not creeping up toward your ears. Your heels should be over the balls of your feet.",
                        "Hold this position for 10 seconds. Release to floor.",
                        "Over time work up to 30, 45, or 60 seconds."
                    ]
                },
                {
                    exerciseId: 115,
                    exerciseName: "Russian Twists", imgSrc: russianTwists,
                    howToDo: ["Root into your sit bones as you lift your feet from the floor, keeping your knees bent.",
                        "Elongate and straighten your spine at a 45-degree angle from the floor, creating a V shape with your torso and thighs.",
                        "Reach your arms straight out in front, interlacing your fingers or clasping your hands together.",
                        "Use your abdominals to twist to the right, then back to center, and then to the left.",
                        "This is 1 repetition. Do 2 to 3 sets of 8 to 16 repetitions."
                    ]
                },
                {
                    exerciseId: 116,
                    exerciseName: "Negative Crunches", imgSrc: neagativeCrunches,
                    howToDo: ["Sit yourself on the decline bench and fix your legs. ",
                        " Cross your arms over the chest and bring with a rolling movement your upper body up, go now without a pause and with a slow movement down again.",
                        "Don't let your head move during the exercise."
                    ]
                },
                {
                    exerciseId: 117,
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
                    exerciseId: 118,
                    exerciseName: "Side Crunch", imgSrc: sideCrunch,
                    howToDo: ["From a standing position with your feet at shoulder width and a tall neutral spine, place your arms down by your sides.",
                        "Then lean over to one side, without bending forwards or leaning back, to reach your finger tips as far down the side of the leg you are leaning towards.",
                        " Activate your side body muscles on the side you are leaning towards to help compress you on that side so you can reach further down the leg. These muscles are your obliques, QL plus abs and erectors.",
                        "Return back to an upright position and then repeat by leaning to the other side. Continue side to side for the required duration of the exercise."
                    ]
                },
                {
                    exerciseId: 119,
                    exerciseName: "Side Leg Raises", imgSrc: sideLegRaises,
                    howToDo: ["Stand adjacent to a chair, keeping your back straight and holding onto the chair as a support. Lift one leg and keep the other rooted to the floor. It is your initial position.",
                        "Keep the leg straight, and extend it to the side as far as you can and hold it in that position for 5-10 seconds. Then lower the leg back to the original position, crossing the other leg.",
                        "Repeat the motion 5-10 times, and increase the range over time.",
                        "Perform the exercise with the other leg."
                    ]
                }
            ],
            Intermediate: [
                {
                    exerciseId: 121,
                    exerciseName: "Standing Oblique Crunch", imgSrc: standingObliqueCrunch,
                    howToDo: ["Holding a kettlebell in your left hand, plant both feet on the floor, shoulder-width apart. Place your right hand behind your ear. This is your starting position.",
                        "Inhale. Stretching your right obliques, lower the kettlebell down your left leg and draw your ribs toward your left hip.",
                        "Exhale. Contract your right obliques to straighten your torso to return to the starting position.",
                        "Complete half of the specified number of repetitions on the same side before completing the remaining repetitions on the other side."]
                },
                {
                    exerciseId: 122,
                    exerciseName: "Side Oblique Crunch", imgSrc: sideObliqueCrunch,
                    howToDo: ["Start the exercise by lying on the left side with the legs positioned on top of each other and the knees slightly bent.",
                        "Placing your right hand behind the head, initiate the movement by moving the right elbow up thereby performing the crunch to emphasize your obliques.",
                        "Crunching as high as possible, pause for a second and then descend into the initial position.",
                        " Perform the reps and then switch sides."
                    ]
                },
                {
                    exerciseId: 123,
                    exerciseName: "Side Plank", imgSrc: sidePlank,
                    howToDo: ["Lie on your right side, legs extended and stacked from hip to feet. The elbow of your right arm is directly under your shoulder. Ensure your head is directly in line with your spine. Your left arm can be aligned along the left side of your body.",
                        "Engage your abdominal muscles, drawing your navel toward your spine.",
                        "Lift your hips and knees from the mat while exhaling. Your torso is straight in line with no sagging or bending. Hold the position.",
                        "After several breaths, inhale and return to the starting position. The goal should be to hold for 60 seconds. Change sides and repeat."
                    ]
                },
                {
                    exerciseId: 124,
                    exerciseName: "Scissors", imgSrc: scissors,
                    howToDo: ["Lie down on your back with your hands either at your sides or underneath your glutes for added back support.",
                        " Extend your legs out straight, then twist them in and out above each other, or straight up and down—either way, don't let your legs drop to the mat as you're working through your reps.",
                        " Make sure your core is engaged and that your lower back is pressed onto your mat throughout.",
                        " Move with slow and controlled movements.",
                        "Do four sets of 45 seconds on with a 15-second break."
                    ]
                },
                {
                    exerciseId: 125,
                    exerciseName: "Torso Rotation With Cable", imgSrc: cableTorsoRotation,
                    howToDo: ["Set the pulley on the cable machine to chest height with a D-handle attachment.",
                        " Stand upright facing the cable machine and grasp the handle with both hands while keeping the arms fully extended in front of you.",
                        "From this starting position, rotate your torso to one side, keeping your eyes on your hands as you move.",
                        "Keep the arms fully extended throughout the entire range of motion.",
                        "Allow the torso to rotate to the point right before your hips want to open up.",
                        "Then rotate back to the center and alternate sides.",
                        " Choose a weight that allows a full range of motion without putting unwanted stress on the lower back."
                    ]
                }
            ],
            Advance: [
                // { exerciseName: "L Hold", imgSrc: "", howToDo: [] },
                {
                    exerciseId: 131,
                    exerciseName: "Hanging Knee Raises", imgSrc: hangingKneeRaises,
                    howToDo: ["Hang freely from a pullup bar using an overhand grip, keeping your hands at a shoulder-width distance. If you are tall, you need to increase the width to make sure that your feet do not touch the floor. It is your starting position.",
                        "Brace your core muscles and slowly pull your knees toward the shoulders while keeping the legs together.",
                        "Hold the position for a second when the top portion of your thighs touches your chest.",
                        "Lower your knees to return to the initial position.",
                    ]
                },
                {
                    exerciseId: 132,
                    exerciseName: "Hanging Leg Raises", imgSrc: hangingLegRaises,
                    howToDo: ["Hang from a pull-up bar, extending both your arms overhead using either a medium grip or a wide grip. Make sure the legs are straight down, and the pelvis is rolled slightly backward. It is your starting position",
                        "Tense up your mid-section and raise your legs up slowly until the torso is at 90-degree with the legs. Pause for a few seconds.",
                        "Go back to the original position by lowering your legs",
                        "Repeat for the desired number of reps.",
                        "Repeat until the desired number of reps is completed."
                    ]
                },
                {
                    exerciseId: 133,
                    exerciseName: "Hanging Leg Raise with Twist", imgSrc: hangingLegRaiseWithTwist,
                    howToDo: ["Hold on to a pull-up bar and hang freely with your hands positioned a bit wider than the shoulder-width and the legs fully extended. Make sure that your body is straight and the knees are kept together. It is your initial position.",
                        "Start by flexing your hips and knees, and then drawing your legs up. Lift your knees up to your right side, going beyond 90 degrees at your hips. Squeeze your obliques and abs at the top of the movement.",
                        "Slowly lower your hips to return to the initial position. Repeat the movement on your left side.",
                        "Do the desired number of reps."
                    ]
                },
            ]
        },
    },
    {
        id: 2,
        bodyPart: "Legs",
        level: {
            Beginner: [
                { exerciseId: 211, exerciseName: "Skipping", imgSrc: "", howToDo: [] },
                { exerciseId: 212, exerciseName: "Barbell Back Squats", imgSrc: "", howToDo: [] },
                { exerciseId: 213, exerciseName: "Barbell Front Squats", imgSrc: "", howToDo: [] },
                { exerciseId: 214, exerciseName: "Goblet Squat", imgSrc: "", howToDo: [] },
                { exerciseId: 215, exerciseName: "Dumbbell Step-up", imgSrc: "", howToDo: [] },
                { exerciseId: 216, exerciseName: "Glute Bridge", imgSrc: "", howToDo: [] },
                { exerciseId: 217, exerciseName: "Calf Raises", imgSrc: "", howToDo: [] },
                { exerciseId: 218, exerciseName: "Leg Curl", imgSrc: "", howToDo: [] },
                { exerciseId: 219, exerciseName: "Leg Extension", imgSrc: "", howToDo: [] },
                { exerciseId: 2110, exerciseName: "Leg Press", imgSrc: "", howToDo: [] },
                { exerciseId: 2111, exerciseName: "Wall Sit", imgSrc: "", howToDo: [] },
                { exerciseId: 2112, exerciseName: "Squat Jump", imgSrc: "", howToDo: [] },
            ],
            Intermediate: [
                { exerciseId: 221, exerciseName: "Hex bar deadlift", imgSrc: "", howToDo: [] },
                { exerciseId: 222, exerciseName: "Walking lunge with dumbbells", imgSrc: "", howToDo: [] },
                { exerciseId: 223, exerciseName: "Single-leg Romanian deadlift", imgSrc: "", howToDo: [] },
                { exerciseId: 224, exerciseName: "Calf Press Using Leg Press Machine", imgSrc: "", howToDo: [] },
                { exerciseId: 225, exerciseName: "Kettlebell swing", imgSrc: "", howToDo: [] },
                { exerciseId: 226, exerciseName: "Sumo deadlift", imgSrc: "", howToDo: [] },
                { exerciseId: 227, exerciseName: "Farmer’s walk", imgSrc: "", howToDo: [] },
                { exerciseId: 228, exerciseName: "Single-leg glute bridge", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseId: 231, exerciseName: "Overhead squat", imgSrc: "", howToDo: [] },
                { exerciseId: 232, exerciseName: "Bulgarian split squat", imgSrc: "", howToDo: [] },
                { exerciseId: 233, exerciseName: "Hang clean", imgSrc: "", howToDo: [] },
                { exerciseId: 234, exerciseName: "Thruster", imgSrc: "", howToDo: [] },
                { exerciseId: 235, exerciseName: "Deadlift", imgSrc: "", howToDo: [] },
            ]
        }
    },
    {
        id: 3,
        bodyPart: "Back",
        level: {
            Beginner: [
                { exerciseId: 311, exerciseName: "Pull up", imgSrc: "", howToDo: [] },
                { exerciseId: 312, exerciseName: "chin up", imgSrc: "", howToDo: [] },
                { exerciseId: 313, exerciseName: "Lat Pull Down (Leaning Back)", imgSrc: "", howToDo: [] },
                { exerciseId: 314, exerciseName: "Lat Pull Down (Straight Back)", imgSrc: "", howToDo: [] },
                { exerciseId: 315, exerciseName: "Leverage Machine Iso Row", imgSrc: "", howToDo: [] },
                { exerciseId: 316, exerciseName: "Hip Raise Lying", imgSrc: "", howToDo: [] },
                { exerciseId: 317, exerciseName: "Long-Pulley rowing", imgSrc: "", howToDo: [] },
            ],
            Intermediate: [
                { exerciseId: 321, exerciseName: "Hyperextensions", imgSrc: "", howToDo: [] },
                { exerciseId: 322, exerciseName: "Bent Over Barbell Rowing", imgSrc: "", howToDo: [] },
                { exerciseId: 323, exerciseName: "Bent Over Dumbbell Rowing", imgSrc: "", howToDo: [] },
                { exerciseId: 324, exerciseName: "Incline Dumbbell Row", imgSrc: "", howToDo: [] },
                { exerciseId: 325, exerciseName: "Rack Deadlift", imgSrc: "", howToDo: [] },
                { exerciseId: 326, exerciseName: "Straight-arm Pull Down(bar Attachment)", imgSrc: "", howToDo: [] },
                { exerciseId: 327, exerciseName: "Straight-arm Pull Down(rope Attachment)", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseId: 331, exerciseName: "Muscle up", imgSrc: "", howToDo: [] },
                { exerciseId: 332, exerciseName: "Deadlift", imgSrc: "", howToDo: [] },
            ]
        }
    },
    {
        id: 4,
        bodyPart: "Arms",
        level: {
            Beginner: [
                { exerciseId: 411, exerciseName: "Biceps Curl Dumbbell", imgSrc: "", howToDo: [] },
                { exerciseId: 412, exerciseName: "Biceps Curl Cable", imgSrc: "", howToDo: [] },
                { exerciseId: 413, exerciseName: "Biceps Curl Barbell", imgSrc: "", howToDo: [] },
                { exerciseId: 414, exerciseName: "Biceps Curls With SZ-bar", imgSrc: "", howToDo: [] },
                { exerciseId: 415, exerciseName: "Dips between Two Benches", imgSrc: "", howToDo: [] },
                { exerciseId: 416, exerciseName: "Cable Tricep Extension with rope", imgSrc: "", howToDo: [] },
                { exerciseId: 417, exerciseName: "Cable Tricep Extension with bar", imgSrc: "", howToDo: [] },
                { exerciseId: 418, exerciseName: "Dumbbell Tricep Extension", imgSrc: "", howToDo: [] },
            ],
            Intermediate: [
                { exerciseId: 421, exerciseName: "Hammercurls", imgSrc: "", howToDo: [] },
                { exerciseId: 422, exerciseName: "Hammercurls on Cable", imgSrc: "", howToDo: [] },
                { exerciseId: 423, exerciseName: "Dumbbell Concentration Curl", imgSrc: "", howToDo: [] },
                { exerciseId: 424, exerciseName: "Preacher Curls", imgSrc: "", howToDo: [] },
                { exerciseId: 425, exerciseName: "Reverse SZ-Bar Curl", imgSrc: "", howToDo: [] },
                { exerciseId: 426, exerciseName: "Reverse Barbell Curl", imgSrc: "", howToDo: [] },
                { exerciseId: 427, exerciseName: "Pike Push Ups", imgSrc: "", howToDo: [] },
                { exerciseId: 428, exerciseName: "Skullcrusher Dumbbells", imgSrc: "", howToDo: [] },
                { exerciseId: 429, exerciseName: "Skullcrusher SZ-bar", imgSrc: "", howToDo: [] },
                { exerciseId: 4210, exerciseName: "Bench Press Narrow Grip", imgSrc: "", howToDo: [] },
                { exerciseId: 4211, exerciseName: "Tricep Dumbbell Kickback", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseId: 431, exerciseName: "Dips", imgSrc: "", howToDo: [] },
                { exerciseId: 432, exerciseName: "Overhead Tricep Cable Extension with bar", imgSrc: "", howToDo: [] },
                { exerciseId: 433, exerciseName: "Overhead Tricep Cable Extension with rope", imgSrc: "", howToDo: [] },
            ]
        },
    },
    {
        id: 5,
        bodyPart: "Chest",
        level: {
            Beginner: [
                { exerciseId: 511, exerciseName: "Push up with support of knee", imgSrc: "", howToDo: [] },
                { exerciseId: 512, exerciseName: "Clean Push up", imgSrc: "", howToDo: [] },
                { exerciseId: 513, exerciseName: "flat Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseId: 514, exerciseName: "incline Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseId: 515, exerciseName: "decline Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseId: 516, exerciseName: "Flat machine bench press", imgSrc: "", howToDo: [] },
                { exerciseId: 517, exerciseName: "Cable chest fly", imgSrc: "", howToDo: [] },
                { exerciseId: 518, exerciseName: "Pec dec", imgSrc: "", howToDo: [] },
            ],
            Intermediate: [
                { exerciseId: 521, exerciseName: "Incline barbell bench press", imgSrc: "", howToDo: [] },
                { exerciseId: 522, exerciseName: "Flat barbell bench press", imgSrc: "", howToDo: [] },
                { exerciseId: 523, exerciseName: "Decline barbell bench press", imgSrc: "", howToDo: [] },
                { exerciseId: 524, exerciseName: "Dip machine", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                {exerciseId:531, exerciseName: "Burpee", imgSrc: "", howToDo: [] },
                {exerciseId:532, exerciseName: "Weighted dips", imgSrc: "", howToDo: [] },
                {exerciseId:533, exerciseName: "Weighted pushups", imgSrc: "", howToDo: [] },
                {exerciseId:534, exerciseName: "Clap press-up", imgSrc: "", howToDo: [] },
                {exerciseId:535, exerciseName: "Landmine press", imgSrc: "", howToDo: [] },
                {exerciseId:536, exerciseName: "Guillotine press", imgSrc: "", howToDo: [] },
            ]
        },
    },
    {
        id: 6,
        bodyPart: "Shoulders",
        level: {
            Beginner: [
                { exerciseId:611,exerciseName: "Dumbbell press", imgSrc: "", howToDo: [] },
                { exerciseId:612,exerciseName: "Front raises", imgSrc: "", howToDo: [] },
                { exerciseId:613,exerciseName: "Lateral Raises", imgSrc: "", howToDo: [] },
                { exerciseId:614,exerciseName: "Facepull", imgSrc: "", howToDo: [] },
                { exerciseId:615,exerciseName: "Shoulder Press Machine", imgSrc: "", howToDo: [] },
                { exerciseId:616,exerciseName: "Shrugs Barbells", imgSrc: "", howToDo: [] },
                { exerciseId:617,exerciseName: "Shrugs Dumbbells", imgSrc: "", howToDo: [] },
            ],
            Intermediate: [
                { exerciseId:621,exerciseName: "Arnold Shoulder Press", imgSrc: "", howToDo: [] },
                { exerciseId:622,exerciseName: "Military Press", imgSrc: "", howToDo: [] },
                { exerciseId:623,exerciseName: "Upright Row Dumbbells", imgSrc: "", howToDo: [] },
                { exerciseId:624,exerciseName: "Upright Row SZ-bar", imgSrc: "", howToDo: [] },
                { exerciseId:625,exerciseName: "Lateral Raises on Cable,One Armed", imgSrc: "", howToDo: [] },
                { exerciseId:626,exerciseName: "Bent High Pulls", imgSrc: "", howToDo: [] },
                { exerciseId:627,exerciseName: "Rear Delt Raises", imgSrc: "", howToDo: [] },
            ],
            Advance: [
                { exerciseId:631,exerciseName: "Frog stand", imgSrc: "", howToDo: [] },
                { exerciseId:632,exerciseName: "Wall Handstand", imgSrc: "", howToDo: [] },
                { exerciseId:633,exerciseName: "Handstand", imgSrc: "", howToDo: [] },
                { exerciseId:634,exerciseName: "Snach", imgSrc: "", howToDo: [] },
            ]
        },
    },


];

export default exerciseList;