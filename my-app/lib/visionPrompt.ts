export const visionPrompt = (cvResult: any) => `
You are an expert agricultural advisor.

A computer vision model analyzed a crop image and returned:
- Disease or issue: ${cvResult.disease}
- Confidence: ${(cvResult.confidence * 100).toFixed(1)}%
- Symptoms: ${Array.isArray(cvResult.symptoms) ? cvResult.symptoms.join(", ") : cvResult.symptoms}

Explain clearly:
1. Why this issue occurs
2. How it affects crop growth
3. Immediate actions the farmer should take
4. Fertilizer or treatment suggestions
5. Estimated cost (low / medium / high)
6. Preventive measures for future crops

Use simple, farmer-friendly language.
`;
