# Build Metrics Javascript GitHub Action

github action that uses opentelemetry to generate build metrics

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`

## Outputs

### `time`

The time we greeted you.

## Example Usage

```yaml
uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'
```


