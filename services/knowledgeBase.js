/**
 * A static predefined knowledge base used to augment agent prompts 
 * and simulate simple RAG (Retrieval-Augmented Generation).
 */
export const knowledgeBase = {
    general: [
        "Earthquakes in Mumbai primarily cause massive structural damage in densely populated areas and disrupt critical infrastructure grids like the local train network.",
        "Response time is critical in the first 72 hours, especially in coastal and reclaimed land areas."
    ],
    infrastructure: [
        "Higher magnitude earthquakes (usually >6.0) pose severe risks to older cessed buildings in South Mumbai and densely packed colonies.",
        "A magnitude 6.5 earthquake typically compromises old MHADA buildings and unreinforced masonry structures.",
        "Modern high-rises in areas like Lower Parel and BKC are designed to sway, but foundational integrity on reclaimed land must be inspected immediately."
    ],
    transportation: [
        "Earthquakes often block main arterial roads like the Western Express Highway, Eastern Express Highway, and S.V. Road due to debris.",
        "Disruption to the Mumbai Suburban Railway (local trains) severely affects rescue operations by halting mass transit.",
        "Alternate routes via the Bandra-Worli Sea Link or Eastern Freeway might be safer if their structural integrity is confirmed."
    ]
};

export function getDomainKnowledge(topic) {
    if (knowledgeBase[topic]) {
        return knowledgeBase[topic].join(' ');
    }
    return '';
}
