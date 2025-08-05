/**
 * Performance Monitor Utility
 * Monitors and displays performance metrics for TensorFlow.js operations
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = [];
        this.isMonitoring = false;
        this.updateInterval = null;
    }

    /**
     * Start performance monitoring
     */
    start() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.updateInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    /**
     * Stop performance monitoring
     */
    stop() {
        if (!this.isMonitoring) return;
        
        this.isMonitoring = false;
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    /**
     * Update the performance display
     */
    updateDisplay() {
        try {
            // Update memory usage
            const memoryUsage = tf.memory();
            const memoryElement = document.getElementById('memory-usage');
            if (memoryElement) {
                const progressBar = memoryElement.querySelector('.progress-bar');
                const percentage = Math.min((memoryUsage.numBytes / (1024 * 1024 * 100)) * 100, 100);
                progressBar.style.width = `${percentage}%`;
                progressBar.textContent = `${(memoryUsage.numBytes / 1024).toFixed(1)} KB`;
                
                // Change color based on usage
                if (percentage > 80) {
                    progressBar.className = 'progress-bar bg-danger';
                } else if (percentage > 60) {
                    progressBar.className = 'progress-bar bg-warning';
                } else {
                    progressBar.className = 'progress-bar bg-success';
                }
            }

            // Update execution time
            const executionElement = document.getElementById('execution-time');
            if (executionElement && this.metrics.length > 0) {
                const avgTime = this.metrics.reduce((sum, metric) => sum + metric.executionTime, 0) / this.metrics.length;
                executionElement.textContent = `${avgTime.toFixed(2)}ms`;
            }

        } catch (error) {
            console.error('Error updating performance display:', error);
        }
    }

    /**
     * Record a performance metric
     * @param {string} operation - Operation name
     * @param {number} executionTime - Execution time in milliseconds
     * @param {number} memoryBefore - Memory usage before operation
     * @param {number} memoryAfter - Memory usage after operation
     */
    recordMetric(operation, executionTime, memoryBefore, memoryAfter) {
        const metric = {
            operation,
            executionTime,
            memoryBefore,
            memoryAfter,
            memoryDelta: memoryAfter - memoryBefore,
            timestamp: new Date()
        };

        this.metrics.push(metric);

        // Keep only last 100 metrics
        if (this.metrics.length > 100) {
            this.metrics.shift();
        }
    }

    /**
     * Get performance summary
     * @returns {Object} Performance summary
     */
    getSummary() {
        if (this.metrics.length === 0) {
            return {
                totalOperations: 0,
                averageExecutionTime: 0,
                totalMemoryUsed: 0,
                peakMemoryUsage: 0
            };
        }

        const totalOperations = this.metrics.length;
        const averageExecutionTime = this.metrics.reduce((sum, m) => sum + m.executionTime, 0) / totalOperations;
        const totalMemoryUsed = this.metrics.reduce((sum, m) => sum + m.memoryDelta, 0);
        const peakMemoryUsage = Math.max(...this.metrics.map(m => m.memoryAfter));

        return {
            totalOperations,
            averageExecutionTime,
            totalMemoryUsed,
            peakMemoryUsage,
            operations: this.metrics.map(m => ({
                operation: m.operation,
                executionTime: m.executionTime,
                memoryDelta: m.memoryDelta,
                timestamp: m.timestamp
            }))
        };
    }

    /**
     * Clear all metrics
     */
    clear() {
        this.metrics = [];
        this.updateDisplay();
    }

    /**
     * Export performance data
     * @returns {string} JSON string of performance data
     */
    exportData() {
        return JSON.stringify({
            summary: this.getSummary(),
            metrics: this.metrics,
            exportTimestamp: new Date()
        }, null, 2);
    }
}

// Global performance monitor instance
const performanceMonitor = new PerformanceMonitor();

// Start monitoring when page loads
document.addEventListener('DOMContentLoaded', () => {
    performanceMonitor.start();
});

// Stop monitoring when page unloads
window.addEventListener('beforeunload', () => {
    performanceMonitor.stop();
}); 