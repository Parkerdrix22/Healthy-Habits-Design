export type PageName = 'home' | 'diet' | 'fitness' | 'screen' | 'goals' | 'profile' | 'menu' | 'login';

export type ChildName = 'Avery' | 'Jordan';

export interface FamilyMember {
  name: string;
  role: string;
}

export interface ChildData {
  home: {
    streakDays: string;
    goalsMet: string;
    sleepHours: string;
    stepsToday: string;
    momentum: number[];
  };
  fitness: {
    weekly: number[];
    activities: string[];
    calories: string;
    focus: string;
  };
  diet: {
    foodLog: string[];
    waterCups: string;
    veggieServings: string;
    sugar: string;
    protein: string;
  };
  screen: {
    totalHours: string;
    goalHours: string;
    familyAvg: string;
    weekly: number[];
  };
  goals: {
    streak: string;
    progressPercent: number;
    nextGoal: string;
  };
  profile: {
    family: FamilyMember[];
  };
}

export const pageTitles: Record<PageName, string> = {
  home: 'Healthy Habits',
  diet: 'Diet',
  fitness: 'Fitness',
  screen: 'Screen Time',
  goals: 'Goals',
  profile: 'Profile & Family',
  menu: 'Menu',
  login: 'Login',
};

export const appData: Record<ChildName, ChildData> = {
  Avery: {
    home: {
      streakDays: '14 days',
      goalsMet: '4 / 5',
      sleepHours: '7.5 h',
      stepsToday: '8,200',
      momentum: [58, 68, 74, 61, 80, 84, 72],
    },
    fitness: {
      weekly: [68, 54, 76, 64, 73, 82, 61],
      activities: ['Soccer drills', 'Bike ride', 'Family walk', 'Yoga stretch'],
      calories: '420',
      focus: 'Cardio + Mobility',
    },
    diet: {
      foodLog: ['Avocado toast', 'Berry yogurt bowl', 'Chicken wrap', 'Salmon + rice'],
      waterCups: '6',
      veggieServings: '4',
      sugar: 'Low',
      protein: 'Moderate',
    },
    screen: {
      totalHours: '2.1 hrs',
      goalHours: '2.0 hrs',
      familyAvg: '2.4 hrs',
      weekly: [42, 58, 48, 52, 50, 46, 44],
    },
    goals: {
      streak: '9 days',
      progressPercent: 72,
      nextGoal: 'Read 20 minutes',
    },
    profile: {
      family: [
        { name: 'Jamie Parker', role: 'Parent' },
        { name: 'Avery Parker', role: 'Child' },
        { name: 'Jordan Parker', role: 'Child' },
      ],
    },
  },
  Jordan: {
    home: {
      streakDays: '10 days',
      goalsMet: '3 / 5',
      sleepHours: '8.1 h',
      stepsToday: '6,900',
      momentum: [52, 60, 66, 58, 63, 75, 69],
    },
    fitness: {
      weekly: [52, 48, 70, 57, 61, 66, 59],
      activities: ['Basketball', 'Jump rope', 'Nature walk', 'Dance cardio'],
      calories: '360',
      focus: 'Endurance',
    },
    diet: {
      foodLog: ['Fruit smoothie', 'Turkey sandwich', 'Veggie pasta', 'Nuts + apple'],
      waterCups: '5',
      veggieServings: '3',
      sugar: 'Medium',
      protein: 'Balanced',
    },
    screen: {
      totalHours: '1.8 hrs',
      goalHours: '2.0 hrs',
      familyAvg: '2.1 hrs',
      weekly: [38, 46, 40, 44, 41, 39, 37],
    },
    goals: {
      streak: '6 days',
      progressPercent: 58,
      nextGoal: 'Stretch after school',
    },
    profile: {
      family: [
        { name: 'Jamie Parker', role: 'Parent' },
        { name: 'Avery Parker', role: 'Sibling' },
        { name: 'Jordan Parker', role: 'Child' },
      ],
    },
  },
};
