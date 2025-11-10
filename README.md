# Visibility State Override

Dit script manipuleert de Page Visibility API en andere browser-events. Hij probeert de `visibilityState` van een document programmatisch te controleren en te voorkomen dat de host status changes detecteert

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

Dit wordt gedaan door een event listener toe te voegen met het `useCapture` argument ingesteld op `true`. De callback roept `e.stopImmediatePropagation()` aan, wat voorkomt dat andere listeners (inclusief die van de applicatie zelf) worden uitgevoerd.

```javascript
document.addEventListener('visibilitychange', function(e) {
    e.stopImmediatePropagation();
}, true); // <-- true = capture phase
```

## Installatie

1.  **Extensie:** Vereist een userscript manager zoals Tampermonkey.
2.  **Nieuw Script:** Maak een nieuw userscript aan in het dashboard van de manager.
3.  **Code:** Kopieer de inhoud van `toabypass.js` en plak deze in de editor.
4.  **Opslaan:** Sla het script op. De `@match` header in het script zorgt voor automatische activering op de juiste websites
