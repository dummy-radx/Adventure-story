export const storyData = {
  cover: {
    title: "Our Great Adventure",
    subtitle: "A story of Ishan and Sreeparna",
    image: "/images/book_cover_scene.png",
  },
  chapters: [
    {
      id: 1,
      title: "The Enchanted Jungle",
      image: "/images/jungle_scene.png",
      text: "Ishan and Sreeparna found themselves at the edge of an Enchanted Jungle. The air smelled like sweet nectar and glowing butterflies danced around them. They needed to cross to the other side.",
      options: [
        { text: "Follow the Glowing Butterflies", nextOutcome: "1a" },
        { text: "Cross the Wobbly Vine Bridge", nextOutcome: "1b" }
      ]
    },
    {
      id: 2,
      title: "The Snow-Capped Mountains",
      image: "/images/mountain_scene.png",
      text: "The path led them high up into the freezing, magical Snow-Capped Mountains. The snow sparkled like diamonds. It was chilly, but they were together!",
      options: [
        { text: "Build a Cute Snowman", nextOutcome: "2a" },
        { text: "Explore the Ice Cave", nextOutcome: "2b" }
      ]
    },
    {
      id: 3,
      title: "The Secret Beach",
      image: "/images/beach_scene.png",
      text: "After sliding down the mountain, they landed on a warm, beautiful Secret Beach with sparkling magic seashells scattered everywhere.",
      options: [
        { text: "Search for Magic Seashells", nextOutcome: "3a" },
        { text: "Build a Grand Sandcastle", nextOutcome: "3b" }
      ]
    },
    {
      id: 4,
      title: "The Magical Cafe",
      image: "/images/cafe_scene.png",
      text: "Walking along the shore, a cozy little cafe appeared out of nowhere. It smelled of vanilla and stardust. They grabbed a table to rest.",
      options: [
        { text: "Order the Cosmic Latte", nextOutcome: "4a" },
        { text: "Share a Giant Magical Crepe", nextOutcome: "4b" }
      ]
    },
    {
      id: 5,
      title: "The Cosmic Carnival",
      image: "/images/cafe_scene.png",
      text: "As evening fell, the cafe doors opened into a glowing Cosmic Carnival. The sky was lit with shooting stars and neon lights.",
      options: [
        { text: "Ride the Nebula Ferris Wheel", nextOutcome: "5a" },
        { text: "Play the Shooting Star Game", nextOutcome: "5b" }
      ]
    }
  ],
  outcomes: {
    "1a": {
      text: "The butterflies led them to a hidden fairy ring! They danced for a while before finding the path to the mountains.",
      nextChapter: 2,
      image: "/images/outcome_1a_fairy_ring.png"
    },
    "1b": {
      text: "They held hands tightly and crossed the scary bridge. They made it safely, proving their brave teamwork! The mountains awaited.",
      nextChapter: 2
    },
    "2a": {
      text: "They built the cutest snow-bear together! It magically came alive and gave them warm fuzzy hugs before pointing them to the beach.",
      nextChapter: 3
    },
    "2b": {
      text: "Inside the cave, they found ancient glittering ice crystals playing a soft melody. They listened peacefully before heading to the beach.",
      nextChapter: 3
    },
    "3a": {
      text: "They found a rainbow seashell that played their favorite song when held to the ear. With the shell in hand, they continued to a nearby cafe.",
      nextChapter: 4
    },
    "3b": {
      text: "They built a majestic sandcastle fit for a King and Queen. Tiny crab subjects bowed to them. Afterwards, they noticed a cafe nearby.",
      nextChapter: 4
    },
    "4a": {
      text: "The Cosmos Latte made them momentarily float in the air! They laughed together amidst the twinkling lights, ready for one last stop.",
      nextChapter: 5
    },
    "4b": {
      text: "The giant crepe was delicious and filled with edible glitter! They shared every bite and felt fully energized for the carnival.",
      nextChapter: 5
    },
    "5a": {
      text: "At the top of the Ferris Wheel, they could see the whole world they had explored today. They shared a cute kiss under the stars.",
      nextChapter: "end"
    },
    "5b": {
      text: "They won a giant plushie star! Carrying their prize together, they realized they were the best team in the universe.",
      nextChapter: "end"
    }
  },
  end: {
    title: "The End",
    text: "No matter where they go—from jungles to mountains to the stars—the best part of the adventure is that they are together. I love you, Cutu! ❤️",
    image: "/images/cover_scene.png" // We can reuse the cover or leave it without
  }
};
