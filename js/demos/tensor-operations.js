/**
 * Tensor Operations Demo
 * Interactive demonstrations of TensorFlow.js tensor operations
 */

class TensorOperationsDemo {
    constructor() {
        this.results = [];
        this.chart = null;
        this.initializeChart();
    }

    /**
     * Initialize Chart.js for tensor visualization
     */
    initializeChart() {
        const ctx = document.getElementById('tensor-chart');
        if (ctx) {
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Tensor Data',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tensor Visualization'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    /**
     * Update the results display
     * @param {string} content - Content to display
     */
    updateResults(content) {
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
            resultsElement.value = content;
        }
    }

    /**
     * Add result to the results array
     * @param {string} title - Result title
     * @param {string} content - Result content
     */
    addResult(title, content) {
        this.results.push({ title, content, timestamp: new Date() });
        this.updateResults(this.formatResults());
    }

    /**
     * Format all results for display
     * @returns {string} Formatted results
     */
    formatResults() {
        return this.results.map(result => 
            `=== ${result.title} ===\n${result.content}\n\n`
        ).join('');
    }

    /**
     * Update chart with tensor data
     * @param {tf.Tensor} tensor - Tensor to visualize
     */
    updateChart(tensor) {
        if (!this.chart) return;

        const chartData = TensorUtils.tensorToChartData(tensor);
        
        if (chartData.type === 'line') {
            this.chart.data.labels = chartData.labels;
            this.chart.data.datasets[0].data = chartData.data;
            this.chart.data.datasets[0].label = 'Tensor Values';
        } else if (chartData.type === 'bar') {
            this.chart.config.type = 'bar';
            this.chart.data.labels = chartData.labels;
            this.chart.data.datasets = chartData.datasets;
        }

        this.chart.update();
    }

    /**
     * Run shape operations demo
     */
    runTensorShape() {
        const startTime = performance.now();
        
        try {
            let content = '=== TENSOR SHAPE OPERATIONS ===\n\n';

            // Basic shape operations
            const tensor1d = tf.tensor([1.5]);
            const asScalar = tensor1d.asScalar();
            content += `asScalar:\nBefore: ${tensor1d.toString()}\nAfter: ${asScalar.toString()}\n\n`;

            const tensor2d = tf.tensor([1, 2, 3, 4], [2, 2]);
            const flatten = tensor2d.flatten();
            content += `flatten:\nBefore: ${tensor2d.toString()}\nAfter: ${flatten.toString()}\n\n`;

            const tensor1 = tf.tensor([1, 2, 3, 4], [2, 2]);
            const as1D = tensor1.as1D();
            content += `as1D:\nBefore: ${tensor1.toString()}\nAfter: ${as1D.toString()}\n\n`;

            const tensor2 = tf.tensor([1, 2, 3, 4], [2, 2, 1]);
            const as2D = tensor2.as2D(2, 2);
            content += `as2D:\nBefore: ${tensor2.toString()}\nAfter: ${as2D.toString()}\n\n`;

            const tensor3 = tf.tensor([1, 2, 3, 4], [1, 2, 2, 1]);
            const as3D = tensor3.as3D(2, 2, 1);
            content += `as3D:\nBefore: ${tensor3.toString()}\nAfter: ${as3D.toString()}\n\n`;

            const tensor4 = tf.tensor([1, 2, 3, 4]);
            const as4D = tensor4.as4D(1, 2, 2, 1);
            content += `as4D:\nBefore: ${tensor4.toString()}\nAfter: ${as4D.toString()}\n\n`;

            const tensor5 = tf.tensor([1, 2, 3, 4, 5, 6, 7, 8]);
            const as5D = tensor5.as5D(1, 2, 2, 2, 1);
            content += `as5D:\nBefore: ${tensor5.toString()}\nAfter: ${as5D.toString()}\n\n`;

            // Advanced shape operations
            const expandTensor = tf.tensor([1, 2, 3, 4]);
            const expanded = expandTensor.expandDims(1);
            content += `expandDims:\nBefore: ${expandTensor.toString()}\nAfter: ${expanded.toString()}\n\n`;

            const squeezeTensor = tf.tensor([[1], [2], [3], [4]]);
            const squeezed = squeezeTensor.squeeze(1);
            content += `squeeze:\nBefore: ${squeezeTensor.toString()}\nAfter: ${squeezed.toString()}\n\n`;

            // Update chart with last tensor
            this.updateChart(squeezed);

            // Clean up
            TensorUtils.safeDispose(tensor1d, asScalar, tensor2d, flatten, tensor1, as1D, 
                                   tensor2, as2D, tensor3, as3D, tensor4, as4D, tensor5, as5D,
                                   expandTensor, expanded, squeezeTensor, squeezed);

            const endTime = performance.now();
            content += `Execution time: ${(endTime - startTime).toFixed(2)}ms\n`;
            content += `Memory usage: ${(tf.memory().numBytes / 1024).toFixed(2)} KB`;

            this.addResult('Shape Operations', content);

        } catch (error) {
            this.addResult('Error', `Error in shape operations: ${error.message}`);
        }
    }

    /**
     * Run data type conversion demo
     */
    runDataType() {
        const startTime = performance.now();
        
        try {
            let content = '=== DATA TYPE CONVERSIONS ===\n\n';

            // Type conversions
            const boolTensor = tf.tensor([true, false, true, false]);
            const toFloat = boolTensor.toFloat();
            content += `toFloat:\nBefore: ${boolTensor.toString()}\nAfter: ${toFloat.toString()}\n\n`;

            const floatTensor = tf.tensor([1.2, 2.5, 3.7, 4.8]);
            const toInt = floatTensor.toInt();
            content += `toInt:\nBefore: ${floatTensor.toString()}\nAfter: ${toInt.toString()}\n\n`;

            const intTensor = tf.tensor([1, 0, 1, 0]);
            const toBool = intTensor.toBool();
            content += `toBool:\nBefore: ${intTensor.toString()}\nAfter: ${toBool.toString()}\n\n`;

            // Reshape operations
            const reshapeTensor = tf.tensor([1, 2, 3, 4]);
            const reshaped = reshapeTensor.reshape([2, 2]);
            content += `reshape:\nBefore: ${reshapeTensor.toString()}\nAfter: ${reshaped.toString()}\n\n`;

            const reshapeAsTensor = tf.tensor([[1, 2], [3, 4]]);
            const targetShape = tf.tensor([5, 7, 1, 3]);
            const reshapeAs = reshapeAsTensor.reshapeAs(targetShape);
            content += `reshapeAs:\nBefore: ${reshapeAsTensor.toString()}\nTarget: ${targetShape.toString()}\nAfter: ${reshapeAs.toString()}\n\n`;

            // Memory management
            const disposeTensor = tf.tensor([[1, 2], [3, 4]]);
            content += `dispose:\nBefore: ${disposeTensor.toString()}\n`;
            disposeTensor.dispose();
            content += `After: Memory freed\n\n`;

            // Update chart
            this.updateChart(reshapeAs);

            // Clean up
            TensorUtils.safeDispose(boolTensor, toFloat, floatTensor, toInt, intTensor, toBool,
                                   reshapeTensor, reshaped, reshapeAsTensor, targetShape, reshapeAs);

            const endTime = performance.now();
            content += `Execution time: ${(endTime - startTime).toFixed(2)}ms\n`;
            content += `Memory usage: ${(tf.memory().numBytes / 1024).toFixed(2)} KB`;

            this.addResult('Data Type Conversions', content);

        } catch (error) {
            this.addResult('Error', `Error in data type conversions: ${error.message}`);
        }
    }

    /**
     * Run mathematical operations demo
     */
    runMathematical() {
        const startTime = performance.now();
        
        try {
            let content = '=== MATHEMATICAL OPERATIONS ===\n\n';

            // Basic mathematical operations
            const mathTensor = tf.tensor([1, 2, 3, 4]);
            const cumsum = mathTensor.cumsum();
            content += `cumsum:\nBefore: ${mathTensor.toString()}\nAfter: ${cumsum.toString()}\n\n`;

            const absTensor = tf.tensor([-1, -2, 3, -4]);
            const absResult = absTensor.abs();
            content += `abs:\nBefore: ${absTensor.toString()}\nAfter: ${absResult.toString()}\n\n`;

            const sqrtTensor = tf.tensor([1, 4, 9, 16]);
            const sqrtResult = sqrtTensor.sqrt();
            content += `sqrt:\nBefore: ${sqrtTensor.toString()}\nAfter: ${sqrtResult.toString()}\n\n`;

            const squareTensor = tf.tensor([1, 2, 3, 4]);
            const squareResult = squareTensor.square();
            content += `square:\nBefore: ${squareTensor.toString()}\nAfter: ${squareResult.toString()}\n\n`;

            // Statistical operations
            const statsTensor = tf.tensor([1, 2, 3, 4, 5]);
            const mean = statsTensor.mean();
            const max = statsTensor.max();
            const min = statsTensor.min();
            const sum = statsTensor.sum();
            content += `Statistics:\nTensor: ${statsTensor.toString()}\nMean: ${mean.toString()}\nMax: ${max.toString()}\nMin: ${min.toString()}\nSum: ${sum.toString()}\n\n`;

            // Element-wise operations
            const tensorA = tf.tensor([1, 2, 3, 4]);
            const tensorB = tf.tensor([2, 2, 2, 2]);
            const add = tensorA.add(tensorB);
            const sub = tensorA.sub(tensorB);
            const mul = tensorA.mul(tensorB);
            const div = tensorA.div(tensorB);
            content += `Element-wise Operations:\nA: ${tensorA.toString()}\nB: ${tensorB.toString()}\nAdd: ${add.toString()}\nSubtract: ${sub.toString()}\nMultiply: ${mul.toString()}\nDivide: ${div.toString()}\n\n`;

            // Update chart
            this.updateChart(statsTensor);

            // Clean up
            TensorUtils.safeDispose(mathTensor, cumsum, absTensor, absResult, sqrtTensor, sqrtResult,
                                   squareTensor, squareResult, statsTensor, mean, max, min, sum,
                                   tensorA, tensorB, add, sub, mul, div);

            const endTime = performance.now();
            content += `Execution time: ${(endTime - startTime).toFixed(2)}ms\n`;
            content += `Memory usage: ${(tf.memory().numBytes / 1024).toFixed(2)} KB`;

            this.addResult('Mathematical Operations', content);

        } catch (error) {
            this.addResult('Error', `Error in mathematical operations: ${error.message}`);
        }
    }

    /**
     * Run memory management demo
     */
    runMemory() {
        const startTime = performance.now();
        
        try {
            let content = '=== MEMORY MANAGEMENT ===\n\n';

            const initialMemory = tf.memory();
            content += `Initial memory: ${(initialMemory.numBytes / 1024).toFixed(2)} KB\n\n`;

            // Create multiple tensors
            const tensors = [];
            for (let i = 0; i < 10; i++) {
                tensors.push(tf.randomNormal([100, 100]));
            }

            const afterCreation = tf.memory();
            content += `After creating 10 tensors: ${(afterCreation.numBytes / 1024).toFixed(2)} KB\n`;
            content += `Memory increase: ${((afterCreation.numBytes - initialMemory.numBytes) / 1024).toFixed(2)} KB\n\n`;

            // Dispose tensors individually
            tensors.forEach((tensor, index) => {
                tensor.dispose();
                content += `Disposed tensor ${index + 1}\n`;
            });

            const afterDispose = tf.memory();
            content += `After disposing tensors: ${(afterDispose.numBytes / 1024).toFixed(2)} KB\n\n`;

            // Create more tensors and use safeDispose
            const moreTensors = [
                tf.randomNormal([50, 50]),
                tf.randomUniform([50, 50]),
                tf.zeros([50, 50]),
                tf.ones([50, 50])
            ];

            const afterMoreCreation = tf.memory();
            content += `After creating more tensors: ${(afterMoreCreation.numBytes / 1024).toFixed(2)} KB\n\n`;

            // Use safeDispose
            TensorUtils.safeDispose(...moreTensors);
            content += `Used safeDispose to clean up tensors\n`;

            const afterSafeDispose = tf.memory();
            content += `After safeDispose: ${(afterSafeDispose.numBytes / 1024).toFixed(2)} KB\n\n`;

            // Clear all memory
            TensorUtils.memory.clear();
            const afterClear = tf.memory();
            content += `After clearing all memory: ${(afterClear.numBytes / 1024).toFixed(2)} KB\n\n`;

            const endTime = performance.now();
            content += `Execution time: ${(endTime - startTime).toFixed(2)}ms\n`;
            content += `Final memory usage: ${(tf.memory().numBytes / 1024).toFixed(2)} KB`;

            this.addResult('Memory Management', content);

        } catch (error) {
            this.addResult('Error', `Error in memory management: ${error.message}`);
        }
    }

    /**
     * Run advanced operations demo
     */
    runAdvanced() {
        const startTime = performance.now();
        
        try {
            let content = '=== ADVANCED OPERATIONS ===\n\n';

            // Data extraction
            const dataTensor = tf.tensor([1, 2, 3, 4]);
            const dataSync = dataTensor.dataSync();
            const arraySync = dataTensor.arraySync();
            content += `Data Extraction:\nTensor: ${dataTensor.toString()}\ndataSync: [${Array.from(dataSync)}]\narraySync: ${JSON.stringify(arraySync)}\n\n`;

            // Cloning
            const originalTensor = tf.tensor([1, 2, 3, 4]);
            const clonedTensor = tf.clone(originalTensor);
            content += `Cloning:\nOriginal: ${originalTensor.toString()}\nCloned: ${clonedTensor.toString()}\n\n`;

            // Random tensor generation
            const randomNormal = TensorUtils.createRandomTensor([3, 3], 'normal');
            const randomUniform = TensorUtils.createRandomTensor([3, 3], 'uniform', -1, 1);
            content += `Random Tensors:\nNormal: ${randomNormal.toString()}\nUniform: ${randomUniform.toString()}\n\n`;

            // Tensor comparison
            const tensor1 = tf.tensor([1, 2, 3, 4]);
            const tensor2 = tf.tensor([1.1, 2.1, 3.1, 4.1]);
            const comparison = TensorUtils.compareTensors(tensor1, tensor2);
            content += `Tensor Comparison:\nTensor1: ${tensor1.toString()}\nTensor2: ${tensor2.toString()}\nMSE: ${comparison.meanSquaredError.toFixed(4)}\nMAE: ${comparison.meanAbsoluteError.toFixed(4)}\nMax Diff: ${comparison.maxDifference.toFixed(4)}\nShapes Match: ${comparison.shapesMatch}\n\n`;

            // Performance benchmarking
            const benchmarkResult = TensorUtils.performance.benchmark(() => {
                const tempTensor = tf.randomNormal([100, 100]);
                const result = tempTensor.square().mean();
                tempTensor.dispose();
                result.dispose();
            }, 5);

            content += `Performance Benchmark:\nAverage Time: ${benchmarkResult.averageTime.toFixed(2)}ms\nMin Time: ${benchmarkResult.minTime.toFixed(2)}ms\nMax Time: ${benchmarkResult.maxTime.toFixed(2)}ms\nMemory Delta: ${(benchmarkResult.memoryDelta / 1024).toFixed(2)} KB\n\n`;

            // Update chart
            this.updateChart(randomNormal);

            // Clean up
            TensorUtils.safeDispose(dataTensor, originalTensor, clonedTensor, randomNormal, randomUniform,
                                   tensor1, tensor2);

            const endTime = performance.now();
            content += `Execution time: ${(endTime - startTime).toFixed(2)}ms\n`;
            content += `Memory usage: ${(tf.memory().numBytes / 1024).toFixed(2)} KB`;

            this.addResult('Advanced Operations', content);

        } catch (error) {
            this.addResult('Error', `Error in advanced operations: ${error.message}`);
        }
    }
}

// Global instance
const tensorDemo = new TensorOperationsDemo();

// Global functions for HTML onclick handlers
function runTensorShape() {
    tensorDemo.runTensorShape();
}

function runDataType() {
    tensorDemo.runDataType();
}

function runMathematical() {
    tensorDemo.runMathematical();
}

function runMemory() {
    tensorDemo.runMemory();
}

function runAdvanced() {
    tensorDemo.runAdvanced();
}

function clearResults() {
    tensorDemo.results = [];
    tensorDemo.updateResults('');
}

function exportResults() {
    const dataStr = JSON.stringify(tensorDemo.results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tensor-operations-results.json';
    link.click();
    URL.revokeObjectURL(url);
} 