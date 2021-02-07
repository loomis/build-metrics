'use strict';

const opentelemetry = require('@opentelemetry/api');
const { BasicTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/tracing');
// const { CollectorTraceExporter } =  require('@opentelemetry/exporter-collector-proto');
const { CollectorTraceExporter } =  require('@opentelemetry/exporter-collector-grpc');

const traceExporter = createTraceExporter();
console.log("tracing initialized")

const tracer = opentelemetry.trace.getTracer('github-action');
const parentSpan = tracer.startSpan('main');
for (let i = 0; i < 3; i += 1) {
    createJobSpan(parentSpan, i);
    console.log("created job span: ", i)
}
parentSpan.end();

// flush and close the exporter
setTimeout(() => {
    traceExporter.shutdown();
}, 2000);

function createTraceExporter() {

    const collectorOptions = {
        serviceName: 'my-github-workflow',
        url: 'http://localhost:4317',
      };
      
    const exporter = new CollectorTraceExporter(collectorOptions);
      
    const provider = new BasicTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
      
    provider.register();

    return exporter; 
}

function createJobSpan(parent, index) {

    var ctx = opentelemetry.context.active();
    ctx = opentelemetry.setSpan(ctx, parent);
    const span = tracer.startSpan('job', undefined, ctx);

    // simulate random work
    for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
        // empty
    }

    span.setAttribute('job_number', index);
    span.addEvent('my-event');
    span.end();        
}