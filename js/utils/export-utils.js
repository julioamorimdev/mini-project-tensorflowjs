/**
 * Export Utilities
 * Provides functions for exporting data in various formats
 */

class ExportUtils {
    /**
     * Export data as JSON file
     * @param {Object} data - Data to export
     * @param {string} filename - Output filename
     */
    static exportJSON(data, filename = 'export.json') {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        this.downloadFile(dataBlob, filename);
    }

    /**
     * Export data as CSV file
     * @param {Array} data - Array of objects to export
     * @param {string} filename - Output filename
     */
    static exportCSV(data, filename = 'export.csv') {
        if (!data || data.length === 0) {
            console.error('No data to export');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value}"` : value;
            }).join(','))
        ].join('\n');

        const dataBlob = new Blob([csvContent], { type: 'text/csv' });
        this.downloadFile(dataBlob, filename);
    }

    /**
     * Export tensor data as CSV
     * @param {tf.Tensor} tensor - Tensor to export
     * @param {string} filename - Output filename
     */
    static exportTensorCSV(tensor, filename = 'tensor-data.csv') {
        const data = tensor.arraySync();
        const shape = tensor.shape;
        
        let csvContent = '';
        
        if (shape.length === 1) {
            csvContent = 'Index,Value\n';
            data.forEach((value, index) => {
                csvContent += `${index},${value}\n`;
            });
        } else if (shape.length === 2) {
            csvContent = 'Row,Column,Value\n';
            for (let i = 0; i < shape[0]; i++) {
                for (let j = 0; j < shape[1]; j++) {
                    csvContent += `${i},${j},${data[i][j]}\n`;
                }
            }
        } else {
            csvContent = 'Value\n';
            const flatData = data.flat(shape.length - 1);
            flatData.forEach(value => {
                csvContent += `${value}\n`;
            });
        }

        const dataBlob = new Blob([csvContent], { type: 'text/csv' });
        this.downloadFile(dataBlob, filename);
    }

    /**
     * Export chart as image
     * @param {Chart} chart - Chart.js instance
     * @param {string} filename - Output filename
     * @param {string} format - Image format ('png', 'jpeg', 'webp')
     */
    static exportChartImage(chart, filename = 'chart.png', format = 'png') {
        const canvas = chart.canvas;
        const dataURL = canvas.toDataURL(`image/${format}`);
        
        // Create download link
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Export performance data
     * @param {Object} performanceData - Performance data to export
     * @param {string} format - Export format ('json', 'csv')
     */
    static exportPerformanceData(performanceData, format = 'json') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        if (format === 'csv') {
            const csvData = performanceData.metrics.map(metric => ({
                operation: metric.operation,
                executionTime: metric.executionTime,
                memoryBefore: metric.memoryBefore,
                memoryAfter: metric.memoryAfter,
                memoryDelta: metric.memoryDelta,
                timestamp: metric.timestamp
            }));
            this.exportCSV(csvData, `performance-${timestamp}.csv`);
        } else {
            this.exportJSON(performanceData, `performance-${timestamp}.json`);
        }
    }

    /**
     * Export all results as a comprehensive report
     * @param {Array} results - Array of result objects
     * @param {Object} performanceData - Performance data
     * @param {string} format - Export format ('json', 'html', 'txt')
     */
    static exportReport(results, performanceData = null, format = 'json') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const report = {
            title: 'TensorFlow.js Learning Platform Report',
            timestamp: new Date(),
            results: results,
            performance: performanceData,
            summary: {
                totalResults: results.length,
                totalOperations: results.reduce((sum, r) => sum + (r.content.match(/Execution time:/g) || []).length, 0),
                averageExecutionTime: 0
            }
        };

        if (performanceData) {
            report.summary.averageExecutionTime = performanceData.summary.averageExecutionTime;
        }

        switch (format) {
            case 'html':
                this.exportHTMLReport(report, `report-${timestamp}.html`);
                break;
            case 'txt':
                this.exportTextReport(report, `report-${timestamp}.txt`);
                break;
            default:
                this.exportJSON(report, `report-${timestamp}.json`);
        }
    }

    /**
     * Export report as HTML
     * @param {Object} report - Report data
     * @param {string} filename - Output filename
     */
    static exportHTMLReport(report, filename) {
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${report.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f0f0f0; padding: 20px; border-radius: 5px; }
        .result { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .performance { background: #e8f4f8; padding: 15px; border-radius: 5px; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${report.title}</h1>
        <p>Generated: ${report.timestamp}</p>
        <p>Total Results: ${report.summary.totalResults}</p>
        <p>Total Operations: ${report.summary.totalOperations}</p>
        <p>Average Execution Time: ${report.summary.averageExecutionTime.toFixed(2)}ms</p>
    </div>
    
    ${report.results.map(result => `
        <div class="result">
            <h3>${result.title}</h3>
            <p>Timestamp: ${result.timestamp}</p>
            <pre>${result.content}</pre>
        </div>
    `).join('')}
    
    ${report.performance ? `
        <div class="performance">
            <h3>Performance Summary</h3>
            <p>Total Operations: ${report.performance.summary.totalOperations}</p>
            <p>Average Execution Time: ${report.performance.summary.averageExecutionTime.toFixed(2)}ms</p>
            <p>Peak Memory Usage: ${(report.performance.summary.peakMemoryUsage / 1024).toFixed(2)} KB</p>
        </div>
    ` : ''}
</body>
</html>`;

        const dataBlob = new Blob([htmlContent], { type: 'text/html' });
        this.downloadFile(dataBlob, filename);
    }

    /**
     * Export report as text
     * @param {Object} report - Report data
     * @param {string} filename - Output filename
     */
    static exportTextReport(report, filename) {
        let textContent = `${report.title}\n`;
        textContent += `Generated: ${report.timestamp}\n`;
        textContent += `Total Results: ${report.summary.totalResults}\n`;
        textContent += `Total Operations: ${report.summary.totalOperations}\n`;
        textContent += `Average Execution Time: ${report.summary.averageExecutionTime.toFixed(2)}ms\n\n`;

        report.results.forEach(result => {
            textContent += `=== ${result.title} ===\n`;
            textContent += `Timestamp: ${result.timestamp}\n`;
            textContent += `${result.content}\n\n`;
        });

        if (report.performance) {
            textContent += `=== PERFORMANCE SUMMARY ===\n`;
            textContent += `Total Operations: ${report.performance.summary.totalOperations}\n`;
            textContent += `Average Execution Time: ${report.performance.summary.averageExecutionTime.toFixed(2)}ms\n`;
            textContent += `Peak Memory Usage: ${(report.performance.summary.peakMemoryUsage / 1024).toFixed(2)} KB\n`;
        }

        const dataBlob = new Blob([textContent], { type: 'text/plain' });
        this.downloadFile(dataBlob, filename);
    }

    /**
     * Download file using blob
     * @param {Blob} blob - File blob
     * @param {string} filename - Output filename
     */
    static downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExportUtils;
} 