import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  personal: {
    name: "Sunny Diwa",
    tagline: "Bachelor of Technology in Energy Engineering | IIT Delhi",
    email: "diwasunny519@gmail.com",
    phone: "+91-9315316166",
    location: "New Delhi, India"
  },
  education: [
    {
      degree: "B.Tech in Energy Engineering",
      institute: "Indian Institute of Technology Delhi",
      year: "2026",
      score: "CGPA: 7.51",
      location: "Delhi"
    }
  ],
  achievements: [
    {
      title: "Letter of Recommendation",
      description: "Awarded by Prof. Kaushik Saha for academic excellence & proficiency in B.Tech Project",
      year: "2025"
    },
    {
      title: "KVPY Scholar",
      description: "Selected for the prestigious fellowship award by MHRD, Government of India based on merit",
      year: "2021"
    },
    {
      title: "NTSE Scholar",
      description: "Awarded merit certificate & fellowship by NCERT and Govt. of India on basis of a 2 tier process",
      year: "2020"
    }
  ],
  experience: [
    {
      role: "Data Scientist Intern",
      company: "SLB (Formerly Schlumberger)",
      duration: "May 2025 - Jul. 2025",
      location: "Gurugram",
      points: [
        "Predicted ESP faults early with 15-60 day lead time, 100% recall and 90% precision using a 1D CNN LSTM autoencoder.",
        "Enhanced RUL detection accuracy using Poly Cell LSTM plus Transformer models & statistical methods for robust forecasts.",
        "Improved the RUL error bounds to +33 to -10 days through an integrated statistical framework using anomaly outputs.",
        "Delivered 92% seismic reconstruction across more than 200 wells by applying CNN based gap filling techniques to the data.",
        "Automated CSV analysis workflows with queries through an agentic SQL chatbot designed to streamline data processes."
      ]
    }
  ],
  projects: [
    {
      title: "High-Speed Injector Flow Super-Resolution & AI Analytics",
      subtitle: "Prof. Kaushik Saha | DL & Gen. AI",
      duration: "Aug. 2024 - Present",
      points: [
        "Improved fuel injection video clarity by achieving upscale from 5000 to 20000 FPS via temporal super resolution algorithms.",
        "Delivered high fidelity spray visualization with artifact free views of transient dynamics through advanced processing.",
        "Enabled quantitative spray analysis with extraction of cone angle plume morphology & fuel mass flux using vision algorithms.",
        "Enhanced domain specific technical support by fine tuning GEMMA 3N E4B on custom data for optimized Q&A."
      ]
    },
    {
      title: "Graph Neural Networks for Drug Discovery & Molecular Design",
      subtitle: "Graph Deep Learning",
      duration: "Jan. 2025 - Mar. 2025",
      points: [
        "Achieved 94.7% ROC AUC on ADMET prediction by applying multi head GAT & GraphSAINT on ZINC 250K dataset.",
        "Generated over 10K novel molecules with QED above 0.8 using a Junction Tree VAE with graph convolution layers.",
        "Improved Lipinski Rule compliance by 42% through optimization of MoleGuLAR RL framework with actor critic networks.",
        "Enabled secure multi pharma training on 500K+ compounds using FedGraphNN with differential privacy where ϵ = 0.1."
      ]
    },
    {
      title: "Lane Detection Using Image Segmentation Convolution Networks",
      subtitle: "Deep Learning",
      duration: "Jun. 2024 - Sep. 2024",
      points: [
        "Achieved 94.5% and 95.59% accuracy in lane tasks by integrating U Net with SCNN for segmentation and structure learning.",
        "Delivered 95.8% accuracy and above 600 FPS in lane prediction by refining PolyLaneNet and UltraFast for real time use.",
        "Enabled real time lane modeling through a context aware system that selects the optimal model dynamically during operation."
      ]
    },
    {
      title: "Modeling Hydrocarbons for Fuel Suitability Using Predictive Analytics",
      subtitle: "Prof. Snehasish Panigrahy",
      duration: "Dec. 2024 - Present",
      points: [
        "Improved prediction accuracy of RON, MON, HOV and LFS by 15% using predictive models on engineered molecular data.",
        "Enhanced model reliability by over 12% through Modred and Quantum descriptors, validated via R² and MAE metrics.",
        "Ranked optimal fuel candidates via a merit function, combining modeled thermodynamic and combustion properties."
      ]
    },
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "Python", "C++", "SQL"]
    },
    {
      category: "Libraries & Frameworks",
      items: ["MCP", "LangChain", "TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "Numpy", "Pandas"]
    },
    {
      category: "Softwares & Tools",
      items: ["Git/GitHub", "Docker", "AutoCAD", "Jupyter", "Bash", "Postman", "Microsoft Office", "LaTeX", "Power BI"]
    }
  ]
};