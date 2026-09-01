export const profile = {
  name: 'Waleed Alharbi',
  location: 'Al-Qassim, Saudi Arabia',
  education: 'Bachelor of Science in Information Technology',
  university: 'Qassim University',
  gpa: '4.02 / 5',
  careerStage: 'Fresh Graduate / Entry Level',
  training: {
    organization: 'Smart Methods',
    duration: '420 hours',
    location: 'Riyadh, Saudi Arabia',
  },
  github: 'https://github.com/Waleed-Alharbi',
} as const;

export const skillGroups = [
  {
    key: 'build',
    skills: [
      { name: 'Python', projects: ['Helpdesk', 'SOC', 'WaqtTech', 'BASIRA', 'BUNYA'] },
      { name: 'JavaScript', projects: ['Helpdesk', 'SOC', 'WaqtTech', 'BASIRA', 'BUNYA'] },
      { name: 'React', projects: ['Helpdesk', 'SOC', 'WaqtTech', 'BASIRA', 'BUNYA'] },
      { name: 'FastAPI', projects: ['Helpdesk', 'SOC', 'WaqtTech', 'BASIRA', 'BUNYA'] },
    ],
  },
  {
    key: 'data',
    skills: [
      { name: 'Pandas', projects: ['BASIRA', 'Graduation Project'] },
      { name: 'NumPy', projects: ['BASIRA', 'Graduation Project'] },
      { name: 'Scikit-learn', projects: ['BASIRA'] },
      { name: 'LSTM · GRU · CNN-LSTM', projects: ['Graduation Project'] },
    ],
  },
  {
    key: 'systems',
    skills: [
      { name: 'SQL · SQLite', projects: ['Helpdesk', 'SOC', 'WaqtTech'] },
      { name: 'REST APIs', projects: ['Helpdesk', 'SOC', 'WaqtTech', 'BASIRA', 'BUNYA'] },
      { name: 'Docker', projects: ['Helpdesk', 'SOC'] },
      { name: 'Infrastructure concepts', projects: ['BUNYA'] },
    ],
  },
  {
    key: 'tools',
    skills: [
      { name: 'Git', projects: ['All projects'] },
      { name: 'GitHub', projects: ['All projects'] },
      { name: 'VS Code', projects: ['Development workflow'] },
      { name: 'Vite', projects: ['All projects'] },
    ],
  },
] as const;
