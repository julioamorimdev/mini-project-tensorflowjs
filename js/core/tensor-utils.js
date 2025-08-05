/**
 * Core TensorFlow.js utility functions
 * Provides common operations and helper functions for tensor manipulation
 */

class TensorUtils {
    /**
     * Create a tensor from user input
     * @param {string} input - String representation of tensor data
     * @param {string} shape - Optional shape specification
     * @returns {tf.Tensor} Created tensor
     */
    static createTensorFromInput(input, shape = null) {
        try {
            let data = JSON.parse(input);
            if (shape) {
                const shapeArray = shape.split(',').map(s => parseInt(s.trim()));
                return tf.tensor(data, shapeArray);
            }
            return tf.tensor(data);
        } catch (error) {
            throw new Error(`Invalid tensor input: ${error.message}`);
        }
    }

    /**
     * Get tensor information in a formatted string
     * @param {tf.Tensor} tensor - Input tensor
     * @returns {string} Formatted tensor information
     */
    static getTensorInfo(tensor) {
        return `Shape: [${tensor.shape.join(', ')}]\n` +
               `Dtype: ${tensor.dtype}\n` +
               `Size: ${tensor.size}\n` +
               `Rank: ${tensor.rank}`;
    }

    /**
     * Safely dispose of tensors
     * @param {...tf.Tensor} tensors - Tensors to dispose
     */
    static safeDispose(...tensors) {
        tensors.forEach(tensor => {
            if (tensor && !tensor.isDisposed) {
                tensor.dispose();
            }
        });
    }

    /**
     * Generate random tensor with specified parameters
     * @param {number[]} shape - Tensor shape
     * @param {string} distribution - Distribution type ('normal', 'uniform', 'random')
     * @param {number} min - Minimum value for uniform distribution
     * @param {number} max - Maximum value for uniform distribution
     * @returns {tf.Tensor} Random tensor
     */
    static createRandomTensor(shape, distribution = 'normal', min = 0, max = 1) {
        switch (distribution) {
            case 'normal':
                return tf.randomNormal(shape);
            case 'uniform':
                return tf.randomUniform(shape, min, max);
            case 'random':
                return tf.randomUniform(shape, 0, 1);
            default:
                return tf.randomNormal(shape);
        }
    }

    /**
     * Compare two tensors and return similarity metrics
     * @param {tf.Tensor} tensor1 - First tensor
     * @param {tf.Tensor} tensor2 - Second tensor
     * @returns {Object} Comparison results
     */
    static compareTensors(tensor1, tensor2) {
        const diff = tensor1.sub(tensor2);
        const mse = diff.square().mean();
        const mae = diff.abs().mean();
        
        return {
            meanSquaredError: mse.dataSync()[0],
            meanAbsoluteError: mae.dataSync()[0],
            maxDifference: diff.abs().max().dataSync()[0],
            shapesMatch: JSON.stringify(tensor1.shape) === JSON.stringify(tensor2.shape)
        };
    }

    /**
     * Convert tensor to visualization data
     * @param {tf.Tensor} tensor - Input tensor
     * @returns {Object} Data for chart visualization
     */
    static tensorToChartData(tensor) {
        const data = tensor.dataSync();
        const shape = tensor.shape;
        
        if (shape.length === 1) {
            return {
                labels: Array.from({length: data.length}, (_, i) => `Index ${i}`),
                data: Array.from(data),
                type: 'line'
            };
        } else if (shape.length === 2) {
            return {
                labels: Array.from({length: shape[1]}, (_, i) => `Col ${i}`),
                datasets: Array.from({length: shape[0]}, (_, i) => ({
                    label: `Row ${i}`,
                    data: Array.from(data.slice(i * shape[1], (i + 1) * shape[1]))
                })),
                type: 'bar'
            };
        }
        
        return {
            labels: ['Tensor Data'],
            data: [data.length],
            type: 'doughnut'
        };
    }

    /**
     * Memory management utilities
     */
    static memory = {
        /**
         * Get current memory usage
         * @returns {Object} Memory usage information
         */
        getUsage() {
            return tf.memory();
        },

        /**
         * Clear all tensors from memory
         */
        clear() {
            tf.disposeVariables();
            tf.engine().endScope();
            tf.engine().startScope();
        },

        /**
         * Get memory usage percentage
         * @returns {number} Memory usage percentage
         */
        getUsagePercentage() {
            const memory = tf.memory();
            return (memory.numBytes / (1024 * 1024 * 100)) * 100; // Assuming 100MB limit
        }
    };

    /**
     * Performance measurement utilities
     */
    static performance = {
        /**
         * Measure execution time of a function
         * @param {Function} fn - Function to measure
         * @param {number} iterations - Number of iterations
         * @returns {Object} Performance metrics
         */
        measureTime(fn, iterations = 1) {
            const start = performance.now();
            const results = [];
            
            for (let i = 0; i < iterations; i++) {
                results.push(fn());
            }
            
            const end = performance.now();
            const avgTime = (end - start) / iterations;
            
            return {
                totalTime: end - start,
                averageTime: avgTime,
                iterations: iterations,
                results: results
            };
        },

        /**
         * Benchmark tensor operations
         * @param {Function} operation - Tensor operation to benchmark
         * @param {number} iterations - Number of iterations
         * @returns {Object} Benchmark results
         */
        benchmark(operation, iterations = 10) {
            const times = [];
            const memoryBefore = tf.memory().numBytes;
            
            for (let i = 0; i < iterations; i++) {
                const start = performance.now();
                operation();
                const end = performance.now();
                times.push(end - start);
            }
            
            const memoryAfter = tf.memory().numBytes;
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            const minTime = Math.min(...times);
            const maxTime = Math.max(...times);
            
            return {
                averageTime: avgTime,
                minTime: minTime,
                maxTime: maxTime,
                memoryDelta: memoryAfter - memoryBefore,
                times: times
            };
        }
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TensorUtils;
} 