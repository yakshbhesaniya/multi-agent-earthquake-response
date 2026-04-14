export const knowledgeBase = {
    general: [
        "Earthquakes are caused by sudden release of energy in the Earth's crust, leading to ground shaking and structural damage.",
        "Earthquake impact depends on magnitude, depth, and population density of the affected area.",
        "Urban areas like Mumbai are highly vulnerable due to dense population and aging infrastructure.",
        "The first 72 hours after an earthquake are critical for rescue and survival operations.",
        "Secondary hazards include fires, building collapse, infrastructure failure, and communication breakdown.",
        "Coastal cities may also face risks like liquefaction and flooding, especially in reclaimed land areas.",
        "Emergency response requires coordination between infrastructure, transportation, and rescue teams."
    ],
    infrastructure: [
        "Earthquakes above magnitude 6.0 can cause severe structural damage, especially to non-engineered buildings.",
        "Older cessed buildings and unreinforced masonry structures are highly vulnerable to collapse.",
        "MHADA buildings and densely packed colonies often lack modern earthquake-resistant design.",
        "Reclaimed land areas are prone to liquefaction, which weakens building foundations.",
        "Modern high-rise buildings are designed to sway, but may still suffer internal structural damage.",
        "Critical infrastructure such as hospitals, bridges, and power stations must be prioritized for inspection.",
        "Building damage can be categorized into low, moderate, and severe based on structural integrity.",
        "Aftershocks can further weaken already damaged structures, increasing collapse risk."
    ],
    transportation: [
        "Earthquakes often block roads due to debris from collapsed buildings and damaged infrastructure.",
        "Major highways and arterial roads are critical for emergency response and must be cleared quickly.",
        "Railway systems are highly sensitive to track misalignment and often shut down after earthquakes.",
        "Mumbai Suburban Railway disruption severely impacts evacuation and rescue operations.",
        "Bridges, flyovers, and tunnels must be inspected before use after an earthquake.",
        "Alternate routes should be identified to ensure continuous movement of rescue teams.",
        "Traffic congestion increases due to panic movement and blocked roads.",
        "Emergency lanes should be prioritized for ambulances and rescue vehicles."
    ],
    magnitude: [
        "Earthquake magnitude is measured on the Richter or Moment Magnitude (Mw) scale, which is logarithmic.",
        "Magnitude < 3.0: Micro earthquakes, generally not felt and cause no damage.",
        "Magnitude 3.0 – 3.9: Minor earthquakes, rarely cause damage.",
        "Magnitude 4.0 – 4.9: Light earthquakes, noticeable shaking but minimal damage.",
        "Magnitude 5.0 – 5.9: Moderate earthquakes, can cause damage to poorly built structures.",
        "Magnitude 6.0 – 6.9: Strong earthquakes, can cause significant damage in populated areas.",
        "Magnitude 7.0 – 7.9: Major earthquakes, serious damage over large areas.",
        "Magnitude >= 8.0: Great earthquakes, catastrophic destruction and widespread impact.",
        "Each increase of 1 magnitude represents approximately 10 times more amplitude and ~32 times more energy release.",
        "In dense urban areas like Mumbai, even magnitude 6.0+ earthquakes can cause severe damage due to infrastructure vulnerability."
    ],
    response: [
        "Search and rescue operations should prioritize densely populated and high-risk zones.",
        "Emergency response should focus on saving lives before restoring infrastructure.",
        "Clear communication is critical to avoid panic and guide evacuation.",
        "Evacuation routes must be safe, accessible, and free from structural risks.",
        "Medical facilities should be prepared for mass casualty incidents.",
        "Debris clearance is essential to restore transportation and emergency access.",
        "Coordination between multiple agencies improves response efficiency.",
        "Real-time assessment and decision-making are crucial during disaster response."
    ],
    uncertainty: [
        "Initial earthquake reports may be incomplete or inaccurate due to sensor limitations.",
        "Aftershocks can occur and worsen existing damage or create new hazards.",
        "Road conditions and building stability may change rapidly after the main event.",
        "Some routes marked safe initially may become unsafe due to delayed collapse or congestion.",
        "Communication networks may be partially unavailable, affecting coordination.",
        "Decisions must be adaptive and updated as new data becomes available.",
        "Confidence levels indicate uncertainty in predictions and should guide cautious decision-making."
    ]
};

export function getDomainKnowledge(topic) {
    if (knowledgeBase[topic]) {
        return knowledgeBase[topic].join(' ');
    }
    return '';
}
