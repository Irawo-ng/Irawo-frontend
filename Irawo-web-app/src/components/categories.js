// export const categories = {
//   {"Social Event": [
//     "introducing yourself",
//     "small talk",
//     "networking",
//     "first date",
//     "Group gathering",
//     "casual party",
//     "formal reception",
//   ]}
//   Workplace: [
//     "Team Collaboration",
//     "brainstorming session",
//     "client meeting",
//     "performance review",
//     "Handling Conflict",
//     "work lunch",
//     "casual office interaction",
//   ],
//   school: [
//     "Playing",
//     "Rehearsing for a school project",
//     "Studying",
//     "Chitchatting",
//     "Partying",
//     "Socialising",
//   ],
// };

// export const roles = [
//   "teacher",
//   "lecturer, guidance councellor",
//   "class mate",
//   "course mate",
// ];

export const categories = {
  "social event": {
    scenario_tags: [
      "Introducing Yourself",
      "Small Talk",
      "Networking",
      "Partying",
    ],
    roles: ["Stranger", "Acquaintance", "Friend"],
  },
  Workplace: {
    scenario_tags: [
      "Brainstorming ideas",
      "Handling Conflicts",
      "Team Collaboration",
      "Professionally networking",
    ],
    roles: ["Team Leader", "Friend", "Colleague"],
  },
  school: {
    scenario_tags: ["Playing", "Studying", "Chitchatting"],
    roles: ["Classmate", "Lecturer", "Friend"],
  },
};
