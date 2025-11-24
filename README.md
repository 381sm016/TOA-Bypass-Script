# Visibility State Override

Manipuleert de Page Visibility API en andere browser-events. Checkt `visibilityState` van een document programmatisch om te voorkomen dat de host status changes detecteert

## Technische Implementatie

Het script injecteert bij `document-start` om ervoor te zorgen dat het wordt uitgevoerd vóór de scripts van de pagina zelf. Zonder dit werkt het niet

### 1. Property Overrides

De volgende eigenschappen van het `document` object worden overschreven met `Object.defineProperty` om te voorkomen dat hun waarden veranderen:

*   `document.hidden`: Wordt permanent ingesteld om `false` te retourneren.

*   `document.visibilityState`: Wordt permanent ingesteld om `'visible'` te retourneren.


De `configurable: false` vlag wordt gebruikt om te voorkomen dat latere scripts deze overrides ongedaan maken.

### 2. Event Interceptie

Om te voorkomen dat de applicatie luistert naar wijzigingen in de zichtbaarheid of focus, worden de volgende events op het `capture` niveau onderschept en onmiddellijk gestopt:

*   `visibilitychange`
*   `webkitvisibilitychange`
*   `blur`

Dit voegt een event listener toe met het `useCapture` arg ingesteld op `true`. Callback roept `e.stopImmediatePropagation()` aan, zodat andere listeners (inclusief die van de applicatie zelf) worden uitgevoerd.

```javascript
document.addEventListener('visibilitychange', function(e) {
    e.stopImmediatePropagation();
}, true); // <-- true = capture phase
```
