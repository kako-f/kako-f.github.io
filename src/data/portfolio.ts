export type Project = {
  name: string
  description: string
  details: string
  href?: string
}

export const portfolio = {
  name: 'Camilo Fuentes Beals',
  roles: ['PhD in Science', 'Bioinformatics', 'Data Science','Data Engineer', 'Software Engineering', 'AI/ML'],
  intro:
    'I build computational tools and data-driven systems, with a background in Bioinformatics, Genomics and Software Development.',
  about:
    'My work connects biological research, machine learning, data engineering, and software development. I enjoy turning complex questions into dependable tools, clear analyses, and useful systems.',
  expertise: [
    ['Computational biology', 'Genomics, transposable elements, and reproducible research.'],
    ['Data systems', 'Data engineering, machine learning, and analytical products.'],
    ['Software engineering', 'Research-grade tools and production web applications.'],
    ['IA/ML', 'Application, Development and model analysis.'],
  ],
  projects: [
    {
      name: 'LearningAnalytics2',
      description: 'Learning data tools and analytics.',
      details: 'Data analysis · software development',
      href: 'https://github.com/kako-f/learningAnalytics2',
    },
    {
      name: 'Genomics and transposable-element research',
      description: 'Computational research into genome dynamics.',
      details: 'Genomics · bioinformatics · reproducible research',
      href: 'https://scholar.google.com/citations?user=4ZyYL5AAAAAJ',
    },
    {
      name: 'PhotoCrispy',
      description: 'An interactive graphics application.',
      details: 'C++ · OpenGL · GLSL · ImGui',
    },
    {
      name: 'BankData',
      description: 'A data-focused financial application.',
      details: 'Django · React · PostgreSQL',
    },
  ] satisfies Project[],
  research:
    'My research spans genomics and transposable elements, using computational methods to ask biological questions. I also teach and mentor around data literacy, reproducibility, and scientific software.',
  toolkit: {
    research: ['Python', 'R', 'Bioinformatics','Genomics', 'Reproducible research'],
    data: ['Machine learning', 'Data engineering', 'PostgreSQL','SQL'],
    software: ['C++','Java', 'React', 'Django','TypeScript' ],
  },
  links: {
    github: 'https://github.com/kako-f',
    scholar: 'https://scholar.google.com/citations?user=4ZyYL5AAAAAJ',
    website: 'https://cakofuentes.com/',
  },
} as const
