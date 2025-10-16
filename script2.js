const predictButton = document.getElementById('predictButton');
const personalityInput = document.getElementById('personalityInput');
const resultsSection = document.getElementById('resultsSection');
const loadingSpinner = document.getElementById('loadingSpinner');
const predictionContent = document.getElementById('predictionContent');
const predictionText = document.getElementById('predictionText');

const astroData = {
    Aries: { planet: 'Mars', keywords: ['adventurous', 'bold', 'leader', 'energetic', 'competitive', 'impulsive'] },
    Taurus: { planet: 'Venus', keywords: ['patient', 'reliable', 'stable', 'practical', 'sensual', 'grounded'] },
    Gemini: { planet: 'Mercury', keywords: ['curious', 'adaptable', 'witty', 'communicative', 'social', 'playful'] },
    Cancer: { planet: 'Moon', keywords: ['caring', 'emotional', 'intuitive', 'protective', 'nurturing', 'sensitive'] },
    Leo: { planet: 'Sun', keywords: ['confident', 'creative', 'dramatic', 'generous', 'loyal', 'leader'] },
    Virgo: { planet: 'Mercury', keywords: ['organized', 'analytical', 'practical', 'detail-oriented', 'modest', 'helpful'] },
    Libra: { planet: 'Venus', keywords: ['diplomatic', 'fair', 'social', 'artistic', 'charming', 'indecisive'] },
    Scorpio: { planet: 'Pluto', keywords: ['passionate', 'resourceful', 'determined', 'mysterious', 'intense', 'brave'] },
    Sagittarius: { planet: 'Jupiter', keywords: ['optimistic', 'adventurous', 'philosophical', 'independent', 'honest', 'restless'] },
    Capricorn: { planet: 'Saturn', keywords: ['disciplined', 'ambitious', 'practical', 'patient', 'responsible', 'serious'] },
    Aquarius: { planet: 'Uranus', keywords: ['independent', 'original', 'intellectual', 'humanitarian', 'eccentric', 'unconventional'] },
    Pisces: { planet: 'Neptune', keywords: ['compassionate', 'artistic', 'intuitive', 'gentle', 'wise', 'dreamy'] }
};

predictButton.addEventListener('click', () => {
    const inputText = personalityInput.value.toLowerCase();
    if (inputText.trim() === '') {
        alert('Please describe your personality first.');
        return;
    }

    resultsSection.classList.remove('hidden');
    loadingSpinner.classList.remove('hidden');
    predictionContent.classList.add('hidden');

    setTimeout(() => {
        const prediction = generatePrediction(inputText);
        predictionText.innerHTML = prediction;
        loadingSpinner.classList.add('hidden');
        predictionContent.classList.remove('hidden');
    }, 2500);
});

function generatePrediction(text) {
    let scores = {};
    for (const sign in astroData) scores[sign] = 0;

    for (const sign in astroData) {
        astroData[sign].keywords.forEach(keyword => {
            if (text.includes(keyword)) scores[sign]++;
        });
    }

    const sortedSigns = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const dominantSign = sortedSigns[0];
    const secondarySign = sortedSigns[1];
    const tertiarySign = sortedSigns[2];

    if (scores[dominantSign] === 0) {
        return "The cosmos is quiet today. Try using more descriptive words like 'adventurous', 'caring', 'organized', or 'creative'.";
    }

    const dominantPlanet = astroData[dominantSign].planet;
    const secondaryPlanet = astroData[secondarySign].planet;

    let result = `Based on your self-description, your dominant astrological energy resonates with <strong>${dominantSign}</strong>, guided by <strong>${dominantPlanet}</strong>. This suggests traits like ${astroData[dominantSign].keywords.slice(0, 3).join(', ')}.<br><br>`;
    result += `You also show influence from <strong>${secondarySign}</strong>, marked by ${astroData[secondarySign].keywords.slice(0, 2).join(' and ')}. Your possible chart alignment might be:<br>`;
    result += `<ul class="list-disc list-inside mt-2 space-y-1">
                <li><strong>Sun in ${dominantSign}</strong>: Your core essence.</li>
                <li><strong>Moon in ${secondarySign}</strong>: Your emotional nature.</li>
                <li><strong>Rising in ${tertiarySign}</strong>: Your outward personality.</li>
               </ul>`;
    return result;
}
