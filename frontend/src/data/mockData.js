export const projects = [
    {
        id: 1,
        title: "Autonomous Drone Navigation System",
        coverImageDescription: "A quadcopter drone hovering in an indoor test environment with SLAM visualization overlay.",
        department: "Robotics Engineering",
        year: "2024",
        techStack: ["Python", "ROS 2", "OpenCV", "Raspberry Pi 4", "Lidar", "Gazebo"],
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
        summary: "This project implements a robust Simultaneous Localization and Mapping (SLAM) system for autonomous quadcopters operating in GPS-denied indoor environments. By fusing data from a 2D Lidar and a monocular camera, the system achieves centimeter-level localization accuracy and enables real-time obstacle avoidance and path planning.",
        problemStatement: "Indoor environments pose significant challenges for autonomous drone navigation due to the absence of GPS signals, limited lighting, and dynamic obstacles. Traditional solutions often rely on expensive external motion capture systems or heavy computational payloads that are unsuitable for small-scale drones.",
        proposedSolution: "We developed a lightweight, onboard navigation stack using ROS 2. The solution utilizes a hybrid sensor fusion approach, combining Lidar-based 2D mapping with visual odometry for state estimation. A custom path planning algorithm (RRT*) ensures efficient trajectory generation while avoiding obstacles in real-time.",
        developmentStages: [
            {
                stage: "Stage 1: Initial Planning",
                description: "Defined system requirements, selected hardware components (Raspberry Pi 4, RPLidar A1), and established the software architecture based on ROS 2 Humble."
            },
            {
                stage: "Stage 2: Research & Requirements",
                description: "Conducted literature review on SLAM algorithms (Gmapping, Hector SLAM, ORB-SLAM). Decided on a hybrid approach using Gmapping for 2D occupancy grids and visual odometry for drift correction."
            },
            {
                stage: "Stage 3: Implementation",
                description: "Developed the drone frame and integrated sensors. Implemented the ROS 2 nodes for sensor drivers, state estimation, and motor control. Set up the Gazebo simulation environment for testing."
            },
            {
                stage: "Stage 4: Challenges & Mistakes",
                mistakes: [
                    {
                        title: "High Latency in Visual Processing",
                        discovery: "During initial flight tests, the control loop frequency dropped below 10Hz, causing instability.",
                        correction: "Optimized the OpenCV pipeline by resizing images and offloading feature extraction to a dedicated thread. Switched from Python to C++ for critical perception nodes."
                    },
                    {
                        title: "Lidar Interference",
                        discovery: "The Lidar data showed phantom obstacles due to reflections from the drone's own propellers.",
                        correction: "Implemented a hardware filter to mask the propeller angles and applied a software filter to ignore points within a specific radius."
                    }
                ]
            },
            {
                stage: "Stage 5: Testing & Evaluation",
                description: "Performed extensive testing in both simulation (Gazebo) and real-world indoor environments. Evaluated localization accuracy against ground truth and measured obstacle avoidance success rates."
            },
            {
                stage: "Stage 6: Final Output",
                description: "Successfully demonstrated autonomous navigation through a complex obstacle course. The drone generated a real-time 2D map and navigated to user-defined waypoints with 95% success rate."
            },
            {
                stage: "Stage 7: Future Improvements",
                description: "Plan to integrate a depth camera for 3D mapping and explore reinforcement learning for more dynamic obstacle avoidance."
            }
        ],
        architecture: "The system follows a modular ROS 2 architecture. The 'Perception Layer' processes raw sensor data (Lidar, Camera, IMU). The 'State Estimation Layer' fuses this data using an Extended Kalman Filter (EKF) to determine the drone's pose. The 'Navigation Layer' uses the generated map to plan paths (Global Planner) and generate velocity commands (Local Planner). Finally, the 'Control Layer' translates these commands into motor signals.",
        teamMembers: ["Alex Chen (Lead Developer)", "Sarah Jenkins (Hardware Engineer)", "Marcus Rodriguez (Algorithm Specialist)"],
        supervisor: "Dr. Eleanor Vance, Dept. of Robotics",
        downloads: [
            { name: "Project Report (PDF)", url: "#" },
            { name: "Source Code (GitHub)", url: "#" },
            { name: "Demo Video (MP4)", url: "#" }
        ]
    },
    {
        id: 2,
        title: "Sustainable Smart City Energy Grid",
        department: "Electrical Engineering",
        year: "2023",
        techStack: ["IoT", "React", "Node.js", "Machine Learning"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
        abstract: "A simulation and dashboard for managing renewable energy distribution in a smart city grid. Includes predictive maintenance for solar panels.",
        problemStatement: "Efficiently balancing energy load in a grid with high penetration of intermittent renewable sources.",
        mistakes: "Data visualization was initially too cluttered. Simplified the dashboard to focus on key metrics.",
        reflection: "User experience is just as important as the underlying algorithms in complex systems.",
        author: "Sarah Johnson"
    },
    {
        id: 3,
        title: "AI-Powered Medical Diagnosis Assistant",
        department: "Computer Science",
        year: "2024",
        techStack: ["PyTorch", "FastAPI", "React", "Docker"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        abstract: "An AI tool that assists radiologists in detecting early signs of pneumonia from X-ray images with 95% accuracy.",
        problemStatement: "Radiologists are overworked and can miss subtle signs of disease in X-rays.",
        mistakes: "Overfitted the model on the initial dataset. Had to augment data and use regularization techniques.",
        reflection: "Ethical considerations in AI for healthcare are paramount. Explainability is key.",
        author: "David Kim"
    },
    {
        id: 4,
        title: "Blockchain-based Academic Credentials",
        department: "Information Technology",
        year: "2023",
        techStack: ["Solidity", "Ethereum", "Web3.js", "React"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
        abstract: "A decentralized platform for issuing and verifying academic degrees and certificates, preventing fraud.",
        problemStatement: "Fake degrees are a growing problem. Verification processes are slow and manual.",
        mistakes: "Gas fees were too high on the mainnet. Migrated to a Layer 2 solution for testing.",
        reflection: "Blockchain UX is still a major barrier to adoption. Abstracting wallets is necessary.",
        author: "Emily Davis"
    },
    {
        id: 5,
        title: "Vertical Farming Automation",
        department: "Agricultural Engineering",
        year: "2024",
        techStack: ["Arduino", "C++", "IoT", "Mobile App"],
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800",
        abstract: "Automated control system for vertical farms, optimizing light, water, and nutrients for maximum yield.",
        problemStatement: "Traditional farming is resource-intensive. Vertical farming needs precise control to be viable.",
        mistakes: "Sensor calibration drifts over time. Implemented an auto-calibration routine.",
        reflection: "Interdisciplinary projects require clear communication between hardware and software teams.",
        author: "Michael Brown"
    },
    {
        id: 6,
        title: "Augmented Reality History Tour",
        department: "Digital Media",
        year: "2023",
        techStack: ["Unity", "AR Foundation", "C#", "Blender"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        abstract: "An AR mobile app that overlays historical scenes onto modern landmarks, bringing history to life.",
        problemStatement: "Museums and historical sites struggle to engage younger audiences.",
        mistakes: "GPS accuracy wasn't enough for precise alignment. Added visual markers.",
        reflection: "Storytelling is the core of AR experiences. Technology is just the medium.",
        author: "Jessica Lee"
    }
];

export const facultyStats = {
    totalProjects: 124,
    pendingReviews: 8,
    departments: [
        { name: "Computer Science", count: 45 },
        { name: "Electrical Eng.", count: 30 },
        { name: "Mechanical Eng.", count: 25 },
        { name: "Others", count: 24 }
    ],
    trending: ["AI/ML", "Sustainability", "IoT", "Blockchain"]
};

export const pendingReviews = [
    { id: 101, title: "Neural Network Visualization Tool", student: "Alice W.", date: "2024-03-15" },
    { id: 102, title: "Smart Traffic Light Controller", student: "Bob M.", date: "2024-03-14" },
    { id: 103, title: "Biodegradable Plastic Alternative", student: "Charlie D.", date: "2024-03-12" }
];
