# API Documentation

## TensorUtils Class

Core utility class for TensorFlow.js operations.

### Static Methods

#### `createTensorFromInput(input, shape)`
Creates a tensor from user input string.

**Parameters:**
- `input` (string): JSON string representation of tensor data
- `shape` (string, optional): Comma-separated shape specification

**Returns:** `tf.Tensor`

**Example:**
```javascript
const tensor = TensorUtils.createTensorFromInput('[1, 2, 3, 4]');
const matrix = TensorUtils.createTensorFromInput('[[1,2],[3,4]]', '2,2');
```

#### `getTensorInfo(tensor)`
Returns formatted tensor information.

**Parameters:**
- `tensor` (tf.Tensor): Input tensor

**Returns:** `string`

**Example:**
```javascript
const info = TensorUtils.getTensorInfo(tensor);
console.log(info);
// Output: Shape: [2, 2]
//         Dtype: float32
//         Size: 4
//         Rank: 2
```

#### `safeDispose(...tensors)`
Safely disposes multiple tensors.

**Parameters:**
- `...tensors` (tf.Tensor): Tensors to dispose

**Example:**
```javascript
TensorUtils.safeDispose(tensor1, tensor2, tensor3);
```

#### `createRandomTensor(shape, distribution, min, max)`
Creates a random tensor with specified parameters.

**Parameters:**
- `shape` (number[]): Tensor shape
- `distribution` (string): Distribution type ('normal', 'uniform', 'random')
- `min` (number): Minimum value for uniform distribution
- `max` (number): Maximum value for uniform distribution

**Returns:** `tf.Tensor`

**Example:**
```javascript
const normalTensor = TensorUtils.createRandomTensor([3, 3], 'normal');
const uniformTensor = TensorUtils.createRandomTensor([2, 2], 'uniform', -1, 1);
```

#### `compareTensors(tensor1, tensor2)`
Compares two tensors and returns similarity metrics.

**Parameters:**
- `tensor1` (tf.Tensor): First tensor
- `tensor2` (tf.Tensor): Second tensor

**Returns:** `Object`

**Example:**
```javascript
const comparison = TensorUtils.compareTensors(tensor1, tensor2);
console.log(comparison.meanSquaredError);
console.log(comparison.meanAbsoluteError);
```

#### `tensorToChartData(tensor)`
Converts tensor to visualization data for Chart.js.

**Parameters:**
- `tensor` (tf.Tensor): Input tensor

**Returns:** `Object`

**Example:**
```javascript
const chartData = TensorUtils.tensorToChartData(tensor);
// Use with Chart.js
```

### Memory Management

#### `TensorUtils.memory.getUsage()`
Returns current memory usage information.

**Returns:** `Object`

#### `TensorUtils.memory.clear()`
Clears all tensors from memory.

#### `TensorUtils.memory.getUsagePercentage()`
Returns memory usage percentage.

**Returns:** `number`

### Performance Measurement

#### `TensorUtils.performance.measureTime(fn, iterations)`
Measures execution time of a function.

**Parameters:**
- `fn` (Function): Function to measure
- `iterations` (number): Number of iterations

**Returns:** `Object`

#### `TensorUtils.performance.benchmark(operation, iterations)`
Benchmarks tensor operations.

**Parameters:**
- `operation` (Function): Operation to benchmark
- `iterations` (number): Number of iterations

**Returns:** `Object`

## PerformanceMonitor Class

Monitors and displays performance metrics.

### Methods

#### `start()`
Starts performance monitoring.

#### `stop()`
Stops performance monitoring.

#### `recordMetric(operation, executionTime, memoryBefore, memoryAfter)`
Records a performance metric.

**Parameters:**
- `operation` (string): Operation name
- `executionTime` (number): Execution time in milliseconds
- `memoryBefore` (number): Memory usage before operation
- `memoryAfter` (number): Memory usage after operation

#### `getSummary()`
Returns performance summary.

**Returns:** `Object`

#### `clear()`
Clears all metrics.

#### `exportData()`
Exports performance data as JSON.

**Returns:** `string`

## ExportUtils Class

Provides functions for exporting data in various formats.

### Static Methods

#### `exportJSON(data, filename)`
Exports data as JSON file.

**Parameters:**
- `data` (Object): Data to export
- `filename` (string): Output filename

#### `exportCSV(data, filename)`
Exports data as CSV file.

**Parameters:**
- `data` (Array): Array of objects to export
- `filename` (string): Output filename

#### `exportTensorCSV(tensor, filename)`
Exports tensor data as CSV.

**Parameters:**
- `tensor` (tf.Tensor): Tensor to export
- `filename` (string): Output filename

#### `exportChartImage(chart, filename, format)`
Exports chart as image.

**Parameters:**
- `chart` (Chart): Chart.js instance
- `filename` (string): Output filename
- `format` (string): Image format ('png', 'jpeg', 'webp')

#### `exportPerformanceData(performanceData, format)`
Exports performance data.

**Parameters:**
- `performanceData` (Object): Performance data to export
- `format` (string): Export format ('json', 'csv')

#### `exportReport(results, performanceData, format)`
Exports all results as a comprehensive report.

**Parameters:**
- `results` (Array): Array of result objects
- `performanceData` (Object): Performance data
- `format` (string): Export format ('json', 'html', 'txt')

## TensorOperationsDemo Class

Interactive demonstrations of TensorFlow.js tensor operations.

### Methods

#### `runTensorShape()`
Runs shape operations demo.

#### `runDataType()`
Runs data type conversion demo.

#### `runMathematical()`
Runs mathematical operations demo.

#### `runMemory()`
Runs memory management demo.

#### `runAdvanced()`
Runs advanced operations demo.

#### `updateResults(content)`
Updates the results display.

**Parameters:**
- `content` (string): Content to display

#### `addResult(title, content)`
Adds result to the results array.

**Parameters:**
- `title` (string): Result title
- `content` (string): Result content

#### `updateChart(tensor)`
Updates chart with tensor data.

**Parameters:**
- `tensor` (tf.Tensor): Tensor to visualize

## Global Functions

### `runTensorShape()`
Runs tensor shape operations demo.

### `runDataType()`
Runs data type conversion demo.

### `runMathematical()`
Runs mathematical operations demo.

### `runMemory()`
Runs memory management demo.

### `runAdvanced()`
Runs advanced operations demo.

### `clearResults()`
Clears all results.

### `exportResults()`
Exports results as JSON file.

## Error Handling

All functions include proper error handling and will throw descriptive error messages when operations fail.

**Example:**
```javascript
try {
    const tensor = TensorUtils.createTensorFromInput('invalid json');
} catch (error) {
    console.error('Error:', error.message);
}
```

## Memory Management Best Practices

1. Always dispose of tensors when no longer needed
2. Use `TensorUtils.safeDispose()` for multiple tensors
3. Monitor memory usage with `TensorUtils.memory.getUsage()`
4. Clear memory periodically with `TensorUtils.memory.clear()`

## Performance Optimization

1. Use `TensorUtils.performance.measureTime()` to profile operations
2. Benchmark critical operations with `TensorUtils.performance.benchmark()`
3. Monitor performance with the `PerformanceMonitor` class
4. Export performance data for analysis

## Browser Compatibility

The platform requires modern browsers with support for:
- ES6+ features
- Promise API
- Fetch API
- LocalStorage
- WebGL (for TensorFlow.js GPU acceleration)

## Security Considerations

- All user input is validated before processing
- Tensor operations are sandboxed
- Memory usage is monitored to prevent DoS attacks
- Export functions sanitize data before download 