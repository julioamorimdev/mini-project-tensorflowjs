# TensorFlow.js Learning Platform

A comprehensive web-based platform for learning and experimenting with TensorFlow.js, featuring interactive demos, tutorials, and real-time AI experiments.

## 🚀 Features

- **Interactive Tensor Operations**: Learn tensor manipulation with real-time examples
- **Neural Network Builder**: Visual neural network construction and training
- **Image Recognition**: Pre-trained models for image classification
- **Data Visualization**: Real-time charts and graphs for model performance
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Offline Capability**: All dependencies included locally

## 📁 Project Structure

```
projetotensorflowjs/
├── assets/                 # Static assets (images, icons)
├── css/                   # Stylesheets
├── js/                    # JavaScript modules
│   ├── core/             # Core TensorFlow.js utilities
│   ├── demos/            # Interactive demonstrations
│   ├── models/           # Pre-trained models
│   └── utils/            # Utility functions
├── pages/                # HTML pages for different demos
├── tests/                # Test files
├── docs/                 # Documentation
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
└── README.md            # This file
```

## 🛠️ Technologies Used

- **TensorFlow.js**: Machine learning library for JavaScript
- **Bootstrap 5**: Modern CSS framework for responsive design
- **Chart.js**: Data visualization library
- **jQuery**: DOM manipulation and AJAX
- **Docker**: Containerization for easy deployment

## 🚀 Quick Start

### Option 1: Direct Browser Usage
1. Clone the repository
2. Open any HTML file in your browser
3. Start experimenting with TensorFlow.js

### Option 2: Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build

# Access the application at http://localhost:8080
```

### Option 3: Local Development Server
```bash
# Using Python (if available)
python -m http.server 8000

# Using Node.js (if available)
npx http-server -p 8000
```

## 📚 Available Demos

### 1. Tensor Operations (`pages/tensor-operations.html`)
- Basic tensor creation and manipulation
- Shape transformations
- Data type conversions
- Memory management

### 2. Neural Network Builder (`pages/neural-network.html`)
- Visual network construction
- Layer configuration
- Training visualization
- Model export/import

### 3. Image Recognition (`pages/image-recognition.html`)
- Pre-trained models (MobileNet, ResNet)
- Real-time image classification
- Confidence scoring
- Batch processing

### 4. Data Visualization (`pages/data-viz.html`)
- Training progress charts
- Loss/accuracy graphs
- Real-time data plotting
- Export capabilities

### 5. Advanced Operations (`pages/advanced.html`)
- Complex tensor operations
- Mathematical functions
- Performance optimization
- Memory profiling

## 🧪 Testing

The platform includes built-in test suites for each demo:

```bash
# Run all tests
open tests/test-suite.html

# Run specific demo tests
open tests/tensor-operations-test.html
```

## 📖 Learning Path

1. **Beginner**: Start with Tensor Operations
2. **Intermediate**: Explore Neural Network Builder
3. **Advanced**: Experiment with Image Recognition
4. **Expert**: Dive into Advanced Operations

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- **Issues**: Report bugs and request features on GitHub
- **Documentation**: Check the `docs/` folder for detailed guides
- **Examples**: Each demo includes comprehensive examples

## 🔄 Version History

- **v2.0.0**: Complete rewrite with modern architecture
- **v1.0.0**: Initial release with basic tensor operations

## 🙏 Acknowledgments

- TensorFlow.js team for the amazing library
- Bootstrap team for the responsive framework
- Chart.js team for visualization capabilities
- All contributors and users of this platform

---

**Happy Learning! 🎓🤖** 