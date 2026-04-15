// ═══════════════════════════════════════════════════════
//  DATA.JS  —  All curriculum content
// ═══════════════════════════════════════════════════════

const PHASES = [
  {
    id: 'p1', num: '01', color: '#22c55e',
    title: 'Engineering Foundations & Python Mastery',
    subtitle: 'Weeks 1–12 · ~180 hrs · 3 projects',
    inspired: 'MIT Missing Semester · PCC 3rd Ed. · PY4E',
    modules: [
      {
        num: '1.1', title: 'Dev Environment & Engineering Workflow',
        weeks: 'Weeks 1–2',
        topics: [
          'Terminal fluency: Bash, navigation, piping, scripting',
          'Git: branches, rebasing, PRs, GitHub Actions intro',
          'VS Code + Python setup, virtual environments, pip',
          'README-driven development & documentation habits',
          'Reading other people\'s codebases'
        ],
        project: { name: 'GitHub Profile + Dev Portfolio Shell', desc: 'Professional README, team-style Git workflow with branches and PRs, GitHub Actions CI' },
        deliverables: ['Public GitHub profile with pinned repos', 'Professional README with badges', 'First GitHub Actions workflow running'],
        sources: ['MIT Missing Semester', 'GitHub Docs']
      },
      {
        num: '1.2', title: 'Python Like a Researcher',
        weeks: 'Weeks 3–5',
        topics: [
          'OOP deep-dive: classes, inheritance, dunder methods',
          'Error handling, context managers, logging',
          'Unit testing with pytest: writing, running, mocking',
          'Type hints, PEP 8, comprehensions, generators, decorators',
          'Packaging: modules, packages, pip, pyproject.toml'
        ],
        project: { name: 'CLI ML Experiment Runner', desc: 'OOP-designed experiment manager with JSON config, argparse, full pytest coverage, and structured logging' },
        deliverables: ['100% pytest coverage', 'Published to PyPI (or TestPyPI)', 'Clean OOP architecture with type hints'],
        sources: ['PCC 3rd Ed.', 'PY4E', 'Real Python']
      },
      {
        num: '1.3', title: 'NumPy, Pandas & Data Foundations',
        weeks: 'Weeks 6–8',
        topics: [
          'NumPy: arrays, broadcasting, vectorisation, einsum',
          'Pandas: DataFrames, groupby, merge, time series',
          'Matplotlib & Seaborn for exploratory analysis',
          'Full EDA workflow on a real dataset',
          'SQL: joins, window functions, CTEs (for data pipelines)'
        ],
        project: { name: 'EDA Notebook on Kaggle Dataset', desc: 'End-to-end analysis: cleaning, analysis, visualisation, SQL queries — published as Kaggle notebook' },
        deliverables: ['Kaggle notebook published', 'SQL queries documented', 'Minimum 5 visualisations with insights'],
        sources: ['numpy.org/doc', 'pandas.pydata.org', 'Kaggle']
      },
      {
        num: '1.4', title: 'Math for ML — Linear Algebra & Calculus',
        weeks: 'Weeks 1–12 (parallel)',
        topics: [
          'Vectors, matrices, matrix multiplication — geometric intuition',
          'Eigenvalues, eigenvectors, SVD, PCA from scratch',
          'Derivatives, chain rule, partial derivatives',
          'Gradient descent: derivation and NumPy implementation',
          'Probability: distributions, Bayes\' theorem, MLE'
        ],
        project: { name: 'Math Foundations Notebook', desc: 'PCA from scratch in NumPy, gradient descent visualised, Bayesian inference worked examples — all with written explanations' },
        deliverables: ['PCA implemented in NumPy matching sklearn output', 'Gradient descent animated plot', 'Written explanations of every derivation'],
        sources: ['MML Book (free)', '3Blue1Brown', 'Gilbert Strang MIT OCW', 'Khan Academy']
      }
    ]
  },
  {
    id: 'p2', num: '02', color: '#3b82f6',
    title: 'Classical ML — Theory + Implementation from Scratch',
    subtitle: 'Weeks 13–26 · ~210 hrs · 3 projects',
    inspired: 'Stanford CS229 · Hands-On ML · deeplearning.ai',
    modules: [
      {
        num: '2.1', title: 'Supervised Learning — From Scratch',
        weeks: 'Weeks 13–16',
        topics: [
          'Linear regression: closed form + gradient descent in NumPy',
          'Logistic regression: sigmoid, cross-entropy, backprop by hand',
          'Decision trees: information gain, Gini, recursive splitting',
          'Bias-variance tradeoff, regularisation (L1/L2), overfitting',
          '⭐ Read: Stanford CS229 Lecture Notes (Andrew Ng)'
        ],
        project: { name: 'ML Algorithms from Scratch', desc: 'Implement linear + logistic regression from scratch in NumPy, compare against sklearn, write a technical blog post explaining the math' },
        deliverables: ['NumPy implementations matching sklearn metrics within 0.1%', 'Technical blog post published (Medium/Substack)', 'GitHub repo with documented math'],
        sources: ['CS229 Notes', 'Hands-On ML Ch.4–6', 'StatQuest']
      },
      {
        num: '2.2', title: 'Ensemble Methods & Model Evaluation',
        weeks: 'Weeks 17–19',
        topics: [
          'Random Forests: bagging, feature importance',
          'Gradient Boosting: XGBoost, LightGBM — when and why',
          'Cross-validation, ROC/AUC, precision-recall curves',
          'Hyperparameter tuning: Optuna (Bayesian optimisation)',
          '⭐ Read: "A Few Useful Things to Know About ML" — Domingos'
        ],
        project: { name: 'Kaggle Competition Entry', desc: 'House Prices or Titanic — full pipeline, feature engineering, ensembling, leaderboard submission with write-up' },
        deliverables: ['Top 20% Kaggle leaderboard position', 'Feature engineering notebook', 'Public write-up of approach'],
        sources: ['Hands-On ML Ch.7', 'XGBoost docs', 'Optuna docs']
      },
      {
        num: '2.3', title: 'Neural Networks — The Math & The Code',
        weeks: 'Weeks 20–23',
        topics: [
          'Perceptron → MLP: forward pass from scratch',
          'Backpropagation: derive it, implement it in NumPy',
          'Activation functions: ReLU, sigmoid, softmax — why each',
          'Optimisers: SGD, momentum, Adam — math + code',
          '⭐ Read: "Yes you should understand backprop" — Karpathy'
        ],
        project: { name: 'MLP from Scratch — MNIST', desc: 'Full MLP in NumPy only: forward pass, backprop, Adam — trained on MNIST, achieve >97% accuracy, document every equation' },
        deliverables: ['>97% MNIST accuracy, NumPy only', 'Annotated backprop derivation in README', 'Training loss/accuracy animated plots'],
        sources: ['deeplearning.ai Wk1–4', 'Karpathy blog', 'CS229 Notes']
      },
      {
        num: '2.4', title: 'Unsupervised Learning & Dimensionality Reduction',
        weeks: 'Weeks 24–26',
        topics: [
          'K-Means from scratch, EM algorithm intuition',
          'PCA: mathematical derivation, NumPy implementation',
          't-SNE and UMAP for high-dim visualisation',
          'Autoencoders: theory + first PyTorch implementation',
          '⭐ Read: CS229 Unsupervised Learning lecture notes'
        ],
        project: { name: 'Autoencoder for Anomaly Detection', desc: 'Implement in PyTorch, visualise latent space with t-SNE/UMAP, deploy as a simple web demo' },
        deliverables: ['Working PyTorch autoencoder', 't-SNE/UMAP visualisation of latent space', 'Anomaly detection demo'],
        sources: ['CS229', 'Hands-On ML Ch.8–9', 'PyTorch docs']
      }
    ]
  },
  {
    id: 'p3', num: '03', color: '#f59e0b',
    title: 'Deep Learning — PyTorch, CNNs, RNNs & the Transformer',
    subtitle: 'Weeks 27–42 · ~240 hrs · 3 projects',
    inspired: 'MIT 6.S191 · fast.ai · Karpathy · original papers',
    modules: [
      {
        num: '3.1', title: 'PyTorch Fluency',
        weeks: 'Weeks 27–30',
        topics: [
          'Tensors, autograd, custom training loops',
          'Dataset & DataLoader, transforms, augmentation',
          'Custom loss functions, schedulers, gradient clipping',
          'Debugging PyTorch: shapes, NaN hunting, profiling',
          'fast.ai Practical Deep Learning Pt. 1 (Lessons 1–5)',
          '⭐ Read: "PyTorch: An Imperative Style, High-Performance DL Library"'
        ],
        project: { name: 'CIFAR-10 Classifier + W&B Tracking', desc: 'Custom PyTorch training loop, W&B experiment tracking, reproducible results, hyperparameter sweep published publicly' },
        deliverables: ['Public W&B run with sweeps', '>85% CIFAR-10 accuracy', 'Reproducible training script with seed'],
        sources: ['pytorch.org/tutorials', 'fast.ai', 'MIT 6.S191']
      },
      {
        num: '3.2', title: 'CNNs & Computer Vision',
        weeks: 'Weeks 31–34',
        topics: [
          'Convolutions: math, receptive fields, pooling',
          'Architectures: LeNet → VGG → ResNet — implement each',
          'Transfer learning: fine-tuning ResNet / EfficientNet',
          'Object detection intuition: YOLO, Faster R-CNN concepts',
          '⭐ Read: "Deep Residual Learning for Image Recognition" (He et al.)'
        ],
        project: { name: 'Fine-tuned ResNet API', desc: 'ResNet fine-tuned on a custom image dataset → FastAPI endpoint → Docker container, model card published' },
        deliverables: ['FastAPI endpoint live', 'Docker image on DockerHub', 'Model card on HuggingFace Hub'],
        sources: ['CS231N Stanford', 'fast.ai Pt.2', 'Papers With Code']
      },
      {
        num: '3.3', title: 'Sequence Models & the Transformer',
        weeks: 'Weeks 35–39',
        topics: [
          'RNNs & LSTMs: vanishing gradients, gating — implement from scratch',
          'Attention mechanism: scaled dot-product, derivation',
          'Transformer architecture: implement from scratch in PyTorch',
          'Positional encoding, multi-head attention, layer norm',
          '⭐ Read: "Attention Is All You Need" (Vaswani et al., 2017)',
          '⭐ Read: "The Illustrated Transformer" — Jay Alammar'
        ],
        project: { name: 'Transformer from Scratch', desc: 'Complete transformer in raw PyTorch — character-level language modelling, annotated line-by-line, public repo' },
        deliverables: ['Complete transformer repo with annotations', 'Character-level LM generating coherent text', 'Written explainer blog post'],
        sources: ['CS224N Stanford', 'MIT 6.S191', 'Karpathy nanoGPT']
      },
      {
        num: '3.4', title: 'MLOps & Research Infrastructure',
        weeks: 'Weeks 40–42',
        topics: [
          'Weights & Biases: experiment tracking, sweeps, artefacts',
          'MLflow for reproducibility',
          'Docker: containerise a PyTorch training job',
          'FastAPI: serve a model as a REST endpoint',
          'GitHub Actions: automated testing for ML pipelines'
        ],
        project: { name: 'Full MLOps Pipeline', desc: 'Model → Docker container → FastAPI → GitHub Actions CI, W&B dashboard publicly visible' },
        deliverables: ['End-to-end CI/CD for ML', 'Public W&B dashboard', 'Docker image with health check endpoint'],
        sources: ['wandb.ai/docs', 'MLflow docs', 'FastAPI docs']
      }
    ]
  },
  {
    id: 'p4', num: '04', color: '#ef4444',
    title: 'Large Models, Fine-Tuning & Applied AI Research',
    subtitle: 'Weeks 43–60 · ~270 hrs · 3 projects',
    inspired: 'Stanford CS224N · deeplearning.ai LLM Spec. · HuggingFace',
    modules: [
      {
        num: '4.1', title: 'NLP & Large Language Models',
        weeks: 'Weeks 43–48',
        topics: [
          'Word embeddings: Word2Vec, GloVe — implement skip-gram',
          'BERT architecture: masked LM, next sentence prediction',
          'GPT family: causal LM, autoregressive generation',
          'Tokenisation: BPE, WordPiece from scratch',
          '⭐ Read: "BERT: Pre-training of Deep Bidirectional Transformers"',
          '⭐ Read: "Language Models are Few-Shot Learners" (GPT-3)'
        ],
        project: { name: 'DistilBERT Fine-tune + HF Model Card', desc: 'Fine-tune DistilBERT on classification task, custom training loop, W&B tracking, model card published to HuggingFace Hub' },
        deliverables: ['Model published on HuggingFace Hub', 'Model card with performance metrics', 'Custom training loop (no Trainer API)'],
        sources: ['CS224N Stanford', 'HuggingFace docs', 'Andrej Karpathy YouTube']
      },
      {
        num: '4.2', title: 'Fine-Tuning, PEFT & Alignment Basics',
        weeks: 'Weeks 49–54',
        topics: [
          'Full fine-tuning vs. parameter-efficient: LoRA, QLoRA, prefix tuning',
          'RLHF: reward modelling, PPO — conceptual + code walkthrough',
          'Constitutional AI and alignment concepts',
          'Instruction tuning: Alpaca, FLAN-T5 approaches',
          '⭐ Read: "LoRA: Low-Rank Adaptation of Large Language Models"',
          '⭐ Read: "Training Language Models to Follow Instructions" (InstructGPT)'
        ],
        project: { name: 'LoRA Fine-tune 7B Model', desc: 'LoRA fine-tune on trade/business domain data — evaluate vs base model, publish full results and methodology' },
        deliverables: ['Fine-tuned model on HuggingFace', 'Evaluation report comparing base vs fine-tuned', 'Technical blog post on methodology'],
        sources: ['deeplearning.ai LLM Spec.', 'HuggingFace PEFT', 'Unsloth']
      },
      {
        num: '4.3', title: 'RAG, Agents & Applied AI Systems',
        weeks: 'Weeks 55–58',
        topics: [
          'Vector databases: embeddings, FAISS, Chroma, retrieval strategies',
          'RAG pipeline: chunking, indexing, retrieval, generation',
          'Agentic systems: tool use, ReAct, multi-agent frameworks',
          'Evaluation: RAGAS, LLM-as-judge, human eval design',
          '⭐ Read: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"'
        ],
        project: { name: 'RAG System + Evaluation Dashboard', desc: 'RAG over technical document corpus — FastAPI backend, RAGAS evaluation metrics, deployed publicly' },
        deliverables: ['Live RAG API endpoint', 'RAGAS evaluation report', 'Demo video walkthrough'],
        sources: ['LangChain docs', 'LlamaIndex', 'FAISS']
      },
      {
        num: '4.4', title: 'Reproducing a Research Paper',
        weeks: 'Weeks 57–60',
        topics: [
          'How to read a paper systematically (3-pass method)',
          'Choosing a reproducible paper (Papers With Code)',
          'Implementing from scratch: matching reported metrics',
          'Writing a reproduction report / technical blog post',
          '⭐ This is the single most impressive ML research portfolio piece'
        ],
        project: { name: 'Paper Reproduction Report', desc: 'Full paper reproduction: implement, train, evaluate, and write a public report — posted to GitHub + technical blog' },
        deliverables: ['Public GitHub repo matching paper metrics', 'Technical report / blog post', 'Submission to ML Reproducibility Challenge'],
        sources: ['Papers With Code', 'arXiv', 'ML Reproducibility Challenge']
      }
    ]
  },
  {
    id: 'p5', num: '05', color: '#a855f7',
    title: 'Research Portfolio & Job Readiness',
    subtitle: 'Weeks 61–72 · ~180 hrs · 2 projects',
    inspired: 'Chip Huyen · LeetCode · ML System Design',
    modules: [
      {
        num: '5.1', title: 'ML Systems & Scaling',
        weeks: 'Weeks 61–64',
        topics: [
          'Distributed training: DDP, model parallelism, FSDP concepts',
          'Mixed precision training: FP16, BF16, gradient scaling',
          'Inference optimisation: quantisation, KV cache, speculative decoding',
          'GPU memory management: gradient checkpointing',
          '⭐ Read: "Scaling Laws for Neural Language Models" (Kaplan et al.)'
        ],
        project: { name: 'Benchmarking Report: Full vs Quantised', desc: 'Compare full-precision vs quantised model — latency, memory, quality tradeoffs documented publicly' },
        deliverables: ['Public benchmarking report', 'Reproducible benchmark script', 'Performance comparison table'],
        sources: ['PyTorch DDP docs', 'HuggingFace Accelerate', 'bitsandbytes']
      },
      {
        num: '5.2', title: 'Interview Prep & Research Communication',
        weeks: 'Weeks 65–72',
        topics: [
          'ML coding interviews: implement models, explain math under pressure',
          'System design: recommendation system, fine-tuning pipeline',
          'Paper discussion prep: discuss any paper you\'ve read',
          'Portfolio polish: README quality, demo videos, blog posts',
          'LeetCode: 50 medium problems, focus on array/graph/DP'
        ],
        project: { name: 'Original Mini-Research Project', desc: 'A novel experiment or ablation study — written up as a technical report with proper methodology' },
        deliverables: ['Original research question + hypothesis', 'Rigorous experimental methodology', 'Public technical report or arXiv preprint'],
        sources: ['Chip Huyen ML Interviews', 'LeetCode', 'ML System Design']
      }
    ]
  }
];

const TASKS = [
  // PHASE 1
  {id:1,name:'Terminal & Bash fluency (MIT Missing Semester)',phase:'Phase 1',weeks:'1–2',resource:'MIT Missing Semester',paper:false},
  {id:2,name:'Git: branches, rebasing, PRs, GitHub Actions',phase:'Phase 1',weeks:'1–2',resource:'GitHub Docs',paper:false},
  {id:3,name:'VS Code Python setup, venvs, pyproject.toml',phase:'Phase 1',weeks:'1–2',resource:'Real Python',paper:false},
  {id:4,name:'OOP deep-dive: classes, inheritance, dunder methods',phase:'Phase 1',weeks:'3–5',resource:'PCC Ch.9',paper:false},
  {id:5,name:'pytest: unit testing, mocking, fixtures',phase:'Phase 1',weeks:'3–5',resource:'pytest docs',paper:false},
  {id:6,name:'Type hints, generators, decorators, comprehensions',phase:'Phase 1',weeks:'3–5',resource:'PY4E / PCC',paper:false},
  {id:7,name:'NumPy: arrays, broadcasting, vectorisation, einsum',phase:'Phase 1',weeks:'6–8',resource:'numpy.org/doc',paper:false},
  {id:8,name:'Pandas: DataFrames, groupby, merge, time series',phase:'Phase 1',weeks:'6–8',resource:'pandas.pydata.org',paper:false},
  {id:9,name:'Matplotlib & Seaborn: EDA workflow',phase:'Phase 1',weeks:'6–8',resource:'Kaggle notebooks',paper:false},
  {id:10,name:'SQL: joins, window functions, CTEs',phase:'Phase 1',weeks:'6–8',resource:'Mode SQL Tutorial',paper:false},
  {id:11,name:'Linear algebra: vectors, matrices, eigenvalues, SVD',phase:'Phase 1',weeks:'1–12',resource:'MML Book + 3B1B',paper:false},
  {id:12,name:'Calculus: derivatives, chain rule, gradient derivation',phase:'Phase 1',weeks:'1–12',resource:'3B1B Essence of Calculus',paper:false},
  {id:13,name:'Probability: distributions, Bayes, MLE',phase:'Phase 1',weeks:'9–12',resource:'MML Book Ch.6',paper:false},
  // PHASE 2
  {id:14,name:'Linear regression: closed form + GD in NumPy',phase:'Phase 2',weeks:'13–16',resource:'CS229 Notes',paper:false},
  {id:15,name:'Logistic regression: sigmoid, cross-entropy, backprop by hand',phase:'Phase 2',weeks:'13–16',resource:'CS229 Notes',paper:false},
  {id:16,name:'Decision trees: info gain, Gini, recursive split',phase:'Phase 2',weeks:'13–16',resource:'Hands-On ML Ch.6',paper:false},
  {id:17,name:'Bias-variance tradeoff, L1/L2 regularisation',phase:'Phase 2',weeks:'13–16',resource:'Hands-On ML Ch.4',paper:false},
  {id:18,name:'Random Forests: bagging, feature importance',phase:'Phase 2',weeks:'17–19',resource:'Hands-On ML Ch.7',paper:false},
  {id:19,name:'XGBoost & LightGBM: when and why',phase:'Phase 2',weeks:'17–19',resource:'XGBoost docs',paper:false},
  {id:20,name:'Cross-validation, ROC/AUC, Optuna hyperparameter tuning',phase:'Phase 2',weeks:'17–19',resource:'sklearn docs',paper:false},
  {id:21,name:'MLP from scratch: forward pass, backprop in NumPy',phase:'Phase 2',weeks:'20–23',resource:'deeplearning.ai Wk1–4',paper:false},
  {id:22,name:'Optimisers: SGD, momentum, Adam — math + code',phase:'Phase 2',weeks:'20–23',resource:'deeplearning.ai',paper:false},
  {id:23,name:'K-Means + PCA from scratch in NumPy',phase:'Phase 2',weeks:'24–26',resource:'CS229 + Hands-On ML',paper:false},
  {id:24,name:'t-SNE and UMAP for high-dim visualisation',phase:'Phase 2',weeks:'24–26',resource:'sklearn docs',paper:false},
  {id:25,name:'Autoencoder: first PyTorch implementation',phase:'Phase 2',weeks:'24–26',resource:'PyTorch docs',paper:false},
  // PHASE 3
  {id:26,name:'PyTorch: tensors, autograd, custom training loop',phase:'Phase 3',weeks:'27–30',resource:'pytorch.org/tutorials',paper:false},
  {id:27,name:'DataLoader, transforms, augmentation pipeline',phase:'Phase 3',weeks:'27–30',resource:'fast.ai',paper:false},
  {id:28,name:'Custom loss functions, schedulers, gradient clipping',phase:'Phase 3',weeks:'27–30',resource:'fast.ai Pt.1',paper:false},
  {id:29,name:'Convolutions: math, receptive fields, pooling',phase:'Phase 3',weeks:'31–34',resource:'CS231N Stanford',paper:false},
  {id:30,name:'Architectures: LeNet → VGG → ResNet — implement each',phase:'Phase 3',weeks:'31–34',resource:'Papers + CS231N',paper:false},
  {id:31,name:'Transfer learning: fine-tuning ResNet/EfficientNet',phase:'Phase 3',weeks:'31–34',resource:'torchvision docs',paper:false},
  {id:32,name:'⭐ Read: "Deep Residual Learning" (He et al. 2015)',phase:'Phase 3',weeks:'33',resource:'arXiv:1512.03385',paper:true},
  {id:33,name:'RNNs & LSTMs: vanishing gradients, gating from scratch',phase:'Phase 3',weeks:'35–39',resource:'CS224N Stanford',paper:false},
  {id:34,name:'Attention mechanism: scaled dot-product derivation',phase:'Phase 3',weeks:'35–39',resource:'Illustrated Transformer',paper:false},
  {id:35,name:'Transformer from scratch in PyTorch',phase:'Phase 3',weeks:'35–39',resource:'Karpathy nanoGPT',paper:false},
  {id:36,name:'⭐ Read: "Attention Is All You Need" (Vaswani et al. 2017)',phase:'Phase 3',weeks:'37',resource:'arXiv:1706.03762',paper:true},
  {id:37,name:'W&B: experiment tracking, sweeps, artefacts',phase:'Phase 3',weeks:'40–42',resource:'wandb.ai/docs',paper:false},
  {id:38,name:'Docker: containerise a PyTorch training job',phase:'Phase 3',weeks:'40–42',resource:'docker.com',paper:false},
  {id:39,name:'FastAPI: serve a model as REST endpoint',phase:'Phase 3',weeks:'40–42',resource:'fastapi.tiangolo.com',paper:false},
  // PHASE 4
  {id:40,name:'Word2Vec skip-gram implementation + GloVe intuition',phase:'Phase 4',weeks:'43–48',resource:'CS224N',paper:false},
  {id:41,name:'BERT architecture: masked LM, NSP, fine-tuning',phase:'Phase 4',weeks:'43–48',resource:'HuggingFace docs',paper:false},
  {id:42,name:'GPT family: causal LM, autoregressive generation',phase:'Phase 4',weeks:'43–48',resource:'Andrej Karpathy YouTube',paper:false},
  {id:43,name:'⭐ Read: "BERT" (Devlin et al. 2018)',phase:'Phase 4',weeks:'45',resource:'arXiv:1810.04805',paper:true},
  {id:44,name:'LoRA & QLoRA: theory + hands-on fine-tuning',phase:'Phase 4',weeks:'49–54',resource:'HuggingFace PEFT',paper:false},
  {id:45,name:'RLHF: reward modelling, PPO walkthrough',phase:'Phase 4',weeks:'49–54',resource:'deeplearning.ai LLM Spec.',paper:false},
  {id:46,name:'⭐ Read: "LoRA: Low-Rank Adaptation of LLMs"',phase:'Phase 4',weeks:'50',resource:'arXiv:2106.09685',paper:true},
  {id:47,name:'RAG pipeline: chunking, indexing, retrieval, generation',phase:'Phase 4',weeks:'55–58',resource:'LangChain docs',paper:false},
  {id:48,name:'Vector databases: FAISS, Chroma, retrieval strategies',phase:'Phase 4',weeks:'55–58',resource:'FAISS docs',paper:false},
  {id:49,name:'Paper reproduction: implement, train, evaluate, report',phase:'Phase 4',weeks:'57–60',resource:'Papers With Code',paper:false},
  // PHASE 5
  {id:50,name:'Distributed training: DDP, model parallelism, FSDP',phase:'Phase 5',weeks:'61–64',resource:'PyTorch DDP docs',paper:false},
  {id:51,name:'Quantisation, KV cache, speculative decoding',phase:'Phase 5',weeks:'61–64',resource:'bitsandbytes',paper:false},
  {id:52,name:'ML coding interview prep',phase:'Phase 5',weeks:'65–72',resource:'Chip Huyen ML Interviews',paper:false},
  {id:53,name:'System design: recommendation system + fine-tuning pipeline',phase:'Phase 5',weeks:'65–72',resource:'ML System Design',paper:false},
  {id:54,name:'LeetCode: 50 medium problems (array, graph, DP)',phase:'Phase 5',weeks:'65–72',resource:'leetcode.com',paper:false},
];

const PROJECTS = [
  {
    phase:'Phase 1', color:'#22c55e',
    title:'GitHub Profile + Dev Portfolio Shell',
    desc:'Professional GitHub presence: polished README, pinned repos, GitHub Actions CI, and team-style Git workflow.',
    stack:['Git','GitHub','Markdown','Bash','GitHub Actions'],
    status:'In Progress',
    repoName:'portfolio-shell',
    deliverables:['Public GitHub profile','Professional README with badges','GitHub Actions CI pipeline'],
    recruiterNote:'Shows engineering professionalism before writing a single ML line. Most ML candidates skip this.',
    repoStructure: `portfolio-shell/
├── README.md          # Professional profile README
├── .github/
│   └── workflows/
│       └── ci.yml     # GitHub Actions
├── projects/          # Submodule links to other repos
└── docs/              # Portfolio documentation`
  },
  {
    phase:'Phase 1', color:'#22c55e',
    title:'CLI ML Experiment Runner',
    desc:'OOP-designed experiment manager: JSON config, argparse CLI, full pytest coverage, structured logging. Shows Python engineering maturity.',
    stack:['Python','OOP','pytest','argparse','logging'],
    status:'Not Started',
    repoName:'ml-experiment-runner',
    deliverables:['100% pytest coverage','Type-annotated codebase','Published to TestPyPI'],
    recruiterNote:'Demonstrates software engineering fundamentals rarely seen in self-taught ML portfolios.',
    repoStructure: `ml-experiment-runner/
├── src/
│   ├── runner.py      # Core experiment logic
│   ├── config.py      # JSON config parsing
│   └── logger.py      # Structured logging
├── tests/             # Full pytest coverage
├── configs/           # Example experiment configs
├── pyproject.toml     # Packaging
└── README.md`
  },
  {
    phase:'Phase 1', color:'#22c55e',
    title:'Math Foundations Notebook',
    desc:'PCA from scratch in NumPy, gradient descent visualised, Bayesian inference — all with written derivations. Shows you understand the math.',
    stack:['NumPy','Matplotlib','Jupyter','Scipy'],
    status:'Not Started',
    repoName:'ml-math-foundations',
    deliverables:['PCA matching sklearn output','Animated gradient descent','Written derivations for every concept'],
    recruiterNote:'Rare: self-taught candidates rarely show math. This immediately signals research potential.',
    repoStructure: `ml-math-foundations/
├── notebooks/
│   ├── 01-linear-algebra.ipynb
│   ├── 02-calculus-gradient-descent.ipynb
│   ├── 03-probability-bayes.ipynb
│   └── 04-pca-from-scratch.ipynb
├── src/               # Reusable math utilities
└── README.md`
  },
  {
    phase:'Phase 2', color:'#3b82f6',
    title:'ML Algorithms from Scratch',
    desc:'Linear & logistic regression, decision tree — implemented in NumPy, benchmarked against sklearn, explained mathematically with a blog post.',
    stack:['NumPy','sklearn','Matplotlib','Jupyter'],
    status:'Not Started',
    repoName:'ml-from-scratch',
    deliverables:['NumPy implementations ≈ sklearn within 0.1%','Technical blog post','Benchmarking notebook'],
    recruiterNote:'The classic signal: do you understand what sklearn is actually doing? Most candidates don\'t.',
    repoStructure: `ml-from-scratch/
├── algorithms/
│   ├── linear_regression.py
│   ├── logistic_regression.py
│   ├── decision_tree.py
│   └── __init__.py
├── tests/             # Comparison vs sklearn
├── notebooks/         # Derivation + benchmarks
└── blog-post.md       # Published write-up`
  },
  {
    phase:'Phase 2', color:'#3b82f6',
    title:'Kaggle Competition Entry',
    desc:'End-to-end pipeline on House Prices or Titanic: feature engineering, ensembling XGBoost+LightGBM, Optuna tuning, top-20% leaderboard.',
    stack:['Pandas','XGBoost','LightGBM','Optuna','sklearn'],
    status:'Not Started',
    repoName:'kaggle-competition',
    deliverables:['Top 20% Kaggle leaderboard','Feature engineering notebook','Ensembling methodology write-up'],
    recruiterNote:'Kaggle placement is a concrete, verifiable, external benchmark. Include the badge in your README.',
    repoStructure: `kaggle-competition/
├── notebooks/
│   ├── 01-eda.ipynb
│   ├── 02-feature-engineering.ipynb
│   ├── 03-modelling.ipynb
│   └── 04-ensembling.ipynb
├── src/
│   ├── features.py
│   └── models.py
├── submissions/       # Competition submissions
└── README.md          # Leaderboard badge`
  },
  {
    phase:'Phase 2', color:'#3b82f6',
    title:'MLP from Scratch — MNIST',
    desc:'Full MLP in NumPy only: forward pass, backprop, Adam optimiser — >97% accuracy on MNIST with every equation documented.',
    stack:['NumPy','Matplotlib','Jupyter'],
    status:'Not Started',
    repoName:'mlp-from-scratch',
    deliverables:['>97% MNIST accuracy, zero frameworks','Annotated backprop derivation','Animated training visualisation'],
    recruiterNote:'The "backprop from scratch" project is a rite of passage. Gets asked about in ML research interviews.',
    repoStructure: `mlp-from-scratch/
├── src/
│   ├── layers.py      # Dense, Activation, Softmax
│   ├── optimizers.py  # SGD, Momentum, Adam
│   ├── losses.py      # Cross-entropy
│   └── network.py     # MLP class
├── notebooks/
│   └── training.ipynb # Training + visualisation
├── derivations/       # LaTeX backprop derivation
└── README.md`
  },
  {
    phase:'Phase 3', color:'#f59e0b',
    title:'CIFAR-10 Classifier + W&B',
    desc:'Custom PyTorch training loop, W&B experiment tracking, hyperparameter sweeps published publicly. Reproducible baseline.',
    stack:['PyTorch','W&B','Python','CIFAR-10'],
    status:'Not Started',
    repoName:'cifar10-pytorch',
    deliverables:['>85% CIFAR-10 accuracy','Public W&B dashboard with sweeps','Fully reproducible with seed'],
    recruiterNote:'Public W&B dashboard is a portfolio differentiator — recruiters can click through and see your real experiment history.',
    repoStructure: `cifar10-pytorch/
├── src/
│   ├── model.py       # CNN architecture
│   ├── train.py       # Custom training loop
│   ├── evaluate.py    # Evaluation metrics
│   └── config.py      # Hyperparameters
├── sweeps/
│   └── sweep_config.yaml
├── Dockerfile
└── README.md          # W&B dashboard link`
  },
  {
    phase:'Phase 3', color:'#f59e0b',
    title:'Fine-tuned ResNet API',
    desc:'ResNet fine-tuned on custom dataset → FastAPI endpoint → Docker container with health check. Model card on HuggingFace Hub.',
    stack:['PyTorch','FastAPI','Docker','torchvision','HuggingFace'],
    status:'Not Started',
    repoName:'resnet-api',
    deliverables:['Live FastAPI endpoint','Docker image on DockerHub','HuggingFace model card'],
    recruiterNote:'Deployment + MLOps skills in one project. Most junior ML candidates can\'t deploy. You can.',
    repoStructure: `resnet-api/
├── src/
│   ├── model.py       # Fine-tuning logic
│   ├── api.py         # FastAPI app
│   └── preprocess.py  # Image transforms
├── Dockerfile
├── docker-compose.yml
├── model-card.md      # HuggingFace model card
└── README.md`
  },
  {
    phase:'Phase 3', color:'#f59e0b',
    title:'Transformer from Scratch',
    desc:'Complete transformer in raw PyTorch — character-level language model, annotated line-by-line, public repo with explainer blog post.',
    stack:['PyTorch','NumPy','Python'],
    status:'Not Started',
    repoName:'transformer-from-scratch',
    deliverables:['Complete annotated transformer','Character-level LM generating text','Blog post explainer'],
    recruiterNote:'Building the transformer from scratch and explaining it publicly is the gold standard ML portfolio signal.',
    repoStructure: `transformer-from-scratch/
├── src/
│   ├── attention.py   # Multi-head self-attention
│   ├── encoder.py     # Transformer encoder block
│   ├── decoder.py     # Transformer decoder block
│   ├── model.py       # Full transformer
│   └── train.py       # Training loop
├── notebooks/
│   └── char-lm.ipynb  # Character-level demo
├── blog-post.md
└── README.md`
  },
  {
    phase:'Phase 4', color:'#ef4444',
    title:'DistilBERT Fine-tune + HF Model Card',
    desc:'Fine-tuned DistilBERT on domain classification — custom training loop (no Trainer API), W&B tracking, model card published to HuggingFace Hub.',
    stack:['HuggingFace','PyTorch','W&B','PEFT','Transformers'],
    status:'Not Started',
    repoName:'distilbert-finetune',
    deliverables:['Model on HuggingFace Hub','Model card with benchmarks','Custom training loop'],
    recruiterNote:'HuggingFace model with real usage stats is verifiable public evidence of LLM fine-tuning skills.',
    repoStructure: `distilbert-finetune/
├── src/
│   ├── dataset.py     # Custom dataset class
│   ├── model.py       # DistilBERT + head
│   ├── train.py       # Custom training loop
│   └── evaluate.py    # Metrics
├── model-card.md      # HuggingFace model card
├── configs/
└── README.md`
  },
  {
    phase:'Phase 4', color:'#ef4444',
    title:'LoRA Fine-tune 7B Model',
    desc:'LoRA/QLoRA fine-tune on trade/business domain data using your background — full evaluation vs base model, published methodology.',
    stack:['LoRA','QLoRA','Unsloth','HuggingFace','PyTorch'],
    status:'Not Started',
    repoName:'lora-finetune-7b',
    deliverables:['Fine-tuned model on HuggingFace','Quantitative evaluation report','Technical blog on methodology'],
    recruiterNote:'Domain-specific fine-tuning using your own professional background is a unique differentiator nobody else has.',
    repoStructure: `lora-finetune-7b/
├── src/
│   ├── prepare_data.py  # Domain data pipeline
│   ├── finetune.py      # LoRA training
│   └── evaluate.py      # Base vs fine-tuned
├── data/
│   └── domain_data/     # Trade/business domain
├── results/             # Evaluation metrics
├── model-card.md
└── README.md`
  },
  {
    phase:'Phase 4', color:'#ef4444',
    title:'RAG System + Evaluation Dashboard',
    desc:'RAG pipeline over technical document corpus — FastAPI backend, RAGAS evaluation metrics, publicly deployed with a demo.',
    stack:['LangChain','FAISS','FastAPI','Docker','RAGAS'],
    status:'Not Started',
    repoName:'rag-system',
    deliverables:['Live RAG API','RAGAS evaluation report','Demo video walkthrough'],
    recruiterNote:'RAG is the most in-demand applied AI skill in 2025. A deployed, evaluated system beats any course certificate.',
    repoStructure: `rag-system/
├── src/
│   ├── ingestion.py   # Document processing
│   ├── retriever.py   # FAISS vector search
│   ├── generator.py   # LLM generation
│   └── api.py         # FastAPI app
├── evaluation/
│   └── ragas_eval.py  # RAGAS metrics
├── Dockerfile
└── README.md`
  },
  {
    phase:'Phase 5', color:'#a855f7',
    title:'Paper Reproduction Report',
    desc:'Full reproduction of a published ML paper: implement from scratch, match reported metrics, write a public technical report.',
    stack:['PyTorch','W&B','arXiv','Papers With Code'],
    status:'Not Started',
    repoName:'paper-reproduction',
    deliverables:['Repo matching paper metrics','Public technical report','ML Reproducibility Challenge submission'],
    recruiterNote:'This is the single most impressive self-taught ML portfolio item. It signals research readiness unambiguously.',
    repoStructure: `paper-reproduction/
├── paper/             # Paper PDF + notes
├── src/
│   ├── model.py       # Paper architecture
│   ├── train.py       # Training as described
│   └── evaluate.py    # Reported metrics
├── results/
│   ├── tables/        # Reproduce paper tables
│   └── figures/       # Reproduce figures
├── report.md          # Reproduction report
└── README.md`
  }
];

const RESOURCES = [
  {type:'book',name:'Mathematics for Machine Learning',author:'Deisenroth et al.',desc:'Free textbook — linear algebra, calculus, probability, all with ML context. The best single math resource.',phase:'Phase 1',url:'https://mml-book.github.io/'},
  {type:'youtube',name:'3Blue1Brown — Essence of Linear Algebra',author:'Grant Sanderson',desc:'The geometric intuition behind linear algebra. Watch before anything else. Absolutely essential.',phase:'Phase 1',url:'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab'},
  {type:'youtube',name:'3Blue1Brown — Essence of Calculus',author:'Grant Sanderson',desc:'Visual calculus. Makes gradient descent and backprop click at a deep level.',phase:'Phase 1',url:'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr'},
  {type:'course',name:'MIT Missing Semester',author:'MIT CSAIL',desc:'Terminal, Git, scripting, editors — the tooling every developer should know. Free.',phase:'Phase 1',url:'https://missing.csail.mit.edu/'},
  {type:'book',name:'Python Crash Course (3rd Ed.)',author:'Eric Matthes',desc:'Best hands-on Python book. Covers OOP, testing, projects. Move fast.',phase:'Phase 1',url:'https://nostarch.com/python-crash-course-3rd-edition'},
  {type:'course',name:'Stanford CS229 — Machine Learning',author:'Andrew Ng',desc:'Legendary ML course. Lecture notes are the gold standard for ML theory. Free PDFs.',phase:'Phase 2',url:'https://cs229.stanford.edu/'},
  {type:'book',name:'Hands-On Machine Learning (3rd Ed.)',author:'Aurélien Géron',desc:'The most practical ML book. sklearn → PyTorch → Transformers with code throughout.',phase:'Phase 2',url:'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/'},
  {type:'youtube',name:'StatQuest with Josh Starmer',author:'Josh Starmer',desc:'The clearest ML explanations on YouTube. Essential for statistics, ML algorithms, neural nets.',phase:'Phase 2',url:'https://www.youtube.com/@statquest'},
  {type:'course',name:'deeplearning.ai ML Specialisation',author:'Andrew Ng',desc:'Neural networks, backprop, optimisers. Week 1–4 are must-watch before Phase 3.',phase:'Phase 2',url:'https://www.deeplearning.ai/courses/machine-learning-specialization/'},
  {type:'course',name:'fast.ai Practical Deep Learning Pt. 1',author:'Jeremy Howard',desc:'Top-down: build first, understand theory after. Best complement to bottom-up courses. Free.',phase:'Phase 3',url:'https://course.fast.ai/'},
  {type:'course',name:'MIT 6.S191 — Intro to Deep Learning',author:'MIT',desc:'Free MIT course. CNNs, RNNs, transformers — high quality and concise. 2025 edition.',phase:'Phase 3',url:'http://introtodeeplearning.com/'},
  {type:'course',name:'Stanford CS231N — CNNs for Visual Recognition',author:'Stanford',desc:'The CNN course. Comprehensive coverage of computer vision, convolutions, architectures.',phase:'Phase 3',url:'https://cs231n.stanford.edu/'},
  {type:'youtube',name:'Andrej Karpathy — Neural Networks Zero to Hero',author:'Andrej Karpathy',desc:'The best deep learning YouTube series. Builds everything from scratch including micrograd and nanoGPT.',phase:'Phase 3',url:'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ'},
  {type:'course',name:'Stanford CS224N — NLP with Deep Learning',author:'Stanford',desc:'NLP with Deep Learning. The transformer and LLM course at Stanford.',phase:'Phase 4',url:'https://web.stanford.edu/class/cs224n/'},
  {type:'course',name:'deeplearning.ai LLM Specialisation',author:'deeplearning.ai',desc:'Fine-tuning, RLHF, RAG, agents — the applied LLM course. Stays current with the field.',phase:'Phase 4',url:'https://www.deeplearning.ai/courses/large-language-models-specialization/'},
  {type:'tool',name:'Weights & Biases',author:'W&B',desc:'Experiment tracking, sweeps, artefacts. Industry standard. Use from Phase 3 onwards.',phase:'Phase 3',url:'https://wandb.ai'},
  {type:'tool',name:'HuggingFace Hub',author:'HuggingFace',desc:'Pre-trained models, fine-tuning, tokenisers, datasets, PEFT. Central to Phase 4.',phase:'Phase 4',url:'https://huggingface.co'},
  {type:'tool',name:'Papers With Code',author:'Meta AI',desc:'Papers, code, benchmarks. Your compass for the research landscape.',phase:'Phase 4',url:'https://paperswithcode.com'},
  {type:'paper',name:'"Attention Is All You Need"',author:'Vaswani et al., 2017',desc:'The transformer paper. Read in Week 37. Understand every diagram.',phase:'Phase 3',url:'https://arxiv.org/abs/1706.03762'},
  {type:'paper',name:'"Deep Residual Learning for Image Recognition"',author:'He et al., 2015',desc:'ResNets. Read when implementing ResNet in Module 3.2.',phase:'Phase 3',url:'https://arxiv.org/abs/1512.03385'},
  {type:'paper',name:'"BERT: Pre-training of Deep Bidirectional Transformers"',author:'Devlin et al., 2018',desc:'Bidirectional transformers. Read in Week 45 alongside BERT fine-tuning.',phase:'Phase 4',url:'https://arxiv.org/abs/1810.04805'},
  {type:'paper',name:'"LoRA: Low-Rank Adaptation of Large Language Models"',author:'Hu et al., 2021',desc:'Low-rank adaptation. Read before LoRA fine-tuning project.',phase:'Phase 4',url:'https://arxiv.org/abs/2106.09685'},
  {type:'book',name:'Designing Machine Learning Systems',author:'Chip Huyen',desc:'ML systems design, deployment, monitoring. Essential for Phase 5 interviews.',phase:'Phase 5',url:'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/'},
];

const SKILLS = [
  {cat:'Python',skills:['OOP','pytest','Packaging','Decorators','Type Hints']},
  {cat:'Math',skills:['Linear Algebra','Calculus','Probability','Statistics','Optimisation']},
  {cat:'Classical ML',skills:['Regression','Trees','Ensembles','Clustering','Dimensionality Red.']},
  {cat:'Deep Learning',skills:['PyTorch','CNNs','RNNs','Transformers','Backprop']},
  {cat:'LLMs',skills:['Fine-tuning','LoRA/QLoRA','RLHF','RAG','Tokenisation']},
  {cat:'MLOps',skills:['W&B','Docker','FastAPI','GitHub Actions','Reproducibility']},
];

const START_DATE = new Date('2026-04-15');
